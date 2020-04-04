<template>
  <Row class="container">
    <Col :xs="24" :lg="4">
      <List class="list margin-top margin-left margin-right" border>
          <div :class="categoryActionId==null?'list-item-action':'list-item'" @click="categoryChange(null)">
            <ListItem>
              推荐
            </ListItem>
          </div>
          <div :class="categoryActionId==item.id?'list-item-action':'list-item'" v-for="item in categoryList" :key="item.id" @click="categoryChange(item.id)">
            <ListItem>
              {{item.name}}
            </ListItem>
          </div>
      </List>
    </Col>
    <Col :xs="24" :lg="16">
      <List class="list margin-top margin-left margin-right" item-layout="vertical" border>
        <div class="list-item border-bottom" v-for="item in blogList" :key="item.title" @click="goBlogView(item.id)">
          <ListItem>
            <ListItemMeta :title="item.title" :description="item.summary"/>
            <div class="list-item-footer">
              <div style="display: flex;">
                <div>nickname</div>
              </div>
              <div style="display: flex;">
                <div class="margin-right"><Icon type="ios-eye-outline"/> 666</div>
                <div class="margin-left margin-right"><Icon type="ios-thumbs-up-outline"/> 222</div>
                <div class="margin-left"><Icon type="ios-chatbubbles-outline"/> 111</div>
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
    <Col :xs="24" :lg="4">
      <List class="list margin-top margin-left margin-right" header="友情链接" border>
        <div class="list-item" v-for="item in linkList" :key="item">
          <ListItem>{{item}}</ListItem>
        </div>
      </List>
    </Col>
  </Row>
</template>
<script>
export default {
  data () {
    return {
      categoryList: [],
      categoryActionId: null,
      blogList: [],
      blogTotal: 0,
      page: 1,
      size: 10,
      linkList: ['链接1', '链接2', '链接3', '链接4', '链接5', '链接6']
    }
  },
  mounted () {
    this.getCategoryList()
    this.getBlogList()
  },
  methods: {
    getCategoryList () {
      this.$get('/tourist/categoryList')
        .then(data => {
          this.categoryList = data.data.data.categoryList
        })
    },
    getBlogList () {
      var categoryQuery = ''
      if (this.categoryActionId != null) {
        categoryQuery = '?categoryId=' + this.categoryActionId
      }
      this.$get('/tourist/blogList' + categoryQuery)
        .then(data => {
          this.blogList = data.data.data.blogList
          this.blogTotal = data.data.data.blogTotal
        })
    },
    getMoreBlogList () {
      var categoryQuery = ''
      if (this.categoryActionId != null) {
        categoryQuery = '&categoryId=' + this.categoryActionId
      }
      this.page++
      this.$get('/tourist/blogList' + '?page=' + this.page + '&size=' + this.size + categoryQuery)
        .then(data => {
          this.blogList = this.blogList.concat(data.data.data.blogList)
          this.blogTotal = data.data.data.blogTotal
        })
    },
    categoryChange (id) {
      this.categoryActionId = id
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
