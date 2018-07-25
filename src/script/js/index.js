;
! function($) {
    //banner数据
    // $.ajax({
    //  url:'php/banner.php',
    //  dataType:'json'
    // }).done(function(bannerdata){
    //  $.each(bannerdata,function(index,value){
    //      var $bannerstr='<ul>';

    //  });
    // });

    //lunbo数据
    // $.ajax({
    //  url:'php/banner.php',
    //  dataType:'json'
    // }).done(function(bannerdata){
    //  $.each(bannerdata,function(index,value){
    //      var $bannerstr='<ul>';

    //  });
    // });
    function lunbo(left, right, box, dots) {
        return new Lunbo(left, right, box, dots).init();
    }

    function Lunbo(left, right, box, dots) {
        this.leftbox = left;
        this.rightbox = right;
        this.box = box;
        this.dots = dots;
        this.index = 0;

    }
    Lunbo.prototype = {
        constructor: Lunbo,
        left: function() {
            if (this.index == 0) {
                this.index = this.box.size() - 1;
            } else {
                this.index--;
            }
            console.log(this.index);
        },
        right: function() {
            if (this.index == this.box.size() - 1) {
                this.index = 0;
            } else {
                this.index++;
            }

        },
        changeBg: function(index) {
            var cur = this.dots[index];
            this.index = index;
            $(cur).css({
                backgroundColor: "red"
            })
            this.dots.not(cur).css({ backgroundColor: "#fff" });
            var curbox = this.box[index];
            $(curbox).animate({ opacity: "1" }, 500);
            this.box.not($(curbox)).animate({ opacity: "0" }, 500)

        },
        init: function() {
            var that = this;
            var box = this.box;
            this.leftbox.on("click", function() {
                $(box[that.index]).animate({ opacity: "0" }, 500);
                that.left();
                $(box[that.index]).animate({ opacity: "1" }, 500)

            })

            this.rightbox.on("click", function() {
                $(box[that.index]).animate({ opacity: "0" }, 500);
                that.right();
                $(box[that.index]).animate({ opacity: "1" }, 500)

            })
            this.dots.on("click", function() {
                // console.log($(this).index());
                that.changeBg($(this).index())
            })

        }
    }

    // tab切换数据
    $.ajax({
        url: 'php/banner.php',
        dataType: 'json'
    }).done(function(bannerdata) {
        $.each(bannerdata, function(index, value) {
            var $bannerstr = '<ul>';

        });
    });


    if ($.lunbo == undefined || $.lunbo == null || $.lunbo == "") {
        $.extend({ lunbo: lunbo });
        // 之后调用init
    }


    function Tab(left, right, mox, positions, obj) {
        this.left = left;
        this.right = right;
        this.mox = mox;
        this.obj = obj;
    }
    Tab.prototype = {
        constructor: Tab,
        moveleft: function() {

        },
        moveright: function() {

        },
        init: function() {
            this.left.on("click", function() {

            })
            this.right.on("click", function() {

            })
        }
    }



}(jQuery);

! function() {
    //banner效果

}(jQuery);

! function() {
    //lunbo效果

}(jQuery);

! function() {
    var aLi = $(".hovers .section li:not(:first)");
    console.log(aLi);
    //本来可以使用target后查找下面的img的，但是发现移动的非常快，就直接找到了img,有时又是li。
    // var aImg = $(".hovers .section img:not");
    var aImg = aLi.find("img");
    console.log(aImg);
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