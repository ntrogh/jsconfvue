const data = require('../shared/koedo-data');

module.exports = async function (context, req) {
  const koedo = {
    id: undefined,
    from: req.body.from,
    to: req.body.to,
    message: req.body.message,
  };

  try {
    const newKoedo = data.addKoedo(koedo);
    context.res.status(201).json(newKoedo);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
