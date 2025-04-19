import Job from "../models/Job.js";
import User from "../models/user.js";

export async function postJob(req,res){
    const {title, description, company, location } = req.body;
    try{
        const job = new Job({title, description, company, location });
        await job.save();
        res.status(201).json({ message: "Job Posted"});

    }catch(error){
        res.status(500).json({error:"error occured"});
    }
};

export async function getJob(req,res){
    try{
        const view = await Job.find();
        res.status(200).json(view);
    }catch(error){
        res.status(500).json({error:"error fetching data"});
    }
};

export async function applyJob(req,res){
    const { jobId } = req.params;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ error: "Job not found" });

        const alreadyApplied = job.applicants.find((a) => a.email == user.email);
        if (alreadyApplied) return res.status(400).json({ error: "Already applied" });
        job.applicants.push({ name: user.name, email: user.email });
        await job.save();
        res.json({ message: "Applied successfully" });
    }catch (err) {
        console.error("Error in applyJob:", err);
        res.status(500).json({ err: "Application failed" });
    }
};

