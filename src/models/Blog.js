const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tagsSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})

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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]
},
{ 
    toJSON: { 
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
}
,{timestamps: true})


const Blog = mongoose.model("Blog" , blogSchema);
module.exports = Blog;