<template>
  <div class="top-navbar">
    <div class="left">
      <i class="el-icon-s-fold navbar-icon" v-if="!isCollapse" @click="handleCollapse"></i>
      <i class="el-icon-s-unfold navbar-icon" v-else @click="handleCollapse"></i>
      <p
        class="top-navbar__title"
        id="navbar-title"
        v-if="navbarTitle"
      >
        {{ $t(`message.slideBarHome`) }}&nbsp;
        <span v-show="navbarTitle.length">/&nbsp;
          {{ $t(`message.${navbarTitle}`) }}
        </span>
      </p>
    </div>

    <div class="navbar-user-info">
      <el-popover
        placement="bottom"
        :width="100"
        trigger="hover"
      >
        <template #reference>
          <span class="user-info-text" id="navbar-user-info">{{ $t('message.greet') }}</span>
        </template>
        <div class="list">
          <span>{{ userInfo.role }}</span>
          <a class="logout" @click="logout">退出</a>
        </div>
      </el-popover>
      <a href="https://baidu.com" target="_blank" id="navbar-github">
        <svg-icon :width="32" :height="32" icon-name="icon-github" fillColor="#333"></svg-icon>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { toRefs, getCurrentInstance, watch } from 'vue'
import { useStore } from "vuex"

export default {
  setup() {
    const store = useStore()
    const { proxy }: any = getCurrentInstance()
    const { userInfo } = toRefs(store.state.user)
    const { isCollapse, navbarTitle } = toRefs(store.state.app)

    const handleCollapse = () => {
      store.dispatch('app/toggleSlideBar', !store.state.app.isCollapse)
    }

    const logout = () => {
      proxy.$confirm('你是否要退出登录？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        sessionStorage.removeItem('token')
        router.push({ path: '/' })
        location.reload()
      }).catch(() => {})
    }

    return {
      isCollapse,
      navbarTitle,
      userInfo,
      handleCollapse,
      logout
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: space-between;
}
.logout {
  color: #409EFF;
  cursor: pointer;
}
.top-navbar {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--theme-navbar-bg);
  box-shadow: 0 1px 4px #ccc;
  position: relative;
  z-index: 1;
  .left {
    display: flex;
    align-items: center;
    .navbar-icon {
      cursor: pointer;
    }
  }
  .navbar-user-info {
    display: flex;
    align-items: center;
    margin-right: 30px;
    .user-info-text {
      margin-right: 15px;
      cursor: pointer;
    }
  }
  &__title {
    margin-left: 15px;
    color: #333;
    font-size: 15px;
    span {
      color: #999;
    }
  }
}
.el-icon-s-fold, .el-icon-s-unfold {
  font-size: 26px;
  margin-left: 15px;
  color: #333;
}
</style>