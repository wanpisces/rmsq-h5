import Vue from 'vue'
import url from '../api'
import axios from '../request.js'
import { Toast } from 'vant'
import { readSync } from 'fs';
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
    //  列表
export function RequestService(obj) {
    return axios.get(url.service, obj)
}
export function RequestServiceEditor(obj) {
    return axios.put(url.userService, obj)
}

//办事指南分类
export function RequestGuideAttr() {
    return axios.get(url.attr, {}).then(res => {
        messageTips(res);
        return res;
    })
}
//办事指南列表
export function RequestGuideList(obj) {
    return axios.get(url.event, obj).then(res => {
        messageTips(res);
        return res;
    })
}
//办事指南详情
export function RequestGuideDetail(obj) {
    return axios.get(url.event + '/' + obj.event_id).then(res => {
        messageTips(res);
        return res;
    })
}

// 政府公开
export function RequestGovIndex(obj) {
    return axios.get(url.zwgkIndex, obj).then(res => {
        messageTips(res)
        return res;
    })
}

// 政府街道详情
export function RequestGovStreeDetail(obj) {
    console.log(obj)
    return axios.get(url.zwgkGroup + '/' + obj.id, obj).then(res => {
        messageTips(res)
        return res;
    })
}
// 政府社区详情
export function RequestGovCommnityDetail(obj) {
    console.log(obj)
    return axios.get(url.zwgkSub + '/' + obj.id, obj).then(res => {
        messageTips(res)
        return res;
    })
}
// 政府资讯列表
export function RequestGovNewsList(obj) {
    console.log(obj)
    return axios.get(url.zwgkNews, obj).then(res => {
        messageTips(res)
        return res;
    })
}
// 政府资讯列表
export function RequestGovNewsDetail(obj) {
    console.log(obj)
    return axios.get(url.zwgkNews + '/' + obj.news_id, obj).then(res => {
        messageTips(res)
        return res;
    })
}
// 随手拍爆料列表
export function RequestGovBrokeCaseList(obj) {
    return axios.indexget(url.brokeCase, obj).then(res => {
        messageTips(res)
        return res;
    })

}
// 随手拍爆料详情
export function RequestGovBrokeCaseDetail(obj) {
    return axios.indexget(url.brokeCase + '/' + obj.case_id, obj).then(res => {
        messageTips(res)
        return res;
    })

}
// 随手拍评论列表
export function RequestGovBrokeComment(obj) {
    return axios.indexget(url.brokeComment, obj).then(res => {
        messageTips(res)
        return res;
    })

}
// 随手拍评论提交
export function RequestGovBrokeCommentState(obj) {
    return axios.post(url.brokeComment, obj).then(res => {
        messageTips(res)
        return res;
    })

}
// 随手拍评论详情
export function RequestGovBrokeCommentDetail(obj) {
    return axios.indexget(url.brokeComment + '/' + obj.comment_id).then(res => {
        messageTips(res)
        return res;
    })

}
// 随手拍点赞
export function RequestGovBrokeStar(obj) {
    return axios.post(url.brokeStart, obj).then(res => {
        messageTips(res)
        return res;
    })

}
//爆料分类
export function RequestServiceAttr(obj) {
    // url.serviceAttr
    return axios.get("http://api.sqydt.easysq.cn/ssp/attr" + '/' + obj.pid, obj).then(res => {
        messageTips(res)
        return res;
    })
}
//提交爆料
export function RequestSubmitCase(obj) {
    // url.serviceAttr
    return axios.post(url.case, obj).then(res => {
        messageTips(res)
        return res;
    })
}
// 活动列表 
export function RequestActivityList(obj) {
    // url.serviceAttr
    return axios.get(url.activity, obj).then(res => {
        // messageTips(res)
        return res;
    })
}
// 分类列表 
export function RequestActivityAttr(obj) {
    // url.serviceAttr
    return axios.get(url.activityAttr + '/' + obj.group_id, obj).then(res => {
        // messageTips(res)
        return res;
    })
}
// 活动详情
export function RequestActivityDetail(obj) {
    return axios.get(url.activity + '/' + obj.activity_id, obj).then(res => {
        return res;
    })
}
// 活动报名
export function RequestActivityEnlist(obj) {
    return axios.post(url.enlist, obj).then(res => {
        return res;
    })
}