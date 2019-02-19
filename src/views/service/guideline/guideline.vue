<template>
  <div>
    <div class="tab-wrapper">
      <div v-for="(item, index) in guideServiceData" :key="index" :class="curIndex == index? 'tab-item active': 'tab-item'" @click="tabSwitch(index)">{{item.attr_value}}</div>
    </div>
    <div class="guid-content">
      <router-link :to="{path:'guideClassfiy',query:{classfiyData:JSON.stringify(guideServiceData[curIndex])}}">
         <van-cell-group>
          <van-cell title="分类" is-link :value="classfiyData.text" />
        </van-cell-group>
      </router-link>
      <div class="inpt-search"><label>关键字：</label><input placeholder="请输入关键字，如婚育" v-model="inptValue"/> </div>
    </div>
    <div class="search-bottom" @click="searchBtn">搜索 </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Cell, CellGroup,Button  } from 'vant';
Vue.use(Cell).use(CellGroup);
Vue.use(Button);
import { RequestGuideAttr } from '../../../fetch/modules/service.js'
export default {
  data() {
    return {
      guideServiceData:[],
      inptValue:''
      // curIndex:0
    };
  },
  created() {
   this.getData();
  },
  methods: {
    //获取办事指南数据
    getData() {
        RequestGuideAttr().then(res => {
          this.guideServiceData = res.data;
        })
    },
    //按钮切换
    tabSwitch(index){
      this.$store.dispatch('tabSwitch',{curIndex:index});
    },
    //搜索
    searchBtn(){
      var args = {
        top_id:this.guideServiceData[this.curIndex].attr_id,
        attr_id:this.classfiyData.id,
        q:this.inptValue
      }
      this.$router.push({name:'guideList',query:args})
    }
  }, 
  computed: {
    curIndex(){
      return this.$store.getters.curIndex;
    },
    classfiyData(){
      return this.$store.getters.classfiyData;
    }
  }
};
</script>
<style scoped>
  .van-cell{
    padding: 8px 15px;
  }
  .guid-content{
    margin-bottom: 40px;
  }
  .inpt-search{
    border-bottom: 1px solid #e5e5e5;
  }
  .inpt-search label{
    padding-left: 15px;
    font-size:14px;
    color: #333;
  }
  .inpt-search input{
    width: 250px;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
  }
  .tab-wrapper{
    display:flex;
    flex-flow: row;
    margin:15px auto;
    width: 95%;
    color: #00A0E9;
    font-size: 15px;
  }
  .tab-item{
    width: 50%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border:1px solid #00A0E9;
  }
  .tab-item.active{
    color: #fff;
    background: #00A0E9;
  }
  .tab-item:nth-of-type(1){
    border-radius: 5px 0 0 5px;
  }
  .tab-item:nth-of-type(2){
    border-radius: 0px 5px 5px 0px;
   border-left: none;
  }
  .search-bottom{
    margin: auto;
    width: 93%;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    text-align: center;
    border-radius: 5px;
    color: #fff;
    background: #00A0E9;
  }
</style>