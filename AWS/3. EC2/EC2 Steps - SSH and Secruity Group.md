
# Experimental
## Security Groups

![[Pasted image 20250522151621.png]]

![[Pasted image 20250522155232.png]]

![[Pasted image 20250522155924.png]]

## SSH

![[Pasted image 20250522160501.png]]
### Steps

#### 1. download .pem file when launching the instance

![[Pasted image 20250522161040.png]]

#### 2. change permission of pem file
`chmod 0400 EC2Tutorial.pem`

#### 3. login by the public ipv4 address, which will change every time restart the instance
`ssh -i EC2Tutorial.pem ec2-user@52.64.20.113`



# EC2 Instance Connect

> Connect --- port 22

![[Pasted image 20250522165137.png]]

![[Pasted image 20250522165230.png]]

# IAM Role for Instances

> use IAM roles for your EC2 Instances.

![[Pasted image 20250522165749.png]]

![[Pasted image 20250522165825.png]]