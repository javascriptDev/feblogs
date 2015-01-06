/**
 * author :  a2014.
 * date   :  15/1/6.
 */
/*
 * author: 高宇桥
 * */

var dbHelp = require('./db').db;
var host = 'localhost';
var table = 'blog';


var call = function (fn, params) {
    typeof fn == 'function' && fn(params);
}
var uuid = function () {
    //xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    return 'xxxxxxxxxxxx4xxxyxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
exports.insert = function (data, fn) {
    data.id = uuid();
    dbHelp(host, table, function (err, db) {
        if (err) {//连接失败
            call(fn, {err: err});
            return;
        }
        db.models.blog.create(data, function (err, rows) {
            if (err) {
                call(fn, {err: err});
                return;
            }
            call(fn, {err: 0});
        });
    });
}
exports.query = function (where, fn) {
    dbHelp(host, table, function (err, db) {
        if (err) {//连接失败
            call(fn, {err: err});
            return;
        }
        db.models.blog.find(where, function (err, rows) {
            if (err) {
                call(fn, {err: err});
                return;
            }
            call(fn, rows);
        });
    });
}
exports.update = function (id, data, fn) {

    dbHelp(host, table, function (err, db) {
        var blog = db.models.blog;
        if (err) {//连接失败
            call(fn, {err: err});
            return;
        }
        blog.find({id: id}, function (err, rows) {
            rows[0].text = data;
            rows[0].save(function (err) {
                if (err) {
                    call(fn, {err: err});
                }
                call(fn, {err: 0});
            });
        });
    });
}