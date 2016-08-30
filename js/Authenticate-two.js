$().ready(function() {

	//省市选择
	(function($, doc) {
		$.init();
		$.ready(function() {
			//级联示例
			var cityPicker3 = new $.PopPicker({
				layer: 3
			});
			cityPicker3.setData(cityData3);
			var showCityPickerButton = doc.getElementById('showCityPicker3');
			var cityResult3 = doc.getElementById('cityResult3');
			showCityPickerButton.addEventListener('tap', function(event) {
				cityPicker3.show(function(items) {
					cityResult3.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, false);
		});
	})(mui, document);


	$("#auth-form2").validate({
		rules: {
			/* input name 有 . 时加上引号 */
			'auth-stores': {
				required: true,
				minlength: 7,
				maxlength: 20,
			},
			'auth-provinces': {
				required: true,
				minlength: 11,
			},
			'auth-address': {
				required: true,
				minlength: 18,
			},

		},
		messages: {
			'auth-stores': {
				required: "请输入您的商户名称",
				minlength: "您输入的商户名称少于7个字",
				maxlength: "您输入的商户名称多于20个字"
			},
			'auth-provinces': {
				required: "请选择所在地区",
			},
			'auth-address': {
				required: "请输入您的地址",
				minlength: "您输入的地址少于7个字",
				maxlength: "您输入的地址多于30个字"
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
		MERC_CNM: $("#auth-stores").val(),
		MERC_PROV: $("#cityResult3").val(),
        BUS_ADDR: $("#auth-address").val(),
         
	};
 
	$.ajax({
		type: 'post',
		dataType: 'jsonp',
		contentType: "application/json; charset=utf-8",
		url: 'http://app.chinaxzf.com/mca/OPOSMCA1/M142.dom',
		data: data,
		success: function(result) {
			if (result.RETURNCODE==='MCA00000') {
            	swal({ title: "提示", text: "太棒了,进行下一步吧",  type:"success"},function(){
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






//选择图片文件上传
var loadImageFile = (function () { 
if (window.FileReader) { 
var oPreviewImg = null, oFReader = new window.FileReader(), 
rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i; 

oFReader.onload = function (oFREvent) { 
if (!oPreviewImg) { 
var newPreview = document.getElementById("imagePreview"); 
oPreviewImg = new Image(); 
oPreviewImg.style.width = (newPreview.offsetWidth).toString() + "px"; 
oPreviewImg.style.height = (newPreview.offsetHeight).toString() + "px"; 
newPreview.appendChild(oPreviewImg); 
} 
oPreviewImg.src = oFREvent.target.result; 
}; 

return function () { 
var aFiles = document.getElementById("imageInput").files; 
if (aFiles.length === 3) { return; } 
if (!rFilter.test(aFiles[0].type)) { alert("你必须选择一个有效的图像文件！"); return; } 
oFReader.readAsDataURL(aFiles[0]); 
} 

} 
if (navigator.appName === "Microsoft Internet Explorer") { 
return function () { 
alert(document.getElementById("imageInput").value); 
document.getElementById("imagePreview").filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = document.getElementsByClassName("imageInput").value; 

} 
} 
})(); 