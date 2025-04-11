## **🔥 Cloud Storage 生命周期管理（Lifecycle Management）**

Cloud Storage 提供 **对象生命周期管理**（Lifecycle Management）功能，可**自动管理对象的存储类、删除过期数据、保留特定版本等**。  
当对象的 **元数据（metadata）符合某些规则** 时，Cloud Storage **自动执行指定的操作**，无需人工干预。

---

## **📌 生命周期管理的主要功能**

1️⃣ **存储类别转换**（Storage Class Downgrade）：

- 例如：**将存储时间超过 365 天的对象转换为 Coldline Storage**，以节省存储成本。  
    2️⃣ **自动删除**（Object Deletion）：
- 例如：**删除在某个日期之前创建的对象，或删除超过 30 天未访问的对象**。  
    3️⃣ **版本管理**（Object Versioning）：
- 例如：**仅保留最近 3 个版本的对象**，避免占用过多存储空间。  
    4️⃣ **对象归档**（Archive）：
- 例如：**将长期未访问的数据转为 Archive Storage，降低存储成本**。

---

## **📌 规则执行逻辑**

- **对象的元数据（Metadata）必须匹配所有设定条件**，规则才会生效。
- **如果对象符合多个规则，执行优先级如下**：
    - **删除（Delete）优先级最高**
    - **存储类别转换（Storage Class Downgrade）按价格排序，最便宜的优先**

---

## **🎯 生命周期管理的条件（Conditions）**

Cloud Storage 提供以下生命周期管理条件：

|**条件**|**说明**|
|---|---|
|**Age**|以天为单位，**对象存储时间达到设定值**（例如 365 天）|
|**CreatedBefore**|**对象创建时间早于指定日期**|
|**CustomTimeBefore**|**对象的自定义时间早于指定日期**|
|**DaysSinceCustomTime**|**对象自定义时间超过 N 天**|
|**DaysSinceNonCurrent**|**对象非当前版本超过 N 天**|
|**IsLive**|**是否是当前版本（true/false）**|
|**MatchesStorageClass**|**匹配特定的存储类别**（如 Standard, Nearline, Coldline, Archive）|
|**NoncurrentTimeBefore**|**对象成为非当前版本的时间早于指定日期**|
|**NumberOfNewerVersions**|**仅保留最新的 N 个版本**|

---

## **📌 生命周期管理示例**

### **✅ 示例 1：将存储超过 365 天的对象转换为 Coldline**

```json
{
  "rule": [
    {
      "action": { "type": "SetStorageClass", "storageClass": "COLDLINE" },
      "condition": { "age": 365 }
    }
  ]
}
```

📌 **规则解释**：

- **当对象的存储时间超过 365 天**，将其**存储类别更改为 Coldline**，降低存储成本。

---

### **✅ 示例 2：删除 2023 年 1 月 1 日之前创建的对象**

```json
{
  "rule": [
    {
      "action": { "type": "Delete" },
      "condition": { "createdBefore": "2023-01-01" }
    }
  ]
}
```

📌 **规则解释**：

- **删除 2023 年 1 月 1 日之前创建的对象**，清理过期数据。

---

### **✅ 示例 3：只保留最近 3 个版本的对象**

```json
{
  "rule": [
    {
      "action": { "type": "Delete" },
      "condition": { "numberOfNewerVersions": 3 }
    }
  ]
}
```

📌 **规则解释**：

- **只保留最新的 3 个版本，超过的旧版本自动删除**，避免占用存储空间。

---

## **🚀 什么时候使用 Cloud Storage 生命周期管理？**

✅ **大数据存储**：定期清理旧数据，减少存储成本。  
✅ **日志存储**：自动删除 30 天前的日志，避免长期占用空间。  
✅ **备份管理**：保留最近 N 份备份，自动删除老版本。  
✅ **归档存储**：将长期未访问的数据转换为 **Coldline 或 Archive**，降低费用。

---

## **💡 总结**

🔥 **Cloud Storage Lifecycle Management 让你可以自动管理存储数据，无需手动清理**  
💰 **可以节省存储成本，如转换到 Coldline、Archive 或自动删除旧数据**  
🔄 **适用于日志存储、数据归档、备份管理等多种场景**

如果你在 Google Cloud 使用 **Cloud Storage**，生命周期管理是一个 **强大且省钱的工具**！🚀