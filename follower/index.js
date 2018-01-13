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
const followScreenName = require('./followScreenName');

const base = 'https://coinmarketcap.com';

const screenNames = [];


rp(`${base}/all/views/all/`)
    .then((htmlString) => {
        return htmlString.match(/currency-name-container"\s+href="([^\'\"]+)"/g)
            .map(s => s.match(/"([^\'\"]+)"$/)[1]);
    })
    .then(res => {
        res.sort();
        res = res.slice(1200);
        return Promise.all(res.map(getScreenName))
    })
    .then(() => {
        console.log('"' + screenNames.join('", "')) + '"';
    })
    // .then(() => {
    //     console.log('*'.repeat(20));
    //     console.log('subscribing...');
    //     console.log('*'.repeat(20));
    //     followMassive(screenNames);
    // })
    .catch(function (err) {
        throw err;
    });


function followMassive(screenNames) {
    let i = 0;
    function myLoop () {
        setTimeout(function () {
            followScreenName(screenNames[i]);
            i++;
            if (i < screenNames.length) {
                myLoop();
            }
        }, 62 * 1000);
    }
    myLoop();
}


function getScreenName(path) {
    return rp(`${base}${path}#social`)
        .then(htmlString => {
            const match = htmlString.match(/twitter-timeline"\s+href="([^\'\"]+)"/g);
            if(match !== null) {
                return match[0].match(/\/([^\'\"\/]+)"$/)[1];
            } else {
                return null;
            }
        })
        .then(s => {
            if(s) {
                // console.log(s);
                screenNames.push(s);
            }
            return s;
        })
}