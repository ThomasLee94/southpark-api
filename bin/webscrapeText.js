/* eslint-disable prefer-arrow-callback */
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
const _ = require('lodash'); 
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');

// CUSTOM IMPORT
const parse = require('./util/parse');

// MODELS
const { Line } = require('../source/api/lines/line.model');
const { Episode } = require('../source/api/episodes/episode.model');
const { Character } = require('../source/api/characters/character.model');

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
      const episodeAndSeasonNumber = $('#mw-content-text').find('table').eq(-1).find('tr').eq(-1).text().trim().split(':',1)[0];

      const seasonNumber = episodeAndSeasonNumber.length === 3 ? episodeAndSeasonNumber.substring(0,1) : episodeAndSeasonNumber.substring(0,2)
      const episodeNumber = episodeAndSeasonNumber.length === 3 ? episodeAndSeasonNumber.substring(1) : episodeAndSeasonNumber.substring(2)

      // CREATING AND SAVING EPISODE OBJECT
      const episodeObj = {
        episodeName,
        episodeNumber,
        seasonNumber,
        characterId: [],
        lineId: [],
      };

      const episode = new Episode(episodeObj);
      return episode.save();

    }).then(async (episode) => {
      // LOOPING THROUGH EVERY TR TAG
      const { length } = $('#mw-content-text').find('table').eq(-3).find('tr'); 
      const rows = $('#mw-content-text').find('table').eq(-3).find('tr')
        .map(function () {
          return {
            characterName: $(this).find('td').first().text().trim(),
            characterLine: $(this).find('td').last().text()
          }
        })

      for (let i = 3; i < length; i++) {
        const { characterName, characterLine } = rows[i];
        if (!characterName){
          continue 
        }
        const character = await Character.findOne({ name: characterName })
        if (!character) {
          await Character.create({ name: characterName })
          character = await Character.findOne({ name: characterName })
        }
        let line = new Line({
          line: characterLine,
          characterId: character._id,
          lineId: episode._id,
        })
        line = await line.save(); 

        episode.lineId.push(line._id);
        character.characterId.push(character._id);
        await Character.findOneAndUpdate({name: characterName}, {$push: { lines: line._id}})
      }
      episode.characterId = _.uniqWith(episode.characterId, _.isEqual);
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
