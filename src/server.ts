import express, {Request,Response, NextFunction} from "express";
import "express-async-errors";
import {router} from "./routes";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());


app.use(router);

app.use((err: Error, request:Request, response:Response, nextscript:NextFunction) => {
    if(err instanceof Error) {
        //se houver um error
        return response.status(400).json({
            error:err.message
        })
    }
    return response.status(500).json({
        status: "error", message: "Internal server error."
    })
})

app.listen(3333, () => console.log("servidor ok!!"));