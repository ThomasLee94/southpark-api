/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */

// DATA SCRAPE FROM SCHOLARSHIPS.COM
require('dotenv').config()
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio');
const Scholarship = require('../models/scholarship');
require('./db/scholarboard-db');

let url = 'http://wiki.southpark.cc.com/wiki/List_of_Characters'
// # TODO: ASK DANI IF YOU CAN LOOP THROUGH AN ARRAY WITH .togo WITH NIGHTMARE
// let url = [
//   'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-major/accounting-scholarships/%C2%A1adelante-fund-millercoors-colorado-scholarship/',

// ]

nightmare
  .goto(url)
  .evaluate(() => {
    return document.body.innerHTML
  })
  .then((result) => {
    // LOADING HTML
    const $ = cheerio.load(result);

    // VARIBALES THAT NEED TO BE ADDED TO THE MODEL
    // const scholName = $('#innercontent nth-child(2)').text();
    const characterName = $('.character').children().text();
    

    // SAVE TEXT AS PROPERTY OF RESULT OBJ
    const result_obj = {
      name: scholName,
      deadline: scholDeadline,
      funding: scholFunding,
      contactInfo: scholContact,
      requirements: scholRequirements,
    };

    const scholarship = new Scholarship(result_obj);
    scholarship.save()
  })
  .catch((err) => {
    console.log(err)
  });
