<template>
  <div>
      <van-tree-select
    :items="items"
    :main-active-index="mainActiveIndex"
    @navclick="onNavClick"
    @itemclick="onItemClick"
    />
  </div>
</template>
<script>
import Vue from "vue";
import { TreeSelect } from "vant";
Vue.use(TreeSelect);
import { RequestGuideAttr } from "../../../fetch/modules/service.js";
const items = [
  {
    text: "所有城市",
    children: [
      {
        text: "温州",
        id: 1002
      },
      {
        text: "杭州",
        id: 1001
      }
    ]
  }
];
export default {
  data() {
    return {
      items: [],
      // 左侧高亮元素的index
      mainActiveIndex: 0,
    };
  },
  created() {
    var classfiyData = JSON.parse(this.$route.query.classfiyData).child;
    var item = [];
    for (var i = 0; i < classfiyData.length; i++) {
      var obj1 = {};
      obj1.text = classfiyData[i].attr_value;
      obj1.id = classfiyData[i].attr_id;
      obj1.children = [];
      var child = classfiyData[i].child;
      for (var j = 0; j < child.length; j++) {
        var obj2 = {};
        obj2.text = child[j].attr_value;
        obj2.id = child[j].attr_id;
        obj1.children.push(obj2);
      }
      item.push(obj1);
    }
    this.items = item;
  },
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
        this.$store.dispatch('classfiyData',data);
        this.$router.push({name:'guideline'})
    }
  },
  computed: {
  }
};
</script>
<style scoped>
    
</style>