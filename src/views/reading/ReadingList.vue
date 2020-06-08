<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="我的练习次数" :content="headData.times" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="每次练习平均时间" :content="headData.during" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="练习平均分" :content="headData.score"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      title="阅读练习记录">
      <div slot="extra">
        <a-input-search
          v-model="query"
          style="margin-left: 16px; width: 272px;"
          placeholder="输入题目组名称"
          @search="queryListData"
        />
      </div>

      <a-list
        size="large"
        :pagination="{pageSize: 8}"
        :data-source="data"
        :loading="loading"
      >
        <a-list-item :key="index" slot="renderItem" slot-scope="item, index">
          <a-list-item-meta>
            <div slot="title">{{ item.title }}</div>
          </a-list-item-meta>
          <div class="list-content">
            <div class="list-content-item">
              <span>分数</span>
              <p>{{ item.score }} 分</p>
            </div>
            <div class="list-content-item">
              <span>做题时间</span>
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
                    @confirm="deleteList(item)"
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
        <a-button key="redo" @click="redo(null)">
          重做
        </a-button>
      </template>

      <description-list :title="currentList.title" size="large" :col="two">
        <description-list-item term="练习用时">
          {{(currentList.during?currentList.during:false)||"暂无信息"}}
        </description-list-item>
        <description-list-item term="练习分数">
          {{(currentList.score?currentList.score+"分":false)||"暂无信息"}}
        </description-list-item>
        <description-list-item term="练习正确率">
          {{(currentList.progress?(currentList.progress.value+"%"):false)||"暂无信息"}}
        </description-list-item>
        <description-list-item term="练习时间">{{currentList.lastTime||"暂无信息"}}</description-list-item>
        <description-list-item term="描述">{{currentList.description||"暂无信息"}}</description-list-item>
      </description-list>
    </a-modal>
  </div>
</template>

<script>
  import HeadInfo from '@/components/tools/HeadInfo'
  import {DescriptionList} from '@/components'
  import {getHistory, searchReadingListData, getHistoryData, deleteReadingList} from "@/api/readingApi";
  import {getCurrentUser} from "@/api/userApi";
  import moment from "moment";

  const DescriptionListItem = DescriptionList.Item

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
        data: [],
        //  查看详情的模态
        visible: false,
        // 当前选中的记录
        currentList: "",
        //  详细记录里面的列数
        two: 2,
        loading: false,
        headData: {
          times: "",
          during: "",
          score: ""
        },
        query: ""
      }
    },
    mounted() {
      getCurrentUser().then(e => {
        this.loading = true;
        const {id} = e.data;
        if (id) {
          getHistoryData({id}).then(e => {
            const {times, during, score} = e.data;
            this.headData = {
              times: times.toString(),
              during: this.handleDuringTimeToSecondAll(during).toString(),
              score: parseFloat(score).toFixed(2).toString()
            }
          })
          getHistory({
            id
          }).then(e => {
              this.reFlushData(e);
              this.loading = false;
            }
          )
        }

      })
    },
    methods: {
      reFlushData(e) {
        this.data = []
        for (let da of e.data) {
          const {list, group, time} = da;
          this.data.push({
            id: list.id,
            group_id: list.group_id,
            title: group.title,
            description: group.description,
            score: list.score,
            during: this.handleDuringTimeToSecondAll(list.during_time),
            lastTime: moment(parseInt(time)).format("YYYY-MM-DD hh:mm:ss"),
            progress: {
              value: parseFloat(((list.score / group.full_mark) * 100).toFixed(2))
            }
          })
        }
      },
      //显现详细模态
      checkList(record) {
        this.visible = true;
        this.currentList = record;
      }
      ,
      // 取消详细模态
      cancelModal() {
        this.visible = false;
        this.currentList = "";
      }
      ,
      // 重做
      redo(item) {
        let id;
        console.log(item);
        if (item) {
          id = item.group_id;
        } else {
          id = this.currentList.group_id;
        }
        console.log(id);
        this.$router.push({
            path: "/reading/reading_groups/reading",
            query: {
              id
            }
          }
        )
      },
      // 删除
      deleteList(item) {
        this.loading = true;
        deleteReadingList({
          id: item.id
        }).then(res => {
          getCurrentUser().then(e => {
            this.loading = true;
            const {id} = e.data;
            if (id) {
              getHistoryData({id}).then(e => {
                const {times, during, score} = e.data;
                this.headData = {
                  times: times.toString(),
                  during: this.handleDuringTimeToSecondAll(during).toString(),
                  score: parseFloat(score).toFixed(2).toString()
                }
              })
              getHistory({
                id
              }).then(e => {
                  this.reFlushData(e);
                  this.loading = false;
                }
              )
            }
          })
        })
      },
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
      // 搜索
      queryListData() {
        if (this.query) {
          this.loading = true;
          searchReadingListData({
            title: this.query
          }).then(e => {
              this.reFlushData(e)
              this.loading = false;
            }
          )
        } else {
          this.$message.warning('请输入要搜索的题目');
        }

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
