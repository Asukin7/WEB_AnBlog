<template>
  <Row class="container">
    <Col :xs="24" :lg="20">
      <List class="list margin-top margin-left margin-right" item-layout="vertical" border>
        <div class="padding-top padding-bottom border-bottom">
          <ListItem>
            <div class="text-title margin-bottom">
              {{blog.title}}
            </div>
            <div v-if="displayBlogInfo">
              <div class="text-summary margin-bottom">
                {{blog.summary}}
              </div>
              <div class="text-info margin-bottom" style="display: flex;">
                分类：<div class="margin-right">{{blog.category==null?'':blog.category.name}}</div>
              </div>
              <div class="text-info margin-bottom" style="display: flex;">
                标签：<div class="margin-right" v-for="item in blog.tagsList" :key="item.id">{{item.name}}</div>
              </div>
            </div>
            <div class="infoAndOper">
              <div class="infoAndOper-item">
                <Avatar class="margin-right" :src="blog.user==null?'':blog.user.profilePhoto" icon="ios-person" size="small"/>
                <div class="margin-right">{{blog.user==null?'':blog.user.nickname}}</div>
                <div class="margin-right">{{blog.publishDate}}</div>
                <div class="margin-right"><Icon type="ios-eye-outline"/> {{blog.viewNumber==null?'0':blog.viewNumber}}</div>
              </div>
              <div class="infoAndOper-item" style="cursor: pointer;" @click="changeDisplayBlogInfo">
                {{displayBlogInfo?'收起':'展开'}}
              </div>
            </div>
          </ListItem>
        </div>
        <div class="padding-top padding-bottom border-bottom">
          <ListItem>
            <div v-html="blog.htmlContent"></div>
          </ListItem>
        </div>
        <div class="padding-top padding-bottom border-bottom">
          <ListItem>
            <Row>
              <Col :xs="24" :lg="22">
                <div style="display: flex; justify-content: flex-start;">
                  <div class="margin-right" style="display: flex; justify-content: center; align-items: center;">
                    <Avatar :src="blog.user==null?'':blog.user.profilePhoto" icon="ios-person" size="large"/>
                  </div>
                  <div class="margin-left" style="display: flex; justify-content: center; align-items: center;">
                    <div>
                      <div><strong>{{blog.user==null?'':blog.user.nickname}}</strong></div>
                      <div>{{blog.user==null?'':blog.user.introduction}}</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col :xs="24" :lg="2">
                <div style="display: flex; justify-content: center; align-items: center;">
                  <Poptip>
                    <div style="display: flex; justify-content: center; align-items: center;">
                      <div class="btn-pink">
                        赞赏
                      </div>
                    </div>
                    <div slot="content">
                      <img style="width: 260px; height: 260px;" :src="blog.user==null?'':blog.user.appreciationCode"/>
                    </div>
                  </Poptip>
                </div>
              </Col>
            </Row>
          </ListItem>
        </div>
      </List>
      <List class="list margin-top margin-left margin-right" item-layout="vertical" border>
        <div class="padding-top padding-bottom border-bottom">
          <ListItem>
            <div class="text-title" style="margin-bottom: 20px;">
              评论 ({{blog.commentNumber}})
            </div>
            <div v-for="(rootComment,index) in commentList" :key="rootComment.id">
              <div class="infoAndOper">
                <div class="infoAndOper-item">
                  <Avatar class="margin-right" :src="rootComment.user.profilePhoto" icon="ios-person" size="small"/>
                  <div class="margin-right"><strong>{{rootComment.user.nickname}}</strong></div>
                  <div class="margin-right">{{rootComment.publishDate}}</div>
                </div>
                <div class="infoAndOper-item" style="cursor: pointer;" @click="changeComment(rootComment.user.nickname, rootComment.id, 0, index)">
                  回复
                </div>
              </div>
              <div style="margin-left: 35px;">{{rootComment.content}}</div>
              <div style="margin-top: 10px; margin-left: 35px; border-left: 5px solid #dcdee2;">
                <div style="padding: 10px 0px 10px 10px;" v-for="childComment in rootComment.commentList" :key="childComment.id">
                  <div class="infoAndOper">
                    <div class="infoAndOper-item">
                      <Avatar class="margin-right" :src="childComment.user.profilePhoto" icon="ios-person" size="small"/>
                      <div class="margin-right"><strong>{{childComment.user.nickname}}</strong></div>
                      <div class="margin-right">{{childComment.publishDate}}</div>
                    </div>
                    <div class="infoAndOper-item" style="cursor: pointer;" @click="changeComment(childComment.user.nickname, childComment.rootId, childComment.user.id, index)">
                      回复
                    </div>
                  </div>
                  <div style="margin-left: 35px;">{{childComment.dialog==null?'':'回复 @' + childComment.dialog.nickname + ' : '}}{{childComment.content}}</div>
                </div>
                <div style="display: flex; justify-content: flex-end;">
                  <Page v-if="rootComment.commentTotal>10" @on-change="changeChildCommentPage(index, $event)" :total="rootComment.commentTotal" size="small" show-total/>
                </div>
              </div>
              <Divider/>
            </div>
            <div>
              <div style="display: flex; justify-content: flex-end;">
                <Page v-if="commentTotal>10" @on-change="changeRootCommentPage" :total="commentTotal"/>
              </div>
              <div style="margin-top: 10px;">
                <Input ref="commentInput" v-model="comment.content" :placeholder="commentTips" :autosize="{minRows: 3}" maxlength="600" type="textarea" show-word-limit/>
              </div>
              <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
                <Button @click="insertComment">发表评论</Button>
              </div>
            </div>
          </ListItem>
        </div>
      </List>
    </Col>
    <Col :xs="24" :lg="4">
      <List class="list margin-top margin-left margin-right" header="作者信息" border>
        <div class="list-item">
          <ListItem>信息</ListItem>
        </div>
      </List>
    </Col>
  </Row>
</template>
<script>
export default {
  data () {
    return {
      blog: {
        id: null,
        categoryId: null,
        state: null,
        title: null,
        htmlContent: null,
        summary: null,
        viewNumber: null,
        commentNumber: null,
        tagsList: [],
        category: null,
        user: null
      },
      displayBlogInfo: false,
      comment: {
        blogId: null,
        rootId: null,
        dialogId: null,
        content: null
      },
      commentIndex: null,
      commentList: [],
      commentTotal: 0,
      commentTips: '评论这篇博客'
    }
  },
  mounted () {
    this.getBlog()
    this.getRootCommentList(1)
  },
  methods: {
    getBlog () {
      var url = null
      // 获取token
      var token = localStorage.getItem('token')
      // token 存在且不为空则已登录 不存在或为空则未登录
      if (token !== null && token !== '') { // 已登录
        url = '/user'
      } else { // 未登录
        url = '/tourist'
      }
      this.$get(url + '/blog/' + this.$route.params.id)
        .then(data => {
          this.blog = data.data.data.blog
        })
    },
    getRootCommentList (page) {
      this.$get('/tourist/rootCommentList/' + this.$route.params.id + '?page=' + page)
        .then(data => {
          this.commentList = data.data.data.commentList
          this.commentTotal = data.data.data.commentTotal
        })
    },
    getChildCommentList (index, page) {
      this.$get('/tourist/childCommentList/' + this.commentList[index].id + '?page=' + page)
        .then(data => {
          this.commentList[index].commentList = data.data.data.commentList
          this.commentList[index].commentTotal = data.data.data.commentTotal
        })
    },
    insertComment () {
      var token = localStorage.getItem('token')
      // token 存在且不为空则已登录 不存在或为空则未登录
      if (token === null || token === '') { // 未登录
        this.$Message.warning('请登录后操作')
        return
      }
      var content = this.comment.content
      if (content === null) { // 判断内容是否为空
        this.$Message.error('评论不能为空')
        return
      }
      content = content.replace(/\s*/g, '') // 去空格
      content = content.replace(/[\r\n]/g, '') // 去回车
      if (content.length === 0) { // 判断内容是否为空
        this.$Message.error('评论不能为空')
        return
      }
      this.comment.blogId = this.$route.params.id // 获取blogId
      this.$post('/user/comment', this.comment)
        .then(data => {
          if (data.data.code === 0) { // 成功
            // 刷新
            if (this.commentIndex == null) { // 回复博主
              this.commentList.push(data.data.data.comment) // 插入到尾部
            } else { // 回复评论
              this.commentList[this.commentIndex].commentList.push(data.data.data.comment) // 插入到子评论
            }
            this.$Message.success(data.data.message) // 提示
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    changeDisplayBlogInfo () {
      this.displayBlogInfo = !this.displayBlogInfo
    },
    changeComment (nickname, rootId, dialogId, index) {
      this.commentTips = '回复 @' + nickname + ' : '
      this.comment.rootId = rootId
      this.comment.dialogId = dialogId
      this.commentIndex = index
      this.$refs.commentInput.focus() // 聚焦定位
    },
    changeRootCommentPage (page) {
      this.getRootCommentList(page)
    },
    changeChildCommentPage (index, page) {
      this.getChildCommentList(index, page)
    }
  }
}
</script>
<style>
</style>
