# dailynote · 个人网站

一个安静、文字优先的个人网站。视觉参考 [sanyam.sh](https://sanyam.sh/)：窄栏阅读布局、全小写文字、句中 pill 链接、手写签名和大量留白，背景改成了更柔和的奶油纸色与低饱和渐变。

当前项目位于 `dailynote/` 目录，默认使用 **Lando / Shanghai / your-handle / yourdomain.com** 作为占位信息，博客文章也是示例内容。上线前请替换成你自己的资料。

[English README](README.md)

## 技术栈

- **Next.js 16** — App Router、静态生成、Metadata API
- **React 19** + **TypeScript**
- **Tailwind CSS 4** — CSS-first 主题变量
- **Motion 14** — 入场动画，支持 `prefers-reduced-motion`
- `next/font/local` — 项目内自托管 Inter + Caveat WOFF2，构建和运行都不访问 Google Fonts

## 页面

| 路径 | 说明 |
| --- | --- |
| `/` | 首页：头像、自我介绍、技术 pill、博客和 UX Lab 入口、社交链接 |
| `/blog` | 博客列表，布局参考 sanyam.sh/blogs |
| `/blog/[slug]` | 博客文章详情，包含正文和更多文章 |
| `/ux-lab` | UX 组件实验列表，布局参考 sanyam.sh/lab |
| `/ux-lab/[slug]` | 可交互的 UX 实验详情，包含说明、源码链接和更多实验 |

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
│  │  ├─ opengraph-image.tsx     动态 OG 分享图
│  │  ├─ sitemap.ts              自动生成 sitemap
│  │  ├─ robots.ts               robots.txt
│  │  └─ icon.svg                favicon
│  ├─ components/
│  │  ├─ lab-demos.tsx           6 个可交互 UX 组件
│  │  ├─ lab-preview.tsx         列表卡片缩略预览
│  │  ├─ lab-more-list.tsx       更多实验列表
│  │  └─ ...                     其他 UI 组件
│  ├─ data/
│  │  ├─ site.ts                 个人信息、邮箱、社交链接
│  │  ├─ posts.ts                博客文章数据
│  │  └─ lab.ts                  UX Lab mock 数据
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

其中 **blog** 链接到 `/blog`。介绍段落里的 **lab of UX experiments** 链接到 `/ux-lab`。如果想改文案或链接位置，直接修改对应段落即可。

### 3. 新增或编辑博客文章

所有文章都在 [`src/data/posts.ts`](src/data/posts.ts) 的 `posts` 数组中。

新增一篇文章时，把对象放在数组顶部：

```ts
{
  slug: "my-new-post",
  title: "my new post",
  description: "一句用于列表和 SEO 的描述。",
  date: "2026-11-01",
  readingTime: "3 min read",
  content: [
    { type: "paragraph", text: "正文段落。" },
    { type: "heading", text: "小标题" },
    { type: "quote", text: "引用。" },
    { type: "list", items: ["列表项一", "列表项二"] },
  ],
}
```

支持的内容块类型：

- `paragraph`：正文段落
- `heading`：小标题
- `quote`：引用
- `list`：无序列表
- `code`：带行号和轻量语法高亮的代码块
- `callout`：用于答案、提示等强调内容

保存后，博客列表、文章静态路由和 `sitemap.xml` 会自动更新，不需要额外配置。

### 4. 给文章增加中英切换

在文章对象中加入可选的 `translation` 字段，详情页就会自动显示 `EN / 中文` 切换按钮。默认仍然显示英文：

```ts
{
  slug: "my-new-post",
  title: "my new post",
  // ...英文内容
  translation: {
    lang: "zh-CN",
    label: "中文",
    title: "我的新文章",
    description: "中文摘要。",
    readingTime: "4 分钟阅读",
    content: [
      { type: "paragraph", text: "中文正文段落。" },
    ],
  },
}
```

当前 `why var logs 3, 3, 3` 这篇文章已经带有完整的中文翻译，可以作为示例。没有 `translation` 字段的文章不会显示语言切换按钮。

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

### 6. 替换头像

首页当前使用 [`public/cartonAvator.png`](public/cartonAvator.png)，由 [`src/components/avatar.tsx`](src/components/avatar.tsx) 中的 `next/image` 自动优化成小尺寸 WebP。

替换头像时：

1. 把新图片放到 `public/`。
2. 修改 [`src/components/avatar.tsx`](src/components/avatar.tsx) 中的 `src`。
3. 保持 `width` / `height` 为正方形，并按需调整 `sizes`。

### 7. 调整配色

配色集中在 [`src/app/globals.css`](src/app/globals.css) 顶部的 `:root`：

- `--canvas`：页面底色
- `--ink` / `--secondary` / `--muted`：文字层级
- `--fill`：pill 和 hover 背景
- `--sage` / `--clay` / `--sky` / `--plum`：强调色

背景的柔和渐变和颗粒纹理也在同一个文件里，可按需调整透明度或色相。

### 8. 域名与 SEO

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
