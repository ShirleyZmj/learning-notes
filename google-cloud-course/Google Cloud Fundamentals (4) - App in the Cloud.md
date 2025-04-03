---
tags:
  - CloudRun
  - CloudRunFunctions
---
1. Cloud Run  #CloudRun

- **Cloud Run：**
    - Google Cloud 提供的托管计算平台，用于运行无状态容器。
    - 支持通过 Web 请求或 Pub/Sub 事件触发。
    - 属于 Serverless 计算，无需管理底层基础设施。
    - 基于 Knative 构建，可在 Google Cloud、GKE 或任何 Knative 环境中运行。
- **Serverless：**
    - 用户只需关注应用开发，无需管理服务器。
    - 自动伸缩，按实际使用资源计费。
- **Knative：**
    - 一个开源的，基于 Kubernetes 的平台，用于构建，部署和管理serverless工作负载。

**核心特点和操作：**

- **开发流程：**
    - 编写应用（支持多种编程语言）。
    - 将应用打包成容器镜像。
    - 将容器镜像推送到 Artifact Registry。
    - Cloud Run部署镜像，并提供https URL。
- **自动伸缩：**
    - 根据请求量自动增加或减少容器实例。
    - 从零开始近乎瞬时地扩展。
- **计费模式：**
    - 按容器处理请求时使用的资源计费（100毫秒粒度）。
    - 容器空闲时不计费。
    - 按请求次数收费。
    - 容器的cpu和内存资源影响价格。
- **部署方式：**
    - 容器镜像部署：直接部署容器镜像。
    - 源代码部署：Cloud Run 使用 Buildpacks 构建和打包容器镜像。
- **HTTPS 处理：**
    - Cloud Run 自动处理 HTTPS 服务，简化开发。
- **语言支持：**
    - 支持常用语言（Java、Python、Node.js、PHP、Go、C++）。
    - 支持其他 Linux 64 位编译的语言（Cobol、Haskell、Perl）。

**简而言之：**

Cloud Run 是一种 Serverless 容器运行平台，它简化了应用部署和管理，并支持多种语言和部署方式。通过自动伸缩和按需计费，Cloud Run 帮助用户降低了成本，并专注于应用开发。

2. Development in the cloud (Cloud Run Functions) #CloudRunFunctions
好的，这是对这段关于 Cloud Run Functions 的总结：

**核心概念：**

- **Cloud Run Functions：**
    - 轻量级、事件驱动、异步计算解决方案。
    - 允许创建小型、单一用途的函数，以响应云事件。
    - 无需管理服务器或运行时环境。
    - 用于构建应用程序工作流和连接/扩展云服务。
- **事件驱动：**
    - 函数在特定事件发生时自动运行（例如，文件上传）。
    - 适用于处理异步任务。
- **Serverless：**
    - 用户只需编写函数代码，无需管理底层基础设施。

**核心特点和操作：**

- **适用场景：**
    - 图像处理、数据转换、文件存储等事件驱动型任务。
    - 构建由独立业务逻辑任务组成的应用程序工作流程。
    - 连接和扩展云服务。
- **计费模式：**
    - 按代码运行时间计费（100 毫秒粒度）。
    - 代码空闲时不计费。
- **语言支持：**
    - Node.js、Python、Go、Java、.Net Core、Ruby、PHP。
    - 具体支持版本请参考运行时文档。
- **触发方式：**
    - Cloud Storage 和 Pub/Sub 事件（异步）。
    - HTTP 调用（同步）。

**简而言之：**

Cloud Run Functions 是一种 Serverless 的事件驱动计算服务，它允许用户编写和部署小型、单一用途的函数，以响应云事件。它简化了事件驱动型应用程序的开发和管理，并按实际运行时间计费。