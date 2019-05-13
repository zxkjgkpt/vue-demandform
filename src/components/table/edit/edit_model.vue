<template>
  <div id="edit_model">
    <span style="color: red">*</span>申请单位或业务部门名称：
    <Input v-model="singleData.sqbmmc" :disabled="isShowView" placeholder="请输入..." clearable style="width: 300px"/>
    <span style="color: red" v-if="singleData.sqbmmc=='' ">申请单位或业务部门名称必填</span>
    <span style="color: red" v-if="singleData.sqbmmc != undefined  && singleData.sqbmmc.length>100">最多100字</span>
    <span style="color: red">*</span>提出时间：
    <Date-picker v-model="singleData.tcsj" :disabled="isShowView" type="date" :options="options3" placeholder="选择日期"
                 style="width: 200px"></Date-picker>
    <span style="color: red" v-if="singleData.tcsj==''">提出时间必填</span>
    <table border="1" cellspacing="0px" style="border-collapse:collapse;width: 100%">
      <tr>
        <td width="100 px"><span style="color: red">*</span>需求单名称</td>
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
              <td width="80px"><span style="color: red">*</span>姓名</td>
              <td colspan="3">
                <Input v-model="singleData.sqrxm" :disabled="isShowView" placeholder="请输入..." clearable
                       style="width: 100%"/>
                <span style="color: red" v-if="singleData.sqrxm==''">姓名必填</span>
                <span style="color: red"
                      v-if="singleData.sqrxm != undefined  && singleData.sqrxm.length>25">最多25字</span>
              </td>
            </tr>
            <tr>
              <td><span style="color: red">*</span>联系方式</td>
              <td>
                <Input v-model="singleData.sqrlxfs" :disabled="isShowView" @on-change="checkNumber(singleData.sqrlxfs)"
                       placeholder="请输入..." clearable style="width: 100%"/>
                <span style="color: red" v-if="singleData.sqrlxfs==''">联系方式必填</span>
                <span style="color: red" v-if="this.newPhone">请输入数字</span>
                <span style="color: red"
                      v-if="singleData.sqrlxfs != undefined  && singleData.sqrlxfs.length>11">最多11位数字</span>
              </td>
              <td width="80px">邮箱</td>
              <td style="vertical-align: top;">
                <Input v-model="singleData.sqryx" :disabled="isShowView" @on-change="checkEmail(singleData.sqryx)"
                       placeholder="请输入..." clearable style="width: 100%"/>
                <span style="color: red" v-if="this.newEmail">请输入正确的邮箱格式</span>
                <span style="color: red"
                      v-if="singleData.sqryx != undefined  && singleData.sqryx.length>=100">最多100字</span>
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
          <Checkbox-group v-model="singleData.xqdfl">
            <Checkbox label="ZCXXQ," :disabled="isShowView">
              <Tooltip content="政策性需求">政策性需求</Tooltip>
            </Checkbox>
            <Checkbox label="XYWXQ," :disabled="isShowView">
              <Tooltip content="新业务需求">新业务需求</Tooltip>
            </Checkbox>
            <Checkbox label="XJXXQ," :disabled="isShowView">
              <Tooltip content="新技术需求">新技术需求</Tooltip>
            </Checkbox>
            <Checkbox label="XTYHXQ," :disabled="isShowView">
              <Tooltip content="系统优化需求">系统优化需求</Tooltip>
            </Checkbox>
          </Checkbox-group>
          <span style="color: red" v-if="singleData.xqdfl==''">至少选择一个分类</span>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>需求单综述</td>
        <td>
          <i-input v-model="singleData.xqzs" :disabled="isShowView" type="textarea" :rows="8"
                   placeholder="请输入..."></i-input>
          <span style="color: red" v-if="singleData.xqzs==''">需求单综述必填</span>
          <span style="color: red" v-if="singleData.xqzs != undefined  && singleData.xqzs.length>2000">最多2000字</span>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>期望完成日期</td>
        <td>
          <Date-picker v-model="singleData.qwwcsj" :disabled="isShowView" type="date" :options="options3"
                       placeholder="选择日期" style="width: 100%"></Date-picker>
          <span style="color: red" v-if="singleData.qwwcsj==''">期望完成日期必填</span>
        </td>
      </tr>
      <tr>
        <td><span style="color: red">*</span>部门级别</td>
        <td>
          <Radio-group v-model="disabledGroup" >
          <Radio label="网" disabled>网</Radio>
          <Radio label="省" disabled>省</Radio>
          <Radio label="地市" disabled>地市</Radio>
          </Radio-group>
        </td>
      </tr>
    </table>

    <!--------------------------业务域------------------------------->
    <!--------------------------应用域------------------------------->
    <!--<ywy_yyy ref="ywy_yyy" v-bind:singleData="singleData"></ywy_yyy>-->
    <ywy_yyy ref="ywy_yyy" v-bind:isShowView="isShowView"></ywy_yyy>

    <!--办理类型、人员、时间、意见-->
    <div style="margin-top: 10px" v-if="!(singleData.gdzt=='New')">
      <table border="1" cellspacing="0px" style="border-collapse:collapse;width: 100%">
        <tr align="center">
          <td width="150 px"><b>类型</b></td>
          <td width="100 px"><b>办理人员</b></td>
          <td width="100 px"><b>办理时间</b></td>
          <td><b>办理意见</b></td>
        </tr>
        <tr align="center" v-for="item in flowLogList">
          <td height="30px">{{ item.gdzt }}</td>
          <td>{{ item.clrmc }}</td>
          <td>{{ item.jssj }}</td>
          <td v-if="item.rzjl!=null">{{item.rzjl}}</td>
          <td v-else-if="item.zfyy!=null">{{item.zfyy}}</td>
          <td v-else></td>
        </tr>

      </table>
    </div>

    <div style="margin-top: 10px" >
      <table border="1" cellspacing="0px" style="border-collapse:collapse;width: 100%" v-if="xqtype=='sh'">
        <tr align="center">
          <td width="100 px">网级审核意见</td>
          <td><i-input v-model="wshyj" type="textarea" :rows="4"
                                 placeholder="请输入..."></i-input>
          </td>
        </tr>
      </table>
    </div>

    <Modal
      v-model="iszuofei"
      title="需求单申请作废"
      :mask-closable="false"
      @on-ok="okByZuofei"
      @on-cancel="cancelByZuofei"
    >
      <span style="color: red">*</span>作废原因
      <Input v-model="zfyy" type="textarea" :rows="8" placeholder="请输入..." />
    </Modal>


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
      <Button :disabled="isShowView" icon="ios-cloud-upload-outline">添加附件</Button>
    </Upload>

    <div class="detailedDiv" v-for="(xqdFile,index) in xqdFileList">
      <img v-if="xqdFile.fileType.toLowerCase() == 'docx' ||  xqdFile.fileType.toLowerCase() == 'doc'" src="../../../assets/word.png" style="margin-right: 10px; float: left">
      <img v-else src="../../../assets/undifined.png" style="margin-right: 10px; float: left">
      <span>{{xqdFile.fileName}}</span>
      <br>
      <span style="margin-right: 20px">{{parseInt(xqdFile.fileSize/1024)}}k</span>
      <span v-if="isFileSuccess" style="color: green">上传成功</span>

      <Button style="float: right" size="small" type="primary" @click="checkFile(xqdFile)">查看</Button>
      <Button style="float: right" size="small" type="primary" @click="loadFile(xqdFile)">下载</Button>
      <Button v-if="!isShowView" style="float: right" size="small" type="primary" @click="deleteFile(xqdFile,index)">删除</Button>
    </div>

    <div id="apkfpg" align="right" style="display: none">
      <Radio-group v-model="kfpgKG">
        <Radio label="是否需要确认需求或补充材料">是否需要确认需求或补充材料</Radio>

        <Radio label="是否能实现">是否能实现</Radio>

      </Radio-group>
      <div id="sfqrKG" align="right" v-if="this.kfpgKG=='是否需要确认需求或补充材料'">
        是否需要确认需求或补充材料
        <i-switch @on-change="changeBySfqr" >
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch><br>
      </div>

      <div id="sfsxKG" align="right" v-if="this.kfpgKG=='是否能实现'">
        是否实现
        <i-switch @on-change="changeBySfsx" >
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch><br>
      </div>
    </div>



    <div id="sftg" align="right" style="display: none">
      <label>是否通过</label>
      <i-switch @on-change="changeBySftg" >
        <span slot="open">是</span>
        <span slot="close">否</span>
      </i-switch>
    </div>


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
      },
      queryData: {
        type: Function,
        default: null
      },
      xqtype: {
        type: String
      },
      flowLogList: {
        type: Array
      },
    },
    data() {
      return {
        //设置当前日期之前的为不可选
        options3: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        //是否作废
        iszuofei: false,
        //作废原因
        zfyy: '',
        //网审核意见
        wshyj:'',
        //是否已确认
        confirm:false,
        //是否确认的开关
        sfqr:false,
        //是否实现的开关
        sfsx:false,
        //是否通过的开关
        sftg:false,
        kfpgKG:'是否需要确认需求或补充材料',
        disabledGroup: '网',
        newPhone: false,
        newEmail: false,
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
        xqdFileList: [],
        isFileSuccess:false,
        //上传时传给后台的参数
        xqdFileBlocks: {
          fileMd5: ''
        },
      };
    },
    methods: {
      //显示安排开发评估确认div
      openApkfpg(){
        document.getElementById("apkfpg").style.display = "block";
        this.confirmed();
      },
      closeApkfpg(){
        document.getElementById("apkfpg").style.display = "none";
        this.noConfirm();
      },
      //显示是否通过div
      openSftg(){
        document.getElementById("sftg").style.display = "block";
        this.confirmed();
      },
      closeSftg(){
        document.getElementById("sftg").style.display = "none";
        this.noConfirm();
      },
      //表示已经确认
      confirmed(){
        this.confirm=true;
      },
      //表示未确认
      noConfirm(){
        this.confirm=false;
      },
      //确认标识
      confirmSign(){
        return this.confirm;
      },
      //是否确认的开关
      changeBySfqr(status){
        this.sfqr = status;

      },
      //是否实现的开关
      changeBySfsx(status){
        this.sfsx=status;

      },
      //是否通过的开关
      changeBySftg(status){
        this.sftg=status;
      },

      //申请作废
      zuofei() {
        this.iszuofei = true;
      },
      //作废模态框确定
      okByZuofei() {

        let thisVue = this;
        this.singleData.zfyy=thisVue.zfyy;
        this.singleData.gateway="cancelXqd";
        this.singleData.zzid="1";
        this.$axios({
          url: 'xqd/xqdxx/auditXqd',
          method: 'post',//请求的方式
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          // data: JSON.stringify(thisVue.singleData), //请求参数
          data: JSON.stringify(thisVue.singleData)
        }).then(res => {
          console.log(res);
          if (Bus.checkRespondAndDataNotNull(res)) {

            thisVue.$Message.success('作废成功');

            thisVue.queryData();

            //公共bus.js，用于非父子组件进行传值
            Bus.$emit('queryZttjByTB', true);

          } else {
            thisVue.$Message.error('作废失败')
          }
        }).catch(err => {
          //console.info('报错的信息', err);
        }).then(function () {
          thisVue.iszuofei = false;
        });
        // this.$Message.success('新建成功');
        // let zuofeiReason = document.getElementById('zuofeiReason').value;
        // this.zuofeiReason = zuofeiReason;
        // this.iszuofei = false;
      },
      //作废模态框取消
      cancelByZuofei() {
        this.$Message.warning('取消');
        this.iszuofei = false;
      },
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
        var s = this.singleData;
//        console.log(s);
//         console.log(this.singleData);
        if (s.qwwcsj < s.tcsj) {
          alert('期望完成时间不能晚于提出时间');
          return false;
        }
        if (s.zylb != '' && s.xqdfl != '' && s.sqbmmc != '' && s.sqbmmc.length < 100 && s.xqmc.length < 100 && s.sqrxm.length < 25
          && s.xqzs.length < 2000 && s.tcsj != '' && s.xqmc != '' && s.sqrxm != '' && s.sqrlxfs != ''
          && s.xqzs != '' && s.qwwcsj != '' && this.disabledGroup != '' && this.newPhone == false && this.newEmail == false
        ) {
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
      //格式化时间(年月日)
      formatDate(oDate) {
        let year = new Date(oDate).getFullYear();   //获取系统的年；
        let month = this.p(new Date(oDate).getMonth() + 1);   //获取系统月份，由于月份是从0开始计算，所以要加1
        let day = this.p(new Date(oDate).getDate()); // 获取系统日，
        return year + "年" + month + "月" + day + "日";
      },
      showSingleData(type) {
        // debugger;
        //父组件点击ok调用方法
        let thisVue = this;
        //给后台专业类别传值

          this.singleData.zylb = this.singleData.zylbArray[1];
          //给后台需求分类传值
          this.singleData.xqfl = '';
          for (let i = 0; i < this.singleData.xqdfl.length; i++) {
            this.singleData.xqfl = this.singleData.xqfl + this.singleData.xqdfl[i];
          }
          this.singleData.qwwcsj = this.formatDate(this.singleData.qwwcsj);
          this.singleData.tcsj = this.formatDate(this.singleData.tcsj);
          //给后台传业务域
          this.singleData.ywyxxList = [];
          let ywyList = this.$refs.ywy_yyy.getYwyAndYyy();
          if (ywyList.length > 0) {
            for (let i = 0; i < ywyList.length; i++) {
              for (let showSelectInputKey in ywyList[i]) {
                if (ywyList[i][showSelectInputKey] == true) {
                  if (showSelectInputKey.slice(0, 4) == 'ssyw' && showSelectInputKey.length > 6) {
                    ywyList[i].ssywgfcl += showSelectInputKey.slice(4).toLocaleUpperCase() + ",";
                  }
                  if (showSelectInputKey.slice(0, 4) == 'ywlc' && showSelectInputKey.length > 6) {
                    ywyList[i].ywlcgfcl += showSelectInputKey.slice(4).toLocaleUpperCase() + ",";
                  }
                  if (showSelectInputKey.slice(0, 4) == 'lcjd' && showSelectInputKey.length > 6) {
                    ywyList[i].lcjdgfcl += showSelectInputKey.slice(4).toLocaleUpperCase() + ",";
                  }
                }
              }
              this.singleData.ywyxxList[i] = ywyList[i];
            }
          }
          //传应用域
          this.singleData.yyyxxList = [];
          let yyyList = this.$refs.ywy_yyy.getYyy();
          for (let i = 0; i < yyyList.length; i++) {
            this.singleData.yyyxxList[i] = yyyList[i];
          }
          //传文件
          this.singleData.xqdFileList=thisVue.xqdFileList;
          // console.log(this.singleData.xqdFileList);
        //传网审核意见
        this.singleData.wshyj=thisVue.wshyj;
        //默认点击的是提交
        this.singleData.gateway = 'audit';

        if (type == 'pass') {
          this.singleData.sftg = 0;
          if (this.singleData.gdzt.indexOf("审批")>=0){
            this.singleData.gateway = 'audit';
          } else {
            this.singleData.gateway = 'isDemand';
          }
        }

        // debugger;
        //如果点击通过则给后台传是否通过的值、是否补充原材料
        //如果点击是否确认的是
        if (type == 'pass' && this.singleData.gdzt == '开发评估') {
          if (this.kfpgKG == '是否需要确认需求或补充材料') {
            this.singleData.gateway = "isSupplement";
            if (this.sfqr == true) {
              this.singleData.sftg = 0;
            } else {
              this.singleData.sftg = 1;
            }
          } else {
            this.singleData.gateway = "isRealize";
            //如果点击是否实现的是
            if (this.sfsx == true) {
              this.singleData.sftg = 0;
            } else {
              this.singleData.sftg = 1;
            }
          }
        }
        // debugger;

        if (type =='onPass'){
          if(this.singleData.gdzt.indexOf("作废")>=0){
            this.singleData.sftg = 1;
          }else{
            this.singleData.sftg = 0;
          }
          // this.singleData.sftg = 1;
          //如果点击的是是否通过的是
          if(this.sftg==true){
            this.singleData.supplement = true;

          }
          //如果点击的是是否通过的否
          if(this.sftg==false){
            this.singleData.supplement = false;
          }
        }

        // console.log(this.singleData);
        //执行后台更新逻辑
        if(type=='save') {
          this.$axios({
            url: 'xqd/xqdxx/updateSelective',
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
              thisVue.$Message.error('修改失败')
            }
          }).catch(err => {
            //console.info('报错的信息', err);
          }).then(function () {
            // thisVue.queryData();
            // //公共bus.js，用于非父子组件进行传值
            // Bus.$emit('queryZttjByTB', true);
            // console.log(thisVue.singleData);
            // thisVue.closeModal();
          });
        }
        if(type=='submit') {
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
              thisVue.$Message.error('修改失败')
            }
          }).catch(err => {
            //console.info('报错的信息', err);
          }).then(function () {
            // thisVue.queryData();
            // //公共bus.js，用于非父子组件进行传值
            // Bus.$emit('queryZttjByTB', true);
            // console.log(thisVue.singleData);
            // thisVue.closeModal();
          });
        }

        //点击通过请求审核接口
        if(type=='pass'||type=='onPass') {
          this.$axios({
            url: 'xqd/xqdxx/auditXqd',
            method: 'post',//请求的方式
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            data: JSON.stringify(thisVue.singleData), //请求参数
          }).then(res => {
            if (Bus.checkRespondAndDataNotNull(res)) {
              // debugger;
              thisVue.queryData();
              //公共bus.js，用于非父子组件进行传值
              Bus.$emit('queryZttjByTB', true);

            } else {
              thisVue.$Message.error('审核失败')
            }
          }).catch(err => {
            //console.info('报错的信息', err);
          }).then(function () {
            // thisVue.queryData();
            // //公共bus.js，用于非父子组件进行传值
            // Bus.$emit('queryZttjByTB', true);
            // console.log(thisVue.singleData);
            // thisVue.closeModal();
          });
        }
      },
      deleteSingleData() {
        //父组件点击cancel调用方法
        this.closeModal();
      },
      //关闭模态框，把数据清空
      closeModal() {
        this.$refs.ywy_yyy.clearYwyAndYyy();
        this.xqdFileList = [];
      },
      changeValueBySingleData(singleData) {
        this.$refs.ywy_yyy.changeValueBySingleData(singleData);

        //根据是否有附件进行赋值
        if (singleData.xqdFileList.length > 0) {
          for (let i = 0; i < singleData.xqdFileList.length; i++) {
            this.xqdFileList.push(singleData.xqdFileList[i])
          }
        }
      },
      //下载文件
      loadFile(value) {
        // console.log('下载文件');
        window.location.href = 'xqd/xqdFile/xqdFileDownload/'+value.fileMd5 + '/'+ value.fileName
      },
      //查看文件
      checkFile() {
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
      onSuccessFile(response, file){
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
      onErrorFile(error, file, fileList){
        console.log(error);
        console.log(file);
        console.log(fileList);
        //主要拿fileList的值

        alert('《'+fileList.name + '》上传失败，网络请求超时或服务器崩溃，请重试！');
      },
      //文件超过指定大小返回函数
      onExceededSize(file) {
        alert('《' + file.name + '》，文件太大，请选择小于60M的文件上传！');
      }
    }
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
