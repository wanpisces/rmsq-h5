<template>
  <div class="" style="position:relative">
    <!-- 定位 搜索与地址 -->
    <div class="search" @click="searchLink()">
      <div>
        <van-icon name="search" />
        <span style="margin-left:10px"> 搜资讯</span>
      </div>
    </div>
    <div class="swiper">
      <van-swipe @change="onChange" :show-indicators="false" :autoplay="5000">
        <van-swipe-item v-for="(items,index) in banner" :key="index">
          <div class="swiper-item" @click="bannerLink(items)">
            <img :src="items.banner_pic" alt="">
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="swipe-title">
        <div class="swipe-between">
          <span>{{bannerTitle}}</span>
          <span class="swipe-between-num">
            <span class="banner-index">{{banneIndex}}</span>/{{banner.length}}</span>
        </div>
      </div>
    </div>
    <div class="arc-line">
      <img src="./../../../../static/img/arc-line.png" width="100%" alt="">
    </div>
    <div class="address" v-if="searchShow">
      <img src="./../../../../static/img/addr_black.png" alt="">
      <span @click="addressLink">{{address_name}}</span>
      <img src="./../../../../static/img/juxing.png" alt="">
    </div>
    <div class="address" v-if="!searchShow">
      <span>{{name}}</span>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload, Toast, Icon } from "vant";
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload, Toast)
  .use(Icon);
import { Button } from "vant";
export default {
  name: "swiper",
  props: {
    // bannerTitle:{
    //   type:String,
    //   default:''
    // },
    banner: {
      type: Array,
      default: function() {
        return [];
      }
    },
    searchShow: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      banneIndex: 1,
      bannerTitle: "",
      address_name: localStorage.getItem("address_name") || "请选择",
      includedComponents: "swiper",
      isLock: 0
    };
  },
  activated() {
    this.address_name = localStorage.getItem("address_name") || "请选择";
  },
  watch: {
    bannerTitle() {
      if (this.banner.length != 0 && this.banneIndex == 1) {
        if (this.banner[0].banner_title.length > 10) {
          this.bannerTitle = this.banner[0].banner_title.substring(0, 17) + "...";
        } else {
          this.bannerTitle = this.banner[0].banner_title;
        }
      }
    }
  },
  created() {},
  mounted() {
    if (this.banner.length != 0) {
      if (this.banner[0].banner_title.length > 10) {
        this.bannerTitle = this.banner[0].banner_title.substring(0, 17) + "...";
      } else {
        this.bannerTitle = this.banner[0].banner_title;
      }
    }
  },
  methods: {
    onChange(index) {
      let self = this;
      this.banneIndex = index + 1;
      // Toast("当前 Swipe index：" + index);
      this.banner.map(function(item, i) {
        if (self.banneIndex == i + 1) {
          // console.log(self.strlen('item.banner_title'))
          // if (item.banner_title.length > 17) {
          //   self.bannerTitle = item.banner_title.substring(0, 10) + "...";
          // } else {
          self.bannerTitle = item.banner_title;
          // }
        }
      });
    },
    searchLink() {
      this.$router.push({ name: "search" });
    },
    // addressLink
    addressLink() {
      if (this.searchShow == false) {
      } else {
        this.$router.push({ name: "address" });
      }
    },
    bannerLink(item) {
      if (item.banner_run_type == 1) {
        // this.$router.push({
        //   name: "newsDetail",
        //   query: { news_id: item.banner_id }
        // });
        window.location.href = item.banner_web_url;
      } else if (item.banner_run_type == 2) {
        window.location.href = item.nav_web_url;
      }
    }
  }
};
</script>
<style scoped>
.swiper {
  position: relative;
}
.swiper-item {
  width: 100%;
  height: 32vh;
  overflow: hidden;
  background: #66c6f2;
  text-align: center;
}
.swiper-item img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}
.swipe-title {
  width: 100%;
  height: 6vh;
  background: rgba(0, 0, 0, 0.3);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6));
  position: absolute;
  top: 26vh;
  left: 0px;
}
.swipe-between {
  display: flex;
  /* height: 6vh; */
  /* width: 30px; */
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  color: #fff;
  /* border: 1px red solid; */
}
.swipe-between-num {
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 22px;
  text-align: center;
  font-size: 12px;
  display: inline-block;
  /* border: 1px red solid;
   */
  background: rgba(0, 0, 0, 0.2);
}
.banner-index {
  color: #66c6f2;
}
.search {
  background: #17b1ed;
  height: 50px;
  line-height: 50px;
  font-size: 0;
}
.search > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  width: 90%;
  margin: 0px auto;
  background: #02a1df;
  /* margin: 10px 10px; */
  color: #fff;
  border-radius: 20px;
  font-size: 14px;
  position: relative;
  top: 6px;
}
.address {
  /* border: 1px red solid; */
  padding: 3px 5px;
  border-radius: 30px;
  font-size: 12px;
  color: #000;
  /* border: 1px red solid; */
  /* background: rgba(0, 0, 0, 0.3); */
  display: flex;
  /* height: 3.5vh; */
  /* width: 80px; */
  align-items: center;
  justify-content: center;
  /* -webkit-transform: scale(1, 0.5); */
}
.address img:nth-child(1) {
  margin-right: 8px;
}
.address img:nth-child(3) {
  margin-left: 5px;
}
.arc-line {
  position: relative;
  margin-top: -16px;
}
</style>