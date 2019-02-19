<template>
     <div class="tab-swicth">
        <van-tabs @click="tabNavClick()">
                <van-tab v-for="index in 8" :title="'选项 ' + index" :key="index">
                内容 {{ index }}
                </van-tab>
        </van-tabs> 
        <div class="tab-add">
            <img src="./../../../../static/img/add.png" width="15" alt="">
        </div>
     </div> 
</template>
<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab).use(Tabs);
export default {
  methods: {
    tabNavClick() {
      console.log("切换");
    }
  }
};
</script>
<style scoped>
.tab-swicth {
  width: 100%;  
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.tab-add {
  position: absolute;
  right: 10px;
  top: -4.8vh;
  /* border: 1px red solid; */
  /* width: 10%; */
}
@media screen and (max-width: 320px) {
  .tab-add {
    position: absolute;
    right: 10px;
    top: -6vh;
  }
}
</style>