// 验证码
! function($) {

    function ValiCode(box, canvas, len) {
        this.canvas = canvas;
        this.box = box;
        this.len = len;
    }

    ValiCode.prototype = {
        constructor: ValiCode,

        randomNum: function(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        },
        createColor: function(min, max) {
            var r = this.randomNum(min, max);
            var g = this.randomNum(min, max);
            var b = this.randomNum(min, max);
            return "rgb(" + r + "," + g + "," + b + ")";
        },

        // changeBg: function() {

        // },
        drawPic: function() {
            var canvas = this.canvas;
            var width = canvas.width;
            var height = canvas.height;
            //获取该canvas的2D绘图环境 
            var ctx = canvas.getContext('2d');
            ctx.textBaseline = 'bottom';
            /**绘制背景色**/
            ctx.fillStyle = this.createColor(180, 240);
            //颜色若太深可能导致看不清
            ctx.fillRect(0, 0, width, height);
            /**绘制文字**/
            var str = 'ABCEFGHJKLMNPQRSTWXY123456789';

            　　　　
            var code = "";　　　　　 //生成验证码
            for (var i = 1; i <= this.len; i++) {
                var txt = str[this.randomNum(0, str.length)];
                code = code + txt;
                
            }
           
            ctx.font="20px Verdana";
			// Create gradient
			var gradient=ctx.createLinearGradient(0,0,width,0);
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");
			// Fill with gradient
			ctx.fillStyle=gradient;
			ctx.fillText(code,10,30);

            /**绘制干扰线**/
            for (var i = 0; i < 3; i++) {
                ctx.strokeStyle = this.createColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(this.randomNum(0, width / 2), this.randomNum(0, height / 2));
                ctx.lineTo(this.randomNum(0, width / 2), this.randomNum(0, height));
                ctx.stroke();
            }
            /**绘制干扰点**/
            for (var i = 0; i < 50; i++) {
                ctx.fillStyle = this.createColor(255);
                ctx.beginPath();
                ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
            return code;
        },
        init: function() {
            var that = this;
            code = that.drawPic()
            this.box.on("click", function(ev) {
                ev = ev || window.event;
                ev.preventDefault();
                code = that.drawPic()
            })


        }
    }

    function drawCode(box, canvas, len) {
        return new ValiCode(box, canvas, len).init();
    }

    if (!$.drawCode) {
        $.extend({ drawCode: drawCode })
    }

}(jQuery)


//表单验证
!function(){
	
}(jQuery)