// This example uses setImmediate to call the "processChunk" function at the top of the next iteration on event loop
// leading to processing the array by pieces of execution, and therefore executing other javascript code between this pieces

const crypto = require("crypto");

const startDate = new Date();

const arr = new Array(200).fill("something");
function processChunk() {
    if (arr.length === 0) {
        console.log("elapsed time:", new Date() - startDate);
    } else {
        console.log("processing chunk");
        const subarr = arr.splice(0, 10);
        for (const item of subarr) {
            doHeavyStuff(item);
        }
        setImmediate(processChunk);
    }
}

processChunk();

function doHeavyStuff(item) {
    const processedItem = crypto
        .createHmac("sha256", "secret")
        .update(new Array(1000000).fill(item).join("."))
        .digest("hex");

    console.log(processedItem);
}

// This is just for confirming that we can continue
// doing things
let interval = setInterval(() => {
    console.log("tick!");
    if (arr.length === 0) clearInterval(interval);
}, 0);
