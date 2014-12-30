/**
 * author :  addison.
 * date   :  14/12/26.
 */


var express = require('express');
var app = express();
var template = require('art-template');
var fs = require('fs');


template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', '../client/views');


var date = new Date();
var d = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
var author = 'addison';
var demoData = {
    data: {title: 'css简单变形', date: d, author: author},
    list: [

    ]
};

for (var i = 0; i < 50; i++) {
    demoData.list.push({
        title: 'news-test=' + i,
        date: d,
        author: author
    })
}


app.get('/', function (req, res) {
    demoData.script = [
        {
            src: 'js/jq.js'
        },
        {
            src: 'js/index.js'
        }
    ]
    demoData.style = [
        {
            src: 'css/index.css'
        },
        {
            src: 'css/a.css'
        }
    ]
    res.render('index', demoData);
}).get('/js/*', function (req, res) {
    res.set('Content-Type', 'application/x-javascript');

    var tem = __dirname.split('/');
    tem.pop();
    var base = tem.join('/') + '/client';
    console.log(base + req.path);

    res.send(fs.readFileSync(base + req.path));
}).get('/css/*', function (req, res) {
    res.set('Content-Type', 'text/css');

    var tem = __dirname.split('/');
    tem.pop();
    var base = tem.join('/') + '/client';

    res.send(fs.readFileSync(base + req.path));
})


app.listen(3000);
