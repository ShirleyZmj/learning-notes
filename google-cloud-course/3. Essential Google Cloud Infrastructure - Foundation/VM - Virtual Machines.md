# Compute Engine

这段内容深入探讨了Google Compute Engine（GCE）的特性和使用场景，以及相关的硬件选择和网络配置。主要包括以下几个方面：

- **Compute Engine的特性和使用场景：**
    - GCE提供高度灵活的IaaS服务，允许用户运行任何语言和操作系统。
    - 适用于运行传统的企业级应用，尤其是在服务器基础设施上设计的应用。
    - 与GKE等容器化服务相比，GCE更易于从本地环境迁移。
    - 用户可以自定义虚拟机实例的硬件配置，包括CPU、内存、磁盘和网络接口。
- **硬件选择：**
    - **机器类型：** 提供预定义和自定义的机器类型，用户可以根据需求选择CPU和内存。
    - **CPU:** 每一个vCPU，在GCE中，都被实现为单个硬件超线程。网络吞吐量和CPU的核数有关系。
    - **磁盘：**
        - 标准HDD和SSD：提供相同容量，SSD提供更高的IOPS，标准HDD提供更高的容量。
        - 本地SSD：提供更高的吞吐量和更低的延迟，但数据仅在实例停止或删除时保留。
    - **TPU：**
        - Google开发的ASIC，用于加速机器学习工作负载。
        - 比GPU和CPU更适合AI应用和机器学习。
        - 在长时间训练和大型模型中表现出色。
- **网络配置：**
    - 用户可以配置网络接口和防火墙规则，控制VM实例的网络访问。
    - GCP提供区域HTTPS负载均衡和网络负载均衡，无需预热。
    - 负载均衡，本质上是一系列流量工程规则，在google网络内部，VPC会根据，你设置的规则，将流量，转发到你的IP地址子网范围内。
- **GCE管理特性：**
    - 机器类型大小调整，启动和关闭脚本，元数据，可用性策略，OS补丁管理，以及价格和使用折扣。

**考点和答案：**

1. **考点：Compute Engine的特点和适用场景是什么？**
    
    - **答案：**Compute Engine提供高度灵活的IaaS服务，适用于运行传统的企业级应用，尤其是在服务器基础设施上设计的应用。
2. **考点：Compute Engine提供哪些磁盘类型？它们的特点和适用场景是什么？**
    
    - **答案：**
        - 标准HDD：提供高容量，适用于对IOPS要求不高的场景。
        - SSD：提供高IOPS，适用于对性能要求较高的场景。
        - 本地SSD：提供最高吞吐量和最低延迟，适用于临时存储或交换空间。
3. **考点：什么是TPU？它与CPU和GPU相比有什么优势？**
    
    - **答案：**TPU是Google开发的ASIC，用于加速机器学习工作负载。与CPU和GPU相比，TPU在AI应用和机器学习方面具有更高的效率和能效。
4. **考点：在GCE中，CPU和网络吞吐量有什么关系？**
    
    - **答案：**网络吞吐量与CPU核心数成正比，每个CPU核心提供2Gbps的吞吐量，2核或者4核的实例，提供最高10Gbps的带宽。C3系列的机器，最高可以提供200Gbps的带宽。
5. **考点：GCE的负载均衡有什么特点？**
    
    - **答案：**GCE提供区域HTTPS负载均衡和网络负载均衡，无需预热，本质上是一系列流量工程规则，在google网络内部，VPC会根据，你设置的规则，将流量，转发到你的IP地址子网范围内。
6. **考点：GCE中，vCPU的概念是什么？**
    
    - **答案：**在Compute Engine中，每个vCPU被实现为物理CPU上的单个硬件超线程。

希望这些总结和考点答案能够帮助您更好的准备GCP的考试。

# VM access and lifecycle

这段内容详细介绍了GCP中VM实例的访问权限、生命周期管理、维护策略和OS补丁管理。主要包括以下几个方面：

- **VM实例访问权限：**
    - 实例创建者拥有该实例的完整root权限。
    - Linux实例：创建者拥有SSH权限，并可通过Google Cloud控制台授予其他用户SSH权限。
    - Windows实例：创建者可通过控制台生成用户名和密码，然后使用RDP客户端连接。
    - 默认网络已配置SSH和RDP所需的防火墙规则，自定义网络需要用户自行配置。
- **VM实例生命周期：**
    - 包括：provisioning（预配）、staging（暂存）、running（运行）、stopped（停止）、terminated（终止）、repairing（修复）、suspending（暂停）等状态。
    - running状态下可进行live migration（实时迁移）、迁移到不同区域、创建快照、导出系统镜像、重新配置元数据等操作。
    - stopped状态下可更改机器类型，但无法更改镜像。
    - terminated状态下可重启或删除实例。
    - reset操作类似计算机重启，清除内存，实例保持running状态。
    - VM repair状态，VM不可用，不计费，不计入SLA。
- **VM实例维护策略：**
    - live migration（实时迁移）是默认的维护行为，也可更改为终止实例。
    - 实例崩溃或维护事件后，默认自动重启，也可更改。
    - 可通过配置Automatic restart和On host maintenance选项管理维护策略。
- **OS补丁管理：**
    - 高级映像包含OS使用和补丁管理费用。
    - OS补丁管理服务包括补丁合规性报告和补丁部署。
    - 可创建补丁批准、设置灵活的计划、应用高级补丁配置设置、集中管理补丁作业。
    - 被终止的VM，CPU和内存不计费，磁盘和预留IP计费。
- VM关闭，包括停止，删除，重启等操作，大约需要90秒，抢占式VM如果30秒没有停止，将会被强制关闭。

**考点和答案：**

1. **考点：如何访问GCP中的Linux和Windows VM实例？**
    
    - **答案：**Linux实例使用SSH，Windows实例使用RDP。默认网络配置了必要的防火墙规则。
2. **考点：GCP VM实例的生命周期有哪些状态？**
    
    - **答案：**provisioning、staging、running、stopped、terminated、repairing、suspending。
3. **考点：什么是GCP VM实例的live migration？如何配置VM实例的维护策略？**
    
    - **答案：**live migration是在不重启VM的情况下将其迁移到同一区域的另一台主机。可通过配置Automatic restart和On host maintenance选项管理维护策略。
4. **考点：GCP的OS补丁管理服务有哪些功能？**
    
    - **答案：**补丁合规性报告和补丁部署。可以创建补丁批准，设置灵活的计划，应用高级补丁配置设置，集中管理补丁作业。
5. **考点：终止VM实例后，哪些资源会继续计费？**
    
    - **答案：**附加的磁盘和预留的IP地址。
6. **考点：GCP VM实例的reset操作和reboot操作有什么不同？**
    
    - **答案：**reset操作类似计算机重启，清除内存，实例保持running状态。reboot操作会关闭VM，然后重新启动。
7. **考点：GCP VM实例的关闭，包括停止，删除，重启等操作，需要多长时间？抢占式VM有什么不同？**
    
    - **答案：**大约90秒。抢占式VM如果30秒没有停止，将会被强制关闭。

希望这些总结和考点答案能够帮助您更好的准备GCP的考试。

# 英文缩写知识点

- **IaaS（Infrastructure as a Service）：** 基础设施即服务。这是一种云计算服务模式，它通过互联网向企业提供计算、存储、网络等基础设施资源。
- **GKE（Google Kubernetes Engine）：** Google Kubernetes引擎。这是Google Cloud提供的托管Kubernetes服务，用于部署、管理和扩展容器化应用程序。
- **CPU（Central Processing Unit）：** 中央处理器。它是计算机的主要执行单元，负责执行指令和处理数据。
- **GPU（Graphics Processing Unit）：** 图形处理器。它最初设计用于加速图形渲染，但现在也被广泛用于通用计算，特别是在机器学习和人工智能领域。
- **TPU（Tensor Processing Unit）：** 张量处理器。这是Google专门为机器学习工作负载开发的ASIC。
- **ASIC（Application-Specific Integrated Circuit）：** 专用集成电路。它是为特定应用定制的集成电路。
- **HDD（Hard Disk Drive）：** 硬盘驱动器。这是一种使用磁性存储介质存储数据的非易失性存储设备。
- **SSD（Solid-State Drive）：** 固态驱动器。这是一种使用闪存存储数据的非易失性存储设备，与HDD相比，SSD具有更高的读写速度和更低的延迟。
- **IOPS（Input/Output Operations Per Second）：** 每秒输入/输出操作数。这是衡量存储设备性能的指标，表示设备每秒可以执行的读写操作次数。
- **vCPU（virtual Central Processing Unit）：** 虚拟中央处理器。在云计算环境中，vCPU是分配给虚拟机的逻辑CPU单元。
- **HTTPS（Hypertext Transfer Protocol Secure）：** 安全超文本传输协议。它是HTTP的安全版本，通过SSL/TLS加密数据传输，提供更高的安全性。
- **VPC (Virtual Private Cloud):** 虚拟私有云，是用户在公有云上分配的隔离的云资源分区。