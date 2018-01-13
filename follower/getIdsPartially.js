const Twit = require('twit');

const names = require('./names').names;

const T = new Twit({
    consumer_key:         'ZWrpTbQ6qKiJTN07EPBm9tl0O',
    consumer_secret:      'tmNQr7O2PEhNJZqVweN9ZDUTTGqMqNhqZcgAUWwYWvstBJQ60N',
    access_token:         '943902131781865472-fIRF4CMTZ55diW0gwnHNVA0kbVA72f4',
    access_token_secret:  'jl3JCMDrUqfsn7BM3UeP8Dexd8Lp8YC3oWIcJhnndbrkk',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

let ids = [];

// for (let i = 0; i < names.length; i+=99) {
//     T.get('users/lookup', { screen_name : names.slice(i, i+99) }, function (err, data, resp) {
//         data.forEach(({id_str}) => console.log(`"${id_str}",`));
//     })
// }


module.exports = async function (names) {
    ids = [];

    await T.get('users/lookup', { screen_name : names })
        .then(({data}) => {
            data.forEach(({id_str}) => {
                ids.push(id_str);
            });
        });

    return ids;
};
