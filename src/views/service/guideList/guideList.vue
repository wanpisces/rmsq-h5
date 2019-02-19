<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div 
        v-if="dataList.length>0"
        v-waterfall-lower="loadMore"
        waterfall-disabled="disabled"
        waterfall-offset="150"
        :disabled = 'disabled'>
            <router-link :to="{path:'guideDetail', query:{'event_id': item.event_id}}" 
            v-for='(item,index) in dataList' 
            :key='index'>
                <div class="guide-item">
                    <div class="guide-title">{{item.event_name}}</div>
                    <p>{{item.attr_value}}</p>
                </div>
            </router-link>
            
        </div>
        <emptyView v-else icon="1"></emptyView>
     </van-pull-refresh>
     <van-loading align = 'center' v-if="isMore" type="spinner" color="black" style="margin:auto;"/>
    <div v-if="isFinish&&dataList.length>0" class="bootom-text">我是有底线哒~~</div>
  </div>
</template>
<script>
import Vue from "vue";
import { PullRefresh, Waterfall, Loading } from "vant";
import { RequestGuideList } from "../../../fetch/modules/service.js";
import emptyView from "../../../components/common/emptyView.vue";
Vue.use(PullRefresh);
Vue.use(Waterfall);
Vue.use(Loading);
export default {
  components: { emptyView },
  data() {
    return {
      disabled: false,
      isFinish: false,
      isMore: false,
      isLoading: false,
      search: {
        current_page: 1,
        page_size: 10,
        q: "",
        top_id: "",
        attr_id: ""
      },
      dataList: [],
      total_num: 0
    };
  },
  created() {
    this.search = Object.assign(this.search, this.$route.query);
    this.getData();
  },
  methods: {
    getData() {
      var args = this.search;
      RequestGuideList(args).then(res => {
        this.total_num = res.data.total_num;
        this.dataList = this.dataList.concat(res.data.list);
        this.search.current_page = res.data.current_page;
        this.isLoading = false;
        this.isMore = false;
        this.disabled = false;
      });
    },
    onRefresh() {
      this.search.current_page = 1;
      this.dataList = [];
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
.guide-item{
    padding: 10px;
    border-bottom: 5px solid #eee;
}
.guide-title{
     word-break:break-all;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
    height: 40px;
    font-size: 14px;
    color: #101010;
}
.guide-item p{
    font-size: 12px;
    color: #999;
}
</style>