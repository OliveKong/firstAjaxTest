+(function ($) {
	'use strict';
	var n1 = 1;
	var n2 = 2;
	var pay = {
		init:function(){
			this.validate();
			this.send();
		},
		validate:function(){
			$(".pay-iphone").keyup(function() {//验证手机号码
				if ($(this).val().match(/^1[3|4|5|7|8]\d{9}$/)) {
					$(".error").addClass("none");
					n1=2;
				}else{
					$(".error").removeClass("none");
					n1=1;
					$(".send-btn").attr("disabled",true);
				}
			});
			$(".pay-number").change(function(){
				if ($(this).val()!=-1) {
					n2=2;
					$(".send-btn").attr({
						disabled: false
					});
				}else{
					n2=1;
					$(".send-btn").attr({
						disabled: true
					});
				}
			});
		},
		send:function(){
			$(".send-btn").on('click', function() {
				var iphone=$(".pay-iphone").val();
				var inum=$(".pay-number").val();
				$.ajax({
					type:"post",
					url:"usedata.js",
					dataType:"json",
					data: {usename:iphone,number:inum},
					success:function(data){
						console.log(data);
						if (data.number==inum) {
							$(".box-success").removeClass('none');
							$(".cover").removeClass('none');
						}else{
							$(".box-faliure").removeClass('none');
							$(".cover").removeClass('none');
						}
					}
				});
			});
		}
	};
	pay.init();
}(jQuery))