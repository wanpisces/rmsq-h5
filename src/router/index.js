import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [{
            path: "/",
            redirect: "/index",
            name: "index"
        },
        {
            path: "/index",
            meta: {
                requireAuth: true,
                keepAlive: true
            },
            name: "index",
            component: resolve => require(["../components/common/Home.vue"], resolve),
            children: [{
                    path: "/",
                    component: resolve => require(["../views/index/index.vue"], resolve), // 首页
                    meta: {
                        requireAuth: true,
                        title: "首页",
                        keepAlive: true
                    }
                },
                {
                    path: "/service",
                    component: resolve => require(["../views/service/index.vue"], resolve), //
                    meta: {
                        requireAuth: true,
                        title: "服务",
                        keepAlive: false
                    }
                },
                {
                    path: "/attr",
                    component: resolve => require(["../views/attr/index.vue"], resolve), //
                    meta: {
                        requireAuth: true,
                        title: "分类",
                        keepAlive: false
                    }
                },
                {
                    path: "/center",
                    component: resolve => require(["../views/center/index.vue"], resolve), //
                    meta: {
                        requireAuth: true,
                        title: "我的",
                        keepAlive: true
                    }
                },
                {
                    path: "/info",
                    component: resolve => require(["../views/center/info.vue"], resolve), //
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: "个人资料"
                    }
                },
                {
                    path: "/myActivity",
                    component: resolve => require(["../views/center/myActivity.vue"], resolve), //
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: "我的活动"
                    }
                },
                {
                    path: "/myMessage",
                    component: resolve => require(["../views/center/myMessage.vue"], resolve), //
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: "我的消息"
                    }
                },
                {
                    path: "/collect",
                    component: resolve => require(["../views/center/collect.vue"], resolve), //
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: "我的收藏"
                    }
                },
                {
                    path: "/accessment",
                    component: resolve => require(["../views/center/accessment.vue"], resolve), //
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: "我的评价"
                    },
                    name: "accessment"
                },
                {
                    path: "/footprint",
                    component: resolve => require(["../views/center/footprint.vue"], resolve), //
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: "我的足迹"
                    },
                    name: "footprint"
                },
                {
                    path: "/official",
                    component: resolve => require(["../views/index/components/official.vue"], resolve), //
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: "官方快报"
                    },
                    name: "official"
                },
                {
                    path: "/category",
                    component: resolve => require(["../views/index/category.vue"], resolve), //
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: "资讯栏目"
                    },
                    name: "category"
                },
                {
                    path: "/newsDetail",
                    component: resolve => require(["../components/news/newsDetail.vue"], resolve), //
                    meta: {
                        title: "资讯详情"
                    },
                    name: "newsDetail"
                },
                {
                    path: "/commmentDetail",
                    component: resolve => require(["../components/news/commmentDetail.vue"], resolve), //
                    meta: {
                        title: "更多回复"
                    },
                    name: "commmentDetail"
                },
                {
                    path: "/serviceHelp",
                    component: resolve => require(["../views/center/serviceHelp.vue"], resolve), //
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: "客服与帮助"
                    },
                    name: "service"
                },
                {
                    path: "/aboutUs",
                    component: resolve => require(["../views/center/aboutUs.vue"], resolve), //设置
                    meta: {
                        title: "关于我们"
                    },
                    name: "aboutUs"
                },
                {
                    path: "/setting",
                    component: resolve => require(["../views/center/setting.vue"], resolve), //设置
                    meta: {
                        title: "设置"
                    },
                    name: "setting"
                },
                {
                    path: "/official",
                    component: resolve => require(["../views/index/components/official.vue"], resolve), //
                    path: "/officialDetail",
                    component: resolve => require(["../views/index/components/officialDetail.vue"], resolve), //
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: "官方快报"
                    },
                    name: "officialDetail"
                },
                {
                    path: "/search",
                    component: resolve => require(["../views/search/search.vue"], resolve), //
                    meta: {
                        title: "搜索"
                    },
                    name: "search"
                },
                {
                    path: "/searchDetail",
                    component: resolve => require(["../views/search/searchDetail.vue"], resolve), //
                    meta: {
                        title: "搜索详情"
                    },
                    name: "searchDetail"
                },
                {
                    path: "/address",
                    component: resolve => require(["../views/address/address.vue"], resolve), //
                    meta: {
                        title: "选择地址"
                    },
                    name: "address"
                },
                {
                    path: "/addressSearch",
                    component: resolve => require(["../views/address/addressSearch.vue"], resolve), //
                    meta: {
                        title: "选择地址"
                    },
                    name: "addressSearch"
                },
                {
                    path: "/test",
                    component: resolve => require(["../views/test.vue"], resolve), //
                    meta: {
                        title: "选择地址"
                    },
                    name: "test"
                },
                {
                    path: "/testIndex",
                    component: resolve => require(["../views/test/index.vue"], resolve), //
                    meta: {
                        title: "选择地址"
                    },
                    name: "testIndex"
                },
                {
                    path: "/guideline",
                    component: resolve => require(["../views/service/guideline/guideline.vue"], resolve), //
                    meta: {
                        title: "办事指南"
                    },
                    name: "guideline"
                },
                {
                    path: "/guideClassfiy",
                    component: resolve => require(["../views/service/guideClassfiy/guideClassfiy.vue"], resolve), //
                    meta: {
                        title: "分类"
                    },
                    name: "guideClassfiy"
                },
                {
                    path: "/guideList",
                    component: resolve => require(["../views/service/guideList/guideList.vue"], resolve), //
                    meta: {
                        title: "办事指南"
                    },
                    name: "guideList"
                },
                {
                    path: "/guideDetail",
                    component: resolve => require(["../views/service/guideDetail/guideDetail.vue"], resolve), //
                    meta: {
                        title: "办事详情"
                    },
                    name: "guideDetail"
                },
                {
                    path: "/openGov",
                    component: resolve => require(["../views/service/openGov/openGov.vue"], resolve), //
                    meta: {
                        title: "政务公开"
                    },
                    name: "openGov"
                },
                {
                    path: "/streeDetail",
                    component: resolve => require(["../views/service/openGov/streeDetail.vue"], resolve), //
                    meta: {
                        title: "街道详情"
                    },
                    name: "streeDetail"
                },
                {
                    path: "/commnityDetail",
                    component: resolve => require(["../views/service/openGov/commnityDetail.vue"], resolve), //
                    meta: {
                        title: "街道详情"
                    },
                    name: "commnityDetail"
                },
                {
                    path: "/notice",
                    component: resolve => require(["../views/service/openGov/notice.vue"], resolve), //
                    meta: {
                        title: "公示公告"
                    },
                    name: "notice"
                },
                {
                    path: "/benefit",
                    component: resolve => require(["../views/service/openGov/benefit.vue"], resolve), //
                    meta: {
                        title: "惠民政策"
                    },
                    name: "benefit"
                },
                {
                    path: "/noticeDetail",
                    component: resolve => require(["../views/service/openGov/noticeDetail.vue"], resolve), //
                    meta: {
                        title: "公示公告"
                    },
                    name: "noticeDetail"
                },
                {
                    path: "/ssp",
                    component: resolve => require(["../views/service/ssp/index.vue"], resolve), //
                    meta: {
                        title: "随手拍"
                    },
                    name: "ssp"
                },
                {
                    path: "/brokeDetail",
                    component: resolve => require(["../views/service/ssp/component/brokeDetail.vue"], resolve), //
                    meta: {
                        title: "随手拍"
                    },
                    name: "brokeDetail"
                },
                {
                    path: "/active",
                    component: resolve => require(["../views/service/active/index.vue"], resolve), //
                    meta: {
                        title: "社区活动"
                    },
                    name: "active"
                },
                {
                    path: "/activeDetail",
                    component: resolve => require(["../views/service/active/detail.vue"], resolve), //
                    meta: {
                        title: "活动详情"
                    },
                    name: "activeDetail"
                },
                {
                    path: "/activeInfo",
                    component: resolve => require(["../views/service/active/info.vue"], resolve), //
                    meta: {
                        title: "活动详情"
                    },
                    name: "activeInfo"
                },
                {
                    path: "/serviceEditor",
                    component: resolve => require(["../views/service/components/serviceEditor.vue"], resolve), //
                    meta: {
                        title: "编辑"
                    },
                    name: "serviceEditor"
                }
            ]
        }
    ]
});
let sess = window.sessionStorage;
// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title;
//     next();
// });

Vue.mixin({
    beforeRouteLeave(to, from, next) {
        let toRoute = to.path;
        let fromRoute = from.path;
        let h = JSON.parse(sess.getItem(toRoute));
        if (h && h.history) {
            this.$destroy();
            next();
        } else {
            next();
        }
        next();
    }
});
const beforeEach = function(to, from, next) {
    document.title = to.meta.title;
    const toRoute = to.path;
    const fromRoute = from.path;
    let h = JSON.parse(sess.getItem(toRoute));
    if (h && h.history) {
        h.history = false;
        sess.removeItem(toRoute);
    } else {
        sess.setItem(
            fromRoute || "/",
            JSON.stringify({
                history: true
            })
        );
    }
    next();
};
router.beforeEach(beforeEach);
export default router;