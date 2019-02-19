import Vue from "vue";
import axios from "axios";
import { getToken } from "./auth.js";
import { Toast } from "vant";
import url from './api'
import { baseUrl } from './config'
// const baseURL = 'http://localhost:9090';

Vue.use(Toast);
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        return Promise.resolve(error.response);
    }
);

function checkStatus(response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (
        response &&
        (response.status === 200 ||
            response.status === 304 ||
            response.status === 400)
    ) {
        return response;
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: "网络异常"
    };
}

function checkCode(res) {
    // console.log(res)
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status_code === 500) {
        Message.warning(res.data.msg);
    }
    return res;
}

export default {
    loginPost(url, params) {
        var data = params || {};
        return axios
            .post(url, data)
            .then(function(response) {
                return checkStatus(response);
            })
            .then(res => {
                return checkCode(res);
            })
            .catch(function(err) {});
    },
    post(url, params) {
        // axios.defaults.headers.common['token'] = localStorage.getItem('token') || ''
        var data = params || {};
        if (getToken()) {
            data["token"] = getToken();
        }
        var group_id = localStorage.getItem('group_id');
        data.group_id = group_id;
        return axios
            .post(url, data)
            .then(res => {
                return getResponse(res, data);
            })
            .then(res => {
                return checkCode(res);
            })
            .catch(function(err) {});
    },
    put(url, params) {
        const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: "加载中..."
        });
        var data = params || {};
        if (getToken()) {
            data["token"] = getToken();
        }
        var group_id = localStorage.getItem('group_id');
        data.group_id = group_id;
        return axios
            .put(url, data)
            .then(res => {
                toast.clear();
                return getResponse(res, data);
            })
            .then(res => {
                toast.clear();
                return checkCode(res);
            })
            .catch(function(err) {
                toast.clear();
                console.log(err);
            });
    },
    get(url, params) {
        const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: "加载中..."
        });
        var data = params || {};
        // data['version'] = '1.0.1'
        if (getToken()) {
            data["token"] = getToken();
        }
        var group_id = localStorage.getItem('group_id');
        data.group_id = group_id;
        return axios
            .get(url, { params: data })
            .then(function(res) {
                toast.clear();
                return getResponse(res, data);
            })
            .then(res => {
                toast.clear();
                return res;
            })
            .catch(function(err) {
                toast.clear();
                console.log(err);
            });
    },
    getList(url, params) {
        const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: "加载中..."
        });
        var data = params || {};
        // data['version'] = '1.0.1'
        if (getToken()) {
            data["token"] = getToken();
        }
        return axios
            .get(url, { params: data })
            .then(function(res) {
                toast.clear();
                return getResponse(res, data);
            })
            .then(res => {
                toast.clear();
                return res;
            })
            .catch(function(err) {
                toast.clear();
                console.log(err);
            });
    },
    indexget(url, params) {
        var data = params || {};
        // data['version'] = '1.0.1'
        if (getToken()) {
            data["token"] = getToken();
        }
        return axios
            .get(url, { params: data })
            .then(function(res) {
                return getResponse(res, data);
            })
            .then(res => {
                return res;
            })
            .catch(function(err) {

                console.log(err);
            });
    },
    delete(url, params) {
        var data = params || {};
        if (getToken()) {
            data["token"] = getToken();
        }
        var group_id = localStorage.getItem('group_id');
        data.group_id = group_id;
        return axios
            .delete(url, { params: data })
            .then(res => {
                return getResponse(res, data);
            })
            .then(res => {
                return checkCode(res);
            })
            .catch(function(err) {
                Message.error("服务器异常");
            });
    }
};

function getResponse(res, data) {
    if (res.data.code === 4010) {
        //未登陆
        const browser = {
            versions: (function() {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return {
                    //移动终端浏览器版本信息
                    trident: u.indexOf("Trident") > -1, //IE内核
                    presto: u.indexOf("Presto") > -1, //opera内核
                    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
                    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
                    iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf("iPad") > -1, //是否iPad
                    webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
                };
            })(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };
        var ua = window.navigator.userAgent.toLowerCase();
        if (browser.versions.mobile) {
            //判断是否是移动设备打开。browser代码在下面
            if (ua.match(/MicroMessenger/i) == "micromessenger") {

                axios.get(url.wxOauthUrl, { redirect_uri: baseUrl + data.redirect_uri })
                    .then(function(res) {
                        window.location.href = res.data.data.url;
                    })
            } else {
                Toast('请在微信中打开')
            }
        } else {
            // console.log("ads");
        }
    }
    // console.log(res.data,'dddddddddddddddddd')
    return res.data;
}