## **监听 Cloud Storage 上传文件的完整示例（Node.js）**
我们以一个 **图片上传 + 自动压缩** 的实际应用为例。

### **🛠 场景**
- **用户上传图片** 到 Cloud Storage（例如通过 Web 前端或命令行）。
- **Cloud Functions 监听文件上传** 并自动压缩图片（使用 `sharp` 进行压缩）。
- **压缩后的图片存入另一个 Cloud Storage 目录**，供前端访问。

---

## **1️⃣ 用户如何上传文件**
**方式 1：Web 前端上传**
用户可以通过 Web 应用（React、Next.js、Vue 等）上传文件，后端调用 Cloud Storage API。  
**示例（前端代码，HTML + JavaScript）**
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

**方式 2：直接用 `gsutil` 命令行上传**
```sh
gsutil cp my-image.jpg gs://your-bucket-name/uploads/
```

---

## **2️⃣ Cloud Functions 监听 Cloud Storage 事件**
当文件上传到 **`uploads/` 目录** 时，Cloud Functions 自动触发，并执行 **图片压缩** 任务。

```javascript
const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

const storage = new Storage();
const bucketName = 'your-bucket-name';

functions.cloudEvent('onFileUpload', async (event) => {
  const file = event.data;
  const filePath = file.name;

  // 仅处理 `uploads/` 目录的图片
  if (!filePath.startsWith('uploads/')) return;

  console.log(`Processing file: ${filePath}`);

  const bucket = storage.bucket(bucketName);
  const tempFilePath = `/tmp/${filePath.split('/').pop()}`;
  const compressedFilePath = filePath.replace('uploads/', 'compressed/');

  try {
    // 下载原始文件
    await bucket.file(filePath).download({ destination: tempFilePath });

    // 进行图片压缩
    await sharp(tempFilePath)
      .resize({ width: 800 }) // 调整宽度为 800px
      .jpeg({ quality: 80 }) // 质量压缩到 80%
      .toFile(tempFilePath + '_compressed.jpg');

    // 上传压缩后的文件到 `compressed/` 目录
    await bucket.upload(tempFilePath + '_compressed.jpg', {
      destination: compressedFilePath,
      metadata: { contentType: 'image/jpeg' },
    });

    console.log(`Compressed file saved: ${compressedFilePath}`);
  } catch (error) {
    console.error('Error processing file:', error);
  }
});
```

---

## **3️⃣ 部署 Cloud Function**
```sh
gcloud functions deploy onFileUpload \
  --gen2 \
  --runtime=nodejs18 \
  --trigger-event=google.storage.object.finalize \
  --trigger-resource=your-bucket-name
```

---

## **4️⃣ 监听文件上传的常见用途**
| **用途** | **为什么要监听？** | **示例应用** |
|------|------|------|
| **自动压缩图片** | 节省存储空间，优化加载速度 | CDN、社交平台 |
| **视频转码** | 适配不同设备播放 | YouTube、Netflix |
| **PDF 文档处理** | 提取文本、生成缩略图 | 文档管理系统 |
| **AI 任务触发** | 触发 OCR、图像识别 | 自动标注图片 |
| **自动备份** | 复制到另一个存储区域 | 数据保护 |
| **日志分析** | 解析和存储日志 | 监控系统 |

---

## **5️⃣ 总结**
✅ **Cloud Storage 上传文件后，Cloud Functions 自动触发**  
✅ **可用于图片压缩、视频转码、AI 任务、日志处理等场景**  
✅ **可与 Web 前端或 CLI 结合，实现自动化数据处理**  

你是打算做 **图片/视频处理** 还是 **日志/数据分析**？🚀

### **Cloud Run Functions（Cloud Run 函数）**  

Cloud Run Functions 是 Google Cloud 针对无服务器（Serverless）函数的解决方案。它是一项完全托管的服务，可基于云环境中的事件（包括服务和基础设施）触发执行函数，而无需管理服务器或配置扩展。  

- **事件触发执行**：当触发器向服务监听的 HTTP 端点发送请求时，Cloud Run Functions 会部署并执行相应的函数，并返回代码指定的结果。  
- **按使用计费**：计费方式基于事件数量、计算时间、内存使用情况以及网络流量（入口/出口）。如果没有请求进入，则不会产生费用。  
- **应用场景**：Cloud Run Functions 适用于 **IoT 数据处理** 和 **轻量级 ETL（数据提取、转换、加载）**。  
- **运行时自动更新**：Cloud Run Functions 会根据所选编程语言提供基础镜像和运行时，并自动进行更新和安全补丁，以保障函数执行的安全性。  
- **无状态执行**：由于 Cloud Run Functions 运行在不同实例上，每个实例 **只能处理一个并发请求**，因此函数必须是无状态的。如果需要持久化数据，可使用 **Datastore** 或 **Cloud Storage**。  
- **自动扩展**：当请求增多时，Cloud Run Functions 会自动创建更多实例进行处理，但可以设置最小实例数，以减少冷启动带来的延迟。