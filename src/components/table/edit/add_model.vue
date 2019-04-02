<template>
  <div id="add_model">
    *申请单位或业务部门名称：
    <Input v-model="singleData.sqbmmc" placeholder="Enter something..." clearable style="width: 300px"/>
    <span style="color: red" v-if="singleData.sqbmmc==''">申请单位或业务部门名称必填</span>
    <span style="color: red" v-if="singleData.sqbmmc.length>=100">最多100字</span>
    *提出时间：
    <Date-picker v-model="singleData.tcsj" type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
    <span style="color: red" v-if="singleData.tcsj==''">提出时间必填</span>
    <table border="1" cellspacing="0px" style="border-collapse:collapse;width: 100%">
      <tr>
        <td width="100 px">*需求单名称</td>
        <td><Input v-model="singleData.xqmc" placeholder="Enter something..." clearable style="width: 100%"/>
          <span style="color: red" v-if="singleData.xqmc==''">需求单名称必填</span>
          <span style="color: red" v-if="singleData.xqmc.length>100">最多100字</span>
        </td>
      </tr>
      <tr>
        <td>申请人</td>
        <td style="border: 0px">
          <table style="border-collapse:collapse;width: 100%;border-top: none;border-bottom: none;border-left: none"
                 border="1">
            <tr>
              <td width="80px"> * 姓名</td>
              <td colspan="3">
                <Input v-model="singleData.sqrxm" placeholder="Enter something..." clearable style="width: 100%"/>
                <span style="color: red" v-if="singleData.sqrxm==''">姓名必填</span>
                <span style="color: red" v-if="singleData.sqrxm.length>25">最多25字</span>
              </td>
            </tr>
            <tr>
              <td>*联系方式</td>
              <td>
                <Input v-model="singleData.sqrlxfs" @on-change="checkNumber(singleData.sqrlxfs)"
                       placeholder="Enter something..." clearable style="width: 100%"/>
                <span style="color: red" v-if="singleData.sqrlxfs==''">联系方式必填</span>
                <span style="color: red" v-if="this.newPhone">请输入数字</span>
                <span style="color: red" v-if="singleData.sqrlxfs.length>11">最多11位数字</span>
              </td>
              <td width="80px">邮箱</td>
              <td style="vertical-align: top;">
                <Input v-model="singleData.sqryx" @on-change="checkEmail(singleData.sqryx)"
                       placeholder="Enter something..." clearable style="width: 100%"/>
                <span style="color: red" v-if="this.newEmail">请输入正确的邮箱格式</span>
                <span style="color: red" v-if="singleData.sqryx.length>100">最多100字</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>*专业类别</td>
        <td>
          <Cascader :data="ywy" v-model="singleData.zylb" trigger="hover"></Cascader>
          <span style="color: red" v-if="singleData.zylb==''">至少选择一个专业</span>
        </td>
      </tr>
      <tr>
        <td>*需求单分类</td>
        <td>
          <Checkbox-group v-model="singleData.xqdfl">
            <Checkbox label="政策性需求">
              <Tooltip content="政策性需求">政策性需求</Tooltip>
            </Checkbox>
            <Checkbox label="新业务需求">
              <Tooltip content="新业务需求">新业务需求</Tooltip>
            </Checkbox>
            <Checkbox label="新技术需求">
              <Tooltip content="新技术需求">新技术需求</Tooltip>
            </Checkbox>
            <Checkbox label="系统优化需求">
              <Tooltip content="系统优化需求">系统优化需求</Tooltip>
            </Checkbox>
          </Checkbox-group>
          <span style="color: red" v-if="singleData.xqdfl==''">至少选择一个分类</span>
        </td>
      </tr>
      <tr>
        <td>*需求单综述</td>
        <td>
          <i-input v-model="singleData.xqzs" type="textarea" :rows="8" placeholder="请输入..."></i-input>
          <span style="color: red" v-if="singleData.xqzs==''">需求单综述必填</span>
          <span style="color: red" v-if="singleData.xqzs.length>25">最多2000字</span>
        </td>
      </tr>
      <tr>
        <td>*期望完成日期</td>
        <td>
          <Date-picker v-model="singleData.qwwcsj" type="date" placeholder="选择日期" style="width: 100%"></Date-picker>
          <span style="color: red" v-if="singleData.qwwcsj==''">期望完成日期必填</span>
        </td>
      </tr>
      <tr>
        <td>*部门级别</td>
        <td>
          <Radio-group v-model="disabledGroup">
            <Radio label="网" disabled>网</Radio>
            <Radio label="省" disabled>省</Radio>
            <Radio label="地市" disabled>地市</Radio>
          </Radio-group>
        </td>
      </tr>
    </table>


    <!--------------------------业务域------------------------------->
    <!--------------------------应用域------------------------------->
    <ywy_yyy ref="ywy_yyy"></ywy_yyy>





    <Upload action="//jsonplaceholder.typicode.com/posts/">
      <Button icon="ios-cloud-upload-outline">添加附件</Button>
    </Upload>
  </div>
</template>

<script>
  // 引入公共的bus，来做为中间传达的工具
  import Bus from '../bus/bus'

  import Ywy_yyy from "./ywy_yyy";

  export default {
    name: 'add_model',
    components: {Ywy_yyy},
    data() {
      return {
        disabledGroup: '网',
        newPhone: false,  //用于验证联系方式
        newEmail: false,  //用于验证邮箱
        ywy: [{
          value: '市场营销',
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
            },
            {
              value: '市场交易',
              label: '市场交易'
            },
            {
              value: '业扩',
              label: '业扩'
            }
          ]
        }],
        singleData: {
          zylb: [],
          xqdfl: [],
          sqbmmc: '',
          tcsj: '',
          xqmc: '',
          sqrxm: '',
          sqrlxfs: '',
          sqryx: '',
          xqzs: '',
          qwwcsj: ''

        },
      }
    },
    methods: {
      //添加业务域
      AddYwyList() {
        this.$refs.ywy_yyy.AddYwyList();
      },
      //添加应用域
      AddYyyList() {
        this.$refs.ywy_yyy.AddYyyList();
      },
      //验证联系方式是否为数字
      checkNumber(number) {
        this.newPhone = Bus.checkNumber(number);
      },
      //验证邮箱是否为正确格式
      checkEmail(number) {
        this.newEmail=Bus.checkEmail(number);
      },
      checkFrom() {
        var s = this.singleData;
//        console.log(s);
        if (s.sqbmmc != '' &&s.sqbmmc.length<100 && s.xqmc.length<100 &&s.sqrxm.length<25 &&s.sqrlxfs.length<11 &&s.sqryx.length<100 &&s.xqzs.length<2000
          && s.tcsj != '' && s.xqmc != '' && s.sqrxm != '' && s.sqrlxfs != '' && s.zylb.length > 0 && s.xqdfl.length > 0
          && s.xqzs != '' && s.qwwcsj != '' && this.disabledGroup != '' && this.newPhone == false && this.newEmail == false) {
          return true;
        } else {
          alert('请输入有效数据');
          return false;
        }
      },

      showSingleData() {
        //父组件点击ok调用新增方法
        console.log("aaa");
        console.log(this.singleData);
        //执行后台数据新建


        this.closeModal();
      },
      deleteSingleData() {
        //父组件点击cancel调用方法
        this.closeModal();
      },
      //关闭模态框，把数据清空
      closeModal() {
        this.newPhone = false;
        this.newEmail = false;
        for (let singleDataKey in this.singleData) {
          if (singleDataKey == 'zylb' || singleDataKey == 'xqdfl') {
            this.singleData[singleDataKey] = [];
          } else {
            this.singleData[singleDataKey] = '';
          }
        }

      }
    },
  }
</script>

<style scoped>

</style>
