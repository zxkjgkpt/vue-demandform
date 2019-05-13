<template>
  <div id="table_sh">
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
    <Table
      size="small"
      border
      highlight-row
      :loading="loading"
      :height="435"
      ref="currentRowTableBySH"
      :columns="columnsBySH"
      :data="dataBySH"
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
      width="80%"
      :mask-closable="false"
      @on-cancel="exitModal">
      <!--页头-->
      <p slot="header" style="color:#f60;text-align:center">
        <span>审核信息化需求单</span>
      </p>
      <edit_model ref="edit_model" v-bind:singleData="singleData" v-bind:isShowView="isShowView" v-bind:xqtype="xqtype" v-bind:flowLogList="flowLogList" ></edit_model>
      <!--页脚-->
      <div slot="footer">
        <i-button v-if="!(singleData.gdzt=='需求关闭')" type="success" @click="okByPass('pass')">通过</i-button>

        <i-button v-if="(singleData.gdzt=='省级审批')||(singleData.gdzt=='网级审批（联合信息部会签）')||(singleData.gdzt=='作废,省级审批')||(singleData.gdzt=='作废,网级审批')" type="warning" @click="okByPass('onPass')">不通过</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Edit_model from "./edit/edit_model";

  // 引入公共的bus，来做为中间传达的工具
  import Bus from './bus/bus'

  export default {
    name: 'table_sh',
    components: {Edit_model},
    props:{
      tableType:{
        type:String,
      },
      cjrid: {
        type: String
      }
    },
    data(){
      return{
        loading: false,
        columnsBySH: Bus.getTableColumnsByType(this.tableType),
        dataBySH: [],
        totalData:100,
        pageNum:1,
        pageSize:10,
        selectList: Bus.getSelectList(),
        gdztList: Bus.getgdztList(),
        fjbzList: Bus.getfjbzList(),
        shjdList: Bus.getshjdList(),
        zylbList: Bus.getzylbList(),
        modalView: false,
        singleData:{},
        selectValue:'',
        isShowView:false,
        xqtype:'sh',
        flowLogList:[],
        queryParam: {
          xqdh: null,
          xqmc: null,
          xqzs: null,
          sqbmmc: null,
          sqrxm: null,
          gdzt: null,
          shjd: null,
          wshr: null,
          cjrid: this.cjrid,
          xqfl: null,
          zylbArray: [],
          xqdfl: [],
          zylb: null,
          fjbz: null,
          xqdType: this.tableType,
          date: null,
          startTime: null,
          endTime: null,
          orders: {
            "CJSJ": "DESC"
          }
        },
        showSelectInput:{
          xqzs:false,
          sqrxm:false,
          gdzt:false,
          fjbz:false,
          shjd:false,
          wshr:false,
          zylbArray:false
        }
      }
    },
    methods:{
      //点击通过或者未通过
      okByPass(type){
        // this.$refs.edit_model.deleteSingleData();
        let theGdzt=this.singleData.gdzt;
        if(type=='pass'&&theGdzt!='开发评估') {
          this.$refs.edit_model.showSingleData('pass');
          this.$refs.edit_model.deleteSingleData();
          this.$Message.warning('完成');
          this.clearSingleData();
          this.modalView = false;
        }
        if(type=='pass'&&theGdzt=='开发评估'){
          if(!this.$refs.edit_model.confirmSign()) {
            this.$refs.edit_model.openApkfpg();
          }else{
              this.$refs.edit_model.showSingleData('pass');
            this.$refs.edit_model.deleteSingleData();
              this.$Message.warning('完成');
              this.clearSingleData();
              this.$refs.edit_model.closeApkfpg();
              this.modalView = false;

          }
        }
        // debugger;
        if(type=='onPass'){
          if(!this.$refs.edit_model.confirmSign()&&this.singleData.gdzt!='作废,省级审批'&&this.singleData.gdzt!='作废,网级审批') {
            this.$refs.edit_model.openSftg();
          }else{
            this.$refs.edit_model.showSingleData('onPass');
            this.$refs.edit_model.deleteSingleData();
            this.$Message.warning('完成');
            this.clearSingleData();
            this.$refs.edit_model.closeSftg();
            this.modalView = false;
          }
        }
      },
      //双击获取详细信息
      showDetailed(){
        this.$refs.edit_model.changeValueBySingleData(this.singleData);
        this.isShowView = true;
        this.modalView = true;
        //根据单号查询流程记录
        let thisVue=this;
        Bus.selectFlowlog(thisVue);
        // console.log(this.singleData);
      },
      //翻页
      changePage (value) {
        this.pageNum = value;
        this.queryData();
      },
      //改变每页显示的条数
      changePageSize (value) {
        this.pageNum = 1;
        this.pageSize = value;
        this.queryData();


      },
      //表格中选中当前某一行数据
      handleRowChange(currentRow){
        this.singleData = currentRow;
      },
      //查看模态框退出
      exitModal(){
        this.$Message.warning('退出');
        this.$refs.edit_model.deleteSingleData();
        this.clearSingleData();
        this.modalView = false;
      },
      //清除选中的行
      clearSingleData(){
        this.$refs.currentRowTableBySH.clearCurrentRow();
        let thisVue = this;
        thisVue = Bus.clearSingleData(thisVue);
      },
      //重置
      reset(){
        let thisVue = this;
        thisVue = Bus.reset(thisVue);
      },
      //搜索
      handleSearch(){

        let thisVue = this;
        thisVue = Bus.handleSearch(thisVue);
        this.queryData();

        // console.log(thisVue.queryParam);
      },
      //获取下拉框选中的值
      getItemValue(val){
        this.showSelectInput = Bus.getItemValue(val,this.showSelectInput);
      },
      ok () {
        this.$Message.info('点击了确定');
      },
      cancel () {
        this.$Message.info('点击了取消');
      },
      //刷新
      refreshData(){
        this.loading = true;

        let thisTable = this;   // 当前this指向的是一个组件
        setTimeout(function(){
          thisTable.loading = false;
        },2000) //   function 里面的this指向的是windows


        //通过传值到后台，请求数据返回结果为searchedData赋值给this.dataByTB，就能实现搜索
        //this.dataByTB = searchedData;

      },
      //请求后台数据
      queryData(){
        let thisVue = this;

        //显示加载动画
        thisVue = Bus.showLoading(thisVue);

        this.$axios({
          url: 'xqd/xqdxx/findListByAndCondition/' + this.pageNum + '/' + this.pageSize,//请求的地址
          method: 'post',//请求的方式
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          data: JSON.stringify(this.queryParam), //请求参数
        }).then(res => {
          if (Bus.checkRespondAndDataNotNull(res)){
            this.dataBySH = res.data.data;
            this.totalData = this.dataBySH[0].total;
            this.pageNum = this.dataBySH[0].pageNum;
            this.pageSize = this.dataBySH[0].pageSize;
            console.log(this.dataBySH);

            //手动增加审核进度数据
            this.dataBySH[0].shjd = 1;
            this.dataBySH[1].shjd = 0;
            // this.dataByTB[2].shjd = 2;
            // this.dataByTB[3].shjd = 3;
            // this.dataByTB[4].shjd = 4;


            //赋值在前端显示专业类别
            this.dataBySH.forEach(function (v) {
              v.zylbArray = [];
              v.zylbArray[0] = '市场营销';
              v.zylbArray[1] = v.zylb;


            });
            //赋值在前端显示需求单分类
            this.dataBySH.forEach(function (v) {
              v.xqdfl = [];
              v.xqdfl= v.xqfl.split(",");
              let xqdflArray =[];
              for (let i = 0; i < v.xqdfl.length-1; i++) {
                if(v.xqdfl[i]=="ZCXXQ"){
                  v.xqdfl[i]="ZCXXQ,";
                }else if(v.xqdfl[i]=="XYWXQ"){
                  v.xqdfl[i]="XYWXQ,";
                }else if(v.xqdfl[i]=="XJXXQ"){
                  v.xqdfl[i]="XJXXQ,";
                }else if(v.xqdfl[i]=="XTYHXQ"){
                  v.xqdfl[i]="XTYHXQ,";
                }
                xqdflArray.push(v.xqdfl[i]);
              }
              v.xqdfl = xqdflArray;
            });

          }else {
            this.dataBySH = [];
          }

        }).catch(err => {
          //console.info('报错的信息', err);
        }).then(function () {
          //关闭加载动画
          thisVue = Bus.closeLoading(thisVue);
          thisVue.clearSingleData();
        });
      }
    },
    created() {
      //请求后台获取需求单填报数据
      console.log(this.tableType);
      console.log(this.pageNum);
      console.log(this.pageSize);
      console.log(this.queryParam);
      this.queryData();
      //手动获取数据
      // let data = [];
      // for (let i = 0; i <= 9; i++) {
      //   let a = {
      //     //name: 'John Brown 填报' + Math.floor(Math.random() * 100 + 1),
      //     name: i,
      //     age: '',
      //     address: '审核，New York No. 1 Lake Park' + Math.floor(Math.random() * 100 + 1),
      //   };
      //   data.push(a);
      // }
      // data[0].age = 'New';
      // data[1].age = 'ProAudit';
      // data[2].age = 'ProModif';
      // data[3].age = 'PowerAudit';
      // data[4].age = 'PowerModif';
      // data[5].age = 'Pass';
      // data[6].age = 'ProCancel';
      // data[7].age = 'PowerCancel';
      // data[8].age = 'Cancel';
      // data[9].age = 'Cancel';
      // this.dataBySH = data;
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


      let thisVue = this;
      //解决事件多次绑定问题：在每次调用方法前先解绑事件( bus.$off )，然后在重新绑定( bus.$on )
      Bus.$off('zttjValueBySH');
      // 用$on事件来接收参数
      Bus.$on('zttjValueBySH', (data) => {
        console.log(data);
        thisVue.queryParam.gdzt = data;
        thisVue = Bus.handleSearch(thisVue);
        console.log(thisVue.queryParam);
        thisVue.queryData();
      });


      Bus.$off('shjdValueBySH');
      Bus.$on('shjdValueBySH', (data) => {
        console.log(data);
      });
    }
  }
</script>

<style scoped>
  .search_tb{
    width: 100%;
    margin-bottom: 5px;
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
