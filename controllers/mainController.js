var apiClient       = require("../services/api_client"),
    config   	    = require('../config/config'),
    Q               = require("q");


/* -----------------   Controllers   ----------------- */
module.exports = {
    index: (req, res, next) => {
      res.render('index.hbs');
    },

    pokemon: (req, res, next) => {
      var pokemonId = req.query.pokemonId;

      if (pokemonId < 152) {
        // apiClient.getPokemonInfo(pokemonId).then((pokemonData) => {
          // console.log(pokemonData);
          res.render('pokemon.hbs', {
            pokemonId: pokemonId
          });
        // });
      }
    }
};
