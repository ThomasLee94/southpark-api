//
// ─── DATA SCRAPE FROM SOUTHPARK.FANDOM.COM ───────────────────────────────────────────
//

/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */

require('dotenv').config(); 
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');
// const cheerioAdv = require('cheerio-advanced-selectors');
// cheerio = cheerioAdv.wrap(cheerio)

const Lines = require('../source/api/lines/line.model');
const Episode = require('../source/api/episodes/episode.model');
const Season = require('../source/api/seasons/season.model');
const Character = require('../source/api/characters/character.model');
require('./db/southpark-db');

let urls = [
  'https://southpark.fandom.com/wiki/Rainforest_Shmainforest/Script',
];

let linesArr = ['hi']; 

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
      const seasonNum = 
      const episodeNum = 

      // TODO: Regex on episdodeandseasonnum, currently in '301: edit' format. 

      let characterName;
      let characterLine; 

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

            for (let character in characterAndLineObj) {
              if (characterAndLineObj.hasOwnProperty(character)) {
                characterAndLineObj.characterName = [{
                  line: `${characterLine}`,
                  season: '3',
                  episode: `${episodeNum}`,
                }];
              } else {
                characterAndLineArray.characterName.append({
                  line: `${characterLine}`,
                  season: '3',
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
