<template>
  <div>
    <div class="active-content" v-for="(items,index) in list" :key="index" @click="linkPage(items.activity_id)">
      <div class="active-content-title">
        <span>{{items.activity_title}}</span> <img src="../../../../../static/img/next.png" width="22px" alt="">
      </div>
      <img :src="items.activity_pic" class="active-content-img" alt="" style="">
      <!-- <img src="../../../../../static/img/need_volun.png" alt="" class="active-voleenter" v-if="items.need_volunteer==1"> -->
      <div class="active-voleenter" v-if="items.need_volunteer==1">需要志愿者</div>
      <div class="active-content-bottom">
        <div style="width:70%">
          <div class="active-content-right"><img src="../../../../../static/img/addr2.png" width="20px" alt="">
            <span>{{items.address}}</span>
          </div>
          <div class="active-content-right"><img src="../../../../../static/img/time.png" width="20px" alt="">
            <span>{{items.activity_starttime}}</span>
          </div>
        </div>
        <div >
          <div class="active-content-btn">{{items.enlist_state==1&&'未开始'||items.enlist_state==2&&'报名中'||items.activity_state==1&&'报名结束'||items.activity_state==2&&'进行中'||items.activity_state==3&&'已结束'||''}}</div>
        </div>
      </div>
    </div>
    <div v-if="list.length==0" class="no-data">
      <img src="../../../../../static/img/nodata.png" width="120px" alt="">
      <p>暂无活动</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "viewList",
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    linkPage(id) {
      this.$router.push({ path: "activeDetail", query: { activity_id: id } });
    }
  }
};
</script>

<style scoped>
.active-content {
  position: relative;
  top:0;
  left: 0;
  width: 95%;
  border: 1px #f2f2f2 solid;
  border-radius: 5px;
  /* padding: 10px 0; */
  margin: 10px auto;
  background: #fff;
  overflow: hidden;
}
.active-content-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 0 8px;
  height: 45px;
}
.active-content-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.active-content-img {
  width: 100%;
  height: 30vh;
}
.active-content-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  color: #999;
  font-size: 13px;
}
/* .active-content-bottom>div:nth-child(2){
  flex-grow: 1,
} */
.active-content-right {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* flex-grow: 1; */
  align-items: center;
}
.active-content-right span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
}
.active-content-btn {
  border: 1px #ff7e00 solid;
  color: #ff7e00;
  padding: 5px 10px;
  font-size: 12px;
}
.no-data {
  text-align: center;
  margin-top: 20vh;
  font-size: 14px;
  color: #999;
}
.active-voleenter{
  position: absolute;
  top:45px;
  right: 0;
  width: 75px;
  height: 35px;
  line-height: 35px;
  background: #ff7e00;
  font-size: 14px;
  text-align: center;
  color: #fff;
  padding:0 5px; 
}
</style>
