! function($) {
    var $inputs = $(".user_enter input");
    var change = $(".choose h3");
    var blocks = $(".zshop,.seller");
    var submit = $(".submit");

    // $inputs.each(function(){
    // 	$(this).on("focus",function(){
    // 		$(this)
    // 	})
    // })
    $inputs.on("focus", function() {
        $(this).css({
            borderColor: "red"
        })
    })
    $inputs.on("blur", function() {
        $(this).css({
            borderColor: "#ccc"
        })
    })

    change.on("click", function() {

        var cur = blocks.eq($(this).index());
        cur.css({
            display: "block"
        })
        blocks.not(cur).css({
            display: "none"
        })
        change.not(cur).css({
        	borderColor: "#ccc"
        })
        $(this).css({
        	borderColor: "red"
        })

    })

    submit.on("click",function(){

    	var username = $("#username").val();
    	var password = $("#password").val();
    	$.ajax({
    		type:"post",
    		url:"http://10.31.165.18/jingdong/zol/php/login.php",
    		async:false,
    		data:{
    			"username":username,
    			"password":password
    		},
    		success:function(msg){
    			if(msg=="1"){
    				$(".zshop_error").css({
    					visibility :"hidden"
    				})
    				$.cookie("user",username,{ expires: 7 });
    				window.location.href="http://10.31.165.18/jingdong/zol/src/index.html";
    			}else{
				$(".zshop_error").css({
    					visibility :"visible"
    				})
    				console.log("失败")
    			}
    		}
    	})
    })

}(jQuery);