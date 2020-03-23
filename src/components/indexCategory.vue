<template>
  <Row class="container">
    <Col :xs="24" :lg="4">
      <List class="list margin-top margin-left margin-right" border>
          <div :class="categoryAction==item?'list-item-action':'list-item'" v-for="item in categoryList" :key="item" @click="categoryChange(item)">
            <ListItem>
              {{item}}
            </ListItem>
          </div>
      </List>
    </Col>
    <Col :xs="24" :lg="16">
      <List class="list margin-top margin-left margin-right" item-layout="vertical" border>
        <div class="list-item border-bottom" v-for="item in blogList" :key="item.title">
          <ListItem>
            <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description"/>
            {{ item.content }}
            <template slot="action">
              <li>
                <Icon type="ios-star-outline"/> 123
              </li>
              <li>
                <Icon type="ios-thumbs-up-outline"/> 234
              </li>
              <li>
                <Icon type="ios-chatbubbles-outline"/> 345
              </li>
            </template>
          </ListItem>
        </div>
      </List>
      <div class="loadMore margin-top margin-left margin-right">
        加载更多
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
      categoryList: ['推荐', '前端', '移动端', '服务端', '数据库', '工具', '其他'],
      categoryAction: '推荐',
      blogList: [
        {
          title: 'This is title 1',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://nnsststt.cn/images/aisakaTaiga.jpg',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 2',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://nnsststt.cn/images/aisakaTaiga.jpg',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 3',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://nnsststt.cn/images/aisakaTaiga.jpg',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 4',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://nnsststt.cn/images/aisakaTaiga.jpg',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 5',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://nnsststt.cn/images/aisakaTaiga.jpg',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 6',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://nnsststt.cn/images/aisakaTaiga.jpg',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 7',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://nnsststt.cn/images/aisakaTaiga.jpg',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 8',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://nnsststt.cn/images/aisakaTaiga.jpg',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 9',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://nnsststt.cn/images/aisakaTaiga.jpg',
          content: 'This is the content, this is the content, this is the content, this is the content.'
        }
      ],
      linkList: ['链接1', '链接2', '链接3', '链接4', '链接5', '链接6']
    }
  },
  methods: {
    categoryChange (category) {
      this.categoryAction = category
    }
  }
}
</script>
<style>
</style>
