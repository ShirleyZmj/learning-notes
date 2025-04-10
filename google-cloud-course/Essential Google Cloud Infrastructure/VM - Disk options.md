
## 🧠 总结：GCP Compute Engine 的磁盘选项

### 1. 启动盘（Boot Disk）

- 每个虚拟机（VM）默认附带一个 **根持久磁盘（root persistent disk）**。
    
- 启动盘可以设为在删除实例时**不自动删除**，以便保留数据。
    

### 2. 持久磁盘（Persistent Disks）

- 通过网络附加到 VM 上，不与物理机绑定。
    
- **可快照（Snapshots）**，**支持在线扩容**，**支持多个 VM 只读挂载**。
    
- 类型：
    
    - **Standard Persistent Disk**：HDD，适合大规模顺序 I/O 任务，成本低。
        
    - **SSD Persistent Disk**：适合低延迟高 IOPS 的应用，如企业级数据库。
        
    - **Balanced Persistent Disk**：兼顾性能和成本，适用于大多数通用应用。
        
    - **Extreme Persistent Disk**：适用于高端数据库工作负载，可配置所需 IOPS。
        
- **区域性（Regional）持久磁盘**：跨两个 zone 同步复制，适合高可用应用。
    
- 默认加密，支持自管密钥（CMEK）和客户自供密钥（CSEK）。
    

### 3. 本地 SSD（Local SSD）

- 物理附加到 VM 的设备，**非常高性能（高 IOPS）**，但**不持久**。
    
- 重启后数据保留，但停止或删除 VM 时数据会丢失。
    
- 每块为 375GB，最多可挂载 24 块（总共 9TB）。
    

### 4. RAM 磁盘（RAM Disk）

- 使用内存（例如 Linux 的 `tmpfs`）作为磁盘，**最快的访问速度**，但**极其易失**。
    
- 建议搭配持久磁盘使用作数据备份。
    

### 5. 其他关键点

- 每种虚拟机类型支持不同数量的磁盘：
    
    - Shared-core：最多 16 块
        
    - 标准、高内存、高 CPU 等类型：最多 128 块
        
- 磁盘 IO 与网络带宽共享，需规划资源利用。
    
- 云端磁盘管理简化：支持热扩容、自动冗余、加密、快照，无需手动分区和加密。
    

---

## 🎯 考点与参考答案

|考点|问题|答案|
|---|---|---|
|启动盘|如何保留启动盘不被删除？|禁用 “Delete boot disk when instance is deleted” 选项。|
|磁盘类型|哪种磁盘最适合低延迟高 IOPS？|SSD Persistent Disk 或 Extreme Persistent Disk。|
|持久性对比|哪些磁盘类型是非持久的？|Local SSD 和 RAM Disk。|
|区域冗余|哪种磁盘可以在两个 Zone 同步存储？|Regional Persistent Disk。|
|动态调整|哪些磁盘支持运行时扩容？|Persistent Disks。|
|数据共享|哪种磁盘支持多个 VM 只读共享？|Persistent Disks（Read-only 模式）。|
|密钥管理|如何使用自己的密钥进行磁盘加密？|使用 CMEK 或 CSEK。|
|性能极限|哪种磁盘可以自定义 IOPS？|Extreme Persistent Disk。|
|IO 与网络|Disk IO 会与哪些资源竞争带宽？|网络 Egress/Ingress。|
|最大磁盘数量|标准型 VM 最多可挂载多少块 Persistent Disk？|128 块。|

---

## 🔍 英文缩写全称与解释

|缩写|全称|解释|
|---|---|---|
|VM|Virtual Machine|虚拟机|
|HDD|Hard Disk Drive|机械硬盘，适合顺序读写|
|SSD|Solid State Drive|固态硬盘，低延迟高性能|
|IOPS|Input/Output Operations Per Second|每秒输入输出操作次数，衡量存储性能的指标|
|IO|Input/Output|输入输出|
|CMEK|Customer-Managed Encryption Key|客户托管的加密密钥，由用户通过 Cloud KMS 管理|
|CSEK|Customer-Supplied Encryption Key|客户提供的加密密钥，用户完全自主管理|
|KMS|Key Management Service|密钥管理服务，用于创建和管理加密密钥|
|tmpfs|Temporary File System|临时文件系统，将文件存储在内存中|
|RAM|Random Access Memory|随机存取内存，用作缓存或极快速的磁盘替代|
|Egress / Ingress|数据出站 / 入站|与外部网络的数据交互|

---

如果你需要我帮你出一套选择题来练习这些考点，也可以告诉我！😎