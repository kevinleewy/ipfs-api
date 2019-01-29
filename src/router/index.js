import { Router } from 'express';

import {
    FilesController,
    MiscController,
    SwarmController
} from '../controller';

export default ({ config, ipfs }) => {
    const router = Router();
    
    //Controllers
    const filesController = new FilesController(ipfs);
    const miscController = new MiscController(ipfs);
    const swarmController = new SwarmController(ipfs);

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
    router.get('/cat/:cid', filesController.cat)

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

    router.get('/id', miscController.id)
    router.get('/version', miscController.version)

    router.get('/swarm/addrs', SwarmController.addrs);
    router.get('/swarm/peers', swarmController.peers);

	return router;
}