import IPFSController from './IPFSController.js';

export default class FilesController extends IPFSController {
    
    cat(req, res) {

        const cid = req.params.cid;

        this.ipfs.cat(cid, function (err, file) {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(file.toString('utf8'));
            }
        })

    }
}