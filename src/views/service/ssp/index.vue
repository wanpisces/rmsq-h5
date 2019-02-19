<template>
  <div>
      <div class="ssp-content-wrapper">
            <brokeList  v-if="curIndex == 0"></brokeList>
            <addBroke @switchIndex="getCurIndex" v-if="curIndex == 1"></addBroke>
            <myBroke v-if="curIndex == 2"></myBroke>
      </div>
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div 
        v-if="dataList.length>0"
        v-waterfall-lower="loadMore"
        waterfall-disabled="disabled"
        waterfall-offset="150"
        :disabled = 'disabled'>
        <div>
            
        </div>
            
        </div>
        <emptyView v-else icon="1"></emptyView>
     </van-pull-refresh> -->
     <van-loading align = 'center' v-if="isMore" type="spinner" color="black" style="margin:auto;"/>
    <div v-if="isFinish&&dataList.length>0" class="bootom-text">我是有底线哒~~</div>
    <div class="ssp-footer-wrapper">
        <div :class="curIndex == 0?'ssp-footer-item active':'ssp-footer-item'" @click="sspSwitch(0)">
            <img v-if="curIndex == 0" class="ssp-img1" src="https://img.sqydt.darongshutech.com/image_201805111149461346.png" alt="">
            <img v-else class="ssp-img1" src="https://img.sqydt.darongshutech.com/image_201805111149007995.png" alt="">
            <p>爆料列表</p>
        </div>
        <div :class="curIndex == 1?'ssp-footer-item active':'ssp-footer-item'"  @click="sspSwitch(1)">
            <img class="ssp-img2" src="https://img.sqydt.darongshutech.com/image_201805111146446080.png" alt="">
            <p class="addp">新增爆料</p>
        </div>
        <div :class="curIndex == 2?'ssp-footer-item active':'ssp-footer-item'"  @click="sspSwitch(2)">
            <!-- <img class="ssp-img3" src="../../../../dist/static/img/my_news1.png" alt=""> -->
            <img v-if="curIndex == 2" class="ssp-img3" src="https://img.sqydt.darongshutech.com/image_201805111223217260.png" alt="">
            <img v-else class="ssp-img3" src="https://img.sqydt.darongshutech.com/image_201805111222446877.png" alt="">
            <p> 我的爆料</p>
        </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { PullRefresh, Waterfall, Loading } from "vant";
import brokeList from './component/brokeList.vue'
import addBroke from './component/addBroke.vue'
import myBroke from './component/myBroke.vue'
// import { RequestGuideList } from "../../../fetch/modules/service.js";
import emptyView from "../../../components/common/emptyView.vue";
Vue.use(PullRefresh);
Vue.use(Waterfall);
Vue.use(Loading);
export default {
  components: { emptyView,brokeList,addBroke,myBroke },
  data() {
    return {
        curIndex:1,
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
    // this.getData();
  },
  methods: {
      //底部切换
     sspSwitch(index){
         this.curIndex = index;
     },
     getCurIndex(data){
         console.log(data)
         this.curIndex = data.index;
     },
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

.van-pull-refresh, .van-pull-refresh>div{
    height: 100%;
}
.ssp-content-wrapper{
    height: 100%;
}
.addp{
    margin-top: -20px;
}
    .ssp-footer-wrapper{
        position: fixed;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-around;
        bottom: 0;
        left: 0;
        width:100%;
        height: 50px;
        background: #fff;
        border-top: 1px solid #F9F7F8;
    }
    .ssp-footer-item{
        text-align: center;
    }
    .ssp-footer-item img{
        margin: auto;
    }
    .ssp-footer-item .ssp-img1{
        /* margin-top: 5px; */
        width: 30px;
        height: 30px;
    }
    .ssp-footer-item .ssp-img2{
        position: relative;
        top: -20px;
        /* margin-top: -5px; */
        width: 50px;
        height: 50px;
    }
    .ssp-footer-item .ssp-img3{
        margin-top: -3px;
        width: 30px;
        height: 35px;
    }
    .ssp-footer-item p{
        font-size: 12px;
        color: #999999;
    }
    .ssp-footer-item.active p{
        color: #FF8D17;
    }
</style>