<template>
<div class="detail">

<section>
           <div class="content-list"  v-if="detailData">
                 <p>{{detailData.news_title}}</p>
                 <span>{{detailData.create_time}}</span>
                 <div v-html="detailData.news_content" class="detail-container"></div>
            </div>
             <div class="nodata" v-if="!detailData">
                暂无消息~
            </div>
       </section>
</div>  
</template>
<script>
import { RequestGovNewsDetail } from "../../../fetch/modules/service";
export default {
  data() {
    return {
      detailData: {}
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      RequestGovNewsDetail({ news_id: this.$route.query.id }).then(res => {
        console.log(res.data);
        this.detailData = res.data;
      });
    }
  }
};
</script>
<style  scoped>
.content-list {
  padding: 15px 15px 10px 15px;
}
.content-list p {
  color: #000;
}
.content-list span {
  display: block;
  margin-top: 5px;
  font-size: 14px;
  color: #c7c7c7;
}
.detail-container {
  margin: 20px 0;
}

.detail-container>>>img {
  width: 100% !important;
}

.detail-container>>>p {
  line-height: 20px !important;
  font-size: 14px !important;
  /* text-indent: 10px!important; */
  font-family: Arial, Helvetica, sans-serif !important;
}

.detail-container>>>.wxParse-p div {
  font-size: 14px !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
.detail-container>>>h1 {
  font-size: 18px !important;
  margin: 5px 0 !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
.detail-container>>>.article-sub {
  margin-bottom: 10px !important;
}
</style>
