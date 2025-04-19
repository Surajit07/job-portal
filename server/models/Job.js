import mongoose, { Schema } from "mongoose";

const JobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    company:{
        type: String,
        required: true,
    },
    location:{
        type: String,
    },
    applicants:[
        {
            name:{
                type: String,
                required: true,
            },
            email:{
                type: String,
                required: true,
            },

        },
    ],

});

const Job = mongoose.model('Job',JobSchema);

export default Job;