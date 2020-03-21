const {Sighting, sequelize} = require('../db/sequelize');

module.exports.createSighting = async function createSighting(obj){
    const created = await Sighting.create(obj);
    return created.dataValues;
};

module.exports.deleteSighting = async function deleteSighting(options){
    const deleted = await Sighting.destroy(options);
    return deleted === 1; // True if deleted, false otherwise
};

module.exports.sightingCount = async function sightingCount(){
    const result = await sequelize.query('SELECT COUNT(*) FROM "Sightings"');
    return result[0][0];
};