<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]" v-if="is_login">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="../../public/english-input.png" class="logo" alt="logo">
            <span class="title" style="color:#13C2C2">English Assistant</span>
          </a>
        </div>
        <div class="desc">
          English Assistant 致力于帮助广大大学生高效学习英语
        </div>
      </div>

      <route-view></route-view>

      <div class="footer">
        <div class="copyright">
          Copyright &copy; 2020 软工172-2组
        </div>
      </div>
    </div>
    <!-- Setting Drawer (show in development mode) -->
    <setting-drawer v-if="!production"></setting-drawer>
  </div>
</template>

<script>
  import RouteView from './RouteView'
  import {mixinDevice} from '@/utils/mixin'
  import Vue from "vue";
  import {CURRENT_USER} from "@/store/mutation-types";
  import config from '@/config/defaultSettings'
  import SettingDrawer from "@/components/SettingDrawer";


  export default {
    name: 'UserLayout',
    components: {RouteView, SettingDrawer},
    mixins: [mixinDevice],
    data() {
      return {
        production: config.production,
        is_login: false
      }
    },
    created() {
      // 判断是否登录
      const user = Vue.ls.get(CURRENT_USER);
      // 已经登录
      if (!!user) {
        this.$router.push({path: '/'})
        // 延迟 1 秒显示信息
        setTimeout(() => {
          this.$notification.warning({
            message: '提示',
            description: `已经登录，请勿重复登录`
          })
        }, 1000);
      } else {
        this.is_login = true;
      }
    },
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
      padding: 110px 0 144px;
      position: relative;

      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

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

        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;

          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;

            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }

        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
