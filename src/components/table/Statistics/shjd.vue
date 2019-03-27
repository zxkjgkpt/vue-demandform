<template>
  <div id="shjd">
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

  // 引入公共的bus，来做为中间传达的工具
  import Bus from '../bus/bus'

  export default {
    name: 'shjd',
    data(){
      return{

      }
    },
    methods:{
    },
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

          if (params.name != '总数'){
            if (params.name == '正常'){
              params.name = '1';
            }else if (params.name == '即将到期'){
              params.name = '2';
            }else if (params.name == '已逾期'){
              params.name = '3';
            }else if (params.name == '新建'){
              params.name = '0';
            }else if (params.name == '完成'){
              params.name = '4';
            }

            //公共bus.js，用于非父子组件进行传值
            Bus.$emit('shjdValue', params.name)
          }
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
