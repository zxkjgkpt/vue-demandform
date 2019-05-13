<template>
  <div id="add_model">
    <span style="color: red">*</span>申请单位或业务部门名称：
    <Input v-model="singleData.sqbmmc" placeholder="请输入..." clearable style="width: 300px"/>
    <span style="color: red" v-if="singleData.sqbmmc==''">申请单位或业务部门名称必填</span>
    <span style="color: red" v-if="singleData.sqbmmc.length>=100">最多100字</span>
    <span style="color: red">*</span>提出时间：
    <Date-picker v-model="singleData.tcsj" type="date" :options="options3" placeholder="选择日期"
                 style="width: 200px"></Date-picker>
    <span style="color: red" v-if="singleData.tcsj==''">提出时间必填</span>
    <table border="1" cellspacing="0px" style="border-collapse:collapse;width: 100%">
      <tr>
        <td width="100 px"><span style="color: red">*</span>需求单名称</td>
        <td><Input v-model="singleData.xqmc" placeholder="请输入..." clearable style="width: 100%"/>
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
              <td width="80px"><span style="color: red">*</span>姓名</td>
              <td colspan="3">
                <Input v-model="singleData.sqrxm" placeholder="请输入..." clearable style="width: 100%"/>
                <span style="color: red" v-if="singleData.sqrxm==''">姓名必填</span>
                <span style="color: red" v-if="singleData.sqrxm.length>25">最多25字</span>
              </td>
            </tr>
            <tr>
              <td><span style="color: red">*</span>联系方式</td>
              <td>
                <Input v-model="singleData.sqrlxfs" @on-change="checkNumber(singleData.sqrlxfs)"
                       placeholder="请输入..." clearable style="width: 100%"/>
                <span style="color: red" v-if="singleData.sqrlxfs==''">联系方式必填</span>
                <span style="color: red" v-if="this.newPhone">请输入数字</span>
                <span style="color: red" v-if="singleData.sqrlxfs.length>11">最多11位数字</span>
              </td>
              <td width="80px">邮箱</td>
              <td style="vertical-align: top;">
                <Input v-model="singleData.sqryx" @on-change="checkEmail(singleData.sqryx)"
                       placeholder="请输入..." clearable style="width: 100%"/>
                <span style="color: red" v-if="this.newEmail">请输入正确的邮箱格式</span>
                <span style="color: red" v-if="singleData.sqryx.length>100">最多100字</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>专业类别</td>
        <td>
          <Cascader :data="ywy" v-model="singleData.zylbArray" trigger="hover"></Cascader>
          <span style="color: red" v-if="singleData.zylbArray==''">至少选择一个专业</span>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>需求单分类</td>
        <td>
          <Checkbox-group v-model="singleData.xqdfl">
            <Checkbox label="ZCXXQ,">
              <Tooltip content="政策性需求">政策性需求</Tooltip>
            </Checkbox>
            <Checkbox label="XYWXQ,">
              <Tooltip content="新业务需求">新业务需求</Tooltip>
            </Checkbox>
            <Checkbox label="XJXXQ,">
              <Tooltip content="新技术需求">新技术需求</Tooltip>
            </Checkbox>
            <Checkbox label="XTYHXQ,">
              <Tooltip content="系统优化需求">系统优化需求</Tooltip>
            </Checkbox>
          </Checkbox-group>
          <span style="color: red" v-if="singleData.xqdfl==''">至少选择一个分类</span>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>需求单综述</td>
        <td>
          <i-input v-model="singleData.xqzs" type="textarea" :rows="8" placeholder="请输入..."></i-input>
          <span style="color: red" v-if="singleData.xqzs==''">需求单综述必填</span>
          <span style="color: red" v-if="singleData.xqzs.length>25">最多2000字</span>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>期望完成日期</td>
        <td>
          <Date-picker v-model="singleData.qwwcsj" type="date" :options="options3" placeholder="选择日期"
                       style="width: 100%"></Date-picker>
          <span style="color: red" v-if="singleData.qwwcsj==''">期望完成日期必填</span>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>部门级别</td>
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


    <Upload
      class="xqd_UploadFile"
      action="xqd/xqdFile/xqdFileUpload"
      :max-size="61440"
      :on-exceeded-size="onExceededSize"
      :on-success="onSuccessFile"
      :on-error="onErrorFile"
      :before-upload="beforeUpload"
      :data='xqdFileBlocks'
      ref="uploadFile"
    >
      <Button icon="ios-cloud-upload-outline">添加附件</Button>
    </Upload>

    <div class="detailedDiv" v-for="(xqdFile,index) in xqdFileList">
      <img v-if="xqdFile.fileType.toLowerCase() == 'docx' ||  xqdFile.fileType.toLowerCase() == 'doc'"
           src="../../../assets/word.png" style="margin-right: 10px; float: left">
      <img v-else src="../../../assets/undifined.png" style="margin-right: 10px; float: left">
      <span>{{xqdFile.fileName}}</span>
      <br>
      <span style="margin-right: 20px">{{parseInt(xqdFile.fileSize/1024)}}k</span>
      <span v-if="xqdFile.isFileSuccess" style="color: green">上传成功</span>

      <Button style="float: right" size="small" type="primary" @click="checkFile(xqdFile)">查看</Button>
      <Button style="float: right" size="small" type="primary" @click="loadFile(xqdFile)">下载</Button>
      <Button style="float: right" size="small" type="primary" @click="deleteFile(xqdFile,index)">删除</Button>
    </div>
  </div>
</template>

<script>
  // 引入公共的bus，来做为中间传达的工具
  import Bus from '../bus/bus'

  import Ywy_yyy from "./ywy_yyy";

  export default {
    name: 'add_model',
    components: {Ywy_yyy},
    props: {
      cjrid: {
        type: String
      },
      queryData: {
        type: Function,
        default: null
      }
    },
    data() {
      return {
        //设置当前日期之前的为不可选
        options3: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        disabledGroup: '网',
        newPhone: false,  //用于验证联系方式
        newEmail: false,  //用于验证邮箱
        ywy: [{
          value: '市场营销',
          label: '市场营销',
          children: [
            {
              value: '抄表核算和账单',
              label: '抄表核算和账单'
            },
            {
              value: '收款',
              label: '收款'
            },
            {
              value: '管理线损',
              label: '管理线损'
            },
            {
              value: '用电检查',
              label: '用电检查'
            },
            {
              value: '服务渠道管理',
              label: '服务渠道管理'
            },
            {
              value: '客户关系管理',
              label: '客户关系管理'
            },
            {
              value: '客户停电管理',
              label: '客户停电管理'
            },
            {
              value: '资产管理',
              label: '资产管理'
            },
            {
              value: '运行管理',
              label: '运行管理'
            },
            {
              value: '实验室管理',
              label: '实验室管理'
            },
            {
              value: '需求侧管理',
              label: '需求侧管理'
            },
            {
              value: '市场化交易',
              label: '市场化交易'
            },
            {
              value: '营销稽查',
              label: '营销稽查'
            },
            {
              value: '系统支撑',
              label: '系统支撑'
            },
            {
              value: '班组标准化',
              label: '班组标准化'
            },
            {
              value: '外部集成',
              label: '外部集成'
            },
            {
              value: '移动营销',
              label: '移动营销'
            },
            {
              value: '电动汽车',
              label: '电动汽车'
            },
            {
              value: '网厅',
              label: '网厅'
            },
            {
              value: '客服大集中',
              label: '客服大集中'
            },
            {
              value: '其他',
              label: '其他'
            }
          ]
        }],
        singleData: {
          zylbArray: [],
          xqdfl: [],
          sqbmmc: '中国南方电网有限责任公司',
          tcsj: this.getTcsj(),
          xqmc: '',
          sqrxm: '',
          sqrlxfs: '',
          sqryx: '',
          xqzs: '',
          qwwcsj: '',
          zylb: '',
          xqfl: '',
          xqdh: '',
          cjrid: this.cjrid,
          cjsj: '',
          shr: '',
          gdzt: '',
          xqdFileList: [],
          ywyxxList: [],
          yyyxxList: []
        },
        xqdFileList: [],
        //上传时传给后台的参数
        xqdFileBlocks: {
          fileMd5: ''
        },
        showUploadList: true
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
        this.newEmail = Bus.checkEmail(number);
      },
      checkFrom() {
        let s = this.singleData;
        // console.log(s.xqdfl);
        // console.log(s);
        if (s.qwwcsj < s.tcsj) {
          alert('期望完成时间不能晚于提出时间');
          return false;
        }
        if (s.sqbmmc != '' && s.sqbmmc.length <= 100 && s.xqmc.length <= 100 && s.sqrxm.length <= 25 && s.sqrlxfs.length <= 11 && s.sqryx.length <= 100 && s.xqzs.length < 2000
          && s.tcsj != '' && s.xqmc != '' && s.sqrxm != '' && s.sqrlxfs != '' && s.zylbArray.length > 0 && s.xqdfl.length > 0
          && s.xqzs != '' && s.qwwcsj != '' && this.disabledGroup != '' && this.newPhone == false && this.newEmail == false) {
          return true;
        } else {
          alert('请输入有效数据');
          return false;
        }

      },
      //个位数前面补0的方法
      p(s) {
        return s < 10 ? '0' + s : s;
      },
      //提出时间默认显示当前时间
      getTcsj() {
        // let oDate = new Date(); //实例一个时间对象；
          let year = new Date().getFullYear();   //获取系统的年；
          let month = this.p(new Date().getMonth() + 1);   //获取系统月份，由于月份是从0开始计算，所以要加1
          let day = this.p(new Date().getDate()); // 获取系统日，
          return year + "年" + month + "月" + day + "日";
      },
      //格式化时间(年月日)
      formatDate(oDate) {
          let year = new Date(oDate).getFullYear();   //获取系统的年；
          let month = this.p(new Date(oDate).getMonth() + 1);   //获取系统月份，由于月份是从0开始计算，所以要加1
          let day = this.p(new Date(oDate).getDate()); // 获取系统日，
          return year + "年" + month + "月" + day + "日";
      },

      showSingleData(theType) {
        // console.log(this.singleData);
        let thisVue = this;
        //父组件点击ok调用新增方法
        //给后台专业类别传值
        this.singleData.zylb = this.singleData.zylbArray[1];
        //给后台需求分类传值
        for (let i = 0; i < this.singleData.xqdfl.length; i++) {
          this.singleData.xqfl = this.singleData.xqfl + this.singleData.xqdfl[i];
        }
        let oDate = new Date(); //实例一个时间对象；
        let year = oDate.getFullYear();   //获取系统的年；
        let month = this.p(oDate.getMonth() + 1);   //获取系统月份，由于月份是从0开始计算，所以要加1
        let day = this.p(oDate.getDate()); // 获取系统日，
        let hour = this.p(oDate.getHours()); //获取系统时，
        let min = this.p(oDate.getMinutes()); //分
        let second = this.p(oDate.getSeconds()); //秒
        let xqdh = year + month + day + hour + min + second + "";
        let cjsj = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + second;
        this.singleData.qwwcsj = this.formatDate(this.singleData.qwwcsj);
        this.singleData.tcsj = this.formatDate(this.singleData.tcsj);
        this.singleData.xqdh = xqdh;
        this.singleData.cjsj = cjsj;
        this.singleData.zzid="1";
        if (theType == 'save') {
          this.singleData.gdzt = "New";
        }
        //给后台传业务域
        this.singleData.ywyxxList = [];
        let ywyList = this.$refs.ywy_yyy.getYwyAndYyy();
        if (ywyList.length > 0) {
          for (let i = 0; i < ywyList.length; i++) {
            for (let showSelectInputKey in ywyList[i]) {
              if (ywyList[i][showSelectInputKey] == true) {
                if(showSelectInputKey.slice(0,4)=='ssyw'&&showSelectInputKey.length>6){
                  ywyList[i].ssywgfcl += showSelectInputKey.slice(4).toLocaleUpperCase()+",";
                }
                if(showSelectInputKey.slice(0,4)=='ywlc'&&showSelectInputKey.length>6){
                  ywyList[i].ywlcgfcl += showSelectInputKey.slice(4).toLocaleUpperCase()+",";
                }
                if(showSelectInputKey.slice(0,4)=='lcjd'&&showSelectInputKey.length>6){
                  ywyList[i].lcjdgfcl += showSelectInputKey.slice(4).toLocaleUpperCase()+",";
                }
              }
            }
            this.singleData.ywyxxList[i]=ywyList[i];
          }
          // console.log(this.singleData.ywyxxList);
          // console.log(this.singleData);
        }
        //传应用域
        this.singleData.yyyxxList = [];
        let yyyList = this.$refs.ywy_yyy.getYyy();
        for (let i = 0; i < yyyList.length; i++) {
          this.singleData.yyyxxList[i]=yyyList[i];
        }
        //传文件
        // debugger;
        this.singleData.xqdFileList=thisVue.xqdFileList;
        // console.log(thisVue.singleData);
        //执行后台数据新建
        if(theType=='save') {
          this.$axios({
            url: 'xqd/xqdxx/insertSelective',
            method: 'post',//请求的方式
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            data: JSON.stringify(thisVue.singleData), //请求参数
          }).then(res => {
            if (Bus.checkRespondAndDataNotNull(res)) {
              thisVue.queryData();
              //公共bus.js，用于非父子组件进行传值
              Bus.$emit('queryZttjByTB', true);

            } else {
              thisVue.$Message.error('创建失败')
            }
          }).catch(err => {
            //console.info('报错的信息', err);
          }).then(function () {
            // thisVue.queryData();
            // //公共bus.js，用于非父子组件进行传值
            // Bus.$emit('queryZttjByTB', true);
            // console.log(thisVue.singleData);
            thisVue.closeModal();
          });
        }
        //如果点击确定则请求确定接口
        if(theType=='submit'){
          this.$axios({
            url: 'xqd/xqdxx/submitXqd',
            method: 'post',//请求的方式
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            data: JSON.stringify(thisVue.singleData), //请求参数
          }).then(res => {
            if (Bus.checkRespondAndDataNotNull(res)) {
              thisVue.queryData();
              //公共bus.js，用于非父子组件进行传值
              Bus.$emit('queryZttjByTB', true);

            } else {
              thisVue.$Message.error('创建失败')
            }
          }).catch(err => {
            //console.info('报错的信息', err);
          }).then(function () {
            // thisVue.queryData();
            // //公共bus.js，用于非父子组件进行传值
            // Bus.$emit('queryZttjByTB', true);
            // console.log(thisVue.singleData);
            thisVue.closeModal();
          });
        }
      },
      deleteSingleData() {
        //父组件点击cancel调用方法
        this.closeModal();
      },
      //把数据清空
      closeModal() {
        this.$refs.ywy_yyy.clearYwyAndYyy();
        for (let singleDataKey in this.singleData) {
          if (singleDataKey == 'zylbArray' || singleDataKey == 'xqdfl' || singleDataKey == 'xqdFileList'
            || singleDataKey == 'ywyxxList'|| singleDataKey == 'yyyxxList') {
            this.singleData[singleDataKey] = [];
          } else {
            this.singleData[singleDataKey] = '';
          }
          if (singleDataKey == 'tcsj') {
            this.singleData[singleDataKey] = this.getTcsj();
          }
          if (singleDataKey == 'cjrid') {
            this.singleData[singleDataKey] = this.cjrid;
          }
          if (singleDataKey == 'sqbmmc') {
            this.singleData[singleDataKey] = "中国南方电网有限责任公司";
          }
        }

        //清除文件列表
        this.xqdFileList = [];
        //清除文件的MD5加密
        this.xqdFileBlocks.fileMd5 = {}

      },
      //下载文件
      loadFile(value) {
        //console.log(value);
        //console.log('下载文件');
        window.location.href = 'xqd/xqdFile/xqdFileDownload/'+value.fileMd5 + '/'+ value.fileName
      },
      //查看文件
      checkFile(value) {
        console.log(value);
        console.log('查看文件');

      },
      //删除文件
      deleteFile(value,index) {
        this.$axios({
          url: 'xqd/xqdFile/xqdFileDelete/'+value.fileMd5,
          method: 'post',//请求的方式
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          data: JSON.stringify(this.queryParam), //请求参数
        }).then(res => {
          if (Bus.checkRespondAndDataNotNull(res)) {
            this.xqdFileList.splice(index, 1);
            this.singleData.xqdFileList.splice(index, 1);
          }else {
            alert('文件删除失败，请重试！');
          }
        }).catch(err => {
          //console.info('报错的信息', err);
        }).then(function () {
          //总是执行的
        });
      },
      //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
      beforeUpload(file) {
        let timestamp = new Date().getTime();
        this.xqdFileBlocks.fileMd5 = this.$md5(file.name + timestamp);
      },
      //上传文件成功后返回函数
      onSuccessFile(response, file) {
        console.log(response);
        console.log(file);
        let fileType = file.name.split('.')[file.name.split('.').length - 1];
        //展示在界面上
        this.xqdFileList.push({
          fileType: fileType,
          fileName: file.name,
          fileSize: file.size,
          fileMd5: this.xqdFileBlocks.fileMd5,
          isFileSuccess: true
        });
        //清空已上传的文件列表
        this.$refs.uploadFile.clearFiles();

        //增加新增文件操作
        this.singleData.xqdFileList.push({
          fileMd5: this.xqdFileBlocks.fileMd5
        })

      },
      //上传文件失败后返回函数
      onErrorFile(error, file, fileList) {
        // console.log(error);
        // console.log(file);
        // console.log(fileList);
        alert('《' + fileList.name + '》上传失败，网络请求超时或服务器崩溃，请重试！');
      },
      //文件超过指定大小返回函数
      onExceededSize(file) {
        alert('《' + file.name + '》文件太大，请选择小于60M的文件上传！');
      }
    },
  }
</script>

<style scoped>
  .xqd_UploadFile {
    margin-top: 10px;
  }

  .detailedDiv {
    width: 500px;
    margin-left: 20px;
    margin-bottom: 20px;
  }

  .detailedDiv Button {
    margin-right: 20px;
  }
</style>
