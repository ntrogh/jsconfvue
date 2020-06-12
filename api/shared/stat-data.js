const config = require("./cosmosdb-config");
const CosmosClient = require("@azure/cosmos").CosmosClient;
const KoedosDao = require("./koedosDao");

// const data = {
//   stats: [
//     {
//       date: '2020-06-06T18:25:43.511Z',
//       count: 25
//     },
//     {
//       date: '2020-06-05T18:25:43.511Z',
//       count: 20
//     },
//     {
//       date: '2020-06-04T18:25:43.511Z',
//       count: 11
//     },
//     {
//       date: '2020-06-03T18:25:43.511Z',
//       count: 7
//     },
//   ],
// };

async function getStats() {
  const koedosDao = new KoedosDao(config.databaseId, config.statsContainerId);

  const querySpec = {
    query: "SELECT * from c"
  };

  const items = await koedosDao.find(querySpec);

  // items.forEach(item => {
  //   console.log(`${item.date} - ${item.count}`);
  // });


  // return data.stats;
  return items;
};

module.exports = { getStats };
