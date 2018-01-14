const keyWords = require('../keyWords.json').keyWords;

module.exports = function (text) {
    return text.match(new RegExp(keyWords.join('|'), 'gi')) !== null;
};