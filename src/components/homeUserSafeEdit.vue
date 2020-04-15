<template>
  <div>
    <Card>
      <div style="padding: 20px;">
        <Form ref="user" :model="user">
          <FormItem>
            <Input type="text" maxlength="16" v-model="user.username" placeholder="账号" disabled>
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Input type="text" maxlength="32" v-model="user.email" placeholder="邮箱" disabled>
              <Icon type="ios-mail-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button style="width: 100%;" @click="passwordChangeModal=true">修改密码</Button>
          </FormItem>
        </Form>
      </div>
      <Modal v-model="passwordChangeModal" :loading="passwordChangeLoading" title="修改密码" @on-ok="passwordChangeModalOk" @on-cancel="passwordChangeModalCancel">
        <Form ref="passwordChange" :model="passwordChange" :rules="passwordChangeRules" label-position="left" :label-width="80">
          <FormItem label="原密码" prop="passwordOriginal">
            <Input type="password" maxlength="16" v-model="passwordChange.passwordOriginal" placeholder="请输入"/>
          </FormItem>
          <FormItem label="修改密码" prop="passwordChanged">
            <Input type="password" maxlength="16" v-model="passwordChange.passwordChanged" placeholder="请输入"/>
          </FormItem>
          <FormItem label="确认密码" prop="passwordChangedCheck">
            <Input type="password" maxlength="16" v-model="passwordChange.passwordChangedCheck" placeholder="请输入"/>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        username: null,
        email: null
      },
      passwordChange: {
        passwordOriginal: null,
        passwordChanged: null,
        passwordChangedCheck: null
      },
      passwordChangeRules: {
        passwordOriginal: [
          {
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码长度不能小于6位',
            trigger: 'blur'
          }
        ],
        passwordChanged: [
          {
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码长度不能小于6位',
            trigger: 'blur'
          }
        ],
        passwordChangedCheck: [
          {
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          },
          {
            type: 'string',
            validator: (rule, value) => value === this.passwordChange.passwordChanged,
            message: '密码不一致',
            trigger: 'blur'
          }
        ]
      },
      passwordChangeModal: false,
      passwordChangeLoading: true
    }
  },
  mounted () {
    this.getUserSafe()
  },
  methods: {
    getUserSafe () {
      this.$get('/user/safe')
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.user = data.data.data.user
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    passwordChangeModalOk () {
      this.$refs['passwordChange'].validate((valid) => {
        if (valid) {
          this.$put('/user/passwordChange', this.passwordChange)
            .then(data => {
              this.passwordChangeLoading = false
              if (data.data.code === 0) {
                this.$Message.success('修改成功，请重新登录')
                localStorage.removeItem('token') // 注销并删除token
                this.$router.push('/login')
              } else {
                this.$Message.error(data.data.message)
                setTimeout(() => {
                  this.passwordChangeLoading = false
                  setTimeout(() => {
                    this.passwordChangeLoading = true
                  }, 1000)
                }, 1000)
              }
            })
        } else {
          this.$Message.error('请检查信息填写')
          setTimeout(() => {
            this.passwordChangeLoading = false
            setTimeout(() => {
              this.passwordChangeLoading = true
            }, 1000)
          }, 1000)
        }
      })
    },
    passwordChangeModalCancel () {
      this.passwordChange.passwordOriginal = null
      this.passwordChange.passwordChanged = null
      this.passwordChange.passwordChangedCheck = null
    }
  }
}
</script>
<style>
</style>
