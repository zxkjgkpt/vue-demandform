<template>
  <div id="table_zl">
    <Table
      size="small"
      border
      highlight-row
      :height="450"
      ref="currentRowTableByZL"
      :columns="columnsByZL"
      :data="dataByZL">
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          size="small"
          :total="100"
          :current="1"
          show-sizer></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'table_zl',
    data(){
      return{
        columnsByZL: [
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
        dataByZL: this.get100Datas(),
      }
    },
    methods:{
      get100Datas(){
        let data = [];
        for (let i = 1; i <= 100 ; i++) {
          let a = {
            name: 'John Brown 总览' + i,
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          };
          data.push(a);
        }
        return data;
      }
    }
  }
</script>

<style scoped>

</style>
