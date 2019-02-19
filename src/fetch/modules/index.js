import Vue from 'vue'
import url from '../api'
import axios from '../request.js'
import { Toast } from 'vant'
import { readSync } from 'fs';
Vue.use(Toast)
let messageTips = function(res) {
        // console.log('asss', res)
        // if (!res) {
        //     // Toast('服务器500错误');
        //     return;
        // }
        if (res.code == 4000) {
            Toast(res.msg)
        }
        //  else if (res.code == 4010) {
        //     Toast('登陆出错，' + res.msg)
        // }
    }
    //  列表
export function RequestIndex(obj) {
    return axios.get(url.index, obj)
}
//资讯列表
export function RequestNewList(obj) {
    return axios.indexget(url.news, obj).then(res => {
        messageTips(res)
        return res;
    })
}
//资讯详情
export function RequestNewDetail(obj) {
    return axios.get(url.news + '/' + obj.news_id, obj).then(res => {
        messageTips(res)
        return res;
    })
}
//资讯评论列表
export function RequestCommentDetail(obj) {
    return axios.get(url.comment, obj).then(res => {
        messageTips(res)
        return res;
    })
}
//评论详情
export function RequestMoreComment(obj) {
    return axios.get(url.comment + '/' + obj.comment_id).then(res => {
        messageTips(res)
        return res;
    })
}
//发送评论
export function RequestSendComment(obj) {
    return axios.post(url.comment, obj).then(res => {
        messageTips(res)
        return res;
    })
}
//资讯分享
export function RequestShare(obj) {
    return axios.get(url.wxConfig, obj).then(res => {
        messageTips(res)
        return res;
    })
}

//资讯详情点赞
export function RequestPraise(obj) {
    return axios.post(url.star, obj).then(res => {
        messageTips(res)
        return res;
    })
}
//资讯收藏
export function RequestFavorites(obj) {
    return axios.post(url.favorites, obj).then(res => {
        messageTips(res)
        return res;
    })
}
// 栏目列表
export function RequestCategoryList(obj) {
    return axios.get(url.category, obj).then(res => {
        messageTips(res)
        return res;
    })
}
// 栏目编辑
export function RequestCategoryEditor(obj) {
    return axios.put(url.usercategory, obj).then(res => {
        messageTips(res)
        return res;
    })
}
// 热词列表
export function RequestHotwordsList(obj) {
    return axios.get(url.hotwords, obj).then(res => {
        messageTips(res)
        return res;
    })
}
// 搜索列表
export function RequestSearchList(obj) {
    return axios.get(url.newsSearch, obj).then(res => {
        messageTips(res)
        return res;
    })
}
// 街道搜索列表
export function RequestSearchAddressList(obj) {
    return axios.get(url.streetSearch, obj).then(res => {
        if (res.code == 2000) {
            return res;
        } else if (res.code == 4004) {
            Toast(res.data)
        }

    })
}
// 区域联动列表
export function RequestAreaList(obj) {
    return axios.get(url.area, obj).then(res => {
        if (res.code == 2000) {
            return res;
        } else if (res.code == 4004) {
            Toast(res.data)
        }

    })
}
//用户反馈
export function RequestFeedback(obj) {
    return axios.post(url.feedback, obj).then(res => {
        messageTips(res)
        return res;
    })
}