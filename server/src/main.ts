import mongoose from "mongoose";
import { app } from "./server";

//db connection to app db
//  Usate questa sezione se volete usare un db mongodb

/*const database = "test"
const uri = `mongodb+srv://Bacteria:Bacteria@bacteria.vjhddyx.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(uri, async () => {

});*/
export const mongo = mongoose.connect("mongodb+srv://Bacteria:Bacteria@bacteria.vjhddyx.mongodb.net/?retryWrites=true&w=majority")

const PORT = 3000;

app.listen(PORT,  "172.16.0.242", ()  => {
    console.log("hi! server started")
});
