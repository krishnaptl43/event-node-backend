import multer from "multer";

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/user-images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }

};

export const userUpload = multer({
    storage: userStorage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // file size 5MB
});