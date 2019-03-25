<template>
  <div id="table_sh">
    <Table
      size="small"
      border
      highlight-row
      :height="450"
      ref="currentRowTableBySH"
      :columns="columnsBySH"
      :data="dataBySH">
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          size="small"
          :total="100"
          :current="1"
          show-sizer>
        </Page>
        <!--<Page :total="100" :current="1" @on-change="changePage"></Page>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'table_sh',
    props:{
      tableType:{
        type:String,
      }
    },
    data(){
      return{
        columnsBySH: [
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
        dataBySH: this.get100Datas(),
      }
    },
    methods:{
      get100Datas(){
        let data = [];
        for (let i = 1; i <= 100 ; i++) {
          let a = {
            name: 'John Brown 审核' + i,
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          };
          data.push(a);
        }
        return data;
      }
    },
    created() {
      //请求后台获取需求单审核数据
      console.log(this.tableType);
    }
  }
</script>

<style scoped>

</style>
