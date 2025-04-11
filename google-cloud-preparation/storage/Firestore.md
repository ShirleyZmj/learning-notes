# **🔥 Firestore 介绍（Cloud Firestore in Google Cloud）**

**Firestore** 是 **Google Cloud** 提供的**全托管 NoSQL 文档数据库**，适用于**实时应用、Web & 移动开发**，并支持**自动扩展**。它是 **Firebase Realtime Database** 的升级版，提供更**强大的查询功能**、**更灵活的数据模型**，并支持 **云端同步**。

---

## **📌 Firestore 的核心特点**

### **1️⃣ 文档型 NoSQL 数据库**

- **数据结构**：Firestore 使用 **文档-集合（Document-Collection）结构**，不同于关系型数据库的表格结构。
- **存储方式**：每条记录是一个 **JSON 文档**，字段可以是嵌套结构，适用于**动态数据**。

### **2️⃣ 实时同步**

- Firestore 支持 **数据实时更新**，多个客户端间可以**自动同步数据**，适合 **聊天、协作工具、物联网（IoT）** 等场景。

### **3️⃣ 强大的查询能力**

- **支持 SQL 风格查询**，可以按字段筛选、排序和分页。
- **支持索引**，查询速度快，不受数据量增长影响。
- **支持事务**，保证数据一致性。

### **4️⃣ 自动扩展**

- **高并发**：Firestore 可以**自动扩展**，即使是百万级用户的应用，也能**无缝处理请求**。
- **无需手动管理服务器**，Google Cloud 负责底层资源扩展。

### **5️⃣ 离线模式**

- **支持离线访问**，数据可缓存在设备本地，**即使断网也能读取和修改数据**，适用于移动应用。

---

## **🚀 Firestore 的使用方式**

### **1️⃣ Firestore 数据结构**

Firestore 采用 **文档-集合** 结构：

```plaintext
📁 Users (集合)
  ├── 📄 user1 (文档)
  │      ├── name: "Alice"
  │      ├── age: 25
  │      ├── address: { city: "Singapore", country: "SG" }
  ├── 📄 user2 (文档)
         ├── name: "Bob"
         ├── age: 30
```

**特点**： ✅ **文档（Document）**：存储具体的数据，如 JSON。  
✅ **集合（Collection）**：相当于表，包含多个文档。  
✅ **嵌套数据**：文档可以包含子集合，结构更灵活。

---

### **2️⃣ Firestore 查询示例**

#### **🔍 获取所有用户**

```javascript
const db = firebase.firestore();
db.collection("Users").get().then((snapshot) => {
    snapshot.forEach((doc) => console.log(doc.data()));
});
```

#### **🔍 查询年龄大于 20 的用户**

```javascript
db.collection("Users").where("age", ">", 20).get();
```

#### **🔍 监听实时数据变化**

```javascript
db.collection("Users").onSnapshot((snapshot) => {
    snapshot.forEach((doc) => console.log(doc.data()));
});
```

**🔥 监听功能** 适用于 **聊天、在线协作、社交媒体等实时应用**。

---

## **📌 Firestore vs. Realtime Database**

|**对比项**|**Firestore**|**Realtime Database**|
|---|---|---|
|**数据结构**|文档-集合|JSON 树|
|**查询能力**|强，支持索引、SQL 风格查询|弱，仅支持 key-value 查询|
|**实时数据同步**|支持|支持|
|**扩展性**|自动扩展|需手动优化|
|**事务支持**|支持|不支持|
|**适用场景**|复杂查询、高并发|简单数据存储、低延迟应用|

**✅ 什么时候用 Firestore？**

- **实时聊天应用**
- **社交网络（Twitter、Instagram）**
- **多人协作应用（Google Docs、白板工具）**
- **移动应用，支持离线模式**
- **复杂数据查询（比 Realtime Database 更强大）**

---

## **🎯 Firestore vs. Cloud SQL vs. BigQuery**

|**对比项**|**Firestore (NoSQL)**|**Cloud SQL (关系型数据库)**|**BigQuery (分析型数据库)**|
|---|---|---|---|
|**数据结构**|文档-集合|关系表 (SQL)|列式存储|
|**查询能力**|JSON 查询 + SQL 风格|强大 SQL 查询|超大数据查询|
|**实时同步**|支持实时更新|仅手动查询|适用于批量数据|
|**扩展性**|自动扩展|受实例限制|无限扩展|
|**适用场景**|移动/实时应用|传统业务、事务型数据库|大数据分析|

**🔥 总结**：

- **Firestore 适用于高并发的实时应用，如聊天、社交网络。**
- **Cloud SQL 适用于传统 Web 应用，数据结构固定的业务。**
- **BigQuery 适用于数据分析、BI（商业智能）。**

---

## **💡 总结**

🔥 **如果你的应用需要实时数据、移动端支持、自动扩展，Firestore 是最佳选择！**  
🚀 **适用于社交、聊天、协作工具等应用，且查询能力比 Firebase Realtime Database 更强！**  
🔍 **使用 Firestore 的查询功能，可以灵活获取数据，不受数据量限制！**

如果你正在开发**高并发、需要实时数据同步**的应用，Firestore 是 Google Cloud **最好的 NoSQL 解决方案**！💪🚀