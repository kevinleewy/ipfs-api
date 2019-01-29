/**
 * Module dependencies.
 */
const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');
const app = express();

const router = require('./router');
const config = require('./config.json');

//Connecting to the ipfs network via infura gateway
const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

//Reading file from computer
let testFile = fs.readFileSync("assets/hello.txt");
//Creating buffer for ipfs function to add file to the system
let testBuffer = new Buffer(testFile);

//Addfile router for adding file a local file to the IPFS network without any local node
app.get('/addfile', function(req, res) {

    ipfs.files.add(testBuffer, function (err, file) {
        if (err) {
            console.log(err);
        }
        console.log(file);
    })

})

// api router
app.use('/api', router({ config, ipfs }));

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`));
