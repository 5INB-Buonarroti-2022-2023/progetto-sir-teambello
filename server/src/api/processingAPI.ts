import Express from "express";
import path from "path";
import fs from "fs";
import { notFoundImage, pathToTmpImages } from "../server";
import multer from 'multer';
import {exec} from 'child_process'

import { UploadedFile } from "express-fileupload";


export class processingAPI {
    private readonly pathToImages = pathToTmpImages;

    private diskStorage = multer.diskStorage({
        destination:  this.pathToImages,

        filename: (req, file, cb) => {           
            cb(null, file.fieldname+"-"+Date.now() + path.extname(file.originalname));
            //console.log(file);
        }
    });

    private upload = multer({ storage: this.diskStorage  });

    constructor(private app: Express.Application) {
        this.app.post("/api/process",this.process);
    }


    /*
        1)  caricata immagine utente
        2)  rinomaninata con date.now()
        3)  salvata in /images/tmp
        4)  processing dell'immagine
        4)  salvato sul db secondo il seguente schema: 
        {
            id : number
            path : original img
            path : processed img
            risultato : number
        }
        5) restituita immagine processata
    */
    private process = async (req: Express.Request, res: Express.Response) => {
        console.log(req.files);
        
        if (!req.files?.file || !req.body.name || !req.body.price || !req.body.description) {
            res.status(418).send("invalid request");
            return;
        }
        this.upload.array("images");
        
        

        const file = req.files.file;
        (file as UploadedFile).mv(path.join(this.pathToImages,"png"));

        /*
        const o = req.files;
        const asd : UploadedFile = o[0];
        console.log(asd.name);

        */        
        

        //saving image in db
        const imageID = '';
        
        //code to process
        exec('python3 processing/main.py '+this.pathToImages+imageID, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
            }
            else if (stderr) {
              console.log(`stderr: ${stderr}`);
            }
            else {
              console.log(stdout);
            }
          })
          



        //return processed image 
        //const p = path.join(this.pathToImages, req.params.productID + ".jpg");
        const p = path.join(this.pathToImages, "processed-"+imageID);
        if (!fs.existsSync(p)) {
            res.status(404).sendFile(notFoundImage);
            return;
        }
        res.send('ok')
        //res.sendFile(p);

    }
}