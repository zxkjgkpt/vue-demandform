<template>
  <div id="zttjBysh">
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
    name: 'zttjBysh',
    props: {
      cjrid: {
        type: String
      }
    },
    data(){
      return{
        zttjData: [],
        queryParamByZTTJ: {
          cjrid: this.cjrid
        }
      }
    },
    methods:{
      queryData() {
        this.$axios({
          // url: 'xqd/xqdxx/findXqdxxByAndCondition/',//请求的地址
          url: 'xqd/xqdxx/findSimpleListByAndCondition/',//请求的地址
          method: 'post',//请求的方式
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          data: JSON.stringify(this.queryParamByZTTJ), //请求参数
        }).then(res => {
          if (Bus.checkRespondAndDataNotNull(res)){
            let totalData = res.data.data;
            //状态数量
            let gdztNubmer = Bus.initGDZTArray(totalData);

            this.drawLine(gdztNubmer);
          }else {
            this.drawLine([]);
          }
        }).catch(err => {
          //console.info('报错的信息', err);
        }).then(function () {
          //最后总是执行的
        });
      },
      drawLine(gdztNubmer) {

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChartByzttj'));
        // 绘制图表
        myChart = Bus.createEcharts('zttj',myChart,'状态统计数量',gdztNubmer);
        //双击柱状图事件
        myChart.on('dblclick', function (params) {
          if (params.name != '总数'){
            let zttjValueBySH = Bus.transformByzttj(params.name);
            //公共bus.js，用于非父子组件进行传值
            Bus.$emit('zttjValueBySH', zttjValueBySH)
          }
        })
      }

    },
    mounted() {
      this.queryData();
      // this.drawLine();
    },
    created() {
      let thisVue = this;
      //解决事件多次绑定问题：在每次调用方法前先解绑事件( bus.$off )，然后在重新绑定( bus.$on )
      Bus.$off('queryZttjBySH');
      Bus.$on('queryZttjBySH', (data) => {
        if (data == true) {
          thisVue.queryData();
        }
      });
    }
  }
</script>

<style scoped>
  #zttjBysh {
    width: 100%;
    /*float: left;*/
  }
</style>
