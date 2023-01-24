const express= require('express');
const { JobModel } = require('../models/job.model');

const JobRouter = express.Router()

JobRouter.get('/',async(req,res)=>
{
    // res.send('Welcome to Masai Job App HomePage')
    try{
        const bugs=await JobModel.find()
        res.send(bugs)

    }
    catch(err)
    {
        console.log({"msg":"Empty"})
    }
})


JobRouter.post('/create',async(req,res)=>
{
    const payload = req.body
    try{
        const new_job = new JobModel(payload)
        await new_job.save()
        res.send({"msg" : "Job created successfully"})

    }
    catch(err)
    {
        console.log(err)
            res.send({"err" : "Something went wrong"}) 
    }
})


JobRouter.delete("/delete/:jobID", async (req, res) => {
    const jobID = req.params.jobID
    // const job = await JobModel.findById({jobID})
  
    
        await JobModel.findByIdAndDelete(jobID)
        res.send({"msg" : "Job deleted successfully"})
    
})


JobRouter.patch('/edit/:jobID', async (req, res) => {
    const jobID= req.params.jobID
    const updated = req.body
    await JobModel.findByIdAndUpdate(jobID, updated)
    res.send({"msg" : "Job updated successfully"})
})









module.exports={
    JobRouter
}