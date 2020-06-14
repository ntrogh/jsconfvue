const data = require('../shared/koedo-data');

module.exports = async function (context, req) {
  const koedo = {
    id: req.params.id,
    from: req.body.from,
    to: req.body.to,
    date: req.body.date,
    message: req.body.message,
    imageurl: req.body.imageurl
  };

  try {
    const updatedKoedo = await data.updateKoedo(koedo);
    context.res.status(200).json(updatedKoedo);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
