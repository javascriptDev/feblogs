/**
 * author :  a2014.
 * date   :  15/1/6.
 */
/**
 * author: 高宇桥
 * date  : 14/11/27
 */
var orm = require('orm');

var connections = {};

function setup(db) {
//tpl model
    var blog = db.define("blog", {
        id: String,
        title: String,
        uid: String,
        content: String,
        type: String,
        author:String
    });

}

exports.db = function (host, database, cb) {
    if (connections[host] && connections[host][database]) {
        cb(null, connections[host][database]);
        return;
    }

    var opts = require('./dbConfig').blog;

    orm.connect(opts, function (err, db) {
        if (err) {
            cb({err: err});
            return
        }
        connections[host] = connections[host] || {};
        connections[host][database] = db;
        setup(db);
        cb(null, db);
    });
};
