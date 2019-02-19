<template>
    <div class="item-wrap">
        <div class="item-left">
            <div class="img-wrap"><img :src="img" alt=""></div>
            {{title}}
        </div>
        
        
    </div>
</template>

<script>
export default {
    props:{
        img:{
            type:String,
            default:'',
        },
        title:{
            type:String,
            default:'',
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
    .item-wrap{
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        padding:5px 10px;
        width: 100%;
        border-bottom: 1px solid #ddd;
    }
    .img-wrap{
        margin-right: 3px;
        width: 30px;
        height: auto;
        text-align: center;
    }
    .img-wrap img{
        height: 25px;
    }
    .item-left{
        display: flex;
        flex-flow: row;
        align-items: center;
        color: #4F4F4F;
        font-size: 16px;
    }
</style>
