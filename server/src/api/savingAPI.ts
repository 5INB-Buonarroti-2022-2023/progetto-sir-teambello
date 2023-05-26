import Express from "express";
import imageModel from "../dbModels";


export class processingAPI {


    constructor(private app: Express.Application) {
        this.app.post("/api/save",this.process);
    }

    private process = async (req: Express.Request, res: Express.Response) => {
        let logged = true;
        if(logged){
            const immagine = new imageModel({
                id: 1,
                original_path: "/ciao",
                processed_path: "",
                result: 10,
    
            });
            //2 queri : salvataggio img
            // aggiungere idimg utente
            await immagine.save();

        }        
    }
}