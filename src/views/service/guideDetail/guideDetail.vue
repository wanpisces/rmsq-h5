<template>
  <div class="event-wrap">
    <div class="event_title">{{eventData.event_name}}</div>
    <div class="event-item">
        事项名称：
        <p>{{eventData.event_name}}</p>
    </div>
    <div class="event-item">
        办理部门：
        <p>{{eventData.event_department}}</p>
    </div>
    <div class="event-item">
        承诺时限：
        <p>{{eventData.event_deadline}}</p>
    </div>
    <div class="event-item">
        申请材料：
        <p>{{eventData.event_mark}}</p>
    </div>
    <div class="event-item">
        办理程序：
        <p>{{eventData.event_flow}}</p>
    </div>
    <div class="event-item">
        法定依据：
        <p>{{eventData.event_basis}}</p>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { RequestGuideDetail } from "../../../fetch/modules/service.js";
export default {
  data() {
    return {
        eventData:{}
    };
  },
  created() {
    var event_id = this.$route.query.event_id;
    this.getData(event_id);
  },
  methods: {
    getData(event_id) {
      RequestGuideDetail({event_id:event_id}).then(res => {
          this.eventData = res.data;
      });
    }
  }
};
</script>
<style scoped>
.event-wrap{
    padding: 15px 15px 50px;
}
.event_title{
    font-size: 16px;
    color: #101010;
}
.event-item{
    margin-top: 15px;
    padding: 20px;
    background: #F2F0F2;
    font-size: 14px;
    color: #101010;
}
.event-item p{
    margin-top: 10px;
}
</style>