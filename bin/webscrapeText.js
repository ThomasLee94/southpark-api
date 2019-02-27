//
// ─── DATA SCRAPE FROM SOUTHPARK.FANDOM.COM ───────────────────────────────────────────
//

/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */

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

      let characterName;
      let characterLine; 

      // KEY VALUE PAIRS OF CHARACTER AND ARRAY OF LINES
      let characterAndLineObj = {}

      // SAVING TO DB


      // LOOPING THROUGH EVERY TR TAG
      let length = $('#mw-content-text').find('table').eq(-3).find('tr').length; 
      let characterAndLineArray = $('#mw-content-text').find('table').eq(-3).find('tr').each(function(i, e) {
        if (3 <= i && i < 5) {
          characterName = $(this).find('td').first().text();
          characterLine = $(this).find('td').last().text();
        }
      });
      // SAVE TO DB
      // const resultCharacterObj = {
      //   firstName: firstName,
      //   lastName: lastName, 
      //   lines: linesArr
      // };

      // const resultEpisodeObj = {

      // }

      // const resultSeasonObj = {

      // }

      // const resultLineObj = {

      // }

      // CREATING AND SAVING A NEW CHARACTER OBJECT
      // const character = new Character(result_obj);
      // return character.save()
    }).then((objects) => {
      console.log('data saved')
      if (urls.length > 0) {
        nextLink();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

nextLink();
