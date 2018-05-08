<template>
  <!--菜单管理-->
  <div class="menu">
    <el-row class="menu_top">
      <el-form :inline="true" :model="inquireData" class="demo-form-inline form">
        <el-form-item class="name" label="菜单名称：" >
          <el-input size="mini" v-model="inquireData.menuName" clearable></el-input>
        </el-form-item>
        <el-form-item class="name" label="菜单状态：">
          <el-select size="mini" v-model="inquireData.status" clearable>
            <el-option label="已启用" value="1" ></el-option>
            <el-option label="已禁用" value="2" ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" icon="el-icon-search" class="search" @click="inquire">搜索</el-button>
      <br/>
      <el-button type="primary" class="increase" @click="dialoginc = true,clearMenu()">增加</el-button>
      <!-- 增加菜单展示区 -->
      <el-dialog title="新增信息" :visible.sync="dialoginc" :before-close="handleinc">

        <el-row class="yijicaidan">
          <p>
            <span class="red">*</span>
            一级菜单名称：
            <input placeholder="" v-model="chooseData.firstName"/>
          </p>
        </el-row>
        <el-row class="erjicaidan">
          <div>
            <span class="red">*</span> 
            二级菜单名称：
          </div>

          <div >
            <div class="yidong" v-for="(v,i) in list">
              <span>{{i+1}}.</span>
              <input v-model="list[i].menuName" placeholder="请填入菜单名" name="menuName"/>
              <input v-model="list[i].path" placeholder="请填入路径名"  style="width:150px;" name="path"/>
              <input v-model="list[i].component" placeholder="请填入文件名" style="width:150px;" name="component"/>
              <!-- <el-button type="primary" @click="choose = true" size="mini">路径/文件</el-button>
              <el-dialog :visible.sync="choose" :before-close="chooseClose" title="路径/文件" top="30vh">
                <el-form :inline="true" :model="chooseData" class="demo-form-inline form">
                  <el-form-item label="路径名：">
                    <el-input size="mini" v-model="chooseData.path"></el-input>
                  </el-form-item>
                  <br>
                  <el-form-item label="文件名：" >
                    <el-input size="mini" v-model="chooseData.component"></el-input>
                  </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="choose = false">确定并提交</el-button>
                </span>
              </el-dialog> -->
            </div>
          </div>
        </el-row>
        <div class="zeng">
            <el-button @click="AddList" style="width:62px;height:22px">添加一行</el-button>
            <el-button @click="removeList" style="width:62px;height:22px">删除一行</el-button>
          </div>

        <el-row class="yijicaidan">
          <p>
            <span class="red">*</span>
            <span class="icon">图标：</span>
            <input type="text" v-model="chooseData.icon" placeholder="填入图标类名">
            <a href="http://fontawesome.io/icons/" type="text" target="view_window">点击查找 fontawesome 图标类名</a>
          </p>
        </el-row>
          <el-button type="primary" @click="addMenu(list)">确定并提交</el-button>
          <el-button type="primary" @click="clearMenu(list)">重置</el-button>

      </el-dialog>

      <el-button type="primary" class="delete" @click="deleteMenu()">删除</el-button>
    </el-row>

    <el-row class="menu_buttom">
      <div class="menulist">
        <div class="mentlist_div">菜单列表</div>
      </div>
      <template>
        <el-table :data="tableData" border ref="multipleTable" 
                  @selection-change="handleSelectionChange" v-loading="loading">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="menuName" label="菜单名称"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template scope="scope">
              <span :class="{'close':(scope.row.status === '已关闭'),'open':(scope.row.status === '已开启')}">{{scope.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="offOn" label="操作">
            <template slot-scope="scope">
              <!-- 一级菜单禁用、开启 -->
              <a href="javascript:;" class="disabled open" @click.prevent="clickOffOn(scope.row.ID)" v-if="scope.row.status == '已关闭'">开启</a>
              <a href="javascript:;" class="disabled close" @click.prevent="clickOffOn(scope.row.ID)" v-if="scope.row.status == '已开启'">禁用</a>
              <a href="javascript:;" type="text" class="view open" 
                  @click.prevent="{dialogv=true,examineMenu(scope.row)}" >查看</a>
              <!-- 查看弹窗区 -->
              <el-dialog title="菜单信息" :visible.sync="dialogv" :before-close="handlev" >
                <el-row class="cd">
                  <el-col class="caidan">
                    <div>菜单名称：</div>
                    <span>{{checkMenu.menuName}}</span>
                  </el-col>
                  <el-col class="caidan">
                    <div>菜单状态：</div>
                    <span>{{checkMenu.available}}</span>
                  </el-col>
                  <el-col class="caidan">
                    <div>创建时间：</div>
                    <span>{{checkMenu.createDate}}</span>
                  </el-col>
                  <el-col class="caidan">
                    <div>最后修改时间：</div>
                    <span>{{checkMenu.updateDate}}</span>
                  </el-col>
                </el-row>
                <el-row class="ckcd">
                  <el-col class="ck">
                    <span>查看菜单</span>
                  </el-col>
                </el-row>
                <el-row class="ck_table">
                  <el-table :data="table" border :span-method="objectSpanMethod" v-loading="loading2">
                    <el-table-column prop="menuName1" label="一级菜单"></el-table-column>
                    <el-table-column prop="menuName" label="二级菜单"> </el-table-column>
                    <el-table-column prop="status" label="状态" width="100"> </el-table-column>
                    <el-table-column prop="address_one" label="操作">
                      <template slot-scope="scope">
                        <el-button type="text" disabled>已禁止</el-button>
                        <el-button type="text" disabled>修改</el-button>
                        <el-button type="text" disabled>删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogv = false">取 消</el-button>
                  <el-button type="primary" @click="dialogv = false">确 定</el-button>
                </span>
              </el-dialog>

              <a href="javascript:;" class="modify open" 
                  @click="{dialogmodify=true,modificationMenu(scope.row)}" >修改</a>
              <!-- 修改弹窗区 -->
              <el-dialog title="菜单信息" :visible.sync="dialogmodify" :before-close="handlemodify">
                <el-row class="cd">
                  <el-col class="caidan">
                    <div>菜单名称：</div>
                    <span>{{checkMenu.menuName}}</span>
                  </el-col>
                  <el-col class="caidan">
                    <div>菜单状态：</div>
                    <span>{{checkMenu.available}}</span>
                  </el-col>
                  <el-col class="caidan">
                    <div>创建时间：</div>
                    <span>{{checkMenu.createDate}}</span>
                  </el-col>
                  <el-col class="caidan">
                    <div>最后修改时间：</div>
                    <span>{{checkMenu.updateDate}}</span>
                  </el-col>
                </el-row>
                <el-row class="ckcd">
                  <el-col class="ck">
                    <span>查看菜单</span>
                  </el-col>
                </el-row>
                <el-row class="ck_table">
                  <el-table :data="table" border :span-method="objectSpanMethod" v-loading="loading2">
                    <el-table-column prop="menuName1" label="一级菜单"> </el-table-column>
                    <el-table-column prop="menuName" label="二级菜单"> </el-table-column>
                    <el-table-column prop="status" label="状态" width="100"> 
                      <template scope="scope">
                        <span :class="{'close':(scope.row.status === '已禁用'),'open':(scope.row.status === '已启用')}">{{scope.row.status}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address_one" label="操作">
                      <template slot-scope="scope">
                        <a href="javascript:;" class="disabled open" @click.prevent="clickMenuOffOn(scope.row)" v-if="scope.row.status == '已禁用'">开启</a>
                        <a href="javascript:;" class="disabled close" @click.prevent="clickMenuOffOn(scope.row)" v-if="scope.row.status == '已启用'">禁用</a>
                        <a href="javascript:;" class="modify" @click.prevent="deleteChildMenu(scope.row.id)">删除</a>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>

                <el-button type="primary" class="xinzeng" @click="{dialogxiugai = true,getRewriteData()}">修改</el-button>
                <el-dialog title="修改菜单" :visible.sync="dialogxiugai" :before-close="handlexiugai" class="xinzeng_button">
                  
                  <el-row class="yijicaidan">
                    <p>
                      <span class="red">*</span>
                      一级菜单名称：
                      <input placeholder="" v-model="rewriteData.firstName" />
                    </p>
                  </el-row>
                  <el-row class="erjicaidan" style="display:flex;">
                    <div>
                      <span class="red">*</span> 
                      二级菜单名称：
                    </div>
                    <div v-loading="loading2">
                      <div class="yidong" v-for="(v,i) in rewriteList">
                        <span>{{ i+1 }}.</span>
                        <input v-model="rewriteList[i].menuName" placeholder="请填入菜单名" name="menuName"/>
                        <input v-model="rewriteList[i].path" placeholder="请填入路径名"  style="width:150px;" name="path"/>
                        <input v-model="rewriteList[i].component" placeholder="请填入文件名" style="width:150px;" name="component"/>
                        <span class="tubiao"  @click="aaa(i)">
                          <!-- <a href="javascript:void(0);" @click="aaa(i)"> -->
                            <img src="../../assets/shangyi.png" />
                          <!-- </a> -->
                          
                        </span>
                      </div>
                    </div>
                  </el-row>
                  <el-row class="yijicaidan">
                    <p>
                      <span class="red">*</span>
                      <span class="icon">图标：</span>
                      <input type="text" v-model="rewriteData.icon" placeholder="填入图标类名">
                      <a href="http://fontawesome.io/icons/" type="text" target="view_window">点击查找 fontawesome 图标类名</a>
                    </p>
                  </el-row>
                  <el-row class="yijicaidan">
                    <el-button type="primary" @click="rewriteChildMenu(list)">修改并退出</el-button>
                  </el-row>
                  <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogxiugai = false">取 消</el-button>
                    <el-button type="primary" @click="dialogxiugai = false">确 定</el-button>
                  </span> -->
                </el-dialog>

                <el-button type="primary" class="xinzeng" @click="{dialogxinzeng = true,clearChildMenu()}">新增</el-button>
                <el-dialog title="新增二级菜单" :visible.sync="dialogxinzeng" :before-close="handlexinzeng" class="xinzeng_button">

                  <el-row class="yijicaidan">
                    <p>
                      <span class="red">*</span>
                      一级菜单名称：{{checkMenu.menuName}}
                    </p>
                  </el-row>
                  <el-row class="erjicaidan" style="display:flex;">
                    <div>
                      <span class="red">*</span> 
                      二级菜单名称：
                    </div>
                    <div >
                      <div class="yidong" v-for="(v,i) in childList">
                        <span>{{(i+1) + table.length}}.</span>
                        <input v-model="childList[i].menuName" placeholder="请填入菜单名" name="menuName"/>
                        <input v-model="childList[i].path" placeholder="请填入路径名"  style="width:150px;" name="path"/>
                        <input v-model="childList[i].component" placeholder="请填入文件名" style="width:150px;" name="component"/>
                      </div>
                    </div>
                  </el-row>
                  <div class="zeng" style="text-align: center;margin-top: 20px;">
                    <el-button @click.prevent="AddchildList" class="base">添加一行</el-button>
                    <el-button @click.prevent="removechildList" class="base">删除一行</el-button>
                  </div>

                  <el-row class="yijicaidan">
                    <p>
                      <span class="red">*</span>
                      <span class="icon">图标：</span>
                      <input type="text" v-model="childChooseData.icon" placeholder="填入图标类名">
                      <a href="http://fontawesome.io/icons/" type="text" target="view_window">点击查找 fontawesome 图标类名</a>
                    </p>
                  </el-row>
                  <el-row class="yijicaidan">
                    <el-button type="primary" @click.prevent="{addChildMenu(list)}">提交并退出</el-button>
                    <el-button type="primary" @click.prevent="clearChildMenu(list)">重置</el-button>
                  </el-row>
                  
                </el-dialog>

                <!-- <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogmodify = false">取 消</el-button>
                  <el-button type="primary" @click="dialogmodify = false">确 定</el-button>
                </span> -->
              </el-dialog>

            </template>

          </el-table-column>
        </el-table>
      </template>
    </el-row>

    <!-- 分页部分 -->
    <div class="block">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="pagination"> </el-pagination>
    </div>
  </div>
</template>

<style>
  .menu .open{
    color: #38f;
  }
  .menu .close{
    color:  #df1f1f;
  }
  
  .menu .el-table--enable-row-hover .el-table__body tr:hover>td{
    
    background-color: transparent;
  }
  .v-modal{
    z-index: 2000 !important;
  }
  .menu .zeng >.base{
    background-color: #409eff;
    color: #fff;
  }
  .menu .icon{
    display: inline-block;
    padding-right: 58px;
  }
  .menu .xinzeng_button .menu_buttom .el-dialog{
    width: 70%;
  }
  .menu .el-form--inline .el-form-item{
    vertical-align:baseline;
  }
  .menu .el-checkbox__inner{
    border: 1px solid red;
  }
  .menu .el-table td div{
    overflow: auto;
  }
  .menu .menu_buttom .el-dialog__body .cd{
    width: auto;
  }
  .menu .form{
    display: inline-block;
  }
  .menu .menu_top{
    /* height: 120px; */
    padding-top: 37px;
    margin-left: 32px;
  }
  .menu .el-row li{
    float: left;
    list-style:none;
    margin-left: 22px;
  }
  .menu .menu_top .el-input{
    width: 200px;
    height: 26px;
    /* background-color: #ffffff; */
  }
  .menu .menu_top .el-input__inner {
      height: 30px;
  }
  .menu .menu_top .el-button{
    width: 126px;
    height: 30px;
    background-color: #4a4f63;
    border: none;
    margin-left: 34px;
    font-size: 16px;
    line-height: 0px;
    color: #ffffff;
    padding:0;
  }
  .menu .menu_top .increase,.delete{
    margin-top: 25px;
  }
  .menu .menu_top .el-dialog{
    /* width: 23%;
    height: 64%; */
  }
  .menu .menu_top .el-dialog__header{
    background: #4a4f63;
      text-align: left;
  }
  .menu .menu_top .el-dialog__header .el-dialog__title {
      line-height: 24px;
      font-size: 16px;
      color: #FFF;
      padding: 0;
  }
  .menu .menu_buttom .yijicaidan{
    margin-left: 25px;
  }
  .menu .menu_buttom .yijicaidan .el-button{
    padding: auto;
    widows: 80px;
  }
  .menu .menu_buttom .erjicaidan .el-dialog__wrappe{
    z-index:2500;
  }
  .menu .menu_buttom .yijicaidan p a{
    color: #3388FF;
    margin-left: 20px;
    margin-left: 53px;
  }
  .menu .red{
    color: red;
  }
  .menu .menu_buttom .yijicaidan p input{
    padding-left: 5px;
  }
  .menu .menu_buttom .erjicaidan div .tubiao{
    display: -webkit-inline-box;
    margin-left: 10px;
    top: -10px;
    cursor: pointer;
  }
  .menu .menu_buttom .erjicaidan div .tubiao img{
    width: 17px !important;
    height: 17px !important;
  }

  .menu .menu_top .yijicaidan{
    margin-left: 25px;
  }
  .menu .menu_top .yijicaidan p a{
    color: #3388FF;
    margin-left: 20px;
    margin-left: 53px;
  }

  .menu .menu_top .erjicaidan{
    margin-left: 25px;
      margin-top: 10px;
  }

  .menu .menu_top .yijicaidan p input{
    padding-left: 5px;
  }
  .menu .menu_top .erjicaidan span{
    width: 20px;
  }
  .menu .menu_top  .erjicaidan input{
    padding-left: 5px;
    height: 22px;
  }
  .menu .menu_top .erjicaidan .yidong{
    margin-bottom: 10px;

  }
  .menu .menu_top .erjicaidan{
    display: flex;
  }
  .menu .menu_top .zeng{
      text-align: center;
      margin-right: 62px;
      margin-top: 20px;
  }
  .menu .menu_top .zeng a{
    margin-left: 10px;
    color: #3388ff;
  }
  .menu .menu_top  .zeng span{
    /* color: #3388ff; */
    font-size: 12px;
  }
  .menu .menu_top .el-dialog__footer{
    text-align: center;
      margin-top: 15px;
      margin-right: 23px;
  }
  .menu .menu_top select{
    width: 140px;
    height: 30px;
  }
  .menu .menu_buttom .menulist{
    border-left: 2px solid #88b7e0;
    padding-left: 20px;
    margin-left: 32px;
    margin-top: 30px;
  }
  .menu .menu_buttom .el-table th{
      background:#f5f6fa;
  }
  .menu .menu_buttom .menulist .mentlist_div{
    color: #556191;
  }
  .menu .menu_buttom .el-table__body-wrapper {
      overflow: unset;
      position: relative;
  }
  .menu .menu_buttom .el-dialog__wrapper{
    overflow: visible;
  }
  
  .menu .menu_buttom .el-table--enable-row-hover .el-table__row:nth-of-type(even){
      background:#f5f6fa;
  }
  .menu_buttom .el-table{
    width: 93%;
    margin-left: 32px;
    margin-top: 28px;
    text-align: center;
  }
  .menu_buttom .el-table th{
    width: 33%;
    text-align: center;
    color: #556191;
  }
  .menu_buttom .el-table .cell a{
    margin-left: 27px;
  }
  .menu .block{
      margin-top: 30px;
      display: flex;
      justify-content:flex-end;

      }
    
  .menu_buttom .el-dialog {
      position: relative;
      margin: 0 auto 50px;
      border-radius: 2px;
      -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 52%;
      height: 80%;
  }

  .menu_buttom .el-dialog__header{
    background: #4a4f63;
      text-align: left;
  }
  .menu_buttom .el-dialog__header .el-dialog__title {
      line-height: 24px;
      font-size: 16px;
      color: #FFF;
      padding: 0;
  }
  .menu_buttom .el-dialog__body{
      text-align: left;
      padding: 0;
  }
  .menu_buttom .el-dialog__body .cd {
    width: 70%;
    margin-top: 8px;
      margin-left: 55px;
  }
  .menu_buttom .el-dialog__body .cd .caidan{
    float: left;
    display: -webkit-box;
    width: 43%;
    margin-top: 22px;
  }
  .menu_buttom .el-dialog__body .cd .caidan div{
    height: 25px;
    color: #000000;
  }
  .menu_buttom .el-dialog__body .cd .caidan input{
    width: 160px;
    height: 19px;
    padding-left: 5px;
  }
  .menu_buttom .el-dialog__body .cd .caidan select{
    width: 110px;
    height: 25px;
    padding-left: 5px;
    color: #3388ff;
  }
  .menu_buttom .el-dialog__body .ckcd{
      border-bottom: 2px solid #556191;
      padding-bottom: 8px;
      width: 93%;
      margin-left: 34px;
      margin-top: 26px;
  }
  .menu_buttom .el-dialog__body .ckcd .ck{
      border-left: 2px solid #88b7e0;
      padding-left: 23px;
  }
  .menu_buttom .el-dialog__body .ckcd .ck span{
    color: #556191;
  }
  .menu_buttom .xinzeng {
      background: #4a4f63;
      float: right;
      margin-top: 10px;
      margin-right: 38px;
      border: 0;
      width: 121px;
      height: 32px;
      border-radius: 0;
      color: #66b1ff;
      line-height: 9px;
  }
  .menu_buttom .el-dialog__footer{
    text-align: center;
    margin-top: 50px;
  }
  .menu_buttom .xinzeng_button{
    width: 95%;
    margin: 58px auto 50px;
    height: 89%;
  } 
  .menu_buttom .yijicaidan{
    margin-left: 50px;
    margin-top: 25px;
  }
  .menu_buttom .erjicaidan{
    margin-left: 25px;
    margin-top: 10px;
  }

  .menu_buttom .yijicaidan p input{
    padding-left: 5px;
  }
  .menu_buttom .erjicaidan span{
    width: 20px;
  }
  .menu_buttom .erjicaidan input{
    padding-left: 5px;
    
  }
  .menu_buttom .erjicaidan .yidong{
      overflow: hidden;

  }
  .menu_buttom .erjicaidan .zeng{
      text-align: center;
      margin-right: 62px;
      margin-top: 20px;
  }
  .menu_buttom .erjicaidan .zeng a{
    margin-left: 10px;
    color: #3388ff;
  }
  .menu_buttom .erjicaidan .zeng span{
    color:#3388ff;
  }
</style>

<script>
import API from '@/api/api'
import index from 'vue';
// import axios from 'axios'
  export default {
    data() {
      return {
        loading:false,
        loading2:false,
        dialogxinzeng:false,
        dialogxiugai:false,
        dialogv:false,
        dialoginc:false,
        dialogmodify: false,
        tableData: [],
        table: [],
        pageNum:1,
        total:0,
        menuOffOn:'',
        inquireData:{//查询是返回的参数
          menuName:'',
          status:''
        },
        temp:'',//提供给分页的搜索参数
        temp2:"",//提供给修改内部的刷新参数
        handleSelection:{
          userId:"",
          ids:''
        },
        multipleSelection: [],//复选框获取的值
        checkMenu:{
          menuName:"",
          available:null,
          createDate:'',
          updateDate:''
        },
        list:[//新增菜单（二级菜单集合）
            {menuName: '',path:'',component:'',sort:''},
            {menuName: '',path:'',component:'',sort:''}
        ],
        chooseData:{//新增菜单
          icon:"",
          firstName:"",
          userId:''
        },
        childList:[//新增二级菜单（二级菜单集合）
            {menuName: '',path:'',component:'',sort:''},
            {menuName: '',path:'',component:'',sort:''}
        ],
        childChooseData:{//新增二级菜单
          icon:"",
          userId:''
        },
        rewriteList:[],//重写菜单（二级菜单集合）
        rewriteData:{//重写菜单
          icon:"",
          userId:'',
          firstName:""
        },
        downloading:false,
        add:false,
        forbid:false,
        open:false,
        examine:false,
      }
    },
    created () {
      let menu = JSON.parse(window.sessionStorage.getItem('menu'))
      menu.forEach((item)=>{
        if(item.name == '菜单管理'){
          item.children.forEach((item)=>{
            if(item.path == this.$route.path){
              item.operations.forEach((item)=>{
                if(item.operationName == '下载'){
                  this.downloading = true
                }else if(item.operationName == '添加'){
                  this.add = true
                }else if(item.operationName == '禁用'){
                  this.forbid = true
                }else if(item.operationName == '开启'){
                  this.open = true
                }else if(item.operationName == '查看'){
                  this.examine = true
                }
              })
            }
          })
        }
      })
      this.getData()
    },
    methods: {
      handlemodify(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
	    handlexinzeng(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handlexiugai(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            return true
          })
          .catch(_ => {
            return false
          });
      },
      handlev(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleinc(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      chooseClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getData( paramStr=this.pageNum ){//请求菜单列表数据
        this.loading = true
        let vm = this
        API.menuManager(paramStr).then( result =>{
          if(result.code == 200){
            vm.loading = false
            var res=result.data
            vm.total = parseInt(res.total)
            vm.tableData = res.list
          }
        },
        function(err) {
          vm.loading = false
          vm.$message.error({
            showClose: true,
            message: '列表获取失败',
            duration: 2000
          });
        })
      },
      pagination( currentPage ){//点击分页事件
        this.$data.pageNum = currentPage
        if( this.$data.temp === "" ){
          this.getData( this.$data.pageNum )
        }else{ 
          var o = this.$data.pageNum + this.$data.temp
          this.getData(o)
        }
      },
      clickOffOn(id){//菜单禁用、开启
        this.loading = true
        let vm = this
        API.menuOperation(id).then(result =>{
          if(result.code == 200){
            vm.loading = false
             var o = vm.$data.pageNum + vm.$data.temp
             vm.getData(o)
          }else if(result.data == 0){
            vm.$message.error({
              showClose: true,
              message: '操作失败',
              duration: 2000
            })
            return
          }
        })  
      },
      inquire(){//查询
        this.$data.temp = ""
        for(let item in this.inquireData){
          if(this.inquireData[item]!='' && this.inquireData[item] != 'NaN-NaN-NaN NaN:NaN:NaN' ){
            this.$data.temp +=`&${item}=${this.inquireData[item]}`
          }
        }
        var o  = this.$data.pageNum + this.$data.temp
        this.getData(o)
      },
      examineMenu(row){//查看
        for(let item in this.$data.checkMenu){
          this.$data.checkMenu[item]='暂无数据'
        }
        for(let item in this.$data.table){
          this.$data.table[item]='暂无数据'
        }
        this.get1MenuData(row)
      },
      modificationMenu(row){//修改
        this.temp2 = ""
        this.temp2 = row
        for(let item in this.$data.checkMenu){
          this.$data.checkMenu[item]='暂无数据'
        }
        for(let item in this.$data.table){
          this.$data.table[item]='暂无数据'
        }
        this.get1MenuData(this.temp2)
      },
      get1MenuData(row){//获得一级菜单
        this.loading2 = true
        let vm = this
        API.menuDetail(row.ID).then(result => {
          if(result.code == 200){
            vm.loading2 = false
            vm.checkMenu = result.data
            if(result.data.available == '0'){
              vm.checkMenu.available = '已禁用'
            }else {
              vm.checkMenu.available = '已开启'            
            }
            vm.get2MenuData(row)
          }
        },
        function(err) {
          this.loading = false
          this.$message.error({
            showClose: true,
            message: '列表获取失败',
            duration: 2000
          });
        })
      },
      get2MenuData(row){//获取二级菜单
        this.loading2 = true
        let vm = this
        API.menuDetail2(row.ID).then(result => {
          if (result.code == 200) {
            console.log(result)
            vm.loading2 = false
            result.data.forEach( item => {
              item.menuName1 = vm.checkMenu.menuName
            })
          vm.table = result.data
          }
          if(vm.table.length == 0){
            vm.$message.error({
              showClose: true,
              message: '无二级菜单',
              duration: 2000
            })
          }
        }) 
      },      
      //弹出窗内表格第一列合并
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex  === 0) {
            return {
              rowspan: this.table.length,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      //二级菜单禁用、开启
      clickMenuOffOn(row){
        console.log(row)
        let vm = this
        var paramStr = parseInt(row.id)
        API.menuOperation(row.id).then(result =>{
          console.log(result)
          vm.get2MenuData(vm.temp2)
        })
        
      },
      AddList () {//增加一行
        this.list.push({menuName: '',path:'',component:'',sort:''})
      },
      removeList(){//移除一行
        this.list.pop({menuName: '',path:'',component:'',sort:''})
      },
      handleSelectionChange(val) {//复选框
        this.multipleSelection = val;
         var o = []
        this.multipleSelection.forEach(item => {
          o.push(parseInt(item.ID) )
        })
        this.handleSelection.ids = o
      },
      deleteMenu(){//删除菜单
        if(this.handleSelection.ids == ""){
          this.$message.error({
            showClose: true,
            message: '请选择要删除的菜单',
            duration: 2000
          })
          return
        }
        this.handleSelection.userId = JSON.parse(window.sessionStorage.getItem('access-user')).userid
        let paramStr = "ids=" + this.handleSelection.ids+"&userId=" + this.handleSelection.userId
        this.$confirm("确认删除？")
        .then(_=>{
          this.loading = true
          let vm = this
          API.menuDelete(paramStr).then(result => {
            vm.loading = false
            if(result.code == "200"){
              vm.getData()
            }
          })
        })
        .catch(_=>{

        })
        
      },
      deleteChildMenu(id){//删除二级菜单
        let vm = this
        API.deleteChildMenu(id).then(result => {
          if(result.code == 200){
            vm.get2MenuData(vm.temp2)
          }
        })
      },
      addMenu(){//增加总菜单
        var paramStr = this.getAddParams(this.list,this.chooseData)
        if(paramStr == undefined){
          return
        }
        this.$confirm("确认增加？")
        .then(_=>{
          this.dialoginc=false
          let vm = this
          API.AddMenu(paramStr,vm.list).then(result => {
            if(result.data.code == 200){
              vm.getData()
            }else{
              vm.$message.error({
                showClose: true,
                message: result.data.error,
                duration: 2000
              })
            }
          })
        })
        .catch(_=>{

        })
        
      },
      getAddParams(paramL,paramD){//获取添加菜单的参数
        paramD.userId = JSON.parse(sessionStorage.getItem('access-user')).userid
        var o =''
        for( let item in paramD){
          if( paramD[item] == ''){
            this.$message.error({
              showClose: true,
              message: '一级菜单名或图标不可为空',
              duration: 2000
            })
            return
          }else{
            o += `&${item}=${paramD[item]}`
          } 
        }
        o = o.replace("&","?")
        var flag = true
        paramL.forEach((item,index) => {
           if(this.table.length != 0){
            item.sort = (index + 1) + this.table.length
          }else{
            item.sort = index + 1
          }
          if( item.menuName == "" || item.path == "" || item.component == "" ){
            this.$message.error({
              showClose: true,
              message: '二级菜单的菜单名，文件名和路径名都不可为空',
              duration: 2000
            })
            return flag = false
          }
          var reg = /^\//
          if(reg.test(item.path) != true){
            this.$message.error({
              showClose: true,
              message: '路径以“/”开头，例：/creditRating/whiteList',
              duration: 2000
            })
            return flag = false
          }
        })
        if(flag == false){
          return
        }
        return o
      },
      clearMenu(){//重置添加的总菜单
        this.list.forEach(item => {
          item.menuName=""
          item.path=""
          item.component=""
          item.sort=""
        })
        for(let item in this.chooseData){
          this.chooseData[item] = ""
        }
      },
      addChildMenu(){//增加二级菜单
        let vm = this
        var paramStr = vm.checkMenu.id + vm.getAddParams(vm.childList,vm.childChooseData)
        if(paramStr == undefined){
          return
        }
        vm.$confirm('确认添加？')
        .then(_=>{
          vm.dialogxinzeng = false
          API.AddchildMenu(paramStr,vm.childList).then(result => {
            if(result.data.code == "201"){
              vm.get2MenuData(vm.temp2)
              vm.clearChildMenu()
            }
          })
        })
        .catch(_=>{

        })
                
      },
      clearChildMenu(){//重置添加的二级菜单
        this.childList.forEach(item => {
          item.menuName=""
          item.path=""
          item.component=""
          item.sort=""
        })
        for(let item in this.childChooseData){
          this.childChooseData[item] = ""
        }
      },
      AddchildList () {//增加一行
        this.childList.push({menuName: '',path:'',component:'',sort:''})
      },
      removechildList(){//移除一行
        this.childList.pop({menuName: '',path:'',component:'',sort:''})
      },
      getRewriteData(){//初始化修改菜单的数据
        let vm = this
        vm.loading2 = true
        API.menuDetail2(vm.temp2.ID).then(result => {
          if(result.code == "200"){
            vm.loading2 = false
            vm.$data.rewriteList = result.data
          }
        })
        vm.$data.rewriteData.firstName = vm.$data.checkMenu.menuName
        vm.$data.rewriteData.icon = vm.$data.checkMenu.iconCls
      },
      rewriteChildMenu(){//修改菜单
        let vm = this
        var paramStr = vm.checkMenu.id + vm.getAddParams(vm.rewriteList,vm.rewriteData)
        if(paramStr == undefined){
          return
        }
        console.log(this.rewriteList)
        vm.$confirm('确认修改？')
        .then( _=>{
          vm.dialogxiugai = false
          API.rewriteMenu(paramStr,vm.rewriteList).then(result => {
            if(result.code == "200"){
              vm.get1MenuData(vm.temp2)
              vm.getData()
            }
          })
        })
        .catch( _=>{

        })
      },
      aaa(i){//排序增加
        if(i>0){
          // [this.$data.rewriteList[i-1],this.$data.rewriteList[i]] = [this.$data.rewriteList[i],this.$data.rewriteList[i-1]]  
        //  this.$data.rewriteList.items.$set
        var b = this.$data.rewriteList[i-1]
          var a = this.$data.rewriteList[i]
       // Vue.set(a,0,this.$data.rewriteList[i-1])
        //   Vue.set(b,0,this.$data.rewriteList[i])
          
        //   console.log(this.$data.rewriteList.splice(i-1,0,a))
        //   console.log(this.$data.rewriteList.splice(i-1,1,b))
        this.$data.rewriteList.splice(i,1,b)
        this.$data.rewriteList.splice(i-1,1,a)
        }else{
          return
        }
        // this.rewriteList = this.rewriteList.filter(item => {
        //   return item
        // })
        // var a=this.$data.rewriteList;
        // this.$data.rewriteList=null;
        // this.$data.rewriteList=a
        console.log(this.$data.rewriteList)
        // this.getRewriteData()
      }
    }
  }
</script>