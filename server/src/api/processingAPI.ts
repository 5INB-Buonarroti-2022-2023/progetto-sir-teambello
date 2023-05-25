import Express from "express";
import path from "path";
import fs from "fs";
import { notFoundImage, pathToTmpImages } from "../server";
import multer from 'multer';
import { UploadedFile } from "express-fileupload";


export class processingAPI {
    private readonly pathToImages = pathToTmpImages;
    private diskStorage = multer.diskStorage({
        destination:  pathToTmpImages,

        filename: (req, file, cb) => {           
            cb(null, file.fieldname+"-"+Date.now() + path.extname(file.originalname));
            //console.log(file);
        }
    });
    private upload = multer({ storage: this.diskStorage });

    constructor(private app: Express.Application) {
        this.app.post("/api/process",this.upload.array("images"), this.process);
    }


    private process = async (req: Express.Request, res: Express.Response) => {
        console.log(req.files);
        
        if (!req.files?.file || !req.body.name || !req.body.price || !req.body.description) {
            res.status(418).send("invalid request");
            return;
        }


        const file = req.files.file;
        //(file as UploadedFile).mv(path.join(pathToTmpImages, p._id + ".png"));

        /*
        const o = req.files;
        const asd : UploadedFile = o[0];
        console.log(asd.name);

        */        
        
        //saving image in db

        
        //code to process




        //return image 
        //const p = path.join(this.pathToImages, req.params.productID + ".jpg");
        const p = path.join(this.pathToImages, "test.jpg");
        if (!fs.existsSync(p)) {
            res.status(404).sendFile(notFoundImage);
            return;
        }
        res.send('ok')
        //res.sendFile(p);

    }
}