
# 📘 `@zilliz/milvus2-sdk-node` 常用操作函数文档（配中文注释）

---

## ✅ 5.1 连接数据库

```ts
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
  address: 'localhost:19530', // Milvus 服务地址，默认本地端口为 19530
});
```

|参数名|类型|说明|
|---|---|---|
|`address`|`string`|Milvus 的 gRPC 地址|

---

## ✅ 5.2 数据库管理

```ts
// 创建数据库
await milvusClient.createDatabase({ db_name: 'weibo_db' });

// 切换数据库
await milvusClient.usingDatabase({ db_name: 'weibo_db' });

// 列出数据库
const res = await milvusClient.listDatabases();

// 删除数据库
await milvusClient.dropDatabase({ db_name: 'weibo_db' });
```

|方法名|参数|说明|
|---|---|---|
|`createDatabase`|`{ db_name: string }`|创建数据库|
|`usingDatabase`|`{ db_name: string }`|切换当前数据库|
|`listDatabases`|无|获取所有数据库|
|`dropDatabase`|`{ db_name: string }`|删除数据库|

---

## ✅ 5.3 Schema 管理（创建集合）

```ts
import { DataType } from '@zilliz/milvus2-sdk-node';

await milvusClient.createCollection({
  collection_name: 'weibo_news',
  fields: [
    {
      name: 'id',
      data_type: DataType.Int64,
      is_primary_key: true,
      autoID: true
    },
    {
      name: 'content',
      data_type: DataType.VarChar,
      max_length: 1024
    },
    {
      name: 'embedding',
      data_type: DataType.FloatVector,
      dim: 384
    }
  ]
});
```

|字段名|类型|含义|
|---|---|---|
|`collection_name`|`string`|集合名|
|`fields`|`FieldType[]`|集合字段定义数组|
|`name`|`string`|字段名|
|`data_type`|`DataType` 枚举值|字段类型，如 `FloatVector`|
|`dim`|`number`|向量维度（向量类型时必填）|
|`max_length`|`number`|VarChar 的最大长度|
|`is_primary_key`|`boolean`|是否为主键|
|`autoID`|`boolean`|是否自增主键|

---

## ✅ 5.4 索引管理

```ts
await milvusClient.createIndex({
  collection_name: 'weibo_news',
  field_name: 'embedding',
  index_type: 'HNSW',
  metric_type: 'COSINE',
  params: {
    M: 16,
    efConstruction: 200
  }
});
```

|字段名|类型|说明|
|---|---|---|
|`collection_name`|`string`|集合名称|
|`field_name`|`string`|向量字段名称|
|`index_type`|`string`|索引类型，如 `"HNSW"`、`"IVF_FLAT"`|
|`metric_type`|`string`|相似度度量方式，如 `"COSINE"`|
|`params`|`object`|索引参数，如 HNSW 的 `M` 和 `efConstruction`|

---

## ✅ 5.5 集合管理

```ts
// 加载集合进内存
await milvusClient.loadCollection({ collection_name: 'weibo_news' });

// 卸载集合
await milvusClient.releaseCollection({ collection_name: 'weibo_news' });

// 删除集合
await milvusClient.dropCollection({ collection_name: 'weibo_news' });

// 查看集合信息
const info = await milvusClient.describeCollection({ collection_name: 'weibo_news' });
```

---

## ✅ 5.6 数据管理（插入和删除）

```ts
// 插入数据
await milvusClient.insert({
  collection_name: 'weibo_news',
  fields_data: [
    {
      content: '今天的热搜新闻...',
      embedding: [0.1, -0.2, ..., 0.3]
    }
  ]
});
```

|参数名|类型|说明|
|---|---|---|
|`collection_name`|`string`|目标集合名称|
|`fields_data`|`object[]`|插入数据数组（字段必须匹配 schema）|

---

```ts
// 删除数据
await milvusClient.deleteEntities({
  collection_name: 'weibo_news',
  expr: 'id in [123456789]'
});
```

---

## ✅ 5.7 搜索向量

```ts
await milvusClient.search({
  collection_name: 'weibo_news',
  vector: [[...query_vector]],
  topk: 5,
  metric_type: 'COSINE',
  params: { ef: 128 },
  output_fields: ['content']
});
```

| 参数名             | 类型           | 说明                        |
| --------------- | ------------ | ------------------------- |
| `vector`        | `number[][]` | 查询向量（二维数组）                |
| `topk`          | `number`     | 返回最相似的 K 个结果              |
| `metric_type`   | `string`     | 度量类型，如 `L2`、`COSINE`、`IP` |
| `params`        | `object`     | 搜索参数，如 `ef`               |
| `output_fields` | `string[]`   | 要返回的字段                    |

---

## ✅ 5.8 获取文本向量嵌入（需外部模型）

示例使用 OpenAI API 获取文本向量：

```ts
const res = await fetch('https://api.openai.com/v1/embeddings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    input: '女性友好的微博内容',
    model: 'text-embedding-3-small'
  })
});
const json = await res.json();
const embedding = json.data[0].embedding;
```

---

## ✅ 5.9 插入文本向量数据

```ts
await milvusClient.insert({
  collection_name: 'weibo_news',
  fields_data: [
    {
      content: '原始微博内容',
      embedding: embedding // 来自模型输出的向量
    }
  ]
});
```

---

## ✅ 5.10 图片向量（调用外部模型，如 CLIP）

你可以使用 Python 服务部署 CLIP 模型，通过 HTTP 接口或 Node.js 子进程方式调用，然后返回图片向量。

```ts
// 假设你有个服务返回图片向量
const response = await fetch('http://localhost:8000/embed-image', {
  method: 'POST',
  body: JSON.stringify({ imageUrl: 'https://image.url/abc.jpg' }),
  headers: { 'Content-Type': 'application/json' }
});
const imageEmbedding = await response.json();

// 插入图片向量
await milvusClient.insert({
  collection_name: 'image_vectors',
  fields_data: [{ image_url: 'https://...', embedding: imageEmbedding }]
});
```

---

如果你需要，我可以为你整理成一个 `milvus-utils.ts` 文件，封装所有操作成简洁易用的函数，比如：

```ts
await insertWeiboItem('微博文本...', embedding)
await searchWeiboSimilar('输入文本...')
```

需要我帮你整理成 SDK 工具文件吗？也可以直接和你的 Next.js 项目对接 🚀