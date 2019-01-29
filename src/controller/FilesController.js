import IPFSController from './IPFSController.js';

export default class FilesController extends IPFSController {
    
    add(req, res) {

        this.ipfs.files.add(path, (err, result) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(result);
            }
        })
    }
    
    addFromFs(req, res) {

        const path = req.body.path;
        
        const options = {
            recursive: true,    //add files recursively
            ignore: [],
            hidden: true    //add hidden/dot files
        }

        this.ipfs.util.addFromFs(path, options, (err, result) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(result);
            }
        })
    }

    addFromUrl(req, res) {

        const url = req.body.url;

        this.ipfs.util.addFromUrl(url, (err, result) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(result);
            }
        })
    }
    
    cat(req, res) {

        const cid = req.params.cid;

        this.ipfs.cat(cid, (err, file) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(file.toString('utf8'));
            }
        })
    }

    ls(req, res) {
        
        const cid = req.params.cid;
 
        ipfs.files.ls(cid, (err, files) => {
            if (err) {
                console.log(err);
            res.json(err)
            } else {
                console.log(files);
                res.json(files);
            }
        })	    
    }
}