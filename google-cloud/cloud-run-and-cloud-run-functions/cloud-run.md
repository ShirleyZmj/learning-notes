## **用 Cloud Run 监听 Cloud Storage 文件上传的完整示例（Node.js）**
如果你想要更 **灵活、可扩展** 的方式来监听 Cloud Storage 上传文件，可以用 **Cloud Run** 代替 Cloud Functions。  

---

## **🛠 场景**
1. **用户上传文件到 Cloud Storage**（通过 Web、命令行等）。  
2. **Cloud Storage 事件触发 Pub/Sub**（Google 提供的机制）。  
3. **Cloud Run 订阅 Pub/Sub 事件**，处理上传的文件（如图片压缩）。  
4. **处理后的文件存入另一个 Cloud Storage 目录**，供前端访问。

📌 **为什么用 Cloud Run 而不是 Cloud Functions？**  
✅ **支持长时间任务**（Cloud Functions 限制 9 分钟，Cloud Run 可达 60 分钟）。  
✅ **支持高并发**（Cloud Functions 每次只能处理 1 个请求，Cloud Run 可同时处理多个）。  
✅ **更强的控制**（可以手动扩展、副本管理、访问私有网络）。  

---

## **1️⃣ 用户如何上传文件**
### **方式 1：Web 前端上传**
用户可以通过 Web 应用（React、Vue、Next.js 等）上传文件，后端调用 Cloud Storage API。  

**示例（前端代码）**
```html
<input type="file" id="fileInput" />
<button onclick="uploadFile()">上传</button>
<script>
async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  if (!fileInput.files.length) return alert('请选择文件');

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/upload', { // 这里 `/upload` 是你的后端 API
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  console.log('上传结果:', result);
}
</script>
```

### **方式 2：直接用 `gsutil` 命令上传**
```sh
gsutil cp my-image.jpg gs://your-bucket-name/uploads/
```

---

## **2️⃣ 配置 Pub/Sub 监听 Cloud Storage**
Cloud Storage 不能直接触发 Cloud Run，但它可以 **通过 Pub/Sub 发送事件**，然后 Cloud Run 订阅这个 Pub/Sub 消息。  

### **创建 Pub/Sub 主题**
```sh
gcloud pubsub topics create my-storage-events
```

### **让 Cloud Storage 发送事件到 Pub/Sub**
```sh
gcloud storage buckets update your-bucket-name --notification-set \
  --topic=my-storage-events \
  --event-types=OBJECT_FINALIZE
```

---

## **3️⃣ Cloud Run 监听 Cloud Storage 上传**
当 Cloud Storage 文件上传时，Cloud Run **订阅 Pub/Sub**，并处理文件（例如 **压缩图片**）。

📌 **Cloud Run 代码（Node.js）**
```javascript
const express = require('express');
const { Storage } = require('@google-cloud/storage');
const { PubSub } = require('@google-cloud/pubsub');
const sharp = require('sharp');

const app = express();
app.use(express.json());

const storage = new Storage();
const pubsub = new PubSub();
const bucketName = 'your-bucket-name';

// 处理 Pub/Sub 事件
app.post('/process-file', async (req, res) => {
  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString();
    const event = JSON.parse(message);
    const filePath = event.name;

    if (!filePath.startsWith('uploads/')) {
      return res.status(200).send('Not an upload event');
    }

    console.log(`Processing file: ${filePath}`);

    const bucket = storage.bucket(bucketName);
    const tempFilePath = `/tmp/${filePath.split('/').pop()}`;
    const compressedFilePath = filePath.replace('uploads/', 'compressed/');

    // 下载文件
    await bucket.file(filePath).download({ destination: tempFilePath });

    // 压缩图片
    await sharp(tempFilePath)
      .resize({ width: 800 })
      .jpeg({ quality: 80 })
      .toFile(tempFilePath + '_compressed.jpg');

    // 上传压缩后的文件
    await bucket.upload(tempFilePath + '_compressed.jpg', {
      destination: compressedFilePath,
      metadata: { contentType: 'image/jpeg' },
    });

    console.log(`Compressed file saved: ${compressedFilePath}`);
    res.status(200).send('Success');
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error');
  }
});

// 监听端口
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## **4️⃣ 部署 Cloud Run**
### **构建 Docker 镜像**
```sh
gcloud builds submit --tag gcr.io/your-project-id/cloud-run-storage
```

### **部署到 Cloud Run**
```sh
gcloud run deploy storage-listener \
  --image gcr.io/your-project-id/cloud-run-storage \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated
```

### **创建 Pub/Sub 订阅**
```sh
gcloud pubsub subscriptions create my-storage-sub \
  --topic=my-storage-events \
  --push-endpoint=https://storage-listener-xxxx.a.run.app/process-file \
  --expiration-period=never
```

---

## **5️⃣ 监听文件上传的常见用途**
| **用途** | **为什么要监听？** | **示例应用** |
|------|------|------|
| **自动压缩图片** | 节省存储空间，优化加载速度 | CDN、社交平台 |
| **视频转码** | 适配不同设备播放 | YouTube、Netflix |
| **OCR 文本识别** | 提取 PDF、图像文字 | 搜索引擎、档案系统 |
| **AI 处理** | 触发机器学习任务 | 自动标注图片 |
| **日志分析** | 解析和存储日志 | 监控系统 |

---

## **6️⃣ Cloud Functions vs Cloud Run**
| **需求** | **Cloud Functions** | **Cloud Run** |
|------|------|------|
| **事件触发（如文件上传）** | ✅ 适合 | ✅ 适合 |
| **短时间任务（< 9 分钟）** | ✅ 适合 | ✅ 适合 |
| **长时间运行（> 9 分钟）** | ❌ 不支持 | ✅ 适合（最长 60 分钟） |
| **高并发（同时处理多个请求）** | ❌ 只能 1 并发 | ✅ 高并发 |
| **Web API（如 AI 预测）** | ❌ 不适合 | ✅ 适合 |
| **访问私有 VPC（如数据库）** | ❌ 不支持 | ✅ 适合 |

---

## **7️⃣ 什么时候用 Cloud Functions？什么时候用 Cloud Run？**
✅ **用 Cloud Functions（简单任务）**
- 适用于 **小型、低并发、短时任务**（如触发 BigQuery、解析 JSON）。
- **事件触发简单，无需复杂配置**。

✅ **用 Cloud Run（更强的控制）**
- 适用于 **高并发、长时任务、需要 VPC 访问**（如图片压缩、AI 任务）。
- **需要手动订阅 Pub/Sub**，但可扩展性更强。

---

## **8️⃣ 总结**
🚀 **Cloud Functions 适合简单事件触发，Cloud Run 适合更复杂的任务**。  
🚀 **如果你需要高并发、长时间任务（如 AI 处理），Cloud Run 更合适**。  
🚀 **你想做 Web API，还是纯事件触发任务？**