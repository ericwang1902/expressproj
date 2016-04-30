var sysuserModel = require('../models/sysuserModel.js');

/**
 * sysuserController.js
 *
 * @description :: Server-side logic for managing sysusers.
 */
module.exports = {

    //系统管理员初始化
    initSysUser:function(userinfo){
        
        var sysuser = new sysuserModel({
			mobile : userinfo.mobile,
			psd : userinfo.psd,
			usertype : userinfo.usertype,
			openid : userinfo.openid,
			count : userinfo.count,
			type : userinfo.type,
			account : userinfo.account,
			accountpsd : userinfo.accountpsd,
			orgid : userinfo.orgid,
			groupid : userinfo.groupid,
			status : userinfo.status,
			isbroadcast : userinfo.isbroadcast
        });
        
       sysuserModel.findOne({mobile:"admin888"},function(err,result){
           
                if(err){
                    console.log(err);
                }
                
                 
               
                if(!result){
                    sysuser.save(function (err,result) {
                        if(err){
                            console.log(err);
                        }
                        console.log("sys initSysUser created");
                    })    
                }
               
                if (result) {
                   console.log(result); 
                }

            } 
        )

         
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