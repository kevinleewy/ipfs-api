import IPFSController from './IPFSController.js';

export default class PinController extends IPFSController {
    
    add(req, res) {

        const hash = req.params.hash;
        const options = { recursive: true };

        this.ipfs.pin.add(hash, options, (err, result) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(result);
            }
        })
    }

    ls(req, res) {
        
        const hash = req.params.hash;
 
        this.ipfs.pin.ls(hash, (err, pinset) => {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json(pinset);
            }
        })	    
    }

    rm(req, res) {
        
        const hash = req.params.hash;
        const options = { recursive: true };
 
        this.ipfs.pin.rm(hash, options, (err, pinset) => {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json(pinset);
            }
        })	    
    }
}