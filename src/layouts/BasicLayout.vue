<template>
  <pro-layout :title="title" :menus="menus" :collapsed="collapsed" :mediaQuery="query" :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery" :handleCollapse="handleCollapse" :logo="logoRender" :i18nRender="i18nRender"
    v-bind="settings">
    <template v-slot:rightContentRender>
      <span>
        <span style="margin-right:10px;">{{firstBreadcrumb}} </span>/
        <span style="margin-left:10px;">{{secordBreadcrumb}}</span>
      </span>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
  import {
    updateTheme
  } from '@ant-design-vue/pro-layout'
  import {
    i18nRender
  } from '@/locales'
  import {
    mapState
  } from 'vuex'
  import {
    CONTENT_WIDTH_TYPE,
    SIDEBAR_TYPE,
    TOGGLE_MOBILE_TYPE
  } from '@/store/mutation-types'

  import defaultSettings from '@/config/defaultSettings'
  import RightContent from '@/components/GlobalHeader/RightContent'
  import GlobalFooter from '@/components/GlobalFooter'
  import LogoSvg from '../assets/logo.svg?inline'

  export default {
    name: 'BasicLayout',
    components: {
      RightContent,
      GlobalFooter,

    },
    data() {
      return {
        firstBreadcrumb: '仪表盘',
        secordBreadcrumb: '工作台',
        // base
        menus: [],
        // 侧栏收起状态
        collapsed: false,
        title: defaultSettings.title,
        settings: {
          // 布局类型
          layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
          // CONTENT_WIDTH_TYPE
          contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
          // 主题 'dark' | 'light'
          theme: defaultSettings.navTheme,
          // 主色调
          primaryColor: defaultSettings.primaryColor,
          fixSiderbar: defaultSettings.fixSiderbar,
          fixedHeader: defaultSettings.fixedHeader,
        },
        // 媒体查询
        query: {},

        // 是否手机模式
        isMobile: false
      }
    },
    computed: {
      ...mapState({
        // 动态主路由
        mainMenu: state => state.permission.addRouters
      })
    },
    created() {
      const routes = this.mainMenu.find(item => item.path === '/')
      this.menus = (routes && routes.children) || []
      // 处理侧栏收起状态
      this.$watch('collapsed', () => {
        this.$store.commit(SIDEBAR_TYPE, this.collapsed)
        let dom = document.getElementsByClassName('sidemenu')[0]
        let domHeader = document.getElementsByClassName('ant-pro-fixed-header')[0]
        if (this.collapsed) {
          dom.classList.remove('sidemenu-expand')
          dom.classList.add('sidemenu-collapsed')
          domHeader.classList.remove('header-expand')
          domHeader.classList.add('header-collapsed')
        } else {
          dom.classList.remove('sidemenu-collapsed')
          dom.classList.add('sidemenu-expand')
          domHeader.classList.remove('header-collapsed')
          domHeader.classList.add('header-expand')
        }
      })
      this.$watch('isMobile', () => {
        this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
      })
    },
    mounted() {
      const userAgent = navigator.userAgent
      if (userAgent.indexOf('Edge') > -1) {
        this.$nextTick(() => {
          this.collapsed = !this.collapsed
          setTimeout(() => {
            this.collapsed = !this.collapsed
          }, 16)
        })
      }

      // first update color
      // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
      if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
        updateTheme(this.settings.primaryColor)
      }
    },
    watch: {
      $route() {
        this.firstBreadcrumb = this.$route.matched[1].meta.title
        this.secordBreadcrumb = this.$route.meta.title
      }
    },
    methods: {
      i18nRender,
      handleMediaQuery(val) {
        this.query = val
        if (this.isMobile && !val['screen-xs']) {
          this.isMobile = false
          return
        }
        if (!this.isMobile && val['screen-xs']) {
          this.isMobile = true
          this.collapsed = false
          this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          // this.settings.fixSiderbar = false
        }
      },
      handleCollapse(val) {
        this.collapsed = val
      },
      logoRender() {
        return <LogoSvg / >
      }
    }
  }
</script>

<style lang="less">
  @import "./BasicLayout.less";
</style>