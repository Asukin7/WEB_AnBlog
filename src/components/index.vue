<template>
  <div>
    <div class="layout-header padding-top padding-bottom">
      <Row class="container" type="flex">
        <Col :xs="{span: 8, order: 1}" :lg="{span: 3, order: 1}">
          <div class="nav-left">
            <div class="nav-item">
              <div class="logo-image">An</div>
              <div class="logo-text">Blog</div>
            </div>
          </div>
        </Col>
        <Col :xs="{span: 8, order: 3}" :lg="{span: 9, order: 2}">
          <div class="nav-left">
            <div class="nav-item" :class="navAction=='首页'?'link-pink-action':'link-pink'" @click="goPath('/')">
              首页
            </div>
            <div class="nav-item" :class="navAction=='标签'?'link-pink-action':'link-pink'" @click="goPath('/indexTags')">
              标签
            </div>
          </div>
        </Col>
        <Col :xs="{span: 16, order: 4}" :lg="{span: 9, order: 3}">
          <div class="nav-right">
            <div class="nav-item">
              <Input class="input-pink" placeholder="搜索文章" search>
                <Icon type="ios-search" slot="suffix"/>
              </Input>
            </div>
          </div>
        </Col>
        <Col :xs="{span: 16, order: 2}" :lg="{span: 3, order: 4}">
          <div class="nav-right">
            <div class="nav-item">
              <div class="btn-pink" @click="goPath('login')">
                登录
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div class="layout-content padding-top padding-bottom">
      <template>
        <router-view></router-view>
      </template>
    </div>
    <div class="layout-footer margin-top" style="padding: 20px; display: flex; justify-content: center; align-items: center;">
      <div><a class="link-pink" href="http://beian.miit.gov.cn">粤ICP备20011882号</a></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      navAction: this.$route.name
    }
  },
  methods: {
    goPath (path) {
      this.$router.push({path: path})
      this.navAction = this.$route.name
    }
  }
}
</script>
<style>
@media (max-width: 1200px) {
  .container {
    width: 100%;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1200px;
    margin: 0 auto;
  }
}
.logo-image {
  width: 40px;
  height: 40px;
  font-size: 20px;
  background: #eea2a4;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.logo-text {
  width: 50px;
  height: 40px;
  font-size: 20px;
  background: #fff;
  color: #eea2a4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.layout-header {
  background: #fff;
  box-shadow: 0px 2px 10px #cccccc;
  top: 0px;
  position: sticky;
  z-index: 200;
}
.layout-content {
  background: #f2f2f2;
}
.layout-footer {
  background: #fff;
  box-shadow: 0px 2px 10px #cccccc;
}
.nav-left {
  height: 40px;
  margin: auto 10px;
  display: flex;
  justify-content: flex-start;
}
.nav-right {
  height: 40px;
  margin: auto 10px;
  display: flex;
  justify-content: flex-end;
}
.nav-item {
  margin: auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list {
  border-radius: 0px;
  background: #fff;
}
.list-item:hover {
  background: #fff6f6;
  cursor: pointer;
}
.list-item-action {
  background: #eea2a4;
  color: #fff;
}
.link-pink {
  width: 40px;
  height: 40px;
  color: #eea2a4;
}
.link-pink:hover {
  color: #f1c4cd;
  cursor: pointer;
}
.link-pink-action {
  width: 40px;
  height: 40px;
  color: #eea2a4;
  padding-top: 4px;
  border-bottom: 4px solid #eea2a4;
}
.btn-pink {
  height: 32px;
  padding: 16px;
  background: #eea2a4;
  color: #fff;
  border: 1px solid #eea2a4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transition: 0.25s;
}
.btn-pink:hover {
  color: #fff;
  background: #f1c4cd;
  border: 1px solid #f1c4cd;
  cursor: pointer;
}
.btn-pink-ghost {
  height: 32px;
  padding: 16px;
  background: none;
  color: #eea2a4;
  border: 1px solid #eea2a4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transition: 0.25s;
}
.btn-pink-ghost:hover {
  color: #fff;
  background: #eea2a4;
  border: 1px solid #eea2a4;
  cursor: pointer;
}
.input-pink input {
  border: none !important;
  box-shadow: none !important;
}
.input-pink input:enabled {
  border: 1px solid #dcdee2 !important;
  box-shadow: none !important;
}
.input-pink input:hover {
  border: 1px solid #eea2a4 !important;
  box-shadow: none !important;
}
.input-pink input:focus {
  border: 1px solid #eea2a4 !important;
  box-shadow: none !important;
}
.loadMore {
  padding: 10px;
  font-size: 120%;
  background: #fff;
  color: #eea2a4;
  border: 1px solid #dcdee2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loadMore:hover {
  background: #fff6f6;
  color: #eea2a4;
  cursor: pointer;
}
.padding-top {
  padding-top: 10px;
}
.padding-bottom {
  padding-bottom: 10px;
}
.padding-left {
  padding-left: 10px;
}
.padding-right {
  padding-right: 10px;
}
.margin-top {
  margin-top: 10px;
}
.margin-bottom {
  margin-bottom: 10px;
}
.margin-left {
  margin-left: 10px;
}
.margin-right {
  margin-right: 10px;
}
.border-bottom {
  border-bottom: 1px solid #dcdee2 !important;
}
</style>
