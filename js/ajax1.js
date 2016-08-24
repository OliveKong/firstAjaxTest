+(function ($) {
	'use strict';
	var num1 = 1;
	var num2 = 1;
	var pay = {
		init: function(){
			this.validate();
			this.send();
		},
		validate: function(){ //充值验证；
			$(".pay-iphone").keyup(function(){ //验证手机号
				if($(this).val().match(/^1[3|4|5|7|8]\d{9}$/)){
					$(".error").addClass("none")
					num1 = 2;
				}else{
					$(".error").removeClass("none")
					num1 = 1;
					$(".send-btn").attr("disabled",true);
				};
				if(num1 ==2 && num2 ==2){
					$(".send-btn").attr("disabled",false);
				}else{
					$(".send-btn").attr("disabled",true);
				}
			});
			$(".pay-number").change(function(){ //选择充值数；
				if($(this).val() != -1){
					num2 = 2;
				}else{
					num2 = 1;
					$(".send-btn").attr("disabled",true);

				};
				if(num1 ==2 && num2 ==2){
					$(".send-btn").attr("disabled",false);
				}else{
					$(".send-btn").attr("disabled",true);
				}
			})
		},
		send: function(){
			$(".send-btn").on("click",function(){
				var iphone = $(".pay-iphone").val();
				var number = $(".pay-number").val();
				$.ajax({ //ajax提交
				  type: 'POST',
				  url:"usedata.js",
				  dataType: "json",
				  data: {usename:iphone,usernumber:number},
				  success: function(data){
				  	if(data.usenumber == number){
						//成功；
						$(".pay-succeed,.pay-mark").removeClass("none");
					}else{
						//失败；
						$(".pay-error,.pay-mark").removeClass("none");
					}
				  },

				});
			})
		}
	}
	pay.init();
}(jQuery))