<template>
<div class="increasedHomeBar">
  <div class="grid-content bg-purple-dark">| 信息共享banner管理</div>
  <div>
    <div class="img-name">
      <el-form label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input v-model="formLabelAlign.sort"></el-input>
        </el-form-item>
        <el-form-item class="ml" label="图片："  prop="url">
         <div class="img-file">
          <el-upload action="/api/api/v1/admin/banner/firstPageBannerImages" :headers='headers' list-type="picture" :on-error="handleError" :on-remove="handleRemove" :limit="1" :on-success="handleSuccess">
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
          <el-input class="hidden" v-model="formLabelAlign.url"></el-input>
    </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="btns">
         <el-button type="success" :loading="loading" @click="onBtnPreserveClick('formLabelAlign')">保存</el-button>
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
                loading: false
            }
        },
        created() {
            let data = JSON.parse(window.sessionStorage.getItem('access-user'));
            this.authorization = data.authorization;
        },
        methods: {
            handleRemove(file, fileList) {
                this.formLabelAlign.url = ''
            },
            handleSuccess(res) {
                console.log(res)
                this.dialogImageUrl = res.data
                this.formLabelAlign.url = res.data
            },
            handleError() {
                this.$message.error({
                    showClose: true,
                    message: '上传失败',
                    duration: 2000
                });
            },
            onBtnDetailClick() {
                this.$router.push({
                    path: `/showHomeManagement/informationBar`
                });
            },
            onBtnPreserveClick(formLabelAlign) {
                this.$refs[formLabelAlign].validate((valid) => {
                    if (valid) {
                        let vm = this
                        vm.loading = true
                        let parameter = 'name=' + this.formLabelAlign.name + '&imageUrl=' + this.dialogImageUrl + '&url=""&sort=' + this.formLabelAlign.sort + '&type=2'
                        API.preserveBanner(parameter).then(function(result) {
                            console.log(result)
                            if (result.data.code == 201) {
                                vm.loading = false
                                vm.$message.success({
                                    message: '新增成功',
                                    showClose: true,
                                    duration: 2000
                                });
                                vm.$router.push({
                                    path: `/showHomeManagement/informationBar`
                                });
                            } else {
                                vm.loading = false
                                vm.$message.error({
                                    message: '新增失败',
                                    showClose: true,
                                    duration: 2000
                                });
                            }
                        }, function error() {
                            vm.loading = false
                            vm.$message.error({
                                message: '新增失败',
                                showClose: true,
                                duration: 2000
                            });
                        })
                    } else {
                        return false;
                    }
                });
                console.log(this.formLabelAlign)

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
    .increasedHomeBar {
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
