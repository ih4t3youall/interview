const multer  = require('multer');

let storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, req.imagepath)
    },
    filename: async function (req, file, cb) {
        const name = await get_unique_image_name(file.originalname);
        cb(null, name)
    }
});


async function get_unique_image_name(filename) {
    const millis = new Date().getTime();
    const noise = (Math.random() * (10000) ) << 0;
    const array = filename.split(".");
    const file_extension = array[array.length-1];
    return '' + millis + noise + '.' + file_extension;
}

module.exports = multer({ storage: storage });
