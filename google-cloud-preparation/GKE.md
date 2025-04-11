### **Google Kubernetes Engine (GKE) 关键特性**  

1. **模式（Mode）**  
   - **Autopilot 模式**：全托管，按 Pod 资源消耗计费，Google 负责基础设施管理。  
   - **标准模式（Standard Mode）**：用户完全控制集群架构，可自定义和管理集群。  

2. **高可用性（Availability）**  
   - **单区集群（Zonal Cluster）**：控制平面位于单个可用区，节点可跨多个区分布。  
   - **区域集群（Regional Cluster）**：多个控制平面副本，默认节点分布于 3 个可用区，可调整。  

3. **版本管理（Versioning）**  
   - 可选择特定 GKE 版本或**订阅发布通道**（Release Channel）。  
   - **推荐启用自动升级（Auto-upgrade）**，确保节点和控制平面保持最新。  

4. **网络路由（Network Routing）**  
   - **VPC-native（Alias IP）**：使用 VPC 本地 IP 进行 Pod 通信，推荐方式。  
   - **基于路由（Routes-based）**：使用 Google Cloud Routes 进行 Pod 互通。  

5. **网络隔离（Network Isolation）**  
   - **公共 GKE 网络**：允许来自公共网络的访问。  
   - **私有 GKE 网络**：Pods 和节点使用内部 IP，与公共网络隔离。  

6. **功能状态（Features）**  
   - Kubernetes 组件状态分为 **Alpha、Beta 和 Stable**，反映其成熟度和稳定性。


## Cluster configuration choices
### Mode
### **GKE Autopilot vs. Standard 模式对比**  

| 特性           | **Autopilot（自动化）** | **Standard（标准）** |  
|--------------|-------------------|-------------------|  
| **管理方式**   | Google 全托管，自动管理集群和节点 | 用户自主管理集群架构、节点和资源 |  
| **节点管理**   | 无需手动管理，Google 负责 | 用户需要手动创建和管理节点池 |  
| **费用模式**   | 按 Pod 资源用量计费（CPU/内存） | 按 VM 实例（节点）计费 |  
| **弹性伸缩**   | 自动调整 Pod 数量和资源 | 需要手动或基于策略调整 |  
| **控制平面**   | Google 负责管理和维护 | 用户需要手动配置和管理 |  
| **安全性**   | 默认更严格的安全设置，自动启用最佳实践 | 用户需自行配置安全策略 |  
| **自定义能力** | 受限（不支持 DaemonSet、自定义节点池等） | 完全可自定义，支持所有 Kubernetes 资源 |  
| **适用场景**   | **开发友好、低运维负担**，适合快速部署和小团队 | **大规模、复杂集群**，适合高可控性需求 |  

#### **总结**  
- **GKE Autopilot** 适用于希望**减少管理工作**、快速部署 Kubernetes 的用户。  
- **GKE Standard** 适用于需要**完全控制集群**、优化性能、或使用特定 Kubernetes 组件的用户。

### **GKE Autopilot vs. Standard 详细对比**  

| **类别**          | **Autopilot（自动化）** | **Standard（标准）** |  
|-----------------|-------------------|-------------------|  
| **集群模式（Mode）** | Autopilot | Standard |  
| **可用性类型（Availability Type）** | 仅支持 **区域性（Regional）** | **区域性（Regional）或区域级（Zonal）** |  
| **发布渠道（Release Channel）** | **Rapid**（资速）、**Regular**（常规）、**Stable**（稳定） | **任何渠道（Any channel）** |  
| **集群版本（Cluster Versions）** | **默认版本**或**另一个可用版本** | **默认版本**或**另一个可用版本** |  
| **网络路由（Network Routing）** | **仅支持 VPC-native（VPC 原生）** | **支持 VPC-native（VPC 原生）或 Routes-based（路由模式）** |  
| **网络隔离（Network Isolation）** | **可定制（Customizable）** | **可定制（Customizable）** |  
| **Kubernetes 功能（Kubernetes Features）** | **仅生产环境（Production）** | **生产环境（Production）或 Alpha 版本** |  

### **总结**  
- **Autopilot**：全托管，默认最佳实践，适用于**生产环境**，仅支持**区域性集群**，强制使用**VPC-native**。  
- **Standard**：自主管理，支持**区域或区域级集群**，**网络路由更灵活**，支持**Alpha 版本功能**，适用于需要**高级控制**的应用。

## Cluster availability type
### **GKE 集群可用性类型对比：区域性集群 vs. 区域级集群 vs. 多区域集群**  

| **类别**               | **区域性集群（Regional Cluster）** | **区域级集群（Zonal Cluster）** | **多区域集群（Multi-zonal Cluster）** |  
|----------------------|--------------------------------|-----------------------------|---------------------------------|  
| **控制平面（Master Node）** | **多个可用区** 部署多个副本，高可用 | **单个可用区**，有单点故障风险 | **单个可用区**，但可用节点分布在多个区域 |  
| **节点（Worker Nodes）** | **默认跨 3 个可用区**（可调整） | **所有节点在同一区域** | **可跨多个可用区部署节点** |  
| **高可用性（HA）** | ✅ **高**（可用区故障时仍可用） | ❌ **低**（可用区故障时集群不可用） | ⚠️ **中等**（控制平面仍然是单点故障） |  
| **恢复能力** | **可用区故障时自动切换** | **单点故障，宕机后不可恢复** | **节点可用性高，但控制平面故障时集群仍会宕机** |  
| **适用场景** | 关键业务应用，高可用性需求 | 开发、测试，或对可用性要求不高的应用 | 需要更高节点可用性但不想承担区域性集群成本 |  
| **成本** | **最高**（控制平面和节点跨多个区域） | **最低**（所有资源集中在一个区域） | **适中**（节点跨区域，但控制平面仍在单一区） |  

### **选择建议**  
- **如果需要高可用性（HA）和业务连续性** → **选择区域性集群**。  
- **如果是开发、测试或成本敏感的应用** → **选择区域级集群**。  
- **如果需要高节点可用性但想降低成本** → **选择多区域集群**（但控制平面仍然是单点）。


[参考链接](https://cloud.google.com/kubernetes-engine/docs/concepts/configuration-overview)