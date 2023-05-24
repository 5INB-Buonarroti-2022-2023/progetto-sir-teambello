import cors from "cors";
import Express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { processingAPI } from "./api/processingAPI";

export const app = Express();

const pathToImages = path.resolve(path.join(__dirname, '../images/'));
console.log(__dirname);
export const notFoundImage = path.resolve(path.join(pathToImages, '/design/notFound.png'));
export const pathToSavedImages = path.resolve(path.join(pathToImages, '/service/saved/'));
export const pathToTmpImages = path.resolve(path.join(pathToImages, '/service/tmp/'));


app.get("/api/notfound/image", (req, res) => {
  res.setHeader('Content-Type', 'image/jpg');
  res.sendFile(path.resolve(notFoundImage));
});

new processingAPI(app);