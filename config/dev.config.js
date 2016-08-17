"use strict";

module.exports = (ROOT_PATH) => {
  var config = {
    server: {
      port: 3000
    },
    services: {
      restler_timeout: 5000,
      standard_ttl: 300
    },
  };
  return config;
};
