## **GCP VPC 网络防火墙规则简介**

在 **Google Cloud Platform（GCP）** 中，**VPC 网络**（Virtual Private Cloud，虚拟私有云）自带 **防火墙规则（Firewall Rules）**，用于 **控制进出 VPC 的流量**。每个 VPC 都有自己的防火墙规则，默认情况下 GCP 不会开放所有端口，必须手动配置允许或拒绝特定流量。

---

## **防火墙规则的关键参数**

创建防火墙规则时，你需要配置以下重要参数：

### **1. 规则名称**

- 规则的唯一名称，例如：`allow-http-traffic`。
    

### **2. 网络**

- 适用的 VPC，例如 `default` 或自定义的 VPC。
    

### **3. 方向（Direction）**

- **Ingress（入站）**：限制外部访问 GCP 资源的流量。
    
- **Egress（出站）**：限制 GCP 资源访问外部的流量。
    

### **4. 目标（Targets）**

- **所有实例**：适用于 VPC 内的所有虚拟机（VM）。
    
- **指定标签**：只作用于打了某个标签的 VM。
    
- **指定服务帐号**：只作用于使用特定服务帐号的 VM。
    

### **5. 来源 / 目标（Source / Destination）**

- **Ingress（入站）**：设置 **来源 IP**（如 `0.0.0.0/0` 代表所有外部 IP）。
    
- **Egress（出站）**：设置 **目标 IP**（如 `0.0.0.0/0` 代表所有外部地址）。
    

### **6. 允许或拒绝的协议和端口**

- 可以选择 `TCP`、`UDP`、`ICMP` 等协议。
    
- 例如：
    
    - `tcp:22`（允许 SSH 访问）
        
    - `tcp:80, tcp:443`（允许 HTTP 和 HTTPS 访问）
        
    - `icmp`（允许 Ping 测试）
        

### **7. 优先级（Priority）**

- 规则的执行顺序，范围是 **0-65535**，数值 **越小** 优先级 **越高**。
    
- 默认优先级是 **1000**。
    
- 例如：
    
    - `allow-ssh`（优先级 900）
        
    - `deny-all`（优先级 1000）
        

---

## **默认的防火墙规则**

GCP 的 **默认 VPC** 里，系统会自动创建以下规则：

| 规则名称                     | 方向          | 优先级   | 允许的流量                                              |
| ------------------------ | ----------- | ----- | -------------------------------------------------- |
| `default-allow-internal` | 入站（Ingress） | 65534 | 允许 `10.128.0.0/9` 内部网络的所有流量, ping internal ip      |
| `default-allow-icmp`     | 入站（Ingress） | 65534 | 允许 `icmp`(Ping), ping external ip                  |
| `default-allow-rdp`      | 入站（Ingress） | 65534 | 允许 `tcp:3389`（Windows 远程桌面）                        |
| `default-allow-ssh`      | 入站（Ingress） | 65534 | 允许 `tcp:22`（SSH 登录）, click ssh to open the console |

> ⚠ **如果手动删除了这些规则，就要手动加回来！GCP 不会自动恢复。**

---

## **示例：创建防火墙规则**

### **1. 允许 HTTP 和 HTTPS 流量**

#### **使用 Cloud Console**

1. 进入 **VPC 网络 > 防火墙**。
    
2. 点击 **创建防火墙规则**。
    
3. 填写：
    
    - **名称**：`allow-http-https`
        
    - **网络**：`default`
        
    - **方向**：Ingress
        
    - **来源**：`0.0.0.0/0`
        
    - **允许的协议和端口**：
        
        - `tcp:80,443`
            
4. 点击 **创建**。
    

#### **使用 gcloud 命令**

```sh
gcloud compute firewall-rules create allow-http-https \
    --network=default \
    --allow=tcp:80,tcp:443 \
    --direction=INGRESS \
    --source-ranges=0.0.0.0/0 \
    --priority=1000
```

---

## **总结**

- GCP **VPC 网络防火墙规则** 控制进出 VM 实例的流量。
    
- 规则包括 **方向、目标、来源/目标 IP、协议和端口** 等。
    
- 默认 VPC 自带 **SSH、ICMP、RDP 允许规则**，手动删除后需要自己加回来。
    
- 可以通过 **Cloud Console** 或 **gcloud CLI** 创建或管理规则。
    

你是要创建新规则，还是恢复被删的规则？ 😊