<template>
  <div class="newsinfo-container">
      <!-- 大标题 -->
      <h3 class="title">{{ newsinfo.title }}</h3>
      <!-- 子标题 -->
      <p class="subttle">
          <span>发表时间:{{newsinfo.add_time}}</span>
          <span>点击：{{newsinfo.click}}次</span>
      </p>
      <hr>
      <!-- 内容区域 -->
      <div class="content" v-html="newsinfo.content"></div>
      <!-- 评论子组件区域 -->
      <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
    //导入 评论子组件
    import comment from '../subcomponents/comment.vue';

    export default{
        data(){
            return{
                id: this.$route.params.id,
                newsinfo:{}
            }
        },
        created(){
            this.getNewsInfo()
        },
        methods:{
            getNewsInfo(){
                this.$http.get('api/getnew/'+this.id)
                .then(result=>{
                    if(result.body.status === 0){
                        this.newsinfo = result.body.message[0];
                    } else {
                        Toast('获取新闻失败！')
                    }
                })
            }
        },
        components:{
            "comment-box":comment
        }
    }
</script>

<style lang="scss" scoped>

</style>
