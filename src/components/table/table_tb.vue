<template>
  <div id="table_tb">
    <div class="search_tb">
      <Poptip trigger="focus" content="需求单号查询，多选用逗号隔开...">
        <Input clearable size="small" v-model="queryParam.xqdh" placeholder="需求单号查询..." style="width: 200px"
               suffix="ios-search"/>
      </Poptip>
      <Poptip trigger="focus" content="需求单名称查询...">
        <Input clearable size="small" v-model="queryParam.xqmc" placeholder="需求单名称查询..." style="width: 200px"
               suffix="ios-search"/>
      </Poptip>
      <Poptip trigger="focus" content="申请单位查询...">
        <Input clearable size="small" v-model="queryParam.sqbmmc" placeholder="申请单位查询..." style="width: 200px"
               suffix="ios-search"/>
      </Poptip>

      <DatePicker size="small" v-model="queryParam.date" format="yyyy/MM/dd" type="daterange" placement="bottom-end"
                  placeholder="开始时间——结束时间" style="width: 200px"></DatePicker>

      <Poptip trigger="click" content="需求单综述查询...">
        <Input v-if="showSelectInput.xqzs" clearable size="small" v-model="queryParam.xqzs" placeholder="需求单综述查询..."
               style="width: 200px" suffix="ios-search"/>
      </Poptip>
      <Poptip trigger="click" content="申请人查询...">
        <Input v-if="showSelectInput.sqrxm" clearable size="small" v-model="queryParam.sqrxm" placeholder="申请人查询..."
               style="width: 200px" suffix="ios-search"/>
      </Poptip>
      <Select v-if="showSelectInput.gdzt" clearable size="small" v-model="queryParam.gdzt" style="width:200px"
              placeholder="状态选择...">
        <Option v-for="gdzt in gdztList" :value="gdzt.value" :key="gdzt.value">{{ gdzt.label }}</Option>
      </Select>
      <Select v-if="showSelectInput.fjbz" clearable size="small" v-model="queryParam.fjbz" style="width:200px"
              placeholder="有无附件选择...">
        <Option v-for="fjbz in fjbzList" :value="fjbz.value" :key="fjbz.value">{{ fjbz.label }}</Option>
      </Select>
      <Select v-if="showSelectInput.shjd" clearable size="small" v-model="queryParam.shjd" style="width:200px"
              placeholder="审核进度选择...">
        <Option v-for="shjd in shjdList" :value="shjd.value" :key="shjd.value">{{ shjd.label }}</Option>
      </Select>
      <Poptip trigger="click" content="审核人查询...">
        <Input v-if="showSelectInput.wshr" clearable size="small" v-model="queryParam.wshr" placeholder="审核人查询..."
               style="width: 200px" suffix="ios-search"/>
      </Poptip>


      <Cascader v-if="showSelectInput.zylbArray" trigger="hover" size="small" :data="zylbList"
                v-model="queryParam.zylbArray" style="width: 200px; display: inline-block"
                placeholder="专业类别查询..."></Cascader>


      <Select clearable size="small" v-model="selectValue" placeholder="新增条件" style="width:200px"
              @on-change="getItemValue">
        <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>

      <Button size="small" type="success" @click="handleSearch">
        <Icon type="ios-search"/>
        查询
      </Button>
      <Button size="small" type="warning" @click="reset">
        <Icon type="md-refresh" style="padding-bottom: 2px"/>
        重置
      </Button>
      <br>
    </div>
    <div class="buttonDiv">
      <Button size="small" type="primary" @click="showNewOrEditOrView('new')">
        <Icon type="md-add" style="padding-bottom: 2px"/>
        新增
      </Button>
      <Button size="small" type="primary" @click="showNewOrEditOrView('edit')">
        <Icon type="md-create" style="padding-bottom: 2px"/>
        编辑
      </Button>
      <!--<Button size="small" type="primary" @click="showNewOrEditOrView('view')">-->
        <!--<Icon type="ios-chatboxes-outline"/>-->
        <!--查看-->
      <!--</Button>-->

      <!--两个删除不能少-->
      <Poptip v-if="confirm"
              :confirm="confirm"
              :title="deleteTitle"
              @on-ok="okByDelete"
              @on-cancel="cancelByDelete">
        <Button size="small" type="primary" @click="showDeleteModal">
          <Icon type="md-remove" style="padding-bottom: 2px"/>
          删除
        </Button>
      </Poptip>
      <Button v-if="!confirm" size="small" type="primary" @click="showDeleteModal">
        <Icon type="md-remove" style="padding-bottom: 2px"/>
        删除
      </Button>

      <Button size="small" type="primary" @click="exportData">
        <Icon type="ios-share" style="padding-bottom: 2px"/>
        导出
      </Button>
    </div>
    <Table
      size="small"
      border
      highlight-row
      :loading="loading"
      :height="440"
      ref="currentRowTableByTB"
      :columns="columnsByTB"
      :data="dataByTB"
      @on-row-dblclick="showDetailed"
      @on-current-change="handleRowChange">
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
      <div class="refreshIcon" @click="refreshData">
        <Icon size="17" type="md-refresh"/>
      </div>
    </div>
    <Modal
      v-model="modalNew"
      width="80%"
      :mask-closable="false"
      @on-cancel="cancelByNew">
      <!--页头-->
      <p slot="header" style="color:#f60;text-align:center">
        <span>新增信息化需求单</span>
      </p>
      <add_model ref="add_model" v-bind:cjrid="queryParam.cjrid" v-bind:queryData="queryData"></add_model>
      <!--页脚-->
      <div slot="footer">
        <i-button type="primary" shape="circle" @click="addYwy">添加业务域</i-button>
        <i-button type="primary" shape="circle" @click="addYyy">添加应用域</i-button>
        <i-button type="success" @click="okByNew('save')">保存</i-button>
        <i-button type="warning" @click="okByNew('submit')">提交</i-button>
        <i-button @click="cancelByNew">关闭</i-button>
      </div>
    </Modal>
    <Modal
      v-model="modalEdit" width="80%"
      :mask-closable="false"
      @on-cancel="cancelByEdit"
    >
      <!--页头-->
      <p slot="header" style="color:#f60;text-align:center">
        <span>编辑信息化需求单</span>
      </p>
      <edit_model ref="edit_model" v-bind:singleData="singleData" v-bind:isShowView="isShowView" v-bind:queryData="queryData" v-bind:flowLogList="flowLogList"></edit_model>
      <!--页脚-->
      <div slot="footer">
        <i-button type="primary" shape="circle" @click="addYwy2" v-if="!this.isShowView">添加业务域</i-button>
        <i-button type="primary" shape="circle" @click="addYyy2" v-if="!this.isShowView">添加应用域</i-button>
        <i-button type="success" @click="okByEdit('save')" v-if="!this.isShowView">保存</i-button>
        <i-button type="warning" @click="okByEdit('submit')" v-if="!this.isShowView">提交</i-button>
        <i-button type="warning" @click="askZuofei" v-if="this.singleData.gdzt=='省级审批'||this.singleData.gdzt=='网级审批（联合信息部会签）'">申请作废</i-button>
        <i-button @click="cancelByEdit">关闭</i-button>
      </div>
    </Modal>
    <!--<Modal-->
      <!--v-model="modalView"-->
      <!--width="80%"-->
      <!--title="查看信息化需求单"-->
      <!--:mask-closable="false"-->
      <!--cancel-text=""-->
      <!--ok-text="关闭"-->
      <!--@on-ok="exitModal"-->
      <!--@on-cancel="exitModal"-->
    <!--&gt;-->
      <!--<edit_model v-bind:singleData="singleData" v-bind:isShowView="isShowView"></edit_model>-->
    <!--</Modal>-->
  </div>
</template>

<script>
  import Edit_model from "./edit/edit_model";
  import Add_model from "./edit/add_model";


  // 引入公共的bus，来做为中间传达的工具
  import Bus from './bus/bus'

  export default {
    name: 'table_tb',
    components: {Add_model, Edit_model},
    props: {
      tableType: {
        type: String,
      },
      cjrid: {
        type: String
      }
    },
    data() {
      return {
        loading: false,
        columnsByTB: Bus.getTableColumnsByType(this.tableType),
        dataByTB: [],
        totalData: 100,
        pageNum: 1,
        pageSize: 10,
        selectList: Bus.getSelectList(),
        gdztList: Bus.getgdztList(),
        fjbzList: Bus.getfjbzList(),
        shjdList: Bus.getshjdList(),
        zylbList: Bus.getzylbList(),
        modalNew: false,
        modalEdit: false,
        modalView: false,
        singleData: {},
        flowLogList:[],
        selectValue: '',
        isShowView: true,
        confirm: false,
        deleteTitle: '',
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
        //只有审核进度为新建或者状态为不通过的才能编辑
        if (this.singleData.shjd == 0 || this.singleData.gdzt == 'New') {
          this.isShowView = false;
        } else {
          this.isShowView = true;
        }
        this.modalEdit = true;
        this.$refs.edit_model.changeValueBySingleData(this.singleData);
        //根据单号查询流程记录
        let thisVue=this;
        Bus.selectFlowlog(thisVue);
        // console.log(this.flowLogList);
        // console.log(this.singleData);
      },
      //翻页
      changePage(value) {
        this.pageNum = value;
        //获取数据
        this.queryData();
      },
      //改变每页显示的条数
      changePageSize(value) {
        this.pageNum = 1;
        this.pageSize = value;
        //获取数据
        this.queryData();
      },
      //申请作废
      askZuofei() {
        this.$refs.edit_model.zuofei();
        this.modalEdit=false;
      },
      //新增模态框确定
      okByNew(type) {
        let check = this.$refs.add_model.checkFrom();
        if(type=='save') {
          if (check) {
            this.$refs.add_model.showSingleData('save');
            this.$Message.success('新建成功');
            this.clearSingleData();
            //关闭模态框
            this.modalNew = false;
          }
        }
        if(type=='submit') {
          if (check) {
            this.$refs.add_model.showSingleData('submit');
            this.$Message.success('新建成功');
            this.clearSingleData();
            //关闭模态框
            this.modalNew = false;
          }
        }
          // this.queryData();
        // this.queryData();
        //this.$Message.error('新建失败');
      },
      //新增模态框取消
      cancelByNew() {
        this.$Message.warning('取消');
        this.$refs.add_model.deleteSingleData();
        this.clearSingleData();
        this.modalNew = false;
      },
      //新增页面添加业务域
      addYwy() {
        this.$refs.add_model.AddYwyList();
      },
      //编辑页面添加业务域
      addYwy2() {
        this.$refs.edit_model.AddYwyList();
      },
      //新增页面添加应用域
      addYyy() {
        this.$refs.add_model.AddYyyList();
      },
      //编辑页面添加应用域
      addYyy2() {
        this.$refs.edit_model.AddYyyList();
      },
      //编辑模态框确定
      okByEdit(type) {
        if(type=='save') {
          let check = this.$refs.edit_model.checkFrom();
          if (check) {
            this.$refs.edit_model.showSingleData('save')
            this.$Message.success('编辑成功');
            this.$refs.edit_model.deleteSingleData();
            //this.$Message.error('编辑失败');;
            this.clearSingleData();
            this.modalEdit = false;
          }
        }
        if(type=='submit') {
          let check = this.$refs.edit_model.checkFrom();
          if (check) {
            this.$refs.edit_model.showSingleData('submit')
            this.$Message.success('编辑成功');
            this.$refs.edit_model.deleteSingleData();
            //this.$Message.error('编辑失败');;
            this.clearSingleData();
            this.modalEdit = false;
          }
        }

      },
      //编辑模态框取消
      cancelByEdit() {
        this.$Message.warning('取消');
        this.$refs.edit_model.deleteSingleData();
        this.modalEdit = false;

        this.clearSingleData();
      },
      //查看模态框退出
      exitModal() {
        this.$Message.warning('退出');
        this.clearSingleData();
      },
      //表格中选中当前某一行数据
      handleRowChange(currentRow) {
        this.singleData = currentRow;

        this.confirm = true;
      },
      //新增或者编辑或者查看
      showNewOrEditOrView(type) {
        if (type == 'new') {
          this.modalNew = true;
        } else {
          if (Bus.isEmptyObject(this.singleData)) {
            this.$Message.warning('请先选中表格中的一行数据！')
          } else {
            if (type == 'view') {
              this.isShowView = true;
              //查看操作
              this.modalView = true;
            } else {
              //编辑操作
              //只有审核进度为新建或状态为不通过的才能编辑
              if (this.singleData.shjd == 0 || this.singleData.gdzt == 'PowerModif') {
                this.isShowView = false;
              } else {
                this.isShowView = true;
              }
              this.$refs.edit_model.changeValueBySingleData(this.singleData);
              this.modalEdit = true;
            }
          }
        }
      },
      //弹出删除操作模态框
      showDeleteModal() {
        if (Bus.isEmptyObject(this.singleData)) {
          this.$Message.warning('请先选中表格中的一行数据！')
        } else {
          this.confirm = true;
          this.deleteTitle = '您确认删除这条内容吗？'
        }
      },
      //执行删除
      okByDelete() {
        let thisVue = this;
        console.log(thisVue.singleData);
        let params = {
          xqdh : thisVue.singleData.xqdh
        };
        this.$axios({
          url: 'xqd/xqdxx/delete',
          method: 'post',//请求的方式
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          // data: JSON.stringify(thisVue.singleData), //请求参数
          data: JSON.stringify(params)
        }).then(res => {
          console.log(res);
          if (Bus.checkRespondAndDataNotNull(res)) {

            thisVue.$Message.success('删除成功');

            thisVue.queryData();

            //公共bus.js，用于非父子组件进行传值
            Bus.$emit('queryZttjByTB', true);

          } else {
            thisVue.$Message.error('删除失败')
          }
        }).catch(err => {
          //console.info('报错的信息', err);
        }).then(function () {
          thisVue.clearSingleData();
        });

      },
      //取消删除
      cancelByDelete() {
        this.clearSingleData();
        this.$Message.warning('取消');
      },
      //清除选中的数据
      clearSingleData() {

        //清除选中的行
        this.$refs.currentRowTableByTB.clearCurrentRow();

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

        this.queryData();
      },
      //导出
      exportData() {
        console.log(this.queryParam);
        let thisVue = this;
        Bus.exportExcel(thisVue, '需求单填报');
      },
      //获取下拉框选中的值
      getItemValue(val) {
        this.showSelectInput = Bus.getItemValue(val, this.showSelectInput);
      },
      //刷新
      refreshData() {
        this.queryData();
      },
      //请求后台数据
      queryData() {

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
          // console.log(this.queryParam);
          if (Bus.checkRespondAndDataNotNull(res)) {
            this.dataByTB = res.data.data;
            this.totalData = this.dataByTB[0].total;
            this.pageNum = this.dataByTB[0].pageNum;
            this.pageSize = this.dataByTB[0].pageSize;
            // console.log(this.dataByTB);

            //手动增加审核进度数据
            this.dataByTB[0].shjd = 1;
             this.dataByTB[1].shjd = 0;
            // this.dataByTB[2].shjd = 2;
            // this.dataByTB[3].shjd = 3;
            // this.dataByTB[4].shjd = 4;


            //赋值在前端显示专业类别
            this.dataByTB.forEach(function (v) {
              v.zylbArray = [];
              v.zylbArray[0] = '市场营销';
              v.zylbArray[1] = v.zylb;

              // if (v.zylb == "计量资产") {
              //   v.zylbArray[1] = '计量资产';
              // } else if (v.zylb == "计量自动化") {
              //   v.zylbArray[1] = '计量自动化';
              // } else if (v.zylb == "抄核收") {
              //   v.zylbArray[1] = '抄核收';
              // } else if (v.zylb == "综合") {
              //   v.zylbArray[1] = '综合';
              // } else if (v.zylb == "客服") {
              //   v.zylbArray[1] = '客服';
              // } else if (v.zylb == "市场交易") {
              //   v.zylbArray[1] = '市场交易';
              // } else if (v.zylb == "业扩") {
              //   v.zylbArray[1] = '业扩';
              // }

            });
            //赋值在前端显示需求单分类
            this.dataByTB.forEach(function (v) {
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
          } else {
            this.dataByTB = [];
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
      // console.log(this.pageNum);
      // console.log(this.pageSize);
      // console.log(this.queryParam);

      this.queryData();
    },
    //用于双击柱状图，根据参数查询需求填报数据
    mounted: function () {
      let thisVue = this;
      //解决事件多次绑定问题：在每次调用方法前先解绑事件( bus.$off )，然后在重新绑定( bus.$on )
      Bus.$off('zttjValueByTB');
      // 用$on事件来接收参数
      Bus.$on('zttjValueByTB', (data) => {
        console.log(data);
        thisVue.queryParam.gdzt = data;
        thisVue = Bus.handleSearch(thisVue);
        console.log(thisVue.queryParam);
        thisVue.queryData();
      });


      Bus.$off('shjdValueByTB');
      Bus.$on('shjdValueByTB', (data) => {
        // console.log(data);
      });
    }
  }
</script>

<style scoped>
  .search_tb {
    width: 100%;
    margin-bottom: 5px;
  }

  .buttonDiv {
    margin-bottom: 2px;
  }

  .refreshIcon {
    float: right;
    margin-top: 2px;
    margin-right: 6px;
    padding-right: 5px;
    border-right: solid 1px rgba(0, 0, 0, .2);
    cursor: pointer;
  }
</style>
