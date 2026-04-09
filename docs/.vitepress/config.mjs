import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "CodeMemo",
  description: "算法刷题与知识整理",
  themeConfig: {
    // 开启本地搜索功能
    search: {
      provider: 'local'
    },
    // 顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '刷题日记', link: '/diary/2026-04-09' },
      { text: '题解仓库', link: '/solutions/two-sum' }
    ],
    // 左侧边栏（核心！）
    sidebar: {
      '/diary/': [
        {
          text: '📅 每日一题',
          items: [
            { text: '2026-04-09', link: '/diary/2026-04-09' }
          ]
        }
      ],
      '/solutions/': [
        {
          text: '🔥 热门必刷',
          items: [
            { text: '1. 两数之和', link: '/solutions/two-sum' },
            { text: '206. 反转链表', link: '/solutions/reverse-linked-list' }
          ]
        },
        {
          text: '📦 按数据结构',
          collapsed: false,  // false 表示默认展开
          items: [
            { text: '数组', link: '/solutions/array' },
            { text: '链表', link: '/solutions/linked-list' }
          ]
        }
      ]
    },
    // 右侧大纲深度（显示二级和三级标题）
    outline: [2, 3],
    // 文章底部的上一篇/下一篇文字
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  }
})
