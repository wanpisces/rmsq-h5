<template>
  <div class="open-gov">
       <header>
            <div class="img-header">
                <img :src="titleData.group_pic" width="100%" height="150px" alt="">
            </div>
            <div class="header-title">
                <p>{{titleData.group_name}}</p>
                <span>{{titleData.group_desc}}</span>
              <router-link :to="{name:'streeDetail',query:{id:titleData.group_id}}">
                <div class="enter">
                        <span>进入简介</span> 
                </div>
              </router-link>  
            </div>
       </header>
       <section>
            <div class="content-top">
                <div>
                    <img src="../../../../static/img/notice.png" width="20" alt="">
                    <span>公示公告</span>
                </div>
                <router-link :to="{name:'notice',query:{id:gsggData.attr_id}}">
                     <div class="more">更多</div>
                </router-link>
               
            </div>
             <router-link :to="{name:'noticeDetail',query:{id:items.news_id}}" v-for="(items,index)  in  gsggData.list" :key="index" v-if="gsggData">
                <div class="content-list" >
                    <p>{{items.news_title}}</p>
                    <span>{{items.create_time}}</span>
                </div>
             </router-link>
             <div class="nodata" v-if="!gsggData">
                暂无消息~
            </div>
       </section>
        <section>
            <div class="line"></div>
            <div class="content-top">
                <div>
                    <img src="../../../../static/img/policy.png" width="20" alt="">
                    <span>惠民政策</span>
                </div>
               <router-link :to="{name:'benefit',query:{id:hmzcData.attr_id}}">
                     <div class="more">更多</div>
                </router-link>
            </div>
            <router-link :to="{name:'noticeDetail',query:{id:items.news_id}}" v-for="(items,index)  in hmzcData.list" :key="index" v-if="hmzcData">
            <div class="content-list" v-for="(items,index)  in hmzcData.list" :key="index" v-if="hmzcData">
                <p>{{items.news_title}}</p>
                <span>{{items.create_time}}</span>
            </div>
            </router-link>
            <div class="nodata" v-if="!hmzcData">
                暂无消息~
            </div>
       </section>
  </div>
</template>
<script>
import   {RequestGovIndex}  from  '../../../fetch/modules/service'
export default {
    data() {
        return {
           hmzcData:[],
           gsggData:[],
           titleData:[]
        }
    },
    created() {
         this.getList();
    },
    methods:{
        getList(){
            let  args={group_id:localStorage.getItem('group_id'||1)}
             RequestGovIndex(args).then(res=>{
                  this.hmzcData=res.data.hmzc_list
                  this.gsggData=res.data.gggs_list
                  this.titleData=res.data.group_info
                  console.log(this.gsggData)
             })
        }
    }
};
</script>
<style lang="less" scoped>
.open-gov {
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
    margin-bottom:5px; 
  }
  .header-title span{
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
  .content-top {
    display: flex;
    padding: 5px 10px;
    justify-content: space-between;
    font-size: 16px;
    align-items: center;
  }
  .content-list {
    padding: 15px 15px 10px  15px;
    border-bottom: 1px #f0f0f0 solid;
    color: #000;
    font-size: 14px;
  }
  .content-list span {
    display: block;
    margin-top: 5px;
    font-size: 14px;
    color: #c7c7c7;
  }
  .line{
      width: 100%;
      background: #f0f0f0;
      height: 10px;
  }
  .more{
      font-size: 14px;
      color:#c7c7c7 ;
  }
  .nodata{
      text-align: center;
  }
}
</style>
