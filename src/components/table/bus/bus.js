//公共bus.js，用于非父子组件进行传值
import Vue from 'vue'

export default new Vue()


//获取专业类别的List
Vue.prototype.getzylbList = function () {
  let zylbList = [
    {
      value: '0',
      label: '市场营销',
      children: [
        {
          value: '计量资产',
          label: '计量资产'
        },
        {
          value: '计量自动化',
          label: '计量自动化'
        },
        {
          value: '抄核收',
          label: '抄核收'
        },
        {
          value: '综合',
          label: '综合'
        },
        {
          value: '客服',
          label: '客服'
        }
        , {
          value: '市场交易',
          label: '市场交易'
        }
        , {
          value: '业扩',
          label: '业扩'
        }
      ]
    }
  ];
  return zylbList;
};
//获取审核进度的List
Vue.prototype.getshjdList = function () {
  let shjdList = [
    {
      value: '',
      label: '全部'
    },
    {
      value: '0',
      label: '新建'
    },
    {
      value: '1',
      label: '正常'
    },
    {
      value: '2',
      label: '即将到期'
    },
    {
      value: '3',
      label: '已逾期'
    },
    {
      value: '4',
      label: '完成'
    }
  ];
  return shjdList;
};
//获取有无附件的List
Vue.prototype.getfjbzList = function () {
  let fjbzList = [
    {
      value: '',
      label: '全部'
    },
    {
      value: 'YES',
      label: '有'
    },
    {
      value: 'NO',
      label: '无'
    }
  ];
  return fjbzList;
};
//获取状态的List
Vue.prototype.getgdztList = function () {
  let gdztList = [
    {
      value: '',
      label: '全部'
    },
    {
      value: 'New',
      label: '新建'
    },
    {
      value: 'Audit',
      label: '地市级审核中'
    },
    {
      value: 'ProAudit',
      label: '省级审核中'
    },
    {
      value: 'PowerAudit',
      label: '网级审核中'
    },
    {
      value: 'Pass',
      label: '审核通过'
    },
    {
      value: 'Modif',
      label: '地市级审核未通过'
    },
    {
      value: 'ProModif',
      label: '省级审核未通过'
    },
    {
      value: 'PowerModif',
      label: '网级审核未通过'
    }
  ];
  return gdztList;
};
//新增条件的list
Vue.prototype.getSelectList = function () {
  let selectList = [
    {
      value: '0',
      label: '需求单综述'
    },
    {
      value: '1',
      label: '申请人'
    },
    {
      value: '2',
      label: '状态'
    },
    {
      value: '3',
      label: '有无附件'
    },
    {
      value: '4',
      label: '审核进度'
    },
    {
      value: '5',
      label: '审核人'
    },
    {
      value: '6',
      label: '专业类别'
    }
  ];
  return selectList;
};
//表格的columns
Vue.prototype.getTableColumnsByType = function (type) {
  let columns = [
    {
      type: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '审核进度',
      key: 'shjd',
      tooltip: true,   //开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容
      render: (h, params) => {
        let temp = params.row.shjd;
        let color = '';
        switch (temp) {
          case 1:
            temp = '正常';
            color = '#01a8ec';
            break;
          case 2:
            temp = '即将到期';
            color = '#eea236';
            break;
          case 3:
            temp = '已逾期';
            color = 'red';
            break;
          case 0:
            temp = '新建';
            color = '#3a677a';
            break;
          case 4:
            temp = '完成';
            color = '#28ff23';
            break;
        }

        return h("div", [
          h(
            "div", {
              style: {
                float: 'left',
                backgroundColor: color,
                borderRadius: '100%',
                width: '15px',
                height: '15px',
                marginTop: '1px'
              }
            }, ''
          ),
          h(
            "span", {
              style: {
                marginLeft: '3px'
              }
            }
          ), temp
        ])
      }
    },
    {
      title: '需求单状态',
      key: 'gdzt',
      tooltip: true,
      width: 168,
      render: (h, params) => {
        let temp = params.row.gdzt;
        let color = '';
        switch (temp) {
          case 'New':
            temp = '新建';
            color = '#3a677a';
            break;
          case 'ProAudit':
            temp = '省级审核中';
            color = '#01a8ec';
            break;
          case 'ProModif':
            temp = '省级审核未通过';
            color = 'red';
            break;
          case 'PowerAudit':
            temp = '网级审核中';
            color = '#01a8ec';
            break;
          case 'PowerModif':
            temp = '网级审核未通过';
            color = 'red';
            break;
          case 'Pass':
            temp = '审核通过';
            color = '#28ff23';
            break;
          case 'ProCancel':
            temp = '作废申请-省级审核中';
            color = '#01a8ec';
            break;
          case 'PowerCancel':
            temp = '作废申请-网级审核中';
            color = '#01a8ec';
            break;
          case 'Cancel':
            temp = '已作废';
            color = 'red';
            break;

        }

        return h("div", [
          h(
            "div", {
              style: {
                float: 'left',
                backgroundColor: color,
                borderRadius: '100%',
                width: '15px',
                height: '15px',
                marginTop: '1px'
              }
            }, ''
          ),
          h(
            "span", {
              style: {
                marginLeft: '3px'
              }
            }
          ), temp
        ])
      }
    },
    {
      title: '需求单号',
      key: 'xqdh',
      tooltip: true
    },
    {
      title: '申请单位/业务部门',
      key: 'sqbmmc',
      tooltip: true
    },
    {
      title: '申请人',
      key: 'sqrxm',
      tooltip: true
    },
    {
      title: '申请人联系方式',
      key: 'sqrlxfs',
      tooltip: true
    },
    {
      title: '创建时间',
      key: 'cjsj',
      tooltip: true
    },
    {
      title: '需求单名称',
      key: 'xqmc',
      tooltip: true
    },
    {
      title: '需求单综述',
      key: 'xqzs',
      tooltip: true
    },
    {
      title: '期望完成时间',
      key: 'qwwcsj',
      tooltip: true
    }
  ]
  if (type == 'xqtb' || type == 'xqzl') {
    columns.push(
      {
        title: '审核人',
        key: 'shr',
        tooltip: true
      }
    )
  }
  return columns;
};
//清除选中的数据
Vue.prototype.clearSingleData = function (thisVue) {


  thisVue.singleData = {};

  if (thisVue.confirm) {
    thisVue.confirm = false;
  }

  return thisVue;
};
//搜索
Vue.prototype.handleSearch = function (queryParam) {

  if (queryParam.date) {
    //开始时间
    queryParam.startTime = queryParam.date[0];
    //结束时间
    queryParam.endTime = queryParam.date[1];
  }

  //专业类别
  queryParam.zylb = queryParam.zylbArray[1];

  return queryParam;
};
//重置
Vue.prototype.reset = function (thisVue) {
  thisVue.selectValue = '';
  for (let showSelectInputKey in thisVue.showSelectInput) {
    thisVue.showSelectInput[showSelectInputKey] = false;
  }

  for (let queryParamKey in thisVue.queryParam) {
    if (queryParamKey == 'cjrid' || queryParamKey == 'cxbz') {
      continue;
    } else if (queryParamKey == 'zylbArray') {
      thisVue.queryParam[queryParamKey] = [];
    } else {
      thisVue.queryParam[queryParamKey] = null;
    }
  }

  return thisVue;
};
//获取下拉框选中的值
Vue.prototype.getItemValue = function (val, showSelectInput) {
  if (val == 0) {
    showSelectInput.xqzs = true;
  }
  if (val == 1) {
    showSelectInput.sqrxm = true;
  }
  if (val == 2) {
    showSelectInput.gdzt = true;
  }
  if (val == 3) {
    showSelectInput.fjbz = true;
  }
  if (val == 4) {
    showSelectInput.shjd = true;
  }
  if (val == 5) {
    showSelectInput.wshr = true;
  }
  if (val == 6) {
    showSelectInput.zylbArray = true;
  }

  return showSelectInput;
};
//创建柱状图
Vue.prototype.createEcharts = function (type, myChart, title, data) {
  let xAxisData = [];
  if (type == 'zttj') {
    xAxisData = ["新建", "省级审核中", "省级审核未通过", "网级审核中", "网级审核未通过", "审核通过", "作废申请-省级审核中", "作废申请-网级审核中", "已作废", "总数"];
  } else if (type == 'shjd') {
    xAxisData = ["新建", "正常", "即将到期", "已逾期", "完成", "总数"];
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
      name: '数量\n百分比',
      type: 'bar',
      data: data,
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
              return value.value + '\n' + (value.value / data[data.length - 1] * 100).toFixed(2) + '%'
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
  if (params == '省级审核中') {
    params = 'ProAudit';
  } else if (params == '省级审核未通过') {
    params = 'ProModif';
  } else if (params == '网级审核中') {
    params = 'PowerAudit';
  } else if (params == '网级审核未通过') {
    params = 'PowerModif';
  } else if (params == '审核通过') {
    params = 'Pass';
  } else if (params == '作废申请-省级审核中') {
    params = 'ProCancel';
  } else if (params == '作废申请-网级审核中') {
    params = 'PowerCancel';
  } else if (params == '已作废') {
    params = 'Cancel';
  } else if (params == '新建') {
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
Vue.prototype.checkNumber = function (number, thisVue) {
  var numReg = /^[0-9]+$/
  var numRe = new RegExp(numReg)
  if (!numRe.test(number)) {
    //thisVue.newPhone=true;
    return true;
  } else {
    //thisVue.newPhone=false;
    return false;
  }
  return thisVue;
};
