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
  let $;
  nightmare
    .goto(theURL)
    .evaluate(() => {
      return document.body.innerHTML;
    })
    .then((result) => {
      // LOADING HTML
      $ = cheerio.load(result);

      const episodeName = $('#mw-content-text').find('table').eq(-3).find('tr').first().text();
      const episodeAndSeasonNumber = $('#mw-content-text').find('table').eq(-1).find('tr').eq(-1).text();

      const seasonNum = parse.cleanUpSeason(episodeAndSeasonNumber);
      const episodeNum = parse.cleanUpEpisode(episodeAndSeasonNumber);

      // CREATING AND SAVING EPISODE OBJECT
      const episodeObj = {
        episodeName,
        episodeNumber: episodeNum,
        seasonNumber: seasonNum,
        characterId: [],
        lineId: [],
      };

      const episode = new Episode(episodeObj);
      return episode.save();

    }).then((episode) => {

      let characterName;
      let characterLine; 

      // LOOPING THROUGH EVERY TR TAG
      const { length } = $('#mw-content-text').find('table').eq(-3).find('tr'); 
      $('#mw-content-text').find('table').eq(-3).find('tr')
        .each(function(i, e) {
          if (3 <= i && i < length - 1) {
            characterName = $(this).find('td').first().text();
            characterLine = $(this).find('td').last().text();

            Character.findOrCreate({name: characterName })
              .then((character) => {
                let lineObj = {
                  line: characterLine,
                  characterId: character._id,
                  lineId: episode._id,
                };
                // TODO: COME BACK TO THIS, CHARACTER ID NEEDS TO BE UNIQUE
                episode.characcterId.push(character._id); 
                return new Lines(lineObj).save();
                
              }).then((line) => {
                episode.lineId.push(line._id)
                return Character.findOneAndUpdate({ name: characterName }, { $push: { lines: line._id}})
              }) 
          }
        });
      // SAVE TO DB

      // CREATING AND SAVING A NEW CHARACTER OBJECT
      // const character = new Character(result_obj);
      // return character.save()

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
