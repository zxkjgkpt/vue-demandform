<template>
  <div id="table_zl">
    <div class="search_tb">
      <Input clearable size="small" v-model="queryParam.xqdh"  placeholder="需求单号查询..." style="width: 200px"  suffix="ios-search" />
      <Input clearable size="small" v-model="queryParam.xqmc" placeholder="需求单名称查询..." style="width: 200px" suffix="ios-search" />
      <Input clearable size="small" v-model="queryParam.sqbmmc" placeholder="申请单位查询..." style="width: 200px" suffix="ios-search" />

      <DatePicker size="small" v-model="queryParam.date" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="开始时间——结束时间" style="width: 200px"></DatePicker>

      <Input v-if="showSelectInput.xqzs" clearable size="small" v-model="queryParam.xqzs" placeholder="需求单综述查询..." style="width: 200px" suffix="ios-search" />
      <Input v-if="showSelectInput.sqrxm" clearable size="small" v-model="queryParam.sqrxm" placeholder="申请人查询..." style="width: 200px" suffix="ios-search" />
      <Select v-if="showSelectInput.gdzt" clearable size="small" v-model="queryParam.gdzt"  style="width:200px" placeholder="状态选择...">
        <Option v-for="gdzt in gdztList" :value="gdzt.value" :key="gdzt.value">{{ gdzt.label }}</Option>
      </Select>
      <Select v-if="showSelectInput.fjbz" clearable size="small" v-model="queryParam.fjbz"  style="width:200px" placeholder="有无附件选择...">
        <Option v-for="fjbz in fjbzList" :value="fjbz.value" :key="fjbz.value">{{ fjbz.label }}</Option>
      </Select>
      <Select v-if="showSelectInput.shjd" clearable size="small" v-model="queryParam.shjd"  style="width:200px" placeholder="审核进度选择...">
        <Option v-for="shjd in shjdList" :value="shjd.value" :key="shjd.value">{{ shjd.label }}</Option>
      </Select>
      <Input v-if="showSelectInput.wshr" clearable size="small" v-model="queryParam.wshr" placeholder="审核人查询..." style="width: 200px" suffix="ios-search" />

      <Cascader v-if="showSelectInput.zylbArray" trigger="hover" size="small" :data="zylbData" v-model="queryParam.zylbArray" style="width: 200px; display: inline-block" placeholder="专业类别查询..." ></Cascader>


      <Select clearable size="small" v-model="selectValue" placeholder="新增条件" style="width:200px" @on-change="getItemValue">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>

      <Button size="small" type="success" @click="handleSearch"><Icon type="ios-search" />查询</Button>
      <Button size="small" type="warning" @click="reset"><Icon type="md-refresh" style="padding-bottom: 2px" />重置</Button>
      <br>
    </div>
    <div class="buttonDiv">
      <Button size="small" type="primary" @click="exportData"><Icon type="ios-share" style="padding-bottom: 2px" />导出</Button>
    </div>
    <Table
      size="small"
      border
      highlight-row
      :loading="loading"
      :height="435"
      ref="currentRowTableByZL"
      :columns="columnsByZL"
      :data="dataByZL"
      @on-row-dblclick="showDetailed"
      @on-current-change="handleRowChange" >
    </Table>
    <div style="margin: 10px;">
      <div style="float: right;">
        <Page
          size="small"
          :total="totalData"
          show-total
          :current="pageNum"
          :page-size="pageSize"
          show-sizer
          @on-change="changePage"
          @on-page-size-change="changePageSize"></Page>
      </div>
      <!--刷新-->
      <div class="refreshIcon" @click="refreshData"><Icon size="17" type="md-refresh" /></div>
    </div>
    <Modal
      v-model="modalView"
      title="查看信息化需求单"
      :mask-closable="false"
      cancel-text=""
      ok-text="关闭"
      @on-ok="exitModal">
      <edit_model v-bind:singleData="singleData" v-bind:isShowView="isShowView"></edit_model>
    </Modal>
  </div>
</template>

<script>
  import Edit_model from "./edit/edit_model";

  // 引入公共的bus，来做为中间传达的工具
  import Bus from './bus/bus'

  export default {
    name: 'table_zl',
    components: {Edit_model},
    props: {
      tableType: {
        type: String,
      }
    },
    data() {
      return {
        loading: false,
        columnsByZL: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '审核进度',
            key: 'name',
            tooltip: true//开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容
          },
          {
            title: '需求单状态',
            key: 'age',
            tooltip: true
          },
          {
            title: '需求单号',
            key: 'address',
            tooltip: true
          },
          {
            title: '申请单位/业务部门',
            key: 'address',
            tooltip: true
          },
          {
            title: '申请人',
            key: 'address',
            tooltip: true
          },
          {
            title: '申请人联系方式',
            key: 'address',
            tooltip: true
          },
          {
            title: '创建时间',
            key: 'address',
            tooltip: true
          },
          {
            title: '需求单名称',
            key: 'address',
            tooltip: true
          },
          {
            title: '需求单综述',
            key: 'address',
            tooltip: true
          },
          {
            title: '期望完成时间',
            key: 'address',
            tooltip: true
          }

        ],
        dataByZL: [],
        totalData: 100,
        pageNum: 1,
        pageSize: 10,
        cityList: [
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
        ],
        gdztList: [
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
          },
        ],
        fjbzList: [
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
          },
        ],
        shjdList: [
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
          },
        ],
        zylbData: [
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
        ],
        modalView: false,
        singleData: {},
        selectValue: '',
        isShowView: false,
        queryParam: {
          xqdh: null,
          xqmc: null,
          xqzs: null,
          sqbmmc: null,
          sqrxm: null,
          gdzt: null,
          shjd: null,
          wshr: null,
          //目前还拿不到创建人ID
          //cjrid:UserInfoS.getUserInfo().id,
          cjrid: null,
          zylbArray: [],
          zylb: null,
          cjrid: null,
          fjbz: null,
          cxbz: this.tableType,
          date: null,
          startTime: null,
          endTime: null
        },
        showSelectInput: {
          xqzs: false,
          sqrxm: false,
          gdzt: false,
          fjbz: false,
          shjd: false,
          wshr: false,
          zylbArray: false
        }
      }
    },
    methods: {
      //双击获取详细信息
      showDetailed() {
        this.isShowView = true;
        this.modalView = true;
      },
      //翻页
      changePage(value) {
        this.pageNum = value;
        //获取数据
        //...
        //参考地址：https://blog.csdn.net/u013144287/article/details/78879044
      },
      //改变每页显示的条数
      changePageSize(value) {
        this.pageSize = value;
        //...
        //参考地址：https://blog.csdn.net/u013144287/article/details/78879044

      },
      //表格中选中当前某一行数据
      handleRowChange(currentRow) {
        this.singleData = currentRow;
      },
      //查看模态框退出
      exitModal() {
        this.$Message.warning('退出');
        this.clearSingleData();
      },
      clearSingleData() {
        //清除选中的行
        this.$refs.currentRowTableByZL.clearCurrentRow();
        this.singleData = {};
      },
      //重置
      reset() {
        let thisVue = this;
        thisVue = Bus.reset(thisVue);
      },
      //搜索
      handleSearch() {
        this.loading = true;

        //开始时间
        this.queryParam.startTime = this.queryParam.date[0];
        //结束时间
        this.queryParam.endTime = this.queryParam.date[1];
        //专业类别
        this.queryParam.zylb = this.queryParam.zylbArray[1];

        console.log(this.queryParam);

        let thisTable = this;   // 当前this指向的是一个组件
        setTimeout(function () {
          thisTable.loading = false;
        }, 2000) //   function 里面的this指向的是windows


        //通过传值到后台，请求数据返回结果为searchedData赋值给this.dataByTB，就能实现搜索
        //this.dataByTB = searchedData;
      },
      //导出
      exportData() {
        console.log('导出功能');
      },
      //获取下拉框选中的值
      getItemValue(val) {
        this.showSelectInput = Bus.getItemValue(val,this.showSelectInput);
      },
      //刷新
      refreshData() {
        this.loading = true;

        let thisTable = this;   // 当前this指向的是一个组件
        setTimeout(function () {
          thisTable.loading = false;
        }, 2000) //   function 里面的this指向的是windows


        //通过传值到后台，请求数据返回结果为searchedData赋值给this.dataByTB，就能实现搜索
        //this.dataByTB = searchedData;

      },
      //请求后台数据
      queryData(number) {

      }
    },
    created() {
      //请求后台获取需求单填报数据
      console.log(this.tableType);
      console.log(this.pageNum);
      console.log(this.pageSize);
      console.log(this.queryParam);
      //手动获取数据
      let data = [];
      for (let i = 1; i <= 10; i++) {
        let a = {
          name: 'John Brown 总览' + Math.floor(Math.random() * 100 + 1),
          age: Math.floor(Math.random() * 100 + 1),
          address: 'New York No. 1 Lake Park' + Math.floor(Math.random() * 100 + 1),
        };
        data.push(a);
      }
      this.dataByZL = data;
      /*this.$axios({
        url: '',//请求的地址
        method: 'post',//请求的方式
        data: this.tableType//根据表格类型请求数据
      }).then(res => {
        console.info('后台返回的数据', res.data);
      }).catch(err => {
        console.info('报错的信息', err.response.message);
      });*/
    },
    //用于双击柱状图，根据参数查询需求填报数据
    mounted: function () {
      let vm = this;
      // 用$on事件来接收参数
      Bus.$on('zttjValueByZL', (data) => {
        console.log(data);
        vm.loading = true;

        setTimeout(function () {
          vm.loading = false;
        }, 2000) //   function 里面的this指向的是windows
      });

      Bus.$on('shjdValueByZL', (data) => {
        console.log(data);
        vm.loading = true;

        setTimeout(function () {
          vm.loading = false;
        }, 2000) //   function 里面的this指向的是windows
      })
    }
  }
</script>

<style scoped>
  .search_tb{
    width: 100%;
    margin-bottom: 5px;
  }
  .buttonDiv{
    margin-bottom: 2px;
  }
  .refreshIcon{
    float: right;
    margin-top: 2px;
    margin-right: 6px;
    padding-right: 5px;
    border-right: solid 1px rgba(0,0,0,.2);
    cursor:pointer;
  }
</style>
