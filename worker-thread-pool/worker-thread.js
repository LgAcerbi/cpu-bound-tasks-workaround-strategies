const { threadId } = require("worker_threads");
const crypto = require("crypto");

const { ThreadWorker } = require("poolifier");

function processData(data) {
    const { startDate, message } = data;

    const processedItem = crypto
        .createHmac("sha256", "secret")
        .update(new Array(1000000).fill(message).join("."))
        .digest("hex");

    console.log(threadId, processedItem, new Date() - startDate);

    return processedItem;
}

module.exports = new ThreadWorker(processData, {
    async: false,
});
