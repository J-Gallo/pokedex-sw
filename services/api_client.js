"use strict";

var config        = require('../config/config'),
    logger        = require('../utils/logger'),
    httpClient    = require('../utils/http_client'),
    self          = {};

const API_CORE_URL = config.services.api_core.base_url;

self.getStores = function() {
    var url = API_CORE_URL + "stores/";

    logger.info('Calling: ' + url);

    return httpClient.getCached(url, 86400);
};

self.getCategory = function(categoryId) {
    var url = API_CORE_URL + "categories/" + categoryId;

    logger.info('Calling: ' + url);

    return httpClient.get(url);
};

module.exports = self;
