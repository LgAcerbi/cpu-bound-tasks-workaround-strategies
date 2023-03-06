const { FixedThreadPool, DynamicThreadPool } = require("poolifier");

const maxThreads = 5;

async function run() {
    const threadPool = new FixedThreadPool(maxThreads, "./worker-thread-pool/worker-thread.js", {
        errorHandler: (e) => console.error(e),
        onlineHandler: () => console.log("worker is online"),
    });

    const arr = new Array(30).fill("something");

    const startDate = new Date();

    while (arr.length !== 0) {
        threadPool.execute({ startDate, message: arr.pop() });
    }
}

run().catch((err) => console.error(err));
