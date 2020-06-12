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

const addKoedo = (koedo) => {
  koedo.id = getRandomInt();
  koedo.imageurl = getRandomImageUrl();
  koedo.date = new Date();

  data.koedos.push(koedo);
  return koedo;
};

const updateKoedo = (koedo) => {
  const index = data.koedos.findIndex((v) => v.id === koedo.id);
  console.log(koedo);
  data.koedos.splice(index, 1, koedo);
  return koedo;
};

const deleteKoedo = (id) => {
  console.log("deleteKoedo");
  const value = parseInt(id, 10);
  console.log(value);
  data.koedos = data.koedos.filter((v) => v.id !== value);
  console.log(data.koedos.length);
  return true;
};

const getKoedos = () => {
  console.log("getKoedoes");
  return data.koedos;
};

module.exports = { addKoedo, updateKoedo: updateKoedo, deleteKoedo: deleteKoedo, getKoedos: getKoedos };
