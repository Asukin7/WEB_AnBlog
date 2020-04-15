<template>
  <Row class="container">
    <Col :xs="24" :lg="20">
      <List class="list margin-top margin-left margin-right" item-layout="vertical" border>
        <div class="padding-top padding-bottom list-item-border">
          <ListItem>
            <div class="text-title margin-bottom">
              {{blog.title}}
            </div>
            <div v-if="displayBlogInfo">
              <div class="text-summary margin-bottom">
                {{blog.summary}}
              </div>
              <div class="flex-start text-info margin-bottom">
                分类：<div class="margin-right">{{blog.category==null?'':blog.category.name}}</div>
              </div>
              <div class="flex-start text-info margin-bottom">
                标签：<div class="margin-right" v-for="item in blog.tagsList" :key="item.id">{{item.name}}</div>
              </div>
            </div>
            <div class="flex-between">
              <div class="flex-center">
                <Avatar class="margin-right" :src="blog.user==null?'':blog.user.profilePhoto" icon="ios-person" size="small"/>
                <div class="margin-right">{{blog.user==null?'':blog.user.nickname}}</div>
                <div class="margin-right">{{blog.publishDate}}</div>
                <div class="margin-right"><Icon type="ios-eye-outline"/> {{blog.viewNumber==null?'0':blog.viewNumber}}</div>
              </div>
              <div class="flex-center" style="cursor: pointer;" @click="changeDisplayBlogInfo">
                {{displayBlogInfo?'收起':'展开'}}
              </div>
            </div>
          </ListItem>
        </div>
        <div class="padding-top padding-bottom list-item-border">
          <ListItem>
            <div v-html="blog.htmlContent"></div>
            <div class="flex-center" style="margin-top: 20px;">
              <div class="flex-start" :class="blog.likeAction==1?'btn-pink':'btn-pink-ghost'" style="flex-direction: column; width: 50px; height: 50px; padding: 0px;" @click="changeBlogLike">
                <div class="flex-center" style="font-size: 20px">
                  <Icon type="ios-thumbs-up-outline"/>
                </div>
                <div class="flex-center">
                  {{blog.likeNumber}}
                </div>
              </div>
            </div>
          </ListItem>
        </div>
        <div class="padding-top padding-bottom list-item-border">
          <ListItem>
            <Row>
              <Col :xs="24" :lg="22">
                <div class="flex-start">
                  <div class="flex-center margin-right">
                    <Avatar :src="blog.user==null?'':blog.user.profilePhoto" icon="ios-person" size="large"/>
                  </div>
                  <div class="flex-center margin-left">
                    <div>
                      <div><strong>{{blog.user==null?'':blog.user.nickname}}</strong></div>
                      <div>{{blog.user==null?'':blog.user.introduction}}</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col :xs="24" :lg="2">
                <div class="flex-center">
                  <Poptip>
                    <div class="flex-center">
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
        <div class="padding-top padding-bottom list-item-border">
          <ListItem>
            <div class="text-title" style="margin-bottom: 20px;">
              评论 ({{blog.commentNumber}})
            </div>
            <div v-for="(rootComment,rootCommentIndex) in commentList" :key="rootComment.id">
              <div class="flex-between">
                <div class="flex-center">
                  <Avatar class="margin-right" :src="rootComment.user.profilePhoto" icon="ios-person" size="small"/>
                  <div class="margin-right"><strong>{{rootComment.user.nickname}}</strong></div>
                  <div class="margin-right">{{rootComment.publishDate}}</div>
                </div>
                <div class="flex-center" style="cursor: pointer;" v-if="displayCommentDelete(rootComment.userId)" @click="deleteComment(rootComment.id, rootCommentIndex, null)">
                  <Icon type="ios-trash-outline"/>
                </div>
              </div>
              <div style="margin: 5px 0px 5px 35px;">{{rootComment.content}}</div>
              <div class="flex-start" style="margin-left: 35px;">
                <div class="margin-right" style="cursor: pointer;" :style="rootComment.likeAction==1?'color: #eea2a4;':''" @click="changeCommentLike(rootComment.likeAction, rootCommentIndex, null)">
                  <Icon type="ios-thumbs-up-outline"/> {{rootComment.likeTotal}}
                </div>
                <div class="margin-left" style="cursor: pointer;" @click="changeComment(rootComment.id, rootComment.user, rootCommentIndex, false)">
                  <Icon type="ios-chatbubbles-outline"/> 回复
                </div>
              </div>
              <div style="margin-top: 10px; margin-left: 35px; border-left: 5px solid #dcdee2;">
                <div style="padding: 10px 0px 10px 10px;" v-for="(childComment,childCommentIndex) in rootComment.commentList" :key="childComment.id">
                  <div class="flex-between">
                    <div class="flex-center">
                      <Avatar class="margin-right" :src="childComment.user.profilePhoto" icon="ios-person" size="small"/>
                      <div class="margin-right"><strong>{{childComment.user.nickname}}</strong></div>
                      <div class="margin-right">{{childComment.publishDate}}</div>
                    </div>
                    <div class="flex-center" style="cursor: pointer;" v-if="displayCommentDelete(rootComment.userId)||displayCommentDelete(childComment.userId)" @click="deleteComment(childComment.id, rootCommentIndex, childCommentIndex)">
                      <Icon type="ios-trash-outline"/>
                    </div>
                  </div>
                  <div style="margin: 5px 0px 5px 35px;">{{childComment.dialog==null?'':'回复 @' + childComment.dialog.nickname + ' : '}}{{childComment.content}}</div>
                  <div class="flex-start" style="margin-left: 35px;">
                    <div class="margin-right" style="cursor: pointer;" :style="childComment.likeAction==1?'color: #eea2a4;':''" @click="changeCommentLike(childComment.likeAction, rootCommentIndex, childCommentIndex)">
                      <Icon type="ios-thumbs-up-outline"/> {{childComment.likeTotal}}
                    </div>
                    <div class="margin-left" style="cursor: pointer;" @click="changeComment(childComment.rootId, childComment.user, rootCommentIndex, true)">
                      <Icon type="ios-chatbubbles-outline"/> 回复
                    </div>
                  </div>
                </div>
                <div class="flex-end">
                  <Page v-if="rootComment.commentTotal>10" @on-change="changeChildCommentPage(rootCommentIndex, $event)" :total="rootComment.commentTotal" size="small" show-total/>
                </div>
              </div>
              <Divider/>
            </div>
            <div>
              <div class="flex-end">
                <Page v-if="commentTotal>10" @on-change="changeRootCommentPage" :total="commentTotal"/>
              </div>
              <div class="margin-top">
                <Input ref="commentInput" v-model="comment.content" :placeholder="commentTips" :autosize="{minRows: 3}" maxlength="600" type="textarea" show-word-limit/>
              </div>
              <div class="flex-end margin-top">
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
      user: null,
      blog: {
        id: null,
        userId: null,
        categoryId: null,
        state: null,
        title: null,
        htmlContent: null,
        summary: null,
        viewNumber: null,
        commentNumber: null,
        likeNumber: null,
        tagsList: [],
        user: null,
        category: null,
        likeAction: null
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
    this.getUserInfo()
    this.getBlog()
    this.getRootCommentList(1)
  },
  methods: {
    getUserInfo () {
      // 获取token
      var token = localStorage.getItem('token')
      // token 存在且不为空则已登录
      if (token !== null && token !== '') { // 已登录
        this.$get('/user/info')
          .then(data => {
            if (data.data.code === 0) { // 成功
              this.user = data.data.data.user
            } else { // 失败
              this.$Message.error(data.data.message) // 提示
            }
          })
      }
    },
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
          if (data.data.code === 0) { // 成功
            this.blog = data.data.data.blog
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    insertBlogLike () {
      this.$post('user/blogLike', { blogId: this.$route.params.id })
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.blog.likeNumber++
            this.blog.likeAction = 1
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    deleteBlogLike () {
      this.$delete('user/blogLike/' + this.$route.params.id)
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.blog.likeNumber--
            this.blog.likeAction = 0
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    getRootCommentList (page) {
      var url = null
      // 获取token
      var token = localStorage.getItem('token')
      // token 存在且不为空则已登录 不存在或为空则未登录
      if (token !== null && token !== '') { // 已登录
        url = '/user'
      } else { // 未登录
        url = '/tourist'
      }
      this.$get(url + '/rootCommentList/' + this.$route.params.id + '?page=' + page)
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.commentList = data.data.data.commentList
            this.commentTotal = data.data.data.commentTotal
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    getChildCommentList (index, page) {
      var url = null
      // 获取token
      var token = localStorage.getItem('token')
      // token 存在且不为空则已登录 不存在或为空则未登录
      if (token !== null && token !== '') { // 已登录
        url = '/user'
      } else { // 未登录
        url = '/tourist'
      }
      this.$get(url + '/childCommentList/' + this.commentList[index].id + '?page=' + page)
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.commentList[index].commentList = data.data.data.commentList
            this.commentList[index].commentTotal = data.data.data.commentTotal
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
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
            if (this.commentIndex === null) { // 回复博主
              this.commentList.push(data.data.data.comment) // 插入到尾部
            } else { // 回复评论
              this.commentList[this.commentIndex].commentList.push(data.data.data.comment) // 插入到子评论
            }
            this.$Message.success(data.data.message) // 提示
            this.comment.content = null // 清空输入框
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    deleteComment (id, rootCommentIndex, childCommentIndex) {
      this.$delete('/user/comment/' + id)
        .then(data => {
          if (data.data.code === 0) { // 成功
            if (childCommentIndex === null) { // childCommentIndex 存在删除子评论 不存在删除父评论
              this.commentList.splice(rootCommentIndex, 1) // 删除父评论
            } else {
              this.commentList[rootCommentIndex].commentList.splice(childCommentIndex, 1) // 删除子评论
            }
            this.$Message.success(data.data.message) // 提示
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    insertCommentLike (rootCommentIndex, childCommentIndex) {
      var commentId = null
      var rootId = null
      if (childCommentIndex === null) { // childCommentIndex 存在为子评论 不存在为父评论
        commentId = this.commentList[rootCommentIndex].id
        rootId = this.commentList[rootCommentIndex].rootId
      } else {
        commentId = this.commentList[rootCommentIndex].commentList[childCommentIndex].id
        rootId = this.commentList[rootCommentIndex].commentList[childCommentIndex].rootId
      }
      this.$post('user/commentLike', { blogId: this.$route.params.id, commentId: commentId, rootId: rootId })
        .then(data => {
          if (data.data.code === 0) { // 成功
            if (childCommentIndex === null) { // childCommentIndex 存在为子评论 不存在为父评论
              this.commentList[rootCommentIndex].likeTotal++
              this.commentList[rootCommentIndex].likeAction = 1
            } else {
              this.commentList[rootCommentIndex].commentList[childCommentIndex].likeTotal++
              this.commentList[rootCommentIndex].commentList[childCommentIndex].likeAction = 1
            }
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    deleteCommentLike (rootCommentIndex, childCommentIndex) {
      var commentId = null
      if (childCommentIndex === null) { // childCommentIndex 存在为子评论 不存在为父评论
        commentId = this.commentList[rootCommentIndex].id
      } else {
        commentId = this.commentList[rootCommentIndex].commentList[childCommentIndex].id
      }
      this.$delete('user/commentLike/' + commentId)
        .then(data => {
          if (data.data.code === 0) { // 成功
            if (childCommentIndex === null) { // childCommentIndex 存在为子评论 不存在为父评论
              this.commentList[rootCommentIndex].likeTotal--
              this.commentList[rootCommentIndex].likeAction = 0
            } else {
              this.commentList[rootCommentIndex].commentList[childCommentIndex].likeTotal--
              this.commentList[rootCommentIndex].commentList[childCommentIndex].likeAction = 0
            }
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    changeDisplayBlogInfo () {
      this.displayBlogInfo = !this.displayBlogInfo
    },
    changeBlogLike () {
      var token = localStorage.getItem('token')
      // token 存在且不为空则已登录 不存在或为空则未登录
      if (token === null || token === '') { // 未登录
        this.$Message.warning('请登录后操作')
      } else { // 已登录
        if (this.blog.likeAction === 1) {
          this.deleteBlogLike()
        } else {
          this.insertBlogLike()
        }
      }
    },
    changeComment (rootId, dialog, index, flag) {
      var token = localStorage.getItem('token')
      // token 存在且不为空则已登录 不存在或为空则未登录
      if (token === null || token === '') { // 未登录
        this.$Message.warning('请登录后操作')
      } else { // 已登录
        this.commentTips = '回复 @' + dialog.nickname + ' : '
        this.commentIndex = index // 用于定位回复插入位置
        this.comment.rootId = rootId
        if (flag) { // flag 为true回复子评论 为false回复父评论
          this.comment.dialogId = dialog.id // 回复子评论
        } else {
          this.comment.dialogId = 0 // 回复父评论
        }
        this.$refs.commentInput.focus() // 聚焦定位
      }
    },
    changeRootCommentPage (page) {
      this.getRootCommentList(page)
    },
    changeChildCommentPage (index, page) {
      this.getChildCommentList(index, page)
    },
    displayCommentDelete (userId) {
      if (this.user === null) return false
      // 是否是评论主
      if (this.user.id === userId) return true
      // 是否是博主
      if (this.user.id === this.blog.userId) return true
      return false
    },
    changeCommentLike (likeAction, rootCommentIndex, childCommentIndex) {
      var token = localStorage.getItem('token')
      // token 存在且不为空则已登录 不存在或为空则未登录
      if (token === null || token === '') { // 未登录
        this.$Message.warning('请登录后操作')
      } else { // 已登录
        if (likeAction === 1) {
          this.deleteCommentLike(rootCommentIndex, childCommentIndex)
        } else {
          this.insertCommentLike(rootCommentIndex, childCommentIndex)
        }
      }
    }
  }
}
</script>
<style>
</style>
