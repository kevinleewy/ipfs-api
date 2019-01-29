/**
 * Module dependencies.
 */
const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');
const app = express();

const api = require('./api');
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

//Getting the uploaded file via hash code.
app.get('/getfile', function(req, res) {
    
    //This hash is returned hash of addFile router.
    const validCID = 'QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv'

    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
	    console.log(file.path)
            //console.log(file.content.toString('utf8'))
        })
	res.json(files.map(file => file.path));
    })

})

//Getting the uploaded file via hash code.
app.get('/cat/:cid', function(req, res) {

    //This hash is returned hash of addFile router.
    const cid = req.params.cid;

    ipfs.cat(cid, function (err, file) {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            res.json(file.toString('utf8'));
	}
    })

})

//ls
app.get('/ls/:cid', function(req, res) {
    
    const cid = req.params.cid;
    console.log(cid);    
    ipfs.files.ls(cid, (err, files) => {
        if (err) {
            console.log(err);
	    res.json(err)
        } else {
            console.log(files);
	    res.json(files);
	}
    })	    
})

app.get('/swarm/addrs', function(req, res) {

    ipfs.swarm.addrs((err, addrs) => {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            console.log(addrs);
            res.json(addrs);
        }
    })
})

app.get('/swarm/peers', function(req, res) {

    ipfs.swarm.peers({verbose: false}, (err, peerInfos) => {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            console.log(peerInfos);
            res.json(peerInfos);
        }
    })
})

app.get('/id', function(req, res) {

    ipfs.id((err, identity) => {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            console.log(identity);
            res.json(identity);
        }
    })
})

app.get('/version', function(req, res) {

    ipfs.version((err, version) => {
        if (err) {
            console.log(err);
            res.json(err)
        } else {
            console.log(version);
            res.json(version);
        }
    })
})

// api router
app.use('/api', api({ config, ipfs }));

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`));
