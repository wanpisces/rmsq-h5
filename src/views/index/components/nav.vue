<template>
    <keep-alive>
        <div>
            <div class="swiper">
                <van-swipe>
                    <van-swipe-item v-if="nav.length!=0">
                        <div>
                            <div class="nav-item">
                                <div v-for="(items,index) in nav" :key="index" @click="linkTo(items)" v-if="index<4">
                                    <div class="swiper-item">
                                        <img :src="items.nav_pic" alt="">
                                    </div>
                                    <div>{{items.nav_title}}</div>
                                </div>
                                <div v-if="nav.length<=3" @click="toService">
                                    <div class="swiper-item">
                                        <img src="../../../../static/img/more-service.png" alt="">
                                    </div>
                                    <div>全部</div>
                                </div>
                            </div>
                            <div class="nav-item">
                                <div v-for="(items,index) in nav" :key="index" @click="linkTo(items)" v-if="index>=4&&index<8">
                                    <div class="swiper-item">
                                        <img :src="items.nav_pic" alt="">
                                    </div>
                                    <div>{{items.nav_title}}</div>
                                </div>
                                <div v-if="nav.length>=4 && nav.length<8" @click="toService">
                                    <div class="swiper-item">
                                        <img src="../../../../static/img/more-service.png" alt="">
                                    </div>
                                    <div>全部</div>
                                </div>
                            </div>
                        </div>
                    </van-swipe-item>
                    <van-swipe-item v-if="nav.length>10">
                        <div class="nav-item">
                            <div v-for="(items,index) in nav" v-if="index>=8&&index<=11" :key="index">
                                <div class="swiper-item">
                                    <img :src="items.nav_pic" alt="">
                                </div>
                                <div>{{items.nav_title}}</div>
                            </div>
                            <div v-if="nav.length>=8 && nav.length<11" @click="toService">
                                <div class="swiper-item">
                                    <img src="../../../../static/img/more-service.png" alt="">
                                </div>
                                <div>全部</div>
                            </div>
                        </div>
                        <div class="nav-item">
                            <div v-for="(items,index) in nav" :key="index" v-if="index>14&&index<=19">
                                <div class="swiper-item">
                                    <img :src="items.nav_pic" alt="">
                                </div>
                                <div>{{items.nav_title}}</div>
                            </div>
                            <div v-if="nav.length>14 && nav.length<19" @click="toService">
                                <div class="swiper-item">
                                    <img src="../../../../static/img/more-service.png" alt="">
                                </div>
                                <div>全部</div>
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </keep-alive>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload, Toast } from "vant";
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload, Toast);
import { Button } from "vant";
export default {
  name: "navSide",
  props: {
    nav: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    linkTo(items) {
      if (items.nav_web_run == 2) {
        window.location.href = items.nav_web_url;
      } else {
        Toast("请在小程序端打开");
      }
    },
    toService() {
      this.$router.push("service");
    }
  }
};
</script>
<style scoped>
.nav-item {
  display: flex;
  flex-wrap: nowrap;
  /* justify-content: space-between; */
  /* height:200rpx; */
  align-items: center;
  text-align: center;
  margin: 18px 0px;
  font-size: 12px;
  /* border: 1px red solid; */
}
.nav-item > div {
  width: 25%;
  text-align: center;
  font-size: 12px;
  color: #5a5a5a;
}
.nav-item:nth-child(5n) {
  /* padding:.5rem 0rem; */
  padding-right: 0;
}
.swiper-item {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
}
.swiper-item img {
  width: 40px;
  height: 40px;
}
</style>