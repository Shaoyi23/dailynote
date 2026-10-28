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
| `/` | 首页：头像、自我介绍、技术 pill、博客入口、社交链接 |
| `/blog` | 博客列表，布局参考 sanyam.sh/blogs |
| `/blog/[slug]` | 博客文章详情，包含正文和更多文章 |

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
│  └─ avatar.svg                 头像插画，可替换成自己的照片
├─ src/
│  ├─ app/
│  │  ├─ page.tsx                首页
│  │  ├─ layout.tsx              字体、全局 metadata、skip link
│  │  ├─ globals.css             设计变量、背景、链接和文章样式
│  │  ├─ blog/
│  │  │  ├─ page.tsx             博客列表页
│  │  │  └─ [slug]/
│  │  │     └─ page.tsx          博客详情页
│  │  ├─ opengraph-image.tsx     动态 OG 分享图
│  │  ├─ sitemap.ts              自动生成 sitemap
│  │  ├─ robots.ts               robots.txt
│  │  └─ icon.svg                favicon
│  ├─ components/                UI 组件
│  ├─ data/
│  │  ├─ site.ts                 个人信息、邮箱、社交链接
│  │  └─ posts.ts                博客文章数据
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

其中 **blog** 链接到 `/blog`。如果想改文案或链接位置，直接修改对应段落即可。

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

- `paragraph`
- `heading`
- `quote`
- `list`

保存后，博客列表、文章静态路由和 `sitemap.xml` 会自动更新，不需要额外配置。

### 4. 替换头像

替换 [`public/avatar.svg`](public/avatar.svg) 即可。如果使用 JPG/PNG：

1. 把图片放到 `public/`。
2. 修改 [`src/components/avatar.tsx`](src/components/avatar.tsx) 中的 `src`。
3. 移除 `unoptimized`，并补上合适的 `alt` 文案。

### 5. 调整配色

配色集中在 [`src/app/globals.css`](src/app/globals.css) 顶部的 `:root`：

- `--canvas`：页面底色
- `--ink` / `--secondary` / `--muted`：文字层级
- `--fill`：pill 和 hover 背景
- `--sage` / `--clay` / `--sky` / `--plum`：强调色

背景的柔和渐变和颗粒纹理也在同一个文件里，可按需调整透明度或色相。

### 6. 域名与 SEO

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
