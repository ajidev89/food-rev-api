 const mongoose = require('mongoose');

 const Schema = mongoose.Schema;

 const userSchema = new Schema({
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase:true
        },
        password: {
            type: String,
            required: true,
            miniLenght:6
        },
        role: {
            type: String,
            required: true
        },
        password_reset: {
            type: String,
            required: false
        },
        
    },
    { 
        toJSON: { 
            virtuals: true,
            transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.password_reset;
            return ret;
            }
        }
    },

    { timestamps:true });


const User = mongoose.model('User',userSchema)

module.exports = User

