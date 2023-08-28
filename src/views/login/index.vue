<template>
  <div class="login-box">
    <h2>{{ isLogin ? '注册' : '登录' }}</h2>
    <form>
      <div class="user-box">
        <input type="text" v-model="name" required="true" />
        <label>账号</label>
      </div>
      <div class="user-box">
        <input type="password" v-model="password" required="true" />
        <label>密码</label>
      </div>
      <div class="user-box" v-if="isLogin">
        <input type="password" v-model="password" required="true" />
        <label>再次确认密码</label>
      </div>
      <div class="submit-box">
        <a href="javascript:void(0)" @click="login">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          登录
        </a>
        <a href="javascript:void(0)" @click="register">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          注册
        </a>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { SET_TOKEN } from '@/utils/token'
import request from '@/utils/request'
const router = useRouter()
const name = ref('')
const password = ref('')
const login = async () => {
  if (isLogin.value) {
    isLogin.value = false
    return
  }
  if (!name.value || !password.value) {
    ElMessage({
      message: '账号密码不能为空',
      type: 'warning',
    })
    return
  }
  await request.post('/login', { name, password }).then((res) => {
    console.log('登录结果', res)
    ElMessage.success('登录成功')
    SET_TOKEN('123456')
    localStorage.setItem('userInfo', JSON.stringify(res.data.data))
    router.push('/welcome')
  })
}
const isLogin = ref(false)
const register = () => {
  if (!isLogin.value) {
    isLogin.value = true
    return
  }
}
</script>

<style scoped lang="scss">
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  h2 {
    margin: 0 0 30px;
    padding: 0;
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    text-align: center;
  }
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}
.submit-box {
  display: flex;
  justify-content: space-between;
}
.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  width: 140px;
  text-align: center;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>
