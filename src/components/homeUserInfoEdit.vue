<template>
  <div>
    <Card>
      <div class="CenterAlign" style="margin: 20px auto;">
        <div>
          <Upload
            action="http://localhost:8081/AnBlog/image/upload"
            name="image"
            accept="image/jpeg, image/png"
            :headers="headers"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :show-upload-list="false"
            :on-error="handleError"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSizeError"
            :on-success="profilePhotoUploadSuccess">
            <img class="imageUpdate profilePhotoImg" :src="user.profilePhoto==null?'':user.profilePhoto"/>
          </Upload>
          <div class="CenterAlign" style="margin: 5px auto;">头像</div>
        </div>
      </div>
      <div class="CenterAlign" style="margin: 10px auto;">
        <div style="margin: auto 10px;">昵称</div><Input v-model="user.nickname" placeholder="请输入" maxlength="16" show-word-limit style="width: 90%;"/>
      </div>
      <div class="CenterAlign" style="margin: 10px auto;">
        <div style="margin: auto 10px;">简介</div><Input v-model="user.introduction" placeholder="请输入" maxlength="64" show-word-limit style="width: 90%;"/>
      </div>
      <div class="CenterAlign" style="margin: 20px auto;">
        <div>
          <Upload
            action="http://localhost:8081/AnBlog/image/upload"
            name="image"
            accept="image/jpeg, image/png"
            :headers="headers"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :show-upload-list="false"
            :on-error="handleError"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSizeError"
            :on-success="appreciationCodeUploadSuccess">
            <img class="imageUpdate appreciationCodeImg" :src="user.appreciationCode==null?'':user.appreciationCode"/>
          </Upload>
          <div class="CenterAlign" style="margin: 5px auto;">赞赏码</div>
        </div>
      </div>
      <div class="CenterAlign" style="margin: 10px auto;">
        <Button @click="saveUserInfo">保存</Button>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      headers: null,
      user: {
        nickname: null,
        introduction: null,
        profilePhoto: null,
        appreciationCode: null
      }
    }
  },
  mounted () {
    this.headers = {Authorization: localStorage.getItem('token')}
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.$get('/user/info')
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.user = data.data.data.user
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    saveUserInfo () {
      this.$put('/user/info', this.user)
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.$Message.success(data.data.message) // 提示
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    profilePhotoUploadSuccess (res) {
      this.user.profilePhoto = res.data.imgUrl
      this.$Message.success('文件上传成功')
    },
    appreciationCodeUploadSuccess (res) {
      this.user.appreciationCode = res.data.imgUrl
      this.$Message.success('文件上传成功')
    },
    handleError () {
      this.$Message.error('文件上传失败')
    },
    handleFormatError () {
      this.$Message.error('文件类型不支持')
    },
    handleMaxSizeError () {
      this.$Message.error('文件大小不可超过2M')
    }
  }
}
</script>
<style>
.CenterAlign {
  display: flex;
  justify-content: center;
  align-items: center;
}
.imageUpdate {
  box-shadow: 0px 2px 6px #cccccc;
}
.imageUpdate:hover {
  opacity: 0.6;
  box-shadow: 0px 2px 6px #222222;
  transition: 0.25s;
  cursor: pointer;
}
.profilePhotoImg {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}
.appreciationCodeImg {
  width: 200px;
  height: 200px;
}
</style>
