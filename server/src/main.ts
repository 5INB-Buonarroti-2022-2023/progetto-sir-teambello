import Express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { app } from "./server";


//db connection to app db
/*  Usate questa sezione se volete usare un db mongodb

const database = "test"
const uri = ``;
mongoose.set('strictQuery', false);
mongoose.connect(uri, async () => {

});
*/

const PORT = 3000;

app.listen(PORT, ()  => {
    console.log("hi! server started")
});

