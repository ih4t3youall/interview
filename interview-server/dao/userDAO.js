const {User, sequelize} = require('../db/sequelize');

module.exports.createUser = async function createUser(obj){
    const created = await User.create(obj);
    return created.dataValues;
};

module.exports.deleteUser = async function deleteUser(options){
    const deleted = await User.destroy(options);
    return deleted === 1; // True if deleted, false otherwise
};

module.exports.updateUser = async function updateUser(user, options){
    const updated = await User.update(user, options);
    return updated[0] === 1; // True if updated, false otherwise
};


module.exports.findUser = async function findUser(options){
    return await User.findAll(options);
};


module.exports.userCount = async function userCount(){
    const result = await sequelize.query('SELECT COUNT(*) FROM "Users"');
    return result[0][0];
};