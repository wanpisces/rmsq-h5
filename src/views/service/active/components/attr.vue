<template>
    <div>
        <div class="active-wrapper">
            <div @click="handleSearch(1)">{{searchName.attrName}}<img src="../../../../../static/img/sjx_down.png" alt="" width="20px"></div>
            <div @click="handleSearch(2)">{{searchName.needName}}<img src="../../../../../static/img/sjx_down.png" alt="" width="20px"></div>
            <div @click="handleSearch(3)">{{searchName.activityName}}<img src="../../../../../static/img/sjx_down.png" alt="" width="20px"></div>
        </div>
        <!-- 赛选1 -->
        <van-popup v-model="searchShowOne" position="bottom" :overlay="true">
            <van-picker :columns="columns1" :loading="loading" show-toolbar @cancel="onCancel(1)" @confirm="onConfirmOne" />
        </van-popup>
        <!-- 赛选2 -->
        <van-popup v-model="searchShowTwo" position="bottom" :overlay="true">
            <van-picker :columns="columns2" show-toolbar @cancel="onCancel(2)" @confirm="onConfirmTwo" />
        </van-popup>
        <!-- 赛选3 -->
        <van-popup v-model="searchShowThree" position="bottom" :overlay="true">
            <van-picker :columns="columns3" show-toolbar @cancel="onCancel(3)" @confirm="onConfirmThree" />
        </van-popup>

    </div>
</template>

<script>
import Vue from "vue";
//  vant组件
import { Popup, Picker, Toast } from "vant";
Vue.use(Popup)
  .use(Picker)
  .use(Toast);
// service 数据接口（分类列表）
import { RequestActivityAttr } from "../../../../fetch/modules/service";
export default {
  data() {
    return {
      searchName: {
        attrName: "全部分类",
        needName: "全部条件",
        activityName: "全部"
      },
      searchShowOne: false,
      loading: false,
      columns1: ["全部分类"],
      columns1Id: [""],
      searchShowTwo: false,
      columns2: ["全部条件", "需要志愿者", "无需志愿者"],
      searchShowThree: false,
      columns3: ["全部", "进行中", "已结束", "报名中"]
    };
  },
  created() {
    this.getAttr();
  },
  methods: {
    getAttr() {
      RequestActivityAttr({ group_id: localStorage.group_id || 0 }).then(
        res => {
          if (res.data) {
            let arr = res.data;
            for (let i in arr) {
              this.columns1.push(arr[i].attr_value);
              this.columns1Id.push(arr[i].attr_id);
            }
          }
        }
      );
    },
    handleSearch(value) {
      value === 1
        ? (this.searchShowOne = true)
        : value === 2
          ? (this.searchShowTwo = true)
          : value === 3 ? (this.searchShowThree = true) : "";
    },
    onCancel(value) {
      value === 1
        ? (this.searchShowOne = false)
        : value === 2
          ? (this.searchShowTwo = false)
          : value === 3 ? (this.searchShowThree = false) : "";
    },

    onConfirmOne(value, count) {
      let attrId = "";
      this.columns1Id.map((item, index) => {
        if (index == count) {
          attrId = item;
          this.searchName.attrName = value;
        }
      });
      this.searchShowOne = false;
      this.$emit("onConfirmOne", attrId);
    },
    onConfirmTwo(value, count) {
      let state = "";
      count == 1
        ? (state = 1)
        : count == 2 ? (state = 2) :  "";
      this.searchShowTwo = false;
      this.searchName.needName = value;
      this.$emit("onConfirmTwo", state);
    },
    onConfirmThree(value, count) {
      let state = "";
      count == 1
        ? (state = 4)
        : count == 2 ? (state = 5) : count == 3 ? (state = 2) : "";
      this.searchShowThree = false;
      this.searchName.activityName = value;
      this.$emit("onConfirmThree", state);
    }
  }
};
</script>

<style scoped>
.active-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  border-bottom: 1px #f2f2f2 solid;
  background: #fff;
  z-index: 100
}
.active-wrapper > div {
  width: 33%;
  text-align: center;
}
</style>
