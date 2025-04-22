- Notice the **default** network with its subnets.  
    Each subnet is associated with a Google Cloud region and a private RFC 1918 CIDR block for its internal **IP addresses range** and a **gateway**.
![[Pasted image 20250409105611.png]]
## Routes
Routes tell VM instances and the VPC network how to send traffic from an instance to a destination, either inside the network or outside Google Cloud. Each VPC network comes with some default routes to route traffic among its subnets and send traffic from eligible instances to the internet.
![[Pasted image 20250409105815.png]]
Notice that there is a route for each subnet and one for the **Default internet gateway** (0.0.0.0/0).  
These routes are managed for you, but you can create custom static routes to direct some packets to specific destinations. For example, you can create a route that sends all outbound traffic to an instance configured as a NAT gateway.

## Firewall Rules
Each VPC network implements a distributed virtual firewall that you can configure. Firewall rules allow you to control which packets are allowed to travel to which destinations. Every VPC network has two implied firewall rules that block all incoming connections and allow all outgoing connections.

![[Pasted image 20250409110018.png]]
- In the left pane, click **Firewall**.  
    Notice that there are 4 **Ingress** firewall rules for the **default** network:
    
    - default-allow-icmp
    - default-allow-rdp
    - default-allow-ssh
    - default-allow-internal
    
    These firewall rules allow **ICMP**, **RDP**, and **SSH** ingress traffic from anywhere (0.0.0.0/0) and all **TCP**, **UDP**, and **ICMP** traffic within the network (10.128.0.0/9). The **Targets**, **Filters**, **Protocols/ports**, and **Action** columns explain these rules.

### Deletion
default firewall rules -> default VPC network --> no routes and no rules

> You cannot create a VM instance without a VPC network!

### **Convert the network to a custom mode network** 
![[Pasted image 20250409111944.png]]

## VM instances
![[Pasted image 20250409114812.png]]

![[Pasted image 20250409114747.png]]


## Review 
In this lab, you explored the default network and determined that you cannot create VM instances without a VPC network. Thus, you created a new auto mode VPC network with subnets, routes, firewall rules, and two VM instances and tested the connectivity for the VM instances. Because auto mode networks aren't recommended for production, you converted the auto mode network to a custom mode network.

Next, you created two more custom mode VPC networks with firewall rules and VM instances using the Cloud console and the gcloud command line. Then you tested the connectivity across VPC networks, which worked when pinging external IP addresses but not when pinging internal IP addresses.

VPC networks are by default isolated private networking domains. Therefore, no internal IP address communication is allowed between networks, unless you set up mechanisms such as VPC peering or VPN.

这段话主要描述了一个GCP实验，实验内容包括：

1. **VPC网络的重要性：**
    - 实验确认了创建VM实例必须依赖VPC网络，即使是默认网络也是VPC网络。
2. **自动模式VPC网络：**
    - 创建了一个自动模式VPC网络，并配置了子网、路由、防火墙规则和两个VM实例。
    - 测试了VM实例之间的连通性。
    - 由于自动模式网络不推荐用于生产环境，因此将该网络转换为了自定义模式网络。
3. **自定义模式VPC网络：**
    - 使用Cloud控制台和gcloud命令行创建了两个自定义模式VPC网络，并配置了防火墙规则和VM实例。
    - 测试了跨VPC网络的连通性，发现只能通过外部IP地址进行ping通，而内部IP地址无法ping通。
4. **VPC网络的隔离性：**
    - 强调了VPC网络默认是隔离的私有网络域。
    - 默认情况下，VPC网络之间不允许内部IP地址通信。
    - 如果需要实现VPC网络之间的内部IP地址通信，需要设置VPC对等互连或VPN等机制。

## Notes
- In the same VPC,
	- You can ping **mynet-notus-vm**'s internal IP because of the **allow-custom** firewall rule.
    - You can ping mynet-notus-vm's external IP address because of the mynetwork-allow-icmp


## Firewall rules introduction

这些防火墙规则（Firewall Rules）都是用于管理网络中不同类型流量的访问控制。它们主要控制哪些流量可以进入（Ingress）`mynetwork`网络中的虚拟机实例。下面是每个防火墙规则的具体介绍：

### 1. **mynetwork-allow-custom**

- **网络**: `mynetwork`
    
- **方向**: INGRESS（入站流量，即外部流量进入虚拟机）
    
- **优先级**: 65534（防火墙规则的优先级，数值越低优先级越高）
    
- **允许**: `all`（允许所有流量）
    
- **拒绝**: 无
    
- **禁用**: 否
    

**作用**:  
这个规则允许任何类型的流量进入`mynetwork`网络的虚拟机。由于它的`ALLOW`字段设置为`all`，因此没有任何限制，可以接受所有协议和端口的流量。这通常用来作为一个广泛的规则，允许所有类型的网络访问，但也意味着安全风险较高。

---

### 2. **mynetwork-allow-icmp**

- **网络**: `mynetwork`
    
- **方向**: INGRESS（入站流量）
    
- **优先级**: 65534
    
- **允许**: `icmp`（允许ICMP协议）
    
- **拒绝**: 无
    
- **禁用**: 否
    

**作用**:  
这个规则允许`icmp`流量进入`mynetwork`网络。ICMP协议通常用于网络诊断（如使用`ping`命令检查主机是否可达）。该规则允许外部设备使用`ping`等工具来测试与虚拟机的连接性。在很多网络中，启用ICMP流量是很常见的，因为它帮助进行网络故障排查。

---

### 3. **mynetwork-allow-rdp**

- **网络**: `mynetwork`
    
- **方向**: INGRESS（入站流量）
    
- **优先级**: 65534
    
- **允许**: `tcp:3389`（允许TCP协议的3389端口，通常是RDP使用的端口）
    
- **拒绝**: 无
    
- **禁用**: 否
    

**作用**:  
这个规则允许TCP协议的3389端口流量进入`mynetwork`网络。3389端口是Windows操作系统的远程桌面协议（RDP）所使用的端口。通过此规则，外部用户可以通过RDP访问网络中的Windows虚拟机，进行图形化的桌面控制。

---

### 4. **mynetwork-allow-ssh**

- **网络**: `mynetwork`
    
- **方向**: INGRESS（入站流量）
    
- **优先级**: 65534
    
- **允许**: `tcp:22`（允许TCP协议的22端口，通常是SSH使用的端口）
    
- **拒绝**: 无
    
- **禁用**: 否
    

**作用**:  
这个规则允许TCP协议的22端口流量进入`mynetwork`网络。22端口是SSH协议的标准端口，用于远程访问Linux或Unix操作系统的虚拟机。通过此规则，允许外部用户通过SSH连接并管理虚拟机，通常用于命令行操作和系统管理。

---

### 总结

这些防火墙规则的主要作用是控制哪些类型的流量可以进入`mynetwork`网络中的虚拟机：

- **`mynetwork-allow-custom`**: 允许所有类型的流量进入，风险较高，但通常用于广泛访问。
    
- **`mynetwork-allow-icmp`**: 只允许ICMP协议的流量，用于网络诊断和连通性测试。
    
- **`mynetwork-allow-rdp`**: 只允许RDP协议的流量（端口3389），用于远程桌面访问Windows虚拟机。
    
- **`mynetwork-allow-ssh`**: 只允许SSH协议的流量（端口22），用于远程管理Linux/Unix虚拟机。
    

每个规则的优先级设置为65534，意味着这些规则的优先级较低（可能在其他规则之后被执行），并且所有规则都没有禁用。