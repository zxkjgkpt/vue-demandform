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
    <div v-for="(ywyList, index) in ywyList">
      <div class="accHead">
        <div style="float:right;" @click="deleteYwy(index)"><img src="../../../assets/remove.png"/></div>
        <div @click="changeImg(index)">
          <img v-bind:id=" 'open'+ index " style="display: block" src="../../../assets/ywyOpen.png" width="161px"
               height="30px"/>
          <img v-bind:id=" 'close'+ index " style="display: none" src="../../../assets/ywyClose.png" width="161px"
               height="30px"/>
        </div>
      </div>

      <div v-bind:id=" 'ywyMessage'+ index " style="display: none">
        <table border="1" style="width:100%;background:#F3F3F3" cellspacing="0px">
          <tr>
            <td width="80px">所属业务域</td>
            <td>
              <Input v-model="ywyList.ssywy" placeholder="Enter something..." clearable style="width: 100%"/>
            </td>
          </tr>
          <tr>
            <td width="80px">所属业务分类</td>
            <td>
              <Input v-model="ywyList.ssywfl" placeholder="Enter something..." clearable style="width: 100%"/>
            </td>
          </tr>
          <tr>
            <td>所属业务事项</td>
            <td>
              <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                <tr>
                  <td width="80px">名称</td>
                  <td colspan="3">
                    <Input v-model="ywyList.ssywmc" placeholder="Enter something..." clearable style="width: 100%"/>
                  </td>
                </tr>
                <tr>
                  <td>描述</td>
                  <td>
                    <i-input v-model="ywyList.ssywms" type="textarea" :rows="3" placeholder="请输入..."></i-input>
                  </td>
                </tr>
                <tr>
                  <td>统一规范策略</td>
                  <td>
                    <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                      <tr align="center">
                        <td>分类</td>
                        <td>全网统一</td>
                        <td>省内统一</td>
                        <td>地市统一</td>
                        <td>地市不统一</td>
                      </tr>
                      <tr align="center">
                        <td>输出</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywqwsc"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywsnsc"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdssc"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdsfsc"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>流程流转</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywqwlz"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywsnlz"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdslz"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdsflz"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>执行角色</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywqwzx"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywsnzx"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdszx"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdsfzx"/>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>业务流程</td>
            <td>
              <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                <tr>
                  <td width="80px">名称</td>
                  <td colspan="3">
                    <Input v-model="ywyList.ywlcmc" placeholder="Enter something..." clearable style="width: 100%"/>
                  </td>
                </tr>
                <tr>
                  <td>描述</td>
                  <td>
                    <i-input v-model="ywyList.ywlcms" type="textarea" :rows="3" placeholder="请输入..."></i-input>
                  </td>
                </tr>
                <tr>
                  <td>统一规范策略</td>
                  <td>
                    <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                      <tr align="center">
                        <td>分类</td>
                        <td>全网统一</td>
                        <td>省内统一</td>
                        <td>地市统一</td>
                        <td>地市不统一</td>
                      </tr>
                      <tr align="center">
                        <td>输出</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcqwsc"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcsnsc"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdssc"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdsfsc"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>流程流转</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcqwlz"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcsnlz"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdslz"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdsflz"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>执行角色</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcqwzx"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcsnzx"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdszx"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdsfzx"/>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>流程节点</td>
            <td>
              <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                <tr>
                  <td width="80px">名称</td>
                  <td colspan="3">
                    <Input v-model="ywyList.lcjdmc" placeholder="Enter something..." clearable style="width: 100%"/>
                  </td>
                </tr>
                <tr>
                  <td>描述</td>
                  <td>
                    <i-input v-model="ywyList.lcjdms" type="textarea" :rows="3" placeholder="请输入..."></i-input>
                  </td>
                </tr>
                <tr>
                  <td>统一规范策略</td>
                  <td>
                    <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                      <tr align="center">
                        <td>分类</td>
                        <td>全网统一</td>
                        <td>省内统一</td>
                        <td>地市统一</td>
                        <td>地市不统一</td>
                      </tr>
                      <tr align="center">
                        <td>输出</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdqwsc"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdsnsc"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddssc"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddsfsc"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>流程流转</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdqwlz"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdsnlz"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddslz"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddsflz"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>执行角色</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdqwzx"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdsnzx"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddszx"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddsfzx"/>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!--------------------------应用域------------------------------->
    <div v-for="(yyyList, index) in yyyList">
      <div class="accHead">
        <div style="float:right;" @click="deleteYyy(index)"><img src="../../../assets/remove.png"/></div>
        <div @click="changeYyyImg(index)">
          <img v-bind:id=" 'openYyy'+ index " style="display: block" src="../../../assets/openYyy.png" width="161px"
               height="30px"/>
          <img v-bind:id=" 'closeYyy'+ index " style="display: none" src="../../../assets/closeYyy.png" width="161px"
               height="30px"/>
        </div>
      </div>
      <div v-bind:id=" 'yyyMessage'+ index " style="display: none">
        <table border="1" style="width:100%;background:#F3F3F3" cellspacing="0px">
          <tr>
            <td width="80px">应用域</td>
            <td><Input v-model="yyyList.yyy" placeholder="Enter something..." clearable style="width: 100%"/></td>
          </tr>
          <tr>
            <td>应用</td>
            <td><Input v-model="yyyList.yy" placeholder="Enter something..." clearable style="width: 100%"/></td>
          </tr>
          <tr>
            <td>应用模块</td>
            <td>
              <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                <tr>
                  <td width="80px">名称</td>
                  <td><Input v-model="yyyList.yymkmc" placeholder="Enter something..." clearable style="width: 100%"/>
                  </td>
                </tr>
                <tr>
                  <td>描述</td>
                  <td>
                    <i-input v-model="yyyList.yymkms" type="textarea" :rows="3" placeholder="请输入..."></i-input>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>应用功能</td>
            <td>
              <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                <tr>
                  <td width="80px">名称</td>
                  <td><Input v-model="yyyList.yygnmc" placeholder="Enter something..." clearable style="width: 100%"/>
                  </td>
                </tr>
                <tr>
                  <td>描述</td>
                  <td>
                    <i-input v-model="yyyList.yygdms" type="textarea" :rows="3" placeholder="请输入..."></i-input>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>非功能需求</td>
            <td>
              <i-input v-model="yyyList.fgnxq" type="textarea" :rows="3" placeholder="请输入..."></i-input>
            </td>
          </tr>
        </table>
      </div>
    </div>


    <Upload action="//jsonplaceholder.typicode.com/posts/">
      <Button icon="ios-cloud-upload-outline">添加附件</Button>
    </Upload>
  </div>
</template>

<script>
  // 引入公共的bus，来做为中间传达的工具
  import Bus from '../bus/bus'

  export default {
    name: 'add_model',

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

        ywyList: [],
        yyyList: [],
      }
    },
    methods: {
      //添加业务域
      AddYwyList() {
        this.ywyList.push({
          ssywy: '', ssywfl: '', ssywmc: '', ssywms: '',
          ssywqwsc: false, ssywsnsc: false, ssywdssc: false,
          ssywdsfsc: false, ssywqwlz: false, ssywsnlz: false,
          ssywdslz: false, ssywdsflz: false, ssywqwzx: false,
          ssywsnzx: false, ssywdszx: false, ssywdsfzx: false,
          ywlcmc: '', ywlcms: '', ywlcqwsc: false, ywlcsnsc: false,
          ywlcdssc: false, ywlcdsfsc: false, ywlcqwlz: false, ywlcsnlz: false,
          ywlcdslz: false, ywlcdsflz: false, ywlcqwzx: false, ywlcsnzx: false,
          ywlcdszx: false, ywlcdsfzx: false, lcjdmc: '', lcjdms: '',
          lcjdqwsc: false, lcjdsnsc: false, lcjddssc: false, lcjddsfsc: false,
          lcjdqwlz: false, lcjdsnlz: false, lcjddslz: false, lcjddsflz: false,
          lcjdqwzx: false, lcjdsnzx: false, lcjddszx: false, lcjddsfzx: false
        });
      },
      //删除业务域
      deleteYwy(value) {
//        console.log(value);
        this.ywyList.splice(value, 1);
      },
      //添加应用域
      AddYyyList() {
        this.yyyList.push({
          yyy: '', yy: '', yymkmc: '', yymkms: '',
          yygnmc: '', yygdms: '', fgnxq: ''
        });
      },
      //删除应用域
      deleteYyy(value) {
//        console.log(value);
        this.yyyList.splice(value, 1);
      },
      //验证联系方式是否为数字
      checkNumber(number) {
        this.newPhone = Bus.checkNumber(number);
      },
      //验证邮箱是否为正确格式
      checkEmail(number) {
        var numReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        var numRe = new RegExp(numReg)
        if (!numRe.test(number)) {
          this.newEmail = true;
        } else {
          this.newEmail = false;
        }
      },
      //改变业务域图片(显示和隐藏业务域)
      changeImg(value) {
        var o = document.getElementById('open' + value);
        var c = document.getElementById('close' + value);
        var ywy = document.getElementById('ywyMessage' + value);
        if (c.style.display == 'block') {
          o.style.display = "block";
          c.style.display = "none";
          ywy.style.display = "none";
        } else {
          o.style.display = "none";
          c.style.display = "block";
          ywy.style.display = "block";
        }
      },
      //改变业务域图片(显示和隐藏业务域)
      changeYyyImg(value) {
        var o = document.getElementById('openYyy' + value);
        var c = document.getElementById('closeYyy' + value);
        var ywy = document.getElementById('yyyMessage' + value);
        if (c.style.display == 'block') {
          o.style.display = "block";
          c.style.display = "none";
          ywy.style.display = "none";
        } else {
          o.style.display = "none";
          c.style.display = "block";
          ywy.style.display = "block";
        }
      },
      checkFrom() {
        var s = this.singleData;
        if (s.sqbmmc != '' && s.tcsj != '' && s.xqmc != '' && s.sqrxm != '' && s.sqrlxfs != '' && s.zylb.length > 0 && s.xqdfl.length > 0 && s.xqzs != '' && s.qwwcsj != '' && this.disabledGroup != '' && this.newPhone == false && this.newEmail == false) {
          return true;
        } else {
          alert('请输入有效数据');
          return false;
        }
      },

      showSingleData() {
        //父组件点击ok调用新增方法
        console.log("aaa");
//        console.log(this.singleData);
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

  .accHead {
    height: 30px;
    line-height: 30px;
    background-color: #ECF7FB;
    border-style: hidden;
    margin-top: 10px;

  }
</style>
