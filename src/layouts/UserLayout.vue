<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="javascript:;">
            <img src="~@/assets/logo.svg" class="logo" alt="logo">
            <span class="title">后台管理系统</span>
          </a>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>
<script>
  import {
    deviceMixin
  } from '@/store/device-mixin'

  export default {
    name: 'UserLayout',
    mixins: [deviceMixin],
    mounted() {
      document.body.classList.add('userLayout')
    },
    beforeDestroy() {
      document.body.classList.remove('userLayout')
    }
  }
</script>
<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
      background-size: 100%;
      padding: 150px 0 144px;
      position: relative;

      a {
        text-decoration: none;
      }

      .top {
        text-align: center;
        margin-bottom: 30px;

        .header {
          height: 44px;
          line-height: 44px;

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

    }
  }
</style>