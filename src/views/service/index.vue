<template>
  <div>
    <!-- 服务列表 -->
    <section class="service-list">
      <div>
        <span class="service-category-name">为您推荐</span>
        <div class="service-list-content">
          <div v-for="(itemsChildren,indexChildren) in serviceData.recom_service" v-if="serviceData.recom_service.length!=0" :key="indexChildren" @click="chooice(itemsChildren)">
            <img :src="itemsChildren.service_pic" alt="">
            <p>{{itemsChildren.service_title}}</p>
          </div>
        </div>
        <div class="service-line"></div>
      </div>
      <div>
        <span class="service-category-name my-service">
          <span>我的服务</span>
          <span @click="handleEditor">编辑</span>
        </span>
        <div class="service-list-content">
          <div v-for="(itemsChildren,indexChildren) in serviceData.my_service" v-if="serviceData.my_service.length!=0" :key="indexChildren" @click="chooice(itemsChildren)">
            <img :src="itemsChildren.service_pic" alt="">
            <p>{{itemsChildren.service_title}}</p>
          </div>
          <div v-if="serviceData.my_service.length==0" class="no-data">
            暂无服务，快去编辑吧
          </div>
        </div>
        <div class="service-line"></div>
      </div>

      <div v-for="(items,index) in  serviceData.exists_service_category" :key="index">
        <span class="service-category-name">{{items.category_name}}</span>
        <div class="service-list-content">
          <div v-for="(itemsChildren,indexChildren) in items.service_list" :key="indexChildren" @click="chooice(itemsChildren)">
            <img :src="itemsChildren.service_pic" alt="">
            <p>{{itemsChildren.service_title}}</p>
          </div>
        </div>
        <div class="service-line"></div>
      </div>
    </section>
    <div style="height:50px;"></div>
    <nav-bar show-index="1"></nav-bar>
    <div class="bottom-top"></div>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
// 自定义组件
import navBar from "../../components/common/navBar.vue";
// service数据接口
import { RequestService } from "../../fetch/modules/service";
export default {
  components: { navBar },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 index 不缓存，即刷新
    next();
  },
  data() {
    return {
      serviceData: {
        recom_service: [],
        my_service: [],
        exists_service_category: []
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var group_id = localStorage.getItem("group_id");
      // var group_id = "455505765868765184";
      RequestService({ group_id: group_id }).then(res => {
        let _data = res.data.exists_service_category;
        // _data.map((item, index) => {
        //   if ("service_list" in item) {
        //     for (let i = 0; i < item.service_list.length; i++) {
        //       if (item.service_list[i].service_web_state == 2) {
        //         item.service_list.splice(i, 1);
        //         i--;
        //       }
        //     }
        //   }
        // });
        this.serviceData = res.data;
      });
    },
    chooice(data) {
      /**
       * 1. 网页端跳转方式 0不跳转 1原生 2H5
       */
      /**
       * 1. 网页端跳转方式 0不跳转 1原生 2H5
       */
      if (data.service_mini_run == 0) {
        Toast("开发中，敬请期待！");
      } else if (data.service_mini_run == 1) {
        if (data.service_title == "办事指南") {
          this.$router.push({ name: "guideline" });
        } else if (data.service_title == "政务公开") {
          this.$router.push({ name: "openGov" });
        } else if (data.service_title == "社区随手拍") {
          this.$router.push({ name: "ssp" });
        } else if (data.service_title == "社区活动") {
          this.$router.push({ name: "active" });
        } else {
          Toast("请在小程序端打开");
        }
      } else if (data.service_mini_run == 2) {
        window.location.href = data.service_web_url;
      } else {
        Toast("请在小程序端打开");
      }
    },
    handleEditor() {
      this.$router.push({ path: "serviceEditor" });
    }
  }
};
</script>
<style scoped>
.service-list {
  /* padding: 0 13px; */
}
.service-category-name {
  font-size: 15px;
  font-weight: 600;
  display: inline-block;
  padding: 15px 13px 0 13px;
}
.service-list-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.service-list-content div {
  width: 25%;
  text-align: center;
  font-size: 13px;
  padding: 15px 0 0 0;
}
.service-list-content img {
  width: 40px;
}
.service-line {
  margin-top: 15px;
  height: 10px;
  background: #f4f4f4;
}
.my-service {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.my-service :nth-child(2) {
  padding: 2px 20px;
  border-radius: 20px;
  background: #f0f1f6;
  color: #17b1ed;
  font-weight: normal;
  font-size: 14px;
}
.no-data {
  width: 100% !important;
  text-align: center;
  color: #999;
  padding: 30px 0 !important;
}
.service-list-content p {
  margin-top: 3px;
}
</style>