import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    requirementsL: [{
        type: String
    }],
    salary: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    postion: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    application: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]

}, {timestamps: true});

export const Job = mongoose.model("Job", jobSchema);