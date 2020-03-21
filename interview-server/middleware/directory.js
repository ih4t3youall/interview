// Middleware to ensure the folder exist before getting to the endpoint. e.g: For using images.
const fse = require('fs-extra');

module.exports = async function(req, res, next){
    const path = __basedir + '/images/' + req.user.id + '/';
    try {
        await fse.ensureDir(path); // If folder doesnt exists, we create it.
        req.imagepath = path;
        next();
    } catch (err) {
        throw (err);
    }
};