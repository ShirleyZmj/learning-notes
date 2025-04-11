# Introduction
**Google Cloud Platform (GCP)** 提供的不同类型的服务资源，分别用于计算、消息传递、存储和应用托管：

1. **Compute Engine Virtual Machines (VMs)（计算引擎虚拟机）**  
   - 这是 GCP 提供的 **云端虚拟机**（类似于 AWS EC2）。  
   - 你可以在 GCP 上创建和管理 Linux 或 Windows 虚拟机。  
   - 适用于运行自定义应用、托管服务器、部署容器等。  

2. **Pub/Sub topics（消息订阅主题）**  
   - 这是 GCP 提供的 **消息队列服务**，用于事件驱动架构（Event-Driven Architecture）。  
   - 允许不同的系统组件之间进行 **异步消息传递**，提高解耦性。  
   - 适用于微服务架构、日志处理、实时数据流处理等。  

3. **Cloud Storage buckets（云存储桶）**  
   - 这是 GCP 提供的 **对象存储**，类似于 AWS S3。  
   - 主要用于存储 **非结构化数据**（如图片、视频、备份文件、大型日志等）。  
   - 提供多种存储类型（标准存储、近线存储、冷存储、归档存储）以优化成本。  

4. **App Engine instances（应用引擎实例）**  
   - 这是 GCP 的 **无服务器 PaaS（平台即服务）** 解决方案。  
   - 允许开发者直接部署应用，而无需管理服务器。  
   - 适用于 Web 应用、后端服务等，支持自动扩展（Auto-Scaling）。  

