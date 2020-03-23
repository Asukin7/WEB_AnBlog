<template>
  <Row class="container">
    <Col :xs="24" :lg="24">
      <List class="list margin-top margin-left margin-right" border>
        <ListItem>
          <div style="display: flex; flex-wrap: wrap;">
            <div :class="tagsAction==item?'btn-pink':'btn-pink-ghost'" style="margin: 5px;" v-for="item in tagsList" :key="item" @click="tagsChange(item)">
              {{item}}
            </div>
          </div>
        </ListItem>
      </List>
    </Col>
    <Col :xs="24" :lg="24">
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
  </Row>
</template>
<script>
export default {
  data () {
    return {
      tagsList: [
        'HTML5', 'CSS', 'JavaScript', 'jQuery', 'Vue', 'Echarts',
        'Android', '微信小程序',
        'Java', 'SSM', 'SpringBoot', 'C', 'C++', 'C#', 'Qt', 'Linux',
        'Mysql', 'Redis',
        'Git',
        '其他'
      ],
      tagsAction: null,
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
      ]
    }
  },
  methods: {
    tagsChange (tags) {
      this.tagsAction = tags
    }
  }
}
</script>
<style>
</style>
