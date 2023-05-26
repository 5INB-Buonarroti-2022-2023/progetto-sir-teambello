import Express from "express";
import path from "path";
import fs from "fs";
import { notFoundImage, pathToTmpImages } from "../server";
import { exec } from 'child_process'

import { UploadedFile } from "express-fileupload";
import spawn from 'child_process';

export class processingAPI {
    private readonly pathToImages = pathToTmpImages;

    constructor(private app: Express.Application) {
        this.app.post("/api/process", this.process);
    }

    private process = async (req: Express.Request, res: Express.Response) => {
        //saving image
        if (!req.files?.images) {
            // console.log("Invalid request");
            res.status(400).send("invalid request");
            return;
        }

        const fileNames: string[] = [];

        if (Array.isArray(req.files?.images)) {
            const files = req.files!.images as UploadedFile[];
            files.map(file => {
                const fileName = path.join(this.pathToImages, Math.trunc(Math.random() * 10000) + Date.now() + ".png");
                (file as UploadedFile).mv(fileName);
                return fileName;
            });

        } else {
            fileNames.push(path.join(this.pathToImages, Math.trunc(Math.random() * 10000) + Date.now() + ".png"));
            (req.files.images as UploadedFile).mv(fileNames[0]);
        }



        //process image
        console.log(path.join('../../../processing/main.py'));
        fileNames.forEach(file => {

            /*
            exec('python3 '+path.join('../../../processing/main.py') + file , (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                }
                else if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }
                else {
                    console.log(stdout);
                }
            })*/


            spawn.execFile('../../../processing/main.py');
            
        }
        )

        //6) return processed image 
        //const p = path.join(this.pathToImages, req.params.productID + ".jpg");
        const p = path.join(this.pathToImages, "test.jpg");
        if (!fs.existsSync(p)) {
            res.status(404).sendFile(notFoundImage);
            return;
        }
        res.sendFile(p);

    }

}