const data = require('../shared/stat-data');

module.exports = async function (context, req) {
    try {
        const stats = data.getStats();
        context.res.status(200).json(stats);
    } catch (error) {
        context.res.status(500).send(error);
    }
};
