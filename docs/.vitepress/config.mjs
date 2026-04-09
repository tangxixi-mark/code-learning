import { defineConfig } from 'vitepress'
import { readdirSync, statSync, existsSync, readFileSync } from 'fs'
import { join, basename } from 'path'

// 获取 docs 目录路径
const docsPath = join(process.cwd(), 'docs')

// 自动扫描 docs 下的一级子目录（排除 .vitepress、public 和以 . 开头的隐藏目录）
function getModules() {
  return readdirSync(docsPath).filter(dir => {
    const fullPath = join(docsPath, dir)
    return statSync(fullPath).isDirectory() && !dir.startsWith('.') && dir !== 'public'
  })
}

// 根据文件夹名生成导航文字（首字母大写，其余保持）
function formatModuleName(dir) {
  return dir.charAt(0).toUpperCase() + dir.slice(1)
}

// 获取模块的默认链接：取文件夹内的第一个 .md 文件，如果没有则链接到该文件夹下的 index.md
function getModuleLink(moduleDir) {
  const modulePath = join(docsPath, moduleDir)
  const files = readdirSync(modulePath).filter(f => f.endsWith('.md'))
  if (files.length > 0) {
    // 优先使用 index.md，否则用第一个文件
    const indexFile = files.find(f => f === 'index.md') || files[0]
    return `/${moduleDir}/${indexFile.replace(/\.md$/, '')}`
  }
  return `/${moduleDir}/` // fallback
}

// 自动生成导航栏
function generateNav() {
  const modules = getModules()
  const nav = [{ text: '首页', link: '/' }]
  modules.forEach(mod => {
    nav.push({
      text: formatModuleName(mod),
      link: getModuleLink(mod)
    })
  })
  return nav
}

// 自动生成侧边栏：为每个模块扫描其文件夹下的 .md 文件
function generateSidebar() {
  const modules = getModules()
  const sidebar = {}
  modules.forEach(mod => {
    const modulePath = join(docsPath, mod)
    const files = readdirSync(modulePath)
      .filter(f => f.endsWith('.md') && f !== 'index.md') // 排除 index.md（如果希望 index 也显示，可去掉过滤）
      .map(f => {
        const name = f.replace(/\.md$/, '')
        return {
          text: name.replace(/-/g, ' '),
          link: `/${mod}/${name}`
        }
      })
    
    // 如果模块下有 index.md，可以把它作为模块概述链接放在侧边栏顶部（可选）
    const hasIndex = existsSync(join(modulePath, 'index.md'))
    const items = []
    if (hasIndex) {
      items.push({ text: '概述', link: `/${mod}/` })
    }
    items.push(...files)
    
    sidebar[`/${mod}/`] = [
      {
        text: formatModuleName(mod),
        items: items
      }
    ]
  })
  return sidebar
}

export default defineConfig({
  base: '/code-learning/',
  title: "学习笔记",
  description: "刷题、读书、知识整理",

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
  }
})