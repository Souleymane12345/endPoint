var express = require('express');
var router = express.Router();
var QRCode = require('qrcode')
var multer  = require('multer')
var Jimp = require("jimp");
var fs = require('fs')
var qrCode = require('qrcode-reader');
var upload = multer({ dest: './public/images/qr/' })

/* GET home page. */
router.get('/', (req, res, next) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});


router.post('/createQr', (req, res, next) => {

    var data = req.body;
    var id  = req.body.id
    //console.log(pk)
    // Converting the data into String format
    var stringdata = JSON.stringify(data)
    qrCode.toFile("./public/images/qr/fil"+id+".png", stringdata, {

    },  (err) => {
    if (err) throw err
        console.log('done')
    })
    //res.send('QR is edited');
});

//router.post('/posts/pict', (req, res) => {})
router.post('/readQr', upload.single('uploaded_file'),  (req, res) => {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
   
   var  file = req.file.originalname
   console.log(file)
   
   var buffer = fs.readFileSync('./public/images/qr/'+ file);
   var table  = [];

    // Parse the image using Jimp.read() method
    //console.log(buffer)
    Jimp.read(buffer, function(err, image) {
        if (err) {
            console.error(err);
        }
        // Creating an instance of qrcode-reader module
        var qrcode = new qrCode();
        qrcode.callback = function(err, value) {
            if (err) {
                console.error(err);
            }
            // Printing the decrypted value
            //console.log(value.result);
            table = JSON.parse(value.result) ;
            console.log(table['PK']);
        };
        // Decoding the QR code
        qrcode.decode(image.bitmap);

    });
    res.send('QR is edited');
});

module.exports = router;


