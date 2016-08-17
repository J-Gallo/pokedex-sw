"use strict";

var config   	  = require('../config/config'),
    httpClient    = require('../utils/http_client'),
    logger        = require('../utils/logger'),
    self          = {};


self.getTemplate = (device) => {
    var query = '';
    if (device === 'mobile') query = "?mobile=true";

    var url = config.services.normandia.base_url + '/template/all'+query;

    logger.info('Calling normandia: ' + url);

    return httpClient.getCached(url);
};

module.exports = self;