;
! function($) {

    /*fn1----给头部的的栏目的a添加上颜色，hover的时候为红色*/
    ! function() {
        var aA = $(".top_bar a,.wrap_search a,.entry a,.m2 a");
        var m2A = $(".entry a,.m2 a");
        var old;
        aA.hover(function() {
            old = $(this).css("color");
            $(this).css({ color: "red", textDecoration: "underline" });
        }, function() {
            $(this).css({
                color: old,
                textDecoration: "none"
            })
        });

        m2A.hover(function() {
            $(this).css({ textDecoration: "none" });
        }, )

    }();

	/*给头部的左边栏添加效果，是li的背景hover白色*/ 
	!function(){
		var aLi = $(".m2_meau li").not($(".sub_all"));
		var oldbg ;
		var acolor;
		var position = ["-35px","-30px","-30px","-30px","-35px","-31px"]
		var oldpsition;
		var obj={};
		aLi.hover(function(){
			oldbg = $(this).css("background-color")
			$(this).css({"background-color":"#fff"})
			$(this).children("a").css({color:"#000"});
			var li = $(this);
			var index =li.index();
			var i =li.children("i");
			oldposition = i.css("backgroundPositionX");
			obj = {"backgroundPositionX":position[li.index()-1]};
			i.css(obj);
		},function(){

		 	$(this).css({"background-color":oldbg});
		 	$(this).children("i").css({"backgroundPositionX":oldposition})

		})

	}();

    /*轮播图*/
    ! function() {

    }

}(window.$ || window.jQuery);