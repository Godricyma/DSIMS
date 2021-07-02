import axios from "axios"; // 引用axios
import config from "@/api/config";  
import store from "@/store/index.js";
import router from "@/router/index.js"

const instance = axios.create({
    baseURL: config.baseUrl.dev,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
});

//添加请求拦截器，若token存在则在请求头中加token，不存在也继续请求
instance.interceptors.request.use(
    config => {
        // 每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器,没有则不带token
        // Authorization是必须的
        if (store.state.token) {
            config.headers.Authorization = ("DSIMS "+store.getters.token);
            console.log(config.headers);
        }
        return config;
    },
    error => {
        console.log("在request拦截器显示错误：", error.response)
        return Promise.reject(error);
    }
);

//respone拦截器
instance.interceptors.response.use(
    response => {
        // 在status正确的情况下，code不正确则返回对应的错误信息（后台自定义为200是正确，并且将错误信息写在message），正确则返回响应
        return response.status == 200 || response.status == 201 ? response : Promise.reject(response.data);
    },
    error => { 
        // 在status不正确的情况下，判别status状态码给出对应响应
        if (error.response) {
            console.log("在respone拦截器显示错误：", error.response)
            switch (error.response.status) {
                case 401:
                    //可能是token过期，清除它
                    // this.$store.commit("del_token"); 
                    store.commit("delToken");

                    router.replace({ //跳转到登录页面
                        path: '/login',
                         // 将跳转的路由path作为参数，登录成功后跳转到该路由
                        query: { redirect: router.currentRoute.fullPath }
                    });
            }
        }
        return Promise.reject(error.response.data);
    }
);

//get请求   
export function get(url, params = {}) {
    return new Promise((resolve, reject) => { instance.get(url, { params: params, }) .then((response) => { resolve(response); }) .catch((err) => { reject(err); });});
}
//post请求
export function post(url, data = {}) {
    return new Promise((resolve, reject) => { instance.post(url, data).then( (response) => { resolve(response.data); }, (err) => { reject(err); } );});
}
  