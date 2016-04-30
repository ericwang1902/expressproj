var Sysuser = require('./controllers/sysuserController.js')

var userinfo = 
    {
        mobile:"admin888",
        psd:"admin888",
        usertype : "sysadmin",
	    openid : "",
		count : 0,
		type : "",
		account : "",
		accountpsd : "",
		//orgid : "",
		groupid : "",
		status : "",
		isbroadcast : ""
    }



module.exports.init= function() {
	Sysuser.initSysUser(userinfo);
} 