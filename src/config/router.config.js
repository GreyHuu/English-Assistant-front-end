import {UserLayout, BasicLayout, RouteView, BlankLayout, PageView} from '@/layouts'
import {bxAnaalyse} from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {title: '首页'},
    redirect: '/news/reading',
    children: [
      // 新闻拓展
      {
        path: '/news',
        name: 'news',
        redirect: '/news/reading',
        component: RouteView,
        meta: {
          title: '新闻拓展',
          icon: "profile",
          keepAlive: true,
        },
        children: [
          {
            path: '/news/reading',
            name: 'news_reading',
            component: () => import('@/views/dashboard/Analysis'),
            meta: {
              title: '英语新闻',
              keepAlive: true,
            }
          },
          {
            path: '/news/record',
            name: 'news_record',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {
              title: '我的评论',
              keepAlive: true,
            }
          }
        ]
      },
      //单词背诵
      {
        path: '/words',
        name: "words",
        redirect: '/words/make_plan',
        component: PageView,
        meta: {
          title: '单词背诵',
          icon: 'edit'
        },
        children: [
          {
            path: '/words/make_plan',
            name: 'make_plan',
            component: () => import('@/views/form/BasicForm'),
            meta: {
              title: '制定计划',
              keepAlive: true
            }
          },
          {
            path: '/words/recite_words',
            name: 'recite_words',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: {
              title: '背诵单词',
              keepAlive: true
            }
          },
          {
            path: '/words/review_new_words',
            name: 'review_new_words',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: {
              title: '生词复习',
              keepAlive: true
            }
          }
        ]
      },
      // 作文练习
      {
        path: '/writing',
        name: 'writing',
        component: PageView,
        redirect: '/writing/composition_bank',
        meta: {
          title: '作文练习',
          icon: 'snippets'
        },
        children: [
          {
            path: '/writing/composition_bank',
            name: 'composition_bank',
            component: () => import('@/views/list/TableList'),
            meta: {
              title: '作文题库',
              keepAlive: true
            }
          },
          {
            path: '/writing/my_composition',
            name: 'my_composition',
            component: () => import('@/views/list/StandardList'),
            meta: {
              title: '我的作文',
              keepAlive: true
            }
          }]
      },

      // 阅读理解
      {
        path: '/reading',
        name: 'reading',
        component: PageView,
        redirect: '/reading/reading_groups',
        meta: {
          title: '阅读理解',
          icon: 'profile'
        },
        children: [
          {
            path: '/reading/reading_groups',
            name: 'reading_groups',
            component: () => import('@/views/reading/ReadingGroup'),
            meta: {
              title: '阅读练习',
              keepAlive: true,
            }
          },
          {
            path: "/reading/reading_groups/reading",
            name: "reading_content",
            hidden: true,
            component: () => import('@/views/reading/Reading'),
            meta: {
              title: '阅读文章',
              keepAlive: true,
            }
          },
          {
            path: '/reading/reading_lists',
            name: 'reading_lists',
            component: () => import('@/views/reading/ReadingList'),
            meta: {
              title: '阅读记录',
              keepAlive: true,
            }
          }
        ]
      },
      // 个人信息
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: {
          title: '个人信息',
          icon: 'user',
          keepAlive: true
        },
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: {
              title: '个人信息设置',
              hideHeader: true,
            },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: {
                  title: '基本设置', hidden: true
                }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: '安全设置',
                  hidden: true,
                  keepAlive: true
                }
              }
            ]
          }
        ]
      },

      // 结果页
      {
        path: '/result',
        name: 'result',
        hidden: true,
        component: PageView,
        redirect: '/result/success',
        meta: {title: '结果页', icon: 'check-circle-o', permission: ['result']},
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: {title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: ['result']}
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: {title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: ['result']}
          }
        ]
      },

      // 异常页
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        hidden: true,
        redirect: '/exception/403',
        meta: {title: '异常页', icon: 'warning', permission: ['exception']},
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: {title: '403', permission: ['exception']}
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: {title: '404', permission: ['exception']}
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: {title: '500', permission: ['exception']}
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
