/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */

// DATA SCRAPE FROM SOUTHPARK WIKI
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');
const fs = require('fs');

// URL FOR ALL CHARACTERS
let url = 'http://wiki.southpark.cc.com/wiki/List_of_Characters'

nightmare
  .goto(url)
  .evaluate(() => {
    return document.body.innerHTML
  })
  .then((result) => {
    // LOADING HTML
    const $ = cheerio.load(result);
    let characterNameArr = [];
    const characterName = $('.character').children()
    characterName.each((i, child) => {
      if (child.children[child.children.length - 1]  !== undefined) {
        characterNameArr.push(child.children[child.children.length - 1].data)
      }
    });

    fs.writeFileSync('southparkNames.js', characterNameArr)

  })
  .catch((err) => {
    console.log(err); 
  });
