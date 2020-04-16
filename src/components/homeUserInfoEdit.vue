<template>
  <div>
    <Card>
      <div style="padding: 20px">
        <Form ref="user" :model="user" :rules="userRules" label-position="left" :label-width="60">
          <FormItem prop="profilePhoto" class="flex-center">
            <Upload
              action="https://nnsststt.cn/AnBlog/user/image/upload"
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
            <div class="flex-center">头像</div>
          </FormItem>
          <FormItem label="昵称" prop="nickname">
            <Input type="text" maxlength="16" v-model="user.nickname" placeholder="请输入" show-word-limit/>
          </FormItem>
          <FormItem label="简介">
            <Input type="text" maxlength="64" v-model="user.introduction" placeholder="请输入" show-word-limit/>
          </FormItem>
          <FormItem prop="appreciationCode" class="flex-center">
            <Upload
              action="https://nnsststt.cn/AnBlog/user/image/upload"
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
            <div class="flex-center">赞赏码</div>
          </FormItem>
          <FormItem class="flex-center">
            <Button @click="saveUserInfo">保存</Button>
          </FormItem>
        </Form>
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
      },
      userRules: {
        nickname: [
          {
            required: true,
            message: '请填写昵称',
            trigger: 'blur'
          }
        ],
        profilePhoto: [
          {
            required: true,
            message: '请上传头像'
          }
        ],
        appreciationCode: [
          {
            required: true,
            message: '请上传赞赏码'
          }
        ]
      }
    }
  },
  mounted () {
    this.headers = { Authorization: localStorage.getItem('token') }
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
      this.$refs['user'].validate((valid) => {
        if (valid) {
          this.$put('/user/info', this.user)
            .then(data => {
              if (data.data.code === 0) { // 成功
                this.$Message.success(data.data.message) // 提示
              } else { // 失败
                this.$Message.error(data.data.message) // 提示
              }
            })
        } else {
          this.$Message.error('请检查信息填写')
        }
      })
    },
    profilePhotoUploadSuccess (res) {
      this.$put('/user/info', { profilePhoto: res.data.imgUrl })
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.user.profilePhoto = res.data.imgUrl
            this.$Message.success(data.data.message) // 提示
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    appreciationCodeUploadSuccess (res) {
      this.$put('/user/info', { appreciationCode: res.data.imgUrl })
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.user.appreciationCode = res.data.imgUrl
            this.$Message.success(data.data.message) // 提示
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
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
.flex-center {
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
