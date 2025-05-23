Markov Process

MDP 是 **Markov Decision Process（马尔可夫决策过程）** 的缩写，是强化学习（Reinforcement Learning）中非常核心的一个数学模型，用来描述**智能体（Agent）在一个环境中做决策的过程**。

---

### ✅ MDP 的五个基本要素（通常称为五元组）：

1. **状态集合 S（States）**
    
    - 表示环境可能处于的所有状态，比如游戏中的某个局面、机器人所在的位置等。
        
2. **动作集合 A（Actions）**
    
    - 在每个状态下，智能体可以采取的行为集合。
        
3. **状态转移概率 P（Transition Probability）**
    
    - 给定当前状态 `s` 和动作 `a`，转移到下一个状态 `s'` 的概率，记为：  
        `P(s' | s, a)`
        
4. **奖励函数 R（Reward）**
    
    - 给定状态 `s` 和动作 `a`，会得到一个奖励 `r`，表示当前行为的好坏。
        
5. **折扣因子 γ（Gamma, Discount Factor）**
    
    - 控制未来奖励的重要程度，取值在 `[0,1]`。越接近 0，智能体越注重眼前的奖励；越接近 1，越注重长期奖励。
        

---

### 🧠 MDP 的基本假设：马尔可夫性

MDP 假设：

> 当前的状态和动作决定了下一步发生什么，**与历史无关**。  
> 即：

```
P(s_{t+1} | s_t, a_t, s_{t-1}, a_{t-1}, ...) = P(s_{t+1} | s_t, a_t)
```

---

### 🎯 MDP 的目标是什么？

让智能体学到一个策略（Policy）π(s)，使得它在环境中采取动作能获得**最大的长期累计奖励**（期望总奖励最大化）：

```
max E[ R_1 + γR_2 + γ^2R_3 + ... ]
```

---

如果你是想从工程角度或者实际应用角度了解 MDP，我也可以举个例子或者用图来说明~ 要吗？