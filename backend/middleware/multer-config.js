const multer = require("multer");   //utilisation de multer

const MIME_TYPES = {    //extensions des images
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png"
};

const storage = multer.diskStorage({    //enregistrement dans le disque
  destination: (req, file, callback) => {   //images enregistrées dans le dossier images
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];    //utilisation de la variable qui définit les extensions
    callback(null, name + Date.now() + "." + extension);
  }
});

module.exports = multer({storage: storage}).single("image");