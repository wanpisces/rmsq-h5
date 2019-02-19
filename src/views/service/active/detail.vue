<template>
    <div>
        <div>
            <div class="video-wrap">
                <img class="school-img" :src="activeData.activity_pic" alt="">
                <div class="course-footer-info">
                    <div class="course-footer-left">
                        <h2 class="news-tit">{{activeData.activity_title}}</h2>
                    </div>
                </div>
                <div class="new-nav">
                    {{activeData.activity_state == 1?"未开始":activeData.activity_state == 2?"进行中":activeData.activity_state == 3?"已结束":""}}
                </div>
            </div>
            <div class="detail-line-wrap">
                <div class="detail-title">活动信息</div>
                <div class="line-item line-item1">
                    <div>
                        <img class="icon-img2" src="../../../../static/img/host.png" alt="">
                        <span>活动主办方：{{activeData.sponsor_name}}</span>
                    </div>
                    <!-- <rouer-link :to="{name:'detail'}" class="more-link">简介<img class="arrow_right" src="../../../../static/img/gray_arrow.png" alt=""></rouer-link> -->
                </div>
                <div class="line-item">
                    <img class="icon-img4" src="../../../../static/img/where.png" alt="">
                    <span>活动地点：{{activeData.address}}</span>
                </div>
                <div class="line-item">
                    <img class="icon-img1" src="../../../../static/img/deadline.png" alt="">
                    <span>报名截止时间：{{activeData.enlist_endtime}}</span>
                    <span class="rest-time">仅剩 {{activeData.left_day}}</span>
                </div>
                <div class="line-item">
                    <img class="icon-img3" src="../../../../static/img/star_time.png" alt="">
                    <span>活动时间：{{activeData.activity_starttime}} 至 {{activeData.activity_endtime}}</span>
                </div>
                <div class="line-item">
                    <img class="icon-img3" src="../../../../static/img/star_time.png" alt="">
                    <span>活动类型：{{activeData.attr_value}}</span>
                </div>
            </div>
            <div class="detail-line-wrap">
                <div class="detail-title">报名信息</div>
                <div class="line-item">
                    <img class="icon-img2" src="../../../../static/img/persons.png" alt="">
                    <span>报名人数：
                        <span class="orange">{{activeData.enlist_general_num}}</span> / {{activeData.enlist_max_general_num == 0?"无限制":activeData.enlist_max_general_num}}</span>
                </div>
                <div v-if="activeData.need_volunteer == 1">
                    <div class="line-item">
                        <img class="icon-img4" src="../../../../static/img/volunteer.png" alt="">
                        <span>志愿者报名人数：
                            <span class="orange">{{activeData.enlist_volunteer_num}}</span> / {{activeData.enlist_max_volunteer_num == 0?"无限制":activeData.enlist_max_volunteer_num}}</span>
                    </div>
                    <div class="signuped-wrapper">
                        <p>{{activeData.enlist_list.length}}人已报名志愿者</p>
                        <div class="sign-user-wrap">
                            <div class="sign-user-main" v-if="activeData.enlist_list.length>0">
                                <img v-for="(item,index)  in activeData.enlist_list" :key="index" :src="item.user_avatar" alt="">
                            </div>
                            <div class="join-volenteer" v-else>
                                暂无志愿者，快去加入吧
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="active-detail-nav">
                <div @click="activeNavSwitch(1)" :class="activeNav == 1?'active':''">
                    <p>活动简介</p>
                </div>
                <div @click="activeNavSwitch(2)" :class="activeNav == 2?'active':''">
                    <p>评价
                        <span>（{{commentList.length}}）</span>
                    </p>
                </div>
            </div>
            <div v-if="activeNav == 1">
                <div class="a-article" v-html="activeData.activity_content"></div>
            </div>
            <div v-if="activeNav == 2">
                <div style="overflow-x:hidden;">
                    <div class="main-wrapper">
                        <div class='title'>
                            <span class='name'>全部评论</span>
                            <span class='num'>{{commentList.length}}条</span>
                        </div>
                        <div class='commentEmpty' v-if="commentList.length==0">
                            暂无评论
                        </div>
                        <div wx:else class='commentList'>
                            <div class='item' v-for="(item,index) in commentList" :key='index'>
                                <div class='topdiv'>
                                    <div class='layer'>
                                        <img mode='aspectFill' class='userImg' :src='item.user_avatar'>
                                        <div class='nameAndTime'>
                                            <span class='name'>{{item.user_name}}</span>
                                            <span class='time'>{{item.create_time}}</span>
                                        </div>
                                        <div>
                                            <button :disabled='staring' class='commentZan' @click="sendStar(item.comment_id)">
                                                <img mode='aspectFill' :src="item.is_star==2?'../../../static/img/xq_access_zan_touch.png':'../../../static/img/xq_access_zan.png'">
                                                <span class='num'>{{item.star_num}}</span>
                                            </button>
                                        </div>
                                        <div report-submit='true' bindsubmit='huifu'>
                                            <button class='more' hover-class='hoverClass2' form-type='submit' @click="huifu({level:2,top_id:item.comment_id,comment_user_id:item.user_id})">
                                                <!-- <img mode='aspectFill' src='/pic/xq_access_more.png'> -->
                                                <span class='huifu'>回复</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class='bottomdiv'>{{item.comment_content}}</div>
                                <div v-if="item.child.list.length>0" class='huifudiv'>
                                    <div class='huifuItem'>
                                        <div class="itemChild" v-for='(childItem,index) in item.child.list' :key='index'>
                                            <span style="color:#2b79b5;">{{childItem.user_name}}</span> : {{childItem.comment_content}}
                                        </div>
                                        <router-link class="rest-more" v-if="item.child.left_num>0" :to="{path:'commmentDetail', query:Object.assign(item,{news_id:branchId})}" @click="checkMore(item.comment_id)">
                                            剩余
                                            <span>{{item.child.left_num}}条</span>
                                            回复
                                        </router-link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div report-submit='true'>
                        <div class="comment" v-if="level ==1">
                            <input name="input" @focus="isFocus=true;" @blur="isFocus=false" class="commentInput" placeholder="期待你的神评论" v-model='inputValue'>
                            <!-- <button id='share' :hidden='isFocus' class='bnt' @click="sendShare">
          <img mode='aspectFill' src='../../../static/img/share.png' class='share'>
          </button> -->
                            <button id='submit' class='bnt3' @click="sendComment({level:1})">
                                发送
                            </button>
                        </div>
                        <div class="comment" v-if="level ==2">
                            <input name="input" @focus="isFocus=true" @blur="isFocus=false;level=1" class="commentInput" placeholder="期待你的神回复" v-model='inputValue'>
                            <button id='submit' class='bnt3' @click="sendComment({level:2})">
                                发送
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:60px;width:100%"></div>
            <div class="a-bar" v-if="activeData.is_enlist == 2&&activeData.enlist_state == 2">
                <router-link class="sign-link" :to="{name:'activeInfo',query:{activity_id:activity_id,enlist_type:activeData.enlist_type}}">
                    <img src="../../../../static/img/volun_baoming.png" width="30px" alt="">
                    <div>志愿者报名</div>
                </router-link>
                <div @click="handleClick">
                    <div>我要报名</div>
                </div>
            </div>
            <div class="signuped" v-if="activeData.enlist_state == 1">
                报名未开始
            </div>
            <div class="signuped" v-if="activeData.enlist_state == 3">
                报名已结束
            </div>
            <div class="signuped" v-if="activeData.is_enlist == 1">
                您已报名志愿者
            </div>
        </div>

    </div>
</template>
<script>
import Vue from "vue";
import {
  RequestActivityDetail,
  RequestActivityEnlist
} from "../../../fetch/modules/service";
import { Tab, Tabs, Toast, Dialog } from "vant";
import {
  RequestNewDetail,
  RequestPraise,
  RequestCommentDetail,
  RequestSendComment
} from "../../../fetch/modules/index.js";
import { setToken, getToken } from "../../../fetch/auth.js";
import { UserLogin } from "../../../fetch/modules/login";
import { baseUrl } from "../../../fetch/config";
Vue.use(Tab)
  .use(Tabs)
  .use(Toast)
  .use(Dialog);

export default {
  data() {
    return {
      activity_id: "",
      activeNav: 1,
      activeData: {},
      inputValue: "",
      commentObj: {
        comment_type: 1,
        current_page: 1
      },
      commentList: [],
      isFocus: false,
      userName: "",
      isAuthorzeUserInfo: true,
      top_id: "",
      level: 1,
      comment_user_id: ""
    };
  },
  created() {
    var activity_id = this.$route.query.activity_id || "470329163098619904";
    this.activity_id = activity_id;
    this.getActiveData(activity_id);
    var query = this.$route.query;
    if (query.token) {
      setToken(query.token);
    }
    this.getCommentData();
  },
  mounted() {},
  methods: {
    //   切换活动和评论
    activeNavSwitch(activeNav) {
      this.activeNav = activeNav;
    },
    //评论点赞
    sendStar(data) {
      if (getToken()) {
        var obj = {
          star_type: 2,
          branch_id: data,
          redirect_uri: baseUrl + "/activeDetail?activity_id=" + this.activity_id
        };
        RequestPraise(obj).then(res => {
          if (res.code == 2000) {
            this.getCommentData();
          }
        });
      } else {
        this.getUser();
      }
    },
    // 获取活动信息
    getActiveData(activity_id) {
      RequestActivityDetail({ activity_id: activity_id }).then(res => {
        this.activeData = res.data;
      });
    },
    getCommentData() {
      this.commentObj.branch_id = this.activity_id;
      this.activity_id = this.activity_id;
      var arg = this.commentObj;
      RequestCommentDetail(arg).then(res => {
        this.commentList = res.data.list;
      });
    },
    getUser() {
      UserLogin({
        redirect_uri: baseUrl + "/activeDetail?activity_id=" + this.activity_id
      }).then(res => {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          // 跳转到微信授权页面
          window.location.href = res.data.url;
        }
      });
    },
    //评论回复
    huifu(data) {
      this.isFocus = true;
      this.top_id = data.top_id;
      this.level = data.level;
      this.comment_user_id = data.comment_user_id;
    },
    sendComment(data) {
      if (getToken()) {
        var obj = {
          comment_type: 1,
          comment_content: this.inputValue,
          branch_id: this.activity_id,
          redirect_uri: baseUrl + "/activeDetail?activity_id=" + this.activity_id,
          top_id: this.top_id,
          level: data.level,
          comment_user_id: this.comment_user_id
        };
        if (!obj.comment_content) {
          Toast("请输入评论内容！");
          return false;
        }
        RequestSendComment(obj).then(res => {
          if (res.code == 2000) {
            this.getCommentData();
            this.level = 1;
            Toast("评论成功");
            this.inputValue = "";
          }
        });
      } else {
        this.getUser();
      }
    },
    handleClick() {
      var that = this;
      var activity_id = this.activity_id;
      Dialog.confirm({
        title: "提示：",
        message: "是否确定报名？"
      })
        .then(() => {
          var args = {
            activity_id: that.activity_id,
            enlist_type: 2
          };
          RequestActivityEnlist(args).then(res => {
            if (res.code == 2000) {
              that.activeData.is_enlist == 1;
              Toast.success("报名成功");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style scoped>
.video-wrap {
  padding: 15px;
  border-bottom: 10px solid #f4f4f4;
}
.arrow_right {
  width: 18px;
  height: 18px;
}

.join-volenteer {
  line-height: 30px;
  font-size: 14px;
  color: #515151;
}

.signuped-wrapper {
  padding: 10px 0 10px 15px;
}
.signuped-wrapper p {
  margin-bottom: 10px;
  font-size: 13px;
  color: #999999;
}
.sign-user-wrap {
  width: 100%;
  height: 45px;
  overflow: hidden;
}
.sign-user-main {
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  height: 60px;
}
.sign-user-main img {
  margin-right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.more-link {
  color: #999999;
}
.rest-time {
  margin-left: 10px;
  color: #ff7e00;
}
.orange {
  color: #ff7e00;
}
.detail-title {
  padding-left: 15px;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  color: #353535;
  border-bottom: 1px solid #f2f2f2;
}
.video-wrap .school-img {
  width: 100%;
  height: 180px;
  background: black;
  border-radius: 10px;
}
.course-footer-info {
  display: flex;
  justify-content: space-between;
  flex-flow: row;
}
.course-footer-left {
  padding: 3px 0 8px;
  color: #353535;
  /* width: 70%; */
}
.course-footer-right {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 25%;
  font-size: 14px;
  color: #515151;
}
.collect-icon {
  width: 20px;
  height: 20px;
}
.share-icon {
  width: 25px;
  height: 30px;
}
.course-title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #353535;
}
.course-title img {
  margin-right: 8px;
}
.content-wrap {
  padding: 0 15px 0 35px;
}
.news-tit {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-top: 10px;
  font-size: 16px;
  font-weight: normal;
}
.news-attr {
  margin-top: 5px;
  font-size: 14px;
  color: #acacac;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.user-operate {
  margin-top: 5px;
  font-size: 14px;
  color: #999999;
}
.dian-zan {
  margin-right: 3px;
  width: 8px;
  height: 6px;
}
.study-user {
  margin-right: 3px;
  margin-left: 15px;
  width: 8px;
  height: 10px;
}
.detail-line-wrap {
  /* padding-left: 15px; */
  border-bottom: 10px solid #f4f4f4;
}
.line-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 15px 0;
  font-size: 14px;
  color: #353535;
  border-bottom: 1px solid #f2f2f2;
}
.line-item1 {
  justify-content: space-between;
}
.phone-call {
  position: absolute;
  top: 15px;
  right: 10px;
  width: 20px;
  height: 20px;
}
.address-icon {
  position: absolute;
  top: 15px;
  right: 10px;
  width: 20px;
  height: 20px;
}
.blue-line {
  display: inline-block;
  margin-right: 10px;
  width: 3px;
  height: 18px;
  border-radius: 2px;
  background: #2dbaf0;
}
.icon-img1 {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}
.icon-img2 {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}
.icon-img3 {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}
.icon-img4 {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}
.dotted {
  display: inline-block;
  margin-right: 12px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #169ee9;
}
.line-small-title {
  width: 30px;
  height: 12px;
}
.course-content {
  margin-bottom: 20px;
}
.course-content p {
  font-size: 15px;
  color: #353535;
}
.course-content p span {
  margin-right: 10px;
  font-size: 15px;
  color: #6e6e6e;
}
.a-title {
  text-align: center;
  padding: 15px;
}
.a-article {
  text-indent: 2em;
  padding: 15px;
  line-height: 25px;
  color: #353535;
}
.a-article>>>img{
    max-width: 100%;
}
.new-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 0px 0px;
  font-size: 14px;
  color: #ff7e00;
}
.a-bar {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 45px;
  font-size: 14px;
  text-align: center;
  border-top: 1px #f2f2f2 solid;
  background: #fff;
}
.signuped {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  text-align: center;
  background: #e1e1e1;
  color: #b3b3b3;
}
.active-detail-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  font-size: 18px;
  text-align: center;
  border-bottom: 1px #f2f2f2 solid;
  font-size: #353535;
  background: #fff;
}
.active-detail-nav > div {
  width: 45%;
  height: 43px;
  line-height: 43px;
}
.active-detail-nav > div > p {
  display: inline-block;
  border-bottom: 3px solid transparent;
}
.active-detail-nav > div.active > p {
  border-bottom: 3px solid #ff7e00;
}
.active-detail-nav > div span {
  font-size: 16px;
  color: #999999;
}
.active-detail-nav > div:nth-child(1) {
  border-right: 1px #f2f2f2 solid;
}
.a-bar .sign-link {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  color: #ff7e00;
  width: 50%;
  border-top: 1px solid #ff7e00;
  height: 44px;
  line-height: 44px;
}
.a-bar > div:nth-child(2) {
  width: 50%;
  background: #ff7e00;
  height: 45px;
  line-height: 45px;
  color: #fff;
}
.main-wrapper {
  padding-bottom: 60px;
}
.rest-more {
  margin-top: 4px;
  color: #353535;
}
.rest-more span {
  color: #2b79b5;
}
.itemChild {
  margin: 2px 0;
}
.title {
  display: flex;
  flex-flow: row nowrap;
  padding: 15px 0 0px;
  align-items: flex-end;
}
.title .name {
  font-size: 14px;
  color: #353535;
  margin-left: 15px;
  font-weight: 600;
}

.title .num {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}
.commentEmpty {
  font-size: 14px;
  padding: 10px 30px;
  color: #999999;
  font-weight: 500;
}
.commentList {
  display: flex;
  flex-flow: column;
}

.commentList .item {
  display: flex;
  flex-flow: column;
  padding: 15px 0;
  margin: 0 5px;
  border-bottom: 1px solid #f2f2f2;
}
.commentList .item {
  display: flex;
  flex-flow: row column;
  /* align-items: center; */
  position: relative;
}
.huifudiv .huifuItem {
  margin-top: 5px;
  padding: 8px 5px;
  width: 75%;
  background: rgb(241, 241, 240);
  color: #353535;
}
.huifudiv {
  width: 100%;
  padding-left: 60px;
  font-size: 14px;
}
.commentList .item .layer {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
}

.commentList .item .layer .userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 8px;
}

.commentList .item .layer .nameAndTime {
  display: flex;
  flex-flow: column;
  margin-left: 8px;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 1;
  height: 40px;
}

.commentList .item .layer .nameAndTime .name {
  font-size: 14px;
  color: #2b79b5;
}

.commentList .item .layer .nameAndTime .time {
  font-size: 12px;
  color: #999;
}
.topdiv {
  width: 100%;
}

.commentList .item .layer .commentZan {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-end;
  margin: 0;
  padding: 10px 14px;
  background: #fff;
  border-radius: 0;
}

.commentList .item .layer .commentZan::after {
  border: 0;
}

.commentList .item .layer .commentZan img {
  width: 15px;
  height: 15px;
}

.commentList .item .layer .hoverClass {
  background: #f8f8f8;
}

.commentList .item .layer .commentZan .num {
  font-size: 12px;
  color: #bcbcbc;
  margin-left: 8px;
  line-height: 1;
}

.commentList .item .layer .more {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 14px 0 0;
  padding: 9px 5px 8px 0px;
  border-radius: 0;
  background: #fff;
  line-height: 1;
}
.bottomdiv {
  margin: 6px 0 0 60px;
  /* padding: 6px 0 0 110px; */
  text-align: left;
  font-size: 14px;
  color: #353535;
}

.commentList .item .layer .more::after {
  border: 0;
}

.commentList .item .layer .more .hoverClass2 {
  background: #f8f8f8;
}

.commentList .item .layer .more .huifu {
  color: #999;
  font-size: 12px;
  line-height: 1;
}

.commentList .item .bottomView {
  font-size: 28px;
  color: #353535;
  margin: 15px 68px 0 110px;
}

.commentList .item .huifuView {
  display: flex;
  flex-flow: column;
  background: #f2f2f2;
  margin: 15px 68px 0 110px;
  padding: 10px 0;
}

.commentList .item .huifuView .huifuItem {
  font-size: 26px;
  color: #353535;
  padding: 10px;
}

.commentList .item .huifuView .lookMore {
  font-size: 24px;
  color: #b7b7b7;
  padding: 10px;
  margin: 0;
  border-radius: 0;
  background: #f2f2f2;
  line-height: 1;
  text-align: left;
  width: auto;
}

.commentList .item .huifuView .lookMoreHove {
  background: #f8f8f8;
}

.commentList .item .huifuView .lookMore::after {
  border: 0;
  width: auto;
}

.commentList .item .huifuView .lookMore text {
  font-size: 24px;
  color: #2ea3fc;
}

.comment {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: fixed;
  z-index: 1000;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 -2px 0 #f2f2f2;
}

.commentBg {
  background: #f4f4f4;
}

.comment .commentInput {
  font-size: 14px;
  margin: 5px 0px 5px 8px;
  padding: 10px;
  flex-grow: 1;
  background: #f4f4f4;
  border-radius: 5px;
}

.comment .inputBg {
  background: #fff;
}

.comment .placeHolderStyle {
  font-size: 28px;
  color: #bdbdbd;
}

.comment .bnt {
  margin: 0;
  border-radius: 0;
  background: #fff;
  line-height: 1;
}

.comment .bnt::after {
  border: 0;
}

.comment .bnted {
  background: #f8f8f8;
}

.comment .bnt .share {
  width: 30px;
  height: 30px;
}

.comment .bnt2 {
  margin: 0;
  border-radius: 0;
  background: #fff;
  line-height: 1;
  margin-right: 6px;
}
.comment .bnt2::after {
  border: 0;
}
.comment .bnted2 {
  background: #f8f8f8;
}
.comment .bnt2 .collect {
  width: 30px;
  height: 30px;
}

.comment .bnt3 {
  padding: 10px 20px;
  margin: 0;
  border-radius: 8px;
  background: #0eb6ed;
  line-height: 1;
  margin: 0 10px 0 10px;
  flex-shrink: 0;
  flex-grow: 0;
  color: #fff;
}

.comment .bnt3::after {
  border: 0;
}

.comment .bnted3 {
  background: #f8f8f8;
  color: #353535;
}
</style>

