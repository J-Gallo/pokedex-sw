"use strict";

module.exports = (ROOT_PATH) => {
  var config = {
    server: {
      port: 3000
    },
    services: {
      api_core: {
        base_url: "http://api-staging.garbarino.com/"
      },
      normandia: {
        base_url: "https://fe-staging.garbarino.com/normandia"
      },
      restler_timeout: 5000,
      standard_ttl: 300
    },
    cloudfront: {
      url: ""
    }
  };
  return config;
};

