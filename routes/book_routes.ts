import express from 'express';
import BOOK from '../schemas/book_schema'

const b_router=express.Router();

b_router.get('/',async (req,res)=>{
    console.log("Welcome to the Books section");
    const list_all_books=await BOOK.find();
    res.json(list_all_books);


})
b_router.get('/:id',async (req,res)=>{
    const id=req.params.id;
const book_by_id = await BOOK.findById(id);
res.json(book_by_id);
})


b_router.post('/',async (req,res)=>{
const post_in_books=await BOOK.create(req.body);
res.json(post_in_books);
})


b_router.put('/:id',async (req,res)=>{
    const id=req.params.id;
const update_in_books=await BOOK.findByIdAndUpdate(id, req.body,{new:true})
res.json(update_in_books);
})
b_router.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    const delete_in_books=await BOOK.findByIdAndDelete(id);
    res.json(delete_in_books);

})

export default b_router;