<template>
  <div id="add_model">
    申请单位或业务部门名称：
    <Input v-model="singleData.sqbmmc"  placeholder="Enter something..." clearable  style="width: 300px" />
    提出时间：
    <Date-picker v-model="singleData.tcsj" type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
    <table border="1" cellspacing="0px" style="border-collapse:collapse;width: 100%">
      <tr>
        <td width="100 px">*需求单名称</td>
        <td><Input v-model="singleData.xqmc"  placeholder="Enter something..." clearable  style="width: 100%" /></td>
      </tr>
      <tr>
        <td>申请人</td>
        <td style="border: 0px">
          <table style="border-collapse:collapse;width: 100%;border-top: none;border-bottom: none;border-left: none" border="1" >
            <tr>
              <td width="80px"><span class="text-danger"> * </span>姓名</td>
              <td colspan="3">
                <Input v-model="singleData.sqrxm"  placeholder="Enter something..." clearable  style="width: 100%" />
              </td>
            </tr>
            <tr>
              <td>*联系方式</td>
              <td>
                <Input v-model="singleData.sqrlxfs"  placeholder="Enter something..." clearable  style="width: 100%" />
              </td>
              <td width="80px">邮箱</td>
              <td style="vertical-align: top;">
                <Input v-model="singleData.sqryx"  placeholder="Enter something..." clearable  style="width: 100%" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>*专业类别</td>
        <td><Cascader :data="singleData.ywy" v-model="singleData.zylb" ></Cascader></td>
      </tr>
      <tr>
        <td>*需求单分类</td>
        <td><Checkbox-group v-model="singleData.xqdfl" >
          <Checkbox label="政策性需求"><Tooltip content="政策性需求">政策性需求</Tooltip></Checkbox>
          <Checkbox label="新业务需求"><Tooltip content="新业务需求">新业务需求</Tooltip></Checkbox>
          <Checkbox label="新技术需求"><Tooltip content="新技术需求">新技术需求</Tooltip></Checkbox>
          <Checkbox label="系统优化需求"><Tooltip content="系统优化需求">系统优化需求</Tooltip></Checkbox>
        </Checkbox-group></td>
      </tr>
      <tr>
        <td>*需求单综述</td>
        <td><i-input v-model="singleData.xqzs" type="textarea" :rows="8" placeholder="请输入..."></i-input></td>
      </tr>
      <tr>
        <td>*期望完成日期</td>
        <td><Date-picker v-model="singleData.qwwcsj" type="date" placeholder="选择日期" style="width: 100%"></Date-picker></td>
      </tr>
      <tr>
        <td>*部门级别</td>
        <td><Radio-group v-model="singleData.disabledGroup">
          <Radio label="网" disabled>网</Radio>
          <Radio label="省" disabled>省</Radio>
          <Radio label="地市" disabled>地市</Radio>
        </Radio-group></td>
      </tr>
    </table>
    <Upload  action="//jsonplaceholder.typicode.com/posts/">
      <Button  icon="ios-cloud-upload-outline">添加附件</Button>
    </Upload>
  </div>
</template>

<script>
  export default {
    name: 'add_model',
    data(){
      return{
        singleData:{
          sqbmmc:'',
          tcsj:'',
          xqmc:'',
          sqrxm:'',
          sqrlxfs:'',
          sqryx:'',
          xqzs:'',
          qwwcsj:'',
          disabledGroup: '网',
          zylb: [],
          xqdfl: [],
          ywy: [{
            value: 'scyx',
            label: '市场营销',
            children: [
              {
                value: 'jlzc',
                label: '计量资产'
              },
              {
                value: 'jlzdh',
                label: '计量自动化'
              },
              {
                value: 'chs',
                label: '抄核收'
              },
              {
                value: 'zh',
                label: '综合'
              },
              {
                value: 'kf',
                label: '客服'
              },
              {
                value: 'scjj',
                label: '市场交易'
              },
              {
                value: 'yk',
                label: '叶扩'
              }
            ]
          }],
        }
      }
    },
    methods:{

      showSingleData(){
        //父组件点击ok调用新增方法
        console.log(this.singleData);
        //执行后台数据新建


        this.closeModal();
      },
      deleteSingleData(){
        //父组件点击cancel调用方法
        this.closeModal();
      },
      //关闭模态框，把数据清空
      closeModal(){
        this.singleData = {};
      }
    },
  }
</script>

<style scoped>
#add_model{
  /*width: 1200px;*/
}
</style>
