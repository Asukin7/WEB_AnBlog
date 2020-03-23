<template>
  <div class="layout">
    <Layout>
        <Sider ref="side1" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed">
          <Menu :class="menuitemClasses" active-name="1-1" theme="dark" width="auto" :open-names="['1']" accordion>
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-contact" />
                <span>账号</span>
              </template>
              <MenuItem name="1-1"><span>资料</span></MenuItem>
              <MenuItem name="1-2"><span>安全</span></MenuItem>
            </Submenu>
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-mail" />
                <span>通知</span>
              </template>
              <MenuItem name="1-1"><span>未读</span></MenuItem>
              <MenuItem name="1-2"><span>已读</span></MenuItem>
            </Submenu>
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-paper" />
                <span>博客</span>
              </template>
              <MenuItem name="1-1"><span>新建</span></MenuItem>
              <MenuItem name="1-2"><span>草稿箱</span></MenuItem>
              <MenuItem name="1-3"><span>已发布</span></MenuItem>
            </Submenu>
            <Submenu name="2">
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
            </Submenu>
          </Menu>
        </Sider>
        <Layout>
          <Header :style="{padding: 0}" class="layout-header-bar">
            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
          </Header>
          <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
            Content
          </Content>
        </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapsed: false
    }
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
    }
  }
}
</script>
<style scoped>
.layout{
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
