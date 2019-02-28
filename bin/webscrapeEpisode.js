//
// ─── DATA SCRAPE FROM SOUTHPARK.FANDOM.COM ───────────────────────────────────────────
//

/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */

// IMPORTS
require('dotenv').config();
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');

// CUSTOM IMPORT
const parse = require('./util/parse');

// MODELS
const Episode = require('../source/api/episodes/episode.model');

// DB AND MONGOOSE CONNECTION
require('./db/southpark-db');

let urls = [
  'https://southpark.fandom.com/wiki/Rainforest_Shmainforest/Script',
];

const nextLink = () => {
  const theURL = urls.pop();
  nightmare
    .goto(theURL)
    .evaluate(() => {
      return document.body.innerHTML;
    })
    .then((result) => {
      // LOADING HTML
      const $ = cheerio.load(result);

      // EXTRACTING NEEDED INFORMATON FROM HTML BODY
      // AM ABLE TO GRAB ALL VARIABLES CORRECTLY
      const episodeName = $('#mw-content-text').find('table').eq(-3).find('tr').first().text();
      const episodeAndSeasonNumber = $('#mw-content-text').find('table').eq(-1).find('tr').eq(-1).text();

      const seasonNum = parse.cleanUpSeason(episodeAndSeasonNumber);
      const episodeNum = parse.cleanUpEpisode(episodeAndSeasonNumber);

      // CREATING AND SAVING EPISODE OBJECT
      const episodeObj = {
        episodeName,
        episodeNumber: episodeNum,
        seasonNumber: seasonNum,
      };

      const episode = new Episode(episodeObj);
      return episode.save();
      
    }).then((objects) => {
      console.log('data saved');
      if (urls.length > 0) {
        nextLink();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

nextLink();
