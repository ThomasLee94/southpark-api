/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */

// DATA SCRAPE FROM SCHOLARSHIPS.COM
require('dotenv').config()
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');
const Character = require('../source/api/characters/character.model');
require('./db/southpark-db');

// URL FOR ALL CHARACTERS
let url = 'http://wiki.southpark.cc.com/wiki/List_of_Characters'
// # TODO: ASK DANI IF YOU CAN LOOP THROUGH AN ARRAY WITH .togo WITH NIGHTMARE

nightmare
  .goto(url)
  .evaluate(() => {
    return document.body.innerHTML
  })
  .then((result) => {
    // LOADING HTML
    const $ = cheerio.load(result);

    const characterName = $('.character').children().text();
    

    // SAVE TEXT AS PROPERTY OF RESULT OBJ
    // const result_obj = {
    //   name: characterName,
    // };

    const scholarship = new Scholarship(result_obj);
    scholarship.save()
  })
  .catch((err) => {
    console.log(err)
  });
