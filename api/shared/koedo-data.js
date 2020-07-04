const config = require("./config");
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

const getDao = () => {
  return new KoedosDao(config.cosmosdb_databaseId, config.cosmosdb_koedosContainerId);
}

async function addKoedo(koedo) {
  // select a random gif for the newly created item
  koedo.imageurl = getRandomImageUrl();
  koedo.date = new Date();

  if (config.no_database) {
    koedo.id = getRandomInt();
    data.koedos.push(koedo);
    return koedo;
  } else {
    const koedosDao = getDao();
    const newKoedo = await koedosDao.addItem(koedo);
    return newKoedo;
  }
};

async function updateKoedo(koedo) {
  if (config.no_database) {
    const index = data.koedos.findIndex((v) => v.id === koedo.id);
    console.log(koedo);
    data.koedos.splice(index, 1, koedo);
  } else {
    const koedosDao = getDao();
    await koedosDao.updateItem(koedo, config.cosmosdb_koedosPartitionKey);
  }

  return koedo;
};

async function deleteKoedo(id) {
  if (config.no_database) {
    data.koedos = data.koedos.filter((v) => v.id !== value);
    console.log(data.koedos.length);
  } else {
    const koedosDao = getDao();
    await koedosDao.deleteItem(id, config.cosmosdb_koedosPartitionKey);
  }

  return true;
};


async function getKoedos(userId) {
  if (config.no_database) {
    console.log('using static data');
    return data.koedos;
  } else {
    console.log('using DB data');
    const koedosDao = getDao();

    const querySpec = {
      query: `SELECT * from c WHERE c["from"] = "${userId}" ORDER BY c.date ASC`
    };
    const items = await koedosDao.find(querySpec);

    return items;
  }
};

module.exports = { addKoedo, updateKoedo: updateKoedo, deleteKoedo: deleteKoedo, getKoedos: getKoedos };
