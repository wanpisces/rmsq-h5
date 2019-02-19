<template>
  <div>

    <div>
      <div class="search-street">
        <span>当前位置</span>
      </div>
      <div>
        <p class="no-data">{{ address||'暂无相关位置'}}</p>
      </div>
      <div class="search-street">
        <span>切换位置</span>
      </div>
      <div>
        <div>
          <div class="adddress-choose">
            <div v-for="(items,index) in titleItem" :key="index" v-if="items.region_name_c" @click="chooseTitle(items)">
              <span>{{items.region_name_c}}</span>
            </div>
          </div>

        </div>
      </div>
      <div class="show-area">
        <div id="area" v-for="(items,index) in areaData" :key="index" :class="[items.is_open!=2? 'choice-area':'choice-area choice-area-no']" @click="chooseTab(items)" v-if="areaData.length!=0">
          <span v-if="items.region_name_c">{{items.region_name_c}}</span>
          <img src="./../../../static/img/checked.png" width="20px" height="20px" alt="" v-if="items.id==areaId.id">
        </div>
        <div v-if="areaData.length==0" class="no-data2">
          暂无下一级数据
        </div>
      </div>

    </div>

    <div class="footer" v-if="level!=6 || areaData.length!=0">
      <div class="footer-choice-sure" @click="chooseLink()">确定选择</div>
      <div @click="goNext()">下一级</div>
    </div>
    <div class="footer-two" v-if="level==6 || areaData.length==0">
      <div class="footer-choice-sure" @click="chooseLink()">确定选择</div>
    </div>

  </div>
</template>
<script>
import Vue from "vue";
import { Search, Dialog, Toast } from "vant";
Vue.use(Search)
  .use(Dialog)
  .use(Toast);
// service  是数据请求
import {
  RequestSearchAddressList,
  RequestAreaList
} from "./../../fetch/modules/index";
let self;
export default {
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 index 不缓存，即刷新
    next();
  },
  data() {
    self = this;
    return {
      areaData: [],
      areaId: {},
      titleItem: [{}, {}, {}, {}, {}], // 显示title,
      level: "1", // 父级ID 0=查询所有省
      upper: 0, // 层级ID 层级 0 1 2 3 4 国省市区县街,
      address: ""
    };
  },
  created() {
    let self = this,
      areaId = "",
      tmpArr = [];
    if (localStorage.getItem("area")) {
      this.titleItem = JSON.parse(localStorage.getItem("area"));
      tmpArr = JSON.parse(localStorage.getItem("area"));
      for (const key in this.titleItem) {
        if (this.titleItem.hasOwnProperty(key)) {
          this.titleItem[key].merger_name
            ? (this.address = this.titleItem[key].merger_name)
            : "";
          this.titleItem[key].level
            ? (this.level = this.titleItem[key].level)
            : "";
          this.titleItem[key].id ? (areaId = this.titleItem[key]) : "";
          this.titleItem[key].upper_region
            ? (this.upper = this.titleItem[key].upper_region)
            : "";
          console.log(this.upper, this.level);
        }
      }
      this.getArea(function() {
        self.areaId = areaId;
        (self.level = +areaId.level + 1), (self.upper = areaId.id);
      });
    } else {
      this.getArea(function() {});
    }
  },
  methods: {
    // 省市区域街道联动
    getArea(callback) {
      let args = {
        upper_region: this.upper,
        level: this.level
      };
      RequestAreaList(args).then(res => {
        this.areaData = res.data || [];
        if (res.data.length != 0) {
          this.areaId = res.data[0];
          this.upper = res.data[0].id;
          this.level = +res.data[0].level + 1;
          this.titleItem[this.level - 2] =
            Object.keys(this.titleItem[this.level - 2]).length == 0
              ? res.data[0]
              : this.titleItem[this.level - 2];
          callback();
        }
      });
    },
    // 选择省市街道
    chooseTab(items) {
      if (items.id == this.areaId.id) {
      } else {
        this.areaId = items;
        this.upper = items.id;
        this.titleItem.map((items, index) => {
          if (this.level - 2 < index) {
            this.titleItem[index] = {};
          }
        });
      }
      this.titleItem[this.level - 2] = items;
    },
    goNext() {
      this.getArea(function() {});
    },

    chooseTitle(value) {
      this.level = value.level;
      this.upper = value.upper_region;
      this.getArea(function() {
        self.areaId = value;
        self.upper = value.id;
      });
    },
    chooseLink() {
      localStorage.setItem(
        "address_name",
        this.titleItem[this.level - 2].region_name_c
      );
      localStorage.setItem("group_id", this.titleItem[this.level - 2].group_id);
      this.titleItem.map((items, index) => {
        if (this.level - 2 < index) {
          this.titleItem[index] = {};
        }
      });
      localStorage.setItem("area", JSON.stringify(this.titleItem));
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.search {
  height: 10px;
  text-align: center;
  background: #f2f2f2;
}
.search-street {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  background: #f5f7fa;
  padding-left: 15px;
}
.search-content {
  height: 15.4vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  /* border: 1px red solid */
}
.no-data {
  height: 5vh;
  line-height: 5vh;
  font-size: 14px;
}
.search-content > div {
  display: flex;
  height: 25px;
  align-items: center;
  justify-content: space-between;
  padding: 0 13px;
  font-size: 13px;
  border-bottom: 1px #e5e5e5 solid;
}
.choice-name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  padding: 10px 0;
  border-bottom: 1px #e5e5e5 solid;
}
.choice-name div {
  border: 1px #e5e5e5 solid;
  padding: 2px 2px 2px 5px;
  margin: 0 5px;
  font-size: 13px;
}
.choice-name div:nth-child(1) {
  margin: 0 5px 0px 13px;
}
.choice-title {
  color: #66c6f2;
  border: 1px #66c6f2 solid !important;
}
.show-area {
  overflow-y: scroll;
  height: 70vh;
  margin-bottom: 50px;
}
.choice-area {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px #f2f2f2 solid;
  padding-left: 13px;
  color: #282828;
}
.choice-area-no {
  color: #e5e5e5;
}
#area {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.show-area > div > img {
  padding-right: 13px;
}
.footer,
.footer-two {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  line-height: 50px;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 14px;
}
.footer > div {
  width: 50%;
}
.footer-two > div {
  width: 100%;
}
.footer-choice {
  background: gainsboro;
}
.footer-choice-sure {
  background: #66c6f2;
}
.footer > div:nth-child(2) {
  background: #92a2f6;
}
.adddress-choose {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px;
}
.adddress-choose div {
  border: 1px #f2f2f2 solid;
  padding: 2px 3px;
  font-size: 13px;
  color: #999;
  margin-left: 5px;
}
.no-data2 {
  text-align: center;
  font-size: 13px;
  background: #f2f2f2;
  color: #999;
  margin: 10px 8px;
  padding: 10px 0;
}
.no-data {
  margin-left: 10px;
}
</style>