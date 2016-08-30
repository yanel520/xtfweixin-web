$().ready(function() {
	$("#auth-form2").validate({
		rules: {
			/* input name 有 . 时加上引号 */
			'BKNumver': {
				required: true,
				minlength: 13,
				maxlength: 19,
			},
			'confirm-BKNumber': {
				required: true,
				minlength: 13,
				maxlength: 19,
				equalTo: "#BKNumber"
			},
			'BK_phone': {
				required: true,
				minlength: 11,
			},
			'OBK_name': {
				required: true,
			},
			'Bank': {
				required: true,
			},

		},
		messages: {
			'BKNumver': {
				required: "请输入您银行卡号",
				minlength: "请输入正确的银行卡号",
				maxlength: "银行卡号13-19位之间"
			},
			'confirm-BKNumber': {
				required: "请再次输入您银行卡号",
				minlength: "请输入正确的银行卡号",
				maxlength: "银行卡号13-19位之间"	
			},
			'BK_phone': {
				required: "请输入银行预留的手机号",
				minlength: "请输入正确的银行预留的手机号",
			},
			'OBK_name': {
				required: "请选择所属银行",
			},
			'Bank': {
				required: "请选择开户行",
			},

		},
		/* 重写错误显示消息方法,以alert方式弹出错误消息 */
		showErrors: function(errorMap, errorList) {
			var msg = "";
			$.each(errorList, function(i, v) {
				msg += (v.message + "\r\n");
				return false;
			});
			if(msg != "") swal(msg);
		},
		/* 失去焦点时不验证 */
		onfocusout: false,
		onkeyup: false
	});

});


function BusiOpen() {
	var data = {
		STL_OAC: $("#BKNumver").val(),
		MBL_NO: $("#BK-phone").val(),
        WC_LBNK_NO: $("#OBK-name").val(),
        OPN_BNK_DESC: $("#Bank").val(),
         
	};
 
	$.ajax({
		type: 'post',
		dataType: 'jsonp',
		contentType: "application/json; charset=utf-8",
		url: 'http://app.chinaxzf.com/mca/OPOSMCA1/M142.dom',
		data: data,
		success: function(result) {
			if (result.RETURNCODE==='MCA00000') {
            	swal({ title: "提示", text: "太棒了,注册成功",  type:"success"},function(){
            	localStorage.setItem('user', JSON.stringify(result));
			window.location.href = 'authenticate-three.html';
            	  });
            	
		}else{
			swal(result.RETURNCON)
		}
		},
		/*error: function(err) {
			console.log(err)
		}*/
	})

}

function callback(data) {
	console.log(data)
}