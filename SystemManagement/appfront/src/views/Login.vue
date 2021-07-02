<template>
    <div class="ma-login">
        <h3>DSIMS</h3>
        <input type="text" v-model="loginForm.username" placeholder="用户名"/>
        <input type="password" v-model="loginForm.password" placeholder="密码"/>
        <button @click="login">登录</button>
    </div>
</template>

<script>
import { postData } from '@/api/index.js'

export default {
    data() {
        return {
            loginForm: {
                "username": "",
                "password": "",
            },
        };
    },
    methods: {
        login() {
            let _this = this;

            /////判读账号密码是否输入，没有则alert 出来
            if (this.loginForm.username === "" || this.loginForm.password === "") {
                alert("账号或密码不能为空");      
            } else {
                postData('/api/token/', _this.loginForm)
                .then((res) => {
                    console.log(res);
                    let tokenInfo = {
                        token: res.access,
                        username: _this.loginForm.username,
                    }

                    _this.$store.commit("saveToken", tokenInfo);
                    _this.$router.push("/home");
                })
                .catch((error) => {
                    alert("账号或密码错误");
                    console.log(error);
                });
            }    
        },  
    },
};
</script>

<style>
.ma-login {
    position: relative;
    width: 300px;
    height: 300px;
    top: 35%;
    left: 40%;
    margin: 0px;
    margin-right: 0px;
    padding: 0px;
}

.ma-login h3 {
    display: block;
    text-decoration: none;
    text-align: center;
    line-height: 57px;
    width: 100%;
    border: none;
    color: #FFF;
    background: rgb(24, 144, 255);
    border-radius: 3px;
    box-shadow: 1px 1px 5px #B6B6B6;
    text-shadow: 1px 1px 1px rgb(14, 124, 235);
    cursor: pointer;
    margin: 0px;
    padding: 0px;
}

.ma-login input {
    display: block;
    width: 100%;
    margin: 0px;
    padding: 0px;
    outline: none;
}

/* .ma-login input: */

.ma-login button {
    width: 100%;
    border: none;
    color: #FFF;
    background: rgb(24, 144, 255);
    border-radius: 3px;
    box-shadow: 1px 1px 5px #B6B6B6;
    text-shadow: 1px 1px 1px rgb(14, 124, 235);
    cursor: pointer;
    font-size: 20px;
}

.ma-login button:hover {
  background: rgb(14, 134, 225);
}
</style>
