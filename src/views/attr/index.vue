<template>
  <div class="page-container attr-page">
    <van-tabs @change="changeTabs" v-model="active" sticky swipeable>
      <van-tab v-for="(item,index) in attrData" :title="item.attr_value" :key="index">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="tab-contant">
            <newList :newsData='newsData' icon="1"></newList>
            <div v-if="count>0" class="bootom-text">没有跟多了~~</div>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, Toast, PullRefresh } from "vant";
import newList from "@/components/common/newsView.vue";
import { RequestPublicAttr, RequestNewsList } from "@/fetch/modules/public";
Vue.use(Tab)
  .use(Tabs)
  .use(PullRefresh)
  .use(Toast);
export default {
  components: {
    newList
  },
  data() {
    let self = this;
    return {
      category_id: this.$route.query.category_id, // 栏目ID
      attr_id: "", // 分类ID
      attrData: [], // 分类数据
      newsData: [], // 资讯数据
      active: 0,
      count: 0,
      isLoading: false,
      page_size: 10,
      current_page: 1
    };
  },
  mounted() {
    this.getAttr();
  },
  methods: {
    onRefresh() {
      this.getNewsList(true);
    },
    // 获取分类
    getAttr() {
      RequestPublicAttr({
        category_id: this.category_id
      }).then(res => {
        console.log("获取分类", res);
        this.attrData = res.data;
        this.attr_id = this.attrData[0].attr_id;
        this.getNewsList();
      });
    },
    // 获取资讯列表
    getNewsList(isFresh) {
      RequestNewsList({
        category_id: this.category_id,
        attr_id: this.attr_id,
        page_size: this.page_size,
        current_page: this.current_page
      }).then(res => {
        // console.log("获取资讯列表", res);
        this.newsData = res.list;
        this.count = res.total_num;

        if (isFresh) {
          this.$toast("刷新成功");
          this.isLoading = false;
        }
      });
    },
    changeTabs(_index, _title) {
      // console.log("changeTabs", this.attrData[_index]);
      this.attr_id = this.attrData[_index].attr_id;
      this.current_page = 1;
      this.getNewsList();
    }
  }
};
</script>

<style>
.page-container {
  /* padding: 10px 0; */
}
.tab-contant {
  box-sizing: border-box;
  padding: 8px 15px 15px;
  min-height: calc(100vh - 44px);
  /* background-color: beige; */
}
.bootom-text {
  margin: 10px auto;
  font-size: 14px;
  color: #e3e3e3;
  text-align: center;
}
</style>