<template>
    <div class="center">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <news-view 
            :newsData ='dataList' 
            icon="1"
            v-waterfall-lower="loadMore"
            waterfall-disabled="disabled"
            waterfall-offset="150"
            :disabled = 'disabled'
            ></news-view>
        </van-pull-refresh>
        <van-loading align = 'center' v-if="isMore" type="spinner" color="black" style="margin:auto;"/>
        <div v-if="isFinish&&dataList.length>0" class="bootom-text">我是有底线哒~~</div>
    </div>
</template>
<script>
import Vue from "vue";
import { PullRefresh, Waterfall,Loading } from "vant";
import newsView from "../../components/common/newsView.vue";
import { RequestNewList } from "../../fetch/modules/index.js";
import { RequestFavoritesList } from "../../fetch/modules/user.js";
Vue.use(PullRefresh);
Vue.use(Waterfall);
Vue.use(Loading);
export default {
  components: { newsView },
  data() {
    return {
      disabled: false,
      isFinish: false,
      isMore: false,
      isLoading: false,
      favoritesObj: {
        current_page: 1,
        page_size: 10
      },
      dataList: [],
      total_num: 0,
      total_page:0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var args = this.favoritesObj;
      RequestFavoritesList(args).then(res => {
        this.total_num = res.data.total_num;
        this.total_page = Math.ceil(res.data.total_num/res.data.page_size);
        this.dataList = this.dataList.concat(res.data.list);
        this.favoritesObj.current_page = res.data.current_page;
        this.isLoading = false;
        this.isMore = false;
        this.disabled = false;
      });
    },
    onRefresh() {
      this.favoritesObj.current_page = 1;
      this.dataList = [];
      this.getData() 
    },
    loadMore() {
     this.disabled = true;
      var total_page = this.total_page;
      var current_page = this.favoritesObj.current_page;
      if (!this.isMore && total_page > current_page) {
        this.isMore = true;
        this.favoritesObj.current_page = Number(current_page) + 1;
        this.getData();
      } else {
        this.isFinish = true;
      }
    }
  }
};
</script>
<style scoped>
  .bootom-text {
  margin: 15px auto;
  font-size: 14px;
  color: #2b79b5;
  text-align: center;
}
</style>