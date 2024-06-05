const Project = require('../models/project');

async function createfile(req,res) {
    const {id} = req.params;
    const {filename,content} = req.body;
    try {
        const prj = await Project.findOne({id});
        if(!prj) {
            return res.send('No such Project exists').status(401);
        } else {
            prj.files.push({filename});
            pej.files.push({content});
            await prj.save();

            return res.send('File created successfully').status(201);
        }
    }catch(err) {
        console.log(err);
        res.send('Error while creating file').status(500);
    }
}
async function updatedfile(req,res) {
    const {id} = req.params;
    console.log(id);
    var filename = req.body.filename;
    const {updatedname,content} = req.body;
    try{
        const prj = await Project.findOne({id});
        if(!prj) {
            return res.send('No such Project exists').status(401);
        } else {
            const filesarr = prj.files;
            if(filesarr.length === 0) {
                return res.send('no files').status(404);
            }
            else {
                var upobj
                for(var i=0;i<filesarr.length;i++) {
                    if(filesarr[i].filename === filename) {
                        filesarr[i].filename = updatedname;
                        filesarr[i].content = content;
                        upobj = {
                            filename : updatedname,
                            content : content
                        }
                        break;
                    }
                }
                if(!upobj) {
                    return res.send("file doesn't exists").status(404);
                }
                var files = filesarr;
                const updated = await Project.findByIdAndUpdate(prj._id,{files},{new : true});
                return res.status(201).json(upobj);    
            }
        }
    }catch(err) {
        console.log(err);
        res.send('Error while updating filename and file content').status(500);
    }
}
async function deletefile(req,res) {
    const {id} = req.params;
    const {filename} = req.body;
    try {
        const prj = await Project.findOne({id});
        if(!prj) {
            return res.send('No such Project exists').status(401);
        } else {
            const filesarr = prj.files;
            if(filesarr.length === 0) {
                return res.send('no files').status(404);
            }
            else {
                var flag = 0;
                for(var i=0;i<filesarr.length;i++) {
                    if(filesarr[i].filename === filename) {
                        filesarr.splice(i,1);
                        flag=1;
                        break;
                    }
                }
                if(flag != 1) {
                    return res.send('No such file to delete').status(404);
                }
                var files = filesarr;
                const updated = await Project.findByIdAndUpdate(prj._id,{files},{new : true});
                return res.status(201).send('Successfully deleted file');  
            }
        }
    }catch(err) {
        console.log(err);
        res.send('Error while deleteing file').status(500);
    }
}
module.exports = {createfile,updatedfile,deletefile};