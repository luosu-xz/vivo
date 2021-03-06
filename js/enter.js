
; (function () {
    // 获取元素
    let usernameInp = document.getElementById("username");
    let passwordInp = document.getElementById("password");
    let remenberInp = document.getElementById("remenber");
    let loginBtn = document.getElementById("loginBtn");
    let registerBtn = document.getElementById("registerBtn");
    // 获取本地存储的信息 
    let userinfo = JSON.parse(localStorage.getItem("userinfo"));
    if (userinfo) {
        let { username, password, isRemenber } = userinfo;
        usernameInp.value = username;
        passwordInp.value = password;
        remenberInp.checked = isRemenber;
    }




    // 定义用户名和密码锁
    let username_lock = false;
    let password_lock = false;

    // 用户名验证正则
    usernameInp.onblur = function () {
        // 获取值
        let val = this.value;
        // 定义正则表达式
        let reg = /^[^\d]\w{6,12}$/;
        // 验证
        if (reg.test(val)) {
            username_lock = true;
            this.style.borderColor = "green";
        } else {
            username_lock = false;
            this.style.borderColor = "red"
        }
    }


    // 密码验证正则
    passwordInp.onblur = function () {
        // 获取用户的密码
        let val = this.value;
        // 定义正则表达式
        let reg = /^[^\d]\w{6,12}$/;
        // 验证
        if (reg.test(val)) {
            password_lock = true;
            this.style.borderColor = "green";
        } else {
            password_lock = false;
            this.style.borderColor = "red"
        }
        console.log(password_lock)
    }


    // 记住密码 
    remenberInp.onchange = function () {
        // 获取当前状态
        let isRemenber = this.checked;
        // 如果为真  将用户名、密码、当前元素的状态填入本地存储 
        let obj = {
            username: username.value,
            password: password.value,
            isRemenber
        }
        // 判定
        if (isRemenber) {
            localStorage.setItem("userinfo", JSON.stringify(obj))
        } else {
            localStorage.removeItem("userinfo");
        }
        console.log(isRemenber)
    }

    // 登录按钮
    loginBtn.onclick = function() {
        // 人工让事件触发
        usernameInp.onblur();
        passwordInp.onblur();
        console.log(username_lock, password_lock)
        // 判断锁是否打开
        if (!(username_lock && password_lock)) {
            // 说明至少有一个是没有打开的
            return;
        }
        // 发送AJAX
        QF.post("../php/login.php", {username: usernameInp.value, password: passwordInp.value}, function(data) {
            console.log(data)
            if (!data.error) {
                location.href = "../index.html";
            } else {
                alert(data.data)
            }
        })

    }

    // 注册按钮
    registerBtn.onclick = function(){
        location.href = "../html/register.html";
    }
})();

