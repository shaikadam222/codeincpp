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

module.exports = {createproject};