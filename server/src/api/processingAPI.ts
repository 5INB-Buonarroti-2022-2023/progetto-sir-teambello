import Express from "express";
import path from "path";
import fs from "fs";
import { notFoundImage, pathToTmpImages } from "../server";
import multer from 'multer';
import { UploadedFile } from "express-fileupload";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathToTmpImages)
    },

    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {

        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
}










export class processingAPI {

    constructor(private app: Express.Application) {
        this.app.post("/api/process", this.process);
    }

    private readonly pathToImages = pathToTmpImages;

    private process = async (req: Express.Request, res: Express.Response) => {

        //saving image

        
        //const file = req.files.file;
        //(file as UploadedFile).mv(path.join(this.pathToImages, ".png"));

        //code to process




        //return image 
        const p = path.join(this.pathToImages, req.params.productID + ".png");
        // console.log(p);
        if (!fs.existsSync(p)) {
            // res.status(404).send("image not found");
            res.status(404).sendFile(notFoundImage);
            return;
        }
        res.send("hi");
        //res.sendFile(p);
        
    }
}