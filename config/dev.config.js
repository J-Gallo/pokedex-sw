"use strict";

module.exports = (ROOT_PATH) => {
  var config = {
    server: {
      port: 3000
    },
    services: {
      restler_timeout: 15000,
      standard_ttl: 1300
    },
  };
  return config;
};
