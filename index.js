const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const SERVER_PORT = 8000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Here');
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        console.log('fileName: ', `${Date.now()}-${file.originalname}`);
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    return res.render('homepage');
});

app.post('/fileUpload', upload.any('file'), (req, res) => {
    try {
        console.log('body: ', req.body);
        console.log('file: ', req.file);
        res.redirect('/');
    } catch (error) {
        console.log('error: ', error);
    }
});

app.listen(SERVER_PORT, () => console.log('Server connected on Port: ', SERVER_PORT));
