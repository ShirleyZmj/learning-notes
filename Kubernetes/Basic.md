![[Pasted image 20250326183950.png]]
### **Kubernetes 基本概念解释**

#### **1️⃣ 什么是 Pod？**

Pod 是 **Kubernetes 中最小的可部署单元**，它是一个正在运行的进程实例，包含一个或多个 **Docker 容器**。

- **Pod 的作用：**
    - 为容器提供 **网络** 和 **存储**。
    - 允许多个容器 **共享存储卷** 和 **网络**。
    - 运行时环境包含容器的所有 **依赖项**，确保容器能够正常运行并通信。

📌 **Pod 示例**：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
    - name: my-container
      image: nginx
      ports:
        - containerPort: 80
```

---

#### **2️⃣ 什么是 Deployment？**

Deployment（部署）用于 **管理多个相同的 Pod**，并通过 **ReplicaSet** 定义 **Pod 副本的数量**。

- **Deployment 的作用：**
    - **自动监控 Pods**，如果某个 Pod 崩溃，会自动 **替换** 以保持应用高可用。
    - 允许 **滚动更新（Rolling Update）**，即逐步替换旧 Pod，确保无中断升级。
    - **使用 Pod 模板（Pod Template）** 定义 Pod 规范。

📌 **Deployment 示例**（定义 3 个 `nginx` 副本）：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 3  # 运行 3 个 Pod 副本
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
          ports:
            - containerPort: 80
```

---

#### **3️⃣ 什么是 Service？**

Service（服务）是 **一组 Pod 的网络访问端点**，用于提供**稳定的 IP 地址**，确保外部或集群内的组件能够访问 Pods。

- **Service 的作用：**
    - **负载均衡（Load Balancing）**，在多个 Pod 之间分配流量。
    - **提供固定 IP 地址**，Pod 的内部 IP 可能会变化，但 Service 的 IP **不会变**。
    - **通过 Selector 选择 Pod**，自动管理 Pod 访问。

📌 **Service 示例**（暴露 `my-app` Pods）：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80   # Service 端口
      targetPort: 80  # 目标 Pod 的端口
  type: ClusterIP  # 默认类型，仅集群内部访问
```

---

### **总结**

|**概念**|**作用**|
|---|---|
|**Pod**|**最小的部署单元**，包含一个或多个容器。|
|**Deployment**|**管理多个 Pod，提供自动伸缩和滚动更新**。|
|**Service**|**暴露 Pods，提供稳定访问和负载均衡**。|

如果你要 **部署一个应用**，一般会：  
1️⃣ **使用 Deployment** 来管理多个 Pod。  
2️⃣ **使用 Service** 来提供访问入口，并进行负载均衡。

💡 **示例架构**：

```
用户请求 → Service（负载均衡）→ Deployment（管理多个 Pod）→ Pod（运行容器）
```

🔥 Kubernetes 让你的应用 **高可用**、**易扩展**，适用于云端微服务架构！🚀