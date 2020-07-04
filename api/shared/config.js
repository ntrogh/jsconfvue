// @ts-check
const process = require("process");

const config = {
    cosmosdb_endpoint: process.env.COSMOSDB_ENDPOINT,
    cosmosdb_key: process.env.COSMOSDB_KEY,
    cosmosdb_databaseId: "koedodb",
    cosmosdb_statsContainerId: "stats",
    cosmosdb_koedosContainerId: "koedos",
    cosmosdb_statsPartitionKey: "date",
    cosmosdb_koedosPartitionKey: "from",
    no_database: (process.env.NO_DATABASE != undefined) ? (process.env.NO_DATABASE == 'true') : true
};

module.exports = config;