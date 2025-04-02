### **🌍 Google Public DNS（[https://dns.google/）是什么？](https://dns.google/%EF%BC%89%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)**

[Google Public DNS](https://dns.google/) 是 **Google 提供的公共 DNS 解析服务**，它提供了**更快、更安全、更稳定**的域名解析。

当你访问 `https://dns.google/`，你可以：  
✅ **查询域名解析结果**（类似 `dig` 或 `nslookup` 命令）。  
✅ **使用 Google 的 DNS 服务器解析域名**，查看真实 IP 地址。  
✅ **测试不同域名的 DNS 解析状态**，检查是否被污染或篡改。

---

## **🔹 Google Public DNS 主要作用**

1. **公共 DNS 解析（Public Resolver）**
    
    - 你可以将你的设备或路由器的 DNS 服务器设置为 **Google DNS（8.8.8.8 / 8.8.4.4）**，加速域名解析。
        
    - 例如，原本 `www.baidu.com` 可能使用本地 ISP 提供的 DNS，但改用 Google DNS 后，解析速度可能更快、更稳定。
        
2. **防止 DNS 劫持 & 提供安全解析**
    
    - Google Public DNS **不受本地运营商的 DNS 劫持影响**，可以避免广告劫持、错误重定向等问题。
        
    - 它支持 **DNS-over-HTTPS (DoH)** 和 **DNS-over-TLS (DoT)**，加密 DNS 请求，提高安全性。
        
3. **全球加速 & 负载均衡**
    
    - Google 拥有全球分布的 DNS 服务器，可以提供**低延迟解析**，尤其适合跨国访问网站。
        
    - 例如，在中国大陆使用 `8.8.8.8` 可能比本地运营商的 DNS 解析更快（但可能被墙）。
        
4. **测试 DNS 解析 & 故障排查**
    
    - 你可以访问 `https://dns.google/resolve?name=example.com&type=A` 来查询 `example.com` 的 **A 记录**（IPv4 地址）。
        
    - 这可以用来检查某个域名的解析状态，例如：
        
        ```
        https://dns.google/resolve?name=www.baidu.com&type=A
        ```
        
        会返回 `www.baidu.com` 的真实 IP 地址。
        

---

## **🔹 如何使用 Google DNS？**

### **1️⃣ 手动配置 DNS**

你可以在 **本地电脑 / 路由器** 上，手动设置 Google DNS：

**📌 IPv4 配置**：

- **首选 DNS**: `8.8.8.8`
    
- **备用 DNS**: `8.8.4.4`
    

**📌 IPv6 配置**：

- **首选 DNS**: `2001:4860:4860::8888`
    
- **备用 DNS**: `2001:4860:4860::8844`
    

👉 这样，你的设备就会使用 **Google Public DNS** 进行域名解析，而不是 ISP 提供的 DNS。

### **2️⃣ 使用 Google DNS API 查询**

如果你是开发者，你可以使用 Google 提供的 **DNS-over-HTTPS API** 来查询 DNS 解析：

📌 **示例**：

```bash
curl -s "https://dns.google/resolve?name=www.google.com&type=A"
```

返回：

```json
{
  "Status": 0,
  "TC": false,
  "RD": true,
  "RA": true,
  "AD": false,
  "CD": false,
  "Question": [
    {
      "name": "www.google.com.",
      "type": 1
    }
  ],
  "Answer": [
    {
      "name": "www.google.com.",
      "type": 1,
      "TTL": 299,
      "data": "142.250.190.68"
    }
  ]
}
```

这个查询返回了 `www.google.com` 的 **A 记录（IP 地址）**。

---

## **🔹 Google Public DNS vs. 传统 ISP DNS**

|**功能**|**Google Public DNS (8.8.8.8)**|**普通 ISP DNS**|
|---|---|---|
|**解析速度**|✅ 更快（全球加速）|❌ 可能较慢|
|**安全性**|✅ 支持 DNS-over-HTTPS (DoH)、DNS-over-TLS (DoT)|❌ 可能被劫持|
|**防 DNS 劫持**|✅ 受保护，不会返回广告或假 IP|❌ 可能被 ISP 劫持|
|**隐私保护**|✅ Google 承诺不存用户日志|❌ ISP 可能会监控流量|
|**适用于全球访问**|✅ 适合跨国访问|❌ 可能有地区限制|

---

## **💡 结论**

- `https://dns.google/` **是 Google 提供的 DNS 解析工具和 API**，可以查询域名解析状态。
    
- **Google Public DNS (8.8.8.8 / 8.8.4.4)** 提供**更快、更安全**的 DNS 解析，避免 ISP 劫持。
    
- 支持 **DNS-over-HTTPS（DoH）和 DNS-over-TLS（DoT）**，加密 DNS 请求，提高安全性。
    
- 适用于 **全球访问加速、DNS 测试、隐私保护、开发者 API 调用**。
    

👉 **如果你想要更快、更安全的 DNS 解析，可以尝试使用 Google Public DNS！** 🚀