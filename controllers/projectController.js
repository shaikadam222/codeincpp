const Project = require('../models/project');


async function createproject(req,res) {
    const {projectName} = req.body;
    try {
        const project = new Project({
            projectName,
            files : []
        })

        await project.save();

        return res.send('Project created successfully').status(201);
    }catch(err) {
        console.log(err);
        return res.send('Error while creating project').status(500);
    }
}

async function getproject(req,res) {
    const {projectName} = req.body;
    try {
        const pname = await Project.findOne({projectName});
        if(!pname) {
            return res.send("There's no such project").status(401);
        } else {
            return res.status(200).json({files : pname.files});
        }
    }catch(err) {
        console.log(err);
        res.send('Error while fetching projects').status(500);
    }
}

async function updateproject(req,res) {
    var {projectName,updatedName} = req.body;
    try {
        const projectid = await Project.findOne({projectName});
        if(!projectid) {    
            return res.send('No such project exists').staus(403);
        }
        projectName = updatedName;
        const pname = await Project.findByIdAndUpdate(projectid._id,{projectName},{new : true});
        return res.status(201).json({pname});
    }catch(err) {
        console.log(err);
        res.send('Error while updating project').status(500);
    }
}

async function deleteproject(req,res) {
    const {projectName} = req.body;
    try {
        const projectid = await Project.findOne({projectName});
        if(!projectid) {    
            return res.send('No such project exists').staus(403);
        }
        const pname = await Project.findByIdAndDelete(projectid._id);
        return res.status(201).send('Successfully deleted');
    }catch(err) {
        console.log(err);
        res.send('Error while deleteing project').status(500);
    }
}
module.exports = {createproject,getproject,updateproject,deleteproject};