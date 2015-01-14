/**
 * author :  addison.
 * date   :  14/12/26.
 */


var express = require('express');
var app = express();
var template = require('art-template');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var db = require('./dbOperation');


template.config('extname', '.html');
template.config('escape', false);
app.engine('.html', template.__express);
app.set('view engine', 'html');

app.set('views', '../client/views');


var date = new Date();
var d = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
var author = 'addison';

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data


app
    //get 请求
    .get('/', function (req, res) {
        db.query({}, function (data) {
            var result = {
                data: data[0],
                list: data,
                script: [
                    {
                        src: 'js/jq.js'
                    },
                    {
                        src: 'js/index/index.js'
                    },
                    {
                        src: 'js/tpl.js'
                    }
                ],
                style: [
                    {
                        src: 'css/index.css'
                    },
                    {
                        src: 'css/a.css'
                    },
                    {
                        src: 'css/ani.css'
                    }
                ]
            };

            res.render('index', result);
        })
    })
    .get('/addBlog', function (req, res) {
        res.render('addBlog', {script: [
            {src: 'js/jq.js'},
            {src: 'js/tinymce/tinymce.min.js'},
            {src: 'js/addBlog/add.js'}
        ]});

    })
    .get('/js/*', function (req, res) {
        res.set('Content-Type', 'application/x-javascript');
        var tem = __dirname.split('/');
        tem.pop();
        var base = tem.join('/') + '/client';
        res.send(fs.readFileSync(base + req.path));
    })
    .get('/css/*', function (req, res) {
        res.set('Content-Type', 'text/css');
        var tem = __dirname.split('/');
        tem.pop();
        var base = tem.join('/') + '/client';
        res.send(fs.readFileSync(base + req.path));
    })

    //post 请求
    .post('/add', function (req, res) {
        var html = req.body;
        console.log(html);
        db.insert(html, function (data) {
            res.json(data);
        });
    })


app.listen(3000);
