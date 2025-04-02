### Resources can be in different zones on the same subnet(region)

The size of a subnet can be increased by expanding the range of IP addresses allocated to it, and doing so won’t affect virtual machines that are already configured.

For example, let’s take a VPC network named vpc1 that has two subnets defined in the asia-east1 and us-east1 regions.

If the VPC has three Compute Engine VMs attached to it, it means they’re neighbors on the same subnet even though they’re in different zones . 

这句话的意思是：

1. **VPC 网络（Virtual Private Cloud）**
    
    - `vpc1` 是一个**全球范围**的 VPC 网络，它在**多个区域（region）**中都有子网（subnet）。
        
    - 这里的 VPC 在 `asia-east1` 和 `us-east1` 这两个区域都定义了子网（subnet）。
        
2. **VPC 网络的子网（Subnet）是**按区域（region）**划分的，而不是按单个可用区（zone）划分的**
    
    - 一个子网的范围是**整个 region**，而不是单个 zone。
        
    - 例如，`asia-east1` 可能包含多个可用区（如 `asia-east1-a`, `asia-east1-b`, `asia-east1-c`），但它们共享同一个 `asia-east1` 子网。
        
3. **Compute Engine VM 之间的关系**
    
    - 这个 VPC 里有 3 台 Compute Engine 虚拟机（VM），它们都连接到了 `vpc1`。
        
    - 即使这些 VM 可能位于**不同的可用区（zone）**，但只要它们属于**同一个子网**，它们就像是“邻居”，可以通过内部 IP 地址互相通信，而不需要额外的网络配置。
        

### 举个例子：

假设：

- `asia-east1` 里有一个子网 `subnet-asia`（192.168.1.0/24）
    
- `us-east1` 里有一个子网 `subnet-us`（192.168.2.0/24）
    
- `vpc1` 里有 3 台 VM：
    
    1. `vm-a` 在 `asia-east1-a`，IP：`192.168.1.10`
        
    2. `vm-b` 在 `asia-east1-b`，IP：`192.168.1.11`
        
    3. `vm-c` 在 `us-east1-a`，IP：`192.168.2.10`
        

**结论：**

- `vm-a` 和 `vm-b` 在不同的 zone (`asia-east1-a` 和 `asia-east1-b`)，但因为它们在同一个 `asia-east1` 的子网 `subnet-asia` 里，所以它们是“邻居”。
    
- `vm-c` 在 `us-east1`，它的 IP 地址属于 `subnet-us`，所以它**不在同一个子网**，不能直接算是 `vm-a` 和 `vm-b` 的“邻居”。
    

你是想理解 VPC 的概念，还是在 Google Cloud 上部署项目？