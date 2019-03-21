<template>
  <div id="table_tb">
    <div class="search_tb">
      <Select v-model="selectValue" placeholder="新增条件" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Input v-model="searchData.name"  placeholder="Name查询..." style="width: 300px"  suffix="ios-search" />
      <Input v-model="searchData.age" placeholder="age查询..." style="width: 300px" suffix="ios-search" />
      <Input v-model="searchData.address" placeholder="address查询..." style="width: 300px" suffix="ios-search" />
      <Button type="success" @click="handleSearch">查询</Button>
      <Button type="warning" @click="reset">重置</Button>
      <br>
      <Button type="primary" @click="showNewOrEditOrView('new')">新增</Button>
      <Button type="primary" @click="showNewOrEditOrView('edit')">编辑</Button>
      <Button type="primary" @click="showNewOrEditOrView('view')">查看</Button>
      <Button type="primary" @click="showDeleteModal">删除</Button>
    </div>
    <Table border  highlight-row :loading="loading"  :height="520" ref="currentRowTableByTB" :columns="columnsByTB" :data="dataByTB" @on-row-dblclick="showDetailed" @on-current-change="handleRowChange" ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="totalData" show-total  :current="pageNum" :page-size="pageSize" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
      </div>
    </div>
    <Modal
      v-model="modalNew"
      title="新增需求单"
      :mask-closable="false"
      @on-ok="okByNew"
      @on-cancel="cancelByNew">
      <add_model ref="add_model"></add_model>
    </Modal>
    <Modal
      v-model="modalEdit"
      title="编辑需求单"
      :mask-closable="false"
      @on-ok="okByEdit"
      @on-cancel="cancelByEdit">
      <edit_model ref="edit_model" v-bind:singleData="singleData"></edit_model>
    </Modal>
    <Modal
      v-model="modalView"
      title="查看需求单"
      :mask-closable="false"
      cancel-text=""
      ok-text="关闭"
      @on-ok="exitModal"
      >
      <edit_model v-bind:singleData="singleData" v-bind:isShowView="isShowView"></edit_model>
    </Modal>
    <Modal
      v-model="modalDelete"
      title="删除操作"
      :mask-closable="false"
      @on-ok="okByDelete"
      @on-cancel="cancelByDelete">
      <h2 style=" text-align: center">您确认删除这条内容吗？</h2>
    </Modal>
  </div>
</template>

<script>
  import Edit_model from "./edit/edit_model";
  import Add_model from "./edit/add_model";
  export default {
    name: 'table_tb',
    components: {Add_model, Edit_model},
    data(){
      return{
        loading: false,
        columnsByTB: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        dataByTB: [],
        totalData:100,
        pageNum:1,
        pageSize:10,
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        modalNew: false,
        modalEdit: false,
        modalView: false,
        modalDelete:false,
        singleData:{},
        selectValue:'',
        searchData:{
          name: '',
          age:'',
          address:''
        },
        isShowView:false
      }
    },
    methods:{
      //双击获取详细信息
      showDetailed(){
        this.modalEdit = true;
      },
      //翻页
      changePage (value) {
        this.pageNum = value;
        //获取数据
        //...
        //参考地址：https://blog.csdn.net/u013144287/article/details/78879044
      },
      //改变每页显示的条数
      changePageSize (value) {
        this.pageSize = value;
        //...
        //参考地址：https://blog.csdn.net/u013144287/article/details/78879044

      },
      //新增模态框确定
      okByNew () {
        this.$refs.add_model.showSingleData();
        this.$Message.success('新建成功');
        this.clearSingleData();
        //this.$Message.error('新建失败');
      },
      //新增模态框取消
      cancelByNew () {
        this.$Message.warning('取消');
        this.$refs.add_model.deleteSingleData();
        this.clearSingleData();
      },
      //编辑模态框确定
      okByEdit () {
        this.$Message.success('编辑成功');
        //this.$Message.error('编辑失败');
        this.$refs.edit_model.showSingleData();
      },
      //编辑模态框取消
      cancelByEdit () {
        this.$Message.warning('取消');
        this.clearSingleData();
      },
      //查看模态框退出
      exitModal(){
        this.$Message.warning('退出');
        this.clearSingleData();
      },
      //表格中选中当前某一行数据
      handleRowChange(currentRow){
        this.singleData = currentRow;
      },
      //新增或者编辑或者查看
      showNewOrEditOrView(type){
        if (type == 'new') {
          this.modalNew = true;
        }else {
          if (JSON.stringify(this.singleData)=='{}'){
            this.$Message.warning('请先选中表格中的一行数据！')
          } else {
            if (type == 'view') {
              this.isShowView = true;
              //查看操作
              this.modalView = true;
            }else {
              //编辑操作
              this.modalEdit = true;
            }
          }
        }
      },
      //弹出删除操作模态框
      showDeleteModal(){
        if (JSON.stringify(this.singleData)=='{}'){
          this.$Message.warning('请先选中表格中的一行数据！')
        }else {
          this.modalDelete = true;
        }
      },
      //执行删除
      okByDelete(){
        console.log(this.singleData);
        this.$Message.success('删除成功');
        //this.$Message.error('删除失败');
        this.clearSingleData()
      },
      //取消删除
      cancelByDelete(){
        this.$Message.warning('取消');
      },
      //清除选中的数据
      clearSingleData(){
        //清除选中的行
        this.$refs.currentRowTableByTB.clearCurrentRow();
        this.singleData = {};
      },
      //重置
      reset(){
        this.searchData = {};
      },
      //搜索
      handleSearch(){
        console.log(this.searchData);
        this.loading = true;

        let thisTable = this;   // 当前this指向的是一个组件
        setTimeout(function(){
          thisTable.loading = false;
          },2000) //   function 里面的this指向的是windows


        //通过传值到后台，请求数据返回结果为searchedData赋值给this.dataByTB，就能实现搜索
        //this.dataByTB = searchedData;
      },
    },
    created() {
      //手动获取数据
      let data = [];
      for (let i = 1; i <= 10 ; i++) {
        let a = {
          name: 'John Brown 填报' + Math.floor(Math.random () * 100 + 1),
          age: Math.floor(Math.random () * 100 + 1),
          address: 'New York No. 1 Lake Park' + Math.floor(Math.random () * 100 + 1),
        };
        data.push(a);
      }
      this.dataByTB = data;
    }
  }
</script>

<style scoped>
.search_tb{
  width: 100%;
  height: 66px;
}
</style>
