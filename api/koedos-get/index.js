const data = require('../shared/koedo-data');

module.exports = async function (context, req) {
  try {
    const koedos = data.getKoedos();
    context.res.status(200).json(koedos);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
