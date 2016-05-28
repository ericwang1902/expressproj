var Sysuser = require('./controllers/sysuserController.js')
var SysuserModel = require('./models/sysuserModel.js')

var userinfo = new SysuserModel(
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
)

module.exports.init= function() {
	   SysuserModel.findOne({mobile:"admin888"},function(err,result){         
                if(err){
                    console.log(err);
                }    
                if(!result){
                    Sysuser.createUser(userinfo,function(err,user){
                        if(err) throw err;
                        console.log(user);
              
                    })
                }
               
                if (result) {
                   console.log(result); 
                }

            } 
        )
} 