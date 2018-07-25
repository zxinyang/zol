;! function($) {
    function ShowImg(mbox, wrap, bdiv, bdiv_img, sdiv, sdiv_img, scale) {
        this.bd = bdiv;
        this.bg = bdiv_img;
        this.sd = sdiv;
        this.sg = sdiv_img;
        this.wrap = wrap;
        this.mbox = mbox;

        this.rate = sdiv_img.width() / bdiv_img.width();
        this.minleft = bdiv.position().left;
        this.maxleft = bdiv.position().left + bdiv.width() - mbox.width();

        this.mintop = bdiv.position().top;
        this.maxtop = bdiv.position().top + bdiv.height() - mbox.height();

    }

    ShowImg.prototype = {

        move: function(ev, bd, mbox, sd, sg) {
            var l = ev.pageX - mbox.width() / 2 - bd.position().left-this.wrap.offset().left;
            var t = ev.pageY - mbox.height() / 2 - bd.position().top-this.wrap.offset().top;
            
            mbox.css({
                left: l,
                top: t
            })

            var x = mbox.position().left;
            var y = mbox.position().top;

            if (y <= this.mintop) {
                t = this.mintop
            }

            if (y >= this.maxtop) {
                t = this.maxtop;
            }

            if (x <= this.minleft) {
                l = this.minleft;
            }

            if (x >= this.maxleft) {
                l = this.maxleft;
            }

            mbox.css({
                left: l,
                top: t
            })

            sg.css({
                left: -l * this.rate,
                top: -t * this.rate
            })


        },
        init: function() {
            // this.say();
            var that = this;
            this.bd.on("mouseover", function(ev) {
                    that.mbox.css({ visibility: 'visible' });
                    that.sd.css({ visibility: 'visible' });

                    $(document).on("mousemove", function(ev) {
                        ev = ev || window.event;
                        that.move(ev, that.bd, that.mbox, that.sd, that.sg);
                    })

                    that.bd.on("mouseout", function(ev) {
                        $(document).off("mousemove");
                        that.mbox.css({ visibility: 'hidden' });
                        that.sd.css({ visibility: 'hidden' });
                    })
                })

            }

    };
    function run(mbox,owrap,obdiv, obimg, osdiv, osimg){
        return new ShowImg(mbox,owrap,obdiv, obimg, osdiv, osimg)
        
    }

    if ($.glass == undefined || $.glass == null || $.glass == "") {
        $.extend({glass:run});
        // 之后调用init
    }

    // function Lunbo(left,right,box,proto){
    //     this.leftbox = left;
    //     this.rightbox = right;
    //     this.box = box;
    //     this.proto = proto;

    // }
    // Lunbo.prototype = {
    //     constructor:Lunbo,
    //     left:function(){
    //         $(this.leftbox).css({backgroundColor:"rgb()"})
    //     },
    //     right:function(){

    //     },
    //     init:function(){

    //     }
    // }
}(jQuery);