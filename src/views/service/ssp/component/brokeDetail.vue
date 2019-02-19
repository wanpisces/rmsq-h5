<template>
    <div class="wraper">
      <div>
          <div class="list">
                <div class="list-header">
                    <div class="list-header-left">
                        <div class="list-header-img"><img  :src="items.user_avatar" alt=""></div>
                        <div class="list-header-name">
                            <span>{{items.user_nickname}}</span>
                            <p>{{items.create_time}}</p>
                            </div> 
                    </div>
                    <div :class="[items.case_state==1?'list-header-right':items.case_state==2?'list-header-right':'deal-color']">{{{'1':'待处理','2':'处理中','3':'已完结'}[items.case_state]}}</div>
                </div>
                <div class="list-content">
                    <div class="list-content-text">
                        <span>#{{items.attr_value}}#</span>
                        <span>{{items.case_content}}</span>
                    </div>
                    <div class="list-content-img">
                        <div class="list-content-img-c" v-for="(img,j)  in items.case_pic" :key="j" @click="imgPreview(items.case_pic,j)" v-lazy="img">
                            <!-- <img :src="img" v-preview='img' alt=""> -->
                            <img :src="img"  alt="">
                        </div>
                    </div>
                </div>
          </div>
          <div class="list-reply">
              <div @click="handleNav(1)" :class="[num==1?'replyColor':'']">
                    <span>官方回复</span>
                    <span>({{items.node_num}})</span>
              </div>
              <div @click="handleNav(2)" :class="[num==2?'replyColor':'']">
                    <span>评论列表</span>
                    <span>({{items.comment_num}})</span>
              </div>
          </div>  
          <div class="list-line"></div>
       </div>   
       <div v-if="num==1" class="official-reply">
            <span>暂无回复</span>
       </div>
       <div v-if="num==2">
            <comment-list :branchId="branchId" :life='life' :news-data="commentData"></comment-list>
             <div class="bottom-text">我是有底线啦~~</div>
       </div>
      
    </div>
</template>
<script>
// vant 组件
import Vue from "vue";
import { ImagePreview, Lazyload } from "vant";
Vue.use(ImagePreview).use(Lazyload);
// 自定义组件
import commentList from "../../../../components/common/commentList.vue";

// service  数据接口
import {
  RequestGovBrokeCaseDetail,
  RequestGovBrokeComment
} from "../../../../fetch/modules/service";
export default {
  components: { commentList },
  data() {
    return {
      items: {},
      num: 1,
      branchId:this.$route.query.case_id,
      life:1,
      commentData: {}
    };
  },
  created() {
    this.num = this.$route.query.num;
    this.getData();
  },
  mounted() {},
  methods: {
    // 评论详情
    getData() {
      RequestGovBrokeCaseDetail({ case_id: this.$route.query.case_id }).then(
        res => {
          if (res.code === 2000) {
            this.items = res.data;
          }
        }
      );
    },
    // 图片预览
    imgPreview(arr, index) {
      ImagePreview(arr, index);
    },

    handleNav(num) {
      this.num = num;
    }
  }
};
</script>
<style scoped lang="less">
.wraper {
  @color1: #ff7030;
  @baseColor: #2dbaf0;
  margin-bottom: 65px;
  font-size: 14px;
  .list {
    margin: 0 10px;
  }
  .deal-color {
    color: #a9a9a9;
  }
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    // border: 1px red solid;
  }
  .list-header-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .list-header-img {
    width: 45px;
    height: 45px;
    border-radius: 45px;
    border: 1px rgb(238, 236, 236) solid;
    background: @baseColor;
    overflow: hidden;
  }
  .list-header-img img {
    width: 45px;
    height: 45px;
  }
  .list-header-name {
    margin-left: 8px;
  }
  .list-header-name span {
    color: #353535;
  }
  .list-header-name p {
    margin-top: 5px;
    font-size: 12px;
    color: #a9a9a9;
  }
  .list-header-right {
    color: @color1;
  }
  .list-content {
    margin: 10px 0;
  }
  .list-content-text {
    line-height: 20px;
    margin-bottom: 10px;
  }
  .list-content-text span:nth-child(1) {
    color: @color1;
  }
  .list-content-img {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .list-content-img-c {
    width: 32%;
    height: 100px;
    overflow: hidden;
    margin-bottom: 5px;
    background: @baseColor;
  }
  .list-content-img-c img {
    width: 100%;
    height: auto;
     min-height:100px;
  }
  .list-content-img-c:nth-child(3n-1) {
    border-right: 2px solid #fff;
    border-left: 2px solid #fff;
  }
  .list-line {
    height: 10px;
    background: #f0f0f0;
  }
  .list-reply {
    display: flex;
    align-items: center;
    border-top: 1px #f2f2f2 solid;
    height: 45px;
    color: #666666;
  }
  .list-reply div {
    text-align: center;
    line-height: 45px;
    height: 45px;
    width: 50%;
  }
  .list-reply div:nth-child(1) {
    border-right: 1px #f2f2f2 solid;
  }
  .bottom-text {
    margin: 15px auto;
    font-size: 14px;
    color: #2b79b5;
    text-align: center;
  }
  .replyColor {
    color: @color1;
  }
  .official-reply {
    text-align: center;
    margin: 10px;
    color: #a9a9a9;
  }
}
</style>
