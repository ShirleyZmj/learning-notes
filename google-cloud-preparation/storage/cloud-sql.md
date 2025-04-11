### **Cloud SQL 介绍**  

Cloud SQL 是 Google Cloud 提供的 **托管数据库服务**，可以帮助你管理数据库实例，同时让你专注于数据结构和业务逻辑。  

#### **主要功能**  
- **自动化管理**：支持 **自动备份、高可用性、数据加密**、基础设施和软件更新、日志记录与监控。  
- **数据库支持**：支持 **MySQL、PostgreSQL、SQL Server**。  
- **存储**：使用 **Compute Engine 的持久磁盘** 作为数据库存储。  
- **连接**：提供 **静态 IP 地址** 以供外部访问。  

#### **Cloud SQL 实例创建步骤**  
1. **创建实例（Create Instance）**。  
2. **选择数据库类型（Select Database Type）**：MySQL、PostgreSQL 或 SQL Server。  
3. **输入实例名称（Enter Name）**：不要使用敏感或个人可识别的信息（实例名称可能是公开的）。  
4. **设置 Root 用户密码（Enter Password for Root User）**。  
5. **选择数据库版本（Select Proper Version）**：**版本不可更改**，请谨慎选择。  
6. **配置可用性（Regional & Zonal Availability）**：  
   - 选择适合 **大部分用户访问** 的区域（Region）。  
   - 可选择 **多区域（Multi-region）** 以增强可用性。  
7. **选择主区域和次区域（Primary & Secondary Zone）**：  
   - **默认主区域（Primary Zone）** 可设置为任意位置。  
   - **次区域（Secondary Zone）** 需与主区域不同。  
8. **配置数据库设置（Config Settings）**：  
   - **机器类型（Machine Type）**。  
   - **私有 IP 或公有 IP（Private/Public IP）**。  
   - **存储类型（Storage Type）**（HDD 或 SSD）。  
   - **存储容量（Storage Capacity）**。  
   - **自动存储扩展（Automated Storage Increase）**，可设置数据库最大增长限制。