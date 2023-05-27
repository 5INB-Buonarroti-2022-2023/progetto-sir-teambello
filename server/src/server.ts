import cors from "cors";
import Express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { processingAPI } from "./api/processingAPI";
import { LoginAPI } from "./api/loginAPI";

export const app = Express();
app.use(fileUpload({
  createParentPath: true
}));


const pathToImages = path.resolve(path.join(__dirname, '../images/'));
export const notFoundImage = path.resolve(path.join(pathToImages, '/design/notFound.jpg'));
export const pathToSavedImages = path.resolve(path.join(pathToImages, '/service/saved/'));
export const pathToTmpImages = path.resolve(path.join(pathToImages, '/service/tmp/'));


app.get("/api/notfound/image", (req, res) => {
  res.setHeader('Content-Type', 'image/jpg');
  res.sendFile(path.resolve(notFoundImage));
});

new processingAPI(app);
new LoginAPI(app);