import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    original_img: {type: String, required: true},
    processed_img: {type: String, required: true},
    result: {type: Number, required: true},//in teoria json non e un tipo ammesso ma non segnala errori
});

export const imageModel = mongoose.model("image", imageSchema);
//export default imageModel;

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    hashPassword: {type: String, required: true},
    mail: {type: String, required: true}, //forse
    isAdmin: { type: Boolean, required: true, default: false },
});

export const userModel = mongoose.model("user", userSchema);

const loginTokenSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    expires: { type: Date, required: true },
});

export const loginTokenModel = mongoose.model("loginTokens", loginTokenSchema);