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

    //
    router.get('/', (req, res) => {
		res.json({
            message: "Hello World",
            queryParams: req.params
        });
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

    //Files
    router.get('/addFromFs/:path', filesController.addFromFs.bind(filesController))
    router.get('/cat/:cid', filesController.cat.bind(filesController))
    router.get('/ls/:cid', filesController.ls.bind(filesController))

    //Miscellaneous
    router.get('/id', miscController.id.bind(miscController));
    router.get('/version', miscController.version.bind(miscController));

    //Network
    router.get('/swarm/addrs', swarmController.addrs.bind(swarmController));
    router.get('/swarm/peers', swarmController.peers.bind(swarmController));

	return router;
}