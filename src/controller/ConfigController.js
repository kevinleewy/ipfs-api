import IPFSController from './IPFSController.js';

export default class ConfigController extends IPFSController {
    
    get(req, res) {

        this.ipfs.config.get((err, config) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(config);
            }
        })
    }
    
    getByKey(req, res) {

        const key = req.params.key;

        this.ipfs.config.get(key, (err, config) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(config);
            }
        })
    }
}