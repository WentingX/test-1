<template>
  <!--权限-->
    <div class="authhority">
        <el-row class="authhority_top">
            <el-form :inline="true" :model="inquireData" class="demo-form-inline form">
                <el-form-item class="name" label="菜单名称：">
                    <el-input size="mini" v-model="inquireData.name" clearable></el-input>
                </el-form-item>
                <el-form-item class="name" label="菜单状态：">
                    <el-select size="mini" v-model="inquireData.status">
                        <el-option label="已启用" value="1"></el-option>
                        <el-option label="已禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-button type="primary" icon="el-icon-search" class="search" @click="search()">搜索</el-button>
            </el-form>
            <br/>
            <el-button type="primary" @click="dialogincrease = true,increased()" class="increase">增加</el-button>

            <el-dialog :close-on-click-modal="false" top="25vh" title="添加信息" :visible.sync="dialogincrease" @close="clear()">
                <el-row style="margin-bottom:25px;">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <span>角色名称：</span>
                            <el-input v-model="role.name" placeholder="请输入内容"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <span>角色状态：</span>
                            <el-select size="mini" v-model="role.status" clearable>
                                <el-option label="已启用" value="1"></el-option>
                                <el-option label="已禁用" value="0"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <span>角色描述：</span>
                            <el-input v-model="role.describe" placeholder="请输入内容"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <span>修改人：</span>
                            <el-input v-model="role.modifier" :disabled="true" placeholder="请输入内容"></el-input>
                        </div>
                    </el-col>
                    <br/>
                </el-row>
                <div class="dify" style="margin-bottom:25px;">
                    <div class="miss">修改权限</div>
                </div>
                <el-tree :data="children2" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps" render-after-expand="false">
                </el-tree>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogincrease = false">取 消</el-button>
                  <el-button type="primary" @click="getCheckedNodes">确 定</el-button>
                </span>
            </el-dialog>
            <el-button type="primary" @click="rolesDelete()" class="delete">删除</el-button>
        </el-row>

        <el-row class="authhority_buttom">
            <div class="liebiao">
                <p>用户权限列表</p>
            </div>
            <el-table v-loading="loading" :data="tableData3" tooltip-effect="dark" border @selection-change="changeFun">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="角色描述 " align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="status" label="角色状态" align="center" :row-class-name="{'jy': (tableData3.aa === '禁用'),'kq':(tableData3.aa === '开启')}">
                    <template scope="scope">
                        <span :class="{'jy': (scope.row.status === '已禁用'),'kq':(scope.row.status === '已启用')}">{{ scope.row.status}}</span>
                    </template>
</el-table-column>
<el-table-column prop="Modify" label="修改人" align="center"></el-table-column>
<el-table-column prop="updateTime" label="最后修改时间" align="center"></el-table-column>
<el-table-column label="操作" align="center">
    <template scope="scope">
                    <span :class="{'jy': (scope.row.aa === '禁用'),'kq':(scope.row.aa === '开启')}" @click="enableRole(scope.row)">{{ scope.row.aa}}</span>
                    <a href="javascript:;" type="text" @click="examine(scope.row),dialogVisible = true" class="chakan">查看</a>
                    <a href="javascript:;" type="text" @click="dialogmodify = true,amend(scope.row)" class="modify">修改</a>
                    </template>
</el-table-column>
</el-table>
<el-dialog :close-on-click-modal="false" top="25vh" visible="true" title="操作信息" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-row style="margin-bottom:25px">
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <span>角色名称：</span>
                <span>{{info.name}}</span>

            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>菜单状态：</span>
                <span>{{info.status}}</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <span>创建时间：</span>
                <span>{{info.createTime}}</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>最后修改时间：</span>
                <span>{{info.updateTime}}</span>
            </div>
        </el-col>
    </el-row>
    <div class="dify" style="margin-bottom:25px;">
        <div class="miss">修改权限</div>
    </div>
    <el-tree :data="children" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps" :default-checked-keys="data2" :default-expanded-keys="data2" render-after-expand="false">
    </el-tree>
    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">关 闭</el-button>
                </span>
</el-dialog>
<el-dialog :close-on-click-modal="false" top='25vh' title="修改信息" :visible.sync="dialogmodify">
    <el-row style="margin-bottom:25px;">
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <span>角色名称：</span>
                <el-input v-model="roles.name" placeholder="请输入内容"></el-input>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <span>角色状态：</span>
                <el-select size="mini" v-model="roles.status" clearable>
                    <el-option label="已启用" value="1"></el-option>
                    <el-option label="已禁用" value="0"></el-option>
                </el-select>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <span>角色描述：</span>
                <el-input v-model="roles.describe" placeholder="请输入内容"></el-input>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">
                <span>修改人：</span>
                <el-input v-model="roles.modifier" :disabled="true" placeholder="请输入内容"></el-input>
            </div>
        </el-col>
        <br/>
    </el-row>
    <div class="dify">
        <div class="miss">修改权限</div>
    </div>
    <el-tree :data="children3" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps" :default-checked-keys="data4" :default-expanded-keys="data4" render-after-expand="false">
    </el-tree>
    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogmodify = false">取 消</el-button>
                        <el-button type="primary" @click="getCheckedNodes2()">确 定</el-button>
                      </span>
</el-dialog>
</el-row>
<div class="block">
    <el-pagination v-if="tableData3!=''" background layout="prev, pager, next" :total="total" :page-size="9" :current-page="page" @current-change='handleCurrentChange'> </el-pagination>
</div>
</div>

</template>


<style lang="scss">
    .authhority .authhority_top {
        padding-top: 37px;
        margin-left: 8px;
    }

    .authhority .authhority_top li {
        float: left;
        list-style: none;
        margin-left: 22px;
    }

    .authhority .el-input {
        width: 140px;
        height: 26px;
        background-color: #ffffff;
    }

    .authhority .el-input__inner {
        height: 30px;
    }

    .authhority .el-button {
        width: 126px;
        height: 30px;
        background-color: #4a4f63;
        border: none;
        margin-left: 34px;
        margin-top: 25px;
        font-size: 16px;
        line-height: 0px;
        color: #ffffff;
        padding: 0;
    }

    .authhority .authhority_buttom {
        margin-bottom: 25px;
    }

    .authhority .search {
        margin-top: 0px;
    }

    .authhority .el-button+.increase {
        margin-left: 56px;
    }

    .authhority .liebiao {
        border-left: 2px solid #88b7e0;
        margin: 20px;
    }

    .authhority .liebiao p {
        margin-left: 20px;
        color: #88b7e0;
    }

    .authhority .el-table {
        width: 97%;
        margin-left: 20px;
        text-align: center;
        position: relative;
    }

    .authhority .el-table th {
        background: #f5f6fa;
    }

    .authhority .el-table th>.cell {
        text-align: center;
    }

    .authhority .el-table--enable-row-hover .el-table__row td:last-child a {
        color: #3385ff;
    }

    .authhority .el-table--enable-row-hover .el-table__row td:last-child .disabled {
        color: red;
    }

    .authhority .el-table--enable-row-hover .el-table__row td:last-child .view {
        margin: 0px 30px 0px 30px;
    }

    .authhority .el-table--enable-row-hover .el-table__row:nth-of-type(even) {
        background: #f5f6fa;
    }

    /*#xuanxiang{ display: none; }*/

    .authhority .block {
        float: right;
        margin-right: 30px;
    }

    .authhority .el-dialog__wrapper {
        position: fixed;
        top: -110px;
        right: 0;
        bottom: 0;
        left: 0;
        margin: 0;
    }

    .authhority .el-dialog {
        width: 90%;
    }

    .authhority .el-dialog .el-dialog__header {
        background: #4a4f63;
        text-align: left;
    }

    .authhority .el-dialog .el-dialog__header .el-dialog__title {
        color: #FFFFFF;
    }

    .authhority .el-dialog .el-dialog__body {
        padding: 0;
        text-align: left;
    }

    .authhority .el-dialog .el-dialog__body .el-row {
        padding: 0;
        margin-left: 50px;
        padding-top: 15px;
    }

    .authhority .el-dialog .el-dialog__body .miss {
        border-left: 2px solid #3385ff;
        padding-left: 20px;
        color: #556191;
    }

    .authhority .el-dialog .el-dialog__body .dify {
        width: 93%;
        height: 36px;
        border-bottom: 2px solid #556191;
        margin-left: 39px;
        margin-bottom: 0px;
        margin-top: 10px;
    }

    .authhority .el-dialog__footer {
        text-align: center;
    }

    .authhority .el-checkbox-group {
        margin-left: 100px;
    }

    .authhority .el-checkbox-group .el-checkbox__label {
        margin-left: 10px;
        display: inline-block;
        /* padding-left: 10px; */
        line-height: 19px;
        font-size: 14px;
    }

    .authhority .el-dialog .el-tree {
        margin-left: 25px;
    }

    .quanxuan {
        margin-left: 410px;
        margin-top: 3px;
    }

    .kq {
        color: #3385ff !important;
    }

    .jy {
        color: #df1f1f !important;
    }

    .el-table--enable-row-hover .el-table__body tr:nth-child(even)>td {
        background: #f3f4f7;
    }

    .el-table--enable-row-hover .el-table__body tr:nth-child(odd):hover>td {
        background-color: #fff;
    }

</style>

<script>
    import API from '@/api/api'
    import axios from 'axios'
    export default {
        data() {
            return {
                tableData3: [],
                multipleSelection: [],
                dialogVisible: false,
                dialogincrease: false,
                dialogmodify: false,
                tableData3ListId: [],
                info: {
                    name: '',
                    status: '',
                    updateTime: '',
                    createTime: ''
                },
                role: {
                    name: '',
                    status: '',
                    describe: '',
                    modifier: ''
                },
                roles: {
                    name: '',
                    status: '',
                    describe: '',
                    modifier: ''
                },
                children: [],
                children2: [],
                children3: [],
                defaultProps: {
                    children: 'children',
                    label: 'text'
                },
                data2: [],
                data3: [],
                total: 0,
                page: 1,
                tableDataId: [],
                data4: [],
                loading: true,
                id: '',
                inquireData: {
                    name: '',
                    status: '1'
                }
            };
        },
        methods: {
            //禁用/启用角色
            enableRole(row) {
                let status = null;
                if (row.aa == '禁用') {
                    status = '0'
                } else {
                    status = '1'
                }
                let params = 'status=' + status
                API.enableRole(params, row.id).then((result) => {
                    console.log(result)
                    if (result.code == 200) {
                        this.tableData3List();
                    }
                })
            },
            //修改权限弹框
            amend(row) {
                let vm = this;
                let params = {
                    roleId: row.id
                }
                console.log(row)
                vm.roles.name = row.roleName;
                vm.roles.status = row.status;
                vm.roles.describe = row.remark;
                vm.id = row.id
                //                vm.roles.modifier = row.updateTime;
                API.limits(params).then((result) => {
                    let parentId = null;
                    var id = '';
                    let list = result.data;
                    vm.children3 = [];
                    vm.children3.push(vm.buildTree(vm.getRoot(list), list))
                    vm.children3.forEach((item) => {
                        if (item.state.selected != null) {
                            vm.data4.push(item.id)
                        }
                        item.children.forEach((item1) => {
                            if (item1.state.selected != null) {
                                vm.data4.push(item1.id)
                            }
                            if (item1.children != undefined) {
                                item1.children.forEach((item2) => {
                                    if (item2.state.selected != null) {
                                        vm.data4.push(item2.id)
                                    }
                                })
                            }

                        })
                    })
                })
            },
            //新增权限
            getCheckedNodes() {
                if (this.role.name == '' || this.role.status == '' || this.role.describe == '') {
                    this.$message.error({
                        showClose: true,
                        message: '请完整填写信息',
                        duration: 2000
                    });
                } else {
                    let limits = [];
                    this.$refs.tree.getCheckedNodes().forEach(item => {
                        item.state.selected = 'true'
                        item.state.opened = 'true'
                        limits.push(item)
                    })
                    limits.forEach(item => {
                        if (item.children != undefined) {
                            delete item.children;
                        }
                    })
                    let user = JSON.parse(window.sessionStorage.getItem('user'));
                    let vm = this
                    let params = {
                        createUserId: user.id,
                        roleName: vm.role.name,
                        remark: vm.role.describe,
                        status: parseInt(vm.role.status),
                        menuTree: limits,
                        createTime: vm.ConvertTimestampToDate(new Date())
                    }
                    API.oddRole(params).then((result) => {
                        console.log(result)
                        if (result.data.code == 200) {
                            vm.dialogincrease = false;
                            vm.tableData3List();
                        }
                    })
                }

            },
            //修改权限
            getCheckedNodes2() {
                let limits = [];
                this.$refs.tree.getCheckedNodes().forEach(item => {
                    item.state.selected = 'true'
                    item.state.opened = 'true'
                    limits.push(item)
                })
                limits.forEach(item => {
                    if (item.children != undefined) {
                        delete item.children;
                    }
                })
                let user = JSON.parse(window.sessionStorage.getItem('user'));
                let vm = this
                let params = {
                    id: vm.id,
                    updateUserId: user.id,
                    roleName: vm.roles.name,
                    remark: vm.roles.describe,
                    status: parseInt(vm.roles.status),
                    menuTree: limits,
                    updateTime: vm.ConvertTimestampToDate(new Date())
                }
                API.amendRole(params).then((result) => {
                    if (result.code == 200) {
                        vm.dialogmodify = false;
                        vm.tableData3List();
                    }
                })
            },
            //转换时间戳
            ConvertTimestampToDate(timestamp) {
                var datetime = new Date();
                datetime.setTime(timestamp);
                var year = datetime.getFullYear();
                var month = (Array(2).join(0) + (datetime.getMonth() + 1)).slice(-2);
                var date = (Array(2).join(0) + (datetime.getDate())).slice(-2);
                var hour = (Array(2).join(0) + datetime.getHours()).slice(-2);
                var minute = (Array(2).join(0) + datetime.getMinutes()).slice(-2);
                var second = (Array(2).join(0) + datetime.getSeconds()).slice(-2);
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ':' + second;
            },
            //新增权限弹框
            increased() {
                let vm = this;
                API.limits().then((result) => {
                    let parentId = null;
                    var id = '';
                    let list = result.data;
                    vm.children2 = [];
                    vm.children2.push(vm.buildTree(vm.getRoot(list), list))
                })
            },
            //数据处理
            buildTree(pnode, nodes) {
                console.log(nodes)
                console.log(nodes.length)
                var children = [];
                nodes.forEach((item) => {
                    if (pnode.id == item.parent) {
                        children.push(item)
                    }
                });
                if (children.length > 0) {
                    pnode.children = children
                    children.forEach((item) => {
                        this.buildTree(item, nodes)
                    });
                }
                return pnode
            },
            getRoot(list) {
                var root = '';
                list.forEach((item) => {
                    if (item.parent == '#') {
                        root = item
                    }
                });
                return root
            },
            //查看权限弹框
            examine(row) {
                let vm = this;
                let params = {
                    roleId: row.id
                }
                vm.info.name = row.roleName;
                vm.info.status = row.status;
                vm.info.createTime = row.createTime;
                vm.info.updateTime = row.updateTime;
                API.limits(params).then((result) => {
                    let parentId = null;
                    var id = '';
                    let list = result.data;
                    vm.children = [];
                    vm.children.push(vm.buildTree(vm.getRoot(list), list))
                    vm.children.forEach((item) => {
                        item.disabled = true
                        if (item.state.selected != null) {
                            vm.data2.push(item.id)
                        }
                        item.children.forEach((item1) => {
                            item1.disabled = true
                            if (item1.state.selected != null) {
                                vm.data2.push(item1.id)
                            }
                            if (item1.children != undefined) {
                                item1.children.forEach((item2) => {
                                    item2.disabled = true
                                    if (item2.state.selected != null) {
                                        vm.data2.push(item2.id)
                                    }
                                    if (item2.children != undefined) {
                                        item2.children.forEach((item3) => {
                                            item3.disabled = true
                                            if (item3.state.selected != null) {
                                                vm.data2.push(item3.id)
                                            }
                                        })
                                    }
                                })
                            }

                        })
                    })
                    console.log(vm.children)
                })
            },
            handleClose(done) {
                done()
            },
            clear() {
                this.role.name = '';
                this.role.status = '';
                this.role.describe = '';
            },
            //列表
            tableData3List(parameter) {
                let vm = this
                let params = {
                    pageSize: 10,
                    pageNum: vm.page
                }
                if (parameter == undefined) {
                    parameter = params
                }
                vm.tableData3 = [];
                vm.loading = true
                API.jurisdictionList(parameter).then((result) => {
                    if (result.code == 200) {
                        vm.loading = false
                        vm.total = parseInt(result.data.total)
                        result.data.list.forEach((item) => {
                            vm.tableData3.push(item)
                            if (item.status == 1) {
                                item.status = '已启用'
                                item.aa = '禁用'
                            } else if (item.status == 0) {
                                item.status = '已禁用'
                                item.aa = '开启'
                            }
                        })
                    }
                })
            },
            //分页
            handleCurrentChange(val) {
                this.page = val
                this.loading = true
                this.tableData3List()
            },
            //批量操作（选中）
            changeFun(val) {
                this.tableDataId = []
                val.forEach((item) => {
                    this.tableDataId.push(item.id)
                    item.id
                })
            },
            //批量操作（删除）
            rolesDelete() {
                let vm = this
                let params = this.tableDataId
                if (params.length > 0) {
                    axios.delete('/api/api/v1/admin/sys/role', {
                            data: this.tableDataId,
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        })
                        .then(function(response) {
                            if (response.data.code == 200) {
                                vm.tableData3List();
                            }
                        });
                } else {
                    this.$message.error({
                        showClose: true,
                        message: '请选择要删除的权限',
                        duration: 2000
                    });
                }

            },
            search() {

                let params = {
                    pageSize: 10,
                    pageNum: this.page,
                    roleName: this.inquireData.name,
                    status: parseInt(this.inquireData.status)
                }
                this.tableData3List(params)
            },
        },
        mounted() {
            this.tableData3List()
            let user = JSON.parse(window.sessionStorage.getItem('user'));
            this.role.modifier = user.name
        }
    }

</script>
