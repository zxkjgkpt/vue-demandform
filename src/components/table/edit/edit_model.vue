<template>
  <div id="edit_model">
    <p>Name</p>
    <Input v-model="singleData.name" :disabled="isShowView" placeholder="Enter something..." clearable  style="width: 300px" />
    <p>Age</p>
    <Input v-model="singleData.age" :disabled="isShowView" placeholder="Enter something..." clearable  style="width: 300px" />
    <p>Address</p>
    <Input v-model="singleData.address" :disabled="isShowView" placeholder="Enter something..." clearable  style="width: 300px" />
    <Upload  action="//jsonplaceholder.typicode.com/posts/">
      <Button :disabled="isShowView" icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
  </div>
</template>

<script>
  export default {
    name: 'edit_model',
    props:{
      singleData:{
        type:Object,
      },
      isShowView:{
        type: Boolean
      }
    },
    data(){
      return{
      };
    },
    methods:{
      showSingleData(){
        //父组件点击ok调用方法
        console.log(this.singleData);
        //执行后台更新逻辑
      }
    }
  }
</script>

<style scoped>

</style>
