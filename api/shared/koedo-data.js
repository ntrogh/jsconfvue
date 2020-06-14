const config = require("./cosmosdb-config");
const CosmosClient = require("@azure/cosmos").CosmosClient;
const KoedosDao = require("./koedosDao");

const data = {
  koedos: [
    {
      id: 1,
      from: 'John Doe',
      to: 'Jane Doe',
      date: '2020-06-03T18:25:43.511Z',
      message: 'Thanks for helping me out with project Koedos.',
      imageurl: 'https://media.giphy.com/media/h55EUEsTG9224/giphy.gif'
    },
  ],
};

let images = [
  "https://media.giphy.com/media/h55EUEsTG9224/giphy.gif",
  "https://media.giphy.com/media/129LZMJRoG9U08/giphy.gif",
  "https://media.giphy.com/media/11WqjW3rZiK16U/giphy.gif"
];

const getRandomInt = () => {
  const max = 1000;
  const min = 100;
  return Math.floor(Math.random() * Math.floor(max) + min);
};

const getRandomImageUrl = () => {
  const max = images.length;
  const min = 0;

  const idx = Math.floor(Math.random() * Math.floor(max) + min);

  return images[idx];
};

async function addKoedo(koedo) {
  // koedo.id = getRandomInt();
  koedo.imageurl = getRandomImageUrl();
  koedo.date = new Date();

  const koedosDao = new KoedosDao(config.databaseId, config.koedosContainerId, config.koedosPartitionKey);
  const newKoedo = await koedosDao.addItem(koedo);

  // data.koedos.push(koedo);
  return newKoedo;
};

async function updateKoedo(koedo) {
  const koedosDao = new KoedosDao(config.databaseId, config.koedosContainerId, config.koedosPartitionKey);
  console.log(koedo);
  try{
    await koedosDao.updateItem(koedo);
  }
  catch(e) {
    console.log(e);
  }

  // const index = data.koedos.findIndex((v) => v.id === koedo.id);
  // console.log(koedo);
  // data.koedos.splice(index, 1, koedo);
  return koedo;
};

async function deleteKoedo(id) {
  const koedosDao = new KoedosDao(config.databaseId, config.koedosContainerId, config.koedosPartitionKey);
  try{
    await koedosDao.deleteItem(id)
  }
  catch(e) {
    console.log(e);
  }
  // data.koedos = data.koedos.filter((v) => v.id !== value);
  // console.log(data.koedos.length);
  return true;
};

async function getKoedos() {
  console.log("getKoedoes");
  console.log(`${config.databaseId}, ${config.koedosContainerId}`);
  const koedosDao = new KoedosDao(config.databaseId, config.koedosContainerId, config.koedosPartitionKey);

  const todayMin20 = new Date();
  todayMin20.setDate(todayMin20.getDate() - 20);
  const querySpec = {
    query: `SELECT * from c WHERE c.date > "${todayMin20.toISOString()}" ORDER BY c.date ASC`
    // query: `SELECT * from c`
  };
  const items = await koedosDao.find(querySpec);

  return items;
  // return data.koedos;
};

module.exports = { addKoedo, updateKoedo: updateKoedo, deleteKoedo: deleteKoedo, getKoedos: getKoedos };
