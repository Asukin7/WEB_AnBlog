<template>
  <Row class="container">
    <Col :xs="24" :lg="24">
      <List class="list margin-top margin-left margin-right" border>
        <ListItem>
          <div style="display: flex; flex-wrap: wrap;">
            <div :class="tagsIdAction==item.id?'btn-pink':'btn-pink-ghost'" style="margin: 5px;" v-for="item in tagsList" :key="item.id" @click="tagsChange(item.id)">
              {{item.name}}
            </div>
          </div>
        </ListItem>
      </List>
    </Col>
    <Col :xs="24" :lg="24">
      <List class="list margin-top margin-left margin-right" item-layout="vertical" border>
        <div class="list-item list-item-border" v-for="item in blogList" :key="item.id" @click="goBlogView(item.id)">
          <ListItem>
            <div class="text-title margin-bottom">
              {{item.title}}
            </div>
            <div class="text-summary twoLineText margin-bottom">
              {{item.summary}}
            </div>
            <div class="flex-between">
              <div class="flex-center">
                <Avatar class="margin-right" :src="item.user.profilePhoto" icon="ios-person" size="small"/>
                <div>{{item.user.nickname}}</div>
              </div>
              <div class="flex-center">
                <div class="margin-right"><Icon type="ios-eye-outline"/> {{item.viewNumber==null?'0':item.viewNumber}}</div>
                <div class="margin-left margin-right"><Icon type="ios-thumbs-up-outline"/> {{item.likeNumber==null?'0':item.likeNumber}}</div>
                <div class="margin-left"><Icon type="ios-chatbubbles-outline"/> {{item.commentNumber==null?'0':item.commentNumber}}</div>
              </div>
            </div>
          </ListItem>
        </div>
      </List>
      <div v-if="blogTotal>blogList.length" class="loadMore margin-top margin-left margin-right" @click="getMoreBlogList">
        加载更多
      </div>
      <div v-else class="loadMore margin-top margin-left margin-right">
        已经是最底了
      </div>
    </Col>
  </Row>
</template>
<script>
export default {
  data () {
    return {
      tagsList: [],
      tagsIdAction: null,
      blogList: [],
      blogTotal: 0,
      page: 1,
      size: 10
    }
  },
  mounted () {
    this.getBlogList()
    this.getTagsListByRand()
  },
  methods: {
    getTagsListByRand () {
      this.$get('/tourist/tagsList/rand')
        .then(data => {
          this.tagsList = data.data.data.tagsList
        })
    },
    getBlogList () {
      var tagsQuery = ''
      if (this.tagsIdAction != null) {
        tagsQuery = '&tagsId=' + this.tagsIdAction
      }
      this.$get('/tourist/blogList' + '?orderLikeNumber=true' + tagsQuery)
        .then(data => {
          this.blogList = data.data.data.blogList
          this.blogTotal = data.data.data.blogTotal
        })
    },
    getMoreBlogList () {
      var tagsQuery = ''
      if (this.tagsIdAction != null) {
        tagsQuery = '&tagsId=' + this.tagsIdAction
      }
      this.page++
      this.$get('/tourist/blogList' + '?orderLikeNumber=true' + '&page=' + this.page + '&size=' + this.size + tagsQuery)
        .then(data => {
          this.blogList = this.blogList.concat(data.data.data.blogList)
          this.blogTotal = data.data.data.blogTotal
        })
    },
    tagsChange (id) {
      if (this.tagsIdAction === id) {
        this.tagsIdAction = null
      } else {
        this.tagsIdAction = id
      }
      this.page = 1
      this.getBlogList()
    },
    goBlogView (id) {
      this.$router.push({path: '/indexBlog/' + id})
    }
  }
}
</script>
<style>
</style>
