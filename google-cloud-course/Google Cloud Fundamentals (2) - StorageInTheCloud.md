---
tags:
  - StorageInTheCloud
---
#StorageInTheCloud 
1. Storage in the Cloud
	- data: structured, unstructured, transactional, relational
	- storage products: Cloud Storage, Cloud SQL, Spanner, Firestore, Bigtable

2. Cloud Storage:
	1. features
		- Google's object storage product
		- Allows customers to store any amount of data, and to retrieve it as often as needed
		- Fully managed scalable services that has a wide variety of uses.
	2. usage:
		- serving website content, storing data for archival and disaster recovery, and distributing large data objects to end users via Direct Download.
		- whenever binary large-object storage (also known as a “BLOB”) is needed for online content. BLOB e.g.:
			- Online content
			- Backup and archiving
			- Storage of intermediate results
	3.  buckets: 
		- Unique name + Geographic location
		- immutable, overwrite
		- versioning 
		- lifecycle management policies e.g.: older than (30days), created before (1/1/2026), (3 month) most recent
	4. types:
		1. Standard Storage
		2. Nearline: 1 month or less
		3. Coldline Storage: 3 month or less
		4. Archive Storage: more than 1 year
	5. types features:
		1. Unlimited storage, no min object size
		2. Worldwide accessibility and locations：全球可访问
		3. Low latency and high durability：低延迟高耐用
		4. A uniform experience：体验一致性
		5. Geo-redundancy：地理冗余
			- against catastrophic events and natural disasters, and load-balancing traffic for optimal performance.
	6. Autoclass:  simplifies and automates cost saving for your Cloud Storage data.
	7. Storage Transfer Service

3. Cloud SQL
	1. Relational databases: MySQL, PostgreSQL, and SQL Server as a service.
	2. 主要特点和优势：
		- **完全托管的关系型数据库服务：** Cloud SQL 提供 MySQL、PostgreSQL 和 SQL Server 的完全托管服务。
		- **简化管理：** 它将补丁更新、备份和复制等日常管理任务交给 Google 处理，让用户专注于应用程序开发。
		- **无需软件安装或维护：** 用户无需进行任何软件安装或维护。
		- **可扩展性：** Cloud SQL 可扩展至 128 个处理器核心、864 GB RAM 和 64 TB 存储。
		- **自动复制：** 支持多种自动复制场景，包括 Cloud SQL 主实例、外部主实例和外部 MySQL 实例。
		- **托管备份：** 提供托管备份功能，确保数据安全存储和可恢复性，并包含七个免费备份。
		- **数据加密和网络防火墙：** 在 Google 内部网络和存储中加密客户数据，并包含网络防火墙以控制数据库实例的网络访问。
		- **与其他 Google Cloud 服务和外部服务集成：** Cloud SQL 实例可被其他 Google Cloud 服务（如 App Engine 和 Compute Engine）以及外部服务访问。
		- **兼容性：** Cloud SQL 支持标准驱动程序（如 Connector/J 和 MySQLdb）以及 SQL Workbench 和 Toad 等外部应用程序和工具。

		
		- **Fully Managed Relational Database Service:** Cloud SQL offers fully managed services for MySQL, PostgreSQL, and SQL Server.
		- **Simplified Management:** It offloads routine management tasks like patching, backups, and replication to Google, allowing users to focus on application development.
		- **No Software Installation or Maintenance:** Users don't need to install or maintain any software.
		- **Scalability:** Cloud SQL scales up to 128 processor cores, 864 GB of RAM, and 64 TB of storage.
		- **Automatic Replication:** It supports various automatic replication scenarios, including Cloud SQL primary instances, external primary instances, and external MySQL instances.
		- **Managed Backups:** It provides managed backups, ensuring secure data storage and recoverability, and includes seven free backups.
		- **Data Encryption and Network Firewall:** It encrypts customer data on Google's internal networks and in storage, and includes a network firewall to control database instance access.
		- **Integration with Google Cloud and External Services:** Cloud SQL instances are accessible by other Google Cloud services (like App Engine and Compute Engine) and external services.
		- **Compatibility:** Cloud SQL supports standard drivers (like Connector/J and MySQLdb) and external applications and tools like SQL Workbench and Toad.

4. Spanner
	- **完全托管、全球可扩展的关系型数据库：**
	    - Spanner 是一种完全托管的关系型数据库服务，具备水平扩展能力、强一致性和 SQL 支持。
	- **经过实战检验的可靠性：**
	    - Spanner 被 Google 自身的核心应用和服务使用，证明了其强大的可靠性和稳定性。
	- **适用于高需求应用：**
	    - Spanner 特别适用于需要以下特性的应用程序：
	        - SQL 关系型数据库功能（连接、二级索引等）。
	        - 内置的高可用性。
	        - 强大的全局一致性。
	        - 高输入/输出操作速率（每秒数万次或更多）。

	- **Fully Managed, Globally Scalable Relational Database:**
		- Spanner is presented as a fully managed relational database service that scales horizontally, ensures strong consistency, and uses SQL.
	- **Proven Reliability:**
		- It's highlighted that Spanner is used by Google's own critical applications, indicating its robustness and reliability.
	- **Ideal for High-Demand Applications:** 
		- Spanner is positioned as particularly suitable for applications that demand:
		    - SQL relational database capabilities (joins, secondary indexes).
		    - Built-in high availability.
		    - Strong global consistency.
		    - High input/output operations per second (tens of thousands or more).

5. Firestore
	- **灵活、水平扩展的 NoSQL 云数据库：** Firestore 专为移动、Web 和服务器开发设计。
	- **文档和集合的数据模型：** 数据以文档的形式存储，并组织到集合中。
	- **文档结构：** 文档包含键值对，并可以包含复杂的嵌套对象和子集合。
	- **NoSQL 查询：** Firestore 的 NoSQL 查询可用于检索单个特定文档，或检索集合中符合查询参数的所有文档。
	- **查询功能：** 查询支持多个链式过滤器，并可组合过滤和排序选项。
	
	- **Flexible, Horizontally Scalable NoSQL Cloud Database:** Firestore is designed for mobile, web, and server development.
	- **Document and Collection Data Model:** Data is stored in documents and organized into collections.
	- **Document Structure:** Documents contain key-value pairs and can include complex nested objects and subcollections.
	- **NoSQL Queries:** Firestore's NoSQL queries can be used to retrieve individual, specific documents or to retrieve all documents in a collection that match query parameters.
	- **Query Capabilities:** Queries support multiple, chained filters and combine filtering and sorting options.

6. Bigtable
	- **NoSQL 大数据数据库服务：** Bigtable 是 Google 提供的 NoSQL 大数据数据库服务，为 Google 核心服务（如搜索、分析、地图和 Gmail）提供支持。
	- **高性能和高吞吐量：** Bigtable 旨在以一致的低延迟和高吞吐量处理大规模工作负载，适用于操作和分析应用，包括物联网、用户分析和金融数据分析。
	- **适用场景：**
	    - 处理超过 1TB 的半结构化或结构化数据。
	    - 需要高速、高吞吐量或快速变化的数据。
	    - 处理 NoSQL 数据，不需要强关系语义的事务。
	    - 处理时间序列数据或具有自然语义顺序的数据。
	    - 进行大数据处理，运行异步批处理或同步实时处理。
	    - 运行机器学习算法。
	- **与其他服务集成：** Bigtable 可以与其他 Google Cloud 服务和第三方客户端交互。
	- **数据读写方式：**
	    - 通过 API 和数据服务层（如 Managed VMs、HBase REST Server 或 Java Server）进行读写。
	    - 通过流处理框架（如 Dataflow Streaming、Spark Streaming 和 Storm）进行数据流传输。
	    - 通过批处理（如 Hadoop MapReduce、Dataflow 或 Spark）进行读写。
	- **数据处理和回写：** 通常，汇总或新计算的数据会被写回 Bigtable 或下游数据库。
	
	- **NoSQL Big Data Database Service:** Bigtable is Google's NoSQL big data database service, powering core Google services like Search, Analytics, Maps, and Gmail.
	- **High Performance and Throughput:** Bigtable is designed to handle massive workloads with consistent low latency and high throughput, suitable for operational and analytical applications, including IoT, user analytics, and financial data analysis.
	- **Use Cases:**
	    - Working with more than 1TB of semi-structured or structured data.
	    - Data with high speed, high throughput, or rapid changes.
	    - Working with NoSQL data, transactions without strong relational semantics.
	    - Time-series data or data with natural semantic ordering.
	    - Big data processing, asynchronous batch or synchronous real-time processing.
	    - Running machine learning algorithms.
	- **Integration with Other Services:** Bigtable can interact with other Google Cloud services and third-party clients.
	- **Data Read and Write Methods:**
	    - Read and write via APIs and data service layers like Managed VMs, HBase REST Server, or Java Server.
	    - Data streaming through stream processing frameworks like Dataflow Streaming, Spark Streaming, and Storm.
	    - Read and write via batch processing like Hadoop MapReduce, Dataflow, or Spark.
	- **Data Processing and Write-Back:** Summarized or newly calculated data is often written back to Bigtable or a downstream database.

7. difference

|        |                          |                                |                                  |                              |                                   |
| ------ | ------------------------ | ------------------------------ | -------------------------------- | ---------------------------- | --------------------------------- |
| **特性** | **Cloud Storage**        | **Cloud SQL**                  | **Spanner**                      | **Firestore**                | **Bigtable**                      |
| 数据类型   | 非结构化（blob）               | 结构化（关系型）                       | 结构化（关系型）                         | 半结构化（NoSQL）                  | 半结构化（NoSQL）                       |
| SQL 支持 | 无                        | 完整 SQL                         | 完整 SQL                           | NoSQL 查询                     | NoSQL 查询（无 SQL）                   |
| 扩展性    | PB 级                     | TB 级（取决于机器类型）                  | PB 级                             | TB 级                         | PB 级                              |
| 最大单元大小 | 5TB/对象                   | 64TB/实例                        | PB 级                             | 1MB/实体                       | 10MB/单元格，100MB/行                  |
| 适用场景   | 存储大型不可变 blob（如图像、视频）     | 在线事务处理（OLTP）、Web 应用            | 全球分布式 OLTP、需要强一致性                | 移动和 Web 应用、实时查询              | 大数据分析、高吞吐量读写                      |
| 事务支持   | 无                        | 支持                             | 支持                               | 有限支持                         | 不支持多行事务                           |
| 延迟     | 高                        | 中等                             | 低                                | 低                            | 极低                                |
| 成本     | 低                        | 中等                             | 高                                | 中等                           | 高                                 |
| 补充说明   | 适用于存储大量非结构化数据，如备份、媒体文件等。 | 适用于传统的关系型数据库应用，如 Web 应用的后端数据库。 | 适用于需要全球分布式、强一致性、高可用性的应用，如金融交易系统。 | 适用于移动和 Web 应用，提供实时数据同步和离线支持。 | 适用于需要极高吞吐量和低延迟的大数据应用，如日志分析、物联网数据。 |

这段内容对 Google Cloud 的核心存储选项进行了比较，以帮助用户根据特定应用或工作流程选择最合适的服务：

- **Cloud Storage：**
    - 适用于存储大于 10MB 的不可变 blob，如大型图像或视频。
    - 提供 PB 级容量，单个对象最大容量为 5TB。
- **Cloud SQL 和 Spanner：**
    - 适用于需要完整 SQL 支持的在线事务处理系统。
    - Cloud SQL 提供高达 64TB 的容量（取决于机器类型），Spanner 提供 PB 级容量。
    - Cloud SQL 适用于 Web 框架和现有应用，如存储用户凭证和客户订单。
    - 如果需要水平扩展（不仅仅是通过只读副本），则考虑使用 Spanner。
- **Firestore：**
    - 适用于需要大规模扩展、可预测性、实时查询结果和离线查询支持的应用。
    - 提供 TB 级容量，单个实体最大容量为 1MB。
    - 适用于存储、同步和查询移动和 Web 应用的数据。
- **Bigtable：**
    - 适用于存储大量结构化对象。
    - 不支持 SQL 查询和多行事务。
    - 提供 PB 级容量，单个单元格最大容量为 10MB，单行最大容量为 100MB。
    - 适用于具有大量读写事件的分析数据，如广告技术、金融或物联网数据。
- **BigQuery：**
    - 未在此部分详细介绍，因为它位于数据存储和数据处理的边界。
    - 通常用于存储数据，以便能够使用它的大数据分析和交互式查询功能，但它不仅仅是一个数据存储产品。
- **多服务组合：**
    - 根据应用需求，可能会使用一个或多个这些服务。

**简而言之：**

- **Cloud Storage** 用于大型、非结构化数据。
- **Cloud SQL/Spanner** 用于关系型数据库需求，Spanner 用于需要全球扩展的场景。
- **Firestore** 用于移动和 Web 应用的 NoSQL 数据。
- **Bigtable** 用于大规模、高吞吐量的 NoSQL 大数据。
- **BigQuery** 用于大数据分析。



8. Lab: Deploy a web server VM instance
		- Automation can add startup script, like 
```
apt-get update
apt-get install apache2 php php-mysql -y
service apache2 restart		
```

9. Lab: Create a Cloud Storage bucket using the gcloud storage command line
	-  bucket name is unique
	- `gcloud storage buckets create -l $LOCATION gs://$DEVSHELL_PROJECT_ID`
	- `gsutil acl ch -u allUsers:R gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png`

10. Lab: Create the Cloud SQL instance
	-  The best performance is achieved by placing the client and the database close to each other when choosing region and zone
	- It takes 5min to create db
	- add db -> add user -> add network (whitelist for user to connection, use VM instance external IP address /32)

11. Lab: Configure an application in a Compute Engine instance to use Cloud SQL
```
<html>
<head><title>Welcome to my excellent blog</title></head>
<body>
<h1>Welcome to my excellent blog</h1>
<?php
 $dbserver = "CLOUDSQLIP";
$dbuser = "blogdbuser";
$dbpassword = "DBPASSWORD";
// In a production blog, we would not store the MySQL
// password in the document root. Instead, we would store
//  it in a Secret Manger. For more information see 
// https://cloud.google.com/sql/docs/postgres/use-secret-manager

 try {
  $conn = new PDO("mysql:host=$dbserver;dbname=mysql", $dbuser, $dbpassword);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";
} catch(PDOException $e) {
  echo "Database connection failed:: " . $e->getMessage();
}

?>
</body></html>
```