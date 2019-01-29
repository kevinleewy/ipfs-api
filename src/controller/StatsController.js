import IPFSController from './IPFSController.js';

export default class StatsController extends IPFSController {
    
    bw(req, res) {

        this.ipfs.stats.bw((err, stats) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(stats);
            }
        })
    }
    
    repo(req, res) {
        
        this.ipfs.stats.repo((err, stats) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(stats);
            }
        })
    }
}