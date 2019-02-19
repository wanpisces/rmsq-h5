<template>
  <keep-alive>
    <div class="center">
      <div class="my-header">
        <img class="avator" :src="userInfo.user_avatar" width="100%" alt="">
        <div class="nickname-id">
          <div class="my-nickname">{{userInfo.user_nickname}}</div>
          <div class="my-id">ID:{{userInfo.user_id}}</div>
        </div>
      </div>
      <div class="my-content-wrap">
        <div class="my-content">
          <div class="item-header">与我相关</div>
          <div class="item-container">
            <router-link :to="{ path: 'myActivity'}" class="item-wrap">
              <img class="img-wrap" src="../../../static/img/icon_activity.png" alt="">
              <p>我的活动</p>
            </router-link>
            <router-link :to="{ path: 'collect'}" class="item-wrap">
              <img class="img-wrap" src="../../../static/img/fb.png" alt="">
              <p>我的发布</p>
            </router-link>
            <router-link :to="{ path: 'collect'}" class="item-wrap">
              <img class="img-wrap" src="../../../static/img/mine_collection.png" alt="">
              <p>我的收藏</p>
            </router-link>
            <router-link :to="{ path: 'accessment'}" class="item-wrap">
              <img class="img-wrap" src="../../../static/img/mine_accessment.png" alt="">
              <p>我的评价</p>
            </router-link>
            <router-link :to="{ path: 'footprint'}" class="item-wrap">
              <img class="img-wrap" src="../../../static/img/footprint.png" alt="">
              <p>我的足迹</p>
            </router-link>
            <router-link :to="{ path: 'myMessage'}" class="item-wrap">
              <img class="img-wrap" src="../../../static/img/message.png" alt="">
              <p>我的消息</p>
            </router-link>
          </div>

        </div>
        <div class="my-content">
          <div class="item-header">系统服务</div>
          <div class="item-container">
            <router-link :to="{ path: 'serviceHelp'}" class="item-wrap">
              <img class="img-wrap" src="../../../static/img/sever.png" alt="">
              <p>客服与帮助</p>
            </router-link>
            <router-link :to="{ path: 'setting'}" class="item-wrap">
              <img class="img-wrap" src="../../../static/img/settings.png" alt="">
              <p>设置</p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- <div class="center-person">
        <div class="center-bg">
        </div>
        <div class="center-person-c" @click="infoDetail()">
          <div>
            点我进入详情
          </div>
          <div>
            <i class="iconfont icon-go"></i>
          </div>
        </div>
      </div> -->

      <nav-bar show-index="2"></nav-bar>
    </div>
  </keep-alive>
</template>
<script>
import Vue from "vue";
import navBar from "../../components/common/navBar.vue";
import titleBar from "../../components/common/titleBar.vue";
import MyItem from "./components/MyItem.vue";
import { RequestUserInfo } from "../../fetch/modules/user.js";
import { setToken, getToken } from "../../fetch/auth.js";
import { UserLogin } from "../../fetch/modules/login";
import { baseUrl } from "../../fetch/config";
export default {
  components: { navBar, titleBar, MyItem },
  data() {
    return {
      userInfo: {
        user_avatar: "",
        user_id: "",
        user_nickname: ""
      }
    };
  },
  created() {
    var query = this.$route.query;
    if (query.token) {
      setToken(query.token);
    }
    if (getToken()) {
      this.getUserInfo();
    } else {
      this.getUser();
    }
  },
  methods: {
    getUser() {
      UserLogin({ redirect_uri: baseUrl + "/center" }).then(res => {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          // 跳转到微信授权页面
          window.location.href = res.data.url;
        }
      });
    },
    getUserInfo() {
      RequestUserInfo({ redirect_uri: "/center" }).then(res => {
        if (res.code == 2000) {
          console.log("sss", res);
          this.userInfo = res.data;
        }
      });
    },
    infoDetail() {
      this.$router.push({
        path: "/info"
      });
    }
  }
};
</script>
<style scoped>
.center {
  background: #f2f2f2;
}
.my-header {
  display: flex;
  flex-flow: row;
  padding: 30px 30px 0;
  height: 120px;
  background: url("../../../static/img/mine-bg.png") bottom center no-repeat;
  background-size: 100% 100%;
}
.nickname-id {
  color: #fff;
}
.avator {
  margin-right: 15px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.my-nickname {
  margin-top: 18px;
  font-size: 16px;
}
.my-id {
  margin-top: 2px;
  font-size: 12px;
}
.my-content-wrap {
  padding: 15px;
}
.my-content {
  margin-bottom: 15px;
  background: #fff;
  border-radius: 15px;
}
.item-header {
  padding-left: 10px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #191919;
  border-bottom: 1px solid #f2f2f2;
}
.item-container {
  font-size: 0;
  padding: 5px 0px;
}
.item-wrap {
  display: inline-block;
  width: 25%;
  text-align: center;
  color: #4c4c4c;
  font-size: 12px;
  margin: 15px auto;
}

.img-wrap {
  margin-bottom: 5px;
  width: 30px;
  height: 30px;
  text-align: center;
}
.item-left {
  display: flex;
  flex-flow: row;
  align-items: center;
  color: #4f4f4f;
  font-size: 14px;
}
.item-right {
  display: flex;
  flex-flow: row;
  align-items: center;
  color: #999999;
  font-size: 12px;
}
.gray_arrow {
  width: 16px;
}
.badge {
  margin-right: 3px;
  width: 8px;
  height: 8px;
  background: #ff0000;
  border-radius: 50%;
}
.center-title {
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  color: #fff;
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  letter-spacing: 3px;
  z-index: 10;
}
.center-person {
  position: relative;
  height: 25vh;
}
.center-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 25vh;
  overflow: hidden;
}
.center-person-c {
  display: flex;
  justify-content: space-between;
  height: 25vh;
  /*border: 1px red solid;*/
  align-items: center;
  /*margin-top: 5vh;*/
  margin: 0 3% 0 10%;
}
.header-img {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  /*border: 1px red solid;*/
  margin-right: 5px;
  overflow: hidden;
}
.icon-go {
  color: #fff;
  font-size: 20px;
}
</style>