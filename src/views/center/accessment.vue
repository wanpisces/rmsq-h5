<template>
  <div style="padding-top:10px;">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div  
        v-if="list.length>0"
        v-waterfall-lower="loadMore"
        waterfall-disabled="disabled"
        waterfall-offset="150"
        :disabled = 'disabled'>
        <div class='item' 
        v-for='(item,index) in list' 
        :key='index'>
          <router-link :to="{path:'newsDetail', query:{'news_id': item.news_id}}">
            <div class='user'>
                <img mode='aspectFill' class='userImg' :src='item.user_avatar'>
                <div class='nameAndTime'>
                  <div class='userName'>{{item.user_nickname}}</div>
                  <div class='commentTime'>{{item.create_time}}</div>
                </div>
            </div>
            <div class='commentContent text-line2'>{{item.comment_content}}</div>
            <div class='news'>
              <img mode='aspectFill' class='newsImg' :src='item.news_pic'>
              <div class='newsTitle'>{{item.news_title}}</div>
            </div>
          </router-link>
        </div>
      </div>
      <emptyView v-else icon="1"></emptyView>
    </van-pull-refresh>
    <van-loading align = 'center' v-if="isMore" type="spinner" color="black" />
    <div v-if="isFinish&&list.length>0" class="bootom-text">我是有底线哒~~</div>
  </div>
</template>
<script>
import Vue from "vue";
import { PullRefresh, Waterfall, Loading } from "vant";
import { RequestCommentList } from "../../fetch/modules/user.js";
import emptyView from "../../components/common/emptyView.vue";
Vue.use(PullRefresh);
Vue.use(Waterfall);
Vue.use(Loading);
export default {
  components: { emptyView },
  data() {
    return {
      disabled: false,
      isFinish: false,
      isMore: false,
      isLoading: false,
      search: {
        current_page: 1,
        page_size: 10
      },
      total_page: 0,
      list: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var args = this.search;
      RequestCommentList(args).then(res => {
       
        this.total_page = Math.ceil(res.data.total_num / this.search.page_size);
        this.list = this.list.concat(res.data.list);
        this.search.current_page = res.data.current_page;
        this.isLoading = false;
        this.isMore = false;
        this.disabled = false;
      });
    },
    onRefresh() {
      this.search.current_page = 1;
      this.list = [];
      this.isLoading = true;
      this.getData();
    },
    loadMore() {
      console.log('zhixint')
      this.disabled = true;
      var total_page = this.total_page;
      var current_page = this.search.current_page;
      if (!this.isMore && total_page > current_page) {
        this.isMore = true;
        this.search.current_page = Number(current_page) + 1;
        this.getData();
      } else {
        this.isFinish = true;
      }
    }
  }
};
</script>

<style scoped>
.bootom-text {
  margin: 15px auto;
  font-size: 14px;
  color: #2b79b5;
  text-align: center;
}
.item {
  display: flex;
  flex-flow: column;
}
.van-loading {
  margin: auto;
}
.item .user {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 0 10px 10px 10px;
}
.item .user .userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #f2f2f2;
}

.item .user .nameAndTime {
  display: flex;
  flex-flow: column;
  height: 35px;
  margin-left: 8px;
}

.item .user .nameAndTime .userName {
  font-size: 14px;
  color: #2b79b5;
  /*font-weight: 500;*/
}

.item .user .nameAndTime .commentTime {
  margin-top: 3px;
  font-size: 12px;
  color: #999;
}

.item .commentContent {
  font-size: 14px;
  color: #353535;
  margin: 0 15px;
}

.item .news {
  display: flex;
  flex-flow: row nowrap;
  margin: 10px;
  background: #f2f2f2;
  padding: 10px;
  align-items: center;
}

.item .news .newsImg {
  display: flex;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
}

.item .news .newsTitle {
  font-size: 16px;
  margin-left: 14px;
  color: #000;
  font-weight: 500;
  display: -webkit-box;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
