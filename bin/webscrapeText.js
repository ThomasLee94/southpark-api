//
// ─── DATA SCRAPE FROM SCHOLARSHIPS.COM ───────────────────────────────────────────
//

/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable func-names */
  
require('dotenv').config()
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const vo = require('vo');
const cheerio = require('cheerio');
const helper = require('./tokenize')
const Scholarship = require('../models/scholarship');
require('../database/scholarboard-db');

// WEBSCRAPE HELPER FUNCTIONS
const helper = require('./tokenize');

let url = [
  'https://southpark.fandom.com/wiki/Portal:Scripts'
]

nightmare
  .goto(url)
  .evaluate(() => {
    return document.body.innerHTML;
  })
  .then((result) => {
    // LOADING HTML
    const $ = cheerio.load(result);

    // EXTRACTING NEEDED INFORMATON FROM HTML BODY
    const scholName = $('.eyebrow').next().text();
    const scholDeadline = $('#due-date-text').text();
    const scholFunding = $('.award-info-row :nth-child(1)').text();
    const scholContact1 = $('#liAddress1Text').text();
    const scholContact2 = $('#liAddress2Text').text();
    const scholContact3 = $('#liCityStateZIPText').text();
    const scholContact4 = $('#ulScholDetails li:nth-child(8)').text();
    const scholContact = scholContact1 + scholContact2 + scholContact3 + scholContact4;
    const scholRequirements = $('#ulScholDetails li.scholdescrip div').text();

    // Cleaning up scrapped data. The ORDER OF APPENDING TO ARRAY MATTERS!!
    const clean_data = helper.cleanTextBody([scholName, scholDeadline, scholFunding, scholContact, scholRequirements]);

    // SAVE TEXT AS PROPERTY OF RESULT OBJ
    const result_obj = {
      name: clean_data[0],
      deadline: new Date(helper.dateFormat(clean_data[1])),
      funding: clean_data[2],
      contactInfo: clean_data[3],
      description: clean_data[4],
      grade: helper.extractGrade(scholRequirements),
      ethnicity: helper.extractEthnicity(scholRequirements),
      educationLevel: helper.extractEducationLevel(scholRequirements),
      gpa: helper.extractGPA(scholRequirements),
    };

    // CREATING AND SAVING A NEW SCHOLARSHIP OBJECT
    const scholarship = new Scholarship(result_obj);
    scholarship.save()

  })
  .catch((err) => {
    console.log(err);
  });
