<template>
  <div id="table_zl">
    <div class="search_tb">
      <Poptip trigger="focus"  content="需求单号查询...">
        <Input clearable size="small" v-model="queryParam.xqdh" placeholder="需求单号查询..." style="width: 200px"
               suffix="ios-search"/>
      </Poptip>
      <Poptip trigger="focus"  content="需求单名称查询...">
        <Input clearable size="small" v-model="queryParam.xqmc" placeholder="需求单名称查询..." style="width: 200px"
               suffix="ios-search"/>
      </Poptip>
      <Poptip trigger="focus"  content="申请单位查询...">
        <Input clearable size="small" v-model="queryParam.sqbmmc" placeholder="申请单位查询..." style="width: 200px"
               suffix="ios-search"/>
      </Poptip>

      <DatePicker size="small" v-model="queryParam.date" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="开始时间——结束时间" style="width: 200px"></DatePicker>

      <Poptip trigger="click"  content="需求单综述查询...">
        <Input v-if="showSelectInput.xqzs" clearable size="small" v-model="queryParam.xqzs" placeholder="需求单综述查询..."
               style="width: 200px" suffix="ios-search"/>
      </Poptip>
      <Poptip trigger="click"  content="申请人查询...">
        <Input v-if="showSelectInput.sqrxm" clearable size="small" v-model="queryParam.sqrxm" placeholder="申请人查询..."
               style="width: 200px" suffix="ios-search"/>
      </Poptip>
      <Select v-if="showSelectInput.gdzt" clearable size="small" v-model="queryParam.gdzt"  style="width:200px" placeholder="状态选择...">
        <Option v-for="gdzt in gdztList" :value="gdzt.value" :key="gdzt.value">{{ gdzt.label }}</Option>
      </Select>
      <Select v-if="showSelectInput.fjbz" clearable size="small" v-model="queryParam.fjbz"  style="width:200px" placeholder="有无附件选择...">
        <Option v-for="fjbz in fjbzList" :value="fjbz.value" :key="fjbz.value">{{ fjbz.label }}</Option>
      </Select>
      <Select v-if="showSelectInput.shjd" clearable size="small" v-model="queryParam.shjd"  style="width:200px" placeholder="审核进度选择...">
        <Option v-for="shjd in shjdList" :value="shjd.value" :key="shjd.value">{{ shjd.label }}</Option>
      </Select>
      <Poptip trigger="click"  content="申请人查询...">
        <Input v-if="showSelectInput.wshr" clearable size="small" v-model="queryParam.wshr" placeholder="审核人查询..."
               style="width: 200px" suffix="ios-search"/>
      </Poptip>

      <Cascader v-if="showSelectInput.zylbArray" trigger="hover" size="small" :data="zylbList" v-model="queryParam.zylbArray" style="width: 200px; display: inline-block" placeholder="专业类别查询..." ></Cascader>


      <Select clearable size="small" v-model="selectValue" placeholder="新增条件" style="width:200px" @on-change="getItemValue">
        <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
      :height="440"
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
        columnsByZL: Bus.getTableColumnsByType(this.tableType),
        dataByZL: [],
        totalData: 100,
        pageNum: 1,
        pageSize: 10,
        selectList: Bus.getSelectList(),
        gdztList: Bus.getgdztList(),
        fjbzList: Bus.getfjbzList(),
        shjdList: Bus.getshjdList(),
        zylbList: Bus.getzylbList(),
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
          cjrid: null,
          zylbArray: [],
          zylb: null,
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

      },
      //改变每页显示的条数
      changePageSize(value) {
        this.pageNum = 1;
        this.pageSize = value;


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
      //清除选中的行
      clearSingleData() {
        this.$refs.currentRowTableByZL.clearCurrentRow();
        let thisVue = this;
        thisVue = Bus.clearSingleData(thisVue);
      },
      //重置
      reset() {
        let thisVue = this;
        thisVue = Bus.reset(thisVue);
      },
      //搜索
      handleSearch() {

        let thisVue = this;
        thisVue = Bus.handleSearch(thisVue);

        console.log(thisVue.queryParam);
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
      queryData() {

        // let thisVue = this;
        //
        // //显示加载动画
        // thisVue = Bus.showLoading(thisVue);
        //
        // this.$axios({
        //   url: 'xqd/xqdxx/findXqdxxByAndCondition/' + this.pageNum + '/' + this.pageSize,//请求的地址
        //   method: 'post',//请求的方式
        //   headers: {
        //     'Content-Type': 'application/json; charset=UTF-8'
        //   },
        //   data: JSON.stringify(this.queryParam), //请求参数
        // }).then(res => {
        //   if (Bus.checkRespondAndDataNotNull(res)){
        //     this.dataByZL = res.data.data;
        //     this.totalData = this.dataByZL[0].total;
        //     this.pageNum = this.dataByZL[0].pageNum;
        //     this.pageSize = this.dataByZL[0].pageSize;
        //     console.log(this.dataByZL);
        //
        //   }else {
        //     this.dataByZL = [];
        //   }
        //
        // }).catch(err => {
        //   //console.info('报错的信息', err);
        // }).then(function () {
        //   //关闭加载动画
        //   thisVue = Bus.closeLoading(thisVue);
        //   thisVue.clearSingleData();
        // });
      }
    },
    created() {
      //请求后台获取需求单填报数据
      console.log(this.pageNum);
      console.log(this.pageSize);
      console.log(this.queryParam);

      this.queryData();
    },
    //用于双击柱状图，根据参数查询需求填报数据
    mounted: function () {
      // 用$on事件来接收参数
      Bus.$on('zttjValueByZL', (data) => {
        console.log(data);

      });

      Bus.$on('shjdValueByZL', (data) => {
        console.log(data);

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
