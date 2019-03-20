<template>
  <div id="add_model">
    <p>Name</p>
    <Input v-model="singleData.name"  placeholder="Enter something..." clearable  style="width: 300px" />
    <p>Age</p>
    <Input v-model="singleData.age"  placeholder="Enter something..." clearable  style="width: 300px" />
    <p>Address</p>
    <Input v-model="singleData.address"  placeholder="Enter something..." clearable  style="width: 300px" />
    <Upload  action="//jsonplaceholder.typicode.com/posts/">
      <Button  icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
  </div>
</template>

<script>
  export default {
    name: 'add_model',
    data(){
      return{
        singleData:{
          name:'',
          age:'',
          address:''
        }
      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
