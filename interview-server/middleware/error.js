// Here we will get all the errors we didnt catch. ONLY catches errors inside express pipeline!
const logger = require('../util/logger')('error');

module.exports = function(err, req, res, next){
    logger.error(err.stack);
    res.status(500).send({error : err.message});
};