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
              <Input v-model="ywyList.ssywy" placeholder="请输入..." clearable style="width: 100%"/>
            </td>
          </tr>
          <tr>
            <td width="80px">所属业务分类</td>
            <td>
              <Input v-model="ywyList.ssywfl" placeholder="请输入..." clearable style="width: 100%"/>
            </td>
          </tr>
          <tr>
            <td>所属业务事项</td>
            <td>
              <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                <tr>
                  <td width="80px">名称</td>
                  <td colspan="3">
                    <Input v-model="ywyList.ssywmc" placeholder="请输入..." clearable style="width: 100%"/>
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
                          <Checkbox v-model="ywyList.ssywqwjs"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywsnjs"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdsjs"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ssywdsfjs"/>
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
                    <Input v-model="ywyList.ywlcmc" placeholder="请输入..." clearable style="width: 100%"/>
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
                          <Checkbox v-model="ywyList.ywlcqwjs"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcsnjs"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdsjs"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.ywlcdsfjs"/>
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
                    <Input v-model="ywyList.lcjdmc" placeholder="请输入..." clearable style="width: 100%"/>
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
                          <Checkbox v-model="ywyList.lcjdqwjs"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjdsnjs"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddsjs"/>
                        </td>
                        <td style="text-align:center;">
                          <Checkbox v-model="ywyList.lcjddsfjs"/>
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
            <td><Input v-model="yyyList.yyy" placeholder="请输入..." clearable style="width: 100%"/></td>
          </tr>
          <tr>
            <td>应用</td>
            <td><Input v-model="yyyList.yy" placeholder="请输入..." clearable style="width: 100%"/></td>
          </tr>
          <tr>
            <td>应用模块</td>
            <td>
              <table style="width:100%;border-style:hidden;" border="1" cellspacing="0px">
                <tr>
                  <td width="80px">名称</td>
                  <td><Input v-model="yyyList.yymkmc" placeholder="请输入..." clearable style="width: 100%"/>
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
                  <td><Input v-model="yyyList.yygnmc" placeholder="请输入..." clearable style="width: 100%"/>
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
  </div>
</template>

<script>
  export default {
    name: 'ywy_yyy',
    // props: {
    //   singleData: {
    //     type: Object
    //   }
    // },
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
          lcjdqwjs: false, lcjdsnjs: false, lcjddsjs: false, lcjddsfjs: false
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
      },
      //接收父组件的sinleData值
      changeValueBySingleData(singleData){
        let thisVue = this;
        if (singleData.ywyxxList.length > 0){
          for (let i = 0; i < singleData.ywyxxList.length; i++) {
            thisVue.AddYwyList();
            console.log(singleData.ywyxxList[i]);
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
            //把ywlcgfcl转换成数组筛选
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
            //把lcjdgfcl转换成数组筛选
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
          // singleData.ywyxxList.forEach(function (v) {
          //   console.log(v);
          //   thisVue.ywyxxList.push(thisVue.ywyObject());
          //
          // });
          // console.log(thisVue.ywyxxList);
        }


        //this.ywyxxList = singleData.ywyxxList;
        this.yyyxxList = singleData.yyyxxList;
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
