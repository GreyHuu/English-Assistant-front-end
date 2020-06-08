<template >
  <div v-if="is_login">
    <router-view/>
  </div>
</template>

<script>

  import Vue from "vue";
  import {ACCESS_TOKEN, CURRENT_USER} from "@/store/mutation-types";
  import {getCurrentUser} from "@/api/userApi";

  export default {
    name: 'BlankLayout',
    data() {
      return {
        is_login: false
      }
    },
    created() {
      // 判断是否登录
      const user = Vue.ls.get(CURRENT_USER);
      // 未登录
      if (!(!!user)) {
        this.$router.push({path: '/user'})
        Vue.ls.remove(ACCESS_TOKEN);
        Vue.ls.remove(CURRENT_USER)
        // 延迟 1 秒显示信息
        setTimeout(() => {
          this.$notification.error({
            message: '提示',
            description: `还未登录，请先登录`
          })
        }, 1000);
      } else {
        this.is_login = true;
      }
    }
  }
</script>

<style scoped>

</style>
