<template>
  <a-card :bordered="false" style="margin: -24px -24px 0px;">
    <result type="success" :title="title">
      <template slot="action">
        <a-button >返回重做</a-button>
        <a-button style="margin-left: 8px">查看历史</a-button>
        <a-button type="primary" style="margin-left: 8px">确定</a-button>
      </template>
      <div>
        <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 20px;">做题概况</div>
        <a-row style="margin-bottom: 16px">
          <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
            <span style="color: rgba(0, 0, 0, 0.85)">题目组名称：</span>
            20180724089
          </a-col>

          <a-col :offset="10" :xs="24" :sm="24" :md="24" :lg="24" :xl="6">
            <span style="color: rgba(0, 0, 0, 0.85)">完成时间：</span>
            2016-12-12 20:25
          </a-col>
        </a-row>
        <a-card :bordered="true" size="small">
          <a-row>
            <a-col :sm="8" :xs="24">
              <head-info title="练习用时" content="30:52" :bordered="true"/>
            </a-col>
            <a-col :sm="8" :xs="24">
              <head-info title="题目组满分" content="100" :bordered="true"/>
            </a-col>
            <a-col :sm="8" :xs="24">
              <head-info title="您的分数" content="80"/>
            </a-col>
          </a-row>
        </a-card>
      </div>
    </result>
  </a-card>
</template>

<script>
import { Result } from '@/components'
import HeadInfo from '@/components/tools/HeadInfo'
import { mixinDevice } from '@/utils/mixin.js'

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
  data () {
    return {
      title: '提交成功',
      directionType
    }
  }
}
</script>

<style scoped>

</style>
