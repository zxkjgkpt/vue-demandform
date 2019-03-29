<template>
  <div id="table_tb">
    <div class="search_tb">
      <Input clearable size="small" v-model="queryParam.xqdh" placeholder="需求单号查询..." style="width: 200px"
             suffix="ios-search"/>
      <Input clearable size="small" v-model="queryParam.xqmc" placeholder="需求单名称查询..." style="width: 200px"
             suffix="ios-search"/>
      <Input clearable size="small" v-model="queryParam.sqbmmc" placeholder="申请单位查询..." style="width: 200px"
             suffix="ios-search"/>

      <DatePicker size="small" v-model="queryParam.date" format="yyyy/MM/dd" type="daterange" placement="bottom-end"
                  placeholder="开始时间——结束时间" style="width: 200px"></DatePicker>

      <Input v-if="showSelectInput.xqzs" clearable size="small" v-model="queryParam.xqzs" placeholder="需求单综述查询..."
             style="width: 200px" suffix="ios-search"/>
      <Input v-if="showSelectInput.sqrxm" clearable size="small" v-model="queryParam.sqrxm" placeholder="申请人查询..."
             style="width: 200px" suffix="ios-search"/>
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
      <Input v-if="showSelectInput.wshr" clearable size="small" v-model="queryParam.wshr" placeholder="审核人查询..."
             style="width: 200px" suffix="ios-search"/>

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
      <Button size="small" type="primary" @click="showNewOrEditOrView('view')">
        <Icon type="ios-chatboxes-outline"/>
        查看
      </Button>

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
      width="80%">
      <!--页头-->
      <p slot="header" style="color:#f60;text-align:center">
        <span>新增信息化需求单</span>
      </p>
      <add_model ref="add_model"></add_model>
      <!--页脚-->
      <div slot="footer">
        <i-button type="primary" shape="circle" @click="addYwy">添加业务域</i-button>
        <i-button type="primary" shape="circle" @click="addYyy">添加应用域</i-button>
        <i-button type="success" @click="">保存</i-button>
        <i-button type="warning" @click="okByNew">提交</i-button>
        <i-button @click="cancelByNew">关闭</i-button>
      </div>
    </Modal>
    <Modal
      v-model="modalEdit"
      title="编辑信息化需求单"
      :mask-closable="false"
      @on-ok="okByEdit"
      @on-cancel="cancelByEdit">
      <edit_model ref="edit_model" v-bind:singleData="singleData"></edit_model>
    </Modal>
    <Modal
      v-model="modalView"
      title="查看信息化需求单"
      :mask-closable="false"
      cancel-text=""
      ok-text="关闭"
      @on-ok="exitModal"
    >
      <edit_model v-bind:singleData="singleData" v-bind:isShowView="isShowView"></edit_model>
    </Modal>
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
        selectValue: '',
        isShowView: false,
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
          //目前还拿不到创建人ID
          //cjrid:UserInfoS.getUserInfo().id,
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
        this.modalEdit = true;
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
      //新增模态框确定
      okByNew() {

        let check = this.$refs.add_model.checkFrom();
        if (check) {
          this.$refs.add_model.showSingleData();
          this.$Message.success('新建成功');
          this.clearSingleData();
          this.modalNew = false;
        }
        //this.$Message.error('新建失败');
      },
      //新增模态框取消
      cancelByNew() {
        this.$Message.warning('取消');
        this.$refs.add_model.deleteSingleData();
        this.clearSingleData();
        this.modalNew = false;
      },
      //添加业务域
      addYwy() {
        this.$refs.add_model.AddYwyList();
      },
      //添加应用域
      addYyy() {
        this.$refs.add_model.AddYyyList();
      },
      //编辑模态框确定
      okByEdit() {
        this.$Message.success('编辑成功');
        //this.$Message.error('编辑失败');
        this.$refs.edit_model.showSingleData();
      },
      //编辑模态框取消
      cancelByEdit() {
        this.$Message.warning('取消');
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
          if (JSON.stringify(this.singleData) == '{}') {
            this.$Message.warning('请先选中表格中的一行数据！')
          } else {
            if (type == 'view') {
              this.isShowView = true;
              //查看操作
              this.modalView = true;
            } else {
              //编辑操作
              this.modalEdit = true;
            }
          }
        }
      },
      //弹出删除操作模态框
      showDeleteModal() {
        if (JSON.stringify(this.singleData) == '{}') {
          this.$Message.warning('请先选中表格中的一行数据！')
        } else {
          this.confirm = true;
          this.deleteTitle = '您确认删除这条内容吗？'
        }
      },
      //执行删除
      okByDelete() {
        console.log(this.singleData);
        this.$Message.success('删除成功');
        //this.$Message.error('删除失败');
        this.clearSingleData()
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
        Bus.clearSingleData(thisVue);
      },
      //重置
      reset() {
        let thisVue = this;
        thisVue = Bus.reset(thisVue);
      },
      //搜索
      handleSearch() {
        //显示加载动画
        this.showLoading();

        this.queryParam = Bus.handleSearch(this.queryParam);

        console.log(this.queryParam);

        let thisVue = this;   // 当前this指向的是一个组件
        setTimeout(function () {
          thisVue.closeLoading(thisVue);
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
        this.showSelectInput = Bus.getItemValue(val, this.showSelectInput);
      },
      //刷新
      refreshData() {
        this.queryData();
      },
      //显示加载动画
      showLoading(thisVue){
        if (thisVue){
          thisVue.loading = true;
        } else {
          this.loading = true;
        }
      },
      //关闭加载动画
      closeLoading(thisVue){
        if (thisVue){
          thisVue.loading = false;
        } else {
          this.loading = false;
        }
      },
      //请求后台数据
      queryData() {
        //显示加载动画
        this.showLoading();

        this.$axios({
          url: 'xqd/xqdxx/findList/' + this.pageNum + '/' + this.pageSize,//请求的地址
          method: 'post',//请求的方式
          data: this.queryParam //请求参数
        }).then(res => {
          if (res.data.code == '10001'){
            this.dataByTB = res.data.data;
            console.log(this.dataByTB);

          }
        }).catch(err => {
          console.info('报错的信息', err);
        });

        //关闭加载动画
        this.closeLoading();
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
      let thisVue = this;
      // 用$on事件来接收参数
      Bus.$on('zttjValueByTB', (data) => {
        console.log(data);
        thisVue.showLoading(thisVue);

        setTimeout(function () {
          thisVue.closeLoading(thisVue)
        }, 2000) //   function 里面的this指向的是windows
      });

      Bus.$on('shjdValueByTB', (data) => {
        console.log(data);
        thisVue.showLoading(thisVue);

        setTimeout(function () {
          thisVue.closeLoading(thisVue)
        }, 2000) //   function 里面的this指向的是windows
      })


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
