// 区域选择
$(function() {
    $(".submenu").css("display","none");
    $(".city").click(function() {
        var ul = $(".submenu");
        if (ul.css("display") == "none") {
            ul.slideDown();
        } else {
            ul.slideUp();
        }
    });

    $(".city").click(function() {
        var _name = $(this).attr("name");
        if ($("[name=" + _name + "]").length > 1) {
            $("[name=" + _name + "]").removeClass("select");
            $(this).addClass("select");
        } else {
            if ($(this).hasClass("select")) {
                $(this).removeClass("select");
            } else {
                $(this).addClass("select");
            }
        }
    });

    $(".submenu li").click(function() {
        var li = $(this).text();
        $(".city").html(li);
        $(".submenu").hide();
        $(".city").removeClass("select");
    });
})

// 手机号
var phone;
        function checkphone() {
            phone = document.getElementById("phone").value;
            cn = document.getElementById('y_phone');
            var reg = /^1\d{10}$/;
            if (reg.test(phone) == false) {
                alert("请输入正确的手机号");
            }
        }

//验证码 
var code;
function createCode() {
    code = new Array();
    var codeLength = 4; //验证码的长度
    var checkCode = document.getElementById("checkCode");
    checkCode.value = code;
    var selectChar = new Array(2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    for (var i = 0; i < codeLength; i++) {
        var charIndex = Math.floor(Math.random() * 32);
        code += selectChar[charIndex];
    }
    if (code.length != codeLength) {
         createCode();
        }
     checkCode.value = code;
 }
$(function() {
            $(".yzm").click(function() {
                var a = $("#phone").val()
                if (a == null || a == undefined || a == "") {
                    alert("手机号不能为空");
                } else {
                        var s = 3;
                        $(".yzm").attr("disabled", "ture");
                        var set = setInterval(function() {
                            s--;
                            $(".yzm").val(s + "s后刷新");
                            if (s == 0) {
                                createCode();
                                clearInterval(set);
                                $(".yzm").removeAttr("disabled");
                                $(".yzm").val("刷新验证码");
                            }
                        }, 1000);
                    }
            })
        })  

// 用户名验证 
$(function () {
            let username = document.getElementById('username1');
            let nameMsg = document.getElementById('nameMsg');
            let btn = document.querySelector(".button");
            let password = document.getElementById('password1');

            // 定义两个锁
            var username_lock = false;
            var password_lock = false;

            $("#username1").on("click",function() {
                var b = $("#msg").val()
                var c = $("#createCode").val()
                console.log(c);
                if (b == null || b == undefined || b == "" ) {
                    alert("请输入验证码");
                }
            })
            username.onfocus = function () {
                username1.value = "";
            }
            // 验证用户名 
            username.onblur = function () {
                    // 获取用户输入的名字
                var text = username.value;
                // 正则验证
                var reg = /^[^\d]\w{6,13}$/;
                // 验证
                var result = reg.test(text);
                username.style.color = result ? "green" : "red";
                // 判定是否正确 如果正确继续下一道验证 如果错误 停止执行
                if (!result) {
                    username_lock = false;
                    return;
                }
                // 发送ajax请求 检测这个用户名是否可以使用
                QF.get('../php/05_checkusername.php', { username: text }, function (data) {
                    // 根据结果提示用户
                    if (!data.error) {
                        username_lock = true;
                        username.style.color = "green";
                    } else {
                        username_lock = false;
                        username.style.color = "red";
                    }
                })
                }
                
         // 
        password.onfocus = function () {
            password1.value = "";
        }
        // 验证密码
        password.onblur = function () {
            // 获取用户输入的密码
            var val = password.value;
            // 定义正则表达式 
            var reg = /^\w{8,16}$/;
            // 使用正则验证输入的值 如果符合提示用户输入正确 如果不符合提示用户输入错误
            password.style.color = reg.test(val) ? "green" : "red";
        }

        // 注册按钮
        btn.onclick = function () {
            if (!username_lock) {
                alert("请重新检查")
                return;
            }
            // 协议勾选
            var too = document.getElementById('sever');
            if(!too.checked){
                alert("请勾选协议")
                return;
            }
            // // 获取用户名 
            var user = username.value;
            // // 获取密码
            var pass = password.value;
            // 发送ajax到注册接口
            QF.post("../php/05_regist.php", { username: user, password: pass }, function (data) {
                console.log(data)
                if (!data.error) {
                        location.href = "./enter.html"
                } else {
                    alert(data.msg);
                }
            })
        }
})