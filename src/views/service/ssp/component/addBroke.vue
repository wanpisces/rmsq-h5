<template>
  <div class="add-baoliao">
    <div action="javascript:;">
      <div class="add-text-wrap">
        <textarea class="mine-bltext" placeholder="对爆料内容进行描述，如发生时间、精确位置和详情等相关信息" name="" id="" cols="30" rows="10" v-model="formSubmit.case_content"></textarea>
      </div>
      <div class="add-photo">
        <div class="add-photo-item" v-for="(item,index) in formSubmit.case_pic" :key="index">
          <div class="photo-vession">
            <img :src="baseUrl+item" alt="">
          </div>
          <div class="deletePhoto" @click="deletePhoto(index)"><img src='../../../../../static/img/cancel_img.png'></div>
        </div>
        <div v-if="formSubmit.case_pic.length<9" class="add-photo-item">
          <van-uploader :after-read="onRead" accept="image/gif,image/png, image/jpeg" multiple class="vanUpload">
            <van-icon name="photograph" />
          </van-uploader>
          <div class="photo-vession">
            <img src="../../../../../static/img/camera.png" alt="">
          </div>
        </div>
      </div>
      <div class="topic-classfiy" @click="showAddLocation">
        <div class="add-line">
          <span>发生地点</span>
          <small>请选择发生地点</small>
        </div>
        <img class="add_location" src="../../../../../static/img/add_location.png" alt="">
      </div>
      <div class="topic-classfiy" @click="showClassfiy">
        <div class="add-line">
          <span>主题分类</span>
          <small>{{classfiyText}}</small>
        </div>
        <img class="touch-more" src="../../../../../static/img/touch_more.png" alt="">
      </div>
      <div class="submit-btn" @click="submitForm">提 交</div>
      <van-popup v-model="show" position="bottom" :overlay="true">
        <div class="sure-wrap">
          <span @click="sureAttr">确定</span>
        </div>
        <van-picker :columns="columns" @change="onChange" value-key="attr_value" />
      </van-popup>
      <van-popup v-model="addShow" position="bottom" :overlay="true" class="add-location">
        <div class="sure-wrap">
          <span @click="sureLoction">确定</span>
        </div>
        <!-- <van-picker :columns="columns" @change="onChange" value-key="attr_value" /> -->
        <el-amap vid="amapDemo">
          <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position">
          </el-amap-marker>
        </el-amap>
      </van-popup>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VueAMap from "vue-amap";
import { Toast } from "vant";
import { Uploader, Icon, Popup, Picker } from "vant";
import { RequestUploads } from "../../../../fetch/modules/public.js";
import {
  RequestServiceAttr,
  RequestSubmitCase
} from "../../../../fetch/modules/service.js";
Vue.use(Uploader)
  .use(Icon)
  .use(Popup)
  .use(Picker)
  .use(VueAMap)
  .use(Toast);
VueAMap.initAMapApiLoader({
  key: "YOUR_KEY",
  plugin: [
    "Autocomplete",
    "PlaceSearch",
    "Scale",
    "OverView",
    "ToolBar",
    "MapType",
    "PolyEditor",
    "AMap.CircleEditor"
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4"
});
export default {
  data() {
    return {
      classfiyText: "请选择主题分类",
      baseUrl: "",
      show: false,
      addShow: false,
      curAttr: {},
      formSubmit: {
        case_pic: [],
        case_addr: "盛大国际"
      },
      columns: [],
      markers: []
    };
  },
  created() {
    //   this.formSubmit = {};
  },
  mounted() {
    // 姑且N为2
    // 这样地图上就添加了两个人
    this.markers = [
      {
        position: [121.5273285, 31.21515044]
      },
      {
        position: [121.5273286, 31.21515045]
      }
    ];
  },
  methods: {
    getAttr() {
      RequestServiceAttr({ pid: 0 }).then(res => {
        this.columns = res.data;
        this.show = true;
        this.curAttr = res.data[0];
      });
    },
    submitForm() {
      var args = this.formSubmit;
      if (!args.case_content) {
        Toast("请输入爆料内容");
        return false;
      }
      if (!args.attr_id) {
        Toast("请选择主题分类");
        return false;
      }
      RequestSubmitCase(this.formSubmit).then(res => {
        if (res.code == 2000) {
          this.$emit("switchIndex", { index: 2 });
        }
      });
    },
    sureAttr() {
      this.show = false;
      this.formSubmit.attr_id = this.curAttr.attr_id;
      this.classfiyText = this.curAttr.attr_value;
    },
    //地址确定
    sureLoction() {
      this.addShow = false;
    },
    // 上传图片
    onRead(obj) {
      let formData = new FormData();
      formData.append("file", obj.file);
      RequestUploads(formData).then(res => {
        this.baseUrl = res.data.base_url;
        this.formSubmit.case_pic.push(res.data.key);
      });
    },
    //删除图片
    deletePhoto(index) {
      this.formSubmit.case_pic.splice(index, 1);
    },
    //展示分类
    showClassfiy() {
      this.getAttr();
    },
    //选择分类
    onChange(picker, value, index) {
      this.curAttr = value;
      //   Toast(`当前值：${value}, 当前索引：${index}`);
    },
    //选择地址
    showAddLocation() {
      this.addShow = true;
    }
  }
};
</script>
<style scoped>
.topic-classfiy {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  padding: 0 15px;
  height: 50px;
  border-radius: 2px;
  background: #fff;
  border-bottom: 1px solid #f9f7f8;
}
.add-location {
  width: 100%;
  height: 100%;
}
.submit-btn {
  text-align: center;
  margin: 40px auto;
  width: 300px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  border-radius: 30px;
  background: #ff7030;
}
.sure-wrap {
  text-align: right;
  padding: 10px 10px;
}
.sure-wrap span {
  font-size: 16px;
  color: #2dbaf0;
}
.add-line span {
  margin-right: 15px;
  font-size: 14px;
  color: #353535;
}
.add-line small {
  font-size: 12px;
  color: #353535;
}
.touch-more {
  width: 20px;
  height: 20px;
}
.add_location {
  width: 22px;
  height: 22px;
}
.add-baoliao {
  height: 100%;
  background: #f9f7f8;
}
.add-text-wrap {
  display: flex;
  justify-content: center;
}
.deletePhoto {
  position: absolute;
  top: -8px;
  right: -4px;
}
.deletePhoto img {
  width: 15px;
  height: 15px;
}
.mine-bltext {
  margin-top: 10px;
  width: 90%;
  padding: 10px;
  height: 100px;
  font-size: 12px;
  background: #fff;
}
.add-photo {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  padding: 15px 0 15px 10px;
}
.add-photo-item {
  position: relative;
  margin-right: 8px;
  margin-bottom: 10px;
}
.vanUpload {
  position: absolute;
  width: 65px;
  height: 65px;
  opacity: 0;
}

.photo-vession img {
  width: 65px;
  height: 65px;
  background: #fff;
}
</style>
