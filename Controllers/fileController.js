const path = require("path");
const fs = require("fs");
const FileModel = require("../Models/fileModel");

exports.uploadFile = async (req, res) => {
  try {
    const { originalname, mimetype, path: tempPath } = req.file;
    const { category } = req.body;
    const uploadDir = path.join(__dirname, "..", "uploads");
    const newPath = path.join(uploadDir, originalname);
    fs.renameSync(tempPath, newPath);

    const data = fs.readFileSync(newPath);
    const file = new FileModel({
      name:req.body.name,
      filename: originalname,
      contentType: mimetype,
      data: data,
      category: category, 
    });
    await file.save();

    res
      .status(200)
      .json({ message: "File uploaded successfully", filePath: newPath });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUploadedFiles = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query = { category };
    }

    const files = await FileModel.find(query);
    res.status(200).json(files);
  } catch (error) {
    console.error("Error retrieving uploaded files:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.downloadFiles = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../uploads/", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", "application/octet-stream");

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
