"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
//const pathToImages = path.resolve(path.join(__dirname, '../images/'));
//export const notFoundImage = path.resolve(path.join(pathToImages, '/misc/notFound.png'));
exports.app = (0, express_1.default)();
const PORT = 3000;
exports.app.use((0, cors_1.default)());
/*
app.use(Express.json());
//app.use(Express.static(pathToImages));
app.use(fileUpload({
    createParentPath: true
}));
*/
exports.app.listen(PORT, () => {
    console.log("hi! server started");
});
exports.app.get("/test", (req, res) => {
    console.log("si è connesso il dispositivo " + req.ip);
    res.send("si è connesso il dispositivo " + req.ip);
});
