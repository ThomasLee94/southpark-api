//
// ─── A COLLECTION OF FUNCTIONS THAT WILL PARSE DATA TO BE SAVED TO DB ───────────
//

/* eslint-disable func-names */
/* eslint-disable camelcase */

/*
Cleans data to a form that can be used
Example: '301 edit'
  => {seasonNum: 03, episodeNum: 01}
*/

// TODO: FINISH

module.exports = {
  cleanUpSeason: (string) => {
    const str1 = 'edit';
    const strippedText1 = string.replace(':', '');
    const strippedText2 = strippedText1.replace(new RegExp(`\\b${str1}\\b`), '');
    const seasonNum = strippedText2.splice(0, 1);
    return seasonNum;
  },

  cleanUpEpisode: (string) => {
    const episodeNum = string.split(1, 2);
    return episodeNum;
  },

};
