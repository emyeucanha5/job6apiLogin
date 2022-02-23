const Job = require("../models/Job");
const {StatusCodes} = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async(req, res) => {
    const job1 = Job.find({createdBy: req.user.userId});
    const job = await job1.sort("createdAt");
    res.status(StatusCodes.CREATED).json({job});
}
const createJob = async(req, res) => {
    const job = await Job.create({
        ...req.body,
        createdBy: req.user.userId,
    });
    res.status(StatusCodes.CREATED).json({job});
}

const getJob = async(req, res) => {
    const id = req.params.id;
    const job = await Job.findOne({_id: id});
    if(!job){
        throw new NotFoundError("Not Found");
    }
    res.status(StatusCodes.CREATED).json({job});
}

const updateJob = async(req, res) => {
    const id = req.params.id;
    const {company, position} = req.body;
    if(!company||!position){
      throw new BadRequestError('Company or Position fields cannot be empty')

    }
    const job = await Job.findOneAndUpdate({_id: id},
        req.body,
        { new: true, runValidators: true } );
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
        }
    res.status(StatusCodes.CREATED).json({job});

}
const deleteJob = async(req, res) => {
    const id = req.params.id;
    const job = await Job.findOneAndDelete({_id: id});
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
      }
    res.status(StatusCodes.CREATED).json({job});

}



module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}
