const winston = require('winston'); // Logger
require('express-async-errors'); // Will wrap the routes with the error handler

module.exports = function(filename){
    const { timestamp, combine } = winston.format;

    const logFormat = winston.format.printf(info => {
        const formattedDate = info.timestamp.replace('T', ' ').replace('Z', '');
        return `${formattedDate} ${filename} ${info.level.toUpperCase()} ${info.message};`;
    });

    const options = {
        file: {
            filename: 'log/logfile.log',
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            maxFiles: 20,
            colorize: false,
            format: combine(timestamp(), logFormat),
            exitOnError: false
        },
        console: {
            handleExceptions: true,
            format: combine(timestamp(), logFormat),
            colorize: true,
            exitOnError: false
        },
    };

    const logger = winston.createLogger({
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File(options.file),
            new winston.transports.Console(options.console) // We log to the console
        ]
    });

    return logger;

};

