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
          value: '抄表核算和账单',
          label: '抄表核算和账单'
        },
        {
          value: '收款',
          label: '收款'
        },
        {
          value: '管理线损',
          label: '管理线损'
        },
        {
          value: '用电检查',
          label: '用电检查'
        },
        {
          value: '服务渠道管理',
          label: '服务渠道管理'
        },
        {
          value: '客户关系管理',
          label: '客户关系管理'
        },
        {
          value: '客户停电管理',
          label: '客户停电管理'
        },
        {
          value: '资产管理',
          label: '资产管理'
        },
        {
          value: '运行管理',
          label: '运行管理'
        },
        {
          value: '实验室管理',
          label: '实验室管理'
        },
        {
          value: '需求侧管理',
          label: '需求侧管理'
        },
        {
          value: '市场化交易',
          label: '市场化交易'
        },
        {
          value: '营销稽查',
          label: '营销稽查'
        },
        {
          value: '系统支撑',
          label: '系统支撑'
        },
        {
          value: '班组标准化',
          label: '班组标准化'
        },
        {
          value: '外部集成',
          label: '外部集成'
        },
        {
          value: '移动营销',
          label: '移动营销'
        },
        {
          value: '电动汽车',
          label: '电动汽车'
        },
        {
          value: '网厅',
          label: '网厅'
        },
        {
          value: '客服大集中',
          label: '客服大集中'
        },
        {
          value: '其他',
          label: '其他'
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
      value: 'TRUE',
      label: '有'
    },
    {
      value: 'FALSE',
      label: '无'
    }
  ];
  return fjbzList;
};
//获取状态的List
Vue.prototype.getgdztList = function () {
  let gdztList = [
    {
      value: 'New',
      label: '新建'
    },
    {
      value: '提交需求申请',
      label: '提交需求申请'
    },
    {
      value: '省级审批',
      label: '省级审批'
    },
    {
      value: '网级审批（联合信息部会签）',
      label: '网级审批（联合信息部会签）'
    },
    {
      value: '安排做开发评估',
      label: '安排做开发评估'
    },
    {
      value: '开发评估',
      label: '开发评估'
    },
    {
      value: '安排需求方确认或补充材料',
      label: '安排需求方确认或补充材料'
    },
    {
      value: '需求方确认或提供补充材料',
      label: '需求方确认或提供补充材料'
    },
    {
      value: '确认评估情况',
      label: '确认评估情况'
    },
    {
      value: '反馈开发时限及所需资源',
      label: '反馈开发时限及所需资源'
    },
    {
      value: '评估确认',
      label: '评估确认'
    },
    {
      value: '信息部项目立项',
      label: '信息部项目立项'
    },
    {
      value: '根据需求任务等级安排开发',
      label: '根据需求任务等级安排开发'
    },
    {
      value: '开发',
      label: '开发'
    },
    {
      value: '安排测试',
      label: '安排测试'
    },
    {
      value: '功能验证确认',
      label: '功能验证确认'
    },
    {
      value: '上线发布确认',
      label: '上线发布确认'
    },
    {
      value: '需求关闭',
      label: '需求关闭'
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
        //判断不为空
        if (temp != undefined) {
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
              color = '#ee050b';
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

          //判断如果需求单状态不为'New'，才显示流程图信息
          //本来是用审核进度来判断，但是目前审核进度还未有值，只能先用状态来判断
          if (params.row.gdzt != 'New'){
            return h('Poptip', {
                props: {
                  trigger: 'hover',
                  title: '流程图',
                  content: '加载图片中...',
                  placement: 'right',
                  popperClass: 'showImg',
                },
                on: {
                  'on-popper-show': () => {

                    //该行的所有数据
                    //console.log(params.row);
                    let taskID = params.row.taskId;
                    //console.log(taskID);

                    this.$axios({
                      url: 'xqd/xqdxx/getDiagram/' + taskID,
                      method: 'post',//请求的方式
                      responseType: 'arraybuffer'
                    }).then((res) => {
                      //console.log(res);
                      if (res.status == 200) {
                        return 'data:image/png;base64,' + btoa(
                          new Uint8Array(res.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                      } else {
                        alert('图片加载失败，请重试！');
                      }
                    }).then(data => {
                      //获取图片
                      let showImg = document.getElementsByClassName('showImg')[params.index];
                      showImg.innerHTML = '<img style="background-color: white; height: 900px" src=' + data + '>';

                      showImg.style.top = '-28%';

                    }).catch(error => {
                      alert('图片加载失败，请重试！');
                    });

                  }
                }
              }, [h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, temp)]
            )
          } else {
            return h('Poptip', {
              }, [h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, temp)]
            )
          }


        }
      }
    },
    {
      title: '需求单状态',
      key: 'gdzt',
      tooltip: true,
      width: 168,
      render: (h, params) => {
        // debugger;
        let temp = params.row.gdzt;
        let color = '';
        let pass = params.row.sftg;
        // let yc=true;
        if (temp == 'New') {
          temp = '新建';
          color = '#3a677a';
        } else if (pass == 1) {
          //不通过
          color = '#ee050b';
        } else {
          //通过
          color = '#01a8ec';
        }
        // switch (temp) {
        //   case 'New':
        //     temp = '新建';
        //     color = '#3a677a';
        //     break;
        //   case '省级审批':
        //     temp = '省级审核中';
        //     color = '#01a8ec';
        //     break;
        //   case 'ProModif':
        //     temp = '省级审核未通过';
        //     color = 'red';
        //     break;
        //   case 'PowerAudit':
        //     temp = '网级审核中';
        //     color = '#01a8ec';
        //     break;
        //   case 'PowerModif':
        //     temp = '网级审核未通过';
        //     color = 'red';
        //     break;
        //   case 'Pass':
        //     temp = '审核通过';
        //     color = '#28ff23';
        //     break;
        //   case 'ProCancel':
        //     temp = '作废申请-省级审核中';
        //     color = '#01a8ec';
        //     break;
        //   case 'PowerCancel':
        //     temp = '作废申请-网级审核中';
        //     color = '#01a8ec';
        //     break;
        //   case 'Cancel':
        //     temp = '已作废';
        //     color = 'red';
        //     break;
        //
        // }

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
  ];
  if (type == 'xqtb' || type == 'xqzl') {
    columns.push(
      {
        title: '审核人',
        key: 'dshr',
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
Vue.prototype.handleSearch = function (thisVue) {

  if (thisVue.queryParam.date) {
    //开始时间
    thisVue.queryParam.startTime = thisVue.queryParam.date[0];
    //结束时间
    thisVue.queryParam.endTime = thisVue.queryParam.date[1];
  }

  //专业类别
  thisVue.queryParam.zylb = thisVue.queryParam.zylbArray[1];

  thisVue.pageNum = 1;
  thisVue.pageSize = 10;

  return thisVue;
};
//重置
Vue.prototype.reset = function (thisVue) {
  thisVue.selectValue = '';
  for (let showSelectInputKey in thisVue.showSelectInput) {
    thisVue.showSelectInput[showSelectInputKey] = false;
  }

  for (let queryParamKey in thisVue.queryParam) {
    if (queryParamKey == 'cjrid' || queryParamKey == 'xqdType' || queryParamKey == 'orders') {
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

  switch (val) {
    case '0':
      showSelectInput.xqzs = true;
      break;
    case '1':
      showSelectInput.sqrxm = true;
      break;
    case '2':
      showSelectInput.gdzt = true;
      break;
    case '3':
      showSelectInput.fjbz = true;
      break;
    case '4':
      showSelectInput.shjd = true;
      break;
    case '5':
      showSelectInput.wshr = true;
      break;
    case '6':
      showSelectInput.zylbArray = true;
      break;

  }

  return showSelectInput;
};
//创建柱状图
Vue.prototype.createEcharts = function (type, myChart, title, data) {
  let xAxisData = [];
  if (type == 'zttj') {
    xAxisData = ["新建", "提交需求申请", "省级审批", "网级审批（联合信息部会签）", "安排做开发评估", "开发评估", "安排需求方确认或补充材料", "需求方确认或提供补充材料", "确认评估情况","反馈开发时限及所需资源","评估确认","信息部项目立项","根据需求任务等级安排开发","开发","安排测试","功能验证确认","上线发布确认","需求关闭", "总数"];
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
//初始化状态统计
Vue.prototype.initGDZTArray = function(totalData){
  //状态数量
  let gdztNubmer = new Array(19);
  for (let i = 0, len = gdztNubmer.length; i < len; i++) {
    gdztNubmer[i] = 0;
  }
  totalData.forEach(function (v) {
    let gdzt = v.gdzt;
    switch (gdzt) {
      case "New":
        gdztNubmer[0]++;
        break;
      case "提交需求申请":
        gdztNubmer[1]++;
        break;
      case "省级审批":
        gdztNubmer[2]++;
        break;
      case "网级审批（联合信息部会签）":
        gdztNubmer[3]++;
        break;
      case "安排做开发评估":
        gdztNubmer[4]++;
        break;
      case "开发评估":
        gdztNubmer[5]++;
        break;
      case "安排需求方确认或补充材料":
        gdztNubmer[6]++;
        break;
      case "需求方确认或提供补充材料":
        gdztNubmer[7]++;
        break;
      case "确认评估情况":
        gdztNubmer[8]++;
        break;
      case "反馈开发时限及所需资源":
        gdztNubmer[9]++;
        break;
      case "评估确认":
        gdztNubmer[10]++;
        break;
      case "信息部项目立项":
        gdztNubmer[11]++;
        break;
      case "根据需求任务等级安排开发":
        gdztNubmer[12]++;
        break;
      case "开发":
        gdztNubmer[13]++;
        break;
      case "安排测试":
        gdztNubmer[14]++;
        break;
      case "功能验证确认":
        gdztNubmer[15]++;
        break;
      case "上线发布确认":
        gdztNubmer[16]++;
        break;
      case "需求关闭":
        gdztNubmer[17]++;
        break;
    }
  });
  //总数
  gdztNubmer[gdztNubmer.length-1] = totalData.length;

  return gdztNubmer;
};
//获取状态统计柱状图的转换值
Vue.prototype.transformByzttj = function (params) {
  // if (params == '省级审核中') {
  //   params = 'ProAudit';
  // } else if (params == '省级审核未通过') {
  //   params = 'ProModif';
  // } else if (params == '网级审核中') {
  //   params = 'PowerAudit';
  // } else if (params == '网级审核未通过') {
  //   params = 'PowerModif';
  // } else if (params == '审核通过') {
  //   params = 'Pass';
  // } else if (params == '作废申请-省级审核中') {
  //   params = 'ProCancel';
  // } else if (params == '作废申请-网级审核中') {
  //   params = 'PowerCancel';
  // } else if (params == '已作废') {
  //   params = 'Cancel';
  // } else
    if (params == '新建') {
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
//判断对象是否空，包括值也为空
Vue.prototype.isEmptyObject = function (object) {

  if (JSON.stringify(object) == '{}') {
    return true;
  } else {
    for (let queryParamKey in object) {
      if (object[queryParamKey] instanceof Array && object[queryParamKey].length != 0) {
        return false;
      } else if (object[queryParamKey] != '') {
        return false;
      }
    }
    return true;
  }


};
//验证电话号码
Vue.prototype.checkNumber = function (number) {
  let numReg = /^[0-9]+$/
  let numRe = new RegExp(numReg)
  if (!numRe.test(number)) {
    //thisVue.newPhone=true;
    return true;
  } else {
    //thisVue.newPhone=false;
    return false;
  }
};
//验证邮箱
Vue.prototype.checkEmail = function (number) {
  let numReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  let numRe = new RegExp(numReg)
  if (!numRe.test(number)) {
    return true;
  } else {
    return false;
  }
};
//判断回应参数和数据是否不为空
Vue.prototype.checkRespondAndDataNotNull = function (res) {
  if (res.data.code == '10001' || res.data.code == '20001' || res.data.code == '20003') {
    return true;
    // if (res.data.data != null && res.data.data.length > 0 || res.data.data == 1) {
    //   return true;
    // } else {
    //   return false;
    // }
  } else if (res.data.code == '10003') {
    alert(res.data.message + '，请重试！');
    return false;
  } else {
    return false;
  }
};
//显示加载动画
Vue.prototype.showLoading = function (thisVue) {
  thisVue.loading = true;
  return thisVue;
};
//关闭加载动画
Vue.prototype.closeLoading = function (thisVue) {
  thisVue.loading = false;
  return thisVue;
};
//修改input的disabled样式
Vue.prototype.updateInputDemo = function () {
  let inputChange = document.getElementsByClassName('ivu-input-disabled');
  for (let i = 0; i < inputChange.length; i++) {
    inputChange[i].style.backgroundColor = 'white';
    inputChange[i].style.color = 'black';
  }
};
//导出Excel文件
Vue.prototype.exportExcel = function (thisVue, fileName) {
  thisVue.$axios({
    url: 'xqd/xqdxx/exportXqd',
    method: 'post',//请求的方式
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    data: JSON.stringify(thisVue.queryParam), //请求参数
    responseType: 'blob'
  }).then((res) => {
    //console.log(res);
    if (res.status == 200) {
      const link = document.createElement('a');
      let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
      link.style.display = 'none';
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', fileName + '.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      thisVue.$Message.success('导出成功！');
    } else {
      thisVue.$Message.error('导出失败，请重试！');
    }
  }).catch(error => {
    thisVue.$Message.error('导出失败，请重试！');
  }).then(function () {

  });

};

//根据单号查询流程记录
Vue.prototype.selectFlowlog = function (thisVue) {
  // debugger
let queryParam={};
queryParam.dh=thisVue.singleData.xqdh;
  thisVue.$axios({
    url: 'xqd/xqdFlowLog/findListByAndCondition',
    method: 'post',//请求的方式
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    data: JSON.stringify(queryParam), //请求参数
  }).then(res => {
    // debugger;
    if (this.checkRespondAndDataNotNull(res)) {
      thisVue.flowLogList = res.data.data;
      // console.log(thisVue.flowLogList);
    }else{
      thisVue.flowLogList=[];
    }

  }).catch(err => {
    //console.info('报错的信息', err);
  }).then(function () {
    //关闭加载动画

  });

};

