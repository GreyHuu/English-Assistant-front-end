<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar
            shape="square"
            size="large"
            :style="{ backgroundColor: '#13C2C2', verticalAlign: 'middle' }"
          >
              {{ avatarValue }}
        </a-avatar>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>个人信息</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
  import NoticeIcon from '@/components/NoticeIcon'
  import {mapActions, mapGetters} from 'vuex'
  import {getCurrentUser} from "@/api/userApi";
  import Vue from 'vue'
  import {GET_NAME_INTERVAL} from "@/store/mutation-types";

  export default {
    name: 'UserMenu',
    components: {
      NoticeIcon
    },
    computed: {
      ...mapGetters(['nickname', 'avatar'])
    },
    mounted() {
      getCurrentUser().then(e => {
        this.avatarValue = e.data.nick_name;
      })
      const getNameInterval = setInterval(() => {
        getCurrentUser().then(e => {
          this.avatarValue = e.data.nick_name;
        })
      }, 10000);
      Vue.ls.set(GET_NAME_INTERVAL, getNameInterval, 7 * 24 * 60 * 60 * 1000);
    },
    data() {
      return {
        avatarValue: "",
      }
    },
    methods: {
      ...mapActions(['Logout']),
      handleLogout() {
        this.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          onOk: () => {
            return this.Logout({}).then(() => {
              setTimeout(() => {
                this.$router.push({path: "/user"})
              }, 16)
            }).catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message
              })
            })
          },
          onCancel() {
          }
        })
      },
    }
  }
</script>
