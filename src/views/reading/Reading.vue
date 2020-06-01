<template>
  <div>
    <a-card :bordered="false">
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

    <a-card :loading="loading" title="Text 1">
      <a-button-group slot="extra">
        <a-button type="primary" :disabled="isFirstOne">
          <a-icon type="left"/>
          上一篇
        </a-button>
        <a-button type="primary" :disabled="isLastOne">
          下一篇
          <a-icon type="right"/>
        </a-button>
      </a-button-group>
      <div v-html="contentData.text1"></div>
    </a-card>
    <div v-for="question in questionData">
      <a-card bordered="true">
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

  const text1 = `
  <blockquote>
\t<p>
\t\t<span style="font-family:KaiTi_GB2312;line-height:2;font-size:18px;"><strong>&nbsp; </strong></span><span style="font-size:18px;font-family:KaiTi_GB2312;line-height:2;"><strong>&nbsp; &nbsp;You could argue that art became more skeptical of happiness because modern times have seen so much misery. But it’s not as if earlier times didn’t know perpetual war, disaster and the massacre of innocents. The reason, in fact, may be just the opposite: there is too much damn happiness in the world today.</strong></span>
\t</p>
\t<p>
\t\t<span style="font-size:16px;font-family:KaiTi_GB2312;line-height:2;"><strong><span style="font-size:18px;">&nbsp; &nbsp; &nbsp;After all, what is the one modern</span><span style="font-size:18px;"> form of expression almost completely dedicated to depicting happiness? Advertising. The rise of anti-happy art almost exactly tracks the emergence of mass media, and with it, a commercial culture in which happiness is not just an ideal but an ideology.</span></strong></span>
\t</p>
\t<p>
\t\t<span style="font-size:18px;font-family:KaiTi_GB2312;line-height:2;"><strong>&nbsp; &nbsp; &nbsp; Many things make people think artists are weird. But the weirdest may be this: artists’ only job is to explore emotions, and yet they choose to focus on the ones that feel bad.</strong></span>
\t</p>
\t<p>
\t\t<span style="font-size:18px;font-family:KaiTi_GB2312;line-height:2;"><strong>&nbsp; &nbsp; This wasn’t always so. The earliest forms of art, like painting and music, are those best suited for expressing joy. But somewhere from the 19th century onward, more artists began seeing happiness as meaningless, phony or, worst of all, boring, as we went from Wordsworth’s daffodils to Baudelaire’s flowers of evil.</strong></span>
\t</p>
\t<p>
\t\t<span style="font-size:18px;font-family:KaiTi_GB2312;line-height:2;"><strong>&nbsp; &nbsp; &nbsp;People in earlier eras were surrounded by reminders of misery. They worked until exhausted, lived with few protections and died young. In the West, before mass communication and literacy, the most powerful mass medium was the church, which reminded worshippers that their souls were in danger and that they would someday be meat for worms. Given all this, they did not exactly need their art to be a bummer too.</strong></span>
\t</p>
\t<p>
\t\t<span style="font-size:18px;font-family:KaiTi_GB2312;line-height:2;"><strong>&nbsp; &nbsp; &nbsp;Today the messages the average Westerner is surrounded with are not religious but commercial, and forever happy. Fast-food eaters, news anchors, text messengers, all smiling, smiling, smiling. Our magazines feature beaming celebrities and happy families in perfect homes. And since these messages have an agenda -- to lure us to open our wallets -- they make the very idea of happiness seem unreliable. “Celebrate!” commanded the ads for the arthritis drug Celebrex, before we found out it could increase the risk of heart attacks.</strong></span>
\t</p>
\t<p>
\t\t<span style="font-size:16px;font-family:SimHei;"><span style="font-family:KaiTi_GB2312;line-height:2;font-size:18px;"><strong>&nbsp; &nbsp; &nbsp; But what we forget -- what our economy depends on us forgetting -- is that happiness is more than pleasure without pain. The things that bring the greatest joy carry the greatest potential for loss and disappointment. Today, surrounded by promises of easy happiness, we need art to tell us, as religion once did, Memento mori: remember that you will die, that everything ends, and that happiness comes not in denying this but in living with it. It’s a message even more bitter than a clove cigarette, yet, somehow, a breath of fresh air.</strong></span><span style="font-family:KaiTi_GB2312;line-height:2;"><strong></strong></span></span>
\t</p>
</blockquote>
  `
  export default {
    name: 'ReadingContent',
    components: {
      HeadInfo
    },
    data() {
      return {
        // card占位
        loading: false,
        // 是第一篇吗
        isFirstOne: true,
        // 是最后一篇吗
        isLastOne: false,
        // 文章data
        contentData: {
          text1: text1
        },
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
        value: 0,
        // 答案
        answerList: [{}]
      }
    },
    created() {
      console.log(this.$route.query);
    },
    methods: {}
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
