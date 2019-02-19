<template>
    <div>
        <textarea name="textarea" id=""  rows="100" placeholder="提交问题，我们会尽快联系你哦~" v-model="formData.feedback_content"></textarea>
        <div class='submit-div'>
            <div style='flex-grow:1;'></div>
            <button class='contact-but' hover-class='none' open-type='contact' session-from="weapp">
            <img mode='widthFix' style='width:15px;' src='../../../static/img/service.png'>
            <span style='font-size:12px;color:#0eb6eb;margin-left:4px;'>在线客服</span>
            </button>
            <button class='tiwen' @click="formSubmit" size='mini'>提问</button>
        </div>
        <div class='kehu'>客服时间：工作日 上午09:30 —— 下午 17:30</div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast)
import { RequestFeedback } from "../../fetch/modules/index.js";
export default {
  created() {
  },
  data() {
    return {
      formData:{
        group_id:1,
        feedback_content:''
      }
    }
  },
  methods: {
     formSubmit(){
       var arg = this.formData;
       if(!arg.feedback_content){
         Toast('请输入你想反馈的问题')
         return;
       }
       RequestFeedback(arg).then(res => {
         if(res.code == 2000){
           Toast('提交成功，感谢您得反馈')
         }
       });
     }
  }
}
</script>
<style scoped>
  textarea {
  margin: 20px auto;
  background: #f8f8f8;
  padding:10px 5%;
  width: 85%;
  display: block;
  height: 140px;
  border-radius: 10px;
  font-size: 14px;
}

.holder {
  font-size: 26px;
  color: #c1c1c1;
}
.contact-but{
  margin: 0;
  padding: 0;
  background: #fff;
}
button[class='contact-but']::after{
  border: 0;
}
.submit-view {
  width: 710px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0px 0px 20px 0px;
}
.tiwen{
  background: #0eb6eb;
  color: #fff;
  padding: 4px 15px;
  border-radius: 4px;
  margin-left: 15px;
  margin-right: 10px;
  font-size: 12px;
}
.kehu{
  margin: 10px 0px 20px 20px;
  font-size: 12px;
  color: #999999;
}
.title-js {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  height: 90px;
}

.title-js text {
  font-size: 30px;
  color: #353535;
  margin-left: 20px;
}
.question{
  margin: 0px 20px 0px 20px;
}
.question view{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding: 10px;
}
.question view text{
  font-size: 28px;
  color: #353535;
  line-height: 70px;
}
.submit-div{
  display: flex;
  justify-content:flex-end;
}

</style>
