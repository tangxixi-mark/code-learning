import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/code-learning/',
  title: "瑀的个人学习站",
  description: "学习轨迹、读书、刷题与作品集",
  appearance: 'dark',   // 强制深色模式
  theme: './theme/index.js',  // 使用自定义主题

  themeConfig: {
    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '学习记录', link: '/learning' },
      { text: '读书', link: '/reading' },
      { text: '刷题', link: '/practice' },
      { text: '知识专题', link: '/knowledge' },
      { text: '作品集', link: '/portfolio' },
      { text: '关于', link: '/about' }
    ],

    // 侧边栏（每个页面独立配置）
    sidebar: {
      '/': [],
      '/learning': [],
      '/reading': [],
      '/practice': [],
      '/knowledge': [],
      '/portfolio': [],
      '/about': []
    },

    // 搜索
    search: { provider: 'local' },
    
    // 右侧大纲
    outline: [2, 3],
    
    // 页脚（可选）
    footer: {
      message: '持续记录，持续成长',
      copyright: '© 2026 瑀'
    },

    // 社交链接（右上角GitHub图标）
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tangxixi-mark/code-learning' }
    ]
  }
})