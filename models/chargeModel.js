var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var chargeSchema = new Schema({	"orgid" : {	 	type: Schema.Types.ObjectId,	 	ref: 'sysuser'	},	"addvalue" : Number,	"updatetime" : Date});

module.exports = mongoose.model('charge', chargeSchema);