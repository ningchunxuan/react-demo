var express = require("express");
var mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName ='cake';

const app = express();


// 登录
app.get('/login',function (req,res){
    res.append("Access-Control-Allow-Origin", "*");
   
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr = {
            "username":req.query.username,
            "password":req.query.password
        };  // 查询条件
        dbo.collection("admin").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            console.log(666, result);
            if(result.length > 0){
                res.send({
                    "code":1,
                    'username': result[0].username,
                    "message":"登录成功"
                })
            }
            else{
                res.send({
                    "code":0,
                    "message":"密码或用户错误"
                })
            }
            db.close();
        });
        
    });
})

// 查询用户表
app.get('/user',function (req,res){
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr
        if(req.query.username){
            whereStr = {
                username:{$regex:req.query.username}
                // phone:{$regex:req.query.word}
                // goodsid:req.query.goodsid
            }  // 查询条件
            
        }
        // else if(req.query.phone){
        //         phone:req.query.phone
        //     }

        dbo.collection("user"). find(whereStr).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            var page = ''
            if (req.query.page) {
                page = req.query.page
            } else {
                page = 1
            }
            console.log(result);
            if(result.length > 0){
                res.send({
                    "code":1,
                    "data":result.slice((page-1)*5, 5*page),
                    "page":Math.ceil(result.length/5),
                    "message":"success"
                })

            }
            else{
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
    });

})

// 查询商品列表
app.get('/goodslist',function (req, res){
    // 跨域请求
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr
        if(req.query.name){
            whereStr = {
                name:req.query.name,
                goodsid:req.query.goodsid
            };  // 查询条件
        }else{
            whereStr = {"goodsid":req.query.goodsid}
        }
        dbo.collection("goods").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            // var results = JSON.stringify(result)
            var page = ''
            if (req.query.page) {
                page = req.query.page
            } else {
                page = 1
            }
            if(result.length > 0){
                res.send({
                    "code":1,
                    "data":result.slice((page-1)*5, 5*page),
                    "page":Math.ceil(result.length/5),
                    "message":"success"
                })

            }
            else{
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
        
    });
})

// 查询购物车
app.get('/buycar',function (req, res){
    // 跨域请求
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr
        if(req.query.username){
            whereStr = {
                username:req.query.username
                // goodsid:req.query.goodsid
            }  // 查询条件
            
        }
        dbo.collection("buycar"). find(whereStr).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            var page = ''
            if (req.query.page) {
                page = req.query.page
            } else {
                page = 1
            }
            if(result.length > 0){
                res.send({
                    "code":1,
                    "data":result.slice((page-1)*5, 5*page),
                    "page":Math.ceil(result.length/5),
                    "message":"success"
                })

            }
            else{
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
    });
})

// 加入数据库
app.get('/addgoods',function (req,res){
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myobj = {
            bigimg: req.query.bigimg,
            deimg: req.query.deimg,
            title: req.query.title,
            chinatitle: req.query.chinatitle,
            name: req.query.name,
            price: req.query.price,
            imgArry: req.query.imgArry,
            size: req.query.size,
            character1: req.query.character1,
            character2: req.query.character2,
            character3: req.query.character3,
            character4: req.query.character4,
            number: req.query.number,
            goodsid: req.query.goodsid
        };
        // 插入数据库
        dbo.collection("goods").insertOne(myobj, function(inerr, inresult) {
            if (inerr) throw inerr;
            if(inresult.result.ok === 1){
                res.send({
                    "code":1,
                    "message":"success"
                })
            }
            else{
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
    });
})

// 加入用户表
app.get('/adduser',function (req,res){
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myobj = {
            phone: req.query.phone,
            username: req.query.username,
            password: req.query.password
        };
        // 插入数据库
        dbo.collection("user").insertOne(myobj, function(inerr, inresult) {
            if (inerr) throw inerr;
            if(inresult.result.ok === 1){
                res.send({
                    "code":1,
                    "message":"success"
                })
            }
            else{
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
    });
})

// 删除一条购物车
app.get('/deletebuycar',function (req, res){
    // 跨域请求
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr
        if(req.query.id){
            whereStr = {
                "_id" :  mongoose.Types.ObjectId(req.query.id), //用了转成MongoDB ID格式
                // "username" : req.query.username
            };  // 查询条件
        }
        dbo.collection("buycar").deleteOne(whereStr, function(err, obj) {
            if (err) throw err;
            if (obj.result.ok) {
                res.send({
                    "code":1,
                    "message":"success"
                })
            } else {
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
    });

})

// 删除用户名信息
app.get('/deleteusername',function (req, res){
    // 跨域请求
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr
        if(req.query.id){
            whereStr = {
                "_id" :  mongoose.Types.ObjectId(req.query.id), //用了转成MongoDB ID格式
                // "username" : req.query.username
            };  // 查询条件
        }
        dbo.collection("user").deleteOne(whereStr, function(err, obj) {
            if (err) throw err;
            if (obj.result.ok) {
                res.send({
                    "code":1,
                    "message":"success"
                })
            } else {
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            // console.log("删除用户名成功");
            db.close();
        });
    });

})
// 删除商品信息
app.get('/deletegoods',function (req, res){
    // 跨域请求
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var whereStr
        if(req.query.id){
            whereStr = {
                "_id" :  mongoose.Types.ObjectId(req.query.id), //用了转成MongoDB ID格式
                // "username" : req.query.username
            };  // 查询条件
        }
        dbo.collection("goods").deleteOne(whereStr, function(err, obj) {
            if (err) throw err;
            if (obj.result.ok) {
                res.send({
                    "code":1,
                    "message":"success"
                })
            } else {
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
    });

})

// 更新商品列表信息
app.get('/update',function (req,res){
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        // 更新
        var whereStr = {
            "_id" :  mongoose.Types.ObjectId(req.query._id)
        }; // 查询条件
        var updateStr = {$set: {
            bigimg: req.query.bigimg,
            character1: req.query.character1,
            character2: req.query.character2,
            character3: req.query.character3,
            character4: req.query.character4,
            chinatitle: req.query.chinatitle,
            deimg: req.query.deimg,
            goodsid: req.query.goodsid,
            name: req.query.name,
            number: req.query.number,
            price: req.query.price,
            size: req.query.size,
            title: req.query.title,
            imgArry: req.query.imgArry
        }};
        dbo.collection("goods").updateOne(whereStr, updateStr, function(uperr, upres) {
            if (uperr) throw uperr;
            if(upres.result.ok === 1){
                res.send({
                    "code":1,
                    "message":"success"
                })
            }
            else{
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
    });
})

// 更新用户列表信息
app.get('/updateuser',function (req,res){
    res.append("Access-Control-Allow-Origin", "*");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        // 更新
        var whereStr = {
            "_id" :  mongoose.Types.ObjectId(req.query._id)
        }; // 查询条件
        var updateStr = {$set: {
            phone: req.query.phone,
            username: req.query.username,
            password: req.query.password
        }};
        dbo.collection("user").updateOne(whereStr, updateStr, function(uperr, upres) {
            if (uperr) throw uperr;
            if(upres.result.ok === 1){
                res.send({
                    "code":1,
                    "message":"success"
                })
            }
            else{
                res.send({
                    "code":0,
                    "message":"failed"
                })
            }
            db.close();
        });
    });
})
app.listen(2323);