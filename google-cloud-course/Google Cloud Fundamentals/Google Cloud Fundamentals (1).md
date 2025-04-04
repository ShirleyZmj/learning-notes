---
tags:
  - IntroducingGoogleCloud
  - ResourcesAndAccessInTheCloud
  - VirtualMachineAndNetworksInTheCloud
---
#IntroducingGoogleCloud 
1. Compute, Storage, Big Data, Maching Learning, Application Services

2. Cloud Features:
	1. Customers get computing resources that are on-demand and self-service.
	2. Customers get access to those resources over the internet, from anywhere they have a connection.
	3. The cloud provider has a big pool of those resources and allocates them to users out of that pool.
	4. The resources are elastic–which means they’re flexible, so customers can be.
	5. Customers pay only for what they use, or reserve as they go.
	
3. Two types of offerings:
		- Iaas(infrastructure as a service): Compute Engine
		- Paas(platform as a service): App Engine
		- serveless: Cloud Run
		- Saas(software as a service): Google Workspace(Gmail, Google Cloud)

4. App Location: Avilablilty, Durability, Latency
	- Locations: South America, North America, Asia, Europe, Australia
	- Regions: geography locations
	- Zones: an area where google cloud resources are deployed
	- e.g. Europe -> europe-west2 ->  europe-west2-a +  europe-west2-b +  europe-west2-c
	- Spanner(multiple regions and multiple zones)

#ResourcesAndAccessInTheCloud 
1.  Hierarchy : Level 1 - Level 4
	1. Organization
	2. Folder
	3. Projects:
		- Project ID
		- Project Name
		- Project Number
	4. Resources

2. IAM(Identity Authority Management)
	1. Principle
	2. Customized Role
	3. Service Account: 
		- allow to assign specific permissions to a virtual machine 
		- named with an email address
		- use cryptographic keys to access resources instead of password

3. Interacting Methods
	1. Google Cloud Console (GUI)
	2. Cloud SDK and Cloud Shell
	3. APIs
	4. Google Cloud App


4. VPC(Virtual Private Cloud) networking
	1. definition of VPC:  a secure, individual, private cloud-computing model hosted within a public cloud.(虚拟私有云是一种托管在公有云上的，安全独立的私有云计算模型)，
	2. features of VPC: combines the scalability and convenience of public cloud computing with the data isolation of private cloud computing.(这意味着 VPC 结合了公共云计算的可扩展性和便利性，以及私有云计算的数据隔离性)
	3. VPC networking: worldwide, resilient to disruptions yet a simple network layout. (Resources can even be in different zones on the same subnet. The size of a subnet can be increased by expanding the range of IP addresses allocated to it, and doing so won’t affect virtual machines that are already configured [[VPC Region]])
	4. VPC subnets can span the zones that make up a region. This is beneficial because your solutions can incorporate fault tolerance without complicating your network topology.

6. Compute Engine(IssA)
	-  VMs [[Compute Engines VMs]]
		- Preemptible VM (可抢占): 
			- same pricing
			- runtime up to 24 hours at a time. 
			- less features
		- Spot VM (现货): 
			- same pricing
			- no maximum runtime
			- more features
		- ordinary Compute Engine VM: 
			- Compute Engine has permission to terminate a job if its resources are needed elsewhere
			- get high throughput between processing and persistent disks by default
			- provide stable and predictable workloads
	- features: Autoscalling: VMs can be added to or subtracted from an application based on load metrics.

#VirtualMachineAndNetworksInTheCloud 
1. VPC compatibility features
	- [[Google Cloud Networking Routing Tables & Firewalls]]
	1. Routing tables
		- Routing tables are built-in
		- No router provisioning or managing
		- Forward traffic from one instance to another: across subnetworks or even between zones
		- No external IP address required
	2. Firewall
		- No router provisioning or managing
		- Restrict access to instances (a global distributed firewall)
		- Rules can be defined through network tags

2. Cloud Load Balancing
	- definition:  distribute user traffic across multiple instances of an application. (balance HTTP-based traffic across multiple Compute Engine regions.)
	- advantage: by spreading the load, to reduce the risk that applications experience performance issues
	- features:
		- fully distributed, software-defined, managed service
		- put it in front of all your traffic: HTTP or HTTPS, other TCP and SSL traffic, and UDP traffic.
		- Provides single as well as cross-region load balancing, including automatic multi-region failover
		- no "pre-warming" is required for anticipated spikes in traffic
	- types:
		- Application Load Balancer(HTTP/HTTPs) - Layer 7
			- operate as reverse proxies
		- Network Load Balancer(TCP/UDP/other IP protocols) - Layer 4
			- Proxy Network Load Balancer: operate as reverse proxies
			- Passthrough Network Load Balancer

3. Cloud DNS and Cloud CDN [[Cloud DNS and Cloud CDN]]
	- Cloud DNS(Domain Name Service)
		- 8.8.8.8(https://dns.google/): [[Google Public DNS]]
		- managed DNS service that runs on the same infrastructure as Google.
		- low latency, high availability, and cost-effective
		- The DNS information you publish is served from redundant locations around the world
		- Cloud DNS is also programmable by using the Cloud console, the command-line interface, or the API.
	- Cloud CDN(Content Delivery Network)
		- using Edge caching refers to the use of caching servers to store content closer to end users. [[Cloud CDN ( using Edge Caching )]]
		- Lower network latency
		- origins of content will experience reduced load
		- save money
		- enabled with a single checkbox

4. Connecting networks to Google VPC
	- Reasons: [[为什么要连接VPC与其他网络]]
	- Methods: [[Google VPC 网络与其他网络的连接方式]]
		- Cloud VPN: 
			- use Cloud Router to make the connection dynamic (`Cloud Router` lets other networks and Google VPC, exchange route information over the VPN using the Border Gateway Protocol)
			- lets other networks and Google VPC exchange route information over the VPN using the `Border Gateway Protocol`
			- isn't always the best option because of security concerns or because of bandwidth reliability.
		- Direct Peering: 
			- putting a router in the same `public data center` as a Google point of presence(PoP)
			- using a router to exchange traffic between networks.
			- more than 100 Google points of presence around the world.
		- Carrier Peering
			- gives direct access from on-premises network through a service provider's network to Google
			- not covered by a Google Service Level Agreement
		- Dedicated Interconnect
			- Allows for one or more direct, private connections to Google
			- Can be covered by up to a 99.99% SLA ([[SLA - 服务等级协议 - Service Level Agreement]])
			- Connections can be backed up by a VPN for even greater reliability
			- for getting the highest uptimes for interconnection
		- Partner Interconnect
			- provides connectivity between an on-premises network and a VPC network through a supported service provider
			- useful if a data center is in a physical location that can't reach a Dedicated Interconnect colocation facility
			- useful if the data needs don’t warrant an entire 10 GigaBytes per second connection
			- can be configured to support mission-critical services or applications that can tolerate some downtime
			- can be covered by an SLA of up to 99.99%
		- Cross-Cloud Interconnect
			- establish high-bandwidth dedicated connectivity between Google Cloud and another cloud service provider.
			- supports your adoption of an integrated multicloud strategy.
			- offers reduced complexity, site-to-site data transfer, and encryption.
			- Two connection sizes: 10 Gbps or 100 Gbps.

5. LAB: [[VPC Networks Firewall Rules]]
	- In this lab, you explored the default network along with its subnets, routes, and firewall rules. You deleted the default network and determined that you cannot create any VM instances without a VPC network.
	- Thus, you created a new auto mode VPC network with subnets, routes, firewall rules, and two VM instances. Then you tested the connectivity for the VM instances and explored the effects of the firewall rules on connectivity.
	- 没有VCP networks就没有办法新建vm instances


