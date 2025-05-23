这个文本内容主要讲解了 AWS **EC2** 实例的**安全组 (Security Group)** 功能。以下是总结的重点内容，并保留了英文专业词汇关键字，以便您学习 AWS Certified Developer - Associate 考试。

---

### **AWS EC2 安全组 (Security Group) 详解**

#### **1. 安全组概述**

- **Security Groups** 是 **EC2 Instances** 的**虚拟防火墙 (firewall)**，用于控制进出 **EC2 Instances** 的网络流量。
- 它们非常简单，只包含**允许规则 (allow rules)**，即只定义允许的流量。
- **Security Groups** 的规则可以引用 **IP Addresses (IPv4/IPv6)** 或其他 **Security Groups**。

#### **2. 流量控制**

- **Inbound Traffic (入站流量)**：从外部进入 **EC2 instance** 的流量。默认情况下，所有**Inbound Traffic** 都被**阻止 (blocked)**。
- **Outbound Traffic (出站流量)**：从 **EC2 instance** 流向外部的流量。默认情况下，所有**Outbound Traffic** 都被**允许 (authorized)**。
- 如果流量被 **Security Group** 阻止，**EC2 instance** 甚至不会“看到”它，因为 **Security Group** 位于 **EC2 instance** 外部。
- **连接超时 (Timeout)** 通常表示是 **Security Group** 问题（流量被防火墙阻止）。
- **连接拒绝 (Connection refused)** 错误表示流量通过了 **Security Group**，但应用程序本身拒绝了连接或未启动。

#### **3. 安全组规则 (Security Group Rules)**

- 规则包含：
    - **Type (类型)**：如 SSH, HTTP, HTTPS, Custom TCP Rule 等。
    - **Protocol (协议)**：如 TCP, UDP, ICMP 等。
    - **Port (端口)**：允许流量通过的端口（例如：Port 22, Port 80）。
    - **Source (源)**：允许流量进入的 **IP Address Range**。
        - `0.0.0.0/0` 表示允许所有 **IP** 地址。
        - 特定 **IP** 地址表示只允许该 **IP**。

![[Pasted image 20250522144925.png]]
#### **4. 高级功能：引用其他安全组**

- **Security Groups** 可以引用其他 **Security Groups** 作为其规则的**源 (Source)**。
- 这意味着，如果一个 **EC2 instance** 拥有被引用的 **Security Group**，它就可以被允许访问引用它的 **Security Group** 所保护的 **EC2 instance**，无论其具体 **IP Address** 是什么。
- 这在涉及 **Load Balancers (负载均衡器)** 等场景中非常常见和有用，可以简化管理，无需频繁更新 **IP** 地址。

#### **5. 安全组特性**

- 一个 **Security Group** 可以附加到**多个 EC2 Instances**。
- 一个 **EC2 Instance** 也可以附加**多个 Security Groups**。
- **Security Groups** 绑定到特定的 **Region/VPC** 组合。在不同的 **Region** 或 **VPC** 中需要重新创建。
- 它们存在于 **EC2 instance** 外部，是实例的前置防火墙。
- 建议为 **SSH access** 维护一个单独的 **Security Group**，以便更好地管理和确保安全性。

#### **6. 考试中需要记住的重要端口**

- **Port 22**: 用于 **SSH (Secure Shell)**，登录 **Linux EC2 Instances**。
    - 也用于 **SFTP (Secure File Transfer Protocol)**，通过 **SSH** 安全地上传文件。
- **Port 21**: 用于 **FTP (File Transfer Protocol)**。
- **Port 80**: 用于 **HTTP (Hypertext Transfer Protocol)**，访问**不安全**的网站。
- **Port 443**: 用于 **HTTPS (Hypertext Transfer Protocol Secure)**，访问**安全**的网站（当前标准）。
- **Port 3389**: 用于 **RDP (Remote Desktop Protocol)**，登录 **Windows EC2 Instances**。

---
