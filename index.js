const Twit = require('twit');
const TelegramBot = require('node-telegram-bot-api');
const isMatch = require('./parser');
const friensIds = require('./freindIds').ids;

// replace the value below with the Telegram token you receive from @BotFather
const token = '528157715:AAHouPwxLAUW1tlXm3vCbllVfx_2Yikw_HQ';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const T = new Twit({
    consumer_key:         'ZWrpTbQ6qKiJTN07EPBm9tl0O',
    consumer_secret:      'tmNQr7O2PEhNJZqVweN9ZDUTTGqMqNhqZcgAUWwYWvstBJQ60N',
    access_token:         '943902131781865472-fIRF4CMTZ55diW0gwnHNVA0kbVA72f4',
    access_token_secret:  'jl3JCMDrUqfsn7BM3UeP8Dexd8Lp8YC3oWIcJhnndbrkk',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

let subscribers = {"464134263": true, "496960017": true};

const createStream = (friends, id) => {
    const stream = T.stream('statuses/filter', { follow: friends });
    stream.on('tweet', function (tweet) {
        try {
            console.log(tweet.text);
            const {text} = tweet;
            if(isMatch(text) && friensIds.includes(tweet.user.id_str)) {
                Object.keys(subscribers)
                    .forEach(chatId => bot.sendMessage(chatId, text));
            }
        } catch (e) {
            throw e;
        }
        // bot.sendMessage(464134263, 'hi');
    });

    stream.on('error', function (err) {
        throw err;
    });
    return stream;
};

const stream1 = createStream(friensIds.slice(0,700)),
    stream2 = createStream(friensIds.slice(700));
console.log(stream1, stream2);

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if(msg.text.toLocaleLowerCase() === 'exit') {
        delete subscribers[chatId];
        return bot.sendMessage(chatId, "your subscribtion have sucsessfully dismissed!");
    }
    if(subscribers[chatId] === true) {
        return bot.sendMessage(chatId, "you are already subscribed to channel!");
    } else if(msg.text.trim().toLocaleLowerCase() === "hello my friend") {
        subscribers[chatId] = true;
        return bot.sendMessage(chatId, "you successfully subscribed to the channel!")
    } else {
        return bot.sendMessage(chatId, "to join this channel please contact: a4455395@gmail.com.");
    }
// send back the matched "whatever" to the chat
});

console.log('started');

//------------fake server for heroku-------------
const http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(process.env.PORT || '3100', "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');