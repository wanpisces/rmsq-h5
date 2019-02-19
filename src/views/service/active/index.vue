<template>
  <div style="background:#F2F2F2;height:auto;min-height:100vh">
    <attr @onConfirmOne="onConfirmOne" @onConfirmThree="onConfirmThree" @onConfirmTwo="onConfirmTwo" />
    <!-- 内容 -->
    <div style="padding-top:8vh;">
      <active-list :list="list" />
    </div>
    <div @click="handleMore" v-if="search.current_page<last" class="active-more">查看更多</div>
    <div v-if="search.current_page>=last && list.length>0" class="active-line">我也是有底线哒~</div>
  </div>
</template>

<script>
// 自定义组件
import activeList from "./components/list.vue";
import attr from "./components/attr.vue";
import { RequestActivityList } from "../../../fetch/modules/service";
export default {
  components: { activeList, attr },
  data() {
    return {
      list: [],
      search: {
        attr_id: "",
        need_volunteer: "",
        activity_state: "",
        current_page: 1,
        page_size: 15
      },
      last: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let args = JSON.parse(JSON.stringify(this.search));
      for (let i in args) {
        if (args[i] === "") {
          delete args[i];
        }
      }
      RequestActivityList(args).then(res => {
        this.list = res.data.list;
        this.last = Math.ceil(res.data.total_num / res.data.page_size);
      });
    },
    onConfirmOne(id) {
      this.search.current_page = 1;
      this.search.attr_id = id;
      this.getData();
    },
    onConfirmTwo(id) {
      this.search.current_page = 1;
      this.search.need_volunteer = id;
      this.getData();
    },
    onConfirmThree(state) {
      this.search.current_page = 1;
      this.search.activity_state = state;
      this.getData();
    },
    handleMore() {
      this.search.current_page = +this.search.current_page+1;
      let args = JSON.parse(JSON.stringify(this.search));
      for (let i in args) {
        if (args[i] === "") {
          delete args[i];
        }
      }
      RequestActivityList(args).then(res => {
        this.list =this.list.concat(res.data.list) ;
        this.last = Math.ceil(res.data.total_num / res.data.page_size);
      });
    }
  }
};
</script>

<style scoped>
.active-more {
  margin: 0 auto;
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: 1px #999 solid;
  color: #999;
  font-size: 13px;
  text-align: center;
  border-radius: 5px;
}
.active-line{
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: #282828;
  font-size: 13px;
}
</style>

