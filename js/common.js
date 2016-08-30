function isLogin(){
	var user = localStorage.getItem('user');
	if(!user && window.location.href.indexOf('login.html') === -1){
		alert('您未登录,请先登录!');
		window.location.href="login.html";
	}else if(user){
		if(window.location.href.indexOf('member.html') === -1){
			window.location.href="member.html";
		}
		
	}
}

function verifyAuth(funcNo){

   var result={
   	isSucc:false,
   	msg:'not found func_no'
   };
	var user = localStorage.getItem('user');
	if (!user) {
		result.isSucc = false;
		result.msg = "您未登录,请先登录!";
	}else{
		user=JSON.parse(user);
        for(var i=0;i<user.REC.length;i++){
           if(user.REC[i].FUNC_NO===funcNo  ){
           		if(user.REC[i].FUNC_STS===0){
					result.isSucc=true;
           		}else{
           			result.isSucc=false;
           			result.msg=user.REC[i].FUNC_RMK;

           		}
              break;
           }
        }
	}
	return result;

}


function receivables(){
	var result=verifyAuth("M119");
	if (result.isSucc===true) {
		window.location.href="receivables.html";

	}else{
		swal("提示",result.msg)
	}
}