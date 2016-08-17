var apiClient       = require("../services/api_client"),
    config   	    = require('../config/config'),
    Q               = require("q");


/* -----------------   Controllers   ----------------- */
module.exports = {
    index: (req, res, next) => {
      res.send('hola');
    }
};
