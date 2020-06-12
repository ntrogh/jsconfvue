const data = require('../shared/koedo-data');

module.exports = async function (context, req) {
  const koedo = {
    id: parseInt(req.params.id, 10),
    from: req.body.from,
    to: req.body.to,
    date: req.body.date,
    message: req.body.message,
    imageurl: req.body.imageurl
  };

  try {
    const updatedKoedo = data.updateKoedo(koedo);
    context.res.status(200).json(updatedKoedo);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
