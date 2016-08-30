$().ready(function() {
	$("#auth-form1").validate({
		rules: {
			/* input name 有 . 时加上引号 */
			'auth-name': {
				required: true,
				minlength: 2,
				maxlength: 20,
			},
			'auth-idnumber': {
				required: true,
				minlength: 18,
			},
			'auth-phone': {
				required: true,
				minlength: 11,
			},
			'auth-email': {
				required: true,
				email: true,
			},
			'auth-remcode': {
				required: true,
				minlength: 5,
				maxlength: 5,

			}
		},
		messages: {
			'auth-name': {
				required: "请输入法人姓名",
				minlength: "姓名需在2-10个汉字之间",
				maxlength: "姓名需在2-10个汉字之间"
			},
			'auth-idnumber': {
				required: "请输入身份证号",
				minlength: "请输入正确的身份证号"
			},

			'auth-email': {
				email: "请输入一个正确的邮箱",
			},
			'auth-remcode': {
				minlength: "请输入正确的推荐码",
				maxlength: "请输入正确的推荐码",
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
		MCRP_NM: $("#auth-name").val(),
		CRP_ID_NO: $("#auth-idnumber").val(),
		MERC_CHK_EMAIL: $("#auth-email").val(),
		AGT_REC_CD: $("#auth-remcode").val(),
		MERC_ABBR: $('#username').val(),
		MODELNAME: $('#auth-modelname').text(),
	};

	$.ajax({
		type: 'post',
		dataType: 'jsonp',
		contentType: "application/json; charset=utf-8",
		url: 'http://app.chinaxzf.com/mca/OPOSMCA1/M142.dom',
		data: data,
		success: function(result) {
			if(result.RETURNCODE === 'MCA00000') {
				swal({
					title: "提示",
					text: "太棒了,进行下一步吧",
					type: "success"
				}, function() {
					localStorage.setItem('user', JSON.stringify(result));
					window.location.href = 'authenticate-next.html';
				});

			} else {
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