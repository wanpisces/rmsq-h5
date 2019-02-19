<template>
  <div class="detail">
      <div class="search">
          <div>{{search.name}}</div>
          <div>筛选<img src="../../../../static/img/next.png" width="20" alt="">
          </div>
      </div>
      <section>
          <router-link :to="{name:'noticeDetail',query:{id:items.news_id}}" v-for="(items,index)  in  listData" :key="index" v-if="listData">
              <div class="content-list" >
                 <p>{{items.news_title}}</p>
                 <span>{{items.create_time}}</span>
            </div>
          </router-link>
            
             <div class="nodata" v-if="!listData">
                暂无消息~
            </div>
       </section>
  </div>
</template>
<script>
import {RequestGovNewsList} from '../../../fetch/modules/service'
export default {
 data() {
     return {
        listData:[],
        search:{
          name:'全部'
        }
     }
 },
 created() {
     this.getList();
 },
 methods:{
     getList() {
         let args={
           group_id:localStorage.getItem('group_id')  || 1,
           pid: this.$route.query.id,
           page_size:100,
         }
         RequestGovNewsList(args).then(res=>{
            console.log('res',res)
            this.listData=res.data.list
         })
     }
 }
}
</script>
<style lang="less" scoped>
.search{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px #f0f0f0 solid
}
.detail{
   .content-list {
    padding: 15px 15px 10px  15px;
    border-bottom: 1px #f0f0f0 solid;
  }
  .content-list p{
      color: #000;
  }
  .content-list span {
    display: block;
    margin-top: 5px;
    font-size: 14px;
    color: #c7c7c7;
  }
}
</style>
