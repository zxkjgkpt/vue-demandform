<template>
  <div id="zttj">
    <Table border :height="200" highlight-row ref="currentRowTableByTB" :columns="columnsByTB" :data="dataByTB" @on-row-dblclick="showData"></Table>
  </div>
</template>

<script>
  export default {
    name: 'zttj',
    data(){
      return{
        columnsByTB: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        dataByTB: this.get100Datas(10),
      }
    },
    methods:{
      get100Datas(pageSize){
        let data = [];
        for (let i = 1; i <= pageSize ; i++) {
          let a = {
            name: 'John Brown 填报' + Math.floor(Math.random () * 100 + 1),
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          };
          data.push(a);
        }
        return data;
      },
      showData(data,index){
        console.log(data);
        console.log(index);
      }
    }
  }
</script>

<style scoped>
#zttj{
  width: 50%;
  float: left;
}
</style>
