<template>
    <div>
        <div class="main-wrapper" v-if="newsData.length>0">
            <router-link v-for="(item,index) in newsData" :key="index"  :to="{path:'newsDetail', query:{'news_id': item.news_id}}" class="item-list">
                <div class="list-text-wrapper" v-if="item.news_pic_type == 0">
                    <h1>{{item.news_title}}</h1>
                    <p class="small-wrapper"><span class="news-sourse">{{item.news_source}}</span><img src="../../../static/img/accessment.png" alt="">{{item.comment_num}}<img src="../../../static/img/xq_read.png" alt="">{{item.visit_num}}</p>
                </div>
                <div v-if="item.news_pic_type == 1">
                    <div class="list-text">
                        <h1>{{item.news_title}}</h1>
                        <p class="small-wrapper"><span class="news-sourse">{{item.news_source}}</span><img src="../../../static/img/accessment.png" alt="">{{item.comment_num}}
                        <img src="../../../static/img/xq_read.png" alt="">{{item.visit_num}}</p>
                    </div>
                    <div class="list-img">
                        <img :src='item.news_pic'>
                    </div>
                </div>
                <div  v-if="item.news_pic_type == 2 ||  item.news_pic_type == 3">
                    <div class="list-text-wrapper">
                    <h1 style="height:auto;margin-bottom:10px;">{{item.news_title}}</h1>
                </div>
                <div class="list-img1">
                    <img :src='item.news_pic'>
                </div>
                <div class="small-wrapper" style="margin-top: 8px;"><span class="news-sourse">{{item.news_source}}</span><img src="../../../static/img/accessment.png" alt="">{{item.comment_num}}
                    <img src="../../../static/img/xq_read.png" alt="">{{item.visit_num}}</div>
                </div>
            </router-link>
        </div>
        <emptyView v-else :icon="icon"></emptyView>
    </div>
</template>

<script>
import Vue from 'vue';
import { List } from 'vant';
import  emptyView from  './emptyView.vue'
Vue.use(List);
export default {
    components:{emptyView},
    props:{
        newsData:{
            type:Array,
            default:function(){
                return {};
            }
        },
        icon:{
            type:String,
            default: "2",
        }
    },
  created() {
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.item-list{display: block;padding:10px 3% 10px;border-bottom: 2px solid rgb(246,246,246);}
.item-list{*zoom:1;} /* 针对IE7 hack，触发IE7的haslayout，以清除浮动 */
.item-list:before,.item-list:after{display:table;content:"";line-height:0;}
.item-list:after{clear:both;}
.list-text{float: left;width: 69%;}
.list-text>h1{margin-bottom: 5px;height: 45px;line-height:22px;font-weight: normal;font-size: 15px;color: #353535;overflow: hidden;text-overflow: ellipsis;}
.list-img{float: right;margin-top:2px;width: 28%;}
.list-img img{width: 100%;height:10vh;}
.small-wrapper{
    display: flex;
    align-items: center;
    font-size: 12px;color: #9b9b9b;
    height: 20px;
    line-height: 20px;
}
.small-wrapper img{
    margin-left: 10px;
    margin-right: 4px;
    height: 13px;width: auto;
}

.list-text-wrapper{width: 100%;}
.list-text-wrapper>h1{margin-bottom: 5px;height: 45px;line-height:22px;font-weight: normal;font-size: 15px;color: #353535;overflow: hidden;text-overflow: ellipsis;}
.list-img1 img{width: 100%;height: 30vh;}
.list-small{margin-top: 10px;font-size: 12px;color: #9b9b9b;}
.news-sourse{
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
