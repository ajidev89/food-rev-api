const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema({
        title: {
           type: String,
           required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        } 
    },
   { 
       toJSON: { 
           virtuals: true,
           transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
           }
       }
   },

   { timestamps:true });


const Tag = mongoose.model('Tag',tagSchema)

module.exports = Tag

