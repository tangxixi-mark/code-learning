import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const docsRoot = path.resolve(__dirname, '..')

// 递归扫描 docs 下所有 .md 文件
function walkMdFiles(dir) {
  const result = []
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
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

function toPosix(p) {
  return p.split(path.sep).join('/')
}

function encodeRoute(route) {
  if (route === '/') return '/'

  const hasTrailingSlash = route.endsWith('/')
  const parts = route.split('/').filter(Boolean).map(encodeURIComponent)
  return '/' + parts.join('/') + (hasTrailingSlash ? '/' : '')
}

function toDocLink(relPath) {
  const noExt = toPosix(relPath).replace(/\.md$/, '')

  if (noExt === 'index') {
    return '/'
  }

  if (noExt.endsWith('/index')) {
    return encodeRoute('/' + noExt.slice(0, -'/index'.length) + '/')
  }

  return encodeRoute('/' + noExt)
}

function getDisplayText(relPath) {
  const posixPath = toPosix(relPath)
  const baseName = path.posix.basename(posixPath, '.md')

  if (baseName === 'index') {
    const parts = posixPath.split('/')
    if (parts.length === 1) return '首页'
    return parts[parts.length - 2]
  }

  return baseName.replace(/[-_]/g, ' ')
}

const allMdFiles = walkMdFiles(docsRoot)
  .map(file => toPosix(path.relative(docsRoot, file)))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))

// docs 根目录下的 md，例如 docs/python.md、docs/sql.md
const rootMdFiles = allMdFiles.filter(
  file => !file.includes('/') && file !== 'index.md'
)

// 一级目录，例如 刷题、读书、日记
const folders = [...new Set(
  allMdFiles
    .filter(file => file.includes('/'))
    .map(file => file.split('/')[0])
)].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))

function getFolderFiles(folder) {
  return allMdFiles
    .filter(file => file.startsWith(`${folder}/`))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
}

function generateNav() {
  const nav = [{ text: '首页', link: '/' }]

  // 根目录的其他 md 文件，做成一个下拉菜单
  if (rootMdFiles.length > 0) {
    nav.push({
      text: '其他',
      items: rootMdFiles.map(file => ({
        text: getDisplayText(file),
        link: toDocLink(file)
      }))
    })
  }

  // 每个一级目录一个入口，优先链接到该目录下的 index.md，没有就取第一个文件
  for (const folder of folders) {
    const files = getFolderFiles(folder)
    if (files.length === 0) continue

    const indexFile = files.find(file => file === `${folder}/index.md`)
    const entryFile = indexFile || files[0]

    nav.push({
      text: folder,
      link: toDocLink(entryFile)
    })
  }

  return nav
}

function generateSidebar() {
  const sidebar = {}

  // 根目录页面的侧边栏
  const rootItems = [
    { text: '首页', link: '/' },
    ...rootMdFiles.map(file => ({
      text: getDisplayText(file),
      link: toDocLink(file)
    }))
  ]

  sidebar['/'] = [
    {
      text: '总览',
      items: rootItems
    }
  ]

  // 各一级目录的侧边栏
  for (const folder of folders) {
    const files = getFolderFiles(folder)

    const items = files.map(file => ({
      text: getDisplayText(file),
      link: toDocLink(file)
    }))

    if (items.length === 0) continue

    sidebar[encodeRoute(`/${folder}/`)] = [
      {
        text: folder,
        items
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