# dailynote · 个人网站

一个安静、文字优先的个人网站。窄栏阅读布局、全小写文字、句中 pill 链接、手写签名和大量留白，背景柔和的奶油纸色与低饱和渐变。

当前项目位于 `dailynote/` 目录，默认使用 **Lando / Shanghai / your-handle / yourdomain.com** 作为占位信息，博客文章也是示例内容。上线前请替换成你自己的资料。

[English README](README.md)

## 技术栈

- **Next.js 16** — App Router、静态生成、Metadata API
- **React 19** + **TypeScript**
- **Tailwind CSS 4** — CSS-first 主题变量
- **Motion 14** — 入场动画，支持 `prefers-reduced-motion`
- `next/font/local` — 项目内自托管 Inter + Caveat WOFF2，构建和运行都不访问 Google Fonts
- **MDX 内容管线** — `next-mdx-remote` + `gray-matter` + `zod`，文章以文件形式管理并在构建时校验

## 页面

| 路径 | 说明 |
| --- | --- |
| `/` | 首页：头像、自我介绍、技术 pill、博客和 UX Lab 入口、社交链接 |
| `/blog` | 博客列表，布局参考 sanyam.sh/blogs |
| `/blog/[slug]` | 博客文章详情，包含正文和更多文章 |
| `/ux-lab` | UX 组件实验列表，布局参考 sanyam.sh/lab |
| `/ux-lab/[slug]` | 可交互的 UX 实验详情，包含说明、源码链接和更多实验 |
| `/track` | F1 赛道卡片列表 |
| `/track/[slug]` | 可交互赛道地图、弯道探索与赛道故事 |

## 本地运行

```bash
cd dailynote
npm install
npm run dev
```

打开 <http://localhost:3000>。

常用命令：

```bash
npm run build      # 生产构建
npm run start      # 启动生产服务
npm run lint       # ESLint
npm run typecheck  # TypeScript 类型检查
npm run dev:clean  # 清空 .next 后重新启动开发服务
```

如果全局 npm 缓存存在权限问题，可以指定临时缓存：

```bash
npm install --cache /tmp/npm-cache
```

## 启动排错

### 1. 报错 `Failed to load SWC binary for darwin/arm64`

说明 `node_modules` 里的 Next.js 编译器二进制不完整，通常是安装中断或移动 `node_modules` 导致的。重新安装即可：

```bash
rm -rf node_modules/@next/swc-darwin-arm64
npm install
```

如果还有其他依赖缺失，可以做一次干净安装：

```bash
rm -rf node_modules .next
npm ci
```

### 2. `localhost:3000` 一直转圈

通常是旧 dev server 仍占用端口，或者 `.next` 缓存与当前进程状态不一致：

```bash
# 查看占用 3000 端口的进程
lsof -nP -iTCP:3000 -sTCP:LISTEN

# 结束旧进程（把 PID 换成上一步输出的进程号）
kill <PID>

# 清缓存后重新启动
npm run dev:clean
```

### 3. 字体相关构建失败

项目已把 Inter 和 Caveat 放入 `src/fonts/`，通过 `next/font/local` 加载，不再依赖 Google Fonts 网络请求。

## 目录结构

```text
dailynote/
├─ content/
│  └─ blog/
│     └─ <slug>/
│        ├─ en.mdx               英文文章（frontmatter + MDX）
│        └─ zh.mdx               可选中文版本
├─ public/
│  └─ cartonAvator.png           头像，可替换成自己的照片
├─ src/
│  ├─ app/
│  │  ├─ page.tsx                首页
│  │  ├─ layout.tsx              字体、全局 metadata、skip link
│  │  ├─ globals.css             设计变量、背景、链接和文章样式
│  │  ├─ blog/
│  │  │  ├─ page.tsx             博客列表页
│  │  │  └─ [slug]/
│  │  │     └─ page.tsx          博客详情页
│  │  ├─ ux-lab/
│  │  │  ├─ page.tsx             UX 实验网格列表
│  │  │  └─ [slug]/
│  │  │     └─ page.tsx          可交互实验详情页
│  │  ├─ track/
│  │  │  ├─ page.tsx             F1 赛道卡片列表
│  │  │  └─ [slug]/
│  │  │     └─ page.tsx          交互式赛道详情页
│  │  ├─ opengraph-image.tsx     动态 OG 分享图
│  │  ├─ sitemap.ts              自动生成 sitemap
│  │  ├─ robots.ts               robots.txt
│  │  └─ icon.svg                favicon
│  ├─ components/
│  │  ├─ lab-demos.tsx           6 个可交互 UX 组件
│  │  ├─ lab-preview.tsx         列表卡片缩略预览
│  │  ├─ lab-more-list.tsx       更多实验列表
│  │  ├─ mdx.tsx                 MDX 代码块与 Callout
│  │  ├─ track-explorer.tsx      赛道 SVG、弯道标记与介绍卡
│  │  └─ ...                     其他 UI 组件
│  ├─ lib/
│  │  ├─ blog.ts                 文件系统博客加载 + Zod 校验
│  │  └─ date.ts                 文章日期格式化
│  ├─ data/
│  │  ├─ site.ts                 个人信息、邮箱、社交链接
│  │  ├─ lab.ts                  UX Lab mock 数据
│  │  ├─ tracks.ts               基础 F1 赛道数据
│  │  ├─ tracks-extra.ts         新增六条赛道数据
│  │  ├─ track-maps.json         赛道路径与弯道坐标
│  │  ├─ track-types.ts          赛道类型定义
│  │  └─ f1-circuits-LICENSE.txt 赛道几何数据 MIT 许可证
│  └─ fonts/
│     ├─ inter-latin.woff2       本地 Inter 可变字体
│     ├─ caveat-latin.woff2      本地 Caveat 手写字体
│     └─ OFL-*.txt               字体许可证
├─ .env.example                  环境变量示例
└─ package.json
```

## 自定义指南

### 1. 个人信息

编辑 [`src/data/site.ts`](src/data/site.ts)：

- `name`、`role`、`location`
- `email`
- `url`：线上域名
- `description`
- `socials`：GitHub、X、LinkedIn、Email 链接

### 2. 首页文案

在 [`src/app/page.tsx`](src/app/page.tsx) 中直接修改段落。

首页已经加入了：

```text
i also write blog
```

其中 **blog** 链接到 `/blog`。介绍段落里的 **lab of UX experiments** 链接到 `/ux-lab`，F1 段落里的 **track guide** 链接到 `/track`。如果想改文案或链接位置，直接修改对应段落即可。

### 3. 新增或编辑博客文章

博客已改为 **MDX 文件内容系统**，不再写在 TypeScript 数组里。每篇文章一个目录：

```text
content/blog/
  my-new-post/
    en.mdx
    zh.mdx        # 可选
```

`en.mdx` 示例：

```mdx
---
title: "my new post"
description: "一句用于列表和 SEO 的描述。"
date: "2026-11-01"
readingTime: "3 min read"
---

## 小标题

正文段落。

<Callout label="note">

需要强调的内容。

</Callout>
```

支持标准 Markdown 和 MDX：

- 标题 `##`
- 引用 `>`
- 列表 `-`
- 代码块
- 自定义 `<Callout>` 组件

frontmatter 会通过 [`src/lib/blog.ts`](src/lib/blog.ts) 里的 Zod schema 校验。保存后，博客列表、静态文章路由和 `sitemap.xml` 会在构建时自动更新。

### 4. 给文章增加中英切换

在同一个文章目录里额外放一个 `zh.mdx`，语言切换按钮会自动出现。中文文件同样使用 frontmatter：

```mdx
---
title: "我的新文章"
description: "中文摘要。"
date: "2026-11-01"
readingTime: "4 分钟阅读"
---

中文正文。
```

当前 `why var logs 3, 3, 3` 已经有完整的 `en.mdx` + `zh.mdx`，可以作为示例。没有 `zh.mdx` 的文章不会显示语言切换按钮，默认显示英文。

### 5. UX Lab 与交互组件

UX Lab 目前使用 mock 数据，分为三层：

- 实验文案：[`src/data/lab.ts`](src/data/lab.ts)
- 可交互组件：[`src/components/lab-demos.tsx`](src/components/lab-demos.tsx)
- 列表缩略预览：[`src/components/lab-preview.tsx`](src/components/lab-preview.tsx)

新增实验时，在 `labExperiments` 中添加一个对象，并复用已有的 `demo` 类型即可自动生成列表卡片和 `/ux-lab/[slug]` 详情页。当前包含：

- `tactile press`：按压手感的按钮
- `hold to confirm`：长按进度环确认
- `elastic toggle`：弹簧开关
- `magnetic button`：跟随指针的磁吸按钮
- `quiet focus`：浮动标签输入框
- `stagger shelf`：依次展开的卡片架

如果需要全新的交互类型，需要同时扩展 `LabDemoKind`、`lab-demos.tsx` 和 `lab-preview.tsx`。

### 6. F1 赛道指南

赛道页面位于 `/track`，详情页位于 `/track/[slug]`。当前包含九条赛道：

- monza
- zandvoort
- red bull ring
- shanghai
- spa
- singapore
- suzuka
- baku
- abu dhabi

赛道、弯道、圈速和介绍数据分为：

- [`src/data/tracks.ts`](src/data/tracks.ts)：最初三条赛道
- [`src/data/tracks-extra.ts`](src/data/tracks-extra.ts)：新增六条赛道及弯道说明
- [`src/data/track-maps.json`](src/data/track-maps.json)：赛道线路和弯道坐标
- [`src/components/track-explorer.tsx`](src/components/track-explorer.tsx)：交互式 SVG 地图、hover、点击、上/下一个弯与全部弯道导航

赛道轮廓来自 [bacinger/f1-circuits](https://github.com/bacinger/f1-circuits)（MIT），许可证文件在 [`src/data/f1-circuits-LICENSE.txt`](src/data/f1-circuits-LICENSE.txt)。弯道标记和部分文案为展示用近似内容，不代表官方计时或赛道数据；后续可以替换为官方数据或接入 CMS。

### 7. 替换头像

首页当前使用 [`public/cartonAvator.png`](public/cartonAvator.png)，由 [`src/components/avatar.tsx`](src/components/avatar.tsx) 中的 `next/image` 自动优化成小尺寸 WebP。

替换头像时：

1. 把新图片放到 `public/`。
2. 修改 [`src/components/avatar.tsx`](src/components/avatar.tsx) 中的 `src`。
3. 保持 `width` / `height` 为正方形，并按需调整 `sizes`。

### 8. 调整配色

配色集中在 [`src/app/globals.css`](src/app/globals.css) 顶部的 `:root`：

- `--canvas`：页面底色
- `--ink` / `--secondary` / `--muted`：文字层级
- `--fill`：pill 和 hover 背景
- `--sage` / `--clay` / `--sky` / `--plum`：强调色

背景的柔和渐变和颗粒纹理也在同一个文件里，可按需调整透明度或色相。

### 9. 域名与 SEO

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

然后填写：

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

该变量会用于 canonical、Open Graph、`robots.txt` 和 `sitemap.xml`。

## 部署

项目会静态生成所有页面，可以直接部署到 Vercel、Cloudflare Pages 或任意 Node 主机。

Vercel 部署时：

1. 将项目推送到 GitHub。
2. 在 Vercel 导入仓库，Root Directory 选择 `dailynote`。
3. 配置环境变量 `NEXT_PUBLIC_SITE_URL`。
4. 部署。

自托管：

```bash
npm run build
npm start
```

## 说明

- 支持 `prefers-reduced-motion`。
- 提供无 JavaScript 时仍可阅读的降级样式。
- 默认没有引入统计脚本或第三方追踪。
- 博客列表参考了参考站的无卡片、单行列表布局，使用细线、日期和圆角 hover 状态。
