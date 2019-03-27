//公共bus.js，用于非父子组件进行传值
import Vue from 'vue'
export default new Vue()


//重置
Vue.prototype.reset = function(thisVue){
  thisVue.selectValue = '';
  for (let showSelectInputKey in thisVue.showSelectInput) {
    thisVue.showSelectInput[showSelectInputKey] = false;
  }

  for (let queryParamKey in thisVue.queryParam) {
    if (queryParamKey == 'cjrid' || queryParamKey == 'cxbz'){
      continue;
    }else if (queryParamKey == 'zylbArray') {
      thisVue.queryParam[queryParamKey] = [];
    } else {
      thisVue.queryParam[queryParamKey] = null;
    }
  }

  return thisVue;
};
//获取下拉框选中的值
Vue.prototype.getItemValue = function(val,showSelectInput){
  if (val == 0){
    showSelectInput.xqzs = true;
  }
  if (val == 1){
    showSelectInput.sqrxm = true;
  }
  if (val == 2){
    showSelectInput.gdzt = true;
  }
  if (val == 3){
    showSelectInput.fjbz = true;
  }
  if (val == 4){
    showSelectInput.shjd = true;
  }
  if (val == 5){
    showSelectInput.wshr = true;
  }
  if (val == 6){
    showSelectInput.zylbArray = true;
  }

  return showSelectInput;
};
//创建柱状图
Vue.prototype.createEcharts = function(type,myChart,title,data){
  let xAxisData = [];
  if (type == 'zttj'){
    xAxisData = ["新建", "省级审核中", "省级审核未通过", "网级审核中", "网级审核未通过", "审核通过", "作废申请-省级审核中", "作废申请-网级审核中", "已作废", "总数"];
  } else if (type == 'shjd'){
    xAxisData = ["新建", "正常", "即将到期", "已逾期", "完成","总数"];
  }
  myChart.setOption({
    legend: {
      data: ['数量\n百分比']
    },
    color: ['#3398DB'],
    title: {text: title},
    xAxis: {
      data: xAxisData,
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
      data:data,
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
              return value.value + '\n' + (value.value / data[data.length-1] * 100).toFixed(2) + '%'
            }
          }
        }
      }
    }]
  });

  return myChart;
};
//获取状态统计柱状图的转换值
Vue.prototype.transformByzttj = function (params) {
  if (params == '省级审核中'){
    params = 'ProAudit';
  }else if (params == '省级审核未通过'){
    params = 'ProModif';
  }else if (params == '网级审核中'){
    params = 'PowerAudit';
  }else if (params == '网级审核未通过'){
    params = 'PowerModif';
  }else if (params == '审核通过'){
    params = 'Pass';
  }else if (params == '作废申请-省级审核中'){
    params = 'ProCancel';
  }else if (params == '作废申请-网级审核中'){
    params = 'PowerCancel';
  }else if (params == '已作废'){
    params = 'Cancel';
  }else if (params == '新建'){
    params = 'New';
  }
  return params;
};
//获取审核进度柱状图的转换值
Vue.prototype.transformByshjd = function (params) {
  if (params == '正常') {
    params = '1';
  } else if (params == '即将到期') {
    params = '2';
  } else if (params == '已逾期') {
    params = '3';
  } else if (params == '新建') {
    params = '0';
  } else if (params == '完成') {
    params = '4';
  }
  return params;
};
