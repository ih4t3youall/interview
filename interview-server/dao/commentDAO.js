const {AlertComment} = require('../db/sequelize');

module.exports.createComment = async function createComment(obj){
    const created = await AlertComment.create(obj);
    return created.dataValues;
};

module.exports.deleteComment = async function deleteComment(options){
    const deleted = await AlertComment.destroy(options);
    return deleted === 1; // True if deleted, false otherwise
};

module.exports.updateComment = async function updateComment(comment, options){
    const updated = await AlertComment.update(comment, options);
    return updated[0] === 1; // True if updated, false otherwise
};