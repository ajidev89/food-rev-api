const mongoose = require('mongoose');
const Schema = mongoose.Schema


const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    uuid:{
        type:String,
        required:true
    },
    tags:[{
        type:String
    }]
},
{ 
    toJSON: { 
        virtuals: true,
        transform: function (doc, ret) {
        delete ret.uuid;
        delete ret._id;
        delete ret.__v;
        return ret;
        }
    }
}
,{timestamps: true})


const Blog = mongoose.model("Blog" , blogSchema);
module.exports = Blog;