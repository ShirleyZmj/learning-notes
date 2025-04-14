# Milvus

## 什么是 Milvus

Milvus 是一个开源的向量数据库，用于存储和检索向量数据。它支持高效的向量索引和相似性搜索，广泛应用于机器学习、自然语言处理、计算机视觉等领域。

## 安装 Milvus 
[如何安装](https://milvus.io/docs/install-overview.md)
### 本人使用
系统：MacOS
安装版本：Milvus Standalone
方法：[Docker Compose (Linux)](https://milvus.io/docs/install_standalone-docker-compose.md)

1. 确保电脑安装了Docker
	- [Docker Desktop下载](https://www.docker.com/products/docker-desktop/)

2. 确保电脑安装了wget
	- `brew install wget`

3. 下载配置文件并运行
```shell
wget https://github.com/milvus-io/milvus/releases/download/v2.5.8/milvus-standalone-docker-compose.yml -O docker-compose.yml

sudo docker compose up -d

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done

```
4. 确认是否都启动了
	`sudo docker-compose ps`

5. 访问  Milvus WebUI
	- 访问地址：http://127.0.0.1:9091/webui/

6. 停止和启动 Milvus
```shell
sudo docker compose down

sudo rm -rf volumes
```
---
## Attu
[Attu](https://github.com/zilliztech/attu/blob/main/README_CN.md) 是一个全方位的 Milvus 管理工具。

### 运行
```shell
docker run -p 8000:3000 -e MILVUS_URL={milvus server IP}:19530 zilliz/attu:v2.5
```
#### Mac 获取 ip 地址

- internal
```shell
ipconfig getifaddr en0
ipconfig getifaddr en1
```
	
- external/public
```shell
curl ifconfig.me
```
### 打开网页端

访问地址: localhost:8000

或者 在docker desktop里找到 Port(s)
![[Pasted image 20250411220918.png]]
