$().ready(function() {
	isLogin();

	$('#member-tab b').click(function() {
		$(this).addClass('current').siblings().removeClass('current').parent().next().children()
			.eq($(this).index()).show().siblings().hide();

	})

	loginParamsSucc = $("#login_form").validate({
		rules: {
			/* input name 有 . 时加上引号 */
			'phone': {
				required: true,
				minlength: 11
			}
		},
		messages: {
			'phone': {
				required: "请输入正确中国手机号",
				minlength: "请输入11位手机号码"
			}
		},
		/* 重写错误显示消息方法,以alert方式弹出错误消息 */
		showErrors: function(errorMap, errorList) {
			var msg = "";
			$.each(errorList, function(i, v) {
				msg += (v.message + "\r\n");
			});
			if(msg != "") alert(msg);
		},
		/* 失去焦点时不验证 */
		onfocusout: false,
		onkeyup: false,
		submitHandler: function() {
			login();
		}
	});
	$("#login_form2").validate({
		rules: {
			/* input name 有 . 时加上引号 */
			reg_phone: {
				required: true,
				minlength: 11
			},
			reg_password: {
				required: true,
				minlength: 5
			},
			reg_confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#reg_password"
			},
		},
		messages: {
			reg_phone: {
				required: "请输入正确中国手机号",
				minlength: "请输入11位手机号码"
			},
			reg_password: {
				required: "请输入密码",
				minlength: "密码长度不能小于 5 个字母"
			},
			reg_confirm_password: {
				required: "请输入验证密码",
				minlength: "密码长度不能小于 5 个字母",
				equalTo: "两次密码输入不一致"
			},

		},
		/* 重写错误显示消息方法,以alert方式弹出错误消息 */
		showErrors: function(errorMap, errorList) {
			var msg = "";
			$.each(errorList, function(i, v) {
				msg += (v.message + "\r\n");
				return false;
			});
			if(msg != "") swal('提示',msg);
		},
		/* 失去焦点时不验证 */
		onfocusout: false,
		onkeyup: false,
		submitHandler: function() {
			register();
		}
	});

});

function sendMsg() {
	var verifyText = '';
	var timer;
	var times = 60;
	var phone = $("#reg_phone").val();
	if($.trim(phone) === '') {
		alert('请输入手机号');
	} else if(!checkPhone($.trim(phone))) {
		alert('请输入正确中国手机号');
	} else {

		var data={
             MBL_NO:phone,
             OPR_TYP:01,
		};
		$.ajax({
		type: 'post',
		dataType: 'jsonp',
		contentType: "application/json; charset=utf-8",
		url: 'http://beta.json-generator.com/api/json/get/E1jZHCacZ',
		data: data,
		success: function(result) {
            if (result.RETURNCODE==="MCA00000") {
                 swal('短信验证码已提交，请及时输入')
            }else{
                 swal(result.RETURNCON)
            }
		}
		});
		timer = setInterval(function() {
			if(times === 0) {
				window.clearInterval(timer);
				verifyText = '获取验证码';
				$("#sendMsgBtn").removeAttr('disabled');
			} else {
				$("#sendMsgBtn").attr('disabled', 'disabled')
				verifyText = times + '秒后重新获取'
			}
			$("#sendMsgBtn").html(verifyText)
			times--;
		}, 1000)
		alert('send')
	}
}

function checkPhone(phone) {
	if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
		return false;
	} else {
		return true;
	}
}

function login() {

	//	if(data.RETURNCODE === 'MCA00000') {
	//		localStorage.setItem('user', JSON.stringify(data));
	//		window.location.href = 'member.html';
	//	} else {
	//		alert(data.RETURNCON)
	//	}
        var phone= $("#phone").val();
	var data = {
		MBL_NO: phone,
		PASS: md5($("#pass").val()),
		MERC_ABBR: $('#username').val(),
		DAT_TYP: 1
	};
 
	$.ajax({
		type: 'post',
		dataType: 'jsonp',
		contentType: "application/json; charset=utf-8",
		url: 'http://beta.json-generator.com/api/json/get/Vk7nkEa5Z',
		data: data,
		success: function(result) {
			//console.log(result);

            if (result.RETURNCODE==='MCA00000') {
            	swal({   title: "提示",   text: "登录成功",  type:"success", timer: 2000, 
            	  showConfirmButton: false },function(){
            	  	result.PHONE=phone;
            	localStorage.setItem('user', JSON.stringify(result));
			window.location.href = 'member.html';
            	  });
            	
		}else{
			swal(result.RETURNCON)
		}
			


			//localStorage.setItem('user',result)
		},
		/*error: function(err) {
			console.log(err)
		}*/
	})

}

function callback(data) {
	console.log(data)
}

function register(){
	var phone=$("#reg_phone").val();
	var data = {
		MBL_NO: phone,
		PASS: md5($("#reg_password").val()),
		MSG_COD: $('#send-msg').val(),
		MBL_TYP: 0,
	};

	$.ajax({
		type: 'post',
		dataType: 'jsonp',
		contentType: "application/json; charset=utf-8",
		url: 'http://beta.json-generator.com/api/json/get/Vk7nkEa5Z',
		data: data,
		success: function(result) {
			//console.log(result);

            if (result.RETURNCODE==='MCA00000') {
            	swal({   title: "提示",   text: "注册成功",  type:"success", timer: 2000, 
            	  showConfirmButton: false },function(){
            	  	result.PHONE=phone;
            	localStorage.setItem('user', JSON.stringify(result));
			window.location.href = 'member.html';
            	  });
            	
		}else{
			swal(result.RETURNCON)
		}
	}

		})

}