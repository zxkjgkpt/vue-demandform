<template>
  <div id="shjdBytb">
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
    name: 'shjdBytb',
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
        myChart = Bus.createEcharts('shjd',myChart,'审核进度统计数量',[6, 2, 60, 10, 90,168]);
        myChart.on('dblclick',function (params) {
          if (params.name != '总数'){
            let shjdValueByTB = Bus.transformByshjd(params.name);
            //公共bus.js，用于非父子组件进行传值
            Bus.$emit('shjdValueByTB', shjdValueByTB);
          }
        })
      }
    }
  }
</script>

<style scoped>
  #shjdBytb{
    width: 100%;
    /*float: right;*/
  }
</style>
