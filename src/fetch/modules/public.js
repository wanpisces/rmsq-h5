import Vue from 'vue'
import url from '../api'
import axios from '../request.js'
import { Toast } from 'vant'
Vue.use(Toast)
let messageTips = function(res) {
        // if (!res) {
        //     Toast('服务器500错误');
        //     return;
        // }
        if (res.code == 4000) {
            Toast(res.msg)
        }
        // else if (res.code == 4010) {
        //     Toast('登陆出错，' + res.msg)
        // }
    }
    // 登录
export function getToken(obj) {
    return axios.get(url.getToken, obj)
}
export function RequestUploads(obj) {
    return axios.post(url.uploads, obj)
}
// 省市联动
export function RequestArea(obj) {
    return axios.get(url.area, obj)
}
// 单位
export function RequestCompany(obj) {
    return axios.get(url.searchGroup, obj)
}
//获取分类
export function RequestPublicAttr(obj) {
    return axios.getList(url.publicAttr + '/' + obj.category_id).then(res => {
        messageTips(res);
        return res;
    })
}
// 获取资讯列表
export function RequestNewsList(obj) {
    return axios.getList('newsApi/newsList', obj)
}