const Tag = require("../models/Tag");

const createTag = async(req, res) => {
    let request = req.body;

    if(!request.title){
        return res.status(400).send({
            "message": "failed",
            "error": "title is required"
        }) 
    }

    let availableTags = await Tag.find({
        "title" : request.title
    });

    let titleToSlug = request.title.replace(" ", "-");

    let slug = (availableTags.length) ? titleToSlug.toLowerCase() + `-${availableTags.length + 1}`  : titleToSlug.toLowerCase() 

    const tag = new Tag({
        "title" : request.title,
        "slug" : slug
    });
   
    try {
        await tag.save()
        let data = {
            "message":"success",
            "tag" : tag
        }
        res.status(200).send(data)
    } catch (error) {
        let data = {
            "message":"failed",
            "error" : error,
        }
        res.status(500).send(data)
    }
} 

const updateTag = async(req, res) => {
    let id = req.params.id
    let request = req.body;

    if(!request.title){
        return res.status(400).send({
            "message": "failed",
            "error": "title is required"
        }) 
    }

    let availableTags = await Tag.find({
        "title" : request.title
    });

    let titleToSlug = request.title.replace(" ", "-");

    let slug = (availableTags.length) ? titleToSlug.toLowerCase() + `-${availableTags.length + 1}`  : titleToSlug.toLowerCase() 
   
    try {

        let tag = await Tag.findOneAndUpdate({"id":id},{
            "title" : request.title,
            "slug" : slug
        });

        tag =  await Tag.findById(id);
        return res.status(200).json({
            "tag":tag
         });
    } catch (error) {
        let data = {
            "message":"failed",
            "error" : error,
        }
        res.status(500).send(data)
    }
} 

const deleteTag = async(req,res) => {
    let id = req.params.id

    try{
       await Tag.deleteOne({"id":id});
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

const getTag = async (req, res) => {

    let page = (req.query['page']) ? parseInt(req.query['page']) - 1 : 0

    const pageOptions = {
        page: page,
        limit: (page == 1) ? 15 : 10
    }
    
    try{
        const tags = await Tag.find().skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit)
        return res.status(200).json({
            "page": page + 1,
            "tags":tags
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

module.exports = {
    createTag,
    updateTag,
    deleteTag,
    getTag
}