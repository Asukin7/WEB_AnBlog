<template>
  <div>
    <div style="margin: 10px auto;">
      标题 <Input v-model="blog.title" placeholder="请输入" maxlength="64" show-word-limit style="width: 90%;"/>
    </div>
    <div style="margin: 10px auto;">
      摘要 <Input v-model="blog.summary" placeholder="请输入" maxlength="128" show-word-limit style="width: 90%;"/>
    </div>
    <div style="margin: 10px auto;">
      分类 <Select v-model="blog.categoryId" style="width: 90%;">
        <Option v-for="(item, index) in categoryList" :key="index" :value="item.id">{{item.name}}</Option>
      </Select>
    </div>
    <div style="margin: 10px auto;">
      标签 <Input v-model="inputTags" @on-enter="inputTagsEnter" placeholder="回车添加" maxlength="16" show-word-limit style="width: auto;"/>
      <Tag v-for="(item, index) in blog.tagsList" :key="index" closable @on-close="deleteTags(index)" type="border" size="large">{{item.name}}</Tag>
    </div>
    <div id="editor" style="margin: 10px auto; background: #fff;">
    </div>
    <Button @click="saveBlog(0)" v-if="blog.state!=1" style="margin: 10px auto;">保存草稿</Button>
    <Button @click="saveBlog(1)" style="margin: 10px auto;">发表文章</Button>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  data () {
    return {
      editor: null,
      categoryList: [],
      inputTags: null,
      blog: {
        id: null,
        categoryId: null,
        state: null,
        title: null,
        htmlContent: null,
        summary: null,
        tagsList: []
      }
    }
  },
  mounted () {
    this.setEditor()
    this.getCategoryList()
    if (this.$route.params.id != null) {
      this.getBlog()
    }
  },
  watch: {
    '$route' (to, from) {
      // 数据初始化
      this.editor.txt.html('')
      this.categoryList = []
      this.inputTags = null
      this.blog = {
        id: null,
        categoryId: null,
        state: null,
        title: null,
        htmlContent: null,
        summary: null,
        tagsList: []
      }
      this.getCategoryList()
      if (this.$route.params.id != null) {
        this.getBlog()
      }
    }
  },
  methods: {
    setEditor () {
      this.editor = new E('#editor')
      this.editor.customConfig.zIndex = 0 // 配置编辑区域的 z-index
      this.editor.customConfig.uploadImgServer = '/upload' // 上传图片到服务器 配置服务器端地址
      this.editor.customConfig.uploadImgMaxLength = 5 // 限制一次最多上传 5 张图片
      this.editor.create()
    },
    getCategoryList () {
      this.$get('/tourist/categoryList')
        .then(data => {
          this.categoryList = data.data.data.categoryList
        })
    },
    getBlog () {
      this.$get('/user/blog/' + this.$route.params.id)
        .then(data => {
          this.blog = data.data.data.blog
          this.editor.txt.html(this.blog.htmlContent !== null ? this.blog.htmlContent : '')
        })
    },
    inputTagsEnter () {
      this.blog.tagsList.push({
        id: null,
        name: this.inputTags
      })
      this.inputTags = null
    },
    deleteTags (index) {
      this.blog.tagsList.splice(index, 1)
    },
    saveBlog (state) {
      var saveState = this.blog.state // 保存状态
      this.blog.state = state
      this.blog.htmlContent = this.editor.txt.html()
      if (this.blog.id == null) { // insert
        this.$post('/user/blog', this.blog)
          .then(data => {
            if (data.data.code === 0) { // 成功
              this.$Message.success(data.data.message) // 提示
              this.$router.push('/home/blog/edit/html/' + data.data.data.blogId) // 跳转页面
            } else { // 失败
              this.$Message.error(data.data.message) // 提示
              this.blog.state = saveState // 恢复状态
            }
          })
      } else { // update
        this.$put('/user/blog', this.blog)
          .then(data => {
            if (data.data.code === 0) { // 成功
              this.$Message.success(data.data.message) // 提示
            } else { // 失败
              this.$Message.error(data.data.message) // 提示
              this.blog.state = saveState // 恢复状态
            }
          })
      }
    }
  }
}
</script>
<style>
</style>
