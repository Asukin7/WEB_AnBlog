<template>
  <div>
    <div class="box">
      <h1>请登录</h1>
      <input type="text" maxlength="16" placeholder="账号" v-model="username">
      <input type="password" maxlength="16" placeholder="密码" v-model="password" @keyup.enter="login">
      <div class="button" @click="login">登录</div>
      <a @click="goRegister">立即注册</a>
      <a @click="goResetPassword">忘记密码</a>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    login () {
      this.$post('/tourist/login', {username: this.username, password: this.password})
        .then(data => {
          if (data.data.code === 0) { // 登录成功
            localStorage.setItem('token', data.data.data.token) // 登录并存储token
            this.$Message.success(data.data.message)
            this.$router.push('/home')
          } else { // 登录失败
            this.$Message.error(data.data.message)
          }
        })
    },
    goRegister () {
      this.$router.push('/register')
    },
    goResetPassword () {
      this.$router.push('/resetPassword')
    }
  }
}
</script>
<style>
body {
  margin: 0;
  padding: 0;
  background: #f2f2f2;
  background-size: cover;
}
.box {
  width: 450px;
  padding: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #222222bb;
  text-align: center;
  border-radius: 20px;
}
.box h1 {
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 30px;
}
.box input[type="text"],
.box input[type="password"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 10px 10px;
  width: 260px;
  outline: none;
  color: white;
  border-radius: 30px;
  transition: 0.25s;
}
.box input[type="text"]:focus,
.box input[type="password"]:focus {
  width: 300px;
  border-color: #2ecc71;
}
.box .button {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #2ecc71;
  padding: 10px 10px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 30px;
  transition: 0.25s;
}
.box .button:hover {
  background: #2ecc71;
  cursor: pointer;
}
.box a {
  margin: 10px;
  color: #aaaaaa;
  text-decoration: none;
}
.box a:hover {
  color: white;
}
</style>
