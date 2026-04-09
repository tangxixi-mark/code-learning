import { defineConfig } from 'vitepress'

// 使用 Vite 的 glob 导入，无需 fs，支持中文路径
const modules = import.meta.glob('/docs/**/*.md', { eager: true, as: 'raw' })
const filePaths = Object.keys(modules)

// 提取所有一级文件夹名（例如 '刷题', '日记', '读书'）
const folders = [...new Set(
  filePaths
    .map(path => {
      const match = path.match(/^\/docs\/([^/]+)\//)
      return match ? decodeURIComponent(match[1]) : null
    })
    .filter(name => name && !name.startsWith('.') && name !== 'public')
)]

// 生成导航栏：每个文件夹一个入口，链接到文件夹下第一个 .md 文件
function generateNav() {
  const nav = [{ text: '首页', link: '/' }]
  folders.forEach(folder => {
    // 找到该文件夹下的第一个 .md 文件
    const firstFile = filePaths
      .filter(p => p.startsWith(`/docs/${encodeURIComponent(folder)}/`) && p.endsWith('.md'))
      .sort()[0]
    if (firstFile) {
      const link = firstFile.replace(/^\/docs/, '').replace(/\.md$/, '')
      nav.push({
        text: folder,
        link: link
      })
    }
  })
  return nav
}

// 生成侧边栏：每个文件夹一个分组，包含该文件夹下所有 .md 文件
function generateSidebar() {
  const sidebar = {}
  folders.forEach(folder => {
    const encodedFolder = encodeURIComponent(folder)
    const files = filePaths
      .filter(p => p.startsWith(`/docs/${encodedFolder}/`) && p.endsWith('.md'))
      .map(p => {
        const fileName = p.split('/').pop().replace(/\.md$/, '')
        const decodedFileName = decodeURIComponent(fileName)
        const link = p.replace(/^\/docs/, '').replace(/\.md$/, '')
        return {
          text: decodedFileName.replace(/-/g, ' '),
          link: link
        }
      })
      .sort((a, b) => a.text.localeCompare(b.text))
    
    sidebar[`/${folder}/`] = [
      {
        text: folder,
        items: files
      }
    ]
  })
  return sidebar
}

export default defineConfig({
  base: '/code-learning/',
  title: "学习笔记",
  description: "个人学习记录",
  themeConfig: {
    nav: generateNav(),
    sidebar: generateSidebar(),
    search: { provider: 'local' },
    outline: [2, 3],
    footer: {
      message: '保持思考，持续记录',
      copyright: '© 2026 瑀'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tangxixi-mark/code-learning' }
    ]
  },
  // 忽略死链检查，避免中文编码问题误报（可选）
  ignoreDeadLinks: true
})