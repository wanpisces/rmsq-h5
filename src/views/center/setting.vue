<template>
  <div class="center">
    <div class="my-header">
      <img class="avator" src="../../../static/img/foot_index_touch.png" width="100%" alt="">
      <div class="my-nickname">社区一点通</div>
      <div class="my-id">v1.0</div>
    </div>
    <div class="my-content">
        <router-link :to="{ path: 'aboutUs'}" class="item-wrap">
          <div class="item-left">
            关于我们
          </div>
          <div class="item-right">
            <!-- <div class="badge"></div> -->
            <img class="gray_arrow" src="../../../static/img/gray_arrow.png" alt="">
          </div>
        </router-link>
        <a href="tel:02887750196" class="item-wrap">
          <div class="item-left">
            联系我们
          </div>
          <div class="item-right">
            028-87750196
            <img class="gray_arrow" src="../../../static/img/gray_arrow.png" alt="">
          </div>
        </a>
    </div>
    <div class='bottomTxt'>
        <span>版权所有</span>
        <span>Copyright四川大榕树数据技术有限公司</span>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import navBar from  '../../components/common/navBar.vue'
  import  titleBar from  '../../components/common/titleBar.vue'
  import MyItem from './components/MyItem.vue'
  export default {
    components:{navBar,titleBar,MyItem},
    data(){
      return{
      }
    },
    create(){

    },
    methods: {
      infoDetail() {
          this.$router.push({
            path:'/info',
          })
      }
    }
  }
</script>
<style scoped>
.bottomTxt {
  position: fixed;
  bottom: 20px;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.bottomTxt span {
  font-size: 12px;
  color: #999;
}
.my-header{
  padding-top: 30px;
  height: 140px;
  text-align: center;
  border-bottom: 10px solid #F4F4F4;
}
.avator{
  width: 65px;
  height: 65px;
  border-radius: 50%;
}
.my-nickname{
  font-size: 16px;
  }
  .my-id{
    margin-top: 2px;
    font-size: 12px;
    color: #666;
  }
  .item-wrap{
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        padding:10px 10px;
        border-bottom: 1px solid #ddd;
    }
    .img-wrap{
        margin-right: 3px;
        width: 30px;
        height: auto;
        text-align: center;
    }
    .img-wrap img{
        height: 20px;
    }
    .item-left{
        display: flex;
        flex-flow: row;
        align-items: center;
        color: #4F4F4F;
        font-size: 14px;
    }
    .item-right{
      display: flex;
      flex-flow: row;
      align-items: center;
      color: #999999;
      font-size: 12px;
    }
    .gray_arrow{
      width: 16px;
    }
    .badge{
      margin-right: 3px;
      width: 8px;
      height: 8px;
      background: #ff0000;
      border-radius: 50%;
    }
  .center-title{
    position: fixed;
    top:0;
    left: 0;
    text-align: center;
    color:#fff ;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    letter-spacing: 3px;
    z-index: 10;
  }
  .center-person{
     position: relative;
     height: 25vh;
  }
  .center-bg{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 25vh;
    overflow: hidden;
  }
  .center-person-c{
     display: flex;
     justify-content: space-between;
     height: 25vh;
     /*border: 1px red solid;*/
     align-items: center;
     /*margin-top: 5vh;*/
     margin: 0 3% 0 10%;
  }
  .header-img{
     width:40px;
     height: 40px;
     border-radius: 40px;
     /*border: 1px red solid;*/
     margin-right: 5px;
     overflow: hidden;
  }
  .icon-go{
     color: #fff;
     font-size: 20px;
  }
</style>