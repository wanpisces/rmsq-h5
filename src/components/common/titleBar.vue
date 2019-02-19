<template>
  <div>
     <div class="title-bar">
        <i class="iconfont icon-back" @click="goBackTo()"></i>
       <div class="title-bar-name"><span>{{title}}</span></div>
     </div>
  </div>
</template>
<script>
    export default {
       props:{
           title:{
               default:'title',
               type:String
           }
       },
       methods: {
         goBackTo(){
           this.$router.go(-1);
         }
       }
    }
</script>
<style scoped>
  .title-bar{
    position: relative;
    top:0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 45px;
    border-bottom:1px #d8d8d8 solid ;
    padding: 0 5px;
  }
  .icon-back{
    font-size: 20px;
    flex-grow: 1;
  }
  .title-bar-back{
    flex-grow: 1;
  }
  .title-bar-name{
    /*border: 1px red solid;*/
    flex-grow: 50;
    text-align: center;
    font-size: 16px;
  }
</style>