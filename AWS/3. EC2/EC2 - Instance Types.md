# EC2 实例类型 (EC2 Instance Types)

不同的 EC2 实例类型针对不同的 **use cases** 进行了优化，并具有不同的特性。AWS 采用特定的命名约定来标识实例类型。

## EC2 实例类型命名约定 (Naming Convention)

一个典型的 EC2 实例类型名称如 `m5.2xlarge`，其含义如下：

- **`m` (Instance Class):** 表示实例的类别。例如，`m` 代表 **General Purpose**（通用型）。
- **`5` (Generation):** 表示实例的代数。数字越大，通常代表更先进的硬件。
- **`2xlarge` (Size):** 表示实例在所属类别中的大小。尺寸越大，通常拥有更多的内存和 CPU。尺寸从小到大依次为 `small`, `large`, `xlarge`, `2xlarge`, `4xlarge` 等。

## 主要 EC2 实例类型 (Main EC2 Instance Types)

AWS 提供了七种主要的 EC2 实例类型：

1.  **General Purpose (通用型):**
    - **特点:** 在计算、内存和网络之间提供良好的平衡。
    - **适用场景:** Web 服务器、代码仓库等多样化的工作负载。
    - **实例类别:** `T` (如 `t2.micro`) 和 `M` (如 `m5.large`) 系列。本课程使用 `t2.micro` (属于免费套餐)。

2.  **Compute Optimized (计算优化型):**
    - **特点:** 针对计算密集型任务进行了优化，提供高性能处理器。
    - **适用场景:** 批量数据处理、媒体转码、高性能 Web 服务器、高性能计算 (HPC)、机器学习、专用游戏服务器。
    - **实例类别:** `C` 系列 (如 `c5.large`, `c6g.xlarge`)。

3.  **Memory Optimized (内存优化型):**
    - **特点:** 专为处理内存中的大型数据集而设计，提供快速的内存性能 (RAM)。
    - **适用场景:** 高性能关系型和非关系型数据库（内存数据库）、分布式 Web 级缓存存储（如 Elasticache）、商业智能 (BI) 应用、实时大数据处理。
    - **实例类别:** `R` (RAM), `X` (High Memory), `Z` (High Performance) 系列 (如 `r5.xlarge`, `x1e.xlarge`, `z1d.large`)。

4.  **Accelerated Computing (加速计算型):**
    - **特点:** 使用硬件加速器（如 GPU、FPGA）来执行浮点数计算、图形处理或数据模式匹配等功能。
    - **适用场景:** 图形密集型应用、机器学习推理、高性能数据库、基因组学、金融分析。
    - **实例类别:** `P` (GPU 通用计算), `DL` (深度学习), `Inf` (机器学习推理), `G` (图形优化), `F` (FPGA) 系列。

5.  **Storage Optimized (存储优化型):**
    - **特点:** 针对需要对本地存储进行高频、低延迟访问的工作负载进行了优化。
    - **适用场景:** 高频在线事务处理 (OLTP) 系统、关系型和 NoSQL 数据库、内存数据库缓存（如 Redis）、数据仓库应用、分布式文件系统、搜索优化。
    - **实例类别:** `I` (High-IOPS), `G` (Dense Storage), `H` (High Throughput) 系列 (如 `i3.xlarge`, `d2.xlarge`, `h1.4xlarge`).

6.  **Network Optimized (网络优化型):**
    - **特点:** 针对需要高吞吐量和低延迟的高级网络性能进行了优化。
    - **适用场景:** 高性能计算 (HPC)、大规模并行处理、网络密集型应用。
    - **实例类别:** 部分实例类型在其他类别中也提供网络优化选项，例如带有 `n` 后缀的实例 (如 `m5dn.xlarge`).

7.  **Machine Learning Optimized (机器学习优化型):**
    - **特点:** 专门为机器学习工作负载设计，提供优化的硬件和软件配置。
    - **适用场景:** 机器学习训练和推理。
    - **实例类别:** `P`, `DL`, `Inf` 系列。

## 实例类型比较示例

![[Pasted image 20250522105454.png]]
