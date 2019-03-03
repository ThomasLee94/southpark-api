//
// ─── A COLLECTION OF FUNCTIONS THAT WILL PARSE DATA TO BE SAVED TO DB ───────────
//

/* eslint-disable func-names */
/* eslint-disable camelcase */

/*
Cleans data to a form that can be used
Example: '301:epsidoeName edit'
  => {seasonNum: 3, episodeNum: 1}
*/

const stringToArrPerChar = (string) => {
  outputArr = [];
  for (let i = 0; i < string.length; i++){
    outputArr.push(i);
  }
  return outputArr;
}

module.exports = {
  cleanUpSeason: (string) => {
    // REMOVE ALL TEXT
    const strippedText = string.replace(/\D/g,'');
    const seasonAndEpArr = stringToArrPerChar(strippedText);
    // ['3','0',''1];
    return seasonAndEpArr.splice(0, 1).toString();
  },

  cleanUpEpisode: (string) => {
    // REMOVE ALL TEXT
    const strippedText = string.replace(/\D/g,'');
    const seasonAndEpArr = stringToArrPerChar(strippedText);
    return seasonAndEpArr.splice(1, 1).toString();
  },

  // cleanUpText: (string) => {

  // }

};
