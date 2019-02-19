<template>
    <div>
        <div class='emptydiv' v-if="icon == 1">
            <img style='width:170px;height: 140px;' src='../../../static/img/nodata.png'>
            <div style='margin:10px;color:#999;font-size:14px;'>暂无数据</div>
        </div>
        <div class='emptyView2' v-if="icon == 2">
            <img style="width:50px;height: 50px;" src='../../../static/img/nodata.png'>
            <div style='margin:10px;color:#999;font-size:14px;'>暂无数据</div>
        </div>
    </div>
  
</template>
<script>
export default {
    props:{
        icon:{
            type:String,
            default: "2",
        }
    },
  created() {
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
<style scoped>
    .emptydiv {
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        flex-flow: column;
        margin-top: 150px;
        justify-content: center;
        align-items: center;
    }
    .emptyView2 {
        padding: 10px 0 30px;
        display: flex;
        background: #fff;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        margin: 30px;
        flex-grow: 1;
    }
</style>