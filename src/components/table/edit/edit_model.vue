<template>
  <div id="edit_model">
    <span style="color: red">*</span>申请单位或业务部门名称：
    <Input v-model="singleData.sqbmmc"  :disabled="isShowView" placeholder="请输入..." clearable style="width: 300px"/>
    <span style="color: red" v-if="singleData.sqbmmc=='' ">申请单位或业务部门名称必填</span>
    <span style="color: red" v-if="singleData.sqbmmc != undefined  && singleData.sqbmmc.length>100">最多100字</span>
    <span style="color: red">*</span>提出时间：
    <Date-picker v-model="singleData.tcsj" :disabled="isShowView" type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
    <span style="color: red" v-if="singleData.tcsj==''">提出时间必填</span>
    <table border="1" cellspacing="0px" style="border-collapse:collapse;width: 100%">
      <tr>
        <td width="100 px">*需求单名称</td>
        <td><Input v-model="singleData.xqmc" :disabled="isShowView" placeholder="请输入..." clearable style="width: 100%"/>
          <span style="color: red" v-if="singleData.xqmc==''">需求单名称必填</span>
          <span style="color: red" v-if="singleData.xqmc != undefined  && singleData.xqmc.length>100">最多100字</span>
        </td>
      </tr>
      <tr>
        <td>申请人</td>
        <td style="border: 0px">
          <table style="border-collapse:collapse;width: 100%;border-top: none;border-bottom: none;border-left: none"
                 border="1">
            <tr>
              <td width="80px"> <span style="color: red">*</span>姓名</td>
              <td colspan="3">
                <Input v-model="singleData.sqrxm" :disabled="isShowView" placeholder="请输入..." clearable style="width: 100%"/>
                <span style="color: red" v-if="singleData.sqrxm==''">姓名必填</span>
                <span style="color: red" v-if="singleData.sqrxm != undefined  && singleData.sqrxm.length>25">最多25字</span>
              </td>
            </tr>
            <tr>
              <td><span style="color: red">*</span>联系方式</td>
              <td>
                <Input v-model="singleData.sqrlxfs" :disabled="isShowView" @on-change="checkNumber(singleData.sqrlxfs)"
                       placeholder="请输入..." clearable style="width: 100%"/>
                <span style="color: red" v-if="singleData.sqrlxfs==''">联系方式必填</span>
                <span style="color: red" v-if="this.newPhone">请输入数字</span>
                <span style="color: red" v-if="singleData.sqrlxfs != undefined  && singleData.sqrlxfs.length>11">最多11位数字</span>
              </td>
              <td width="80px">邮箱</td>
              <td style="vertical-align: top;">
                <Input v-model="singleData.sqryx" :disabled="isShowView" @on-change="checkEmail(singleData.sqryx)"
                       placeholder="请输入..." clearable style="width: 100%"/>
                <span style="color: red" v-if="this.newEmail">请输入正确的邮箱格式</span>
                <span style="color: red" v-if="singleData.sqryx != undefined  && singleData.sqryx.length>=100">最多100字</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>专业类别</td>
        <td>
          <Cascader :data="ywy" :disabled="isShowView" v-model="singleData.zylbArray" trigger="hover"></Cascader>
          <span style="color: red" v-if="singleData.zylb==''">至少选择一个专业</span>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>需求单分类</td>
        <td>
          <Checkbox-group v-model="singleData.xqdfl" >
            <Checkbox label="政策性需求" :disabled="isShowView">
              <Tooltip content="政策性需求">政策性需求</Tooltip>
            </Checkbox>
            <Checkbox label="新业务需求" :disabled="isShowView">
              <Tooltip content="新业务需求">新业务需求</Tooltip>
            </Checkbox>
            <Checkbox label="新技术需求" :disabled="isShowView">
              <Tooltip content="新技术需求">新技术需求</Tooltip>
            </Checkbox>
            <Checkbox label="系统优化需求" :disabled="isShowView">
              <Tooltip content="系统优化需求">系统优化需求</Tooltip>
            </Checkbox>
          </Checkbox-group>
          <span style="color: red" v-if="singleData.xqdfl==''">至少选择一个分类</span>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>需求单综述</td>
        <td>
          <i-input v-model="singleData.xqzs" :disabled="isShowView" type="textarea" :rows="8" placeholder="请输入..."></i-input>
          <span style="color: red" v-if="singleData.xqzs==''">需求单综述必填</span>
          <span style="color: red" v-if="singleData.xqzs != undefined  && singleData.xqzs.length>2000">最多2000字</span>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>期望完成日期</td>
        <td>
          <Date-picker v-model="singleData.qwwcsj" :disabled="isShowView" type="date" placeholder="选择日期" style="width: 100%"></Date-picker>
          <span style="color: red" v-if="singleData.qwwcsj==''">期望完成日期必填</span>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>部门级别</td>
        <td>
          <!--<Radio-group v-model="disabledGroup" >-->
          <!--<Radio label="网" disabled>网</Radio>-->
          <!--<Radio label="省" disabled>省</Radio>-->
          <!--<Radio label="地市" disabled>地市</Radio>-->
          <!--</Radio-group>-->
        </td>
      </tr>
    </table>

    <!--------------------------业务域------------------------------->
    <!--------------------------应用域------------------------------->
    <ywy_yyy ref="ywy_yyy"></ywy_yyy>

    <Upload action="//jsonplaceholder.typicode.com/posts/">
      <Button :disabled="isShowView" icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
  </div>
</template>

<script>
  // 引入公共的bus，来做为中间传达的工具
  import Bus from '../bus/bus'
  import Ywy_yyy from "./ywy_yyy";
  export default {
    name: 'edit_model',
    components: {Ywy_yyy},
    props: {
      singleData: {
        type: Object
      },
      isShowView: {
        type: Boolean
      }
    },
    data() {
      return {
        disabledGroup: '网',
        newPhone: false,
        newEmail: false,
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
      };
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
        console.log(this.singleData);
        if (s.zylb != '' && s.xqdfl != ''  && s.sqbmmc != '' &&s.sqbmmc.length<100 && s.xqmc.length<100 &&s.sqrxm.length<25
           &&s.xqzs.length<2000 && s.tcsj != '' && s.xqmc != '' && s.sqrxm != '' && s.sqrlxfs != ''
          && s.xqzs != '' && s.qwwcsj != '' && this.disabledGroup != '' && this.newPhone == false && this.newEmail == false
        ) {
          return true;
        } else {
          alert('请输入有效数据');
          return false;
        }
      },
      showSingleData() {
        //父组件点击ok调用方法
        console.log(this.singleData);
        //执行后台更新逻辑
      },
      deleteSingleData() {
        //父组件点击cancel调用方法
        this.closeModal();
      },
      //关闭模态框，把数据清空
      closeModal() {
        this.$refs.ywy_yyy.clearYwyAndYyy();
      }

    }
  }
</script>

<style scoped>

</style>
