<template>
  <div>
    <Form ref="blog" :model="blog" :rules="blogRules" label-position="left" :label-width="60">
      <FormItem label="标题" prop="title">
        <Input type="text" maxlength="64" v-model="blog.title" placeholder="请输入" show-word-limit/>
      </FormItem>
      <FormItem label="摘要" prop="summary">
        <Input type="text" maxlength="128" v-model="blog.summary" placeholder="请输入" show-word-limit/>
      </FormItem>
      <FormItem label="分类" prop="categoryId">
        <Select v-model="blog.categoryId" placeholder="请选择">
          <Option v-for="item in categoryList" :key="item.id" :value="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="标签" prop="tagsList">
        <Input type="text" maxlength="16" v-model="inputTags" placeholder="回车添加（最多保存5个标签）" show-word-limit @on-enter="inputTagsEnter"/>
        <Tag v-for="(item, index) in blog.tagsList" :key="index" closable @on-close="deleteTags(index)" type="border" size="large">{{item.name}}</Tag>
      </FormItem>
    </Form>
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
      },
      blogRules: {
        title: [
          {
            required: true,
            message: '请填写标题',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 10,
            message: '标题长度不能小于10位',
            trigger: 'blur'
          }
        ],
        summary: [
          {
            required: true,
            message: '请填写摘要',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 10,
            message: '摘要长度不能小于10位',
            trigger: 'blur'
          }
        ],
        categoryId: [
          {
            required: true,
            message: '请选择分类'
          }
        ],
        tagsList: [
          {
            type: 'array',
            max: 5,
            message: '最多保存5个标签'
          }
        ]
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
      this.editor.customConfig.uploadImgServer = 'https://nnsststt.cn/AnBlog/user/image/upload' // 上传图片到服务器 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = {
        'Authorization': localStorage.getItem('token')
      }
      this.editor.customConfig.uploadFileName = 'image'
      this.editor.customConfig.uploadImgMaxLength = 1 // 限制一次最多上传 1 张图片
      this.editor.customConfig.uploadImgTimeout = 60000
      this.editor.customConfig.uploadImgHooks = {
        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          // 举例：假如上传图片成功后，服务器端返回的是 {data:'....'} 这种格式，即可这样插入图片：
          insertImg(result.data.imgUrl)
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
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
      if (this.blog.tagsList.length < 5) {
        this.blog.tagsList.push({
          id: null,
          name: this.inputTags
        })
        this.inputTags = null
      }
    },
    deleteTags (index) {
      this.blog.tagsList.splice(index, 1)
    },
    saveBlog (state) {
      this.$refs['blog'].validate((valid) => {
        if (valid) {
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
        } else {
          this.$Message.error('请检查信息填写')
        }
      })
    }
  }
}
</script>
<style>
</style>
