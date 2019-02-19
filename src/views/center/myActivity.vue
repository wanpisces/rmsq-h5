<template>
    <div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!-- v-if="list.length>0" -->
            <div v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="150" :disabled='disabled'>
                <router-link class='item' :to="{path:'newsDetail', query:{'news_id': 'as'}}">
                    <img class='userImg' src='../../../static/img/foot_index_touch.png'>
                    <div class='user'>
                        <div class='userName'>【五一活动】让妈妈清凉一“夏”</div>
                        <div class="address">回江社区</div>
                        <div class='nameAndTime'>
                            <div class='commentTime'>2018-06-01 10：00</div>
                            <div class="status">
                                <span>未开始</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class='commentContent text-line2'>{{item.comment_content}}</div> -->
                    <!-- <div class='news'>
                            <img mode='aspectFill' class='newsImg' :src='item.news_pic'>
                            <div class='newsTitle'>{{item.news_title}}</div>
                        </div> -->
                </router-link>
                <!-- <div class='item' v-for='(item,index) in list' :key='index'>
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
                </div> -->
            </div>
            <!-- <emptyView v-else icon="1"></emptyView> -->
        </van-pull-refresh>
        <van-loading align='center' v-if="isMore" type="spinner" color="black" />
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
      console.log("zhixint");
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
  flex-flow: row;
  margin-left: 15px;
  padding: 18px 0px;
  border-bottom: 1px solid #f2f2f2;
}
.van-loading {
  margin: auto;
}
.item .user {
  width: 220px;
  margin-left: 15px;
}
.userImg {
  width: 110px;
  height: 80px;
  border: 1px solid #333;
}
.address {
  font-size: 13px;
  color: #999999;
}
.status {
  font-size: 13px;
  color: #ff7e00;
}
.status1 {
  font-size: 13px;
  color: #999999;
}
.nameAndTime {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}

.userName {
  height: 44px;
  font-size: 14px;
  color: #353535;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /*font-weight: 500;*/
}

.commentTime {
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
