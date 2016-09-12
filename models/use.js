/**
 * Created by xu_pc on 2016/9/12.
 */
var mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

//存储用户信息
User.prototype.save = function (callback) {
    //要存入数据库的用户文档
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };
    //打开数据库
    console.log(2222);
    mongodb.open(function (err, db) {
        if(err){
            return callback(err);//错误，返回error信息
        }
   
        //读取users集合
        db.collection('users', function (err, collection) {
            if(err){
                mongodb.close();
                return callback(err);//错误，返回error信息
            }
            //讲用户数据插入user集合
            collection.insert(user, {safe: true}, function (err, user) {
                mongodb.close();
                if(err){
                    return callback(err);
                }
                console.log(user);
                callback(null, user[0]); //返回存储后的用户文档
            })
        })
    })
};
//读取用户信息
User.get = function (name, callback) {
    mongodb.open(function (err, db) {
        if(err){
            return callback(err);
        }
        db.collection('users', function (err, collection) {
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name: name}, function (err, user) {
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null, user);
            })
        })
    })
}