<template>
  <div id="xqd_index">
    <Layout style="height: 100%">
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu @on-select="turnUrl" mode="horizontal" theme="dark" active-name="tb">
          <div class="layout-logo">需求单管理</div>
          <div class="layout-nav">
            <MenuItem name="tb">
              <Icon type="ios-navigate"></Icon>
              需求单填报
            </MenuItem>
            <MenuItem name="zl">
              <Icon type="ios-keypad"></Icon>
              需求单总览
            </MenuItem>
            <MenuItem name="sh">
              <Icon type="ios-analytics"></Icon>
              需求单审核
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '70px 20px 0', background: '#fff', minHeight: '50%'}">
        <!--把tableType传给table模块，获取相应的需求单填报或总览或审核数据-->
        <Table_tb v-if="tableType == 'xqtb'" v-bind:tableType="tableType"></Table_tb>
        <Table_zl v-if="tableType == 'xqzl'" v-bind:tableType="tableType"></Table_zl>
        <table_sh v-if="tableType == 'xqsh'" v-bind:tableType="tableType"> </table_sh>
      </Content>
      <Footer class="layout-footer-center" style="padding: 10px 20px;">
        <zttj v-if="tableType == 'xqtb'"></zttj>
        <shjd v-if="tableType == 'xqtb'"></shjd>
      </Footer>
    </Layout>
  </div>
</template>

<script>
  import Table_tb from "./table/table_tb";
  import Table_zl from "./table/table_zl";
  import Table_sh from "./table/table_sh";
  import Zttj from "./table/Statistics/zttj";
  import Shjd from "./table/Statistics/shjd";


  export default {
    name: 'xqd_index',
    components: {Shjd, Zttj, Table_sh, Table_zl, Table_tb},
    data(){
      return {
        tableType:'xqtb',
      }
    },
    methods:{
      turnUrl(name) {
        // name是 <Menu-item name="timestamp">时间戳</Menu-item> 的name
        // 我的router有 /timestamp 于是使用了vue-router中的编程路由进行动态跳转
        if (name == 'tb'){
          this.tableType = 'xqtb';
        } else if (name == 'zl'){
          this.tableType = 'xqzl';
        }else if (name == 'sh'){
          this.tableType = 'xqsh';
        }
      }
    }
  }
</script>

<style scoped>
  #xqd_index{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    color: white;
    text-align: center;
    line-height: 30px;
    font-size: 17px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    float: left;
    /*margin-right: 20px;*/
  }
  .layout-footer-center{
    text-align: center;
  }
  .ivu-menu-item>i {
    margin-right: 0px;
    margin-left: 10px;
  }
</style>
