<template>
  <div>
      <div class="nav-bar">
          <div v-if="barData" v-for="(item,index) in barData" :class="showIndex==index?'nav showColor':'nav navColor'" @click="handleBar(item,index)" :key="index">
            <i :class="item.icon"></i>
            <p>{{item.name}}</p>
          </div>
      </div>
  </div>
</template>
<script>
    export default {
        props:{
            showIndex:{
                default:1,
                type:String,
            }
        },
        data () {
            return {
                barData:[
                  {
                       icon:'iconfont icon-shouye',
                       name:'首页',
                       path:'/index'
                  },
                  {
                    icon:'iconfont icon-xiaoxi',
                    name:'服务',
                    path:'/service'
                  }
                  ,
                  {
                    icon:'iconfont icon-wode',
                    name:'我的',
                    path:'/center'
                  }
                ],
            }
        },
        methods:{
          handleBar (item,index) {
              if(this.showIndex != index) {
                 this.$router.push({
                   path:item.path
                 })
              }
          }
        }
    }
</script>
<style scoped>
  .nav-bar{
     position: fixed;
     bottom: 0;
     left: 0;
     z-index: 100;
     display: flex;
     justify-content: space-between;
     text-align: center;
     height:50px;
     width: 100%;
     align-items: center;
     border-top: 1px #d8d8d8 solid;
     background: #fff
  }
  .nav-bar div{
    flex-grow: 1;
  }
  .nav-bar  p{
     font-size: 13px;
  }
  .showColor{
    color: #66c6f2;
  }
  
 .navColor{
    color: #999
  }  
</style>