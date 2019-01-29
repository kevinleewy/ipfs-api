const IPFSController = require("./IPFSController.js");

module.exports = class MiscController extends IPFSController{
    
    id(req, res) {

        ipfs.id((err, identity) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                console.log(identity);
                res.json(identity);
            }
        })
    }
    
    version(req, res) {

        ipfs.version((err, version) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                console.log(version);
                res.json(version);
            }
        })
    }
}