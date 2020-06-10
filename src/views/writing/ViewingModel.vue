<template>
  <div io="app">
    <a-card>
      <div style="white-space: pre-wrap;" >
        {{model}}
      </div>

      <a-button type="primary" style="margin-top: 6em;margin-left: 61em;" @click="back(mycpt_id)" ghost>
        返回
      </a-button>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'ViewingModel',
    data(){
      return {
        model: '',
        mycpt_id: -1
      }
    },
    mounted() {
      this.model = this.$route.params.model;
      this.mycpt_id = this.$route.params.mycpt_id;
    },
    methods: {
      back(mycpt_id) {
        // console.log('查看作文传出mycpt_id: '+mycpt_id)
        this.$router.push({
          name: "write",
          params: {
            state: 'view',
            mycpt_id: mycpt_id,
          }
        })
      },

    }
  }
</script>

<style scoped>

</style>