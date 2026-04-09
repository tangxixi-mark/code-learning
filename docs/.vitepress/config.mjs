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
    // 忽略配置目录、静态资源目录、依赖目录、隐藏目录
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

// Windows 路径转成 / 分隔
function toPosix(p) {
  return p.split(path.sep).join('/')
}

// 把路由各段做 URL 编码，兼容中文路径
function encodeRoute(route) {
  if (route === '/') return '/'

  const hasTrailingSlash = route.endsWith('/')
  const parts = route.split('/').filter(Boolean).map(encodeURIComponent)

  return '/' + parts.join('/') + (hasTrailingSlash ? '/' : '')
}

// 相对路径转成 VitePress 链接
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

  // 其他普通 md -> /刷题/二分查找
  return encodeRoute('/' + noExt)
}

// 显示文本
function getDisplayText(relPath) {
  const posixPath = toPosix(relPath)
  const baseName = path.posix.basename(posixPath, '.md')

  // index.md 显示为所在目录名
  if (baseName === 'index') {
    const parts = posixPath.split('/')
    if (parts.length === 1) return '首页'
    return parts[parts.length - 2]
  }

  return baseName.replace(/[-_]/g, ' ')
}

// 全部 markdown 相对路径
const allMdFiles = walkMdFiles(docsRoot)
  .map(file => toPosix(path.relative(docsRoot, file)))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))

// docs 根目录下的 md，例如 docs/python.md、docs/sql.md
const rootMdFiles = allMdFiles.filter(
  file => !file.includes('/') && file !== 'index.md'
)

// 一级目录，例如：刷题、英语、作品集
const folders = [...new Set(
  allMdFiles
    .filter(file => file.includes('/'))
    .map(file => file.split('/')[0])
)].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))

// 获取某个一级目录下全部 md
function getFolderFiles(folder) {
  return allMdFiles
    .filter(file => file.startsWith(`${folder}/`))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
}

// 获取某个文件夹的入口链接：优先 index.md，没有就取第一个 md
function getFolderEntryLink(folder) {
  const files = getFolderFiles(folder)
  if (files.length === 0) return null

  const indexFile = files.find(file => file === `${folder}/index.md`)
  const entryFile = indexFile || files[0]

  return toDocLink(entryFile)
}

// 顶部导航
function generateNav() {
  const nav = [{ text: '首页', link: '/' }]

  // 根目录下其他 md 文件，放到“其他”下拉
  if (rootMdFiles.length > 0) {
    nav.push({
      text: '其他',
      items: rootMdFiles.map(file => ({
        text: getDisplayText(file),
        link: toDocLink(file)
      }))
    })
  }

  // 一级文件夹作为主导航
  for (const folder of folders) {
    const link = getFolderEntryLink(folder)
    if (!link) continue

    nav.push({
      text: folder,
      link
    })
  }

  return nav
}

// 侧边栏
function generateSidebar() {
  const sidebar = {}

  // 根目录侧边栏：显示首页、根目录 md、一级文件夹
  const rootItems = [
    { text: '首页', link: '/' },

    ...rootMdFiles.map(file => ({
      text: getDisplayText(file),
      link: toDocLink(file)
    })),

    ...folders
      .map(folder => {
        const link = getFolderEntryLink(folder)
        if (!link) return null

        return {
          text: folder,
          link
        }
      })
      .filter(Boolean)
  ]

  sidebar['/'] = [
    {
      text: '总览',
      items: rootItems
    }
  ]

  // 每个一级目录单独生成侧边栏
  for (const folder of folders) {
    const files = getFolderFiles(folder)
    if (files.length === 0) continue

    const items = files.map(file => ({
      text: getDisplayText(file),
      link: toDocLink(file)
    }))

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
    search: {
      provider: 'local'
    },
    outline: [2, 3],
    footer: {
      message: '保持思考，持续记录',
      copyright: '© 2026 瑀'
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/tangxixi-mark/code-learning'
      }
    ]
  },
  ignoreDeadLinks: true
})