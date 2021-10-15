<template>
  <div class="login">
    <el-form ref="formRef" class="login-form" :model="form" :rules="rules">
      <h2>系统登录</h2>
      <el-form-item prop="username">
        <el-input
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          v-model="form.username">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-warning"
          show-password
          v-model="form.password">
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="handleLogin">登录</el-button>
      <div class="tip">
        <p>admin: admin, admin</p>
        <p> visitor: visitor, visitor</p>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, reactive, ref, toRefs } from 'vue'
import { useRouter, RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex'
import { login } from '@/utils/api/user'
import Message from 'element-plus/lib/el-message/src/message'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const { proxy }: any = getCurrentInstance()

    document.onkeydown = function(e) {
      const key = e.key
      if (key === 'Enter') {
        handleLogin()
      }
    }

    const state = reactive({
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: { required: true, message: '请输入用户名' },
        password: { required: true, message: '请输入密码' }
      }
    })
    
    const formRef = ref()
    const handleLogin = () => {
      formRef.value.validate(async (isValidate: boolean) => {
        if (isValidate) {
          const res: any = await login({
            username: state.form.username,
            password: state.form.password
          })
          if (res.code === 200) {
            store.dispatch('user/login', res.data)
          } else {
            proxy.$message({
              type: 'error',
              message: res.msg
            })
          }
        }
      })
    }

    return {
      ...toRefs(state),
      handleLogin,
      formRef
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  &-form {
    padding: 50px;
    background: #fff;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    h2 {
      text-align: center;
      margin-bottom: 15px;
    }
    .el-input {
      width: 350px;
    }
    .el-button {
      width: 100%;
    }
  }
}
.tip {
  margin-top: 15px;
  color: #666;
}
</style>