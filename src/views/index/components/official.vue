<template>
    <div>
        <div class="official">
            <div class="official-right">
                快报 <img src="../../../../static/img/laba.png" alt="">
            </div>
            <div class="official-swiper">
                <van-swipe :autoplay="3000" :show-indicators="false">
                    <van-swipe-item v-for="(items,index) in offical" :key="index">
                        <div class="official-swiper-title" @click="officalink(items)">
                            {{items.news_title}}
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="official-line">

            </div>
            <div @click="moreLink()">
                <img src="../../../../static/img/devide.png" width="2px" alt="">
                <span class="more">更多</span>
            </div>
        </div>
        <div class="official-division"></div>
    </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe).use(SwipeItem);
export default {
  props: {
    offical: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    officalink(items) {},
    moreLink() {
      this.$router.push({ name: "officialDetail" });
    }
  }
};
</script>
<style scoped>
.official {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px 0;
}
.official-right {
  font-size: 14px;
  color: #ff5353;
}
/* .official-right img {
  width: 2rem;
  height: 2rem;
} */
.official-swiper {
  height: 4vh;
  /* border: 1px red solid; */
  width: 60%;
}
.official-line img {
  /* height: 1vh; */
  height: 3.5vh;
}
.official-swiper-title {
  height: 4vh;
  line-height: 4vh;
  font-size: 0.9rem;
  /* width: 100px; */
}
.official-division {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
}
.more {
  font-size: 0.9rem;
}
</style>