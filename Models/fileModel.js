const mongoose = require('mongoose');


const allowedCategories = ["question-paper", "Study-materials", "Syllabus"];

const fileSchema = new mongoose.Schema({
    name: String,
    filename: String,
    contentType: String,
    data: Buffer,
    category: { 
        type: String, 
        enum: allowedCategories
    }
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;
