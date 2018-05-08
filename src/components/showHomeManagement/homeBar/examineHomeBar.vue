<template>
<div class="examineHomeBar">
  <div class="grid-content bg-purple-dark">| 首页banner管理</div>
  <div v-loading="loading2">
    <div class="img-name">
      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="*名称：">
          <el-input :disabled="true" v-model="formLabelAlign.name"></el-input>
        </el-form-item>
         <el-form-item label="*排序：">
          <el-input :disabled="true" v-model="formLabelAlign.sort"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="img-file">
      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="*图片：">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-form-item>
      </el-form>
    </div>
    <div class="btns">
          <el-button type="danger" @click="onBtnDetailClick()">返回</el-button>
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
                    sort: ''
                },
                dialogImageUrl: '',
                loading2:true
            }
        },
        created() {
            let vm = this
            let params = {
                id: this.$route.path.split('/')[4]
            }
            API.bannerInfo(params).then(function(result) {
                vm.loading2 = false
                if (result.code == 200) {
                    vm.formLabelAlign.name = result.data.name
                    vm.dialogImageUrl = result.data.imageUrl
                    vm.formLabelAlign.sort = result.data.sort
                } else {
                    vm.$message.error({
                        message: '数据加载失败',
                        showClose: true,
                        duration: 2000
                    });
                }
            }, function error() {
                vm.loading2 = false
                vm.$message.error({
                    message: '数据加载失败',
                    showClose: true,
                    duration: 2000
                });
            })
        },
        methods: {
            onBtnDetailClick() {
                this.$router.push({
                    path: `/showHomeManagement/homeBar`
                });
            }
        }
    }

</script>
<style lang="scss">
    .examineHomeBar {
        .grid-content {
            color: #556191;
        }
        .img-name {
            margin-top: 50px;
            .el-form-item__label {
                margin-top: 12px;
            }
            .el-input {
                width: 350px;
                .el-input__inner {
                    border-top: none;
                    border-left: none;
                    border-right: none;
                    border-radius: 0;
                    background-color: #fff;
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
