## Overview
In this lab, you implement Private Google Access and Cloud NAT for a VM instance that doesn't have an external IP address. Then, you verify access to public IP addresses of Google APIs and services and other connections to the internet.

VM instances without external IP addresses are isolated from external networks. Using Cloud NAT, these instances can access the internet for updates and patches, and in some cases, for bootstrapping. As a managed service, Cloud NAT provides high availability without user management and intervention.

## Objectives
In this lab, you learn how to perform the following tasks:

- Configure a VM instance that doesn't have an external IP address
- Connect to a VM instance using an Identity-Aware Proxy (IAP) tunnel
- Enable Private Google Access on a subnet
- Configure a Cloud NAT gateway
- Verify access to public IP addresses of Google APIs and services and other connections to the internet

##  Identity-Aware Proxy (IAP)
IAP TCP forwarding allows you to establish an encrypted tunnel over which you can forward SSH, RDP, and other traffic to VM instances. IAP TCP forwarding also provides you fine-grained control over which users are allowed to establish tunnels and which VM instances users are allowed to connect to.


## 1. Create a privatenet, then create a vm without external ip

![[Pasted image 20250409145842.png]]

### SSH to vm-internal to test the IAP tunnel
`gcloud compute ssh vm-internal --zone us-east1-c --tunnel-through-iap`

`exit`

## 2. Enable Private Google Access
VM instances that have no external IP addresses can use Private Google Access to reach external IP addresses of Google APIs and services. By default, Private Google Access is disabled on a VPC network.

![[Pasted image 20250409151711.png]]

## 3. Configure a Cloud NAT gateway
Although **vm-internal** can now access certain Google APIs and services without an external IP address, the instance cannot access the internet for updates and patches. Configure a Cloud NAT gateway, which allows **vm-internal** to reach the internet.

1. In **Cloud Shell**, to try to re-synchronize the package index, run the following:  which requires an external IP address!
`sudo apt-get update`

### Configure a Cloud NAT gateway
Cloud NAT lets your Compute Engine instances and Kubernetes Engine container pods communicate with the internet or other Virtual Private Cloud (VPC) networks using a shared, public IP address or a dedicated NAT subnetwork. Cloud NAT uses a NAT gateway to connect your subnets to a Cloud Router, a virtual router that connects to the internet or other VPC networks.
![[Pasted image 20250409152237.png]]

![[Pasted image 20250409152314.png]]

The NAT mapping section allows you to choose the subnets to map to the NAT gateway. You can also manually assign static IP addresses that should be used when performing NAT. Do not change the NAT mapping configuration in this lab.

![[Pasted image 20250409152434.png]]

## 4. Configure and view logs with Cloud NAT Logging

[Cloud NAT logging](https://cloud.google.com/nat/docs/monitoring) allows you to log NAT connections and errors. When Cloud NAT logging is enabled, one log entry can be generated for each of the following scenarios:

- When a network connection using NAT is created.
- When a packet is dropped because no port was available for NAT.

You can opt to log both kinds of events, or just one or the other. Created logs are sent to Cloud Logging.

![[Pasted image 20250409153423.png]]

![[Pasted image 20250409153520.png]]

click View in Logs Explorer
![[Pasted image 20250409153617.png]]

As a reminder, Cloud NAT logs are generated for the following sequences:

- When a network connection using NAT is created.
- When a packet is dropped because no port was available for NAT.

try 
`sudo apt-get update` 
in vm-internal, then

![[Pasted image 20250409154218.png]]

### Logs explanations

![[Pasted image 20250409155146.png]]