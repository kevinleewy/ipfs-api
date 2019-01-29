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

    set(req, res) {

        const newConfig = req.body.config;
        
        this.ipfs.config.replace(newConfig, (err) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json({
                    status: "OK"
                });
            }
        })
    }

    setByKey(req, res) {

        const { key, value } = req.body;

        this.ipfs.config.set(key, value, (err) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json({
                    status: "OK"
                });
            }
        })
    }
}