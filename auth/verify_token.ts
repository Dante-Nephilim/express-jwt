import jwt from 'jsonwebtoken';
import {Request,Response,NextFunction} from 'express';

import dotenv from 'dotenv';
dotenv.config();
const protect =(req:Request,res:Response,next:NextFunction)=>{
   const token=req.header('gen_token');
    if(!token) return res.status(401).send('ACCESS DENIED');

    try{
        const verified=jwt.verify(token,process.env.token_key as string);
        req.body.user = verified;
        next();
    }
    catch(err){
        res.status(400).send('Invalid Token')

    }
}
export default protect;
