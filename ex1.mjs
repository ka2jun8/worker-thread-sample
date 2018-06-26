import {Worker, isMainThread, threadId } from "worker_threads";
// mjsだとworkerData取れないので、代わりにthreadIdを使う

const __filename = import.meta.url.substring(7);

let currentVal = 0;
let intervals = [100, 1000, 500];

function counter(id, i) {
    console.log(`[${id}]${i}`);
    return i;
}

let timer = null;

setTimeout(() => {
    clearInterval(timer);
}, 3000);

if(isMainThread){
    console.log("this is the main thread. ");
    for(let i = 0; i < 2; i++){
        let w = new Worker(__filename, {workerData: i});
    }

    timer = setInterval( a => currentVal = counter(a, currentVal + 1), intervals[2], "MainThread", currentVal);
}else{
    console.log("this is not the main thread.");

    timer = setInterval( a => currentVal = counter(a, currentVal + 1), intervals[threadId], "Worker" + threadId, currentVal);
}