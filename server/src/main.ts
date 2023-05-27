import Express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { app } from "./server";
import { imageModel } from "./dbModels";
import { userModel } from "./dbModels";

//db connection to app db
//  Usate questa sezione se volete usare un db mongodb

/*const database = "test"
const uri = `mongodb+srv://Bacteria:Bacteria@bacteria.vjhddyx.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(uri, async () => {

});*/
//mongoose.connect("mongodb+srv://Bacteria:Bacteria@bacteria.vjhddyx.mongodb.net/?retryWrites=true&w=majority")


const PORT = 3000;

app.listen(PORT, ()  => {
    console.log("hi! server started")
});
