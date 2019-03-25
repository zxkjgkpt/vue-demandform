<template>
  <div id="shjd">
    <!--<Table-->
      <!--size="small"-->
      <!--border-->
      <!--:height="200"-->
      <!--highlight-row-->
      <!--ref="currentRowTableByTB"-->
      <!--:columns="columnsByTB"-->
      <!--:data="dataByTB"-->
      <!--@on-row-dblclick="showData" >-->
    <!--</Table>-->
    <div id="myChartByshjd" :style="{width: '100%', height: '300px' ,float: 'right'}"></div>
  </div>
</template>

<script>

  //引入基本模板
  let echarts = require('echarts/lib/echarts');
  //引入柱状图组件
  require('echarts/lib/chart/bar');
  //引入title组件
  require('echarts/lib/component/title');
  //引入图例组件
  require("echarts/lib/component/legend");


  export default {
    name: 'shjd',
    // data(){
    //   return{
    //     columnsByTB: [
    //       {
    //         type: 'index',
    //         width: 60,
    //         align: 'center'
    //       },
    //       {
    //         title: 'Name',
    //         key: 'name'
    //       },
    //       {
    //         title: 'Age',
    //         key: 'age'
    //       },
    //       {
    //         title: 'Address',
    //         key: 'address'
    //       }
    //     ],
    //     dataByTB: this.get100Datas(4),
    //   }
    // },
    // methods:{
    //   get100Datas(pageSize){
    //     let data = [];
    //     for (let i = 1; i <= pageSize ; i++) {
    //       let a = {
    //         name: 'John Brown 填报' + Math.floor(Math.random () * 100 + 1),
    //         age: 18,
    //         address: 'New York No. 1 Lake Park',
    //         date: '2016-10-03'
    //       };
    //       data.push(a);
    //     }
    //     return data;
    //   },
    //   showData(data,index){
    //     console.log(data);
    //     console.log(index);
    //   }
    // }
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChartByshjd'))
        // 绘制图表
        myChart.setOption({
          legend: {
            data: ['数量\n百分比']
          },
          color: ['#3398DB'],
          title: { text: '审核进度统计数量' },
          xAxis: {
            data: ["新建", "正常", "即将到期", "已逾期", "完成","总数"]
          },
          yAxis: {},
          series: [{
            name:'数量\n百分比',
            type: 'bar',
            data: [6, 2, 60, 10, 90,168],
            itemStyle:{
              normal:{
                label:{
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle:{//数值样式
                    color: 'black',
                    fontSize: 16
                  },
                  formatter:function (value) {
                    return value.value + '\n' + (value.value/168*100).toFixed(2) + '%'
                  }
                }
              }
            }
          }]
        });
        myChart.on('dblclick',function (params) {
          console.log(params);
        })
      }
    }
  }
</script>

<style scoped>
  #shjd{
    width: 50%;
    float: right;
  }
</style>
