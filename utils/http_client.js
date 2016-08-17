"use strict";

var Q             = require("q"),
    config        = require('../config/config'),
    restConnector = require('restler'),
    logger        = require('../utils/logger'),
    NodeCache     = require("node-cache"),
    cache         = new NodeCache(),
    self          = {};


self.get = function(url, cacheTTL) {
    cacheTTL = cacheTTL || false;
    var deferred = Q.defer();
    restConnector.get(url, {timeout: config.services.restler_timeout})
        .on('success', (response) => {
            if (cacheTTL) {
                cache.set( url, response, cacheTTL, function( err, success ){
                    if( !err && success ){
                        logger.info( "Saved in cache " + url );
                    }
                });
            }
            deferred.resolve(response);
        })
        .on('fail', (err) => deferred.reject(err))
        .on('error', (err) => deferred.reject(err))
        .on('timeout', (err) =>  deferred.reject(err));

    return deferred.promise;
};


self.getCached = function(url, ttl) {
    ttl = ttl || config.services.standard_ttl;
    var deferred = Q.defer();
    cache.get( url, function( err, value ){
        if( !err && value != undefined ){
            logger.info( "Found in cache " + url );
            return deferred.resolve(value);
        }
        logger.info( "Not found in cache " + url );
        self.get(url, ttl).then(function(response) {
            return deferred.resolve(response);
        }).catch(function(){
            return deferred.reject();
        });
    });
    return deferred.promise;
};


self.getWithHeaders = function(url, headers) {
    var deferred = Q.defer();
    restConnector.get(url, {timeout: config.services.restler_timeout, headers: headers})
        .on('success', (response) => deferred.resolve(response))
        .on('fail', (err) => deferred.reject(err))
        .on('error', (err) => deferred.reject(err))
        .on('timeout', (err) =>  deferred.reject(err));

    return deferred.promise;
};


self.post = function(url, headers) {
    var deferred = Q.defer();
    restConnector.post(url, {timeout: config.services.restler_timeout, headers: headers})
        .on('success', (response) => deferred.resolve(response))
        .on('fail', (err) => deferred.reject(err))
        .on('error', (err) => deferred.reject(err))
        .on('timeout', (err) =>  deferred.reject(err));

    return deferred.promise;
};


self.put = function(url, headers) {
    var deferred = Q.defer();
    restConnector.put(url, {timeout: config.services.restler_timeout, headers: headers})
        .on('success', (response) => deferred.resolve(response))
        .on('fail', (err) => deferred.reject(err))
        .on('error', (err) => deferred.reject(err))
        .on('timeout', (err) =>  deferred.reject(err));

    return deferred.promise;
};


self.delete = function(url, headers) {
    var deferred = Q.defer();
    restConnector.del(url, {timeout: config.services.restler_timeout, headers: headers})
        .on('success', (response) => deferred.resolve(response))
        .on('fail', (err) => deferred.reject(err))
        .on('error', (err) => deferred.reject(err))
        .on('timeout', (err) =>  deferred.reject(err));

    return deferred.promise;
};

module.exports = self;