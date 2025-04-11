这段内容主要介绍了 **在 Google Cloud 中创建自定义权限和角色的流程**，以下是详细解析：

---

## **📌 1. 查看可用权限**

在创建自定义角色之前，首先要 **熟悉已有的权限和角色**，以免重复创建不必要的自定义权限。

👉 **列出特定资源可用的权限**：

```sh
gcloud iam list-testable-permissions <full-resource-name>
```

- `<full-resource-name>` 是完整的资源名称，例如：
    
    ```sh
    gcloud iam list-testable-permissions //cloudresourcemanager.googleapis.com/projects/my-project
    ```
    
- 这条命令会 **列出该资源支持的所有权限**，帮助你了解是否已经有合适的权限可用。

---

## **📌 2. 查看某个角色的权限**

**如果不确定某个角色是否包含你需要的权限**，可以查看角色的元数据：

```sh
gcloud iam roles describe <ROLE_ID>
```

- 例如：
    
    ```sh
    gcloud iam roles describe roles/editor
    ```
    
- 这条命令会返回 **该角色的所有权限**。

---

## **📌 3. 创建自定义角色**

自定义角色（Custom Roles）可以在 **项目级（Project Level）** 或 **组织级（Organization Level）** 创建：

- 需要 `iam.roles.create` 权限。
- 你必须是：
    - **项目所有者（Owner）**
    - **组织管理员（Organization Admin）**
    - **IAM 角色管理员（IAM Role Administrator）**

👉 **创建自定义角色**：

```sh
gcloud iam roles create <ROLE_ID> --project=<PROJECT_ID> \
  --title="<ROLE_TITLE>" --description="<ROLE_DESCRIPTION>" \
  --permissions="<PERMISSION_1>,<PERMISSION_2>,..." \
  --stage=GA
```

- `<ROLE_ID>`：自定义角色的 ID，例如 `custom.viewer`
- `<PROJECT_ID>`：要在哪个项目下创建角色
- `--title`：角色的名称
- `--description`：角色的描述
- `--permissions`：分配给该角色的权限，多个权限用 `,` 分隔
- `--stage=GA`：角色的发布阶段（GA 代表正式发布）

**示例**：创建一个自定义角色 `custom.viewer`，只允许用户查看存储桶：

```sh
gcloud iam roles create custom.viewer --project=my-project \
  --title="Custom Viewer" --description="Read-only access to storage buckets" \
  --permissions="storage.buckets.get,storage.objects.list" \
  --stage=GA
```

---

## **📌 4. 更新已有角色**

更新角色的步骤：

1. **获取角色信息**
    
    ```sh
    gcloud iam roles describe <ROLE_ID> --project=<PROJECT_ID>
    ```
    
2. **本地修改角色权限**
3. **更新角色**
    
    ```sh
    gcloud iam roles update <ROLE_ID> --project=<PROJECT_ID> \
      --permissions="<NEW_PERMISSIONS>"
    ```
    
    例如：
    
    ```sh
    gcloud iam roles update custom.viewer --project=my-project \
      --permissions="storage.buckets.get,storage.objects.list,storage.objects.get"
    ```
    

---

## **📌 5. 删除自定义角色**

```sh
gcloud iam roles delete <ROLE_ID> --project=<PROJECT_ID>
```

例如：

```sh
gcloud iam roles delete custom.viewer --project=my-project
```

---

### **📝 总结**

|**操作**|**gcloud 命令**|**说明**|
|---|---|---|
|**列出资源可用权限**|`gcloud iam list-testable-permissions <full-resource-name>`|查看资源支持的权限|
|**查看角色权限**|`gcloud iam roles describe <ROLE_ID>`|检查某个角色的权限|
|**创建自定义角色**|`gcloud iam roles create <ROLE_ID> --project=<PROJECT_ID> --permissions="<PERMISSIONS>"`|在项目级或组织级创建角色|
|**更新角色**|`gcloud iam roles update <ROLE_ID> --project=<PROJECT_ID> --permissions="<NEW_PERMISSIONS>"`|修改角色权限|
|**删除角色**|`gcloud iam roles delete <ROLE_ID> --project=<PROJECT_ID>`|删除自定义角色|

🚀 **最佳实践**：

- **优先使用预定义角色**，如果没有合适的角色再创建 **自定义角色**。
- **避免授予过多权限**，遵循 **最小权限原则（Principle of Least Privilege）**。
- **使用 Google 组（Google Groups）管理权限**，避免直接分配给个人用户。

💡 **场景示例**：

- 如果你想 **创建一个仅有 Cloud Storage 读取权限的角色**，但 `roles/storage.viewer` 包含的权限太多，你可以 **创建一个自定义角色** 只包含 `storage.buckets.get` 和 `storage.objects.list` 权限。