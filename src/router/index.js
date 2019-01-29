import { Router } from 'express';

import {
    ConfigController,
    FilesController,
    MiscController,
    StatsController,
    SwarmController
} from '../controller';

export default ({ config, ipfs }) => {
    const router = Router();
    
    //Controllers
    const configController = new ConfigController(ipfs);
    const filesController = new FilesController(ipfs);
    const miscController = new MiscController(ipfs);
    const statsController = new StatsController(ipfs);
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

    //Config
    router.get('/config', configController.get.bind(configController))
    router.get('/config/:key', configController.getByKey.bind(configController))
    //router.post('/config', configController.set.bind(configController))
    //router.post('/config/:key', configController.setByKey.bind(configController))

    //Files
    router.post('/add', filesController.add.bind(filesController))
    router.post('/addFromFs', filesController.addFromFs.bind(filesController))
    router.post('/addFromUrl', filesController.addFromUrl.bind(filesController))
    router.get('/cat/:cid', filesController.cat.bind(filesController))
    router.get('/ls/:cid', filesController.ls.bind(filesController))

    //Miscellaneous
    router.get('/id', miscController.id.bind(miscController));
    router.get('/version', miscController.version.bind(miscController));

    //Network
    router.get('/swarm/addrs', swarmController.addrs.bind(swarmController));
    router.get('/swarm/peers', swarmController.peers.bind(swarmController));

    //Stats
    router.get('/stats/bw', statsController.bw.bind(statsController));
    router.get('/stats/repo', statsController.repo.bind(statsController));

	return router;
}