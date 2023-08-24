
const express=require("express")
const { blogPost, getBlogs, patchBlogs, deleteBlogs } = require("../MyController.js/controller")
const MyRouter=express.Router()
MyRouter.post("/",blogPost)
MyRouter.get("/",getBlogs)
MyRouter.patch("/:id",patchBlogs)
MyRouter.delete("/:id",deleteBlogs)
module.exports={
    MyRouter
}