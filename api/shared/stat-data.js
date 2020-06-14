const config = require("./cosmosdb-config");
const CosmosClient = require("@azure/cosmos").CosmosClient;
const KoedosDao = require("./koedosDao");

const data = {
  stats: [
    {
      date: '2020-06-03T18:25:43.511Z',
      count: 7
    },
    {
      date: '2020-06-04T18:25:43.511Z',
      count: 11
    },
    {
      date: '2020-06-05T18:25:43.511Z',
      count: 20
    },
    {
      date: '2020-06-06T18:25:43.511Z',
      count: 12
    },
    {
      date: '2020-06-07T18:25:43.511Z',
      count: 17
    },
    {
      date: '2020-06-08T18:25:43.511Z',
      count: 25
    },
  ],
};

async function getStats() {
  const koedosDao = new KoedosDao(config.databaseId, config.statsContainerId);
  const todayMin20 = new Date();
  todayMin20.setDate(todayMin20.getDate() - 20);
  const querySpec = {
    query: `SELECT * from c WHERE c.date > "${todayMin20.toISOString()}" ORDER BY c.date ASC`
  };
  const items = await koedosDao.find(querySpec);

  // items.forEach(item => {
  //   console.log(`${item.date} - ${item.count}`);
  // });

  // return data.stats;
  return items;
};

module.exports = { getStats };
