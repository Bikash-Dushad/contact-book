const express = require('express');
const app = express();
const port = 3000;
require('./config/mongoose');
const expressfileupload = require('express-fileupload');
const cookieParser = require('cookie-parser')


app.use(express.urlencoded({extended: true}));
app.use(expressfileupload());
app.use(cookieParser())

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/assets'));
app.use('/', require('./route'))

app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`)
})