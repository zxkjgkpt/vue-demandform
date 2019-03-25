<template>
  <div id="zttj">
    <!--<Table-->
    <!--size="small"-->
    <!--border-->
    <!--:height="200"-->
    <!--highlight-row-->
    <!--ref="currentRowTableByTB"-->
    <!--:columns="columnsByTB"-->
    <!--:data="dataByTB"-->
    <!--@on-row-dblclick="showData">-->
    <!--</Table>-->
    <div id="myChartByzttj" :style="{width: '100%', height: '300px',float: 'left'}"></div>
  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图组件
  require('echarts/lib/chart/bar');
  // 引入title组件
  require('echarts/lib/component/title');
  //引入图例组件
  require("echarts/lib/component/legend");


  export default {
    name: 'zttj',
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
        let myChart = echarts.init(document.getElementById('myChartByzttj'))
        // 绘制图表
        myChart.setOption({
          legend: {
            data: ['数量\n百分比']
          },
          color: ['#3398DB'],
          title: {text: '状态统计数量'},
          xAxis: {
            data: ["新建", "省级审核中", "省级审核未通过", "网级审核中", "网级审核未通过", "审核通过", "作废申请-省级审核中", "作废申请-网级审核中", "已作废", "总数"],
            axisLabel: {
              interval: 0,
              formatter: function (value) {
                var ret = "";//拼接加\n返回的类目项
                var maxLength = 4;//每项显示文字个数
                var valLength = value.length;//X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowN > 1)//如果类目项的文字大于3,
                {
                  for (var i = 0; i < rowN; i++) {
                    var temp = "";//每次截取的字符串
                    var start = i * maxLength;//开始截取的位置
                    var end = start + maxLength;//结束截取的位置
                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + "\n";
                    ret += temp; //凭借最终的字符串
                  }
                  return ret;
                } else {
                  return value;
                }
              }
            }
          },
          yAxis: {},
          series: [{
            name:'数量\n百分比',
            type: 'bar',
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 450],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {//数值样式
                    color: 'black',
                    fontSize: 16
                  },
                  formatter: function (value) {
                    return value.value + '\n' + (value.value / 450 * 100).toFixed(2) + '%'
                  }
                }
              }
            }
          }]
        });
        myChart.on('dblclick', function (params) {
          console.log(params);
        })
      }
    }
  }
</script>

<style scoped>
  #zttj {
    width: 50%;
    float: left;
  }
</style>
