import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    path: {type: String, required: true},
    result: {type: Number, required: true},//in teoria non e un tipo ammesso ma per intanto non segnala errori
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