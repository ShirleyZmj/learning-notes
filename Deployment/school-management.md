要将您的 **Turborepo** 项目免费部署到云端，您可以考虑以下方案：

### 1. 前端（Next.js）

- **Vercel**：Vercel 是 Next.js 的开发公司，提供 **免费托管服务**，支持自动化部署和 CI/CD。

  **步骤**：

  1. 在 Vercel 平台上创建一个新项目，并连接到您的 Git 仓库。

  2. Vercel 将自动检测到 Next.js 项目，并进行部署。

  3. 每次推送代码时，Vercel 会自动重新部署。

  **参考**：

  - [Next.js 部署 - 稀土掘金](https://juejin.cn/post/7401354593588117545)

  - [使用 Vercel 免费部署 Node 后端 - 稀土掘金](https://juejin.cn/post/7410760487812415488)

### 2. 后端（Nest.js）

- **Vercel**：除了前端，Vercel 也支持 Node.js 后端的无服务器函数部署。

  **步骤**：

  1. 在 `api` 文件夹中，添加一个 `vercel.json` 配置文件，指定构建和输出目录。

  2. 确保您的 Nest.js 项目可以作为无服务器函数运行。

  3. 将 `api` 文件夹部署到 Vercel。

- **腾讯云 Serverless**：腾讯云提供 **SCF（Serverless Cloud Function）**，支持快速部署 Nest.js 应用。

  **步骤**：

  1. 在腾讯云控制台，选择 **Serverless 应用中心**。

  2. 选择 **Nest.js** 模板，按照指引部署。

  3. 部署完成后，您将获得一个 API 网关 URL，用于访问您的后端服务。

  **参考**：

  - [容器化部署 Next.js 和 Nest.js 应用 - 三水言己](https://ezirmusitua.site/blog/nextjs-nestjs-deployment)

  - [Nest.js 实战：前后端分离项目部署的最佳实践 - CSDN](https://blog.csdn.net/qq_36117388/article/details/143059949)

### 3. 数据库（PostgreSQL）

- **Supabase**：Supabase 提供免费的 PostgreSQL 数据库托管服务，适合开发和小型项目。

  **步骤**：

  1. 在 Supabase 注册并创建一个新项目。

  2. 获取数据库连接字符串，并在 Nest.js 项目中配置数据库连接。

  3. 使用 Supabase 提供的管理界面，管理您的数据库。

通过上述方案，您可以在不增加成本的情况下，将您的 Turborepo 项目部署到云端。 