import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";

interface payLoad {
    sub:string

}

export function isAuthenticated(req:Request, res:Response, next:NextFunction) {
   
    //Receber um token 
    const authToken = req.headers.authorization;
    if(!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        //validar o token
        const {sub} = verify(token,process.env.JWT_SECRET) as payLoad;

        //Recuperar o id do token e colocar dentro de uma variavel user_id dentro do request
        req.user_id = sub
        return next();
        
    }catch(err) {
        return res.status(401).end();
    }
}