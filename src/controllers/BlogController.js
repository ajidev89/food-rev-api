const Blog = require("../models/Blog");

const getBlog = async (req, res) => {

    let page = (req.query['page']) ? parseInt(req.query['page']) - 1 : 0

    const pageOptions = {
        page: page,
        limit: (page == 1) ? 15 : 10
    }
    
    try{
        const blogs = await Blog.find().populate("uuid").populate("tags")
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)

        return res.status(200).json({
            "page": page + 1,
            "blogs":blogs
        });
    } 
    catch(error){
        let data = {
            "message":"failed",
            "error" : error
        }
        res.status(500).send(data)
    }
}

const getsingleBlog = async(req, res) => {
    let id = req.params.id

    try{
       let blog =  await Blog.findById(id).populate("uuid").populate("tags");
       return res.status(200).json({
            blog
        });
    }
    catch(error){
        let data = {
            "message":"failed",
            "error" : error
        }
        res.status(500).send(data)
    }
}



const addBlog = async (req, res) => {

    let request = req.body;
    const blog = new Blog({
        "title" : request.title,
        "body" : request.body,
        "image" : request.image,
        "uuid" : req.user.id,
        "tags": request.tags
    });

    try {
        await blog.save()
        let data = {
            "message":"success",
            "blog" : blog
        }
        res.status(200).send(data)
    } catch (error) {
        let data = {
            "message":"failed",
            "error" : error
        }
        res.status(400).send(data)
    }
}

const updateBlog = async(req,res) => {
    let id = req.params.id

    let request = req.body;
    try{
       let blog =  await Blog.findOneAndUpdate({"id":id},{
            "title" : request.title,
            "body" : request.body,
            "image" : request.image,
            "uuid" : req.user.id,
            "tags": request.tags
       });
        blog =  await Blog.findById(id);
       return res.status(200).json({
            "blog":blog
        });
    }
    catch(error){
        let data = {
            "message":"failed",
            "error" : error
        }
        res.status(500).send(data)
    }
}

const deleteBlog = async(req,res) => {
    let id = req.params.id

    try{
       await Blog.deleteOne({"id":id});
       return res.status(200).json("Successfuly deleted");
    }
    catch(error){
        let data = {
            "message":"failed",
            "error" : error
        }
        res.status(500).send(data)
    }
}

module.exports = {
    getBlog,
    addBlog,
    getsingleBlog,
    updateBlog,
    deleteBlog
}