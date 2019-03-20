<template>
  <div id="edit_model">
    <p>Name</p>
    <Input v-model="singleData.name" :disabled="singleData.isShowView" placeholder="Enter something..." clearable  style="width: 300px" />
    <p>Age</p>
    <Input v-model="singleData.age" :disabled="singleData.isShowView" placeholder="Enter something..." clearable  style="width: 300px" />
    <p>Address</p>
    <Input v-model="singleData.address" :disabled="singleData.isShowView" placeholder="Enter something..." clearable  style="width: 300px" />
    <Upload  action="//jsonplaceholder.typicode.com/posts/">
      <Button :disabled="singleData.isShowView" icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
  </div>
</template>

<script>
  export default {
    name: 'edit_model',
    props:{
      singleData:{
        type:Object,
        required:true
      }
    },
    data(){
      return{
      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
