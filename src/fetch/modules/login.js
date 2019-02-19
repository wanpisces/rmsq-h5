import Vue from 'vue'
import url from '../api'
import axios from '../request.js'
import { Toast } from 'vant'
import { readSync } from 'fs';
Vue.use(Toast)
let messageTips = function(res) {
        if (!res) {
            Toast('服务器500错误');
            return;
        }
        if (res.code == 4000) {
            Toast(res.msg)
        } else if (res.code == 4010) {
            Toast('登陆出错，' + res.msg)
        }
    }
    //  列表
export function UserLogin(obj) {
    return axios.get(url.wxOauthUrl, obj)
}