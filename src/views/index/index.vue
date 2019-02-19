<template>
  <div waterfall-disabled="disabled" waterfall-offset="50" :disabled='disabled'>
    <my-swiper :banner="banner" :bannerTitle="bannerTitle" :searchShow="searchShow" :name="name"></my-swiper>
    <navSide :nav="nav"></navSide>
    <official-list :offical="officalData"></official-list>
    <!-- <sticky className="sub-navbar"> -->
    <div style="height:100vh">
      <div class="tab-swicth" id="top">
        <van-tabs @change="tabNavClick" sticky swipeable>
          <van-tab v-for="(item,index) in category" :index="index+2" :title="item.category_name" :key="index">
            <newList :newsData='newsData' icon="1"></newList>
            <div v-if="search.current_page >= total_page && newsData.length>0" class="bootom-text">我是有底线哒~~</div>
            <div class="loadingMore" v-if="loadingTwo && search.current_page < total_page">
              加载中...
            </div>
          </van-tab>

        </van-tabs>
        <div class="tab-cetaory" @click='addCategory()' :class="searchBarFixed == true ? 'isFixed' :'tab-add'">
          <img src="./../../../static/img/add.png" width="15" alt="">
        </div>
      </div>

    </div>
    <!-- </sticky> -->
    <nav-bar show-index="0"></nav-bar>
    <div style="height:51px"></div>
    <!-- <div id="contents"></div> -->
  </div>
</template>
<script>
import Vue from "vue";
// vant组件
import { Tab, Tabs, PullRefresh, List, Cell, Waterfall, Loading } from "vant";
Vue.use(Tab)
  .use(Tabs)
  .use(PullRefresh)
  .use(List)
  .use(Cell)
  .use(Waterfall)
  .use(Loading);
// 自定义组件
import navBar from "./../../components/common/navBar.vue";
import mySwiper from "./components/swiper.vue";
import navSide from "./components/nav.vue";
import newList from "./../../components/common/newsView.vue";
import officialList from "./components/official.vue";
import vScroll from "./../../components/fresh/index.vue"; // 刷新
import Sticky from "./../../components/top/top";
// service数据接口
import { UserLogin } from "../../fetch/modules/login";
import { RequestIndex, RequestNewList } from "../../fetch/modules/index";
import { setToken, getToken } from "../../fetch/auth.js";
//基本配置
import { baseUrl } from "../../fetch/config";

export default {
  components: {
    navBar,
    mySwiper,
    navSide,
    newList,
    officialList,
    vScroll,
    Sticky
  },
  data() {
    return {
      searchShow: false,
      banner: [], // banner列表
      nav: [], //导航 按钮列表
      category: [], // 模块栏目列表
      newsData: [], // 资讯列表,
      bannerTitle: "",
      officalData: [], //官方快报
      index: 1,
      search: {
        run_in: 1,
        current_page: 1,
        page_size: 10,
        group_id: localStorage.getItem("group_id") || "1",
        category_id: ""
      },
      disabled: false,
      bottom: false,
      isFinish: false,
      isMore: false,
      total_num: 0,
      total_page: 0,
      name: "",
      loadingTwo: false,
      searchBarFixed: false,
      recomNews: []
    };
  },

  created() {
    var query = this.$route.query;
    if (query.group_id) {
      localStorage.setItem("found", "1");
      localStorage.setItem("name", query.group_name);
      localStorage.setItem("group_id", query.group_id);
      this.search.group_id = localStorage.getItem("group_id", query.group_id);
      this.searchShow = false;
      this.name = query.group_name;
    } else {
      if (localStorage.getItem("group_id")) {
        this.search.group_id = localStorage.getItem("group_id");
        if (localStorage.getItem("found") == 1) {
          this.name = localStorage.name;
          this.searchShow = false;
        } else {
          this.searchShow = true;
        }
      } else {
        this.searchShow = true;
      }
    }
    if (query.token) {
      setToken(query.token);
    }

    this.getList({ group_id: this.search.group_id });
  },
  mounted() {
    window.addEventListener("scroll", this.getWindowListener);
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      try {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var offsetTop = document.querySelector(".tab-swicth").offsetTop;
        // console.log("sss", scrollTop, offsetTop);
        if (scrollTop > offsetTop) {
          this.searchBarFixed = true;
        } else {
          this.searchBarFixed = false;
        }
      } catch (error) {}
    },
    getUser() {
      UserLogin({ redirect_uri: baseUrl + "/index" }).then(res => {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          // 跳转到微信授权页面
          window.location.href = res.data.url;
        }
      });
    },
    // 首页数据
    getList(obj) {
      RequestIndex(obj).then(res => {
        if (res.code === 2000) {
          this.search.category_id = res.data.category[0].category_id;
          this.banner = res.data.banner;
          this.nav = res.data.nav;
          this.officalData = res.data.official_news;
          // this.search.current_page = res.data.current_page;
          this.category = res.data.category;
          this.recomNews = res.data.recom_news;
          this.newList();
        } else {
        }
      });
    },
    newList() {
      var args = this.search;
      // console.log(args);
      this.bottom = false;
      this.loadingTwo = true;
      this.search.group_id = localStorage.getItem("group_id");
      // for (const key in args) {
      //   // 去除对象内多余的空值key
      //   if (args[key] === "") {
      //     delete args[key];
      //   }
      // }
      if (args.category_id == "1000" && args.current_page == 1) {
        args.current_page += 1;
        RequestNewList(args).then(res => {
          this.search.current_page = res.data.current_page;
          this.loadingTwo = false;
          this.isMore = false;
          this.disabled = false;
          this.bottom = true;
          this.total_num = res.data.total_num;
          this.total_page = Math.ceil(res.data.total_num / res.data.page_size);
          this.newsData = this.recomNews.concat(res.data.list);
        });
      } else {
        RequestNewList(args).then(res => {
          this.search.current_page = res.data.current_page;
          this.loadingTwo = false;
          this.isMore = false;
          this.disabled = false;
          this.bottom = true;
          this.total_num = res.data.total_num;
          this.total_page = Math.ceil(res.data.total_num / res.data.page_size);
          this.newsData = this.newsData.concat(res.data.list);
        });
      }
    },
    // 栏目切换请求新闻资讯
    tabNavClick(index, title) {
      this.newsData = [];
      this.isFinish = false;
      // for (let i in this.category) {
      //   if (index == i) {
      //     this.search.category_id = this.category[i].category_id;
      //   }

      // }
      this.search.category_id = this.category[index].category_id;
      this.search.current_page = 1;
      this.newList();
    },
    // 栏目添加
    addCategory() {
      if (getToken()) {
        this.$router.push({ name: "category" });
      } else {
        this.getUser();
      }
    },
    onLoad() {
      // console.log("cccccccccccccc");
    },
    //滚动条在Y轴上的滚动距离
    getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
      return scrollTop;
    },
    //文档的总高度
    getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight = bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
      return scrollHeight;
    },

    //浏览器视口的高度
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    },
    getWindowListener() {
      if (this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
        this.disabled = true;
        this.bottom = true;
        var total_page = this.total_page;
        var current_page = this.search.current_page;
        if (!this.isMore && total_page > current_page && this.bottom) {
          this.isMore = true;
          this.search.current_page = Number(current_page) + 1;
          this.newList();
        } else {
          this.bottom = false;
          this.isFinish = true;
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.getWindowListener);
  }
};
</script>
<style scoped>
.isFixed {
  position: fixed;
  background: rgba(255, 255, 255, 1);
  top: 0;
  right: 0;
  z-index: 999;
  width: 40px;
  text-align: center;
  height: 42px;
  border-bottom: 1px #f3f3f3 solid;
  border-top: 1px #f3f3f3 solid;
}
.tab-swicth {
  position: relative;
  background: #fff;
}
.tab-add {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 100;
  width: 40px;
  text-align: center;
  height: 42px;
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px #f3f3f3 solid;
  border-top: 1px #f3f3f3 solid;
  /* border: 1px red solid; */
  /* width: 10%; */
}
.tab-cetaory img {
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* margin-top: 10px; */
}
/* @media screen and (max-width: 320px) {
  .tab-add {
    position: absolute;
    right: 10px;
  }
} */
.index-bottom {
  height: 100px;
  width: 100%;
  margin-bottom: 100px;
}
.index-line {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin: 10px 0 0 0;
}
.bootom-text {
  margin: 15px auto;
  font-size: 14px;
  color: #2b79b5;
  text-align: center;
  /* margin-bottom: 60px; */
}
.loadingMore {
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #2b79b5;
  position: relative;
}

/* .loader {
  position: absolute;
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  perspective: 800px;
} */

/* .inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.inner.one {
  left: 0%;
  top: 0%;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #efeffa;
}

.inner.two {
  right: 0%;
  top: 0%;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #efeffa;
}

.inner.three {
  right: 0%;
  bottom: 0%;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #efeffa;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
} */
</style>