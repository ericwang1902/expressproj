var sysuserModel = require('../models/sysuserModel.js');

/**
 * sysuserController.js
 *
 * @description :: Server-side logic for managing sysusers.
 */
module.exports = {

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