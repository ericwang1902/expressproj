var chargeModel = require('../models/chargeModel.js');

/**
 * chargeController.js
 *
 * @description :: Server-side logic for managing charges.
 */
module.exports = {

    /**
     * chargeController.list()
     */
    list: function(req, res) {
        chargeModel.find(function(err, charges){
            if(err) {
                return res.json(500, {
                    message: 'Error getting charge.'
                });
            }
            return res.json(charges);
        });
    },

    /**
     * chargeController.show()
     */
    show: function(req, res) {
        var id = req.params.id;
        chargeModel.findOne({_id: id}, function(err, charge){
            if(err) {
                return res.json(500, {
                    message: 'Error getting charge.'
                });
            }
            if(!charge) {
                return res.json(404, {
                    message: 'No such charge'
                });
            }
            return res.json(charge);
        });
    },

    /**
     * chargeController.create()
     */
    create: function(req, res) {
        var charge = new chargeModel({			orgid : req.body.orgid,			addvalue : req.body.addvalue,			updatetime : req.body.updatetime
        });

        charge.save(function(err, charge){
            if(err) {
                return res.json(500, {
                    message: 'Error saving charge',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: charge._id
            });
        });
    },

    /**
     * chargeController.update()
     */
    update: function(req, res) {
        var id = req.params.id;
        chargeModel.findOne({_id: id}, function(err, charge){
            if(err) {
                return res.json(500, {
                    message: 'Error saving charge',
                    error: err
                });
            }
            if(!charge) {
                return res.json(404, {
                    message: 'No such charge'
                });
            }

            charge.orgid =  req.body.orgid ? req.body.orgid : charge.orgid;			charge.addvalue =  req.body.addvalue ? req.body.addvalue : charge.addvalue;			charge.updatetime =  req.body.updatetime ? req.body.updatetime : charge.updatetime;			
            charge.save(function(err, charge){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting charge.'
                    });
                }
                if(!charge) {
                    return res.json(404, {
                        message: 'No such charge'
                    });
                }
                return res.json(charge);
            });
        });
    },

    /**
     * chargeController.remove()
     */
    remove: function(req, res) {
        var id = req.params.id;
        chargeModel.findByIdAndRemove(id, function(err, charge){
            if(err) {
                return res.json(500, {
                    message: 'Error getting charge.'
                });
            }
            return res.json(charge);
        });
    }
};