<template>
  <div id="zttj">
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

  // 引入公共的bus，来做为中间传达的工具
  import Bus from '../bus/bus'


  export default {
    name: 'zttj',
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
                let ret = "";//拼接加\n返回的类目项
                let maxLength = 4;//每项显示文字个数
                let valLength = value.length;//X轴类目项的文字个数
                let rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowN > 1)//如果类目项的文字大于3,
                {
                  for (let i = 0; i < rowN; i++) {
                    let temp = "";//每次截取的字符串
                    let start = i * maxLength;//开始截取的位置
                    let end = start + maxLength;//结束截取的位置
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
        //双击柱状图事件
        myChart.on('dblclick', function (params) {
          if (params.name != '总数'){
            if (params.name == '省级审核中'){
              params.name = 'ProAudit';
            }else if (params.name == '省级审核未通过'){
              params.name = 'ProModif';
            }else if (params.name == '网级审核中'){
              params.name = 'PowerAudit';
            }else if (params.name == '网级审核未通过'){
              params.name = 'PowerModif';
            }else if (params.name == '审核通过'){
              params.name = 'Pass';
            }else if (params.name == '作废申请-省级审核中'){
              params.name = 'ProCancel';
            }else if (params.name == '作废申请-网级审核中'){
              params.name = 'PowerCancel';
            }else if (params.name == '已作废'){
              params.name = 'Cancel';
            }else if (params.name == '新建'){
              params.name = 'New';
            }
            //公共bus.js，用于非父子组件进行传值
            Bus.$emit('zttjValue', params.name)
          }
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
