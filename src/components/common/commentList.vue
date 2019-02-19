<template>
  <!--page/widget/commentList/commentList.wxml-->
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
                    <button :disabled='staring' class='commentZan' @click="sendStar(item.comment_id)" >
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
              <div class='huifuItem' >
                  <div class="itemChild" v-for='(childItem,index) in item.child.list' :key='index'>
                      <span style="color:#2b79b5;">{{childItem.user_name}}</span> : {{childItem.comment_content}}
                  </div>
                <router-link class="rest-more" v-if="item.child.left_num>0" :to="{path:'commmentDetail', query:Object.assign(item,{news_id:branchId,life:life})}" @click="checkMore(item.comment_id)">
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
      <div class="comment"  v-if="level ==1">
          <input name="input" @focus="isFocus=true;" @blur="isFocus=false" class="commentInput" placeholder="期待你的神评论"
          v-model='inputValue'>
          <!-- <button id='share' :hidden='isFocus' class='bnt' @click="sendShare">
          <img mode='aspectFill' src='../../../static/img/share.png' class='share'>
          </button> -->
          <button id='collect' @click="keepFavorites" :hidden='isFocus' class='bnt2' hover-class='bnted2' v-if="life!=1">
            <img mode='aspectFill' :src="is_collect == 2?'../../../static/img/collected.png':'../../../static/img/collect.png'" class='collect'>
          </button>
          <button v-if="isFocus" id='submit' :hidden='!isFocus' class='bnt3' @click="sendComment({level:1})">
            发送
          </button> 
      </div>
      <div class="comment" v-if="level ==2">
          <input name="input" @focus="isFocus=true" @blur="isFocus=false;level=1" class="commentInput" placeholder="期待你的神回复"
          v-model='inputValue'>
          <button id='submit'  class='bnt3' @click="sendComment({level:2})">
            发送
          </button> 
      </div>
    </div>
</div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import {
  RequestCommentDetail,
  RequestSendComment,
  RequestFavorites,
  RequestPraise,
  RequestShare
} from "../../fetch/modules/index.js";
import {
  RequestGovBrokeComment,
  RequestGovBrokeCommentState,
  RequestGovBrokeStar
} from "../../fetch/modules/service";
import { setToken, getToken } from "../../fetch/auth.js";
import { UserLogin } from "../../fetch/modules/login";
import { baseUrl } from "../../fetch/config";
export default {
  props: {
    branchId: {
      type: String,
      default: ""
    },
    isCollect: {
      type: Number,
      default: 1
    },
    newsData: {
      type: Object,
      default: {}
    },
    life: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.is_collect = this.isCollect;
    var query = this.$route.query;
    if (query.token) {
      setToken(query.token);
    }
    this.getCommentData();
  },
  mounted() {
    this.is_collect = this.isCollect;
  },
  watch: {
    isCollect() {
      this.is_collect = this.isCollect;
    }
  },
  data() {
    return {
      inputValue: "",
      commentObj: {
        comment_type: 1,
        current_page: 1
      },
      commentList: [],
      favoritesing: false,
      isFocus: false,
      userName: "",
      isAuthorzeUserInfo: true,
      staring: false,
      level: 1,
      top_id: "",
      comment_user_id: "",
      is_collect: ""
    };
  },
  methods: {
    getCommentData() {
      this.commentObj.branch_id = this.branchId;
      this.branch_id = this.branchId;
      var arg = this.commentObj;
      if (this.life == 1) {
        RequestGovBrokeComment({
          comment_type: 1,
          branch_id: this.branchId
        }).then(res => {
          if (res.code == 2000) {
            this.commentList = res.data.list;
          }
        });
      } else {
        RequestCommentDetail(arg).then(res => {
          this.commentList = res.data.list;
        });
      }
    },
    getUser() {
      UserLogin({
        redirect_uri: this.life===1? baseUrl+"/brokeDetail?case_id=" + this.branch_id+'&num='+2 : baseUrl+"/newsDetail?news_id=" + this.branch_id,
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
      this.level = data.level;
      this.top_id = data.top_id;
      this.comment_user_id = data.comment_user_id;
    },
    //评论点赞
    sendStar(data) {
      if (getToken()) {
        var obj = {
          star_type: 2,
          branch_id: data,
          redirect_uri: this.life===1? baseUrl+"/brokeDetail?case_id=" + this.branch_id+'&num='+2 : baseUrl+"/newsDetail?news_id=" + this.branch_id,
        };
        if (this.life === 1) {
          RequestGovBrokeStar(obj).then(res => {
            if (res.code == 2000) {
              this.getCommentData();
            }
          });
        } else {
          RequestPraise(obj).then(res => {
            if (res.code == 2000) {
              this.getCommentData();
            }
          });
        }
      } else {
        this.getUser();
      }
    },
    //分享'news_id': item.news_id
    // sendShare() {
    //   var _this = this;
    //   var newsData = this.newsData;
    //   RequestShare({}).then(res => {
    //     var startIndex = res.indexOf("{");
    //     var endIndex = res.indexOf("}") + 1;
    //     var data = JSON.parse(res.substring(startIndex, endIndex));
    //     wx.config({
    //       debug: false,
    //       appId: data.appId,
    //       timestamp: data.timestamp,
    //       nonceStr: data.nonceStr,
    //       signature: data.signature,
    //       jsApiList: [
    //         "onMenuShareTimeline",
    //         "onMenuShareAppMessage",
    //         "onMenuShareQQ",
    //         "onMenuShareWeibo",
    //         "onMenuShareQZone",
    //         "showOptionMenu",
    //         "hideAllNonBaseMenuItem",
    //         "showAllNonBaseMenuItem"
    //       ]
    //     });
    //     wx.ready(function() {
    //       const share = {
    //         title: newsData.news_title,
    //         desc: newsData.news_title,
    //         imgUrl: newsData.linkImg,
    //         link: "newsDetail?news_id=" + _this.branch_id,
    //         success: function() {
    //           hideMaskLayer(); // 分享成功，隐藏引导用户分享的浮层
    //         },
    //         cancel: function() {}
    //       };
    //       wx.onMenuShareAppMessage(share); // 微信好友
    //       wx.onMenuShareTimeline(share); // 朋友圈
    //       wx.onMenuShareQQ(share); // QQ
    //       wx.onMenuShareQZone(share); // QQ空间
    //       wx.onMenuShareWeibo(share); // 腾讯微博
    //     });
    //   });
    // },
    //发送评论
    sendComment(data) {
      if (getToken()) {
        var obj = {
          comment_type: 1,
          comment_content: this.inputValue,
          branch_id: this.branch_id,
          redirect_uri: this.life===1? baseUrl+"/brokeDetail?case_id=" + this.branch_id+'&num='+2 : baseUrl+"/newsDetail?news_id=" + this.branch_id,
          level: data.level,
          top_id: this.top_id,
          comment_user_id: this.comment_user_id
        };
        if (!obj.comment_content) {
          Toast("请输入评论内容！");
          return false;
        }
        if (this.life === 1) {
          RequestGovBrokeCommentState(obj).then(res => {
            if (res.code == 2000) {
              this.getCommentData();
              this.level = 1;
              Toast("评论成功");
              this.inputValue = "";
            }
          });
        } else {
          RequestSendComment(obj).then(res => {
            if (res.code == 2000) {
              this.getCommentData();
              this.level = 1;
              Toast("评论成功");
              this.inputValue = "";
            }
          });
        }
      } else {
        this.getUser();
      }
    },
    //收藏 RequestFavorites
    keepFavorites() {
      if (getToken()) {
        var obj = {
          favorites_type: 1,
          branch_id: this.branchId,
          redirect_uri: this.life===1? baseUrl+"/brokeDetail?case_id=" + this.branch_id+'&num='+2 : baseUrl+"/newsDetail?news_id=" + this.branch_id,
        };
        RequestFavorites(obj).then(res => {
          if (res.code == 2000) {
            this.is_collect == 1
              ? (this.is_collect = 2)
              : (this.is_collect = 1);
          }
        });
      } else {
        this.getUser();
      }
    }
  }
};
</script>
<style scoped>
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
