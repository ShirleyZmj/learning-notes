# Elastic Compute Cloud
Infrastructure as a Service

# AWS EC2 基础概念总结

本讲座介绍了 Amazon EC2 的基本概念，EC2 是在 AWS 上构建基础设施即服务 (IaaS) 的核心服务。

## 什么是 Amazon EC2?

- **Elastic Compute Cloud (EC2):** AWS 最受欢迎的服务之一，用于在云中租用虚拟计算资源。
- **Infrastructure as a Service (IaaS):** EC2 是 AWS 提供 IaaS 的方式。
- **核心组件:**
    - **EC2 Instances:** 在 EC2 上租用的虚拟机器。
    - **EBS Volumes:** 用于存储数据的虚拟驱动器 (Elastic Block Store)。
    - **Elastic Load Balancer (ELB):** 在多台机器之间分配负载。
    - **Auto Scaling Group (ASG):** 根据需求自动扩展或缩减服务。
    - **Security Group:** EC2 实例的防火墙规则。
    - **EC2 User Data:** 在实例首次启动时运行的 Bootstrap 脚本。

## EC2 实例选项

在创建 EC2 实例时，您可以选择以下配置：

- **Operating System:**
    - Linux (最受欢迎)
    - Windows
    - Mac OS
- **Compute Power and Cores (CPU):** 虚拟机的计算能力和核心数。
- **Random Access Memory (RAM):** 虚拟机内存大小。
- **Storage Space:** 存储空间大小和类型：
    - **EBS (Elastic Block Store):** 通过网络附加的持久性块存储。
    - **EFS (Elastic File System):** 可伸缩的共享文件存储服务。
    - **EC2 Instance Store:** 硬件直接附加到实例的临时存储。
- **Network:**
    - **Network Performance:** 网络性能（例如速度）。
    - **Public IP:** 公有 IP 地址类型。
- **Firewall Rules:** 通过 **Security Group** 配置。
- **Bootstrap Script:** 使用 **EC2 User Data** 在首次启动时自动化配置任务。

## EC2 User Data (Bootstrap Script)

- **定义:** 在 EC2 实例首次启动时自动运行的脚本。
- **目的:** 自动化启动任务，例如安装更新、安装软件、下载文件等。
- **执行时机:** 仅在实例首次启动时运行一次。
- **权限:** 以 **root user** 身份运行。
- **注意事项:** 添加到 User Data 脚本中的任务越多，实例启动时间越长。

## EC2 实例类型示例

AWS 提供数百种不同的 EC2 实例类型，以下是几个示例：

![[Pasted image 20250519163306.png]]

> t2.micro is part of the AWS free tier (up to 750 hours per month)

| Instance Type   | vCPU | Memory (GiB) | Storage          | Network Performance |
| --------------- | ---- | ------------ | ---------------- | ------------------- |
| t2.micro        | 1    | 1            | EBS Only         | Low to Moderate     |
| t2.xlarge       | 4    | 16           | EBS Only         | Moderate            |
| c5d.4xlarge     | 16   | 32           | 400 GB NVMe SSD  | Up to 10 Gigabit    |
| r5.16xlarge     | ...  | ...          | ...              | ...                 |
| m5.8xlarge      | ...  | ...          | ...              | ...                 |

- **选择原则:** 根据应用程序的需求选择最合适的实例类型。

## AWS Free Tier 和 t2.micro

- **t2.micro:** 本课程将使用的实例类型，属于 AWS 免费套餐。
- **免费额度:** 每月最多 750 小时的 t2.micro 使用时间，基本上可以支持实例持续运行一个月。

本讲座为 EC2 奠定了基础，后续课程将进行更深入的实践操作。