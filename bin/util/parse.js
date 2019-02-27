//
// ─── A COLLECTION OF FUNCTIONS THAT WILL PARSE DATA TO BE SAVED TO DB ───────────
//

/* eslint-disable func-names */
/* eslint-disable camelcase */

module.exports = {
  /*
  Cleans data to a form that can be used
  Example: '301 edit'
    => {seasonNum: 03, episodeNum: 01}
  */
  cleanUpSeas: (string) => {
    const stripped_text = string.replace(':', '');
    const outputString = [];
    
  },

  /* Cleans up a body of text from special characters
    @param - stringArray : An array of strings to be cleaned up
    @return - clean_strings : An array of cleaned up string in order they were passed
  */
  cleanUpEpisode: (string) => {
    let clean_strings = [];
    stringArray.forEach((string) => {
      clean_strings.push(string.replace(/(\t\n|\n|\t)/gm, ''))
    });
    return clean_strings;
  },

};
