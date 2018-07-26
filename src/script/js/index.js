;
! function($) {

    function lunbo(left, right, box, dots) {
        return new Lunbo(left, right, box, dots).init();
    }

    function Lunbo(left, right, box, dots) {
        this.leftbox = left;
        this.rightbox = right;
        this.box = box;
        this.dots = dots;
        this.index = 0;
        this.timer = null;

    }
    Lunbo.prototype = {
        constructor: Lunbo,
        left: function() {
            var that = this;
            $(this.box[this.index]).animate({ opacity: "0" }, 500);

            if (this.index == 0) {
                this.index = this.box.size() - 1;
            } else {
                this.index--;
            }

            this.timer = setTimeout(() => { that.timer = null }, 800);
            $(this.box[this.index]).animate({ opacity: "1" }, 500)
            setTimeout(() => { that.changeBg(that.index) }, 400)

        },

        right: function() {
            var that = this;
            $(this.box[this.index]).animate({ opacity: "0" }, 500);
            if (this.index == this.box.size() - 1) {
                this.index = 0;
            } else {
                this.index++;
            }

            this.timer = setTimeout(() => { that.timer = null; }, 800);
            $(this.box[this.index]).animate({ opacity: "1" }, 500)

            setTimeout(() => { that.changeBg(that.index); }, 400)


        },

        changeBg: function(index) {
            var cur = this.dots[index];
            this.index = index;
            var that = this;
            $(cur).css({
                backgroundColor: "red"
            })
            this.dots.not(cur).css({ backgroundColor: "#fff" });
            var curbox = this.box[index];
            $(curbox).animate({ opacity: "1" }, 500);
            this.box.not($(curbox)).stop().animate({ opacity: "0" }, 500)

            this.timer = setTimeout(() => { that.timer = null }, 400);
        },

        autoChange: function() {
            var timer = setInterval(() => {
                this.changeBg(this.index);
                this.right(this.index);
            }, 4000)
            return timer
        },

        init: function() {
            var that = this;
            var box = this.box;
            var autotimer;

            autotimer = this.autoChange();

            // $.each($(".m3"), function(i, n) {
            $(".m3").hover(function() {
                console.log(autotimer);
                clearInterval(autotimer);
                autotimer = null;
            }, function() {
                if (!autotimer) {
                    autotimer = that.autoChange();
                }

            })

            // })
            this.leftbox.on("click", function() {
                if (!that.timer) {
                    that.left()
                }
            })

            this.rightbox.on("click", function() {
                console.log(that.timer);
                if (!that.timer) {
                    that.right()
                }
            })
            this.dots.on("click", function() {
                // console.log($(this).index());
                if (!that.timer) {
                    that.changeBg($(this).index())
                }
            })

        }
    }

    if ($.lunbo == undefined || $.lunbo == null || $.lunbo == "") {
        $.extend({ lunbo: lunbo });
    }
}(jQuery);



! function() {
    var aLi = $(".hovers .section li:not(:first)");
    //本来可以使用target后查找下面的img的，但是发现移动的非常快，就直接找到了img,有时又是li。
    // var aImg = $(".hovers .section img:not");
    var aImg = aLi.find("img");
    aLi.each(function() {

        var that = aImg.eq($(this).index() - 1);
        var a = that.parent();
        a.height(a.height());
        $(this).hover(function(ev) {
            aLi.eq($(this).index() - 1).addClass("shadow");
            that.stop().animate({
                width: a.width() * 1.1,
                top: "-5%",
                left: "-5%"
            })
        }, function() {
            aLi.eq($(this).index() - 1).removeClass("shadow");
            that.stop().animate({
                width: "100%",
                top: 0,
                left: 0

            })
        })
    })
}(jQuery);



// 楼梯效果
! function($) {
    function louti(blocks,lis, rate, colors) {
        new LouTi(blocks,lis, rate, colors).init();
    }

    function LouTi(blocks,lis, rate, colors) {
        this.color = colors || ["#64C333", "#ff0036", "#EA5F8D", "#0AA6E8", "#19C8A9"];
        this.lis = lis;
        this.rate = rate||0.5;
        this.blocks = blocks;
        this.positions = []

    }
    LouTi.prototype = {
        constructor: LouTi,
        initPositons:function(){
            var that = this;
            this.blocks.each(function(){
                that.positions.push([$(this).offset().top,$(this).height()]);
            })
        },
        show: function(top) {

          this.lis.parent().css({
            display:"block"
          })
        },
        hidden:function(top){
            this.lis.parent().css({
                display:"none"
            })
        },

        getCurrent:function(top){
            var index ;
            var that = this
            $.each(this.positions,function(i,n){
              
                   if(n[0]<top){
                        if(n[1]*that.rate+n[0]<top) index=i+1;
                        else index = i;
                   }

            })
            return index;
           
        },
        changeBg:function(index){

        },
        init: function() {
            var that  = this;
            
            var curindex=0 ;
            this.initPositons();

            var mintop = this.positions[0][0];

            $(window).on("scroll", function() {
                var top =  $(this).scrollTop();
                console.log(top+100,mintop)
                if(top+100>mintop){
                    curindex = that.getCurrent(top);
                    curindex = curindex || 0;

                    console.log(curindex+"cur");
                    that.show();
                    var curbox = that.lis.eq(curindex);
                    curbox.css({
                        backgroundColor:that.color[curindex%that.color.length]
                    })
                    that.lis.not(curbox).css({
                        backgroundColor:"transparent"
                    })
                }
                else{
                    that.hidden();
                }
            })
        }
    }
    if ($.louti == undefined || $.louti == null || $.louti == ""){
        $.extend({ louti:louti });
    }

}(jQuery);