const { getUser } = require('../shared/user-utils');
const data = require('../shared/koedo-data');

module.exports = async function (context, req) {
  try {
    const user = getUser(req);
    const koedos = await data.getKoedos(user.userDetails);
    context.res.status(200).json(koedos);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
