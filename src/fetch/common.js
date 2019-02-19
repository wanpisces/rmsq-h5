import Vue from "vue";
import url from "./api";
import axios from "./request.js";
import { setToken, getToken } from "./auth.js";
import { Toast } from "vant";
Vue.use(Toast);
let messageTips = function(res) {
    // if (!res) {
    //   Toast("服务器500错误");
    //   return;
    // }
    if (res.code == 4000) {
        Toast(res.msg);
    }
    // else if (res.code == 4010) {
    //   Toast("登陆出错，" + res.msg);
    // }
};

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
export function acceptLogin(redirect_uri) {
    if (browser.versions.mobile) {
        //判断是否是移动设备打开。browser代码在下面
        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return axios.get(url.wxOauthUrl, { redirect_uri: redirect_uri });
        }
    } else {
        console.log("ads");
    }
}