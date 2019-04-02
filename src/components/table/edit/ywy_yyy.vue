<template>
  <div id="ywy_yyy">
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
  </div>
</template>

<script>
  export default {
    name: 'ywy_yyy',
//    props: {
//      ywyList: {
//        type: Array
//      }
//    },
    data() {
      return {
        disabledGroup: '网',
        yyyList: [],
        ywyList:[]
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
