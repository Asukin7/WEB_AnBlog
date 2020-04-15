<template>
  <div>
    <div class="layout-header" style="padding: 10px 0px;">
      <Row class="container" type="flex">
        <Col :xs="{span: 8, order: 1}" :lg="{span: 4, order: 1}">
          <div class="nav-left">
            <div class="nav-item">
              <div class="logo-image">An</div>
              <div class="logo-text">Blog</div>
            </div>
          </div>
        </Col>
        <Col :xs="{span: 8, order: 3}" :lg="{span: 8, order: 2}">
          <div class="nav-left">
            <div class="nav-item" :class="$route.name=='首页'?'link-pink-action':'link-pink'" @click="goPath('/')">
              首页
            </div>
            <div class="nav-item" :class="$route.name=='标签'?'link-pink-action':'link-pink'" @click="goPath('/indexTags')">
              标签
            </div>
          </div>
        </Col>
        <Col :xs="{span: 16, order: 4}" :lg="{span: 8, order: 3}">
          <div class="nav-right">
            <div class="nav-item">
              <Input class="input-pink" maxlength="32" placeholder="搜索文章" search>
                <Icon type="ios-search" slot="suffix"/>
              </Input>
            </div>
          </div>
        </Col>
        <Col :xs="{span: 16, order: 2}" :lg="{span: 4, order: 4}">
          <div class="nav-right">
            <div class="nav-item">
              <div v-if="user==null" class="btn-pink" @click="goPath('/login')">
                登录
              </div>
              <div v-else class="btn-pink-ghost" @click="goPath('/home')">
                {{user.nickname}}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div class="layout-content" style="padding: 10px 0px;">
      <template>
        <router-view></router-view>
      </template>
    </div>
    <div class="layout-footer" style="margin: 10px 0px 0px;">
      <div style="padding: 20px 0px;">
        <div class="flex-center">
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44162202000050" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
            <img src="http://nnsststt.cn/images/beiantubiao.png" style="float:left;"/>
            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">
              粤公网安备44162202000050号
            </p>
          </a>
        </div>
        <div class="flex-center">
          <a target="_blank" href="http://beian.miit.gov.cn" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">
              粤ICP备20011882号
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: null
    }
  },
  mounted () {
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
  methods: {
    goPath (path) {
      this.$router.push({path: path})
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
  }
}

.layout-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0px 2px 10px #cccccc;
  top: 0px;
  position: sticky;
  z-index: 200;
}
.layout-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}
.layout-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0px 2px 10px #cccccc;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav-left {
  height: 40px;
  margin: auto 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nav-right {
  height: 40px;
  margin: auto 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.nav-item {
  margin: auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list {
  background: #fff;
}
.list-item:hover {
  border-radius: 5px;
  background: #fff6f6;
  cursor: pointer;
}
.list-item-action {
  border-radius: 5px;
  background: #eea2a4;
  color: #fff;
}
.list-item-border {
  border-radius: 5px;
  border-bottom: 1px solid #dcdee2 !important;
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

.logo-image {
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 5px;
  background: #eea2a4;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-text {
  width: 50px;
  height: 40px;
  font-size: 20px;
  border-radius: 5px;
  background: #fff;
  color: #eea2a4;
  display: flex;
  justify-content: center;
  align-items: center;
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
  border-radius: 5px;
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

.oneLineText {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.twoLineText {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.text-title {
  font-size: 120%;
  font-weight: bold;
  color: #515151;
}
.text-summary {
  font-size: 100%;
  color: #515a6e;
}
.text-info {
  font-size: 100%;
  color: #8C8787;
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
</style>
