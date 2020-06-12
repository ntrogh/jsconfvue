const data = require('../shared/type-data');

module.exports = async function (context, req) {
    try {
        const types = data.getTypes();
        context.res.status(200).json(types);
    } catch (error) {
        context.res.status(500).send(error);
    }
};
