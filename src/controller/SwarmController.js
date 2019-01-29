import IPFSController from './IPFSController.js';

export default class SwarmController extends IPFSController {
    
    addrs(req, res) {

        this.ipfs.swarm.addrs((err, addrs) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(addrs);
            }
        })
    }
    
    peers(req, res) {

        const options = { verbose: false };
        
        this.ipfs.swarm.peers(options, (err, peerInfos) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(peerInfos);
            }
        })
    }
}