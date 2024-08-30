// const mongoose = required("mongoose");
import mongoose from 'mongoose'; // yese bhi kr sakte hai

const userShema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        trpe: String,
        required: true, 
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String, 
        required: true
    }, 
    role: {
        type: String,
        enum: ['student', 'requriture'],
        required: true,
    }, 
    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String},
        resumeOriginalName: {type: String},
        company: {type: mongoose.Schema.Types.ObjectId, ref:'Company'},
        profilePhoto: {
            type:String,
            default: ""
        }

    }


}, {timestamps: true});
 
export const User = mongoose.model('User', userShema);