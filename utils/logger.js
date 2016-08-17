var winston           = require('winston');

module.exports = new winston.Logger({
    level: 'info',
    transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log.log' })
    ],
    exitOnError : false
});