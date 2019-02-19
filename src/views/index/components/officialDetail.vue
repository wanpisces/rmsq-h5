<template>
  <div> 
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <news-view 
            :newsData ='newsData' 
            icon="1"
            v-waterfall-lower="loadMore"
            waterfall-disabled="disabled"
            waterfall-offset="150"
            :disabled = 'disabled'
            ></news-view>
        </van-pull-refresh>
        <van-loading align = 'center' v-if="isMore" type="spinner" color="black" style="margin:auto;"/>
        <div v-if="isFinish&&newsData.length>0" class="bootom-text">我是有底线哒~~</div>
  </div>
</template>
<script>
import Vue from "vue";
import { PullRefresh, Waterfall, Loading } from "vant";
import { RequestNewList } from "../../../fetch/modules/index";
import newsView from "./../../../components/common/newsView.vue";
Vue.use(PullRefresh);
Vue.use(Waterfall);
Vue.use(Loading);
export default {
  components: { newsView },
  data() {
    return {
      newsData: [],
      group_id: localStorage.getItem("group_id") || 1,
      search:{
        run_in: 3,
        current_page: 1,
        page_size: 10
      },
      disabled: false,
      isFinish: false,
      isMore: false,
      isLoading: false,
      total_num: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    moreLink() {
      this.$router.push({ name: "newsDetail" });
    },
    getData() {
      var args = this.search;
      RequestNewList(args).then(res => {
        this.total_num = res.data.total_num;
        this.newsData = this.newsData.concat(res.data.list);
        this.search.current_page = res.data.current_page;
        this.isLoading = false;
        this.isMore = false;
        this.disabled = false;
      });
    },
     onRefresh() {
      this.search.current_page = 1;
      this.newsData = [];
      this.getData() 
    },
    loadMore() {
      this.disabled = true;
      var total_page = this.total_page;
      var current_page = this.search.current_page;
      if (!this.isMore && total_page > current_page) {
        this.isMore = true;
        this.search.current_page = Number(current_page) + 1;
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