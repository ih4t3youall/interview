const commentDAO  = require('../dao/commentDAO');
const Joi = require('@hapi/joi');

const schema = {
    id: Joi.number(),
    alert_id: Joi.number().required(),
    description: Joi.string().required(),
};

module.exports.validateComment = function validateComment(comments) {
    return Joi.validate(comments, schema);
};

module.exports.createComment = async function createComment(Comment) {
    return await commentDAO.createComment(Comment);
};


module.exports.updateComment = async function updateComment(comment_id, comment) {
    const options = {
        where: {
            "id" : comment_id
        }
    };
    return await commentDAO.updateComment(comment, options);
};

module.exports.deleteCommentByID = async function deleteCommentByID(comment_id) {
    const options = {
        raw: true,
        where: {
            "id" : comment_id
        }
    };
    return await commentDAO.deleteComment(options);
};