const express = require('express');

export default ({ config, ipfs }) => {
	let router = express.Router();

	router.get('/', (req, res) => {
		res.json("Hello World");
    });

    //Getting the uploaded file via hash code.
    router.get('/getfile', function(req, res) {
        
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
    router.get('/cat/:cid', function(req, res) {

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
    router.get('/ls/:cid', function(req, res) {
        
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

    router.get('/swarm/addrs', function(req, res) {

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

    router.get('/swarm/peers', function(req, res) {

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

    router.get('/id', function(req, res) {

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

    router.get('/version', function(req, res) {

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

	return router;
}