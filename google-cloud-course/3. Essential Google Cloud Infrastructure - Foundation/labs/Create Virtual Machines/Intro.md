## create an instance
## edit an instance
Notice that you cannot change the machine type, the CPU platform, or the zone.
![[Pasted image 20250409170341.png]]
You can add network tags and allow specific network traffic from the internet through firewalls. Some properties of a VM are integral to the VM, are established when the VM is created, and cannot be changed. Other properties can be edited.

You can add additional disks and you can also determine whether the boot disk is deleted when the instance is deleted.

Normally the boot disk defaults to being deleted automatically when the instance is deleted. But sometimes you will want to override this behavior. This feature is very important because you cannot create an image from a boot disk when it is attached to a running instance.

So you would need to disable **Delete boot disk when instance is deleted** to enable creating a system image from the boot disk.

### Availability policies

![[Pasted image 20250409170602.png]] You cannot convert a non-preemptible instance into a preemptible one. This choice must be made at VM creation. A preemptible instance can be interrupted at any time and is available at a lower cost.

If a VM is stopped for any reason, (for example an outage or a hardware failure) the automatic restart feature will start it back up. Is this the behavior you want? Are your applications idempotent (written to handle a second startup properly)?

During host maintenance, the VM is set for live migration. However, you can have the VM terminated instead of migrated.

If you make changes, they can sometimes take several minutes to be implemented, especially if they involve networking changes like adding firewalls or changing the external IP.


![[Pasted image 20250409170805.png]]

click Logging

![[Pasted image 20250409170826.png]]

click Expand this log
![[Pasted image 20250409171039.png]]



### Create Windows VM instance
![[Pasted image 20250409171418.png]]
![[Pasted image 20250409171652.png]]
When the VM is running, notice that the connection option in the far right column is RDP, not SSH. RDP is the Remote Desktop Protocol. You would need the RDP client installed on your local machine to connect to the Windows desktop.
[Connect to Windows VMs using RDP](https://cloud.google.com/compute/docs/instances/connecting-to-windows)

![[Pasted image 20250409171721.png]]

#### Set password

![[Pasted image 20250409171935.png]]


# ? Question
> How to use RDP to connect to a windows instance on GCP
> 
	account:  student_03_b8c4e3750
	password: m4R!PY>-Aoy1U14

[Connect to Windows VMs using RDP](https://cloud.google.com/compute/docs/instances/connecting-to-windows#powershell-from-the-sac)

### create a custom instance

![[Pasted image 20250409172149.png]]

#### Some command

- `free` 
	- To see information about unused and used memory and swap space on your custom VM
- `sudo dmidecode -t 17` 
	- To see details about the RAM installed on your VM
- `nproc`
	- To verify the number of processors
- `lscpu`
	- To see details about the CPUs installed on your VM
- `exit`
	- To exit the SSH terminal
	

![[Pasted image 20250409172525.png]]
![[Pasted image 20250409172812.png]]

## Task 4. Review

In this lab, you created several virtual machine instances of different types with different characteristics. One was a small utility VM for administration purposes. You also created a standard VM and a custom VM. You launched both Windows and Linux VMs and deleted VMs.

[Lab link](https://partner.cloudskillsboost.google/paths/69/course_templates/50/labs/523093)