<template>
  <div>
    <template v-if="isHasData">
      <!--    顶部信息-->
      <a-card :bordered="true">
        <a-row>
          <a-col :sm="8" :xs="24">
            <head-info title="阅读总览" :content="currentContentIndex" :bordered="true"/>
          </a-col>
          <a-col :sm="8" :xs="24">
            <head-info title="练习用时" :content="duringTime" :bordered="true"/>
          </a-col>
          <a-col :sm="8" :xs="24">
            <head-info title="完成百分比" :content="currentPercent"/>
          </a-col>
        </a-row>
      </a-card>
      <!--    问题-->
      <a-card :loading="loading" :title="currentTitle">
        <a-button-group slot="extra">
          <a-button type="primary" :disabled="isFirstOne" @click="preContent">
            <a-icon type="left"/>
            上一篇
          </a-button>
          <a-button type="primary" :disabled="isLastOne" @click="nextContent">
            下一篇
            <a-icon type="right"/>
          </a-button>
        </a-button-group>
        <div v-html="currentContent"></div>
      </a-card>
      <!--    问题-->
      <div v-for="(question,index) in questionData[currentIndex]">
        <a-card :bordered="true" :loading="loading">
          <a-card-meta :title="question.question">
            <template slot="description">
              <a-radio-group v-model="question.value" @change="chooseAnswer(question.id,index)">
                <a-radio class="radioStyle" :value="1">
                  A. {{question.optional_a}}
                </a-radio>
                <a-radio class="radioStyle" :value="2">
                  B. {{question.optional_b}}
                </a-radio>
                <a-radio class="radioStyle" :value="3">
                  C. {{question.optional_c}}
                </a-radio>
                <a-radio class="radioStyle" :value="4">
                  D. {{question.optional_d}}
                </a-radio>
              </a-radio-group>
            </template>
          </a-card-meta>

        </a-card>
      </div>
      <!--    底部提交按钮-->
      <div class="footer-btn">
        <a-row type="flex" justify="end">
          <a-col span="3">
            <a-button @click="submitAnswer" type="primary" block>提交</a-button>
          </a-col>
        </a-row>
      </div>
    </template>
    <template v-else>
      <h1>暂无信息</h1>
    </template>
  </div>

</template>

<script>
  import HeadInfo from '@/components/tools/HeadInfo'
  import {getCurrentContents, getCurrentReadingQuestions, compareGroupAnswers, insertHistory} from "@/api/readingApi";
  import {getCurrentUser} from "@/api/userApi";

  export default {
    name: 'ReadingContent',
    components: {
      HeadInfo
    },
    data() {
      return {
        groupId: "",
        // card占位
        loading: false,
        // 是第一篇吗
        isFirstOne: true,
        // 是最后一篇吗
        isLastOne: false,
        // 文章data
        contentData: [],
        //问题data
        questionData: [],
        // 选择的初始为空
        value: 0,
        //当前文章是第几篇
        currentIndex: -1,
        // 当前文章内容
        currentContent: "",
        //当前文章的问题
        currentQuestion: "",
        //  文章总数
        totalContent: "",
        //答案
        questionAnswer: [],
        //  已答题数量
        answerCount: 0,
        //  完成的百分比
        completePercent: 0,
        // 当前计时
        duringTime: "00:00",
        // 当前用于计时的定时任务
        interval: "",
        isHasData: false
      }
    },
    created() {
      this.loading = true;
      this.groupId = this.$route.query.id;
    },
    mounted() {
      if (this.interval)
        clearInterval(this.interval);
      // 获得问题和文章
      getCurrentContents({
        id: this.groupId
      }).then(res => {
        let contents = [];
        let questions = []
        const {data} = res;
        if (data.length > 0)
          this.isHasData = true;
        for (let da of data) {
          contents.push({
            content: da.content,
            id: da.id
          });
          getCurrentReadingQuestions({id: da.id}).then(res => {
            questions = [];
            for (let index in res.data) {
              delete res.data[index].answer;
              const {id, optional_a, optional_b, optional_c, optional_d, question} = res.data[index];
              questions.push({
                id,
                optional_a,
                optional_b,
                optional_c,
                optional_d,
                question: (parseInt(index) + 1) + "." + question,
                value: 0
              })
            }
            this.questionData.push(questions);
          })
        }
        this.contentData = contents;
        this.loading = false;
        this.totalContent = (this.contentData.length - 1);
        this.reFlush(0);
        // 开始计时
        this.interval = setInterval(() => {
          this.duringTime = this.handleDuringTimeToSecondAll(this.handleDuringTimeToSecondAll() + 1);
        }, 1200)
      });
      let that = this;
      // 刷新关闭提示
      window.onbeforeunload = function (e) {
        if (that.$route.path === "/reading/reading_groups/reading") {
          e = e || window.event;
          // 兼容IE8和Firefox 4之前的版本
          if (e) {
            e.returnValue = '关闭提示';
          }
          // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
          return '关闭提示';
        } else {
          window.onbeforeunload = null
        }
      }
    },
    computed: {
      // 第几篇的提示
      currentContentIndex: function () {
        return (this.currentIndex + 1) + "/" + (this.totalContent + 1)
      },
      // 当前的文章标题
      currentTitle: function () {
        return "Text " + (this.currentIndex + 1)
      },
      //  当前的做题百分比
      currentPercent: function () {
        if (!!this.questionData.length) {
          return ((this.answerCount / (this.questionData.length * this.questionData[0].length)) * 100).toFixed(0) + "%"
        } else
          return "0%";
      }
    },
    methods: {
      // 刷新当前页面展示的文章和问题以
      reFlush(currentIndex) {
        this.isFirstOne = (currentIndex === 0)
        this.isLastOne = (currentIndex === this.totalContent);
        this.currentIndex = currentIndex;
        this.currentContent = this.contentData[this.currentIndex].content;
      },
      //下一篇
      nextContent() {
        if (this.isLastOne)
          return false;
        this.reFlush(this.currentIndex + 1)
      },
      // 上一篇
      preContent() {
        if (this.isFirstOne)
          return false;
        this.reFlush(this.currentIndex - 1)
      },
      // 选择答案
      chooseAnswer(id, index) {
        const value = this.questionData[this.currentIndex][index].value;
        let isHad = false;
        for (let answer of this.questionAnswer) {
          if (id === answer.id) {
            answer.answer = value;
            isHad = true;
          }
        }
        if (!isHad) {
          this.answerCount++;
          this.questionAnswer.push({
            id,
            answer: value
          });
        }

      },
      // 提交答案
      submitAnswer() {
        const that = this;
        if (this.answerCount === (this.questionData.length * this.questionData[0].length)) {
          this.$confirm({
            title: '提示',
            content: "是否确认提交答案? 每次练习答案只能提交才一次",
            onOk() {
              that.$nextTick(function () {
                console.log('this', this)
                console.log('this.$refs.tInput', this.$refs.tInput)
              })
              that.$loading.show()
              compareGroupAnswers({
                answers: that.questionAnswer
              }).then(res => {
                const score = res.data;
                getCurrentUser().then(res => {
                  const user_id = res.data.id;
                  const history = {
                    user_id,
                    group_id: that.groupId,
                    score: score,
                    during_time: that.handleDuringTimeToSecondAll(),
                  };
                  insertHistory(history).then(e => {
                    e.data.list.time = e.data.time;
                    that.$router.push({
                      path: "/reading/reading_groups/result",
                      query: {...e.data}
                    })
                    that.$loading.hide()
                  })
                })
              })
            }
          });
        } else {
          this.$message.error('还未答完全部的题目');
        }
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
          } else {
            this.$warning({
              title: '提示',
              content: '已经达到做题时间上限，本次做题失败',
            });
            clearInterval(this.interval);
            this.$router.back();
          }
        } else {   //从显示转化为秒
          const during = this.duringTime.toString().split(":");
          const min = parseInt(during[0]);
          const second = parseInt(during[1]);
          return min * 60 + second;
        }
      }
    }
  }
</script>

<style scoped>
  .radioStyle {
    display: block;
    height: 30px;
    line-height: 30px;
  }

  .footer-btn {
    margin-top: 20px;
  }
</style>
