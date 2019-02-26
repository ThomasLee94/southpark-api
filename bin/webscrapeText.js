//
// ─── DATA SCRAPE FROM SOUTHPARK.FANDOM.COM ───────────────────────────────────────────
//

/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */

require('dotenv').config()
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');
const cheerioAdv = require('cheerio-advanced-selectors');
// cheerio = cheerioAdv.wrap(cheerio)

const Lines = require('../source/api/lines/line.model');
const Episode = require('../source/api/episodes/episode.model');
const Season = require('../source/api/seasons/season.model');
const Character = require('../source/api/characters/character.model');
require('./db/southpark-db');

let urls = ['https://southpark.fandom.com/wiki/Rainforest_Shmainforest/Script'];

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
      const episodeName = $('dl:first-child > i:first-child').text();
      const episodeAndSeasonNumber = $('table:last-child > tbody > tr > th > table > tbody > tr > a').text();
      // console.log(episodeAndSeasonNumber)

      let characterName;
      let line; 

      // LOOPING THROUGH EVERY TR TAG
      let characterAndLineArray = $('table > tbody > tr').each(function(i, e) {console.log($(this).first('td > span').text())});
      // console.log(characterAndLineArray.length)
      // for (let i in characterAndLineArray) {
      //   if (i < 5) {

      //     console.log(characterAndLineArray[i].text());
      //   }
      // }
      // let test = characterAndLineArray;
      // console.log(characterAndLineArray.next.text())
      // characterAndLineArray = $('table > tbody> tr:first-child');
      // characterAndLineArray.forEach((item) => {
      //   characterName = $('td:first-child > span:first-child').text();
      //   line = $('td:nth-child(2) > span:first-child').text();
      // }); 



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
        nextLink()
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

nextLink();
