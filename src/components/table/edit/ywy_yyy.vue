<template>
  <div id="ywy_yyy">
    <!--------------------------业务域------------------------------->
    <div v-for="(ywyList, index) in ywyxxList">
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
              <Input v-model="ywyList.ssywy" :disabled="isShowView" placeholder="请输入..." clearable style="width: 100%"/>
            </td>
          </tr>
          <tr>
            <td width="80px">所属业务分类</td>
            <td>
              <Input v-model="ywyList.ssywfl" :disabled="isShowView" placeholder="请输入..." clearable style="width: 100%"/>
            </td>
          </tr>
          <tr>
            <td>所属业务事项</td>
            <td>
              <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                <tr>
                  <td width="80px">名称</td>
                  <td colspan="3">
                    <Input v-model="ywyList.ssywmc" :disabled="isShowView" placeholder="请输入..." clearable style="width: 100%"/>
                  </td>
                </tr>
                <tr>
                  <td>描述</td>
                  <td>
                    <i-input v-model="ywyList.ssywms" :disabled="isShowView" type="textarea" :rows="3" placeholder="请输入..."></i-input>
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
                          <Checkbox v-model="ywyList.ssywqwsc" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywsnsc" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdssc" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdsfsc" :disabled="isShowView"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>流程流转</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywqwlz" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywsnlz" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdslz" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdsflz" :disabled="isShowView"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>执行角色</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywqwjs" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywsnjs" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdsjs" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdsfjs" :disabled="isShowView"/>
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
                    <Input v-model="ywyList.ywlcmc" :disabled="isShowView" placeholder="请输入..." clearable style="width: 100%"/>
                  </td>
                </tr>
                <tr>
                  <td>描述</td>
                  <td>
                    <i-input v-model="ywyList.ywlcms" :disabled="isShowView" type="textarea" :rows="3" placeholder="请输入..."></i-input>
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
                          <Checkbox v-model="ywyList.ywlcqwsc" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcsnsc" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdssc" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdsfsc" :disabled="isShowView"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>流程流转</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcqwlz" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcsnlz" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdslz" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdsflz" :disabled="isShowView"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>执行角色</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcqwjs" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcsnjs" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdsjs" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdsfjs" :disabled="isShowView"/>
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
                    <Input v-model="ywyList.lcjdmc" :disabled="isShowView" placeholder="请输入..." clearable style="width: 100%"/>
                  </td>
                </tr>
                <tr>
                  <td>描述</td>
                  <td>
                    <i-input v-model="ywyList.lcjdms" :disabled="isShowView" type="textarea" :rows="3" placeholder="请输入..."></i-input>
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
                          <Checkbox v-model="ywyList.lcjdqwsc" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdsnsc" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddssc" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddsfsc" :disabled="isShowView"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>流程流转</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdqwlz" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdsnlz" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddslz" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddsflz" :disabled="isShowView"/>
                        </td>
                      </tr>
                      <tr align="center">
                        <td>执行角色</td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdqwjs" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdsnjs" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddsjs" :disabled="isShowView"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddsfjs" :disabled="isShowView"/>
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
    <div v-for="(yyyList, index) in yyyxxList">
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
            <td><Input v-model="yyyList.yyy" :disabled="isShowView" placeholder="请输入..." clearable style="width: 100%"/></td>
          </tr>
          <tr>
            <td>应用</td>
            <td><Input v-model="yyyList.yy" :disabled="isShowView" placeholder="请输入..." clearable style="width: 100%"/></td>
          </tr>
          <tr>
            <td>应用模块</td>
            <td>
              <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                <tr>
                  <td width="80px">名称</td>
                  <td><Input v-model="yyyList.yymkmc" :disabled="isShowView" placeholder="请输入..." clearable style="width: 100%"/>
                  </td>
                </tr>
                <tr>
                  <td>描述</td>
                  <td>
                    <i-input v-model="yyyList.yymkms" :disabled="isShowView" type="textarea" :rows="3" placeholder="请输入..."></i-input>
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
                  <td><Input v-model="yyyList.yygnmc" :disabled="isShowView" placeholder="请输入..." clearable style="width: 100%"/>
                  </td>
                </tr>
                <tr>
                  <td>描述</td>
                  <td>
                    <i-input v-model="yyyList.yygdms" :disabled="isShowView" type="textarea" :rows="3" placeholder="请输入..."></i-input>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>非功能需求</td>
            <td>
              <i-input v-model="yyyList.fgnxq" :disabled="isShowView" type="textarea" :rows="3" placeholder="请输入..."></i-input>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

  // 引入公共的bus，来做为中间传达的工具
  import Bus from '../bus/bus'

  export default {
    name: 'ywy_yyy',
    props: {
      isShowView: {
        type: Boolean
      }
    },
    data() {
      return {
        yyyxxList: [],
        ywyxxList:[]
      }
    },
    methods: {
      ywyObject(){
        let object = {
          ssywy: '', ssywfl: '', ssywmc: '', ssywms: '',
          ssywqwsc: false, ssywsnsc: false, ssywdssc: false,
          ssywdsfsc: false, ssywqwlz: false, ssywsnlz: false,
          ssywdslz: false, ssywdsflz: false, ssywqwjs: false,
          ssywsnjs: false, ssywdsjs: false, ssywdsfjs: false,

          ywlcmc: '', ywlcms: '', ywlcqwsc: false, ywlcsnsc: false,
          ywlcdssc: false, ywlcdsfsc: false, ywlcqwlz: false, ywlcsnlz: false,
          ywlcdslz: false, ywlcdsflz: false, ywlcqwjs: false, ywlcsnjs: false,
          ywlcdsjs: false, ywlcdsfjs: false, lcjdmc: '', lcjdms: '',

          lcjdqwsc: false, lcjdsnsc: false, lcjddssc: false, lcjddsfsc: false,
          lcjdqwlz: false, lcjdsnlz: false, lcjddslz: false, lcjddsflz: false,
          lcjdqwjs: false, lcjdsnjs: false, lcjddsjs: false, lcjddsfjs: false,

          lcjdgfcl:'',ssywgfcl:'',ywlcgfcl:'',xqdh:'',ywybs:''
        };
        return object;
      },
      //添加业务域
        AddYwyList() {
        this.ywyxxList.push(this.ywyObject());
      },
      //删除业务域
      deleteYwy(value) {
//        console.log(value);
        this.ywyxxList.splice(value, 1);
      },
      //清空数据
      clearYwyAndYyy(){
        this.ywyxxList=[];
        this.yyyxxList=[];
      },
      //添加应用域
      AddYyyList() {
        this.yyyxxList.push({
          yyy: '', yy: '', yymkmc: '', yymkms: '',
          yygnmc: '', yygdms: '', fgnxq: ''
        });
      },
      //删除应用域
      deleteYyy(value) {
//        console.log(value);
        this.yyyxxList.splice(value, 1);
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

        Bus.updateInputDemo();

      },
      //改变应用域图片(显示和隐藏业务域)
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

        Bus.updateInputDemo();

      },
      //获取业务域值的方法（在父组件里调用）
      getYwyAndYyy(){
        return this.ywyxxList;
      },
      //获取应用域值的方法（在父组件里调用）
      getYyy(){
        return this.yyyxxList;
      },
      //接收父组件的sinleData值
      changeValueBySingleData(singleData){
        // console.log(singleData);
        let thisVue = this;
        if (singleData.ywyxxList.length > 0){
          for (let i = 0; i < singleData.ywyxxList.length; i++) {
            thisVue.AddYwyList();
            // console.log(singleData.ywyxxList[i]);
            thisVue.ywyxxList[i].lcjdmc = singleData.ywyxxList[i].lcjdmc;
            thisVue.ywyxxList[i].lcjdms = singleData.ywyxxList[i].lcjdms;
            thisVue.ywyxxList[i].ssywfl = singleData.ywyxxList[i].ssywfl;
            thisVue.ywyxxList[i].ssywfl = singleData.ywyxxList[i].ssywfl;
            thisVue.ywyxxList[i].ssywmc = singleData.ywyxxList[i].ssywmc;
            thisVue.ywyxxList[i].ssywms = singleData.ywyxxList[i].ssywms;
            thisVue.ywyxxList[i].ssywy = singleData.ywyxxList[i].ssywy;
            thisVue.ywyxxList[i].ywlcmc = singleData.ywyxxList[i].ywlcmc;
            thisVue.ywyxxList[i].ywlcms = singleData.ywyxxList[i].ywlcms;
            //把ssywgfcl转换成数组筛选
            if(singleData.ywyxxList[i].ssywgfcl!=null) {
              let ssywgflcArray = singleData.ywyxxList[i].ssywgfcl.split(',');
              ssywgflcArray.forEach(function (v) {
                v = 'ssyw' + v.toLowerCase();
                // console.log(v.toLowerCase());
                for (let showSelectInputKey in thisVue.ywyxxList[i]) {
                  if (v == showSelectInputKey) {
                    thisVue.ywyxxList[i][showSelectInputKey] = true;
                  }
                }
              })
            }
            //把ywlcgfcl转换成数组筛选
            if(singleData.ywyxxList[i].ywlcgfcl!=null) {
              let ywlcgfclArray = singleData.ywyxxList[i].ywlcgfcl.split(',');
              ywlcgfclArray.forEach(function (v) {
                v = 'ywlc' + v.toLowerCase();
                // console.log(v.toLowerCase());
                for (let showSelectInputKey in thisVue.ywyxxList[i]) {
                  if (v == showSelectInputKey) {
                    thisVue.ywyxxList[i][showSelectInputKey] = true;
                  }
                }
              })
            }
            //把lcjdgfcl转换成数组筛选
            if(singleData.ywyxxList[i].lcjdgfcl!=null) {
              let lcjdgfclArray = singleData.ywyxxList[i].lcjdgfcl.split(',');
              lcjdgfclArray.forEach(function (v) {
                v = 'lcjd' + v.toLowerCase();
                // console.log(v.toLowerCase());
                for (let showSelectInputKey in thisVue.ywyxxList[i]) {
                  if (v == showSelectInputKey) {
                    thisVue.ywyxxList[i][showSelectInputKey] = true;
                  }
                }
              })
            }

          }
          // singleData.ywyxxList.forEach(function (v) {
          //   console.log(v);
          //   thisVue.ywyxxList.push(thisVue.ywyObject());
          //
          // });
          // console.log(thisVue.ywyxxList);
        }


        //this.ywyxxList = singleData.ywyxxList;
        for (let i = 0; i < singleData.yyyxxList.length; i++) {
          thisVue.AddYyyList();
          thisVue.yyyxxList[i].yyy = singleData.yyyxxList[i].yyy;
          thisVue.yyyxxList[i].yy = singleData.yyyxxList[i].yy;
          thisVue.yyyxxList[i].yymkmc = singleData.yyyxxList[i].yymkmc;
          thisVue.yyyxxList[i].yymkms = singleData.yyyxxList[i].yymkms;
          thisVue.yyyxxList[i].yygnmc = singleData.yyyxxList[i].yygnmc;
          thisVue.yyyxxList[i].yygdms = singleData.yyyxxList[i].yygdms;
          thisVue.yyyxxList[i].fgnxq = singleData.yyyxxList[i].fgnxq;
        }
        // console.log(this.yyyxxList);

      }
    }
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
