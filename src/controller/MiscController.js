import IPFSController from './IPFSController.js';

export default class MiscController extends IPFSController {
    
    id(req, res) {

        this.ipfs.id((err, identity) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(identity);
            }
        })
    }
    
    version(req, res) {

        this.ipfs.version((err, version) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(version);
            }
        })
    }
}