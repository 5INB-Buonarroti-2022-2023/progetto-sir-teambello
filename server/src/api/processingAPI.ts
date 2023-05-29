import Express, { query } from "express";
import path from "path";
import fs from "fs";
import { pathToTmpImages } from "../server";
import { exec } from 'child_process'

import { UploadedFile } from "express-fileupload";
import { imageModel } from "../dbModels";
import { mongo } from "../main";
import mongoose from "mongoose";


class result {
    private _processedFileName: string;
    private _originalFileName: string;
    private _value: Number;


    constructor(originalFileName: string, processedFileName: string, value: Number) {
        this._originalFileName = originalFileName;
        this._processedFileName = processedFileName;
        this._value = value;
    }


    get originalFileName() {
        return this._originalFileName;
    }

    get processedFileName() {
        return this._processedFileName;
    }

    get value() {
        return this._value;
    }
}

interface ImageData {
    base64Image: string;
    message: string;
}

export class processingAPI {

    private readonly projection: { [key: string]: 0 | 1 } = {
        original_img: 1,
        processed_img: 1,
        result: 1,
        _id: 0,
    };

    private readonly pathToImages = pathToTmpImages;

    constructor(private app: Express.Application) {
        this.app.post("/api/process", this.process);
        this.app.get('/api/public', this.public);
    }

    private readonly dbName = 'bacteria';
    private public = async (req: Express.Request, res: Express.Response) => {

        mongoose.connect('mongodb+srv://Bacteria:Bacteria@bacteria.vjhddyx.mongodb.net/?retryWrites=true&w=majority',
            { dbName: this.dbName })
            .then(() => {
                console.log('Connected to MongoDB');


                // Perform the query with projection
                imageModel.find({}, this.projection, (err, documents) => {
                    if (err) {
                        console.error('Error executing query:', err);
                        return;
                    }

                    documents.forEach( doc => console.log('Query results:', doc.processed_img));

                    const resultQuery = documents.map(doc => {
                        return { processed_img: doc.processed_img, value: doc.result }
                    })

                    const imageData: ImageData[] = [];
                    resultQuery.forEach(result => {
                        const filePath = path.join(pathToTmpImages, result.processed_img!);
                        const data = fs.readFileSync(filePath);
                        const base64Image = Buffer.from(data).toString('base64');
                        imageData.push({
                            base64Image,
                            message: 'l\'immagine contiene circa ' + result.value! + ' elementi',
                        });

                    })


                    // Close the MongoDB connection
                    mongoose.connection.close();
                    res.json(imageData);
                });
            })
            .catch((err) => {
                console.error('Error connecting to MongoDB:', err);
            });


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

        await Promise.all(
            fileNames.map(async (file) => {
                return new Promise<void>((resolve) => {
                    exec(
                        'python3 ' + path.resolve('../processing/main.py' + '  ' + file),
                        async (error, stdout, stderr) => {
                            if (error) {
                                console.log(`error: ${error.message}`);
                            } else if (stderr) {
                                console.log(`stderr: ${stderr}`);
                            } else {
                                let procImgName = stdout.substring(0, stdout.indexOf(':')).trim();
                                let val = Number.parseInt(stdout.substring(stdout.indexOf(':') + 1).trim());
                                results.push(new result(file, procImgName, val));
                            }
                            resolve();
                        }
                    );
                });
            })
        );

        const imageData: ImageData[] = [];

        results.forEach(result => {

            //to add code for mongodb
            const immagine = new imageModel({
                original_img: result.originalFileName,
                processed_img: result.processedFileName,
                result: result.value,
            });

            immagine.save();

            const filePath = path.join(pathToTmpImages, result.processedFileName);
            const data = fs.readFileSync(filePath);
            const base64Image = Buffer.from(data).toString('base64');
            imageData.push({
                base64Image,
                message: 'l\'immagine contiene circa ' + result.value + ' elementi',
            });
        });

        res.json(imageData);
    }

}