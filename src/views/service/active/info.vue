<template>
    <div>
        <van-notice-bar text="亲爱的志愿者，您好，为了维护您的权益，请填写真实有效的信息" left-icon="https://img.sqydt.darongshutech.com/image_201806221518286014.png" />
        <div class="info-content">
            <div>手机号</div>
            <input type="text" v-model="form.user_phone" placeholder="请输入您的电话号码" />
            <div>姓名</div>
            <input type="text" v-model="form.user_realname" placeholder="请输入您的姓名" />
            <div>身份证</div>
            <input type="text" v-model="form.user_idc" placeholder="请输入您的身份证号" />
        </div>
        <div>
            <div class="info-btn" @click="handleSure">立即报名</div>
        </div>

    </div>
</template>

<script>
//  vant组件
import Vue from "vue";
import { NoticeBar, Toast } from "vant";
Vue.use(NoticeBar).use(Toast);
// service 数据接口（分类列表）
import { RequestActivityEnlist } from "../../../fetch/modules/service";
import { setToken, getToken } from "../../../fetch/auth.js";
import { UserLogin } from "../../../fetch/modules/login";
//基本配置
import { baseUrl } from "../../../fetch/config";
export default {
  data() {
    return {
      form: {
        user_phone: "",
        user_realname: "",
        user_idc: "",
        enlist_type: "",
        activity_id: ""
      }
    };
  },
  created() {
    //   console.log(this.$route.query.token)
    //   return
    if (this.$route.query.token) {
      setToken(this.$route.query.token);
    }
    this.form.enlist_type = this.$route.query.enlist_type || "1";
    this.form.activity_id = this.$route.query.activity_id || "";
  },
  methods: {
    getUser() {
      UserLogin({ redirect_uri: document.location.href }).then(res => {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          // 跳转到微信授权页面
          window.location.href = res.data.url;
        }
      });
    },
    handleSure() {
      let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      let idcReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!phoneReg.test(this.form.user_phone)) {
        Toast("请输入正确的电话号码");
        return false;
      }
      if (!this.form.user_realname) {
        Toast("请输入您的姓名");
        return false;
      }
      if (!idcReg.test(this.form.user_idc)) {
        Toast("请输入正确的身份证号");
        return false;
      }
      console.log(getToken());
      if (getToken()) {
        RequestActivityEnlist(this.form).then(res => {
          if (res.code === 2000) {
            Toast("报名成功");
          } else {
            Toast("报名失败");
          }
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        });
      } else {
        this.getUser();
      }
    }
  }
};
</script>

<style scoped>
.info-content {
  width: 90%;
  margin: 0 auto;
  /* border: 1px red solid; */
}
.info-content div {
  font-size: 14px;
  margin-top: 3vh;
}
.info-content > input {
  outline: none;
  border-bottom: 1px #999 solid;
  height: 25px;
  font-size: 14px;
  margin-top: 5px;
  width: 100%;
}
.info-btn {
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0 auto;
  background: #ff7e00;
  margin-top: 10vh;
  border-radius: 20px;
  color: #fff;
}
</style>

