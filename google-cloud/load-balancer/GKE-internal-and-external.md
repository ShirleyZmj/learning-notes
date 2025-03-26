![[Pasted image 20250326181500.png]]
### **Google Kubernetes Engine (GKE) 负载均衡方案总结**

在 GKE 中，负载均衡的方式主要分为**网络负载均衡**（L4）和**应用负载均衡**（L7）。它们的实现方式和适用场景如下：

---

## **1. 网络负载均衡（L4）**

> **使用 Service 资源**

- **对象类型**：`Service`
- **关键配置**：
    
    ```yaml
    type: LoadBalancer
    externalTrafficPolicy: Cluster | Local
    ```
    
- **流量分发策略**：
    - **Cluster（默认）**：流量会均匀分布到所有 GKE 节点，再由 `kube-proxy` 发送到实际运行 Pod 的节点。
    - **Local**：只会将流量分发给运行 Pod 的节点，并保留原始请求的 Source IP。

📌 **适用于：** TCP/UDP 级别的流量转发，适合数据库、消息队列等应用。

---

## **2. 外部应用负载均衡（External L7 Load Balancer）**

> **使用 Ingress 资源**

- **对象类型**：`Ingress`
- **关键配置**：
    
    ```yaml
    metadata:
      annotations:
        kubernetes.io/ingress.class: "gce"
    ```
    
- **工作方式**：
    - 依据 URL 路径进行流量分发（Path-based Routing）。
    - 部署在 Google Cloud 全球**边缘 PoP（Points of Presence）**。
    - 需要静态 IP 地址，Ingress 资源存在期间不会更改。

📌 **适用于：** 需要基于 HTTP(S) 进行流量分发的 Web 应用。

---

## **3. 内部应用负载均衡（Internal L7 Load Balancer）**

> **使用 Ingress 资源**

- **对象类型**：`Ingress`
- **关键配置**：
    
    ```yaml
    metadata:
      annotations:
        kubernetes.io/ingress.class: "gce-internal"
        cloud.google.com/neg: '{"ingress": true}'
    ```
    
- **工作方式**：
    - 只能在 VPC 内部访问，适用于企业内部 API 或内部微服务通信。
    - 代理（Proxy）部署在**仅代理子网（Proxy-only Subnet）**中。
    - 只能使用 **NEGs（Network Endpoint Groups）** 作为后端。

📌 **适用于：** 内部 API、微服务间的私有通信。

---

### **📌 选择合适的负载均衡方式**

|负载均衡类型|方式|适用场景|关键配置|
|---|---|---|---|
|**网络负载均衡**|Service (`type: LoadBalancer`)|TCP/UDP 负载均衡（数据库、消息队列）|`externalTrafficPolicy: Cluster|
|**外部应用负载均衡**|Ingress (`ingress.class: "gce"`)|公网访问的 HTTP/HTTPS Web 应用|需要 URL 路由和静态 IP|
|**内部应用负载均衡**|Ingress (`ingress.class: "gce-internal"`)|仅限 VPC 内部访问的 API 服务|需要 NEGs 后端|

---

### **结论**

如果你的 GKE 需要负载均衡：

- **使用 `Service` 进行 L4 负载均衡**（适用于 TCP/UDP 负载）。
- **使用 `Ingress` 进行 L7 负载均衡**，并根据访问需求选择外部或内部负载均衡。 🚀