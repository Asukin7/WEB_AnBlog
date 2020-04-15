<template>
  <div>
    <div>
      <Table :columns="tableHeader" :data="blogList">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <div v-if="$route.name=='homeBlogListState2'">
            <Button @click="goBlogView(row.id)" type="success" size="small" style="margin-right: 5px;">预览</Button>
            <Button @click="changeBlogState(index, 0)" type="primary" size="small" style="margin-right: 5px;">恢复到草稿箱</Button>
            <Button @click="deleteBlog(row.id)" type="error" size="small" style="margin-right: 5px;">彻底删除</Button>
          </div>
          <div v-else>
            <Button @click="goBlogView(row.id)" type="success" size="small" style="margin-right: 5px;">预览</Button>
            <Button @click="goBlogEdit(row.id)" type="primary" size="small" style="margin-right: 5px;">编辑</Button>
            <Button @click="changeBlogState(index, 2)" type="error" size="small" style="margin-right: 5px;">删除</Button>
          </div>
        </template>
      </Table>
    </div>
    <div style="margin-top: 10px; display: flex; justify-content: flex-end; align-items: center;">
      <Page @on-change="pageChange" :total="blogTotal" :current="page" :page-size="size"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableHeader: [
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '编辑时间',
          key: 'editDate'
        },
        {
          title: ' ',
          slot: 'action',
          align: 'center'
        }
      ],
      blogList: [],
      blogTotal: 0,
      page: 1,
      size: 10
    }
  },
  mounted () {
    this.page = 1
    this.size = 10
    this.getBlogList()
  },
  watch: {
    '$route' (to, from) {
      this.page = 1
      this.size = 10
      this.getBlogList()
    }
  },
  methods: {
    getBlogList () {
      var state = null
      switch (this.$route.name) {
        case 'homeBlogListState0': { // 草稿箱
          state = '&state=0'
          break
        }
        case 'homeBlogListState1': { // 已发表
          state = '&state=1'
          break
        }
        case 'homeBlogListState2': { // 回收站
          state = '&state=2'
          break
        }
      }
      this.$get('/user/blogList' + '?page=' + this.page + '&size=' + this.size + state)
        .then(data => {
          this.blogList = data.data.data.blogList
          this.blogTotal = data.data.data.blogTotal
        })
    },
    goBlogView (id) {
      this.$router.push({path: '/indexBlog/' + id})
    },
    goBlogEdit (id) {
      this.$router.push({path: '/home/blog/edit/html/' + id})
    },
    changeBlogState (index, state) {
      var saveState = this.blogList[index].state // 保存状态
      this.blogList[index].state = state // 修改状态
      this.$put('/user/blog', this.blogList[index])
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.$Message.success(data.data.message) // 提示
            this.getBlogList() // 刷新页面
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
            this.blogList[index].state = saveState // 恢复状态
          }
        })
    },
    deleteBlog (id) {
      this.$delete('/user/blog/' + id)
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.$Message.success(data.data.message) // 提示
            this.getBlogList() // 刷新页面
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    pageChange (page) {
      this.page = page
      this.getBlogList()
    }
  }
}
</script>
<style>
</style>
