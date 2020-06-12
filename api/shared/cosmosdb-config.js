// @ts-check
const process = require("process");

const config = {
    endpoint: "https://jsconfbe.documents.azure.com:443/",
    key: process.env.COSMOSDB_KEY,
    databaseId: "koedodb",
    statsContainerId: "stats",
    koedosContainerId: "koedos",
    statsPartitionKey: {
        kind: "Hash", paths: ["/date"]
    },
    koedosPartitionKey: {
        kind: "Hash", paths: ["/from"]
    }
};

module.exports = config;
