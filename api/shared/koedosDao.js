// @ts-check
const config = require("./cosmosdb-config")
const CosmosClient = require('@azure/cosmos').CosmosClient
const debug = require('debug')('todo:taskDao')

// For simplicity we'll set a constant partition key
const partitionKey = undefined
class KoedosDao {
    /**
     * Manages reading, adding, and updating Koedos in Cosmos DB
    * @param {string} databaseId
    * @param {string} containerId
     */
    constructor(databaseId, containerId, partitionKey = undefined) {
        const { endpoint, key } = config;
        this.client = new CosmosClient({ endpoint, key });
        this.database = this.client.database(databaseId);
        this.container = this.database.container(containerId);
        this.partitionKey = partitionKey;
    }

    async init() {
    }

    async find(querySpec) {
        debug('Querying for items from the database')
        if (!this.container) {
            throw new Error('Collection is not initialized.')
        }
        const { resources } = await this.container.items.query(querySpec).fetchAll()
        return resources
    }

    async addItem(item) {
        debug('Adding an item to the database')
        const { resource: doc } = await this.container.items.create(item)
        return doc
    }

    async updateItem(item) {
        debug('Update an item in the database')

        const { resource: replaced } = await this.container
            .item(item.id, item.from)
            .replace(item)
        return replaced
    }

    async deleteItem(itemId) {
        console.log(`Deleting an item from the database: ${itemId}`);
        const doc = await this.getItem(itemId)
        const { resource: result } = await this.container.item(itemId, doc.from).delete();
    }

    async getItem(itemId) {
        debug('Getting an item from the database');
        const docs = await this.find(`SELECT * FROM c WHERE c.id = '${itemId}'`);
        return docs[0];
    }
}

module.exports = KoedosDao