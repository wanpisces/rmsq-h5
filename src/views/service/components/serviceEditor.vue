<template>
  <div>
    <!-- 服务列表 -->
    <section class="service-list">
      <div>
        <span class="service-category-name my-service">
          <span>我的服务</span>
          <span @click="handleSuccess">完成</span>
        </span>
        <div class="service-list-content">
          <div v-for="(itemsChildren,indexChildren) in serviceData.my_service" v-if="serviceData.my_service.length!=0" :key="indexChildren" @click="handleDelete(itemsChildren)">
            <img :src="itemsChildren.service_pic" alt="">
            <p>{{itemsChildren.service_title}}</p>
            <img class="add-delete" src="../../../../static/img/service-delete.png" alt="">
          </div>
          <div v-if="serviceData.my_service.length==0" class="no-data">
            暂无服务，快去添加吧
          </div>
        </div>
        <div class="service-line"></div>
      </div>

      <div v-for="(items,index) in  serviceData.exists_service_category" :key="index">
        <span class="service-category-name">{{items.category_name}}</span>
        <div class="service-list-content">
          <div v-for="(itemsChildren,indexChildren) in items.service_list" :key="indexChildren" @click="handleChooice(itemsChildren)">
            <img :src="itemsChildren.service_pic" alt="">
            <p>{{itemsChildren.service_title}}</p>
            <img v-if="itemsChildren.is_select!=1" class="add-delete" src="../../../../static/img/service-add.png" alt="">
            <img v-else class="add-delete" src="../../../../static/img/service-delete.png" alt="">
          </div>
        </div>
        <div class="service-line"></div>
      </div>
    </section>
    <!-- <div style="height:50px;"></div>
        <nav-bar show-index="1"></nav-bar>
        <div class="bottom-top"></div> -->
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
// 自定义组件
import navBar from "../../../components/common/navBar.vue";
// service数据接口
import { RequestService, RequestServiceEditor } from "../../../fetch/modules/service";
import { UserLogin } from "../../../fetch/modules/login";
import { setToken, getToken } from "../../../fetch/auth.js";
//基本配置
import { baseUrl } from "../../../fetch/config";
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
        my_service: [],
        exists_service_category: []
      },
      group_id: localStorage.getItem("group_id") || 1
    };
  },
  created() {
    var query = this.$route.query;
    console.log(query);
    if (query.token) {
      console.log("1111111111");
      setToken(query.token);
    }
    this.getData();
  },
  methods: {
    getData() {
      var group_id = localStorage.getItem("group_id");
      RequestService({ group_id: group_id }).then(res => {
        this.serviceData = res.data;
      });
    },
    handleDelete(val) {
      this.addDelete(val);
    },
    handleChooice(data) {
      if (data.is_select == 2) {
        data.is_select = 1;
        this.serviceData.my_service.push(data);
      } else {
        this.addDelete(data);
      }
    },
    addDelete(val) {
      this.serviceData.my_service.map((item, index) => {
        if (val.service_id == item.service_id) {
          this.serviceData.my_service.splice(index, 1);
        }
      });
      this.serviceData.exists_service_category.map((item, index) => {
        item.service_list.map((itemChildren, inde) => {
          if (itemChildren.service_id == val.service_id) {
            itemChildren.is_select = 2;
          }
        });
      });
    },
    handleSuccess() {
      if (getToken()) {
        let _serviceArr = [];
        !!this.serviceData.my_service &&
          this.serviceData.my_service.forEach((items, index) => {
            _serviceArr.push(items.service_id);
          });
        let _args = {
          service_id: _serviceArr,
          group_id: this.group_id
        };
        RequestServiceEditor(_args).then(res => {
          if (res.code === 2000) {
            this.$router.push({ path: "service" });
          }
        });
      } else {
        this.getUser();
      }
    },
    // 授权
    getUser() {
      UserLogin({ redirect_uri: baseUrl + "/serviceEditor" }).then(res => {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          // 跳转到微信授权页面
          window.location.href = res.data.url;
        }
      });
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
  position: relative;
  width: 20%;
  text-align: center;
  font-size: 12px;
  margin: 15px 0 0px 0;
  padding: 5px 0;
  margin-left: 4%;
  background: #f2f2f2;
}
.service-list-content img:nth-child(1) {
  width: 40px;
}
.add-delete {
  position: absolute;
  right: -4px;
  top: -4px;
  width: 13px;
}
.service-list-content p {
  margin-top: 3px;
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
  background: #fff !important;
}
</style>
