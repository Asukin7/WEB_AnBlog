<template>
  <div style="height:100vh; display: flex; justify-content: center; align-items: flex-start;">
    <Card style="width: 360px; margin-top: 100px;">
      <div style="padding:0px 10px 15px; margin: 5px 0px 0px; border-bottom: 1px solid #dcdee2; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <Icon type="ios-send-outline" style="margin-left: 5px; margin-right: 5px;"/>
          <strong>重置密码</strong>
        </div>
        <a @click="goLogin">
          <Icon type="ios-arrow-back"/>
          返回
        </a>
      </div>
      <div v-if="step==1" style="margin: 24px 10px 10px;">
        <Form ref="user" :model="user" :rules="userRules">
          <FormItem prop="username">
            <Input type="text" maxlength="16" v-model="user.username" placeholder="账号">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="email">
            <Input type="text" maxlength="32" v-model="user.email" placeholder="邮箱">
              <Icon type="ios-mail-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Form>
        <Button style="width: 100%;" type="primary" :loading="loading1" @click="handleSubmit1">下一步</Button>
      </div>
      <div v-if="step==2" style="margin: 24px 10px 10px;">
        <div style="margin: 0px 0px 10px; text-align: center;">
          <p>我们已经向您的邮箱 {{user.email}} 发送了一封验证邮件</p>
          <p>请通过输入邮件中的验证码来完成验证。</p>
        </div>
        <Form ref="verification" :model="verification" :rules="verificationRules">
          <FormItem prop="code">
            <Input type="text" maxlength="6" v-model="verification.code" placeholder="验证码">
              <Icon type="ios-code" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Form>
        <Button style="width: 100%;" type="primary" :loading="loading2" @click="handleSubmit2">重置</Button>
      </div>
      <div v-if="step==3" style="margin: 24px 10px 10px;">
        <div style="margin: 0px 0px 10px; text-align: center;">
          <p>密码已重置为{{verification.code}}，请及时登录修改</p>
          <p>10秒后跳转至登录界面</p>
        </div>
      </div>
      <div style="margin: 20px 0px 4px; color: red; text-align: center;">
        <p>本站的博客系统仅为站主个人学习所用</p>
        <p>因此本站不对用户数据进行保护</p>
        <p>若未能收到验证邮件</p>
        <p>则站主已关闭找回通道</p>
        <p>已注册的用户使用时请自觉遵守中国法律</p>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      step: 1,
      user: {
        enabled: null,
        username: '',
        email: ''
      },
      userRules: {
        username: [
          {
            required: true,
            message: '请填写账号',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '账号长度不能小于6位',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请填写邮箱',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '邮件格式不正确',
            trigger: 'blur'
          }
        ]
      },
      verification: {
        code: ''
      },
      verificationRules: {
        code: [
          {
            required: true,
            message: '请填写验证码',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '验证码长度不能小于6位',
            trigger: 'blur'
          }
        ]
      },
      loading1: false,
      loading2: false
    }
  },
  methods: {
    handleSubmit1 () {
      this.loading1 = true
      this.$refs['user'].validate((valid) => {
        if (valid) {
          this.$post('/tourist/passwordResetStep1', this.user)
            .then(data => {
              if (data.data.code === 0) {
                this.step = 2
              } else {
                this.$Message.error(data.data.message)
              }
              this.loading1 = false
            })
        } else {
          this.$Message.error('请检查信息填写')
          this.loading1 = false
        }
      })
    },
    handleSubmit2 () {
      this.loading2 = true
      this.$refs['verification'].validate((valid) => {
        if (valid) {
          this.user.enabled = this.verification.code
          this.$post('/tourist/passwordResetStep2', this.user)
            .then(data => {
              if (data.data.code === 0) {
                this.step = 3
                setTimeout(() => {
                  this.$router.push('/login')
                }, 10000)
              } else {
                this.$Message.error(data.data.message)
              }
              this.loading2 = false
            })
        } else {
          this.$Message.error('请检查信息填写')
          this.loading2 = false
        }
      })
    },
    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style>
</style>
