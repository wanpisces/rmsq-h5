<template>
  <!--page/widget/commentList/commentList.wxml-->
  <div style="overflow-x:hidden;">
    <div class="main-wrapper">
      <div class='commentList'>
        <div class='item'>
            <div class='topdiv'>
              <div class='layer'>
                  <img mode='aspectFill' class='userImg' :src='query.user_avatar'>
                  <div class='nameAndTime'>
                    <span class='name'>{{query.user_name}}</span>
                    <span class='time'>{{query.create_time}}</span>
                  </div>
                  <div>
                    <button :disabled='staring' class='commentZan' @click="sendStar(query.comment_id)" >
                        <img mode='aspectFill' :src="query.is_star==2?'../../../static/img/xq_access_zan_touch.png':'../../../static/img/xq_access_zan.png'">
                        <span class='num'>{{query.star_num}}</span>
                    </button>
                    </div>
                    <div report-submit='true' bindsubmit='huifu'>
                      <button class='more' hover-class='hoverClass2' form-type='submit' @click="huifu({level:2,top_id:query.comment_id,comment_user_id:query.user_id})">
                          <!-- <img mode='aspectFill' src='/pic/xq_access_more.png'> -->
                          <span class='huifu'>回复</span>
                      </button>
                    </div>
              </div>
            </div>
            <div class='bottomdiv'>{{query.comment_content}}</div>
            <div v-if="commentList.length>0" class='huifudiv'>
              <div class='huifuItem'>
                  <!-- <div >
                      <span style="color:#2b79b5;">{{childItem.user_name}}</span>
                      <span style="color:#2b79b5;">{{childItem.comment_user_name}}</span>: {{childItem.comment_content}}
                  </div> -->
                  <div class="itemChild" v-for='(childItem,index) in commentList' :key='index'>
                      <span style="color:#2b79b5;">{{childItem.user_name}}</span> : {{childItem.comment_content}}
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div report-submit='true'>
      <div class="comment" v-if="isFocus">
          <input name="input"  @blur="isFocus=false" class="commentInput" placeholder="期待你的神回复"
          v-model='inputValue'>
          <button id='submit'  class='bnt3' @click="sendComment()">
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
  RequestMoreComment,
  RequestSendComment,
  RequestPraise
} from "../../fetch/modules/index.js";
import {
  RequestGovBrokeCommentDetail,
  RequestGovBrokeCommentState,
  RequestGovBrokeStar
} from "../../fetch/modules/service";
import { setToken } from "../../fetch/auth.js";
export default {
  data() {
    return {
      inputValue: "",
      commentObj: {
        current_page: 1,
        page_size: "",
        comment_id: ""
      },
      commentList: [],
      favoritesing: false,
      isFocus: false,
      userName: "",
      isAuthorzeUserInfo: true,
      staring: false,
      level: 2,
      top_id: "",
      comment_user_id: "",
      query: {}
    };
  },
  created() {
    var query = this.$route.query;
    this.query = query;
    if (query.token) {
      setToken(query.token);
    }
    this.commentObj.comment_id = this.query.comment_id;
    this.getCommentData();
  },
  methods: {
    getCommentData() {
      var arg = this.commentObj;
      if (this.$route.query.life === 1) {
        RequestGovBrokeCommentDetail(arg).then(res => {
          this.commentList = res.data.list;
        });
      } else {
        RequestMoreComment(arg).then(res => {
          this.commentList = res.data.list;
        });
      }
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
      var obj = {
        star_type: 2,
        branch_id: data
      };
      if (this.$route.query.life === 1) {
        RequestGovBrokeStar(obj).then(res => {
          if (res.code == 2000) {
            this.query.is_star == 2
              ? (this.query.is_star = 1)
              : (this.query.is_star = 2);
            this.getCommentData();
          }
        });
      } else {
        RequestPraise(obj).then(res => {
          if (res.code == 2000) {
            this.query.is_star == 2
              ? (this.query.is_star = 1)
              : (this.query.is_star = 2);
            this.getCommentData();
          }
        });
      }
    },
    //发送评论
    sendComment() {
      var obj = {
        comment_type: 1,
        comment_content: this.inputValue,
        branch_id: this.query.news_id,
        redirect_uri: this.life===1? baseUrl+"/brokeDetail?case_id=" + this.branch_id+'&num='+2 : baseUrl+"/newsDetail?news_id=" + this.branch_id,
        level: 2,
        top_id: this.query.comment_id,
        comment_user_id: this.query.user_id
      };
      if (!obj.comment_content) {
        Toast("请输入评论内容！");
        return false;
      }
      if (this.$route.query.life == 1) {
        RequestGovBrokeCommentState(obj).then(res => {
          if (res.code == 2000) {
            this.getCommentData();
            Toast("评论成功");
            this.inputValue = "";
          }
        });
      } else {
        RequestSendComment(obj).then(res => {
          if (res.code == 2000) {
            this.getCommentData();
            Toast("评论成功");
            this.inputValue = "";
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.main-wrapper {
  padding-bottom: 60px;
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
  align-items: center;
  position: relative;
}
.huifudiv .huifuItem {
  margin-top: 5px;
  padding: 8px 5px;
  width: 75%;
  background: rgb(241, 241, 240);
}
.huifudiv {
  width: 100%;
  padding-left: 110px;
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
  width: 100%;
  padding: 6px 0 0 110px;
  text-align: left;
  font-size: 15px;
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
