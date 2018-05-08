<template>
<div class="modificationHomeBar">
    <div v-loading="loading2">
        <div class="img-name">
            <el-form label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="sort">
                    <el-input v-model="formLabelAlign.sort"></el-input>
                </el-form-item>
                <el-form-item class="ml" label="编辑内容：" prop="desc">
                    <el-input type="textarea" :rows="5" v-model="formLabelAlign.desc"></el-input>
                </el-form-item>
                <el-form-item class="ml" label="图片：" prop="url">
                    <div class="img-file">
                        <el-upload action="/api/api/v1/admin/banner/firstPageBannerImages" :headers='headers' list-type="picture" :on-error="handleError" :on-remove="handleRemove" :limit="1" :on-success="handleSuccess" :file-list="fileList">
                            <el-button size="small" type="primary">选择文件</el-button>
                        </el-upload>
                        <el-input class="hidden" v-model="formLabelAlign.url"></el-input>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="btns">
            <el-button type="success" @click="onBtnPreserveClick('formLabelAlign')">保存</el-button>
            <el-button type="danger" @click="onBtnDetailClick()">取消</el-button>
        </div>
    </div>
</div>
</template>
<script>
    import API from '@/api/api'
    export default {
        data() {
            return {
                formLabelAlign: {
                    name: '',
                    sort: '',
                    url: ''
                },
                dialogImageUrl: '',
                dialogVisible: false,
                authorization: '',
                fileList: [{
                    url: ''
                }],
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
                    url: [{
                        required: true,
                        message: '请上传图片',
                        trigger: 'change'
                    }]
                },
                loading2: true
            }
        },
        created() {
            let vm = this
            API.reportInfo(this.$route.path.split('/')[4]).then(function(result) {
                vm.loading2 = false
                if (result.code == 200) {
                    vm.formLabelAlign.name = result.data.content
                    vm.formLabelAlign.desc = result.data.state
                    vm.dialogImageUrl = result.data.imageUrl
                    vm.formLabelAlign.sort = result.data.sort
                    vm.fileList[0].url = result.data.imageUrl
                    vm.formLabelAlign.url = result.data.imageUrl
                } else {
                    vm.$message.error({
                        message: '数据加载失败',
                        showClose: true,
                        duration: 2000
                    });
                }
            }, function error() {
                vm.$message.error({
                    message: '数据加载失败',
                    showClose: true,
                    duration: 2000
                });
            })
            let data = JSON.parse(window.sessionStorage.getItem('access-user'));
            this.authorization = data.authorization;
        },
        methods: {
            handleRemove(file, fileList) {
                this.formLabelAlign.url = ''
                this.dialogImageUrl = ''
            },
            handleSuccess(res) {
                this.dialogImageUrl = res.data
            },
            handleError() {
                this.$message.error({
                    showClose: true,
                    message: '上传失败',
                    duration: 2000
                });
            },
            onBtnPreserveClick(formLabelAlign) {
                this.$refs[formLabelAlign].validate((valid) => {
                    if (valid) {
                        let vm = this
                        let parameter = 'id=' + this.$route.path.split('/')[4] + '&content=' + this.formLabelAlign.name + '&imageUrl=' + this.dialogImageUrl + '&state=' + this.formLabelAlign.desc + '&sort=' + this.formLabelAlign.sort
                        API.modiReport(parameter).then(function(result) {
                            if (result.code == 200) {
                                vm.$message.success({
                                    message: '修改成功',
                                    showClose: true,
                                    duration: 2000
                                });
                                vm.$router.push({
                                    path: `/showHomeManagement/about`
                                });
                            }
                        }, function error() {
                            vm.$message.error({
                                message: '修改失败',
                                showClose: true,
                                duration: 2000
                            });
                        })
                    } else {
                        return false;
                    }
                });

            },
            onBtnDetailClick() {
                this.$router.push({
                    path: `/showHomeManagement/about`
                });
            }
        },
        computed: {
            headers() {
                return {
                    authorization: this.authorization
                }
            }
        }
    }

</script>
<style lang="scss">
    .modificationHomeBar {
        .grid-content {
            color: #556191;
        }
        .img-name {
            margin-top: 50px;
            .el-form-item__label {
                margin-top: 12px;
            }
            .el-form-item:nth-child(3) .el-form-item__label {
                margin-top: 0;
            }
            .el-input {
                width: 350px;
                .el-input__inner {
                    border-top: none;
                    border-left: none;
                    border-right: none;
                    border-radius: 0;
                }
            }
            .el-textarea {
                width: 350px;
                .el-textarea__inner {
                    width: 98%;
                }
            }
            .ml {
                .hidden {
                    display: none;
                }
                .el-form-item__error {
                    margin-left: 8px;
                }
            }

        }
        .img-file {
            .el-upload-list li {
                border: none;
                height: auto;
                img {
                    width: auto;
                    height: auto;
                    max-width: 67%;
                }
                .el-upload-list__item-name {
                    display: none;
                }
            }
        }
        .btns {
            margin-top: 150px;
            margin-left: 25px;
            .el-button+.el-button {
                margin-left: 200px;
            }
        }
    }

</style>
