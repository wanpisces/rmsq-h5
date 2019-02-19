<template>
  <div>
    <newList :newsData='newsData' @onLoad = 'onLoad'></newList>
  </div>
</template>
<script>
// 组件
import newList from "./../../components/common/newsView.vue";
// 数据接口
import { RequestSearchList } from "../../fetch/modules/index";
export default {
  components:{newList},
  data(){
    return {
      newsData:[]
    }
  },
  activated(){
      let args={
          q:this.$route.query.q
      }
      this.getList(args);
  },
  methods: {
    getList(obj){
      RequestSearchList(obj).then(res=>{
             console.log(res)
             if(res.code===2000){
                 this.newsData=res.data.list;
                 
             }
      })
    },
    onLoad(){}
  }
}
</script>
<style scoped>

</style>
