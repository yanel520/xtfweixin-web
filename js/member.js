$(function(){
	isLogin();	
	var user=JSON.parse(localStorage.getItem('user'));
	
	var userHtml = template('userTemplate',user);
	$('#userContainer').html(userHtml);
		
})
