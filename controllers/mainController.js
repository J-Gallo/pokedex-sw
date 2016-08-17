var apiClient       = require("../services/api_client"),
    normandiaClient = require("../services/normandia_client"),
    config   	    = require('../config/config'),
    Q               = require("q"),
    logger          = require('../utils/logger');

const NORMANDIA_CORE_URL = config.services.normandia.base_url;

/* -----------------   Controllers   ----------------- */
module.exports = {
    index: (req, res, next) => {

        Q.all([
            normandiaClient.getTemplate(res.locals.device),
            apiClient.getStores(),
        ]).spread((headerAndFooterRs, storesRs) => {
            res.render("index", {
                title: "Title",
                normandia_header: headerAndFooterRs.headerHtml,
                normandia_footer: headerAndFooterRs.footerHtml,
                normandiaJs : headerAndFooterRs.js,
                normandiaCss : headerAndFooterRs.css,
                normandia_endpoint: NORMANDIA_CORE_URL,
                stores: storesRs
            });
        }).catch(function (error) {
            next(new Error("Main controller error: " + error));
        });
    }
};
