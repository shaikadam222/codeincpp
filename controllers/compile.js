    const Project = require('../models/project');
    const { exec } = require('child_process');
    const path = require('path');
    const fs = require('fs');

    async function compile(req,res) {
        var {projectName} = req.body;
        const {filename,content,input} = req.body;
        try {
            const prj = await Project.findOne({projectName});
            if(!prj) {
                return res.send("There's no such project").status(404);
            } else {
                const file = prj.files.find(f => f.filename === filename);
                if(file) {
                    file.content = content;
                } else {
                    prj.files.push({filename,content});  
                }

                await prj.save();
                
                const filepath = await path.join(__dirname,'..','temp',`code_${Date.now()}.cpp`);
                await fs.writeFileSync(filepath,content);

                const inpfil = await path.join(__dirname,'..','temp',`input_${Date.now()}.txt`);
                fs.writeFileSync(inpfil,input);

            await exec(`g++ ${filepath} -o ${filepath}.out && ${filepath}.out < ${inpfil}`,(error,stdout,stderr) => {
                    fs.unlinkSync(filepath);
                    fs.unlinkSync(`${filepath}.out`);
                    fs.unlinkSync(inpfil);

                    if(error) {
                        return res.send(stderr).status(400);
                    } else {
                        res.send(stdout);
                    }
                });

            }
        }catch(err) {
            console.log(err);
            res.send(err.message).status(500);
        }
    }

    module.exports = {compile};