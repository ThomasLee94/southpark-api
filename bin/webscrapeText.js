//
// ─── DATA SCRAPE OF TEXT FROM SOUTHPARK.FANDOM.COM ───────────────────────────────────────────
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
const Lines = require('../source/api/lines/line.model');
const Episode = require('../source/api/episodes/episode.model');
const Season = require('../source/api/seasons/season.model');
const Character = require('../source/api/characters/character.model');

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

      let characterName;
      let characterLine; 

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

      /* KEY VALUE PAIRS OF CHARACTRY AND ARRAY CONTAINING OBJ OF LINES
      {character: [{
          line: characterLine, 
          season: seasonNum,
          episode: episodeNum,
        }]
      }
      */
      const characterAndLineObj = {};

      // LOOPING THROUGH EVERY TR TAG
      const { length } = $('#mw-content-text').find('table').eq(-3).find('tr'); 
      const characterAndLineArray = $('#mw-content-text').find('table').eq(-3).find('tr')
        .each(function(i, e) {
          if (3 <= i && i < length - 1) {
            characterName = $(this).find('td').first().text();
            characterLine = $(this).find('td').last().text();

            // ADDING TO CHARACTER-AND-LINEOBJ
            for (characterName in characterAndLineObj) {
              if (!characterAndLineObj.hasOwnProperty(characterName)) {
                characterAndLineObj[characterName] = [{
                  line: `${characterLine}`,
                  season: `${seasonNum}`,
                  episode: `${episodeNum}`,
                }];
              } else {
                characterAndLineArray[characterName].push({
                  line: `${characterLine}`,
                  season: `${seasonNum}`,
                  episode: `${episodeNum}`,
                });
              }
            }
          }
        });
      // SAVE TO DB

      // CREATING AND SAVING A NEW CHARACTER OBJECT
      // const character = new Character(result_obj);
      // return character.save()
      
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
