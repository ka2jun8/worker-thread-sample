const {Worker, isMainThread, parentPort, workerData} = require("worker_threads");
const request = require("request");

if(isMainThread){
    console.log("This is the main thread.");

    let w = new Worker(__filename, {workerData: null});
    w.on("message", msg => {
        console.log("First value: ", msg.val);
        console.log("Took: ", msg.timeDiff / 1000);
    });
    w.on("error", console.error);
    w.on("exit", code => {
        if(code != 0) {
            console.error(new Error(`Worker stopped with exit code ${code}`));
        }
    });

    request.get("http://www.google.com", (err, resp) => {
        if(err) {
            return console.error(err);
        }
        console.log("Total bytes received: ", resp.body.length);
    });

}else {
    function random(min, max){
        return Math.random() * (max - min) + min;
    }

    const start = Date.now();
    let bigList = Array(500000).fill().map( _ => random(1, 10000));

    bigList.sort();
    parentPort.postMessage({val: bigList[0], timeDiff: Date.now() - start});
}
