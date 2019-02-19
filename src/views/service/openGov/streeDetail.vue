<template>
  <div class="stree-detail">
       <header>
            <div class="img-header">
                <img :src="listData.group_pic" width="100%" height="150px" alt="">
            </div>
            <div class="header-title">
                <p>{{listData.group_name}}</p>
            </div>
       </header>
       <div class="stree-content">
           <div><img src="../../../../static/img/list-icon.png" width="20" alt="" style="margin-bottom:3px"><span> 街道简介</span> </div>
           <div :class="[show==true? 'stree-desc-show':'stree-desc-hidden']">
              <p class="stree-desc">{{listData.group_desc}}</p>
           </div>
           <div class="show-all" @click="handleShowDesc">
              <p>{{title}}</p>
              <img src="../../../../static/img/more-info.png" width="26" :class="[show==true? 'img-transform':'']" alt="">
           </div>
           <div class="show-all" v-if="!listData.group_desc">暂无简介</div>
       </div>
       <div  class="line"></div>
       <div class="stree-content-2">
           <div style="margin-left:10px"><img src="../../../../static/img/list-icon.png" width="20" alt="" style="margin-bottom:3px"><span> 下属社区</span> </div>
           <div class="stree-commnity">
               <div class="commnity" v-for="(items,index)  in  listData.group_child" :key="index" @click="handleCommnityLink(items)">
                   {{items.sub_name}}
               </div>
           </div>
       </div>
       
  </div>
</template>
<script>
import { RequestGovStreeDetail } from "../../../fetch/modules/service";
export default {
  data() {
    return {
      listData: [],
      show: false,
      title: "展开全部"
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      RequestGovStreeDetail({ id: this.$route.query.id }).then(res => {
        this.listData = res.data;
      });
    },
    handleShowDesc() {
      if (this.show == false) {
        this.show = true;
        this.title = "隐藏部分";
      } else {
        this.show = false;
        this.title = "展开全部";
      }
    },
    handleCommnityLink(value) {
      console.log(value)
       this.$router.push({name:"commnityDetail",query:{id:value.sub_id}})
    }
  }
};
</script>
<style lang="less" scoped>
.stree-detail {
  header {
    position: relative;
    //    overflow: hidden;
    height: 150px;
    border: 1px re solid;
  }
  .img-header {
    width: 100%;
    height: 150px;
    overflow: hidden;
  }
  .header-title {
    position: absolute;
    margin: 0 auto;
    left: 0;
    top: 50px;
    width: 100%;
    text-align: center;
    color: #fff;
    z-index: 100;
    font-size: 14px;
  }
  .header-title p {
    color: #fff;
    font-size: 18px;
    margin-bottom: 5px;
  }
  .header-title span {
    font-size: 13px;
  }
  .enter {
    border: 1px #c7c7c7 solid;
    width: 80px;
    margin: 20px auto;
    text-align: center;
    border-radius: 30px;
    color: #fff;
  }
  .stree-content {
    margin: 20px 10px;
  }
  .stree-content-2{
    margin: 20px 0;
  }
  .stree-desc {
    text-indent: 25px;
    line-height: 25px;
    font-size: 13px;
    margin-bottom: 10px;
  }
  .line {
    width: 100%;
    background: #f0f0f0;
    height: 10px;
  }
  .stree-desc-show {
    height: auto;
  }
  .stree-desc-hidden {
    height: 50px;
    overflow: hidden;
  }
  .show-all {
    text-align: center;
    color: #9a9a9a;
    font-size: 14px;
  }
  .img-transform {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg); /* IE 9 */
    -moz-transform: rotate(180deg); /* Firefox */
    -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
    -o-transform: rotate(180deg);
  }
  .commnity{
     border-radius: 25px;
     height: 30px;
     line-height: 30px;
     background: #1CBCCA;
     text-align: center;
     padding: 0 10px; 
     color: #fff;
     margin-left: 20px;

  }
  .stree-commnity{
     margin: 20px 0;
     display: flex;
     align-items: center;
     font-size: 14px;

  }
}
</style>
