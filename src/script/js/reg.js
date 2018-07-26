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

            ctx.font = "20px Verdana";
            // Create gradient
            var gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // Fill with gradient
            ctx.fillStyle = gradient;
            ctx.fillText(code, 10, 30);

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

            $(canvas).attr("data-value", code);
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
var vali;
var iform;
! function() {
    function pass(element) {
        element.siblings(".wrong_tips").hide();
        element.siblings(".right-tips").css({
            display: 'inline-block'
        })
    }

    function notPass(element, obj) {
        var wrongtip = element.siblings(".wrong_tips");
        wrongtip.css({
            display: "inline"
        })

        if (element.siblings(".hasreg")) {
            var hasreg = element.siblings(".hasreg");
            if (hasreg.attr("data-value") == "1") {
                wrongtip.css({
                    display: 'none'
                })
                hasreg.css({
                    display: 'inline'
                })

            } else {
                hasreg.css({
                    display: 'none'
                })
                wrongtip.css({
                    display: 'inline'
                })
            }
        }

        element.siblings(".right-tips").hide();


    }
    var $form = $('#reg_form');
    var allInputs = {};
    vali = $form.validate({

        onfocusout: function(element) { $(element).valid(); },
        errorPlacement: function(error, element) { //错误信息位置设置方法
            // notPass(element);
        },
        success: "valid",

        rules: {
            phonenumber: {
                hasPhoneNumber: true
            },
            checkcode: {
                codeRight: true
            },
            password: {
                passwdRight: true,
            },
            checkpasswd: {
                repasswd: true
            },
            agree: {
                checkboxOk: true
            }

        }


    });

    $.validator.addMethod("hasPhoneNumber", function(value, element) {
        var right = $(".reg_phone .right-tips");
        var hasreg = $(".reg_phone .hasreg");
        var wrongtip = $(".reg_phone .wrong_tips");
        var reg = /^1[3-9][0-9]{9,}$/;
        if (reg.test(value)) {

            if (String(value).length != 11) {
                wrongtip.css({
                    display: "inline-block"
                })
                $.each([right, hasreg], function(i, n) {
                    n.css({
                        display: "none"
                    })

                })

            } else {
                $.ajax({
                    type: "post",
                    data: { phonenumber: value },
                    asyn: true,
                    url: "http://10.31.165.18/jingdong/zol/php/checkphone.php",
                    success: function(msg) {
                        if (String(msg) == "1") {
                            // notpass($(element))
                            $.each([right, wrongtip], function(i, n) {
                                n.css({
                                    display: "none"
                                })

                            })
                            hasreg.css({
                                display: "inline"
                            })
                            vali.invalid["phonenumber"] = false;

                        } else {
                            $.each([hasreg, wrongtip], function(i, n) {
                                n.css({
                                    display: "none"
                                })

                            })
                            right.css({
                                display: "inline-block"
                            })

                            $("#phonenumber").attr("class", "valid").attr("aria-invalid", "false");
                            vali.invalid["phonenumber"] = true;

                            return true;
                        }
                    }
                });
            }

        } else {
            wrongtip.css({
                display: "inline-block"
            })
            $.each([right, hasreg], function(i, n) {
                n.css({
                    display: "none"
                })

            })

            vali.invalid["phonenumber"] = false;


        }
    }, "")



    $.validator.addMethod("codeRight", function(value, element) {
        var v = $("#canvas").attr("data-value");
        if (!v) {
            notPass($(element))
            return false;
        }
        v = v.toLowerCase();
        if (value.toLowerCase() == v) {
            pass($(element));
            allInputs["codeRight"] = true;
            return true
        } else {
            notPass($(element));
            allInputs["codeRight"] = false;
        }
    }, "")

    $.validator.addMethod("passwdRight", function(value, element) {
        var reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z]).*$/;
        if (reg.test(value) && String(value).length >= 6 && String(value).length <= 16) {
            pass($(element));
            allInputs["passwordRight"] = true;

            return true
        } else {
            allInputs["passwordRight"] = false;
            notPass($(element))
        }

    }, "")

    $.validator.addMethod("repasswd", function(value, element) {
        if (value == $("#password").val() && $("#password").val()) {
            pass($(element));
            allInputs["repasswd"] = true;
            return true;
        } else {
            allInputs["repasswd"] = false;
            notPass($(element));
        }

    }, "")

    $.validator.addMethod("checkboxOk", function(value, element) {
        var bool = $("#agree").prop("checked");
        if (bool) {
            allInputs["agree"] = true;
        } else {
            allInputs["agree"] = false;
        }

    }, "")

    $("#submit").on("click", function() {
        $form.valid();

        var bool = true;
        $.each(allInputs, function(k, v) {
            if (v == false) bool = false;
        })
        if (bool) {
            $.ajax({
                type: "post",
                asyn:true,
                url: "http://10.31.165.18/jingdong/zol/php/checkphone.php",
                data: {
                    "phonenumber": $("#phonenumber").val(),
                    "password": $("#phonenumber").val()
                },
                success:function(){

                },
            })
        }
    })
    iform = $form;

}(jQuery)