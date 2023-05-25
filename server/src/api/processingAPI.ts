import Express from "express";
import path from "path";
import fs from "fs";
import { notFoundImage, pathToTmpImages } from "../server";
import multer from 'multer';


export class processingAPI {
    private readonly pathToImages = pathToTmpImages;
    private diskStorage = multer.diskStorage({
        destination:  "server/images/service/tmp/",

        filename: (req, file, cb) => {           
            cb(null, file.fieldname+"-"+Date.now() + path.extname(file.originalname));
            console.log(file);
        }
    });
    private upload = multer({ storage: this.diskStorage });

    constructor(private app: Express.Application) {
        this.app.post("/api/process",this.upload.array("images"), this.process);
    }


    private process = async (req: Express.Request, res: Express.Response) => {
        console.log(req.files);
        //saving image

        //const file = req.files.file;
        //(file as UploadedFile).mv(path.join(this.pathToImages, ".png"));

        //code to process




        //return image 
        //const p = path.join(this.pathToImages, req.params.productID + ".jpg");
        const p = path.join(this.pathToImages, "test.jpg");
        console.log(p);
        if (!fs.existsSync(p)) {
            res.status(404).sendFile(notFoundImage);
            return;
        }
        res.sendFile(p);

    }
}