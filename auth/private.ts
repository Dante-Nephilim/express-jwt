import express from 'express';
import protect from './verify_token'
const private_router=express.Router();
private_router.use('/',protect);
private_router.get('/',async (req,res)=>{
    res.json('Private DATA');
});
export default private_router;
