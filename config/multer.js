import multer from "multer";
import path from "path";
import fs from "fs";

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/user-images";

        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
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


const eventStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/event-images";

        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

export const eventUpload = multer({
    storage: eventStorage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // file size 5MB
});

export const userUpload = multer({
    storage: userStorage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // file size 5MB
});