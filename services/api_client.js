"use strict";

var config        = require('../config/config'),
    self          = {},
    restConnector = require('restler'),
    Q = require("q");

const API_ENDPOINT = "http://pokeapi.co/api/v2/";

self.getPokemonInfo = (id) => {
  var deferred = Q.defer(),
    url = API_ENDPOINT + 'pokemon/' + id;

  console.log("URL: " + url);

  restConnector.get(url)
    .on('success', (pokemonData) => { deferred.resolve(pokemonData) })
    .on('fail', (data, response) => { deferred.reject(data.status_code) })
    .on('error', (err) => deferred.reject(err))
    .on('timeout', (err) =>  deferred.reject(err));


  return deferred.promise;
};

module.exports = self;
