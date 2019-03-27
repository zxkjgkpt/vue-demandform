<template>
  <div id="zttjByzl">
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
    name: 'zttjByzl',
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
        myChart = Bus.createEcharts('zttj',myChart,'状态统计数量',[70, 20, 30, 40, 50, 60, 70, 80, 90, 510]);
        //双击柱状图事件
        myChart.on('dblclick', function (params) {
          if (params.name != '总数'){
            let zttjValueByTB = Bus.transformByzttj(params.name);
            //公共bus.js，用于非父子组件进行传值
            Bus.$emit('zttjValueByZL', zttjValueByTB)
          }
        })
      }
    }
  }
</script>

<style scoped>
  #zttjByzl {
    width: 50%;
    float: left;
  }
</style>
