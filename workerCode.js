const {parentPort} = require("worker_threads");

function random(min, max) {
    return Math.random() * (max - min) + min;
}

const start = Date.now();
let bigList = Array(100000).fill().map( _ => random(1, 10000));

parentPort.on("message", msg => {
    console.log("Main thread finished on: ", (msg.timeDiff / 1000), " seconds...");
});

bigList.sort();
parentPort.postMessage({val: bigList[0], timeDiff: Date.now() - start})
