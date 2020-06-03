<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="我的练习次数" content="8次" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="每次练习平均时间" content="32:58" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="练习平均分" content="92.75"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      title="阅读练习记录">
      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="week">一周内</a-radio-button>
          <a-radio-button value="month">一个月内</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" placeholder="输入题目组"/>
      </div>

      <a-list
        size="large"
        :pagination="{pageSize: 8}"
        :data-source="data"
      >
        <a-list-item :key="index" slot="renderItem" slot-scope="item, index">
          <a-list-item-meta>
            <div slot="title">{{ item.title }}</div>
          </a-list-item-meta>
          <div class="list-content">
            <div class="list-content-item">
              <span>次数</span>
              <p>{{ item.times }} 次</p>
            </div>
            <div class="list-content-item">
              <span>上次做题时间</span>
              <p>{{ item.lastTime }}</p>
            </div>
            <div class="list-content-item">
              <span>正确率</span>
              <br>
              <a-progress
                :percent="item.progress.value"
                style="width: 180px"/>
            </div>
          </div>
          <div slot="actions">
            <a @click="checkList(item)">查看</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a @click="redo(item)">重做</a></a-menu-item>
                <a-menu-item>
                  <a-popconfirm
                    title="是否确认删除该阅读记录?"
                    ok-text="确认"
                    cancel-text="取消"
                    @confirm="redo(item)"
                  >
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
              <a>更多
                <a-icon type="down"/>
              </a>
            </a-dropdown>
          </div>
        </a-list-item>
      </a-list>
    </a-card>

    <!--    查看模态-->
    <a-modal
      v-model="visible"
      title="记录详情">

      <template slot="footer">
        <a-button key="sure" type="primary" @click="cancelModal">
          确定
        </a-button>
        <a-button key="redo" @click="redo">
          重做
        </a-button>
      </template>

      <description-list :title="currentList.title" size="large" :col="two">
        <description-list-item term="练习次数">
          {{(currentList.times?currentList.times+"次":false)||"暂无信息"}}
        </description-list-item>
        <description-list-item term="练习平均分">
          {{(currentList.score?currentList.score+"分":false)||"暂无信息"}}
        </description-list-item>
        <description-list-item term="练习正确率">
          {{(currentList.process?(currentList.process.value+"%"):false)||"暂无信息"}}
        </description-list-item>
        <description-list-item term="上次练习时间">{{currentList.lastTime||"暂无信息"}}</description-list-item>
        <description-list-item term="描述">{{currentList.description||"暂无信息"}}</description-list-item>
      </description-list>
    </a-modal>
  </div>
</template>

<script>
  import HeadInfo from '@/components/tools/HeadInfo'
  import {DescriptionList} from '@/components'

  const DescriptionListItem = DescriptionList.Item

  const data = []
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: '2006年考研阅读',
    description: '2006年的考研阅读，难度偏难',
    times: '5',
    lastTime: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })

  export default {
    name: 'ReadingList',
    components: {
      HeadInfo,
      DescriptionList,
      DescriptionListItem
    },
    data() {
      return {
        description: "在此处您可以对您做过的阅读练习进行历史记录的查询",
        data,
        // 时间范围按钮
        status: 'all',
        //  查看详情的模态
        visible: false,
        // 当前选中的记录
        currentList: "",
        //  详细记录里面的列数
        two: 2
      }
    },
    methods: {
      //显现详细模态
      checkList(record) {
        this.visible = true;
        this.currentList = record;
      },
      // 取消详细模态
      cancelModal() {
        this.visible = false;
        this.currentList = "";
      },
      // 重做
      redo(item) {
        let id;
        if (item) {
          id = item.id;
        } else {
          id = this.currentList.id;
        }
        this.$router.push({
            path: "/reading/reading_groups/reading",
            query: {
              id: id
            }
          }
        )
      }
    }
  }
</script>

<style lang="less" scoped>
  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }

  .list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;

    span {
      line-height: 20px;
    }

    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }
</style>
