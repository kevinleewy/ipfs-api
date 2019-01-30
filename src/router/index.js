import { Router } from 'express';

import {
    ConfigController,
    FilesController,
    MiscController,
    PinController,
    StatsController,
    SwarmController
} from '../controller';

export default ({ config, ipfs }) => {
    const router = Router();
    
    //Controllers
    const configController = new ConfigController(ipfs);
    const filesController = new FilesController(ipfs);
    const miscController = new MiscController(ipfs);
    const pinController = new PinController(ipfs);
    const statsController = new StatsController(ipfs);
    const swarmController = new SwarmController(ipfs);

    //
    router.get('/', (req, res) => {
		res.json({
            message: "Hello World",
            queryParams: req.params
        });
    });

    //Config
    router.get('/config', configController.get.bind(configController))
    router.get('/config/:key', configController.getByKey.bind(configController))
    //router.post('/config', configController.set.bind(configController))
    //router.post('/config/:key', configController.setByKey.bind(configController))

    //Files
    router.post('/add', filesController.add.bind(filesController))
    router.post('/addFromFs', filesController.addFromFs.bind(filesController))
    router.post('/addFromUrl', filesController.addFromURL.bind(filesController))
    router.get('/cat/:cid', filesController.cat.bind(filesController))
    router.get('/get/:cid', filesController.get.bind(filesController))
    router.get('/ls/:cid', filesController.ls.bind(filesController))

    //Miscellaneous
    router.get('/id', miscController.id.bind(miscController));
    router.get('/version', miscController.version.bind(miscController));

    //Network
    router.get('/swarm/addrs', swarmController.addrs.bind(swarmController));
    router.get('/swarm/peers', swarmController.peers.bind(swarmController));

    //Pin
    router.post('/pin/:hash', pinController.add.bind(pinController))
    router.get('/pin/:hash', pinController.ls.bind(pinController))
    router.delete('/pin/:hash', pinController.rm.bind(pinController))

    //Stats
    router.get('/stats/bw', statsController.bw.bind(statsController));
    router.get('/stats/repo', statsController.repo.bind(statsController));

	return router;
}