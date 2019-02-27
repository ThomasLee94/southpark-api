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

module.exports = {
  cleanUpSeason: (string) => {
    const stripped_text = string.replace(':', '');
    const seasonNum = stripped_text.splice(0, 2);
    return seasonNum;
  },

  cleanUpEpisode: (string) => {
    const stripped_text = string.replace(':', '');
    const episodeNum = stripped_text.splice(2, 2);
    return episodeNum;
  },

};
