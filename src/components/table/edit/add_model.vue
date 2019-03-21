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
      showSingleData(){
        //父组件点击ok调用新增方法
        console.log(this.singleData);
        //执行后台数据新建


        this.closeModal();
      },
      deleteSingleData(){
        //父组件点击cancel调用方法
        this.closeModal();
      },
      //关闭模态框，把数据清空
      closeModal(){
        this.singleData = {};
      }
    },
  }
</script>

<style scoped>

</style>
