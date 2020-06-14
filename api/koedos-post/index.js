const { getUser } = require('../shared/user-utils');
const data = require('../shared/koedo-data');

module.exports = async function (context, req) {
  const user = getUser(req);

  const koedo = {
    from: user.userDetails,
    to: req.body.to,
    message: req.body.message,
  };

  try {
    const newKoedo = await data.addKoedo(koedo);
    context.res.status(201).json(newKoedo);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
