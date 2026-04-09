import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// docs 目录
const docsRoot = path.resolve(__dirname, '..')

// 递归扫描所有 .md 文件
function walkMdFiles(dir) {
  const result = []
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    // 跳过隐藏目录、public、node_modules
    if (
      entry.name.startsWith('.') ||
      entry.name === 'public' ||
      entry.name === 'node_modules'
    ) {
      continue
    }

    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      result.push(...walkMdFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      result.push(fullPath)
    }
  }

  return result
}

// 统一成 / 分隔符
function toPosix(filePath) {
  return filePath.split(path.sep).join('/')
}

// 把中文路径转成 URL 可用格式
function encodeRoute(route) {
  if (route === '/') return '/'

  const hasTrailingSlash = route.endsWith('/')
  const parts = route.split('/').filter(Boolean).map(encodeURIComponent)
  return '/' + parts.join('/') + (hasTrailingSlash ? '/' : '')
}

// 文件路径转 VitePress 链接
function toDocLink(relPath) {
  const noExt = toPosix(relPath).replace(/\.md$/, '')

  // docs/index.md -> /
  if (noExt === 'index') {
    return '/'
  }

  // docs/刷题/index.md -> /刷题/
  if (noExt.endsWith('/index')) {
    return encodeRoute('/' + noExt.slice(0, -'/index'.length) + '/')
  }

  // 普通文档 -> /刷题/二分查找
  return encodeRoute('/' + noExt)
}

// 取所有 markdown 文件相对路径
const allMdFiles = walkMdFiles(docsRoot)
  .map(file => toPosix(path.relative(docsRoot, file)))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))

// 提取一级目录名
const folders = [...new Set(
  allMdFiles
    .filter(file => file.includes('/')) // 只取子目录中的 md
    .map(file => file.split('/')[0])
)].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))

function getFolderFiles(folder) {
  return allMdFiles
    .filter(file => file.startsWith(`${folder}/`) && file.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
}

function formatTextFromFile(relPath) {
  const name = path.posix.basename(relPath, '.md')

  // index.md 显示成文件夹名
  if (name === 'index') {
    return relPath.split('/')[0]
  }

  return name.replace(/[-_]/g, ' ')
}

// 生成顶部导航
function generateNav() {
  const nav = [{ text: '首页', link: '/' }]

  for (const folder of folders) {
    const firstFile = getFolderFiles(folder)[0]
    if (!firstFile) continue

    nav.push({
      text: folder,
      link: toDocLink(firstFile)
    })
  }

  return nav
}

// 生成侧边栏
function generateSidebar() {
  const sidebar = {}

  for (const folder of folders) {
    const files = getFolderFiles(folder).map(file => ({
      text: formatTextFromFile(file),
      link: toDocLink(file)
    }))

    if (files.length === 0) continue

    sidebar[encodeRoute(`/${folder}/`)] = [
      {
        text: folder,
        items: files
      }
    ]
  }

  return sidebar
}

export default defineConfig({
  base: '/code-learning/',
  title: '学习笔记',
  description: '个人学习记录',
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
  ignoreDeadLinks: true
})