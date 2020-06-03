<template>
  <div>
    <!--    顶部信息-->
    <a-card :bordered="true">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="当前阅读" content="1/5" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="当前练习用时" content="00:32" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="阅读完成百分比" content="24%"/>
        </a-col>
      </a-row>
    </a-card>
    <!--    问题-->
    <a-card :loading="loading" title="Text 1">
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
    <div v-for="question in questionData">
      <a-card :bordered="true">
        <a-card-meta :title="question.question">
          <template slot="description">
            <a-radio-group v-model="question.value">
              <a-radio class="radioStyle" :value="1">
                A. {{question.optionA}}
              </a-radio>
              <a-radio class="radioStyle" :value="2">
                B. {{question.optionB}}
              </a-radio>
              <a-radio class="radioStyle" :value="3">
                C. {{question.optionC}}
              </a-radio>
              <a-radio class="radioStyle" :value="4">
                D. {{question.optionD}}
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
          <a-button type="primary" block>提交</a-button>
        </a-col>
      </a-row>
    </div>
  </div>

</template>

<script>
  import HeadInfo from '@/components/tools/HeadInfo'
  import {getCurrentQuestions} from "@/api/readingApi";

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
        questionData: [
          {
            id: 1,
            question: 1 + " By citing the examples of poets Wordsworth and Baudelaire, the author intends to show that ________",
            optionA: "poetry is not as expressive of joy as painting or musi",
            optionB: "art grows out of both positive and negative feelings",
            optionC: "poets today are less skeptical of happiness",
            optionD: "artists have changed their focus of interest",
            value: 0
          },
          {
            id: 2,
            question: 2 + " The word “bummer” (Line 5, paragraph 5) most probably means something ________",
            optionA: "poetry is not as expressive of joy as painting or musi",
            optionB: "art grows out of both positive and negative feelings",
            optionC: "poets today are less skeptical of happiness",
            optionD: "artists have changed their focus of interest",
            value: 0
          },
          {
            id: 3,
            question: 3 + " In the author’s opinion, advertising ________",
            optionA: "poetry is not as expressive of joy as painting or musi",
            optionB: "art grows out of both positive and negative feelings",
            optionC: "poets today are less skeptical of happiness",
            optionD: "artists have changed their focus of interest",
            value: 0
          },
          {
            id: 4,
            question: 4 + " We can learn from the last paragraph that the author believes ________",
            optionA: "poetry is not as expressive of joy as painting or musi",
            optionB: "art grows out of both positive and negative feelings",
            optionC: "poets today are less skeptical of happiness",
            optionD: "artists have changed their focus of interest",
            value: 0
          },
          {
            id: 5,
            question: 5 + " Which of the following is true of the text?",
            optionA: "poetry is not as expressive of joy as painting or musi",
            optionB: "art grows out of both positive and negative feelings",
            optionC: "poets today are less skeptical of happiness",
            optionD: "artists have changed their focus of interest",
            value: 0
          }
        ],
        // 选择的初始为空
        value: 0,
        // 答案
        answerList: [],
        currentIndex: -1,
        currentContent: "",
        currentQuestion: "",
      }
    },
    created() {
      this.loading = true;
      this.groupId = this.$route.query.id;
    },
    mounted() {
      getCurrentQuestions({
        id: this.groupId
      }).then(res => {
        let questions = [];
        const {data} = res;
        for (let da of data) {
          questions.push({
            content: da.content,
            id: da.id
          })
        }
        this.contentData = questions;
        this.loading = false;
        this.reFlush(0)
      })
    },
    methods: {
      // 刷新当前页面展示的文章和问题以
      reFlush(currentIndex) {
        this.isFirstOne = (currentIndex === 0)
        this.isLastOne = (currentIndex === (this.contentData.length - 1));
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
      handleSubmit(e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$notification['error']({
              message: 'Received values of form:',
              description: values
            })
          }
        })
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
