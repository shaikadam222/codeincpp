const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    projectName: {
        type: String,
        required: true
    },
    files: [{
        filename: String,
        content: String
    }]
});

module.exports = mongoose.model('Project', projectSchema,'Projects');
