Compute Engine 提供以下 VM 选项：  

1. **预定义机型**（Predefined Machine Types）：  
   - **标准型（Standard）**：均衡的 CPU 和内存。  
   - **高内存型（High Memory）**：适用于内存密集型应用。  
   - **高 CPU 型（High CPU）**：适用于计算密集型任务。  
   - **内存优化型（Memory-Optimized）**：适用于超大内存需求。  
   - **计算优化型（Compute-Optimized）**：适用于高性能计算（HPC）。  
   - **共享核心型（Shared-Core）**：适用于轻量级任务。  

2. **自定义机型（Custom Machine Types）**：如果预定义机型不符合需求，可自由配置 CPU 和内存。  

3. **GPU 支持（GPU Support）**：  
   - 仅适用于**N1 通用型 VM**和**A2 加速优化型 VM**。  
   - 需要选择支持 GPU 的可用区（Zone）。