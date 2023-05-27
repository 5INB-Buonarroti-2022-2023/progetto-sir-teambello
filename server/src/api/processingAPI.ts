import Express from "express";
import path from "path";
import fs from "fs";
import { notFoundImage, pathToTmpImages } from "../server";
import { exec } from 'child_process'

import { UploadedFile } from "express-fileupload";
import { imageModel } from "../dbModels";

class result {
    _fileName: string;
    _value: Number;


    constructor(fileName: string, value: Number) {
        this._fileName = fileName;
        this._value = value;
    }

    get fileName() {
        return this._fileName;
    }

    public get value(): Number {
        return this._value;
    }
}

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
                const fileName = Math.trunc(Math.random() * 10000) + Date.now() + ".jpg";
                (file as UploadedFile).mv(path.join(this.pathToImages, fileName));
                return fileName;
            });

        } else {
            fileNames.push(Math.trunc(Math.random() * 10000) + Date.now() + ".jpg");
            (req.files.images as UploadedFile).mv(path.join(this.pathToImages, fileNames[0]));
        }



        //process image
        let results: result[] = [];

        fileNames.forEach(async (file) => {
            exec('python3 ' + path.resolve('../processing/main.py' + '  ' + file), (error, stdout, stderr) => {

                if (error) {
                    console.log(`error: ${error.message}`);
                }
                else if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }
                else {
                    let procImgName = stdout.substring(0, stdout.indexOf(':')).trim();
                    let val = Number.parseInt(stdout.substring(stdout.indexOf(':') + 1).trim());
                    console.log(procImgName);
                    console.log(val);
                    results.push(new result(procImgName, val));
                    console.log(results);
                }
            })

        }
        )

        //problema di asyncronicità

        console.log('tst')
        
        //6) return processed image 
        //const p = path.join(this.pathToImages, req.params.productID + ".jpg");
        // const p = path.join(this.pathToImages, results[0].fileName);

        /*
                if (!fs.existsSync(p)) {
                    res.status(404).sendFile(notFoundImage);
                    return;
                }
                res.sendFile(p);
          
            */
    }

}