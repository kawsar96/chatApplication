// external imports
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploader(folder_path, file_types, max_size, error_message) {
  // file upload folder
  const uploads_folder = `${__dirname}/../public/uploads/${folder_path}`;

  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploads_folder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, filename + fileExt);
    },
  });

  // upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_size,
    },
    fileFilter: (req, file, cb) => {
      if (file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_message));
      }
    },
  });
  return upload;
}

module.exports = uploader;
