import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/code-learning/',
  title: "学习记录",
  description: "刷题笔记与算法整理",
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '刷题日记', link: '/diary/2026-04-09' },
      { text: '题解仓库', link: '/solutions/two-sum' }
    ],
    sidebar: {
      '/diary/': [
        {
          text: '📅 每日记录',
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
          collapsed: false,
          items: [
            { text: '数组', link: '/solutions/array' },
            { text: '链表', link: '/solutions/linked-list' }
          ]
        }
      ]
    },
    outline: [2, 3],
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  }
})