// var request = require("request");
//
// request({
//     uri: "https://coinmarketcap.com/all/views/all/",
// }, function(error, response, body) {
//     const res = body.match(/currency-name-container"\s+href="([^\'\"]+)"/g)
//         .map(s => s.match(/"([^\'\"]+)"$/)[1])
//     console.log(res);
// });

const rp = require('request-promise');
const getIds = require('./getIdsPartially');
const updateIds = require('../services/updateIds');

const base = 'https://coinmarketcap.com';

const screenNames = [];


rp(`${base}/new/`)
    .then((htmlString) => {
        const match = htmlString.match(/class="currency-logo" alt="[^\"\']+">\s+<a\s+href="([^\'\"]+)"/g);
        if (match === null) {
            throw new Error('unable to parse html');
        }
        return match.map(s => s.match(/href="([^\'\"]+)"$/)[1]);
    })
    .then(res => {
        res.sort();
        return Promise.all(res.map(getScreenName))
    })
    .then(() => {
        return getIds(screenNames);
    })
    .then(ids => updateIds(ids))
    // .then(() => {
    //     console.log('*'.repeat(20));
    //     console.log('subscribing...');
    //     console.log('*'.repeat(20));
    //     followMassive(screenNames);
    // })
    .catch(function (err) {
        throw err;
    });



function getScreenName(path) {
    return rp(`${base}${path}#social`)
        .then(htmlString => {
            const match = htmlString.match(/twitter-timeline"\s+href="([^\'\"]+)"/g);
            if (match !== null) {
                return match[0].match(/\/([^\'\"\/]+)"$/)[1];
            } else {
                return null;
            }
        })
        .then(s => {
            if (s) {
                screenNames.push(s);
            }
            return s;
        })
}