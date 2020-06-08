<template>
  <a-card :bordered="false" style="margin: -24px -24px 0px;">
    <result type="success" :title="title">
      <template slot="action">
        <a-button @click="goToReDo">返回重做</a-button>
        <a-button style="margin-left: 8px" @click="goToReadingList">查看历史</a-button>
        <a-button type="primary" style="margin-left: 8px" @click="goToReadingGroup">确定</a-button>
      </template>
      <div>
        <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 20px;">做题概况</div>
        <a-row style="margin-bottom: 16px">
          <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
            <span style="color: rgba(0, 0, 0, 0.85)">题目组名称：</span>
            <p>&nbsp;&nbsp;{{group.title}}</p>
          </a-col>

          <a-col :offset="10" :xs="24" :sm="24" :md="24" :lg="24" :xl="6">
            <span style="color: rgba(0, 0, 0, 0.85)">完成时间：</span>
            <p>&nbsp;&nbsp;{{handleTime()}}</p>
          </a-col>
        </a-row>
        <a-card :bordered="true" size="small">
          <a-row>
            <a-col :sm="8" :xs="24">
              <head-info title="练习用时" :content="handleDuringTimeToSecondAll(list.during_time)" :bordered="true"/>
            </a-col>
            <a-col :sm="8" :xs="24">
              <head-info title="题目组满分" :content="handleFullMark" :bordered="true"/>
            </a-col>
            <a-col :sm="8" :xs="24">
              <head-info title="您的分数" :content="handleScore"/>
            </a-col>
          </a-row>
        </a-card>
      </div>
    </result>
  </a-card>
</template>

<script>
  import {Result} from '@/components'
  import HeadInfo from '@/components/tools/HeadInfo'
  import {mixinDevice} from '@/utils/mixin.js'

  import moment from "moment"

  const directionType = {
    horizontal: 'horizontal',
    vertical: 'vertical'
  }

  export default {
    name: 'Success',
    components: {
      Result,
      HeadInfo
    },
    mixins: [mixinDevice],
    created() {
      this.list = this.$route.query.list;
      this.group = this.$route.query.group;
    },
    data() {
      return {
        title: '提交成功',
        directionType,
        list: {},
        group: {}
      }
    },
    methods: {
      // 将显示的时间转化为秒或者反向
      handleDuringTimeToSecondAll(second) {
        // 秒转化为显示
        if (second) {
          let min = parseInt(second / 60).toString();
          let se = (second % 60).toString();
          if (min <= 99) {
            if (min.length < 2) {
              min = "0" + min;
            }
            if (se.length < 2) {
              se = "0" + se;
            }
            return min + ":" + se;
          }
        }
      },
      //格式化时间
      handleTime() {
        return moment(parseInt(this.list.time)).format("YYYY-MM-DD hh:mm:ss");
      },
      //  确定按钮
      goToReadingGroup() {
        this.$router.push("/reading/reading_groups");
      },
      //  重做按钮按钮
      goToReDo() {
        this.$router.push({
          path: "/reading/reading_groups/reading",
          query: {
            id: this.group.id
          }
        });
      },
      //  查看历史按钮
      goToReadingList() {
        this.$router.push("/reading/reading_lists");
      }
    },
    computed: {
      handleFullMark() {
        return this.group.full_mark + '';
      },
      handleScore() {
        return this.list.score + '';
      },
    }
  }
</script>

<style scoped>

</style>
