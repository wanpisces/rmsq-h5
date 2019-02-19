<template>
  <div>
    <div class="search">  </div> 
    <form action="/">
            <van-search
                v-model="q"
                placeholder="请输入您想知道的内容..."
                show-action
                @search="onSearch"
                @cancel="onCancel"
            />
    </form>
   <div class="search"></div>
   <div>
       <div class="search-hot">
           <img src="./../../../static/img/hot_search_icon.png" alt="">
           <span>热门搜索</span>
       </div>
       <div class="hot">
           <div v-for="(items,index) in  hotData" :key="index" @click="handleHot(items)">
                <span class="hot-word">{{items.hotword_val}}</span>
           </div>
       </div>
         <div class="search-history">
           <div>
                <img src="./../../../static/img/hinstoryt_search_icon.png" alt="">
                <span>历史记录</span>
            </div>  
           <span @click="handleClear">清空</span>  
       </div>
       <div class="hot">
           <div v-for="(items,index) in  history" :key="index" v-if="history" @click="handleHistory(items)">
                <span class="hot-word">{{items}}</span>
           </div>
       </div>

   </div>

  </div>
</template>
<script>
import Vue from "vue";
import { Search, Dialog, Toast } from "vant";
Vue.use(Search).use(Dialog).use(Toast );
import {RequestHotwordsList}  from '../../fetch/modules/index'
export default {
  data() {
    return {
      q: "",
      hotData: [],
      history:  [],
    };
  },
  created(){
      this.getHotList();
      this.history=JSON.parse(localStorage.getItem("hotwordVal"))
  },
  methods: {
    getHotList(){
        RequestHotwordsList({q:this.q}).then(res=>{
                // console.log(res)
                if(res.code===2000){
                    this.hotData=res.data;
                }
        })
    },
    //热门搜索
    handleHot(value) {
       if(value){
        let arr=[]
        let history= JSON.parse(localStorage.getItem("hotwordVal"))
        for(let i in history){
             arr.push(history[i])
        }
        arr.push(value.hotword_val)
        localStorage.setItem('hotwordVal',JSON.stringify(new Set(arr)))  
        this.$router.push({name:"searchDetail",query:{q:value.hotword_val}})
       }
    },
    handleHistory(value){
        // console.log(value)
        this.$router.push({name:"searchDetail",query:{q:value}})
    },
     // 搜索
    onSearch(va) {
    let value =va.trim()
    if(value){
        let arr=[]
        let history= JSON.parse(localStorage.getItem("hotwordVal"))
        for(let i in history){
             arr.push(history[i])
        }
        arr.push(value)
        localStorage.setItem('hotwordVal',JSON.stringify(new Set(arr)))  
        this.$router.push({name:"searchDetail",query:{q:value}})
       }
    },
    // 取消
    onCancel() {
      
    },
    // 清空历史记录
    handleClear(){
        let  self=this
        if(this.history.length!=0){
           Dialog.confirm({
                title: '温馨提示',
                message: '确定要清空历史记录？'
                }).then(() => {
                   localStorage.clear('hotwordVal');
                   self.history=[];
                   Toast.success('操作成功');

                }).catch(() => {
                // on cancel
            });
        }
    },
  }
};
</script>
<style  scoped>
.search{
    height: 10px;
    text-align: center;
    background: #F2F2F2 
}
.search-hot{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    padding-left: 10px;
    border-bottom: 1px #F2F0F2 solid;
    font-size: 15px;
}
.search-history{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding-left: 10px;
    border-bottom: 1px #F2F0F2 solid;
    font-size: 15px; 
}
.search-history img{
     width: 22px;  
}
.search-hot img{
    width: 22px;  
}
.search-history span{
    margin-right: 15px;
}
.hot{
    padding: 10px 10px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;

}
.hot div{
    padding: 3px 5px;
    border-radius: 5px;
    border: 1px #F2F0F2 solid;
    background: #F2F0F2;
    margin: 4px 3px;
}
.hot-word{
    font-size: 12px;
}
</style>

