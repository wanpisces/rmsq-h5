import Vue from "vue";
import url from "../api";
import axios from "../request.js";
import { Toast } from "vant";
Vue.use(Toast);
let messageTips = function(res) {
    console.log('a_____aa')
        // if (!res) {
        //     Toast("服务器500错误");
        //     return;
        // }
    if (res.code == 4000) {
        Toast(res.msg);
    }
};
// 登录
export function UserLogin(obj) {
    return axios.loginPost(url.login, obj);
}
//用户信息
export function RequestUserInfo(obj) {
    return axios.get(url.userInfo, obj).then(res => {
        messageTips(res);
        return res;
    });
}

//用户收藏列表
export function RequestFavoritesList(obj) {
    return axios.get(url.userFavorites, obj).then(res => {
        messageTips(res);
        return res;
    });
}
//用户评论列表
export function RequestCommentList(obj) {
    return axios.get(url.userComment, obj).then(res => {
        messageTips(res);
        return res;
    });
}
//用户足迹列表
export function RequestFootprintList(obj) {
    return axios.get(url.userFootPrint, obj).then(res => {
        messageTips(res);
        return res;
    });
}
//用户消息
export function RequestMessageList(obj) {
    return axios.get(url.myMessage, obj).then(res => {
        return res;
    });
}
//消息删除
export function RequestMessageDelete(obj) {
    return axios.delete(url.myMessage, obj).then(res => {
        messageTips(res);
        return res;
    });
}