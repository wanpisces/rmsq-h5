<template>
  <div>
      <div class="category-nav">
         <div>我的栏目 <span class="category-nav-title"><span v-if="show">点击进入栏目</span> <span v-else>点击叉取消栏目</span> </span></div>
         <div><span @click="editorCateory(1)" v-if="show">编辑</span> <span v-else @click="editorCateory(2)">完成</span></div>
      </div>
      <div class="category-name">
          <div v-for="(items,index) in userCategory" :key="index" v-if="userCategory.length!=0">
            <span>{{items.category_name}}</span>
            <div class="category-close" @click="cancelCateory(items)" v-if="!show && items.is_lock!=1"><img src="../../../static/img/cancel_img.png" width="15px" height="15px" alt=""></div>
          </div>
      </div>
      <div class="category-nav">
         <div>推荐栏目 <span class="category-nav-title"><span v-if="show">点击进入栏目</span> <span v-else>点击添加栏目</span></span></div>
      </div>
       <div class="category-name">
          <div v-for="(items,index) in categoryData" :key="index" v-if="categoryData.length!=0" @click="addCateory(items)">
            <span v-if="!show">+</span>
            <span>{{items.category_name}}</span>
           </div>
      </div>
  </div>
</template>
<script>
import {
  RequestCategoryList,
  RequestCategoryEditor
} from "../../fetch/modules/index";
import Vue from "vue";
import { Tab, Tabs, Toast } from "vant";
Vue.use(Tab)
  .use(Tabs)
  .use(Toast);
export default {
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 A 不缓存，即刷新
    next();
  },
  data() {
    return {
      categoryData: [],
      userCategory: [],
      group_id: localStorage.getItem("group_id") || 1,
      show: true
    };
  },
  created() {
    this.getCategoryList({ category_type: 1, group_id: this.group_id });
  },
  methods: {
    getCategoryList(obj) {
      RequestCategoryList(obj).then(res => {
        this.userCategory = res.data.user_category;
        this.categoryData = res.data.category;
      });
    },
    editorCateory(value) {
      if (value == 2) {
        let arrCategory = [];
        for (let i in this.userCategory) {
          arrCategory.push(this.userCategory[i]);
        }
        console.log(arrCategory);
        let args = {
          group_id: this.group_id,
          category_id: arrCategory
        };
        RequestCategoryEditor(args).then(res => {
          value == 1 ? (this.show = false) : (this.show = true);
          if (res.code === 2000) {
            Toast.success("操作成功");
          } else {
            Toast.fail("操作失败");
            this.getCategoryList({ category_type: 1, group_id: this.group_id });
          }
        });
      } else {
        value == 1 ? (this.show = false) : (this.show = true);
      }
      //
    },
    addCateory(items) {
      if (this.show == false) {
        this.userCategory.push(items);
        this.categoryData.map((value, index) => {
          if (value.category_id == items.category_id) {
            this.categoryData.splice(index, 1);
          }
        });
      }
    },
    cancelCateory(items) {
      if (this.show == false) {
        this.categoryData.push(items);
        this.userCategory.map((value, index) => {
          if (value.category_id == items.category_id) {
            this.userCategory.splice(index, 1);
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.category-nav {
  padding: 10px 8px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.category-nav-title {
  font-size: 12px;
  color: #757375;
}
.category-nav :nth-child(2) {
  border: 1px #66c6f2 solid;
  color: #66c6f2;
  border-radius: 6px;
  padding: 1px 5px;
  font-size: 13px;
}

.category-name {
  padding: 10px 0px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.category-name > div {
  position: relative;
  border: 1px #757375 solid;
  color: #757375;
  border-radius: 6px;
  padding: 3px 5px;
  text-align: center;
  font-size: 13px;
  margin: 0 0 8px 10px;
}
.category-close {
  position: absolute;
  right: -8px;
  top: -8px;
}
</style>