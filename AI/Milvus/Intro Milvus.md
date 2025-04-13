
## 什么是 Milvus

Milvus 是一个开源的向量数据库，用于存储和检索向量数据。它支持高效的向量索引和相似性搜索，广泛应用于机器学习、自然语言处理、计算机视觉等领域。

## 为什么需要 Milvus

- 在数据量很大的情况下，传统的数据库查询方式效率低下
- 向量数据需要高效的索引和相似性搜索
- 需要处理高维数据

## 什么是向量

向量是具有方向和大小的量。在数学中，向量通常表示为箭头，箭头的长度表示向量的大小，箭头的方向表示向量的方向。

## 什么是向量数据库

向量数据库是一种专门设计用于存储和检索向量数据的数据库。它支持高效的向量索引和相似性搜索，广泛应用于机器学习、自然语言处理、计算机视觉等领域。

---
## Consistency

consistency（一致性）是Milvus在分布式环境中保证数据正确性和可用性的一个重要特性。Milvus 中的 `consistency` 参数用于控制客户端读取数据时的“新鲜程度”，它对查询性能和数据准确性有直接影响。

---
![[Pasted image 20250412134701.png]]
### Milvus 中的 `consistency` 选项有哪些？

Milvus 提供了以下几种一致性级别（`ConsistencyLevelEnum`）：

|一致性级别|描述|
|---|---|
|**Strong**|强一致性：所有的写入必须传播到所有副本后，查询才能看到它们。|
|**Bounded**|有界一致性：允许读取到一定时间范围内的写入，不要求传播到所有副本。|
|**Session**|会话一致性：在一个客户端会话中，后续读操作可以看到之前这个客户端写入的数据。|
|**Eventually**|最终一致性：允许读取旧数据，系统最终会趋于一致，性能最好但延迟较高。|

---

### 每种一致性级别的解释 + 使用场景

#### 1. **Strong 一致性**

- **说明**：只有当写入完成并复制到所有副本后，才允许读取。
    
- **使用场景**：对数据一致性要求极高的场景，比如实时金融数据、投票系统。
    
- **代价**：性能最低、延迟最大。
    

```ts
client.search({
  collection_name: "example",
  consistency_level: "Strong",
  ...
});
```

#### 2. **Bounded 一致性**

- **说明**：读取到的数据是某个时间点之后的数据（例如，30 秒内的数据是可见的）。
    
- **使用场景**：对一致性要求中等，但又希望性能较好，比如用户推荐系统。
    
- **默认值**：Milvus 默认使用这个一致性级别。
    

```ts
client.search({
  collection_name: "example",
  consistency_level: "Bounded",
  ...
});
```

#### 3. **Session 一致性**

- **说明**：同一个客户端在当前会话中写入的数据，在后续读取中可见；但其他客户端可能还看不到。
    
- **使用场景**：电商下单流程，例如用户添加商品到购物车后希望马上看到，但其他人不需要同步看到。
    
- **适合**：单用户连续操作的场景。
    

```ts
client.search({
  collection_name: "example",
  consistency_level: "Session",
  ...
});
```

#### 4. **Eventually 一致性**

- **说明**：读取可能是过时的数据，但系统最终会一致。
    
- **使用场景**：对性能要求极高、可以容忍短期数据不一致的推荐系统或监控系统。
    
- **优点**：查询速度最快。
    

```ts
client.search({
  collection_name: "example",
  consistency_level: "Eventually",
  ...
});
```

---

### 对比总结（通俗版）

| 一致性级别      | 数据是最新的吗？ | 查询速度快吗？ | 适合场景     |
| ---------- | -------- | ------- | -------- |
| Strong     | ✅ 非常新    | ❌ 慢     | 金融、投票系统  |
| Bounded    | ✅ 比较新    | ⚖️ 中等   | 推荐、搜索    |
| Session    | ✅ 自己写自己读 | ⚖️ 中等   | 用户会话相关操作 |
| Eventually | ❌ 可能旧    | ✅ 快     | 日志、推荐系统  |

---
## 索引 index
![[Pasted image 20250412142203.png]]

> Milvus 用索引来 **加速向量搜索性能** 🔍⚡️

---
### 什么是 Milvus 中的 Index？

在 Milvus 中，你将每条数据（比如一段文本）转换为一个向量后存入数据库。  
**但随着数据量变大，搜索速度会变慢。**  
为了让相似度搜索更快，Milvus 提供了多种“索引类型”来加速查询。

#### - `index_type`

- 选择哪种索引算法（比如 `IVF_FLAT`, `HNSW`, `DISKANN`, `AUTOINDEX`）

- Milvus 支持的 Vector Index Type 一览

| 索引类型        | 简称                     | 简介          | 使用场景         |
| ----------- | ---------------------- | ----------- | ------------ |
| `FLAT`      | 暴力搜索                   | 最原始的暴力比对方法  | 小数据量，高精度要求   |
| `IVF_FLAT`  | 倒排索引+精确比对              | 聚类+线性查找     | 中等数据量，推荐搜索   |
| `IVF_SQ8`   | 倒排索引+压缩                | 内存节省，精度略降   | 海量数据，内存受限    |
| `IVF_PQ`    | 倒排索引+产品量化              | 更强压缩        | 极大数据量、节省资源   |
| `HNSW`      | 小世界图索引                 | 高速 & 高精度图结构 | 实时搜索，响应快     |
| `NSG`       | Navigating Small World | 类似 HNSW，更稀疏 | 快速查询但构建慢（较旧） |
| `DISKANN`   | 磁盘近邻索引                 | 大数据，低内存     | 亿级数据、云服务     |
| `AUTOINDEX` | 自动优化索引                 | Milvus 自动挑选 | 快速上手 MVP 开发  |

---

## 📦 各索引类型详细说明

---

### 1. `FLAT`（暴力搜索）

- **原理**：每次查询都遍历所有向量
    
- **特点**：
    
    - 精度 ✅✅✅
        
    - 查询慢 ❌
        
    - 不占用额外内存
        
- **适用场景**：少量数据（<10k）、调试、模型评估
    

---

### 2. `IVF_FLAT`（倒排文件 + 精确比较）

- **原理**：先聚类，然后在最近的“桶”里查
    
- **特点**：
    
    - 查询速度提升 ✅
        
    - 精度也不错 ⚖️
        
    - 参数灵活（`nlist`, `nprobe`）
        
- **适用场景**：推荐系统、AI 搜索，数据中等（10w～100w）
    

---

### 3. `IVF_SQ8`（倒排文件 + 8位量化）

- **原理**：IVF + 用 8 位压缩每个向量
    
- **特点**：
    
    - 精度略低 ⚠️
        
    - 内存节省 ✅✅
        
    - 查询速度还行
        
- **适用场景**：移动端场景、内存受限服务
    

---

### 4. `IVF_PQ`（倒排文件 + Product Quantization）

- **原理**：把向量切分成块，每块量化
    
- **特点**：
    
    - 极度压缩 ✅✅✅
        
    - 精度略低
        
    - 构建耗时
        
- **适用场景**：亿级向量存储、超大语料库
    

---

### 5. `HNSW`（Hierarchical Navigable Small World）

- **原理**：图索引结构，逐层跳跃 + 精细查找
    
- **特点**：
    
    - 查询速度 ✅✅✅
        
    - 精度 ✅✅✅
        
    - 构建时间略久
        
- **适用场景**：实时响应系统、聊天机器人、图像搜索

**HNSW（Hierarchical Navigable Small World）** 是 Milvus 中非常重要的一个 **ANN（近似最近邻）索引类型**，在高性能搜索场景中非常常见，特别适合对查询速度要求较高的任务。

---

## 🧠 HNSW 是什么？

**HNSW** 是一种基于图的近似最近邻搜索算法，全称是：

> **Hierarchical Navigable Small World**

它的核心思想是构建一个**分层的图结构**，节点之间通过“友好”连接建立**小世界网络**，从高层到低层逐步搜索相似向量。相比其他索引方式：

- 🔍 查询速度非常快（适合高 QPS 场景）
    
- 💾 占用内存较大
    
- ✅ 支持精度和性能调优
    

---

## 🔧 Milvus 中 HNSW 的常见参数

创建 HNSW 索引时，你可以配置以下三个核心参数来控制搜索性能和索引质量：

|参数名|类型|默认值|作用|
|---|---|---|---|
|`M`|int|16|每个节点连接的邻居数，影响索引图密度|
|`efConstruction`|int|200|构建索引时的搜索范围（构图精度）|
|`ef` (查询时用)|int|通常设为 64~512|查询时的候选集合大小，影响精度和速度|

---

## ✳️ 参数详细说明

### 1. `M` – 图中每个节点的出边数（连接度）

- 越大代表每个向量连接更多邻居，图越密，**索引精度越高**
    
- 但也会增加索引构建时间和存储空间
    
- 通常值：`8~64`，推荐默认 `16`
    

---

### 2. `efConstruction` – 索引构建时的搜索宽度

- 控制构图时每个点探索的邻居数量
    
- 越大构图越慢，但图质量越高（更精准）
    
- 通常值：`100~500`，推荐 `200`
    

---

### 3. `ef`（查询时设置）– 搜索时的候选集合大小

- 越大意味着会探索更多节点，**查询更精准但也更慢**
    
- 可以在查询时动态设置
    
- 通常值：`64 ~ 512`，平衡速度与精度
    

---

## 🚀 实战创建 HNSW 索引（JavaScript / Node SDK 示例）

```ts
await milvusClient.createIndex({
  collection_name: 'weibo_hot_topics',
  field_name: 'embedding',
  index_name: 'hnsw_index',
  index_type: 'HNSW',
  metric_type: 'COSINE',
  params: {
    M: 16,
    efConstruction: 200
  }
});
```

> ⚠️ 注意：查询时 `ef` 是在 `search()` 参数中传入的：

```ts
await milvusClient.search({
  collection_name: 'weibo_hot_topics',
  vector: [your_vector],
  topk: 5,
  metric_type: "COSINE",
  params: {
    ef: 128
  }
});
```

---

## 📈 查询精度/速度调优建议

|场景|推荐配置|
|---|---|
|快速响应（牺牲一点精度）|M: 12, efConstruction: 100, ef: 64|
|高精度搜索（牺牲速度）|M: 32, efConstruction: 400, ef: 256|
|一般业务场景（平衡型）|M: 16, efConstruction: 200, ef: 128|

---

## 🧠 HNSW vs IVF (对比简要)

|特性|HNSW|IVF（倒排索引）|
|---|---|---|
|索引精度|✅ 更高|一般，需要结合 PQ 才更好|
|查询速度|✅ 非常快（适合在线实时）|快，但受限于 coarse quantization|
|索引大小|❗ 较大|较小|
|支持的场景|✅ 实时搜索、在线推荐、聊天机器人等|批量建索引、大数据量、节省空间场景|

---

## ✅ 小结表格（Markdown）

```markdown
| 参数名            | 含义                             | 建议设置        |
|-------------------|----------------------------------|-----------------|
| M                 | 图中每个点连接的邻居数            | 16（8~32 之间）  |
| efConstruction    | 索引构建时的搜索宽度              | 200（100~500）   |
| ef (查询时设置)   | 查询候选数，控制精度和速度         | 128（64~512）    |
```

---

如果你想我帮你把这套参数做成一个前端可选表单（下拉 / 滑动条）+ 一键创建索引的页面，我也可以用 Next.js + AntD 给你搭个界面哈 🔧

你是不是打算从微博热搜向量中做“改写前最相似的内容”查询？HNSW 就是理想方案🔥

要不要我也带你比较一下 HNSW 和 DiskANN（支持百万级磁盘数据量）？

---

### 6. `NSG`（Navigable Small World）

- **原理**：更稀疏的图结构
    
- **特点**：
    
    - 构建慢 ❌
        
    - 查询快 ✅
        
- **适用场景**：较旧，HNSW 替代了它，大多不推荐新项目用
    

---

### 7. `DISKANN`（磁盘索引）

- **原理**：索引在磁盘，读取时动态加载
    
- **特点**：
    
    - 不吃内存 ✅✅
        
    - 支持亿级数据 ✅✅✅
        
    - 查询速度高，略低于内存索引
        
- **适用场景**：大规模新闻推荐、离线语料搜索、知识库等
    

---

### 8. `AUTOINDEX`（自动索引）

- **原理**：Milvus 自行决定最合适的索引类型
    
- **特点**：
    
    - 简单 ✅✅✅
        
    - 不用管参数
        
    - 不适合极致性能调优
        
- **适用场景**：前期开发、快速上线、你这种 AI+前端项目 ✅
    

---

## ⚙️ 常用参数说明（以 IVF 为例）

```ts
await client.createIndex({
  collection_name: "my_news",
  field_name: "embedding",
  index_type: "IVF_FLAT",
  metric_type: "COSINE",
  params: {
    nlist: 128 // 聚类桶数（越大越精细）
  }
});
```

| 参数名                         | 说明                |
| --------------------------- | ----------------- |
| `nlist`                     | 聚类桶数量（影响索引颗粒度）    |
| `nprobe`                    | 搜索时探测的桶数量（越大越准但慢） |
| `M`, `efConstruction`, `ef` | 用于图索引（HNSW）参数     |
| `search_list`               | DISKANN 的搜索块数量    |

---

## 🏁 总结建议（开发角度）

|场景|推荐索引类型|
|---|---|
|快速原型、MVP、AI 项目|`AUTOINDEX` ✅|
|数据少（<1万条）|`FLAT`|
|数据中等，推荐/搜索|`IVF_FLAT` 或 `HNSW`|
|内存敏感场景|`IVF_SQ8` 或 `IVF_PQ`|
|极大语料，离线查询|`DISKANN`|
|高性能实时搜索|`HNSW` ✅✅|

---

#### - `metric_type`

用于计算相似度的方法（常见的有：`COSINE`, `L2`, `IP`）

| Metric Type      | 中文名                                                                                          | 计算方式（简要）    | 特点               | 适用场景                  |
| ---------------- | -------------------------------------------------------------------------------------------- | ----------- | ---------------- | --------------------- |
| `L2`             | 欧几里得距离 [度量类型](https://static.docs-hub.com/metrictypecomparison_1742108932902.html)           | 向量差的平方和     | 精度高，受数值大小影响      | 图像搜索、空间距离相似度          |
| `IP`             | 内积（Inner Product）[度量类型](https://static.docs-hub.com/metrictypecomparison_1742108932902.html) | 向量点积        | 值越大越相似，适合打分排序    | 推荐系统、模型输出排序           |
| `COSINE`         | 余弦相似度 [余弦相似度](https://static.docs-hub.com/cosinesimilarity_1742029975633.html)               | 向量夹角的余弦值    | 不看大小，只看方向，适合语义比对 | NLP 文本相似度、语义搜索（强推荐 ✅） |
| `HAMMING`        | 汉明距离 [度量类型](https://static.docs-hub.com/metrictypecomparison_1742108932902.html)             | 位不同的个数      | 仅适合二进制向量         | Hash 编码向量、二值图像        |
| `JACCARD`        | 杰卡德相似度                                                                                       | 交集 / 并集     | 稀疏集合有效           | 标签比对、用户行为集            |
| `TANIMOTO`       | 改进版杰卡德                                                                                       | 更严格的集合相似度计算 | 化学/药物专用          | 分子结构比对                |
| `SUBSTRUCTURE`   | 子结构匹配                                                                                        | 模式子图是否存在    | 专用于分子结构          | 药物发现、化学分子子结构搜索        |
| `SUPERSTRUCTURE` | 超结构匹配                                                                                        | 是否被包含为超图    | 专用于分子结构          | 药物结构查全                |


[余弦相似度](https://static.docs-hub.com/cosinesimilarity_1742029975633.html)

[度量类型](https://static.docs-hub.com/metrictypecomparison_1742108932902.html)

[归一化](https://static.docs-hub.com/normalization_1742096701876.html)
#### - `params`

不同索引类型有不同参数，比如：

- IVF 索引需要 `nlist`
    
- HNSW 需要 `M` 和 `efConstruction`
    
- DISKANN 需要 `search_list`
    

---

### 🛠 建立索引的流程（开发流程角度）

1. **建 Collection**
    
2. **插入向量**
    
3. **建立索引（createIndex）**
    
4. **加载数据（loadCollection）**
    
5. **开始搜索（search）**
    

---

### ✅ 实际推荐场景（比如你要做新闻推荐）

- 如果你一开始数据少 → 可以用 `FLAT`（暴力 + 精确）
    
- 新闻越来越多 → 切换 `IVF_FLAT` 或 `HNSW`（速度更快）
    
- 如果你要部署超大模型（比如每日千万条新闻） → 考虑 `DISKANN`
    

---

### 📦 对比总结表

|Index 类型|精确度|搜索速度|内存占用|适用数据量|
|---|---|---|---|---|
|`FLAT`|✅✅✅|❌|❌|小（<1万）|
|`IVF_FLAT`|✅✅|✅|⚖️|中（10万~百万）|
|`IVF_SQ8`|✅|✅|✅|中等|
|`HNSW`|✅✅✅|✅✅|⚖️|大|
|`DISKANN`|✅✅|✅✅✅|✅✅✅|特别大（千万~亿）|

---


`autoindex` 是 Milvus 为了**简化索引管理**、**降低使用门槛**推出的一种“自动索引模式”，尤其适合你这种前端开发者，**不需要深入了解底层索引算法和参数**，也能快速使用向量检索功能。

---

## ✨ 什么是 `autoindex`？

`autoindex` 是一种 **内置的、由 Milvus 自动管理的向量索引类型**。  
Milvus 在后台会自动选择合适的索引方式和参数（比如是否用 HNSW、IVF、FLAT 等），你只需要设置：

```ts
index_type: "AUTOINDEX"
```

> ✅ 它基于 Zilliz Cloud 上的专有优化，也可以在 Milvus 2.3+ 中使用。

---

## 🟩 使用 `autoindex` 的优点

|优点|说明|
|---|---|
|✅ **零配置**|不需要手动调 `nlist`、`M`、`efConstruction` 等参数|
|✅ **自动调优**|根据数据量、查询模式自动选择最优索引类型|
|✅ **省心省力**|不需要你每次插入后手动重建索引|
|✅ **适合开发阶段**|快速上线、测试项目阶段首选|

---

## 🚀 示例代码（超简单）

```ts
await client.createIndex({
  collection_name: "news_collection",
  field_name: "embedding",
  index_type: "AUTOINDEX",
  metric_type: "COSINE",
});
```

---

## ❗使用建议

|场景|是否推荐用 `autoindex`|原因|
|---|---|---|
|✅ 快速上线 MVP 项目|很推荐|少量参数，节省时间|
|✅ 不熟悉索引调优|很推荐|不需要深入理解 HNSW、IVF|
|✅ 云端项目（如 Zilliz Cloud）|很推荐|有性能增强支持|
|❌ 超大数据量（亿级）|慎用|自定义索引类型（如 DISKANN）可能效果更好|
|❌ 需要**极致性能调优**|慎用|无法控制底层细节参数|

---

## 🔍 和传统索引的对比

|特性|`autoindex`|传统索引（IVF/HNSW等）|
|---|---|---|
|控制权|❌ 无|✅ 可配各种参数|
|上手难度|✅ 极低|❌ 需要调参|
|自动重建索引|✅ 是|❌ 手动操作|
|灵活性|❌ 较差|✅ 强大|

---




## ❗ Milvus 中 collection schema **一旦创建，字段就不能更改或新增！**

### ✅ 意思是：

- 创建好 Collection 之后，**不能添加字段**
    
- 也 **不能删除字段**
    
- 更 **不能修改字段类型、名称等**
    

---

## 💡 为什么会这样？

Milvus 是专为 **向量数据检索优化** 的数据库，底层采用类似列式存储 + 倒排索引机制，为了性能、索引构建的稳定性，以及避免分布式混乱，它设计成**不可变 schema**。

---

## 🚧 那怎么办？后悔了怎么办？

### 🛠 替代方案：

1. **创建新的 Collection**
    
    - 新建一个 collection（带你想要的新字段）
        
    - 把旧数据“迁移”进去（自己写脚本重新插入）
        
2. **用 JSON 字段**（v2.2+ 支持）
    
    - 如果你不确定未来字段结构，可以提前加一个 `JSON` 类型字段
        
    - 用它来动态扩展，例如：
        

```ts
{
  name: "extra",
  data_type: DataType.JSON,
  description: "可扩展字段，存储一些附加属性"
}
```

在前端视角看就是一个类似 `record<string, any>` 的结构，Milvus 支持对 JSON 字段进行过滤、索引也在规划中。

---

## ✅ 建议你这样做：

如果你在做「微博热搜改写 + 嵌入 + 检索」系统：

```ts
{
  fields: [
    { name: "id", data_type: INT64, is_primary_key: true, autoID: true },
    { name: "original", data_type: VARCHAR, max_length: 1024 },
    { name: "rewritten", data_type: VARCHAR, max_length: 1024 },
    { name: "embedding", data_type: FLOAT_VECTOR, type_params: { dim: "768" } },
    { name: "metadata", data_type: JSON } // 👈 给未来扩展留个口
  ]
}
```

这样就能做到既有结构化字段，又有灵活性。

---
## Vector Search
### 🔍 Vector Search 中的 `level` 和 `radius` `range_filter` 是什么？

这两个参数并不是所有 index type 都支持，它们主要出现在支持 **范围搜索（range search）** 的场景，比如：

- 你不只是想要“最相似的 N 个向量”，
    
- 而是想找出“与查询向量距离在某个范围以内的所有向量”。
    

---

### 🟢 `radius`

- **含义**：你希望返回的向量，其距离（L2、Cosine、IP 等）与查询向量 **小于这个值**。
    
- **类型**：浮点数
    

#### 🧠 举例：

```ts
radius: 0.4
```

👉 代表只返回与查询向量距离 **小于 0.4** 的结果。

- 在 L2 距离下：越小越近
    
- 在 Cosine 相似度下：你可能需要将 `1 - cosine_value` 转换为距离
    

#### ✅ 使用场景：

- 做近邻“过滤”时，比如找相似文本，但排除差得太远的
    
- 适合语义过滤，比如“只要高于某个语义相似度的内容”
    

---

### 🟠 `range_filter`

- **含义**：这个参数在范围搜索时，**排除距离过近的结果**
    
- 与 `radius` 搭配使用，像是在结果之间开了个“窗口”
    

#### 🧠 举例：

```ts
radius: 0.6,
range_filter: 0.2
```

👉 代表只返回距离 **大于 0.2 且小于 0.6** 的向量。

#### ✅ 使用场景：

- 用于避免召回完全一样的向量（如自己）
    
- 或者你只想找“相似但不完全一样”的内容
    

---

## 🧪 实战示例：文本去重 + 推荐

你在做微博热搜改写系统时可以这样用：

```ts
await milvusClient.search({
  collection_name: 'weibo_news',
  vector: [...embedding],
  limit: 20,
  params: {
    radius: 0.5,
    range_filter: 0.1, // 不要太像的（比如原始内容自己）
    metric_type: 'COSINE',
    offset: 0,
  }
});
```

---

## 📌 总结对比表（Markdown 格式）

| 参数名             | 说明               | 示例值   | 适用场景               |
| --------------- | ---------------- | ----- | ------------------ |
| `radius`        | 最大距离，返回“足够相似”的向量 | `0.4` | 查找相似文本 / 图像 / 内容过滤 |
| `range_filter`  | 最小距离，过滤掉“太像的”结果  | `0.1` | 排除自己、避免重复 / 增加多样性  |

---



|参数|作用领域|用于什么类型|意义/用途|
|---|---|---|---|
|`level`|搜索参数控制|**Flat/Brute Force** 类型搜索（或某些索引）|控制并发度 / 搜索深度 / 线程层级（与搜索精度或速度有关）|
|`range_filter`|范围查询（Range Search）|**用于 radius search**（范围检索）|用来排除距离太近的向量，返回 **(range_filter < 距离 < radius)** 的|

---

### 🔷 `range_filter`：范围过滤器

- 是 Milvus 在 **范围搜索（Range Search）** 中使用的参数
    
- 控制返回的距离范围是 `range_filter < distance < radius`
    
- 通常与 `radius` 搭配使用
    
- **常用于：** 相似但不重复、避免召回自己本身
    

#### 举个例子：

```ts
params: {
  radius: 0.7,
  range_filter: 0.3
}
```

表示返回的是：

> 所有距离在 `0.3` 到 `0.7` 之间的向量

---

### 🔷 `level`：搜索并发深度控制器（一般用于 Flat）

- 控制 CPU 的并发或搜索线程数目（在一些引擎如 `BruteForce` 中使用）
    
- 也可能用于一些特定 index type（但不是主流参数）
    
- 数值越高，性能越高（或资源消耗越大）
    

#### 举个例子：

```ts
params: {
  level: 2
}
```

表示搜索时用更深的层级或更多并发线程，**可能提升性能或精度**（具体取决于后端引擎的实现）

---

## 🚀 开发者视角简记：

| 你要干嘛？              | 用哪个？             | 示例                    |
| ------------------ | ---------------- | --------------------- |
| 想控制返回结果的“相似度范围”    | ✅ `range_filter` | radius + range_filter |
| 想让搜索跑得更快一点         | ✅ `level`        | level: 2 or level: 4  |
| 想过滤掉“自己”或“过于相似”的数据 | ✅ `range_filter` | range_filter: 0.1     |

---

## 📘 延伸提示

- `range_filter` 只在 **range search 模式** 中生效（不是默认的 top-k search）
    
- `level` 并不是所有 index 都支持，通常只在 brute-force 或 flat 模式下起作用
    
- 在使用时，**你传给 Milvus 的 params** 要根据你选择的 index_type 和 search_type 来适配！
    

# Partition 分区
## 🗂 什么是 Partition（分区）？

在 Milvus 中：

> **Partition 是 Collection 的逻辑子集**，用来把一个 Collection 中的数据按某种规则**划分成多个子集合**。

你可以把 Partition 理解为：

- 数据库里的「子表」
    
- 前端中的「标签页分类」或「动态数据分组」
    
- MongoDB 里的「shard key」逻辑（虽然不是一样的东西）
    

---

## 🧱 数据组织结构

```
Collection（微博热搜新闻）
├── Partition: default （默认分区）
├── Partition: 娱乐
├── Partition: 体育
├── Partition: 时政
└── Partition: AI科技
```

每个 Partition 都可以：

- 插入自己的数据
    
- 查询时指定只在某些分区内查（提高性能！）
    
- 逻辑上独立，但仍属于同一个 Collection（共享 schema）
    

---

## 💡 为什么用 Partition？

|好处|说明|
|---|---|
|✅ 查询更快|比如只查“娱乐”分类，不必遍历所有数据|
|✅ 数据更好管理|结构清晰、可按时间、类别等维度拆分|
|✅ 写入可并行优化|多个分区可并行处理写入数据|
|✅ 节省资源|查询时避免加载不相关数据块|

---

## 🧪 示例：创建分区

假设你已经有一个 Collection 叫 `weibo_news`

```ts
await milvusClient.createPartition({
  collection_name: 'weibo_news',
  partition_name: 'sports',
});
```

---

## ➕ 插入数据到指定分区

```ts
await milvusClient.insert({
  collection_name: 'weibo_news',
  partition_name: 'sports',
  fields_data: [
    {
      original: 'NBA总决赛激战正酣',
      rewritten: '男子体育热血时刻来袭！关注背后的女性故事',
      embedding: [...],
    }
  ]
});
```

---

## 🔍 搜索时指定分区（只查特定分类）

```ts
await milvusClient.search({
  collection_name: 'weibo_news',
  partition_names: ['sports'],
  vector: [...embedding],
  limit: 5,
  params: {
    metric_type: 'COSINE',
    topk: 5,
  }
});
```

---

## ⚠️ 注意事项

|限制/规则|说明|
|---|---|
|默认 Partition 是 `"_default"`|所有不指定的写入默认放这里|
|一个 Collection 最多支持 4096 个分区|够用了|
|分区不能嵌套|分区是一级结构|
|删除 Partition 会删除其中所有数据|慎重操作！|

---

## 🧠 项目建议：微博热搜系统中的 Partition 使用

|分区维度|建议|
|---|---|
|按分类划分|娱乐 / 体育 / 时政 / 科技|
|按时间划分|2025-04-01 / 2025-04-02 等|
|按内容标签划分|女性议题 / 负面新闻 / 励志故事|

你可以结合标签提取算法或预处理自动选择分区，未来方便做时间衰减、批量清理或只查活跃数据 🔁

---
## 🧩 Segment 是什么？

> **Segment 是 Milvus 存储数据的最小单位**，可以理解为：
> 
> - Collection ➜ 表
>     
> - Partition ➜ 表的分类
>     
> - **Segment ➜ 表中的一个数据块**
>     

你可以把它比作：

|系统|类比|
|---|---|
|MySQL|表中的一页 page|
|Elasticsearch|一个 Lucene shard|
|前端开发|本地缓存分片（chunk）|

每个 Segment 会存储一部分数据，通常是 **几万条记录**。

---

## 📦 Segment 的分类（两种类型）

|类型|说明|
|---|---|
|✅ `growing segment`|正在写入中的数据段，数据是**新插入**还没被持久化索引的（内存）|
|✅ `sealed segment`|已经构建索引、**只读**、**存储在磁盘**中，用于高效检索|

> 插入数据 ➜ 先写到 growing segment ➜ 达到阈值 ➜ 自动 sealed ➜ 构建索引

---

## 📊 Segment 生命周期（Milvus 是自动管理的）

1. **你插入数据**，Milvus 将数据写入对应 Partition 下的 Growing Segment
    
2. **当达到一定大小或时间**（比如 512MB 或几万条），Milvus 自动将它 "seal"
    
3. **Sealed Segment** 会进行持久化 + 索引构建，之后进入检索引擎中
    

你自己不需要手动管理 Segment，它是由 Milvus 调度引擎自动控制的。

---

## 🎯 Segment 的作用

|用途|说明|
|---|---|
|🔍 查询优化|查询时只会命中可能相关的 segments，提升性能|
|📦 存储划分|数据被拆成多个 segment 更便于并发处理、压缩与归档|
|🔁 自动合并|后台有 compaction 机制自动合并小 segment 提高效率|
|📈 性能监控|你可以通过 segment 状态了解写入/检索瓶颈|

---

## 👀 开发者常用场景

你可以通过 SDK / 控制台 / Prometheus 来查看 segment 状态：

```bash
# milvus-insight 面板中可视化查看每个 collection 下的 segment 数量与状态
```

或者用 Python SDK：

```python
milvus_client.get_segment_info(collection_name="weibo_news")
```

返回每个 segment 的：

- segment_id
    
- 分区所属
    
- row count
    
- state（growing / sealed）
    
- index status
    

---

## 💡 对你项目的启示（微博热搜改写）

| 场景            | 如何关联 Segment 思维                       |
| ------------- | ------------------------------------- |
| 实时热搜持续写入      | 数据写入到 growing segment，Milvus 自动 seal  |
| 语义检索优化        | 查询时 Milvus 只在相关 sealed segment 上做索引查找 |
| 你想查昨天 vs 今天数据 | 可以结合分区 + segment metadata 做调度/过滤      |

---

## 🧠 总结对比（Collection / Partition / Segment）

```markdown
| 级别        | 概念           | 作用                               |
|-------------|----------------|------------------------------------|
| Collection  | 表             | 定义数据结构（schema）              |
| Partition   | 逻辑子集       | 分类数据（按时间 / 主题）            |
| Segment     | 存储块         | Milvus 自动划分存储 + 构建索引       |
```
---


## 🧠 总览：Milvus 的核心组件

Milvus 是个 **分布式向量数据库系统**，它背后有一整套微服务架构：

|角色|主要功能|
|---|---|
|**QueryNode**|👉 负责查询计算！处理搜索 / Top-K / 向量比对|
|**DataNode**|写入数据、处理 insert / delete 等操作|
|**IndexNode**|异步构建索引（比如 IVF, HNSW）|
|**Proxy**|统一入口，类似 API 网关|
|**RootCoord**|中央控制器，管理 Collection / Partition 等元数据|
|**QueryCoord**|分配查询任务给 QueryNode|
|**DataCoord**|分配写入任务给 DataNode|
|**IndexCoord**|管理索引任务调度|
|**Storage（MinIO）**|存储 sealed segment 和索引|

> ✅ 所有这些统称为 **节点（Node）**，你可以把它们理解成： **"微服务 + 分工明确 + 分布式任务处理" 的一套系统。**

---

## 🔍 重点解释：QueryNode（查询节点）

### 🌟 QueryNode 的职责：

> 负责从向量索引中查找最相似的向量。也就是说：
> 
> **你调用 search() 接口时，最终是在 QueryNode 中完成的搜索计算！**

#### 它会做的事包括：

- 加载被查询的 segment（从磁盘或缓存）
    
- 对比向量，执行搜索（Top-K / Range Search）
    
- 返回排序好的结果
    
- 支持并发查询、多线程计算（性能关键）
    

#### 查询流程示意图：

```txt
[Client] --> [Proxy] --> [QueryCoord] --> [QueryNode X]
                                          [QueryNode Y]
```

Milvus 会根据你查询的 Partition/Collection 自动分配合适的 QueryNode 来执行。

---

## 📦 其他关键节点简述（对比一下）

| 节点         | 说明                              |
| ---------- | ------------------------------- |
| DataNode   | 负责 insert、delete，写入 raw 数据      |
| IndexNode  | 把 segment 做成索引（比如 IVF、HNSW）     |
| QueryNode  | 🔍 **处理查询逻辑 + 搜索执行**            |
| Proxy      | 接受客户端请求并路由到各服务                  |
| QueryCoord | 负责给 QueryNode 分配任务              |
| RootCoord  | 管理 collection / partition / 元数据 |

---

## 🧪 应用示例：你做微博热搜改写项目时

你可能每分钟都在收集新微博热搜，写入向量，然后每秒在搜索最像的一条内容。

- 🔄 写入：DataNode 接收数据，存储到 growing segment
    
- 🧠 索引：IndexNode 后台异步建索引
    
- 🔍 搜索：QueryNode 执行向量比对，返回结果
    

当你的查询压力大时（比如用户量变多），可以部署多个 **QueryNode 实例** 做水平扩展！

---

## 🚀 开发/部署时的建议

|场景|建议|
|---|---|
|查询慢、搜索延迟高|增加 QueryNode 实例数|
|写入慢、建索引积压|增加 DataNode / IndexNode|
|想做高可用部署|启动多个 Proxy、Node 并加负载均衡|
|查询结果不一致或慢热|检查 segment 是否被加载到 QueryNode|

---

## 🧠 小总结
| 角色        | 描述                | 你能看到的作用           |
| --------- | ----------------- | ----------------- |
| 节点 Node   | Milvus 的微服务构成（统称） | 数据管理、查询、索引等都由节点执行 |
| QueryNode | 查询节点，处理搜索计算       | 查询速度、性能关键         |

## 🧠 `properties` 是什么？

在 Milvus 中，当你创建 Collection 时，除了定义字段结构（schema）之外，还可以配置一些 **额外的 Collection 属性（properties）** 来控制：

- 数据分布行为
    
- 分区设置
    
- 压缩策略
    
- 向量类型的一些细节行为
    

这些参数是给 Milvus 内核“调优”的，不是字段的一部分，但会影响整个 Collection 的行为。

---

## ✅ 使用场景：创建 Collection 时传入

这些 `properties` 通常用于 API/SDK 创建 Collection 的时候作为选项传入。例如（Python SDK）：

```python
collection = Collection(
    name="my_collection",
    schema=my_schema,
    properties={
        "collection.ttl.seconds": "604800",  # 设置数据7天后过期
        "enable_dynamic_field": "true",       # 启用动态字段
    }
)
```

---

## 🔧 常见的 `properties` 列表

|属性键名|含义|典型用途|
|---|---|---|
|`collection.ttl.seconds`|设置数据保留时间（单位秒）超时后数据会被自动清除|热点数据保留，如保留 7 天微博热搜|
|`enable_dynamic_field`|启用/禁用动态字段（true/false）|如果你要写入 schema 以外的字段|
|`auto_id`|主键是否自动生成（true/false）|自增主键|
|`segment.row_limit`|控制一个 segment 的最大行数，默认 100000|控制内存占用 + 索引粒度|
|`custom_vector_type`（不常见）|设置自定义向量类型（如用于压缩/存储优化）|特定部署环境可用|

---

## 📦 `properties` vs `schema` vs `data`

|名称|含义|示例|
|---|---|---|
|`schema`|定义字段结构（字段名、类型、主键等）|向量字段 + 属性字段|
|`data`|实际写入的数据内容|每条记录（向量+属性值）|
|`properties`|Collection 的元属性/配置项|TTL、生存周期、动态字段、自增ID、segment大小等|

---

## 🧪 示例：微博热搜项目的创建配置（Python）

```python
schema = CollectionSchema(
    fields=[...],  # 向量字段、标题字段、时间戳等
    description="微博热搜改写项目"
)

collection = Collection(
    name="weibo_hot_topics",
    schema=schema,
    properties={
        "collection.ttl.seconds": "86400",  # 每天清除旧热搜
        "enable_dynamic_field": "true",     # 支持添加额外标签
    }
)
```

---

## ✳️ 动态字段 `enable_dynamic_field` 是干啥的？

如果你设置 `enable_dynamic_field: true`，你就可以：

- 向 Collection 写入不在 schema 中定义的字段
    
- 这些“动态字段”仍会被存储，但不会强类型校验
    
- 适合数据结构变化频繁的场景，比如微博 JSON 数据、日志类数据
    

---

## ✅ 总结表格（Markdown）

```markdown
| 属性名                    | 类型     | 含义/用途                                       |
|---------------------------|----------|-------------------------------------------------|
| collection.ttl.seconds    | string   | 设置数据存活时间（秒），超过自动删除             |
| enable_dynamic_field      | string   | 是否开启动态字段（true/false）                  |
| auto_id                   | string   | 是否自动生成主键 ID（true/false）               |
| segment.row_limit         | string   | 每个 segment 最大行数（默认 100,000）            |
```

---
