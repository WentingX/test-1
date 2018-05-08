<template>
<div class="menu">
    <el-row class="menu_top">
        <el-form :inline="true" :model="inquireData" class="demo-form-inline form">
            <el-form-item class="name" label="菜单名称：">
                <el-input size="mini" v-model="inquireData.menuName" clearable></el-input>
            </el-form-item>
            <el-form-item class="name" label="菜单状态：">
                <el-select size="mini" v-model="inquireData.status">
                    <el-option label="已启用" value="0"></el-option>
                    <el-option label="已禁用" value="-1"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" class="search" @click="search()">搜索</el-button>
        </el-form>
        <div class="btns">
            <el-button type="primary" class="increase" @click="dialogVisible = true">增加</el-button>
        </div>
    </el-row>
    <el-row class="menu-center">
        <div class="menulist">
        <div class="mentlist_div">菜单列表</div>
        </div>
        <el-table
    :data="tableData"
    style="width: 100%"
    border
    ref="table"
    v-loading="loading2"
    :row-key="getRowKeys"
    :expand-row-keys="expands"
    @expand-change="child"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-table
    :data="tableData2"
    border
    v-loading="loading3"
    style="width: 100%"
    class="level"
    >
    <el-table-column
      prop="title"
      label="二级菜单名称"
      align="center">
    </el-table-column>
    <el-table-column
      label="状态"
      align="center">
      <template scope="scope">
                <span :class="{'jy': (scope.row.deleteFlag === '已禁用'),'kq':(scope.row.deleteFlag === '已启用')}">{{ scope.row.deleteFlag}}</span>
            </template>
</el-table-column>
<el-table-column label="操作" align="center">
    <template slot-scope="scope">
    <el-button
    type="text"
    :class="{'kq': (scope.row.deleteFlag === '已禁用'),'jy':(scope.row.deleteFlag === '已启用')}"
    @click="menuOperation(scope.$index,scope.row)"
    >{{scope.row.status}}</el-button>
    <el-button
    type="text"
    class="" @click="amendC(scope.$index,scope.row)">修改</el-button>
    <el-button
    type="text"
    class="" @click="operation = true,handle(scope.row)">操作</el-button>
</template>
</el-table-column>
</el-table>
</template>
</el-table-column>
<el-table-column align="center" label="菜单名称" prop="title">
</el-table-column>
<el-table-column align="center" label="状态">
    <template scope="scope">
                <span :class="{'jy': (scope.row.deleteFlag === '已禁用'),'kq':(scope.row.deleteFlag === '已启用')}">{{ scope.row.deleteFlag}}</span>
            </template>
</el-table-column>
<el-table-column align="center" label="操作">
    <template slot-scope="scope">
    <el-button
    type="text"
    :class="{'kq': (scope.row.deleteFlag === '已禁用'),'jy':(scope.row.deleteFlag === '已启用')}"
    @click="menuOperation(scope.$index,scope.row)"
    >{{scope.row.status}}</el-button>
    <el-button
    type="text"
    class="" @click="addc(scope.$index,scope.row)">新增</el-button>
    <el-button
    type="text"
    class="" @click="amend(scope.$index,scope.row)">修改</el-button>
</template>
</el-table-column>
</el-table>
<el-pagination v-if="tableData!=''" background layout="prev, pager, next" :total="total" :current-page="page" :page-size="7" @current-change="handleCurrentChange" style="text-align:right;margin-top:15px;">
</el-pagination>
</el-row>
<div class="dialog">
    <el-dialog :close-on-click-modal="false" :title="dialogTit" :visible.sync="dialogVisible" width="30%" @close="resetForm('formLabelAlign')">
        <div>
            <el-form label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="sort">
                    <el-input v-model="formLabelAlign.sort"></el-input>
                </el-form-item>
                <el-form-item label="图标：" prop="icon">
                    <el-input v-model="formLabelAlign.icon"></el-input>
                </el-form-item>
                <a style="margin-left:80px" href="http://www.fontawesome.com.cn/faicons/" type="text" target="view_window">点击查找 fontawesome 图标类名</a>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" :loading="loading" @click="submitForm('formLabelAlign')" v-if="addBtn">确 定</el-button>
    <el-button type="primary" :loading="loading" @click="submitForm2('formLabelAlign')" v-if="amendBtn">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :title="dialogTit2" :visible.sync="dialogVisible2" width="30%" @close="resetForm2('formLabelAlign2')">
        <div>
            <el-form label-width="100px" :model="formLabelAlign2" ref="formLabelAlign2" :rules="rules2">
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="formLabelAlign2.name"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="sort">
                    <el-input v-model="formLabelAlign2.sort"></el-input>
                </el-form-item>
                <el-form-item label="菜单路径：" prop="component">
                    <el-input v-model="formLabelAlign2.component"></el-input>
                </el-form-item>
                <el-form-item label="路由路径：" prop="path">
                    <el-input v-model="formLabelAlign2.path"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" :loading="loading" @click="submitChildForm('formLabelAlign2')" v-if="addCBtn">确 定</el-button>
    <el-button type="primary" :loading="loading" @click="submitChildForm2('formLabelAlign2')" v-if="amendCBtn">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" class="operation" width="90%" title="操作信息" :visible.sync="operation">
        <el-row style="margin-bottom:25px;margin-left:35px;">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <span>菜单名称：</span>
                    <el-input v-model="menuInfo.name" :disabled="true" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <span>菜单状态：</span>
                    <el-select size="mini" :disabled="true" v-model="menuInfo.status" clearable>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <span>创建时间：</span>
                    <el-input v-model="menuInfo.createTime" :disabled="true" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <span>最后修改时间：</span>
                    <el-input v-model="menuInfo.updateTime" :disabled="true" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
        </el-row>
        <div class="dify">
            <div class="miss">操作列表</div>
        </div>
        <span style="margin-left:40px;">*{{menuInfo.submenu}}</span>
        <el-tree v-loading="loading4" :data="data" default-expand-all node-key="id" ref="tree" :props="defaultProps"></el-tree>
        <el-button v-if="data!=''" type="text" style="position: absolute;top: 190px;right: 80px;" @click="amendVisible=true">修改</el-button>
        <el-dialog :close-on-click-modal="false" top="20vh" class="built" width="30%" title="新增" :visible.sync="innerVisible" append-to-body @close="resetForm4('stair')">
            <div class="box">
                <el-form label-width="120px" :model="stair" ref="stair" :rules="stairs">
                    <el-form-item label="一级操作名称：" prop="name">
                        <el-input v-model="stair.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-dialog :close-on-click-modal="false" top="20vh" class="built" width="30%" title="新增二级操作" :visible.sync="innerVisible2" append-to-body @close="resetForm4('second')">
                <div class="box1">
                    <el-form label-width="120px" :model="second" ref="second" :rules="seconds">
                        <el-form-item label="一级操作名称：" prop="value">
                            <el-select v-model="second.value" placeholder="请选择">
                                <el-option v-for="item in data" :key="item.id" :label="item.title" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="二级操作名称：" prop="name">
                            <el-input class="el-i1" v-model="second.name"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="baocun1('second')">保存</el-button>
                </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisible2 = true">新增二级操作</el-button>
                <el-button @click="baocun('stair')">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" top="20vh" class="built" width="30%" title="修改一级操作" :visible.sync="amendVisible" append-to-body @close="resetForm4('stair2')">
            <div class="box1">
                <el-form label-width="120px" :model="stair2" ref="stair2" :rules="seconds1">
                    <el-form-item label="选择操作：" prop="value">
                        <el-select v-model="stair2.value" placeholder="请选择" @change="sel">
                            <el-option v-for="item in data" :key="item.id" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="一级操作名称：" prop="name">
                        <el-input class="el-i1" v-model="stair2.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-dialog :close-on-click-modal="false" top="20vh" class="built" width="30%" title="修改二级操作" :visible.sync="amendVisible2" append-to-body @close="resetForm4('second2')">
                <div class="box1">
                    <el-form label-width="120px" :model="second2" ref="second2" :rules="stairs1">
                        <el-form-item label="选择操作：" prop="value">
                            <el-select v-model="second2.value" placeholder="请选择" @change="sel1">
                                <el-option v-for="item in data2" :key="item.id" :label="item.title" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="二级操作名称：" prop="name">
                            <el-input class="el-i1" v-model="second2.name"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="xiugai2('second2')">保存</el-button>
                </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="amendVis">修改二级操作</el-button>
                <el-button @click="xiugai('stair2')">保存</el-button>
            </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = true">新增</el-button>
            <!--            <el-button @click="operationDelete = true">删除</el-button>-->
        </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" class="operation" width="90%" title="删除操作" :visible.sync="operationDelete">
        <div class="dify">
            <div class="miss">操作列表</div>
        </div>
        <el-tree :data="data" default-expand-all node-key="id" ref="tree" show-checkbox :props="defaultProps"></el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="checkAll">全选</el-button>
            <el-button @click="">确定删除</el-button>
        </div>
    </el-dialog>
</div>
</div>
</template>
<style lang="scss">
    .menu {
        .menu_top {
            .el-button {
                width: 126px;
                height: 30px;
                background-color: #4a4f63;
                border: none;
                margin-left: 34px;
                font-size: 16px;
                line-height: 0px;
                color: #ffffff;
                padding: 0;
            }
            .search {
                margin-top: 5px;
            }
        }
        .menu-center {
            margin-top: 50px;
            .menulist {
                border-left: 2px solid #88b7e0;
                padding-left: 20px;
                margin-bottom: 32px;
                margin-top: 30px;
                .mentlist_div {
                    color: #88b7e0;
                }
            }
            .el-table__header-wrapper {
                font-size: 13px;
                th.is-leaf {
                    background: #f3f4f7;
                }
            }
            .el-table__expanded-cell:hover {
                background: #fff !important;
            }
            .el-table--enable-row-hover .el-table__body tr:nth-child(even) {
                background: #f3f4f7;
            }
            .el-table--enable-row-hover .el-table__body tr:nth-child(odd):hover>td {
                background-color: #fff;
            }
            .demo-table-expand {
                font-size: 0;
                label {
                    width: 90px;
                    color: #99a9bf;
                }
                .el-form-item {
                    margin-right: 0;
                    margin-bottom: 0;
                    width: 50%;
                }
            }
            .kq {
                color: #3385ff !important;
            }

            .jy {
                color: #df1f1f !important;
            }
            .level {
                td {
                    padding: 0;
                }
            }
        }
        .dialog {
            .el-dialog__header {
                background: #4a4f63;
                text-align: left;
            }
            .el-dialog__header .el-dialog__title {
                line-height: 24px;
                font-size: 16px;
                color: #FFF;
                padding: 0;
            }
            .operation {
                .el-input {
                    width: 180px;
                    height: 30px;
                    background-color: #ffffff;
                    input {
                        height: 30px;
                    }
                }
                .dify {
                    width: 93%;
                    height: 36px;
                    border-bottom: 2px solid #556191;
                    margin-left: 39px;
                    margin-bottom: 0px;
                    margin-top: 10px;
                    .miss {
                        border-left: 2px solid #3385ff;
                        padding-left: 20px;
                        color: #556191;
                    }
                }
                .el-tree {
                    display: flex;
                    margin-left: 25px;
                    .el-tree-node {
                        margin-right: 50px;
                    }
                    .el-tree-node:focus>.el-tree-node__content,
                    .el-tree-node__content:hover {
                        background: #fff;
                    }
                }
                .dialog-footer {
                    text-align: left;
                    margin-left: 25px;
                    .el-button {
                        background-color: #4a4f63;
                        color: #fff;
                    }
                }
            }
        }
    }

    .built {
        .el-dialog__header {
            background: #4a4f63;
            text-align: left;
        }
        .el-dialog__header .el-dialog__title {
            line-height: 24px;
            font-size: 16px;
            color: #FFF;
            padding: 0;
        }
        .box {
            .el-input {
                width: 76%;
            }
        }
        .box1 {
            .el-i1 {
                width: 76%;
            }
        }
        .dialog-footer {
            text-align: center;
            margin-left: 25px;
            .el-button {
                background-color: #4a4f63;
                color: #fff;
            }
        }
    }

</style>
<script>
    import API from '@/api/api'
    import axios from 'axios'
    export default {
        data() {
            return {
                inquireData: {
                    menuName: '',
                    status: '0'
                },
                dialogTit: '新增一级菜单',
                dialogTit2: '新增二级菜单',
                amendBtn: false,
                addBtn: true,
                amendCBtn: false,
                addCBtn: true,
                loading: false,
                loading2: true,
                loading3: true,
                loading4: true,
                formLabelAlign: {
                    name: '',
                    sort: '',
                    icon: ''
                },
                formLabelAlign2: {
                    name: '',
                    sort: '',
                    path: '',
                    component: ''
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur'
                    }],
                    sort: [{
                        required: true,
                        message: '请输入排序',
                        trigger: 'blur'
                    }],
                    icon: [{
                        required: true,
                        message: '请填入图标',
                        trigger: 'blur'
                    }]
                },
                rules2: {
                    name: [{
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur'
                    }],
                    sort: [{
                        required: true,
                        message: '请输入排序',
                        trigger: 'blur'
                    }],
                    path: [{
                        required: true,
                        message: '请输入路由路径',
                        trigger: 'blur'
                    }],
                    component: [{
                        required: true,
                        message: '请输入菜单路径',
                        trigger: 'blur'
                    }]
                },
                menuInfo: {
                    name: '',
                    status: '',
                    createTime: '',
                    updateTime: '',
                    submenu: ''
                },
                tableData: [],
                tableData2: [],
                total: 0,
                page: 1,
                dialogVisible: false,
                dialogVisible2: false,
                operation: false,
                innerVisible: false,
                innerVisible2: false,
                amendVisible: false,
                amendVisible2: false,
                parentId: '',
                presentId: '',
                presenCtId: '',
                getRowKeys(row) {
                    return row.id;
                },
                expands: [],
                disabled: false,
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                dataId: [],
                flag: false,
                operationDelete: false,
                opi: [],
                value: '',
                parentId: '',
                stair: {
                    name: ''
                },
                stair2: {
                    name: '',
                    value: '',
                },
                stairs: {
                    name: [{
                        required: true,
                        message: '请输入一级操作名称',
                        trigger: 'blur'
                    }]
                },
                second: {
                    name: '',
                    value: '',
                },
                second2: {
                    name: '',
                    value: '',
                },
                seconds: {
                    name: [{
                        required: true,
                        message: '请输入二级操作名称',
                        trigger: 'blur'
                    }],
                    value: [{
                        required: true,
                        message: '请选择一级操作名称',
                        trigger: 'change'
                    }]
                },
                seconds1: {
                    name: [{
                        required: true,
                        message: '请输入一级操作名称',
                        trigger: 'blur'
                    }],
                    value: [{
                        required: true,
                        message: '请选择操作',
                        trigger: 'change'
                    }]
                },
                stairs1: {
                    name: [{
                        required: true,
                        message: '请输入二级操作名称',
                        trigger: 'blur'
                    }],
                    value: [{
                        required: true,
                        message: '请选择操作',
                        trigger: 'change'
                    }]
                },
                sec: [],
                data2: []
            }
        },
        methods: {
            //新增二级操作
            baocun1(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = [{
                            parentId: this.second.value,
                            name: this.second.name,
                            type: '2',
                            title: this.second.name,
                        }]
                        axios.post('/api/api/v1/admin/sys/menu/menus', params, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            })
                            .then((response) => {
                                console.log(response)
                                if (response.data.code == 200) {
                                    this.innerVisible2 = false
                                    this.innerVisible = false
                                    this.handle(this.sec)
                                }
                            });
                    } else {
                        return false;
                    }
                });

            },
            //新增一级操作
            baocun(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = [{
                            parentId: this.parentId,
                            name: this.stair.name,
                            type: '2',
                            title: this.stair.name,
                        }]
                        axios.post('/api/api/v1/admin/sys/menu/menus', params, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            })
                            .then((response) => {
                                if (response.data.code == 200) {
                                    this.innerVisible = false
                                    this.handle(this.sec)
                                }
                            });
                    } else {
                        return false;
                    }
                });

            },
            //操作列表
            handle(row) {
                this.parentId = row.id
                this.sec = row
                this.menuInfo.name = this.opi.title
                this.menuInfo.createTime = this.opi.createTime
                this.menuInfo.updateTime = this.opi.updateTime
                if (this.opi.status == '禁用') {
                    this.menuInfo.status = '启用'
                } else {
                    this.menuInfo.status = '禁用'
                }
                this.menuInfo.submenu = row.title
                this.data = [];
                this.loading4 = true
                API.menuDetail2(row.id).then((result) => {
                    if (result.code == 200) {
                        if (result.data != '') {
                            result.data.forEach((item) => {
                                API.menuDetail2(item.id).then((result1) => {
                                    if (result1.code == 200) {
                                        item.children = result1.data
                                        this.data.push(item)
                                        this.loading4 = false
                                    }
                                })
                            })
                        } else {
                            this.loading4 = false
                            this.data = [];
                        }

                    }
                })
            },
            //选择修改的操作
            sel(row) {
                let obj = {};
                obj = this.data.find((item) => {
                    return item.id === row;
                });
                this.stair2.name = obj.title
            },
            sel1(row) {
                let obj = {};
                obj = this.data2.find((item) => {
                    return item.id === row;
                });
                this.second2.name = obj.title
            },
            //修改一级操作
            xiugai(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            id: this.stair2.value,
                            parentId: this.parentId,
                            name: this.stair2.name,
                            type: '2',
                            title: this.stair2.name,
                        }
                        axios.put('/api/api/v1/admin/sys/menu', params, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            })
                            .then((response) => {
                                if (response.data.code == 200) {
                                    this.$message.success({
                                        message: '一级操作修改成功',
                                        showClose: true,
                                        duration: 2000
                                    });
                                    this.amendVisible = false
                                    this.handle(this.sec)
                                } else {
                                    this.$message.error({
                                        showClose: true,
                                        message: '一级操作修改失败',
                                        duration: 2000
                                    });
                                }
                            }, (error) => {
                                this.$message.error({
                                    showClose: true,
                                    message: '一级操作修改失败',
                                    duration: 2000
                                });
                            });
                    } else {
                        return false;
                    }
                });
            },
            //修改二级操作弹窗
            amendVis() {
                if (this.stair2.value != '') {
                    API.menuDetail2(this.stair2.value).then((result) => {
                        if (result.code == 200) {
                            console.log(result)
                            if (result.data != '') {
                                this.data2 = result.data
                                this.amendVisible2 = true
                            } else {
                                this.$message.error({
                                    message: '该操作没有二级操作',
                                    showClose: true,
                                    duration: 2000
                                });
                            }
                        }
                    })
                } else {
                    this.$message.error({
                        message: '请选择操作',
                        showClose: true,
                        duration: 2000
                    });
                }

            },
            //修改二级操作
            xiugai2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            id: this.second2.value,
                            parentId: this.stair2.value,
                            name: this.second2.name,
                            type: '2',
                            title: this.second2.name,
                        }
                        console.log(params)
                        axios.put('/api/api/v1/admin/sys/menu', params, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            })
                            .then((response) => {
                                if (response.data.code == 200) {
                                    this.$message.success({
                                        message: '二级操作修改成功',
                                        showClose: true,
                                        duration: 2000
                                    });
                                    this.amendVisible2 = false
                                    this.amendVisible = false
                                    this.handle(this.sec)
                                } else {
                                    this.$message.error({
                                        showClose: true,
                                        message: '二级操作修改失败',
                                        duration: 2000
                                    });
                                }
                            }, (error) => {
                                this.$message.error({
                                    showClose: true,
                                    message: '二级操作修改失败',
                                    duration: 2000
                                });
                            });
                    } else {
                        return false;
                    }
                });
            },
            //菜单列表
            menuList(parameter) {
                let vm = this
                let params = {
                    pageNum: 7,
                    pageSize: vm.page
                }
                if (parameter == undefined) {
                    parameter = params
                }
                vm.tableData = []
                vm.loading2 = true
                API.menuManager(parameter).then((result) => {
                    console.log(result)
                    if (result.code == 200) {
                        vm.loading2 = false
                        vm.total = parseInt(result.data.total)
                        result.data.list.forEach((item) => {
                            if (item.deleteFlag == 0) {
                                item.deleteFlag = '已启用'
                                item.status = '禁用'
                            } else {
                                item.deleteFlag = '已禁用'
                                item.status = '启用'
                            }
                            if (item.component == null) {
                                vm.parentId = item.id
                            }
                            if (item.component != null) {
                                vm.tableData.push(item)
                            }
                        })
                    }
                })
            },
            //分页
            handleCurrentChange(val) {
                this.page = val
                this.loading2 = true
                this.menuList()
            },
            //查看子菜单
            child(row) {
                this.expands = [];
                this.expands.push(row.id);
                let vm = this
                this.opi = row
                vm.tableData2 = []
                vm.loading3 = true
                API.menuDetail2(row.id).then((result) => {
                    if (result.code == 200) {
                        vm.loading3 = false
                        result.data.forEach((item) => {
                            if (item.deleteFlag == 0) {
                                item.deleteFlag = '已启用'
                                item.status = '禁用'
                            } else {
                                item.deleteFlag = '已禁用'
                                item.status = '启用'
                            }
                            vm.tableData2.push(item)
                        })
                    }
                })
            },
            //关闭弹窗
            handleClose(done) {
                done();
            },
            //关闭一级菜单弹窗回调
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.amendBtn = false
                this.addBtn = true
                this.dialogTit = '新增一级菜单'
                this.formLabelAlign.icon = ''
                this.formLabelAlign.name = ''
                this.formLabelAlign.sort = ''
            },
            //关闭二级菜单弹窗回调
            resetForm2(formName) {
                this.$refs[formName].resetFields();
                this.dialogTit2 = '新增二级菜单'
                this.formLabelAlign2.sort = ''
                this.formLabelAlign2.name = ''
                this.formLabelAlign2.path = ''
                this.formLabelAlign2.component = ''
            },
            resetForm4(formName) {
                this.$refs[formName].resetFields();
            },
            //新增一级菜单
            submitForm(formName) {
                let vm = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = [{
                            parentId: this.parentId,
                            name: this.formLabelAlign.name,
                            type: '0',
                            icon: this.formLabelAlign.icon,
                            title: this.formLabelAlign.name,
                            level: parseInt(0),
                            order: parseInt(this.formLabelAlign.sort),
                            component: 'home',
                            path: '/'
                        }]
                        axios.post('/api/api/v1/admin/sys/menu/menus', params, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            })
                            .then(function(response) {
                                if (response.data.code == 200) {
                                    vm.$message.success({
                                        message: '一级菜单新增成功',
                                        showClose: true,
                                        duration: 2000
                                    });
                                    vm.dialogVisible = false
                                    vm.menuList()
                                } else {
                                    //                                                                                    vm.loading = false;
                                    vm.$message.error({
                                        showClose: true,
                                        message: '一级菜单新增失败',
                                        duration: 2000
                                    });
                                }
                            }, function(error) {
                                //                                            vm.loading = false;
                                vm.$message.error({
                                    showClose: true,
                                    message: '一级菜单新增失败',
                                    duration: 2000
                                });
                            });
                    } else {
                        return false;
                    }
                });
            },
            //修改一级菜单
            submitForm2(formName) {
                let vm = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            id: this.presentId,
                            parentId: this.parentId,
                            name: this.formLabelAlign.name,
                            type: '0',
                            icon: this.formLabelAlign.icon,
                            title: this.formLabelAlign.name,
                            level: parseInt(0),
                            order: parseInt(this.formLabelAlign.sort),
                            component: 'home',
                            path: '/'
                        }
                        axios.put('/api/api/v1/admin/sys/menu', params, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            })
                            .then(function(response) {
                                if (response.data.code == 200) {
                                    vm.$message.success({
                                        message: '一级菜单修改成功',
                                        showClose: true,
                                        duration: 2000
                                    });
                                    vm.dialogVisible = false
                                    vm.menuList()
                                } else {
                                    vm.$message.error({
                                        showClose: true,
                                        message: '一级菜单修改失败',
                                        duration: 2000
                                    });
                                }
                            }, function(error) {
                                vm.$message.error({
                                    showClose: true,
                                    message: '一级菜单修改失败',
                                    duration: 2000
                                });
                            });
                    } else {
                        return false;
                    }
                });
            },
            //打开修改一级菜单弹窗
            amend(index, row) {
                console.log(this.$refs.table.toggleRowSelection(row, false))
                this.amendBtn = true
                this.addBtn = false
                this.presentId = row.id
                console.log(row)
                this.dialogTit = '修改一级菜单'
                this.formLabelAlign.name = row.title;
                this.formLabelAlign.sort = parseInt(row.order);
                this.formLabelAlign.icon = row.icon;
                this.dialogVisible = true
            },
            //新增二级菜单弹窗
            addc(index, row) {
                this.dialogVisible2 = true
                this.presentId = row.id
                this.amendCBtn = false
                this.addCBtn = true
            },
            //新增二级菜单
            submitChildForm(formName) {
                let vm = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = [{
                            parentId: this.presentId,
                            name: this.formLabelAlign2.name,
                            type: '1',
                            icon: '',
                            title: this.formLabelAlign2.name,
                            level: parseInt(1),
                            order: parseInt(this.formLabelAlign2.sort),
                            component: this.formLabelAlign2.component,
                            path: this.formLabelAlign2.path,
                        }]
                        axios.post('/api/api/v1/admin/sys/menu/menus', params, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            })
                            .then(function(response) {
                                if (response.data.code == 200) {
                                    vm.$message.success({
                                        message: '二级菜单新增成功',
                                        showClose: true,
                                        duration: 2000
                                    });
                                    vm.dialogVisible2 = false
                                    vm.menuList()
                                } else {
                                    //                                                                                    vm.loading = false;
                                    vm.$message.error({
                                        showClose: true,
                                        message: '二级菜单新增失败',
                                        duration: 2000
                                    });
                                }
                            }, function(error) {
                                //                                            vm.loading = false;
                                vm.$message.error({
                                    showClose: true,
                                    message: '二级菜单新增失败',
                                    duration: 2000
                                });
                            });
                    } else {
                        return false;
                    }
                });
            },
            //修改二级菜单弹窗
            amendC(index, row) {
                this.amendCBtn = true
                this.addCBtn = false
                this.presenCtId = row.id
                this.dialogTit2 = '修改二级菜单'
                this.formLabelAlign2.name = row.title;
                this.formLabelAlign2.sort = parseInt(row.order);
                this.formLabelAlign2.path = row.path;
                this.formLabelAlign2.component = row.component;
                this.dialogVisible2 = true;
                this.presentId = row.parentId;
            },
            //修改二级菜单
            submitChildForm2(formName) {
                let vm = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            id: this.presenCtId,
                            parentId: this.presentId,
                            name: this.formLabelAlign2.name,
                            type: '1',
                            icon: '',
                            title: this.formLabelAlign2.name,
                            level: parseInt(1),
                            order: parseInt(this.formLabelAlign2.sort),
                            component: this.formLabelAlign2.component,
                            path: this.formLabelAlign2.path,
                        }
                        axios.put('/api/api/v1/admin/sys/menu', params, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            })
                            .then(function(response) {
                                if (response.data.code == 200) {
                                    vm.$message.success({
                                        message: '二级菜单修改成功',
                                        showClose: true,
                                        duration: 2000
                                    });
                                    vm.dialogVisible2 = false
                                    vm.menuList()
                                } else {
                                    //                                                                                    vm.loading = false;
                                    vm.$message.error({
                                        showClose: true,
                                        message: '二级菜单修改失败',
                                        duration: 2000
                                    });
                                }
                            }, function(error) {
                                //                                            vm.loading = false;
                                vm.$message.error({
                                    showClose: true,
                                    message: '二级菜单修改失败',
                                    duration: 2000
                                });
                            });
                    } else {
                        return false;
                    }
                });
            },
            //菜单禁用/启用
            menuOperation(index, row) {
                let vm = this
                let statu = null
                if (row.status == "禁用") {
                    statu = parseInt(-1)
                } else if (row.status == "启用") {
                    statu = parseInt(0)
                }
                axios.post('/api/api/v1/admin/sys/menu/ids?status=' + statu, [row.id], {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    })
                    .then(function(response) {
                        if (response.data.code == 200) {
                            if (row.component == 'home') {
                                vm.menuList();
                            } else {
                                row.id = row.parentId
                                vm.child(row);
                            }
                        }
                    });
            },
            checkAll() {
                this.flag = !this.flag
                if (this.flag) {
                    this.data.forEach((item) => {
                        console.log(item)
                        this.dataId.push(item.id)
                    })
                } else {
                    this.dataId = []
                }
                this.$refs.tree.setCheckedKeys(this.dataId);
            },
            //搜索
            search() {
                let params = {
                    menuName: this.inquireData.menuName,
                    status: parseInt(this.inquireData.status)
                }
                this.menuList(params)
            },
        },
        mounted() {
            this.menuList()
        }
    }

</script>
