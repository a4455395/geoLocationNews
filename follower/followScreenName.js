const Twit = require('twit');

const T = new Twit({
    consumer_key:         'ZWrpTbQ6qKiJTN07EPBm9tl0O',
    consumer_secret:      'tmNQr7O2PEhNJZqVweN9ZDUTTGqMqNhqZcgAUWwYWvstBJQ60N',
    access_token:         '943902131781865472-fIRF4CMTZ55diW0gwnHNVA0kbVA72f4',
    access_token_secret:  'jl3JCMDrUqfsn7BM3UeP8Dexd8Lp8YC3oWIcJhnndbrkk',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

module.exports = function followScreenName(screen_name) {
    T.post('friendships/create', { screen_name },  function (err, data, response) {
        if(err) {
            throw err;
        }
        console.log('followed: ' + screen_name);
    });
};
