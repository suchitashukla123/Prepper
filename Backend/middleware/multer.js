import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve("public");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const fileName = Date.now() + "-" + file.originalname;
        cb(null, fileName);
    }
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});
