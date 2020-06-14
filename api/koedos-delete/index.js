const data = require('../shared/koedo-data');

module.exports = async function (context, req) {
  const id = req.params.id;

  try {
    await data.deleteKoedo(id);
    context.res.status(200).json({});
  } catch (error) {
    context.res.status(500).send(error);
  }
};
