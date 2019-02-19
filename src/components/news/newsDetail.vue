<template>
  <div>
    <div class='title'>
      <div class='title_txt'>{{newsData.news_title}}</div>
      <div class='state'>
        <img class='img1' src='../../../static/img/accessment.png'>
        <span class='tv1'>{{newsData.comment_num}}</span>
        <img class='img2' src='../../../static/img/xq_read.png'>
        <span class='tv1'>{{newsData.visit_num}}</span>
        <img class='img3' src='../../../static/img/xq_zan.png'>
        <span class='tv1'>{{newsData.star_num}}</span>
        <div class='tv3'>{{newsData.create_time}}</div>
      </div>
    </div>
    <!-- 图文资讯 -->
    <div v-if="news_type == 1" class='detail-container' id="detail-container" v-html="newsData.news_content"></div>
    <!-- 图片资讯 -->
    <div class="img-box" v-if="news_type == 2">
      <div v-if="newsData.news_content.length > 1" @click="showImg(index)" class="img-bg-box img-item" v-lazy:background-image="item.url" :style="{width: widthStyle,height:heightStyle,padding:'3px',boxSizing:'border-box'}" v-for="(item,index) in newsData.news_content" :key="index">
      </div>
      <div @click="showImg(index)" v-if="newsData.news_content.length == 1">
        <img :src="newsData.news_content[0].url" alt="" style="width: 100%;height:auto}">
      </div>

      <!-- <div @click="showImg(index)" :style="{width: widthStyle,padding:'3px',boxSizing:'border-box'}" v-for="(item,index) in newsData.news_content" :key="index">
        <img   :src="item.url" alt="" style="width: 100%;height:auto}">
      </div> -->
    </div>
    <!-- 视频资讯 -->
    <div v-if="news_type == 3">
      <div style="padding: 10px 5px;" v-for="(item,index) in newsData.news_content" :key="index">
        <video style="width: 100%; height: 100%; object-fit: fill" :poster="'https://img.sqydt.darongshutech.com/'+item.post" class="videoEle" controls :src="item.url">
        </video>
      </div>
    </div>
    <p style="padding: 0 10px;color:#999;">{{newsData.news_intro}}</p>
    <div class='explain'>
      <div class='label'>
        <div v-for="(item,index) in newsData.tags" class='item' :key='index'>
          {{item}}
        </div>
      </div>
      <div class='buts'>
        <div submit='true'>
          <div class='praise'>
            <button :style="newsData.is_star == 2?'border: 1px solid #FE646F;':'border: 1px solid #DADADA;'" hover-class='none' @click="praise">
              <img mode='widthFix' :src="newsData.is_star == 2?'../../../static/img/zan_touch.png':'../../../static/img/zan.png'">
            </button>
            <span :style="newsData.is_star == 2?'color:#FE646F;':'color:#515151;'">{{newsData.is_star == 2?'已点赞':'点个赞'}}</span>
          </div>
        </div>
        <!-- <form submit='true' bindsubmit='gohome'> -->
        <div class='home'>
          <button :disabled="newsData.staring" :style="isHome == 0 ? 'border: 1px solid #DADADA;' : 'border: 1px solid #2EA3FC;'" hover-class='none' @click="toHome">
            <img mode='widthFix' :src="isHome == 0?'../../../static/img/index.png':'../../../static/img/back_index.png'">
          </button>
          <span :style="isHome == 0 ? 'color:#515151;' : 'color:#2EA3FC;'">回首页</span>
        </div>
        <!-- </form> -->
      </div>
    </div>
    <!-- 小程序 -->
    <div v-if="miniArr.length" class="mini-box">
      <h5>
        <strong>推广</strong>
      </h5>
      <div style="width: 100%;padding:8px 3px;box-sizing:border-box;" v-for="(item,index) in miniArr" :key="index">
        <img @click="toMini(item.path)" :src="item.imageurl" alt="" style="width: 100%;height:auto}">
      </div>
    </div>
    <commentList :branchId="news_id" :isCollect="newsData.is_collect" :newsData="newsData"></commentList>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload, ImagePreview } from "vant";

// options 为可选参数，无则不传
Vue.use(Lazyload);

var isArray =
  Function.isArray ||
  function(o) {
    return typeof o === "object" && Object.prototype.toString.call(o) === "[object Array]";
  };

import { RequestNewDetail, RequestPraise } from "../../fetch/modules/index.js";
import commentList from "../../components/common/commentList.vue";
export default {
  components: { commentList },
  data() {
    return {
      news_id: "",
      news_type: 1, // 资讯类型 1图文资讯 2图片资讯 3视频资讯
      newsData: {},
      widthStyle: "100%",
      heightStyle: "200px",
      imgArr: [],
      miniArr: [],
      isHome: 0 //1为首页，0为非首页
    };
  },
  created() {
    var news_id = this.$route.query.news_id;
    this.news_id = news_id;
    this.getNewsDetail();
  },
  mounted() {
    var linkImg = document.getElementById("detail-container").getElementsByTagName("img")[0];
    this.newsData.linkImg = linkImg;
  },
  methods: {
    //获取资讯详情
    getNewsDetail() {
      var news_id = this.news_id;
      RequestNewDetail({ news_id: news_id }).then(res => {
        if (typeof res.data != "object") {
          this.newsData.tags = JSON.parse(res.data);
          return;
        }
        console.log("资讯详情", res.data);
        this.newsData = res.data;
        this.news_type = res.data.news_type || 1;
        if (this.news_type == 2) {
          res.data.news_content.forEach(element => {
            this.imgArr.push(element.url);
          });
          // console.log("imgArr", this.imgArr);
          const _len = res.data.news_content.length;
          switch (true) {
            case _len === 1: {
              this.widthStyle = "100%";
              break;
            }
            case _len === 2: {
              this.widthStyle = "50%";
              break;
            }
            case _len === 4: {
              this.widthStyle = "50%";
              this.heightStyle = "200px";
              break;
            }
            default: {
              this.widthStyle = "33.3%";
              this.heightStyle = "140px";
            }
            // case _len >= 3 && _len <= 9: {
            //   this.widthStyle = "33.3%";
            //   break;
            // }
            // case _len > 9: {
            //   this.widthStyle = "25%";
            //   break;
            // }
          }
        }

        let _link_third_miniprogram = res.data.link_third_miniprogram;
        // 小程序跳转
        console.log("isArray(_link_third_miniprogram)", isArray(_link_third_miniprogram));
        if (isArray(_link_third_miniprogram)) {
          this.miniArr = [];
          _link_third_miniprogram.forEach(item => {
            this.miniArr.push(item);
          });
          console.log("this.miniArr", this.miniArr);
        }
      });
    },
    toMini(_path) {
      console.log("_path", _path);
      wx.miniProgram.navigateTo({
        url: "/" + _path
      });
    },
    toHome() {
      console.log("环境", window.__wxjs_environment);
      // 小程序环境

      if (window.__wxjs_environment === "miniprogram") {
        wx.miniProgram.switchTab({
          url: "/page/tabBar/index/index"
        });
      } else {
        console.log("-------h5");
        this.$router.push({
          path: "/index"
        });
      }
    },
    showImg(_index) {
      ImagePreview({
        images: this.imgArr,
        startPosition: _index,
        onClose() {
          // do something
        }
      });
    },
    //资讯点赞
    praise() {
      RequestPraise({ star_type: 1, branch_id: this.news_id }).then(res => {
        if (res.code == 2000) {
          this.getNewsDetail();
        }
      });
    }
  }
};
</script>
<style scoped>
video::-internal-media-controls-download-button {
  display: none;
}

video::-webkit-media-controls-enclosure {
  overflow: hidden;
}

video::-webkit-media-controls-panel {
  width: calc(100% + 12%);
}

.title {
  display: flex;
  flex-flow: column;
  padding: 15px;
}

.title .title_txt {
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 600;
  color: #353535;
}

.title .state {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: 28px;
}

.title .state .img1 {
  width: 18px;
  height: 16px;
}

.title .state .img2 {
  width: 18px;
  height: 18px;
  margin-left: 20px;
}
.title .state .img3 {
  width: 18px;
  height: 18px;
  margin-left: 20px;
}

.title .state .tv1 {
  font-size: 14px;
  color: #999999;
  margin-left: 8px;
}

.title .state .tv3 {
  font-size: 14px;
  color: #999999;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: right;
}

.explain {
  display: flex;
  flex-flow: column;
  padding-bottom: 10px;
}

.explain .label {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 0px 10px;
}

.explain .label .item {
  color: #666;
  font-size: 14px;
  padding: 4px 10px;
  background: #eee;
  border-radius: 5px;
  margin: 6px;
}

.explain .buts {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin-top: 20px;
}

.explain .buts .praise {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.explain .buts .praise button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

.explain .buts .praise button::after {
  border: 0;
}

.explain .buts .praise button img {
  width: 25px;
}

.explain .buts .praise span {
  margin-top: 10px;
  font-size: 12px;
  color: #515151;
}

.explain .buts .home {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-left: 22px;
}

.explain .buts .home button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

.explain .buts .home button::after {
  border: 0;
}

.explain .buts .home button img {
  width: 25px;
}

.explain .buts .home span {
  margin-top: 10px;
  font-size: 12px;
}

.loadMore {
  padding-bottom: 106px;
}

.detail-container {
  padding: 5px 15px 10px 15px;
}

.detail-container >>> img {
  width: 100% !important;
}

.detail-container >>> p {
  line-height: 20px !important;
  font-size: 14px !important;
}

.detail-container >>> .wxParse-p div {
  font-size: 14px !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
.detail-container >>> h1 {
  font-size: 18px !important;
  margin: 5px 0 !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
.detail-container >>> .article-sub {
  margin-bottom: 10px !important;
}

.img-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 5px;
}

.mini-box {
  padding: 0 10px;
}
.mini-box > h5 {
  position: relative;
  margin: 25px 0 15px;
  text-align: center;
  border-bottom: 1px dashed #cccccc;
}

.mini-box > h5 strong {
  display: inline-block;
  padding: 0 5px;
  background-color: #fff;
  position: absolute;
  left: calc(50% - 18px);
  bottom: -8px;
  color: #999;
  font-weight: 400;
}
.img-bg-box {
  width: 30%;
  height: 130px;
  background-size: cover;
  background-clip: content-box;
  background-position: 50% 50%;
  background-color: #f6f8f9;
  overflow: hidden;
}
</style>




