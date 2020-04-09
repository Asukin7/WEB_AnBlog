<template>
  <div class="layout">
    <Layout style="height: 100%;">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed">
        <Menu @on-select="menuItemOnSelect" :class="menuitemClasses" :active-name="$route.name" theme="dark" width="auto" accordion>
          <MenuItem name="index">
            <Icon type="ios-home" />
            <span>首页</span>
          </MenuItem>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-contact" />
              <span>账号</span>
            </template>
            <MenuItem name="homeUserInfoEdit"><span>资料</span></MenuItem>
            <MenuItem name="1-2"><span>安全</span></MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-mail" />
              <span>通知</span>
            </template>
            <MenuItem name="2-1"><span>未读</span></MenuItem>
            <MenuItem name="2-2"><span>已读</span></MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-paper" />
              <span>博客</span>
            </template>
            <MenuItem name="homeBlogEditHtmlInsert"><span>新建</span></MenuItem>
            <MenuItem name="homeBlogListState0"><span>草稿箱</span></MenuItem>
            <MenuItem name="homeBlogListState1"><span>已发表</span></MenuItem>
            <MenuItem name="homeBlogListState2"><span>回收站</span></MenuItem>
          </Submenu>
          <!-- <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people" />
              <span>用户管理</span>
            </template>
            <MenuItem name="2-1"><span>用户</span></MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-chatboxes" />
              <span>通知管理</span>
            </template>
            <MenuItem name="3-1"><span>通知</span></MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-list" />
              <span>博客管理</span>
            </template>
            <MenuItem name="4-1"><span>博客</span></MenuItem>
            <MenuItem name="4-2"><span>评论</span></MenuItem>
            <MenuItem name="4-3"><span>分类</span></MenuItem>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <Icon type="ios-settings" />
              <span>系统管理</span>
            </template>
            <MenuItem name="5-1"><span>数据监控</span></MenuItem>
            <MenuItem name="5-2"><span>操作记录</span></MenuItem>
          </Submenu> -->
        </Menu>
      </Sider>
      <Layout style="height: 100%;">
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
          <Button @click="logout">注销{{user==null?'':user.nickname}}</Button>
          {{$route.name}}
        </Header>
        <Content :style="{padding: '20px', background: '#f2f2f2'}">
          <template>
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </template>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapsed: false,
      user: null
    }
  },
  mounted () {
    this.$get('/user/info')
      .then(data => {
        if (data.data.code === 0) { // 成功
          this.user = data.data.data.user
        } else { // 失败
          this.$Message.error(data.data.message) // 提示
        }
      })
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    },
    logout () {
      localStorage.removeItem('token') // 注销并删除token
      this.$router.push('/login')
    },
    menuItemOnSelect (MenuItemName) {
      switch (MenuItemName) {
        case 'index': {
          this.$router.push({path: '/'})
          break
        }
        case 'homeUserInfoEdit': {
          this.$router.push({path: '/home/user/info/edit'})
          break
        }
        case 'homeBlogEditHtmlInsert': {
          this.$router.push({path: '/home/blog/edit/html'})
          break
        }
        case 'homeBlogListState0': {
          this.$router.push({path: '/home/blogList/state/0'})
          break
        }
        case 'homeBlogListState1': {
          this.$router.push({path: '/home/blogList/state/1'})
          break
        }
        case 'homeBlogListState2': {
          this.$router.push({path: '/home/blogList/state/2'})
          break
        }
      }
    }
  }
}
</script>
<style>
.layout{
  height: 100vh;
  border: 0px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon{
  transition: all .3s;
}
.rotate-icon{
  transform: rotate(-90deg);
}
.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span{
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
