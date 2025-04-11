### **AWS 全称**
AWS（Amazon Web Services）是 **亚马逊云服务**，提供全球领先的云计算解决方案，包括 **计算（EC2）、存储（S3）、数据库（RDS）、人工智能、物联网（IoT）等** 服务。AWS 是目前全球市场份额最大的云计算平台。

---

### **AWS vs Google Cloud（GCP）区别**
AWS 和 Google Cloud（GCP，Google Cloud Platform）都是主流的云计算平台，但它们在市场定位、产品生态、定价等方面有明显区别：

| **对比项** | **AWS** | **Google Cloud（GCP）** |
|-----------|--------|------------------------|
| **市场占有率** | **全球第一**（>30%） | 全球第三（约10%） |
| **成立时间** | 2006 年 | 2011 年 |
| **核心优势** | **服务最全面，生态最成熟**，全球最多的数据中心 | **AI & 大数据最强**，整合 Google AI 和搜索技术 |
| **计算服务** | EC2（弹性计算） | Compute Engine |
| **存储** | S3（对象存储）、EBS（块存储） | Google Cloud Storage |
| **数据库** | RDS、DynamoDB、Aurora | Cloud SQL、Bigtable、Firestore |
| **AI & 机器学习** | SageMaker | **TensorFlow、Vertex AI（更强）** |
| **网络 & CDN** | CloudFront | Google Cloud CDN |
| **定价** | 复杂，按需付费 | 相对透明，部分服务比 AWS 便宜 |
| **免费套餐** | 12 个月免费，部分服务长期免费 | **300 美元免费额度（90 天）** |

---

### **什么时候选择 AWS 或 GCP？**
- **选择 AWS：**
  - 需要 **成熟的企业级解决方案**（金融、政府、大型企业）
  - 需要 **最全面的云服务**（计算、数据库、存储、DevOps）
  - 需要 **强大的全球基础设施**（覆盖范围最广）
  
- **选择 Google Cloud（GCP）：**
  - 主要处理 **AI、机器学习、大数据分析**（GCP 在 AI 领域更强）
  - 需要 **Kubernetes 容器化服务**（GCP 发明了 Kubernetes）
  - 使用 **Google 生态**（BigQuery、TensorFlow、YouTube、Gmail 等）

如果你是前端开发者，主要用 **Serverless（无服务器）、CDN、存储等服务**，可以考虑：
- AWS 的 **Lambda（无服务器）+ S3（存储）+ CloudFront（CDN）**
- GCP 的 **Cloud Functions（无服务器）+ Cloud Storage + Cloud CDN**

