import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    original_img: {type: String, required: true},
    processed_img: {type: String, required: true},
    result: {type: Number, required: true},//in teoria json non e un tipo ammesso ma non segnala errori
});

export const imageModel = mongoose.model("image", imageSchema);
export default imageModel;

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    hashPassword: {type: String, required: true},
    mail: {type: String, required: true}, //forse
});

export const userModel = mongoose.model("user", userSchema);