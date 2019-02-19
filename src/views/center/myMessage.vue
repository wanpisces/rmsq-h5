<template>
    <div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!--  -->
            <div v-if="list.length>0" v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="150" :disabled='disabled'>
                <div class='item' v-for='(item,index) in list' :key='index'>
                    <div class="message-item" :style="{width:windWidth+90+'px'}">
                        <div class="message-mian" :style="{width:windWidth-15+'px'}">
                            <span class="red-dotted"></span>
                            <div class="message-text">{{item.message_content}}</div>
                        </div>
                        <div class="delete-wrap" @click="deleteMessage(item.message_id)">删除</div>
                    </div>
                </div>
            </div>
            <emptyView v-else icon="1"></emptyView>
        </van-pull-refresh>
        <van-loading align='center' v-if="isMore" type="spinner" color="black" />
        <div v-if="isFinish&&list.length>0" class="bootom-text">我是有底线哒~~</div>
    </div>
</template>
<script>
import Vue from "vue";
import { PullRefresh, Waterfall, Loading, Dialog } from "vant";
import {
  RequestMessageList,
  RequestMessageDelete
} from "../../fetch/modules/user.js";
import emptyView from "../../components/common/emptyView.vue";
Vue.use(PullRefresh)
  .use(Waterfall)
  .use(Loading)
  .use(Dialog);
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
      list: [],
      windWidth: 0
    };
  },
  created() {
    this.getData();
    this.windWidth = document.documentElement.clientWidth;
  },
  methods: {
    getData() {
      var args = this.search;
      RequestMessageList(args).then(res => {
        this.total_page = Math.ceil(res.data.total_num / this.search.page_size);
        this.list = this.list.concat(res.data.list);
        this.search.current_page = res.data.current_page;
        this.isLoading = false;
        this.isMore = false;
        this.disabled = false;
      });
    },
    //删除消息
    deleteMessage(message_id) {
      Dialog.confirm({
        title: "标题",
        message: "确认删除吗？"
      })
        .then(() => {
          RequestMessageDelete({ message_id: message_id }).then(res => {
            if (res.code == 2000) {
              Toast.success("删除成功");
              this.getData();
            }
          });
        })
        .catch(() => {
          // on cancel
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
  width: 100%;
  overflow-x: scroll;
  border-bottom: 1px solid #f2f2f2;
}
.delete-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  background: #f73007;
  color: #fff;
  font-size: 17px;
  text-align: center;
}
.van-loading {
  margin: auto;
}
.message-item {
  display: flex;
  flex-flow: row;
}
.message-mian {
  display: flex;
  flex-flow: row;
  padding: 10px 0 10px 15px;
  font-size: 0px;
}
.message-text {
  display: inline-block;
  font-size: 14px;
  color: #353535;
}
.red-dotted {
  display: inline-block;
  margin: 4px 8px 0 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #f01313;
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
