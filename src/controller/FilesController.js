import IPFSController from './IPFSController.js';

export default class FilesController extends IPFSController {
    
    async add(req, res) {

        if(!Array.isArray(req.body)) {
            res.json({
                errCode: 1000,
                errMessage: 'Body must be of type array'
            })
            return;
        }

        try {
            const files = req.body.map(o => {
                return {
                    path: o.path,
                    content: this.ipfs.types.Buffer.from(o.content)
                };
            });
            const results = await this.ipfs.add(files);
            res.json(results);
        } catch(err) {
            res.json(err)}
    }
    
    addFromFs(req, res) {

        const path = req.body.path;
        
        const options = {
            recursive: true,    //add files recursively
            ignore: [],
            hidden: true    //add hidden/dot files
        }

        this.ipfs.addFromFs(path, options, (err, result) => {
            if (err) {
                console.log(err);
                res.json(err)
            } else {
                res.json(result);
            }
        })
    }

    addFromURL(req, res) {

        const url = req.body.url;

        this.ipfs.addFromURL(url, (err, result) => {
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

    get(req, res) {
        
        const cid = req.params.cid;

        this.ipfs.get(cid, (err, files) => {
            res.json(files.map(file => {
                return {
                    path: file.path,
                    content: file.content ? file.content.toString('utf8') : null
                }
            }));
        })

    }

    ls(req, res) {
        
        const cid = req.params.cid;
 
        this.ipfs.ls(cid, (err, files) => {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json(files);
            }
        })	    
    }
}