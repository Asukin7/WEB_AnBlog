<template>
  <Row class="container">
    <Col :xs="24" :lg="20">
      <List class="list margin-top margin-left margin-right" item-layout="vertical" border>
        <div class="border-bottom">
          <ListItem>
            <ListItemMeta :title="blog.title" :description="blog.summary"/>
            <div v-html="blog.htmlContent"></div>
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
        tagsList: []
      }
    }
  },
  mounted () {
    this.getBlog()
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
          this.editor.txt.html(this.blog.htmlContent !== null ? this.blog.htmlContent : '')
        })
    }
  }
}
</script>
<style>
</style>
