const logger = require('./util/logger')('index');
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const whiskers = require('whiskers');

global.__basedir = __dirname; // Set the base directory
process.on('unhandledRejection', (ex) => { // We log unhandled Rejections
    logger.error(ex.stack);
});


try{
    logger.info("Starting security app");
    require("./db/sequelize").init(); //Start DB Connection and objects
    require("./startup/routes")(app); //Define routes
    require("./startup/config")();    //Verify configuration

    app.set('views', __dirname + '/html'); // Template engine config
    app.engine('.html', whiskers.__express); // Template engine config

    const port = process.env.PORT || 3000;
    app.listen(port, () => logger.info(`HTPP Listening on port ${port}...`));

    https.createServer({
        key: fs.readFileSync('./certs/server.key'),
        cert: fs.readFileSync('./certs/server.cert')
    }, app).listen(3001, () => {
        logger.info('HTPPS Listening on port 3001...')
    })

}catch (e) {
    logger.error(e.stack);
    logger.error("Shutting Down");
    process.exit(1);
}


aefjasdl;fkjhaskldfjhasf
