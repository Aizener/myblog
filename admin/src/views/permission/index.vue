<template>
  <div class="permission">
    <p>您的角色是：{{ userInfo.role }}</p>
    <div class="switch">
      切换权限：
      <el-radio-group v-model="role" @change="handleChange">
        <el-radio-button label="admin">管理员</el-radio-button>
        <el-radio-button label="visitor">普通</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const { userInfo } = toRefs(store.state.user)
    const role = ref(userInfo.value.role)

    const tokens: {
      [propName: string]: any
    } = {
      admin: 'abcdefghijklmnopqrstuvwxyz0',
      visitor: 'abcdefghijklmnopqrstuvwxyz1'
    }

    const handleChange = (label: string) => {
      store.dispatch('user/login', { token: tokens[label] }).then(() => {
        location.href = location.origin + location.pathname
      })
    }

    return {
      handleChange,
      userInfo,
      role
    }
  }
}
</script>

<style lang="scss" scoped>
.permission {
  padding: 30px;
  .switch {
    margin-top: 15px;
  }
}
</style>