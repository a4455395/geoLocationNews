const fs = require('fs'),
    path = require('path');

let ids = [];

const updateFile = async (newIds) => {
    if(!newIds || newIds.length === 0 ) {
        console.log('no Ids provided!');
        return;
    }
    ids = await new Promise(resolve => {
        fs.readFile(__dirname + '/../freindIds.json', 'utf8', (err, data) => {
            resolve(JSON.parse(data).ids);
        })
    });

    ids = ids.concat(newIds.filter(id => !ids.includes(id)));

    await new Promise(resolve => {
        fs.writeFile(__dirname + '/../freindIds1.json', JSON.stringify({ids}), function(err) {
            if(err) {
                return console.log(err);
            }

            resolve()
        });
    });


    return ids;
};

module.exports = updateFile;