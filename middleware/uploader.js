const multer = require("multer");

const fileFilter = (req, file, callback) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        callback(null, true);
    } else {
        callback(new Error("format incorrect"), false);
    }
};
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});

module.exports = multer({ storage: storage, fileFilter: fileFilter });