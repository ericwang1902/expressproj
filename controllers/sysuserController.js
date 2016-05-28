var sysuserModel = require('../models/sysuserModel.js');
var bcrypt = require('bcryptjs');

/**
 * sysuserController.js
 *
 * @description :: Server-side logic for managing sysusers.
 */
module.exports = {
    //查找用户
    findUserByName:function(username,callback){
        sysuserModel.findOne({mobile:username},callback)
    },
    
    //创建用户，密码加密创建
    createUser:function(userinfo,callback){
        bcrypt.genSalt(10,function(err,salt){
           bcrypt.hash(userinfo.psd,salt,function(err,hash){
               userinfo.psd=hash;
               userinfo.save(callback);
           })      
        });
    },
    
    /**
     * 这里是学习callback的好例子，函数本身定义一个callback用来返回值
     * 内部bcrypt比对结果isMatch是最终返回值，所以只能在bcryptcompare的回调函数中
     * 此奥用callback来返回最终的isMatch
     * 
     * 
     *  */
    comparePsd:function(formpsd,hashpsd,callback){
        bcrypt.compare(formpsd,hashpsd,function(err,isMatch){
            if(err) throw err;
            callback(null,isMatch)
        })
    },

    /**
     * sysuserController.list()
     */
    list: function(req, res) {
        sysuserModel.find(function(err, sysusers){
            if(err) {
                return res.json(500, {
                    message: 'Error getting sysuser.'
                });
            }
            return res.json(sysusers);
        });
    },

    /**
     * sysuserController.show()
     */
    show: function(req, res) {
        var id = req.params.id;
        sysuserModel.findOne({_id: id}, function(err, sysuser){
            if(err) {
                return res.json(500, {
                    message: 'Error getting sysuser.'
                });
            }
            if(!sysuser) {
                return res.json(404, {
                    message: 'No such sysuser'
                });
            }
            return res.json(sysuser);
        });
    },

    /**
     * sysuserController.create()
     */
    create: function(req, res) {
        var sysuser = new sysuserModel({
			mobile : req.body.mobile,
			psd : req.body.psd,
			usertype : req.body.usertype,
			openid : req.body.openid,
			count : req.body.count,
			type : req.body.type,
			account : req.body.account,
			accountpsd : req.body.accountpsd,
			orgid : req.body.orgid,
			groupid : req.body.groupid,
			status : req.body.status,
			isbroadcast : req.body.isbroadcast
        });

        sysuser.save(function(err, sysuser){
            if(err) {
                return res.json(500, {
                    message: 'Error saving sysuser',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: sysuser._id
            });
        });
    },

    /**
     * sysuserController.update()
     */
    update: function(req, res) {
        var id = req.params.id;
        sysuserModel.findOne({_id: id}, function(err, sysuser){
            if(err) {
                return res.json(500, {
                    message: 'Error saving sysuser',
                    error: err
                });
            }
            if(!sysuser) {
                return res.json(404, {
                    message: 'No such sysuser'
                });
            }

            sysuser.mobile =  req.body.mobile ? req.body.mobile : sysuser.mobile;
			sysuser.psd =  req.body.psd ? req.body.psd : sysuser.psd;
			sysuser.usertype =  req.body.usertype ? req.body.usertype : sysuser.usertype;
			sysuser.openid =  req.body.openid ? req.body.openid : sysuser.openid;
			sysuser.count =  req.body.count ? req.body.count : sysuser.count;
			sysuser.type =  req.body.type ? req.body.type : sysuser.type;
			sysuser.account =  req.body.account ? req.body.account : sysuser.account;
			sysuser.accountpsd =  req.body.accountpsd ? req.body.accountpsd : sysuser.accountpsd;
			sysuser.orgid =  req.body.orgid ? req.body.orgid : sysuser.orgid;
			sysuser.groupid =  req.body.groupid ? req.body.groupid : sysuser.groupid;
			sysuser.status =  req.body.status ? req.body.status : sysuser.status;
			sysuser.isbroadcast =  req.body.isbroadcast ? req.body.isbroadcast : sysuser.isbroadcast;
			
            sysuser.save(function(err, sysuser){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting sysuser.'
                    });
                }
                if(!sysuser) {
                    return res.json(404, {
                        message: 'No such sysuser'
                    });
                }
                return res.json(sysuser);
            });
        });
    },

    /**
     * sysuserController.remove()
     */
    remove: function(req, res) {
        var id = req.params.id;
        sysuserModel.findByIdAndRemove(id, function(err, sysuser){
            if(err) {
                return res.json(500, {
                    message: 'Error getting sysuser.'
                });
            }
            return res.json(sysuser);
        });
    }
};