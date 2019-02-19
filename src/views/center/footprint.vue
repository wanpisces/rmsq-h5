<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div 
      v-if="list.length>0"
      v-waterfall-lower="loadMore"
      waterfall-disabled="disabled"
      waterfall-offset="50"
      >
        <div  class='item' v-for='(item,index) in list' :key="index">
            <div class='time'>· {{item.time}}</div>
            <news-view :newsData ="item.arr" icon="1"></news-view>
        </div>
      </div>
      <emptyView v-else icon="1"></emptyView>
    </van-pull-refresh>
    <van-loading align = 'center' v-if="isMore" type="spinner" color="black" style="margin:auto;"/>
    <div v-if="isFinish && list.length>0" class="bootom-text">我是有底线哒~~</div>
  </div>
</template>
<script>
import Vue from "vue";
import { PullRefresh, Waterfall,Loading } from "vant";
import newsView from "../../components/common/newsView.vue";
import { RequestFootprintList } from "../../fetch/modules/user.js";
import emptyView from "../../components/common/emptyView.vue";
Vue.use(PullRefresh);
Vue.use(Waterfall);
Vue.use(Loading);
export default {
  components: { newsView, emptyView },
  created() {
    this.getData();
  },
  data() {
    return {
      disabled: false,
      isFinish: false,
      isMore: false,
      isLoading: false,
      search: {
        current_page: 1,
        page_size: 10
      },
      total_page: 0,
      list: []
    };
  },
  methods: {
    onRefresh() {
      this.search.current_page = 1;
      this.list = [];
      this.isLoading = true;
      this.getData();
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
    },
    getData() {
      var args = this.search;
      RequestFootprintList(args).then(res => {
        this.total_page = Math.ceil(res.data.total_num / this.search.page_size);
        var oData = res.data.list;
        var arrData = [];
        for (var item in oData) {
          arrData.push({
            time: item,
            arr: oData[item]
          });
        }
        this.list = this.list.concat(arrData);
        this.search.current_page = res.data.current_page;
        this.isLoading = false;
        this.isMore = false;
        this.disabled = false;
      });
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
.emptydiv {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.time {
  padding: 10px 10px 0;
}
</style>