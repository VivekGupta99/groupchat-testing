const multer = require("multer");
const upload = multer({ dest: "uploads/" }).single('file')
async function fileupload(req, res, next) {
upload(req, res, (error) =>{
    if (error) {
        console.log(error);
        return res.status(400).json({ msg: "multer error while parsing", err: error });
    }

    onsole.log('file successfully parsed');
   
    next();c
});	
}
module.exports = fileupload;

