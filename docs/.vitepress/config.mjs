import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/code-learning/',
  title: "学习笔记",
  description: "刷题、读书、知识整理",

  themeConfig: {
    // 顶部导航：简洁的几个入口
    nav: [
      { text: '首页', link: '/' },
      { text: '刷题', link: '/solutions/two-sum' },
      { text: '日记', link: '/diary/2026-04-09' }
    ],

    // 侧边栏：只保留你最核心的分类
    sidebar: {
      '/solutions/': [
        {
          text: '题解列表',
          items: [
            { text: '1. 两数之和', link: '/solutions/two-sum' },
            { text: '206. 反转链表', link: '/solutions/reverse-linked-list' }
          ]
        }
      ],
      '/diary/': [
        {
          text: '每日记录',
          items: [
            { text: '2026-04-09', link: '/diary/2026-04-09' }
          ]
        }
      ]
    },

    // 开启本地搜索
    search: {
      provider: 'local'
    },

    // 右侧大纲只显示二级标题
    outline: [2, 3],

    // 页脚
    footer: {
      message: '保持思考，持续记录',
      copyright: '© 2026 瑀'
    },

    // 右上角加个 GitHub 链接（可选）
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tangxixi-mark/code-learning' }
    ]
  }
})