
![[Pasted image 20250326184131.png]]

### **Kubernetes 语法与命令概述**

在 **Kubernetes** 中，管理对象（如 Pods、Deployments 和 Services）时可以使用两种命令方式：**命令式（Imperative）** 和 **声明式（Declarative）**。

#### **1️⃣ 命令式（Imperative）命令**

命令式命令是即时执行的操作，会直接作用于现有的对象或配置文件。它们会覆盖已存在对象的状态。

常见命令：

- **kubectl run**: 创建一个新的 Deployment 或 Pod，并启动容器。
- **kubectl create**: 根据定义的配置文件创建新的资源对象。
- **kubectl replace**: 替换现有对象，更新现有资源。
- **kubectl delete**: 删除指定的资源对象。
- **kubectl expose**: 创建一个 Service 并将流量分发给 Pods。

```bash
kubectl run my-deployment --image=nginx
kubectl create -f deployment.yaml
kubectl delete pod my-pod
```

#### **2️⃣ 声明式（Declarative）命令**

声明式命令通过 **配置文件** 来描述和部署资源对象。使用 `kubectl apply` 命令将配置应用到集群中。声明式方法不需要显式地使用 `create`、`replace` 或 `delete` 命令，而是基于配置文件的定义来管理资源。

常见命令：

- **kubectl apply -f <目录或配置文件>**: 应用或更新资源对象。
- **kubectl get**: 获取集群中指定资源的信息。
- **kubectl describe**: 显示资源对象的详细信息。

```bash
kubectl apply -f deployment.yaml  # 更新或创建 Deployment
kubectl get deployments  # 获取 Deployment 列表
kubectl describe service my-service  # 查看 Service 详情
```

#### **重要概念与配置示例**

##### **1️⃣ Deployment 配置示例**

`Deployment` 用于管理多个副本的 Pods。其 `spec.template` 部分定义了 Pod 的模版，包括标签、容器名称和镜像等。

Deployment 的重要配置项：

- **kind**: Deployment 类型
- **replicas**: Pod 副本数（例如，3）
- **spec.template**: Pod 模板，定义 Pod 的标签、容器名称及镜像

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-container
          image: nginx
```

#### **2️⃣ Service 配置示例**

`Service` 用于定义一个或多个 Pod 的访问入口，并提供负载均衡。Service 使用 `spec.selector` 选择 Pod。

Service 的重要配置项：

- **kind**: Service 类型
- **spec.selector**: 服务选择器，匹配要暴露的 Pod 标签。
- **spec.ports**: 定义暴露端口的配置，包括 `port`（Service 端口）和 `targetPort`（Pod 内的端口）。

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app  # 匹配 Pod 的标签
  ports:
    - protocol: TCP
      port: 80  # Service 暴露的端口
      targetPort: 80  # Pod 内的端口
```

#### **总结**

|**命令类型**|**操作方式**|**常见命令**|**优点**|
|---|---|---|---|
|**命令式**|即时执行命令|`kubectl create`，`kubectl delete`|直接对资源进行修改和操作|
|**声明式**|基于配置文件部署|`kubectl apply -f`，`kubectl get`|管理和部署资源的声明性方式|

- **命令式**适合于临时的或单次操作，如创建或删除资源。
- **声明式**更适合持续管理和部署，特别是在 DevOps 流程中，因为它允许配置文件版本控制并且自动化应用更新。

---

💡 **使用场景**：

- **命令式**：快速创建/删除资源，适合实验性操作。
- **声明式**：推荐用于持续集成（CI）和持续交付（CD），配置文件存储和自动化管理。