主 CIDR 和次 CIDR 是在同一个子网中定义的多个 IP 范围，通常用于不同的目的，但它们之间是相关的。让我们来逐步了解它们的关系和用途。

---

### ✅ 主 CIDR（Primary CIDR）

主 CIDR 是在子网创建时分配的主要 IP 范围。它定义了整个子网的地址空间，并且是子网中所有设备和资源的默认地址范围。每个子网只能有一个主 CIDR 范围。

例如，在你的例子中：

```text
子网 default:
  - 主 CIDR: 10.10.0.0/16
```

这个主 CIDR 范围 (`10.10.0.0/16`) 表示子网内的 IP 地址范围从 `10.10.0.0` 到 `10.10.255.255`，可以用来分配给 VM、网络设备等资源。

---

### ✅ 次 CIDR（Secondary CIDR）

次 CIDR 是你可以为一个子网 **额外**添加的 IP 范围，通常用于分配给特定的服务或资源。你可以在同一个子网中配置多个次 CIDR 范围，这样可以细分 IP 地址空间，用于不同的目的。每个次 CIDR 都可以用于特定的应用，如：

- **Pod 地址范围**（用于 Kubernetes 集群中的 Pod）
    
- **Service 地址范围**（用于 Kubernetes 集群中的 Services）
    
- **别名 IP 地址范围**（用于 GCP 上的 VM）
    

例如，在你的例子中：

```text
子网 default:
  - 主 CIDR: 10.10.0.0/16
  - 次 CIDR:
    - pods-range: 10.20.0.0/16
    - services-range: 10.30.0.0/20
```

这里的 **次 CIDR** 是：

- `pods-range: 10.20.0.0/16`，这是分配给 Kubernetes Pods 的地址范围。
    
- `services-range: 10.30.0.0/20`，这是分配给 Kubernetes Services 的地址范围。
    

---

### ✅ 它们之间的关系

1. **同属一个子网**：主 CIDR 和次 CIDR 都属于同一个子网，它们共享该子网的网络配置（例如路由、防火墙规则等）。
    
2. **互补性**：主 CIDR 是子网的基本地址范围，而次 CIDR 是对主 CIDR 范围的扩展，用于不同的应用场景。主 CIDR 可以作为普通的网络资源地址，而次 CIDR 通常用于细分 IP 地址空间，以支持不同的服务或应用（如 Pod、Service、Alias IP 等）。
    
3. **不会重叠**：主 CIDR 和次 CIDR 范围之间的地址不应重叠。每个次 CIDR 都需要独立的地址空间，不会和主 CIDR 的地址重叠。
    

### ✅ 举个具体例子：

假设你有一个子网 `default`，它的主 CIDR 是 `10.10.0.0/16`，这意味着子网内的设备可以从 `10.10.0.0` 到 `10.10.255.255` 中获取 IP 地址。

如果你添加了次 CIDR：

- `pods-range: 10.20.0.0/16`：用于 Kubernetes 集群中的 Pods，每个 Pod 会从 `10.20.0.0` 到 `10.20.255.255` 中获取一个 IP 地址。
    
- `services-range: 10.30.0.0/20`：用于 Kubernetes 服务，每个 Service 会从 `10.30.0.0` 到 `10.30.15.255` 中获取一个 IP 地址。
    

主 CIDR 和次 CIDR 是互不冲突的，互相独立地用于不同的用途，但它们都是这个子网的一部分，且都受该子网的网络配置影响。

---

### ✅ 总结

- **主 CIDR**：定义子网的主要地址范围，包含所有普通的网络资源。
    
- **次 CIDR**：额外添加的地址范围，通常用于特定用途（如 Kubernetes 的 Pod 或 Service 地址）。
    
- **关系**：它们都属于同一个子网，但次 CIDR 是对主 CIDR 的扩展，用于更精细的 IP 地址划分和资源管理。
    

如果你在实际应用中需要配置这些范围，确保次 CIDR 范围不与主 CIDR 重叠，并且合理规划每个 CIDR 的用途（比如 Pod、Service 或 Alias IP）。

如果还有具体场景的疑问，或者需要进一步设置指导，随时告诉我！