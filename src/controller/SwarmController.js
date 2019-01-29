const IPFSController = require("./IPFSController.js");

module.exports = class SwarmController extends IPFSController{
    
    addrs(req, res) {

        this.ipfs.swarm.addrs((err, addrs) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                console.log(addrs);
                res.json(addrs);
            }
        })
    }
    
    peers(req, res) {

        this.ipfs.swarm.peers({verbose: false}, (err, peerInfos) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                console.log(peerInfos);
                res.json(peerInfos);
            }
        })
    }
}