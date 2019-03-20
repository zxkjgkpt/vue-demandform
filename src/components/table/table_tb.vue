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
    </div>
    <Table border  :loading="loading" highlight-row :height="520" ref="currentRowTableByTB" :columns="columnsByTB" :data="dataByTB" @on-row-dblclick="showDetailed" @on-current-change="handleRowChange" ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="totalData" show-total  :current="pageNum" :page-size="pageSize" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
      </div>
    </div>
    <Modal
      v-model="modalNew"
      title="新增需求单"
      :mask-closable="false"
      @on-ok.once="ok"
      @on-cancel.once="cancel">
      <add_model></add_model>
    </Modal>
    <Modal
      v-model="modalEdit"
      title="编辑需求单"
      :mask-closable="false"
      @on-ok.once="ok"
      @on-cancel.once="cancel">
      <edit_model v-bind:singleData="singleData" ></edit_model>
    </Modal>
    <Modal
      v-model="modalView"
      title="查看需求单"
      :mask-closable="false"
      @on-ok.once="ok"
      @on-cancel.once="cancel">
      <edit_model v-bind:singleData="singleData" ></edit_model>
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
        singleData:{},
        selectValue:'',
        searchData:{
          name: '',
          age:'',
          address:''
        },
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
      //模态框确定
      ok () {
        this.$Message.success('确定！');
      },
      //模态框取消
      cancel () {
        this.$Message.warning('取消！');
      },
      //表格中选中当前某一行数据
      handleRowChange(currentRow){
        //增加判断是否为查看的标识符
        currentRow.isShowView = false;
        this.singleData = currentRow;
      },
      //新建模态框
      //新增或者编辑或者查看
      showNewOrEditOrView(type){
        if (type == 'new') {
          this.modalNew = true;
        }else {
          if (JSON.stringify(this.singleData)=='{}'){
            this.$Message.warning('请先选中表格中的一行数据！')
          } else {
            if (type == 'view') {
              //查看操作
              this.singleData.isShowView = true;
              this.modalView = true;
            }else {
              this.singleData.isShowView = false;
              this.modalEdit = true;
            }
          }
        }
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
      }
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
