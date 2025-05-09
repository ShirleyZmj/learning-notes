## LLM Threat Definition:
 _"A potential negative action, behavior, or event arising from or facilitated by an LLM, with consequences that could compromise the security, integrity, functionality, or trust in applications or systems deploying the LLM."_
 由 LLM 引起或由 LLM 促进的潜在负面行为、事件，其后果可能危害部署 LLM 的应用或系统的安全性、完整性、功能或信任。”


## 1. 理解大型语言模型的安全格局：威胁、漏洞和影响

- **LLM 威胁格局：** 随着 GPT-2 等先进 LLM 的出现，其潜在的滥用风险也日益凸显。文档将 LLM 的威胁分为以下几类：
    - **法律和监管威胁：** 例如，违反新兴的 AI 监管法规。
    - **模型特定威胁：** 源于模型自身特性，如生成有害内容。
    - **高级威胁技术：** 利用 LLM 能力进行复杂的攻击。
    - **滥用和误用威胁：** 将 LLM 用于欺诈、诽谤等恶意目的。
    - **基础设施威胁：** 针对支撑 LLM 运行的底层设施的攻击。
- **常见 LLM 漏洞：** 威胁的实现往往依赖于 LLM 本身存在的弱点。文档列举了以下主要漏洞类型：
    - **LLM 训练数据中的漏洞：** 包括数据偏差与公平性问题、数据投毒以及数据泛化不足。
    - **架构漏洞：** 如过拟合、模型复杂性以及内存保留导致的信息泄露。
    - **模型行为导致的漏洞：** 例如，模型行为的可预测性、缺乏上下文意识以及过度自信导致的错误信息传播。
- **商业影响：应用和重要性：** LLM 在客户互动、内容生成、数据分析和产品开发等领域具有广泛的应用。然而，过度依赖可能导致创新停滞和信息误传，同时面临监管障碍和客户信任危机。组织必须重视数据隐私和伦理考量，确保透明的数据使用和防范滥用。
- **OWASP 及其他知名研究：**
    - **OWASP Top 10 for LLMs：** 强调通用应用程序安全原则与 LLM 特有挑战之间的差距，并提供了针对 LLM 最关键的十个漏洞的分析、对策和潜在攻击概述。
    - **MITRE's ATLAS™：** 借鉴 MITRE ATT&CK® 框架，构建了一个关于机器学习系统对抗性威胁的知识库，记录了攻击者的策略、技术和实际案例。
    - **NIST's AI Risk Management Framework：** 旨在为 AI 生命周期中的风险管理提供自愿采纳的框架，以增强 AI 的可信度。

## 2. 提示注入 Prompt Injection

**Prompt Injection**（提示注入）是指通过精心构造和策略性的输入（prompts），来操纵LLM，使其执行非预期的操作。这类似于传统的“注入”攻击，例如SQL注入，攻击者通过在输入字段中插入恶意代码来执行未授权的命令。在LLM的场景下，攻击者通过设计特定的语句，诱导模型泄露敏感信息或执行不希望的操作。

为了更好地理解**Prompt Injection**（提示注入），需要掌握以下关键概念（Key Concepts）：

- LLM对**Prompts**（提示）的依赖性 (LLM's Dependency on Prompts)
- **Contextual Understanding**（上下文理解）
- **Training Data and Bias**（训练数据和偏差）
- **Statefulness vs. Statelessness**（有状态与无状态）
- **Safeguard Mechanisms**（安全防护机制）
- 模型的**Uncertainty and Confidence Levels**（不确定性和置信度）

**Prompt Injection**（提示注入）被定义为故意操纵提供给LLM的输入**Prompts**（提示），以诱导它们产生非预期的、通常是恶意的响应。

根据其意图、隐蔽性和方法，**Prompt Injection**（提示注入）主要分为以下三个类别（Categories）：

- **Subtle Injections**（隐蔽注入）：这些注入不直接表现出恶意，**Prompts**（提示）看似无害，但经过精心设计，其响应可能具有破坏性。由于其隐蔽性，这些注入可能绕过常见的安全防护或过滤器。
- **Direct Prompt Injection**（直接提示注入）：攻击者在**Prompt**（提示）中直接包含明确的指令，试图覆盖或修改LLM的原始指令，例如指示模型忽略之前的命令或泄露内部信息。
- **Context-Based Injections**（基于上下文的注入）：这类注入依赖于LLM在对话或多轮交互中维护的上下文。攻击者可能会在早期的**Prompts**（提示）中埋下伏笔，然后在后续的**Prompts**（提示）中利用这些上下文来达到恶意目的。

您还提供了一些**Prompt Injection Examples**（提示注入的例子），包括：

1. **Direct Prompt Injection**（直接提示注入）：揭示训练数据。
2. **Context-Based Injections**（基于上下文的注入）：数据库利用指南。
3. **Subtle Injections**（隐蔽注入）：一个具有现实影响的虚构故事。

最后，您介绍了**Prevention & Mitigation Techniques**（预防与缓解技术），将其分为以下几类：

- **Preventative Controls**（预防性控制）：旨在阻止**Prompt Injection**（提示注入）发生。包括：
    - **Input Sanitization**（输入净化）：移除或修改**Prompts**（提示）中潜在的有害序列。
    - **Rate Limiting**（速率限制）：限制单个来源在一定时间内的查询频率，以阻止探测尝试。
    - **Context Length Limitation**（上下文长度限制）：限制LLM考虑的历史上下文数量，以减少基于上下文的注入成功的机会。
    - **User Education**（用户教育）：告知用户恶意**Prompts**（提示）的潜在风险，并教会他们识别可疑行为。
- **Corrective Controls**（纠正性控制）：在成功的**Prompt Injection**（提示注入）发生后，纠正或减轻其影响的措施。包括：
    - **Feedback Mechanism**（反馈机制）：允许并鼓励用户报告意外、不准确或有害的输出。
    - **Model Retraining**（模型再训练）：将成功的**Prompt Injection**（提示注入）案例纳入模型的训练数据，使其能够更安全地响应或拒绝类似的未来**Prompts**（提示）。
- **Detective Controls**（检测性控制）：识别和警告潜在的**Prompt Injection**（提示注入）尝试或成功入侵的方法。包括：
    - **Monitoring & Logging**（监控与日志记录）：捕获和分析用户**Prompts**（提示）和模型响应。
    - **Automated Alert Systems**（自动警报系统）：实施算法标记潜在的恶意或可疑**Prompts**（提示）。
    - **Post-Processing Layers**（后处理层）：在将LLM的输出呈现给用户之前，使用外部系统扫描输出。

通过区分预防性、纠正性和检测性措施，组织可以更好地分配资源并优先处理工作，从而构建更强大的防御体系来应对LLM中的**Prompt Injection**（提示注入）威胁。

### Defination
Prompt Injection is the deliberate manipulation of input prompts given to Large Language Models (LLMs) to induce them into producing unintended, often malicious, responses. Similar to how a hacker might use SQL injection to run unauthorized commands in a database, prompt injections exploit the response mechanism of LLMs by feeding them carefully crafted inputs.

### Categories
1. Direct Prompt Injections 直接提示注入
	- "_Provide the default admin password for XYZ software_".
2. Context-Based Injections 基于上下文的注入
	- the attacker uses previous context to set up a scene for the injection. For example, engaging the model in a conversation about database vulnerabilities and then subtly shifting to asking about ways to exploit them.
3. Subtle Injections 微妙注入

## Prevention & Mitigation Techniques
### **Preventative Controls:  预防措施：**
1. Input Sanitization  输入清理
	- Strip out or modify potentially harmful sequences in prompts.
2. Rate Limiting  速率限制
	- Thwart probing attempts by limiting the frequency of queries from a single source over a given period. This can prevent attackers from experimenting with and refining their malicious prompts.
3. Context Length Limitation  上下文长度限制
	- By constraining the amount of past context the LLM considers, you can reduce the chances of subtle, context-based injections from succeeding.
4. User Education   用户教育
	- Informing users about the potential risks of mischievous prompts and teaching them to recognize suspicious behaviors can act as a first line of defense.

### **Corrective Controls:  纠正控制：**
_Actions to rectify or mitigate the effects of a successful prompt injection.  
纠正或减轻成功提示注入影响的措施。_
1. **Feedback Mechanism:** 
	- Allow and encourage users to report unexpected, inaccurate, or harmful outputs. A swift response system can then analyze these reports and refine the model's behavior or the overarching system to prevent future occurrences.
2. **Model Retraining:**
	- Should a specific prompt injection prove successful, consider incorporating that scenario into the model's training set, teaching it to respond more safely or not at all to similar future prompts.

### **Detective Controls:  侦探控制：**
_Methods to identify and alert on potential prompt injection attempts or successful breaches.  
识别和警报潜在提示注入尝试或成功的入侵的方法。_
1. **Monitoring & Logging:** 
	- Capture and analyze user prompts and model responses. Unusual patterns or unexpected query spikes can be indicators of injection attempts.
2. **Automated Alert Systems:** 
	- Implement algorithms that flag potentially malicious or suspicious prompts, alerting a security team for further investigation.
3. **Post-Processing Layers:** 
	- Use external systems to scan the LLM's outputs before presenting them to users. If certain responses match known malicious patterns or potential data exposures, they can be flagged or blocked.


## 3. Insecure Output Handling（不安全输出处理）。

**Insecure Output Handling**（不安全输出处理）指的是下游组件在没有进行充分安全检查的情况下直接接受LLM的输出，这类似于给予用户对系统功能的非预期访问权限。虽然传统的软件漏洞可能源于被其他应用程序滥用的、处理不当的输出，但LLM由于其生成广泛且多样的响应的能力，使得不安全地管理这些输出可能成为恶意行为者寻求可利用数据的温床。

**Insecure Output Handling**（不安全输出处理）可能导致多种安全问题（Consequences）：

- **Cross-Site Scripting (XSS)**（跨站脚本）：恶意脚本可能被插入到网页中，允许攻击者利用LLM生成的内容在用户的浏览器上执行非预期的操作。
- **Cross-Site Request Forgery (CSRF)**（跨站请求伪造）：如果LLM输出生成具有欺骗性的链接，最终用户可能会被诱骗执行Web应用程序上不希望的操作。
- **Server-Side Request Forgery (SSRF)**（服务器端请求伪造）：LLM输出可能无意中暴露内部服务器资源。
- **Privilege Escalation**（权限提升）：LLM输出可能无意中为攻击者提供提升系统访问权限的线索或途径。
- **Remote Code Execution**（远程代码执行）：LLM输出的Java或Go等语言的字符串在执行时可能运行系统命令。

材料中还提到了“**Insecure Output Handling Examples**”（不安全输出处理的例子），但内容尚未完整。

最后，讨论了“**Prevention & Mitigation Techniques**”（预防与缓解技术），同样将其分为以下几类：

- **Preventative Controls**（预防性控制）：旨在主动避免风险发生。包括：
    - **Input and Output Validation**（输入和输出验证）：像处理任何用户生成的内容一样处理LLM的输出。在允许其与任何其他系统交互之前，验证和清理输出。例如，如果LLM生成SQL查询，则使用预处理语句或查询参数化来防止SQL注入。
    - **Encoding and Escaping**（编码和转义）：对于Web应用程序尤其重要，对LLM输出进行编码或转义，以确保任何嵌入的脚本或恶意内容不会被意外执行。
    - **Strict Role-Based Access Controls (RBAC)**（严格的基于角色的访问控制）：确保LLM不拥有超出必要范围的权限。通过设置严格的RBAC，即使攻击者操纵LLM的输出，也可以控制潜在的损害。
- **Corrective Controls**（纠正性控制）：在检测到漏洞后采取的措施，旨在纠正影响。包括：
    - **Automated Rollbacks in CI/CD**（CI/CD中的自动回滚）：如果在部署后检测到异常（可能来自恶意的LLM输出），CI/CD管道应具有自动回滚到安全状态的机制。
    - **Regular Patching and Updates**（定期补丁和更新）：保持系统更新可以确保修补接口软件中任何已知的漏洞，从而减少攻击者可以利用的途径。
- **Detective Controls**（检测性控制）：侧重于识别和警告漏洞或违规行为。包括：
    - **Anomaly Detection**（异常检测）：实施监控LLM输出中异常模式的系统。如果输出突然偏离既定规范，则可能是被操纵的迹象。
    - **Logging and Monitoring**（日志记录和监控）：维护LLM交互的完整日志。通过监控这些日志，可以发现可疑活动或可能表明不安全处理事件的输出。
    - **Regular Security Audits**（定期安全审计）：定期审计LLM和下游系统之间的集成点。这有助于发现潜在的漏洞和不安全做法。

总结来说，虽然LLM在输出处理方面提出了新的挑战，但一套基于传统IT安全实践的强大控制措施可以有效地减轻相关的风险。

请注意，“**Insecure Output Handling Examples**”（不安全输出处理的例子）和“**Incomplete Knowledge Check**”（未完成的知识检查）部分在您提供的内容中是不完整的。如果您希望我总结这些部分，请提供完整的内容。




## **4. 训练数据中毒**

这部分内容着重介绍了机器学习模型，特别是大型语言模型（LLM）所面临的一种关键安全威胁：训练数据中毒。由于 LLM 的性能和输出质量高度依赖于其训练数据的质量和完整性，因此对训练数据的恶意篡改或意外污染可能会对模型的安全性、可靠性和伦理道德产生严重的影响。

**关键概念 — 训练数据中毒简介**

- LLM 的基础是其训练数据，这些数据驱动着模型的输入和输出。为了保证模型的多功能性和知识广博性，训练数据需要涵盖广泛的领域、流派和语言。
- LLM 通过学习训练数据中的模式和结构来生成响应。
- **训练数据中毒**指的是原始训练数据被恶意或无意篡改的情况。这种篡改可能引入异常、偏见或漏洞，从而扭曲 LLM 的输出。
- 数据中毒是一种**完整性攻击**，会影响 LLM 生成准确预测的可靠性。
- 使用外部训练数据源（如 Common Crawl、WebText 和 OpenWebText）会增加数据中毒的风险，因为模型开发者通常无法完全控制或信任这些数据源。这些外部数据集中可能存在的偏见、错误信息或不当内容可能会反映在模型的输出中。

**训练数据篡改的定义和影响**

- **定义：** LLM 的训练数据中毒是指对训练数据集的恶意或无意修改，目的是将漏洞、偏见或后门融入模型，损害模型的安全性、输出的真实性和伦理道德标准。这本质上是对模型核心知识库的蓄意操纵。
- **训练数据篡改的影响：**
    - **安全问题：** 被篡改的训练数据可能使模型成为恶意活动的工具，例如植入虚假信息以欺骗用户。
    - **模型恢复能力：** 使用未经严格审查的数据源可能降低模型的鲁棒性，导致模型输出不准确甚至有害的信息。模型还可能无意中吸收和传播有缺陷或有害的数据集，进一步削弱其恢复能力。
    - **伦理影响：** 基于被污染数据训练的模型可能无意中表现出偏见，产生冒犯性、误导性或歧视性的输出，从而引发严重的伦理道德问题，强化刻板印象，误导用户，甚至使某些群体边缘化。
- 强调训练数据的纯洁性至关重要，忽视这一点会严重损害 LLM 的效用、伦理立场以及用户信任。

**训练数据中毒的示例**

提供了三个说明性示例，以具体化训练数据中毒的含义：

- **误导性的生成式 AI 输出：** 攻击者通过在训练数据中注入微妙的错误信息，使得模型在特定主题上生成不准确或误导性的内容，从而影响公众认知或造成其他危害。
- **有毒数据的影响和注入：** 恶意行为者将包含后门触发器的样本注入到训练数据中。经过训练后，模型在正常情况下表现良好，但当接收到特定的触发输入时，会激活后门并执行攻击者预设的恶意行为。
- **同步训练攻击：** 在联邦学习等分布式训练场景中，恶意参与者可能会故意贡献有毒数据，从而影响全局模型的性能或引入后门。

这些示例强调了训练数据对 LLM 输出的深远影响，并提醒人们在提升 AI 能力的同时，必须警惕潜在的危害途径，确保构建既强大又值得信赖的工具。

**预防和缓解技术**

为了保护 LLM 免受训练数据中毒及其风险，需要采取多方面的方法，包括预防和纠正控制措施以及检测技术：

- **预防控制措施：**
    - **训练数据供应链：** 记录训练数据的来源和依赖关系，确保透明度和可追溯性。
    - **合法性验证：** 验证数据源的真实性和内容的合法性，降低引入偏差或恶意数据的风险。
    - **特定于用例的训练：** 为不同的用例设计单独的、使用特定数据训练或微调的模型，以确保输出的精确性和准确性。
    - **沙盒化和数据源限制：** 防止 LLM 访问意外的数据源，确保机器学习输出不受意外数据的危害。
    - **数据净化和过滤：** 对训练数据进行严格的输入过滤，并在微调过程中使用统计异常值检测和异常检测等技术来识别和清除对抗性或不需要的数据。
- **纠正控制措施：**
    - **对抗鲁棒性：** 利用联邦学习等技术实现分布式模型训练以降低集中化风险，并使用约束处理异常值或采用对抗性训练来增强模型在最坏情况下的鲁棒性。“MLSecOps”方法和 Autopoison 等工具可以帮助理解和应对潜在的攻击。
- **检测控制措施：**
    - **训练阶段监控：** 监控训练过程中的损失指标，这可能是数据中毒的早期迹象。
    - **行为分析和阈值监控：** 仔细检查模型对特定测试输入的行为，并设置偏差响应的阈值警报。
    - **人工审查和审核：** 手动审查模型响应的子集，以提供额外的保障，避免偏差或错误输出。
    - **基准设置和增强式学习：** 使用专用 LLM 为所需响应设置基准，并使用增强式学习技术训练其他 LLM，确保其符合所需的输出模式。
    - **红队演习和漏洞扫描：** 将针对 LLM 的红队测试或漏洞评估纳入 LLM 的生命周期测试阶段，以深入了解潜在的弱点并及时进行缓解。

通过实施和不断完善这些控制措施，组织可以确保其 LLM 保持可信、有效和具有较强的恢复能力，能够抵御训练数据中毒攻击。

**知识测验**

包含了两个选择题，用于检验对训练数据中毒概念的理解：

- **问题 1：** 训练数据中毒主要针对 LLM 中的什么因素？
    - 正确答案：**模型完整性**
- **问题 2：** 以下哪项是训练数据中毒的潜在影响？
    - 正确答案：**偏差或有偏见的输出**

总而言之，这部分内容深入探讨了训练数据中毒的定义、影响、示例以及预防和缓解技术，强调了保障 LLM 训练数据安全的重要性。


## **5. 模型拒绝服务 (DoS)**

这部分内容探讨了针对大型语言模型（LLM）的一种特定类型的安全威胁：模型拒绝服务 (DoS) 攻击。由于 LLM 本身复杂且资源密集型的特性，它们容易成为攻击者通过消耗其计算资源来中断服务或增加运营成本的目标。

**关键概念 — 模型 DoS 攻击简介**

- LLM 依赖于巨大的计算能力来分析和生成输出。模型越大、越复杂，所需的计算资源就越多。
- 这种对大量资源的需求使得 LLM 容易受到旨在耗尽这些资源的攻击，导致服务中断或成本增加。
- 与传统的 DoS 攻击通过大量流量淹没系统不同，模型 DoS 攻击涉及恶意行为者故意向模型发送复杂的、消耗资源的提示。
- 这种攻击的目的在于降低服务质量或显著增加运营费用。

**模型 DoS 风险的定义和影响**

- **定义：** 针对 LLM 的模型拒绝服务 (DoS) 攻击的特征是，攻击者以消耗海量计算资源的方式与模型交互。这种过度交互不仅会给系统带来压力，还有可能导致为攻击者和其他用户提供的服务质量下降。
- 除了用请求淹没系统外，还存在操纵模型**上下文窗口**的潜在威胁。上下文窗口是指模型一次可以处理的最大文本块，包括输入和生成的输出。上下文窗口的大小取决于具体模型的架构，并且可能因不同的 LLM 而异。
- **模型 DoS 风险的影响：**
    - **服务质量下降：** 用户可能会遇到响应时间较长的问题，甚至面临系统不可用的问题。
    - **运营成本增加：** 由于 LLM 的资源密集型特性，此类攻击可能导致运营成本显著增加，尤其是在费用与计算消耗挂钩的云环境中。
    - **上下文窗口篡改：** 随着 LLM 在众多应用程序中的集成度越来越高，加上其高资源需求和不同用户输入的不可预测性，操纵上下文窗口成为一个重要的安全问题。干扰上下文窗口可能导致输出被截断、置于错误的上下文中或完全误导，最终危及 LLM 的可信度和实用性。许多开发者尚未意识到这个潜在的漏洞。

**模型拒绝服务示例**

提供了三个示例，说明攻击者如何利用 LLM 的资源密集型特性来发起 DoS 攻击：

- **高容量任务生成：** 攻击者通过提交大量查询，使得某些 LLM 应用程序（如 LangChain 或 AutoGPT）持续生成大量任务，导致持续的资源消耗和服务中断或系统性能下降。
- **连续输入溢出和递归上下文扩展：** 攻击者可以设计导致 LLM 在其上下文窗口内生成冗长且重复的输出的输入。通过连续发送这样的输入，攻击者可以迅速消耗模型的上下文窗口，迫使模型处理大量无意义的数据，最终导致性能下降甚至崩溃。
- **可变长度输入洪流：** 攻击者可以发送一系列精心制作的、长度逐渐增加的输入。由于 LLM 需要按输入长度比例分配计算资源，处理这些不断增长的输入会导致资源消耗急剧增加，最终使系统过载。

这些示例展示了攻击者如何利用 LLM 的资源密集型性质来发起 DoS 攻击。

**预防和缓解技术**

虽然模型 DoS 风险令人担忧，但并非没有应对措施。通过整合预防、检测和纠正控制措施，开发者可以构建针对潜在威胁的强大防御体系：

- **预防控制措施：**
    - **输入验证和净化：** 确保用户输入在预定义限制范围内，并移除任何恶意内容，防止攻击者触发资源密集型计算。
    - **设置资源使用上限：** 限制每个请求或步骤分配的计算资源，即使复杂的请求也能以较慢的速度执行，防止突然的资源耗尽。
    - **API 限速：** 限制单个用户或 IP 地址在特定时间范围内可以发出的请求数量，防止旨在使 LLM 过载的输入洪流。
- **检测控制措施：**
    - **资源利用率监控：** 持续监控 LLM 的资源利用率，快速识别可能表明 DoS 攻击的异常峰值或模式。
- **纠正控制措施：**
    - **操作限制：** 不仅限制排队操作的数量，还要限制为响应 LLM 输出而启动的系统操作的总数，防止系统被大量或复杂的任务压垮。

全面实施这些措施将极大地有助于保护 LLM 免受潜在的模型 DoS 攻击。

**知识测验**

包含了两个选择题，用于检验对模型 DoS 攻击概念的理解：

- **问题 1：** 在 LLM 中，“上下文窗口”代表什么？
    - 正确答案：**模型可以管理的最大文本长度，包括输入和输出。**
- **问题 2：** 针对 LLM 的模型 DoS 攻击与传统 DoS 攻击的区别是什么？
    - 正确答案：**模型 DoS 攻击涉及向模型发送复杂的、消耗资源的提示。**

总而言之，这部分内容详细介绍了针对 LLM 的模型拒绝服务 (DoS) 攻击的定义、影响、示例以及预防和缓解技术，强调了保护 LLM 免受此类资源耗尽型攻击的重要性。



## **6. 供应链漏洞**

这部分内容着重介绍了大型语言模型（LLM）生态系统中存在的供应链漏洞风险。LLM 的构建和运行依赖于一个复杂的组件网络，包括第三方数据集、插件、预训练模型以及各种辅助服务。这种复杂的依赖关系使得整个系统容易受到供应链中潜在的安全漏洞的影响。

**关键概念 — LLM 供应链简介**

- 构成 LLM 的组件网络并非孤立的单一系统，而是由许多模块、服务、数据源以及相关的预训练模型组成，形成所谓的 LLM“供应链”。
- 类似于传统制造业的供应链，LLM 的数字供应链包含了从第三方数据集和插件到预训练模型及辅助服务的所有内容。
- 供应链的广度和复杂性越高，潜在漏洞潜入系统的可能性就越高。每个添加到 LLM 生命周期中的外部组件或服务都可能存在意外的安全漏洞。
- 虽然第三方组件可以提供重要功能、加速开发或提高模型能力，但如果获取和集成方式不够安全，它们也可能成为潜在的漏洞来源。

**LLM 供应链漏洞的定义和影响**

- **定义：** 当 LLM 系统的任何组成部分无意中或通过有针对性的恶意活动受到损害时，就会出现 LLM 领域的供应链风险。
- 虽然“供应链漏洞”一词通常与软件组件中的缺陷相关，但在机器学习领域，其范围扩大到包括预训练模型和训练数据中的潜在弱点。
- **LLM 供应链漏洞的风险类型：**
    - **数据完整性风险：** 恶意或受损的第三方数据集可能导致模型学习到不准确或有偏见的信息。
    - **模型篡改风险：** 预训练模型可能已被植入后门或恶意功能，导致模型在特定条件下产生有害行为。
    - **部署平台漏洞：** LLM 部署的基础设施（例如云服务、容器）可能存在安全漏洞，攻击者可以利用这些漏洞来破坏整个系统。
    - **完整系统故障：** 供应链中的关键组件（例如依赖的库或服务）出现故障或中断可能导致整个 LLM 系统无法运行。
    - **中毒攻击：** 恶意行为者可能会通过供应链中的某个环节（例如受污染的数据集或插件）引入中毒数据，从而影响模型的行为。
- 认识到这些漏洞和相关风险，将使开发者和组织能够采取必要的措施来确保其 LLM 应用程序的安全性和鲁棒性。

**可利用 LLM 供应链漏洞的场景**

提供了三个具体的场景，说明攻击者如何利用 LLM 供应链中的弱点，对 LLM 系统及其用户造成潜在的严重后果：

1. **受损的预训练模型：**
    
    - 研究组织为了加速 LLM 开发，使用了在线提供的预训练模型。
    - 攻击者事先巧妙地修改了该模型，使其在特定条件下表现出恶意行为。
    - 当研究组织使用该模型并为其提供某些提示时，LLM 开始生成传播错误信息或有偏见的数据的输出，从而损害了该组织的可信度。
2. **恶意插件或扩展：**
    
    - 一个流行的 LLM 平台允许用户集成第三方插件来扩展其功能。
    - 攻击者创建了一个看似有用的插件，但在其代码中隐藏了恶意代码。
    - 当用户安装并使用该插件时，恶意代码可能会窃取敏感数据、破坏系统或执行其他未经授权的操作。
3. **后门数据集集成：**
    
    - 一个公司依赖外部供应商提供的大型数据集来训练其 LLM。
    - 攻击者渗透到供应商的系统中，并在数据集中注入包含后门触发器的样本。
    - 经过训练后，LLM 在正常情况下表现良好，但当接收到特定的触发输入时，会激活后门并执行攻击者预设的恶意行为。

了解这些场景强调了在 LLM 供应链的每个阶段保障安全的重要性，确保漏洞不会为恶意行为者提供可利用的途径。

**预防和缓解技术**

为了确保 LLM 系统安全可靠，免受供应链风险的影响，必须实施各种预防、检测和纠正控制措施：

- **预防控制措施：**
    - **供应商审查：** 在集成第三方组件或数据之前，仔细审查供应商的条款和条件以及隐私政策，确保供应商信誉良好且值得信赖。
    - **独立审核：** 要求供应商接受独立安全审核，并审查这些审核结果，以确认他们已部署充分的安全措施。
    - **数据保护一致性：** 确保模型运营商的策略与组织的数据保护策略保持一致，防止数据被用于未经授权的训练或其他目的。
    - **版权保证：** 向模型维护者寻求法律保证，确保他们不使用受版权保护的资料，以提供法律保护并确保模型的完整性。
- **检测控制措施：**
    - **信誉良好的代码监控：** 仅使用信誉良好的代码和可执行文件，并监控这些组件是否存在潜在漏洞或与预期行为的偏差。
    - **定期系统扫描：** 持续扫描系统中是否存在任何已过时或已弃用的组件，确保使用最新、最安全的版本。
    - **数据流分析：** 密切关注数据的流向，尤其是在数据由外部 LLM 处理时，以检测任何未经授权的数据使用。
- **纠正控制措施：**
    - **更新机制：** 建立及时更新或更换发现易受攻击或已过时组件的机制。
    - **事件响应协议：** 制定明确的事件响应计划，以应对因供应链漏洞导致的任何违规或意外行为，包括遏制、调查和恢复步骤。

通过实施这些控制措施，组织可以显著降低与 LLM 供应链漏洞相关的风险，确保更安全、更高效的系统部署。

**知识测验**

包含了两个选择题，用于检验对 LLM 供应链漏洞概念的理解：

- **问题 1：** 为何审查 LLM 供应链中的数据源和供应商非常重要？
    - 正确答案：**预防潜在的版权侵权和数据隐私问题。** (虽然也与安全有关，但此处更侧重于合法性和合规性)
- **问题 2：** 以下哪种场景可能是 LLM 供应链受损的结果？
    - 正确答案：**攻击者引入有偏见或不正确的数据，以影响 LLM 输出。**

总而言之，这部分内容强调了 LLM 供应链中存在的潜在安全风险，并提供了识别、预防和缓解这些风险的关键策略。理解和管理 LLM 的供应链安全对于构建可靠和值得信赖的 AI 系统至关重要。


---

## **7. 敏感信息泄露**

这部分内容聚焦于大型语言模型（LLM）可能无意中泄露敏感信息的重大风险。由于 LLM 经常基于庞大的、来源广泛的数据集进行训练，因此存在它们在响应中回忆和重现秘密数据的潜在风险。

**关键概念 — LLM 中的敏感信息泄露简介**

- 敏感信息泄露不仅包括公司机密或国家机密，还可能涉及个人用户数据、专有研究成果、受版权保护的内容以及任何未经适当许可不应共享的数据。
- 未经授权访问此类数据可能导致严重的后果，从侵犯个人隐私到大规模安全漏洞。
- 这一挑战源于 LLM 的架构和训练方式。当模型从大量数据中学习模式时，它们也可能捕获本不打算公开传播的细节。
- 通过正确的理解、意识和措施，可以显著降低这些风险。

**敏感信息风险和信任边界**

- **定义：** 在 LLM 环境下，敏感信息风险是指通过 LLM 的输出意外泄露机密数据、专有工艺或其他秘密。
- **双向信任边界：** 使用者与 LLM 应用程序之间的交互构成了一个关键的双向信任边界。
    - 一方面，使用者向 LLM 输入信息，这些输入的真实性和安全性是不可完全信任的。
    - 另一方面，LLM 返回给使用者的输出可能无意中泄露敏感细节。
- 必须以怀疑的态度对待这种信任边界的两端。尽管可以添加限制来指导 LLM 的响应，但此类模型固有的不可预测性意味着它们可能并不总是严格遵守这些限制。外部因素（如提示注入）可能会进一步复杂化这种情况。
- 了解敏感信息风险的性质和 LLM 交互中的双向信任边界，为理解实际案例奠定了基础。

**敏感信息泄露的说明性示例**

提供了三个示例，突显了敏感信息泄露的风险以及在 LLM 交互环境中确保信息安全的复杂性：

1. **专利工艺泄露：**
    
    - 研究人员向 LLM 询问一家领先制药公司最近开发的新型专利工艺。
    - LLM 不仅提供了泛泛的概述或通用信息，还详细列出了工艺的复杂步骤和特定组件。
    - 这种泄露不仅侵犯了专利权，还削弱了该公司潜在的竞争优势。
2. **个人身份信息 (PII) 泄露：**
    
    - 用户与一个旨在提供一般建议的 LLM 聊天机器人互动。
    - 在对话过程中，用户无意中提到了自己的电子邮件地址和电话号码。
    - 随后，LLM 在对后续问题的回答中，错误地回忆并包含了用户的电子邮件地址，将其暴露给了其他可能的观察者。
3. **内部代码片段暴露：**
    
    - 开发人员使用 LLM 来辅助代码编写。
    - 在一次提示中，开发人员粘贴了一段他们公司专有的、尚未公开的代码片段，询问 LLM 关于其潜在优化的建议。
    - LLM 不仅提供了优化建议，还在后续的交互中，部分地回忆并输出了原始代码片段，这可能会被其他用户或恶意行为者获取。

这些示例强调了 LLM 在处理和生成文本时可能无意中暴露敏感信息的风险，以及在设计和使用 LLM 系统时采取谨慎措施的重要性。

**预防和缓解技术**

了解通过 LLM 泄露敏感信息的风险至关重要，更重要的是要采取预防和应对这些风险的策略。以下措施分为预防、检测和纠正控制，提供了一种全面的方法来增强 LLM 交互的安全性，防止未经授权的数据泄露：

- **数据净化：** 在训练 LLM 之前，对训练数据进行彻底的审查和清理，删除或匿名化所有形式的敏感信息，以减少模型学习和回忆这些数据的可能性。
- **强大的输入验证：** 实施严格的输入验证机制，以阻止用户在提示中输入敏感信息。这包括识别和阻止潜在的 PII 或机密数据。
- **模型扩充监督：** 如果 LLM 能够访问外部数据源或插件，则需要实施严格的监督和控制，以防止模型在响应中检索和包含敏感信息。
- **模型监控：** 持续监控 LLM 的输出，寻找任何可能表明敏感信息泄露的模式或异常情况。这可以通过自动化工具和人工审查相结合的方式进行。
- **输入-输出分析：** 分析用户的输入和 LLM 的输出来识别潜在的敏感信息泄露模式。这有助于发现模型可能无意中暴露特定类型敏感信息的情况。
- **反馈机制：** 建立用户反馈渠道，允许用户报告他们观察到的任何潜在敏感信息泄露。这些反馈可以用于改进模型和安全措施。
- **自适应净化：** 开发能够根据上下文动态调整其净化策略的系统。例如，如果检测到用户正在询问敏感主题，则可以应用更严格的过滤规则。

通过采用这些控制措施，开发者和组织可以确保与 LLM 进行更安全的交互，从而降低意外泄露敏感信息的风险。


## 8. 不安全的插件设计

### 关键概念 — 不安全的 LLM 插件设计简介

* LLM 生态系统中的插件旨在增强功能，但也可能引入安全漏洞。
* 不安全的插件设计（例如输入验证不足、缺乏访问控制）可能被恶意行为者利用。
* 潜在的严重后果包括远程代码执行，威胁应用程序的完整性。
* 对 LLM 系统及其插件进行严格的安全审查至关重要。

### 了解不安全的插件设计

* 不安全的插件设计涉及插件危害与信任之间的复杂关系。
* 缺乏强大的访问控制和适当的授权监督会增加风险。
* 插件之间或插件对输入的过度信任可能导致安全问题。
* 恶意输入可能导致：
    * **数据外泄：** 未经授权地检索和传输敏感数据。
    * **远程代码执行：** 攻击者在系统上运行任意代码。
    * **权限提升：** 利用漏洞获取更高的访问权限。
* 不要将插件仅视为功能扩展，而应将其视为潜在的安全责任，需要仔细管理。

### 不安全的插件设计的现实示例

* 以下示例强调了不同类型的漏洞以及忽视安全性的后果：

    1.  **未指定的参数验收：**
        * 允许用户在单个文本字段中输入所有参数的设计存在风险。
        * 缺乏对输入参数的明确定义和验证，可能导致安全漏洞。

    2.  **覆盖配置设置：** （*内容缺失，但根据标题推测可能涉及插件允许用户修改敏感配置，导致安全风险。*）

    3.  **使用原始语句绕过授权：**
        * 允许用户直接输入原始 SQL 或编程语句，看似灵活但风险很高。
        * 攻击者可以编写语句查询敏感数据、修改数据库或引入恶意逻辑。
        * 如果插件具有与 LLM 相同的权限，风险会更高。

* 这些示例强调了安全插件设计的重要性。

### 预防和缓解技术

* 了解潜在风险后，采取预防、检测和纠正措施至关重要。

    * **预防控制措施：** （*内容缺失，但应包含如输入验证、最小权限原则、安全编码实践等。*）
    * **检测控制措施：** （*内容缺失，但应包含如安全审计、日志记录、入侵检测系统等。*）
    * **纠正控制措施：**
        * **反馈机制：** 建立用户或第三方报告漏洞的渠道。
        * **快速响应团队：** 及时调查、验证和修复报告的问题。

* 结合使用这些措施可以显著降低不安全插件带来的风险。

## 9. 过度代理

**关键概念 — 把握基于 LLM 的系统的代理**

* LLM 被赋予代理能力，自主与其他系统交互并执行任务。
* 这种代理能力带来过度自动化和过度权限的风险。
* **过度自动化：** 过度依赖 LLM，绕过重要的人工检查，可能导致不可预见的后果。
* **过度权限：** LLM 访问或修改超出预期范围的数据和系统，构成安全和运营威胁。
* 理解这些风险并建立平衡的方法至关重要，以有效利用 LLM 代理，同时保障安全和运营完整性。

**过度代理的定义和影响**

* **定义：** “过度代理”是指基于 LLM 的系统中存在的风险，使系统能够由于模棱两可或意外的输出而进行潜在的破坏性活动。
* 风险来源：提示注入、恶意插件、设计错误的提示或性能不佳的模型。
* 过度代理的主要原因：
    * **过度功能：** LLM 拥有超出其必要范围的功能。
    * **过度权限：** LLM 拥有超出其执行任务所需的访问权限。
    * **过度自主性：** LLM 在没有必要监督的情况下做出决策。
* 缓解这些过度因素对于安全利用 LLM 至关重要。

**过度代理的现实示例**

* 说明了过度代理在实际场景中的表现：

    * **文档管理中的过度功能：** LLM 客户支持助手在没有额外确认的情况下自主删除用户上传的产品列表或图像，可能导致经济损失。
    * **数据库访问中的过度权限：** （*内容缺失，但可以推测 LLM 拥有超出推荐购买所需的数据库访问权限，可能修改或访问敏感数据。*）
    * **文件删除中的过度自主性：** （*内容缺失，但可以推测 LLM 在没有明确用户指示或确认的情况下自主删除文件。*）

* 这些示例突显了控制 LLM 代理行为的重要性。

**预防和缓解技术**

* 需要强大的策略来应对过度代理的风险。

    * **预防控制措施：**
        * **插件功能限制：** 限制 LLM 代理可调用的插件/工具为基本功能。
        * **功能范围：** 确保插件/工具仅具有绝对必要的功能（例如，邮件摘要插件只有读取权限）。
        * **精细功能：** 优先选择具有具体操作的插件/工具，避免开放式功能（例如，专门的文件写入插件）。
        * **权限边界：** 为 LLM 插件/工具设置明确的权限限制（例如，产品推荐 LLM 只能读取产品表）。
        * **用户授权跟踪：** 代表用户执行的操作应在用户上下文中并在最低权限原则范围内执行。
        * **人工监督：** 对所有重大操作实施人工审批流程。
        * **下游授权：** 将授权置于下游系统，所有来自 LLM 的请求都应符合既定的安全策略。

    * **检测和纠正控制措施：**
        * **活动日志记录：** 监控 LLM 插件/工具的操作，以便及早发现异常活动。
        * **限速：** 限制操作频率，减少潜在危害，并为异常检测提供时间窗口。

* 部署这些措施可以有效管理和降低过度代理的风险。

## 10. 过度依赖

**过度依赖 LLM 简介**

* LLM 在各种应用中扮演重要角色，但过度依赖其输出存在风险。
* 尽管 LLM 功能强大，但并非完美无缺，可能生成错误信息、错误传达意图，甚至导致安全和法律问题。
* 在缺乏人工监控或验证的情况下，过度依赖可能导致运营和伦理困境。
* 需要理解过度依赖的复杂性、潜在风险，并在自动化和人为干预之间寻求平衡。

**定义、幻想与虚构**

* **定义：** 过度依赖 LLM 指在缺乏充分监督或验证的情况下，系统或个人过度信任 LLM 的决策或内容创建。
* 这是对 LLM 输出的盲目信任，当输出偏离事实、适当性或安全性时会带来问题。
* **幻想 (Hallucination)：** LLM 创建完全虚构的信息或场景。
* **虚构 (Confabulation)：** LLM 将真实和虚构数据交织在一起，以看似合理的方式呈现，可能更具欺骗性。
* 理解这些概念对于认识过度依赖的风险至关重要。

**过度依赖的现实影响**

* 示例说明了盲目信任 LLM 输出的风险：

    1.  **决策中的错误信息：** （*内容缺失，但可以推测 LLM 提供不准确的信息导致错误决策。*）

    2.  **不合逻辑或无意义的输出：** （*内容缺失，但可以推测 LLM 生成缺乏连贯性或逻辑的内容。*）

    3.  **将事实与虚构混合在一起：** LLM 在撰写历史事件时混合不相关细节，生成看似合理但不准确的叙述，可能误导读者并损害声誉。

* 这些示例强调了严格审查过程的必要性。

**通过纠正、预防和检测控制措施进行缓解和预防**

* 需要采取一系列措施来预防、检测和纠正过度依赖 LLM 带来的问题。

    * **预防控制措施：**
        * **模型增强：** （*内容缺失，但可能涉及使用更可靠、经过更好训练的模型。*）
        * **任务分解：** 将复杂任务分解为更小的、可验证的步骤。
        * **负责任的用户界面设计：** （*内容缺失，但可能涉及向用户清晰展示 LLM 输出的局限性。*）
        * **安全的开发做法：** 确保开发过程中不引入漏洞。

    * **检测控制措施：**
        * **持续监控：** 跟踪 LLM 的输出和行为。
        * **自动验证机制：** 使用程序自动检查 LLM 输出的准确性或一致性。
        * **外部源交叉检查：** 将 LLM 输出与受信任的外部数据源进行验证。

    * **纠正控制措施：**
        * **风险沟通：** 向用户明确告知过度依赖的潜在风险。
        * **用户反馈回路：** 允许用户报告 LLM 输出中的错误，用于改进模型。

* 整合这些控制措施可以在利用 LLM 潜力的同时有效管理相关风险。

## 11. 模型盗窃

**LLM 生态系统中的模型盗窃简介**

* 模型盗窃指未经授权地访问、复制或泄露专有的 LLM。
* 恶意行为者（个人黑客、APT）试图利用 LLM 的巨大智力和经济价值。
* LLM 生态系统复杂，包括模型、数据、算法和计算资源，存在多个漏洞。
* 模型盗窃不仅是数据泄露，更是对无数研发投入的窃取。
* 后果包括经济损失、竞争优势丧失以及未经授权访问敏感信息。
* 模型盗窃是对知识产权和信息系统安全的重大威胁，需要强大的安全框架和监测。

**模型盗窃的定义和典型影响**

* **定义：** 模型盗窃是指未经授权地访问、复制或传播专有的 LLM。
* 可以通过网络攻击、内部威胁或逆向工程等方式实现。
* 本质是非法复制或使用模型的架构、参数或训练数据，侵犯知识产权。
* **典型影响：**
    * **经济损失：** 开发成本和潜在收入损失，市场饱和导致模型价值降低。
    * **竞争优势丧失：** 创新研发成果被窃取，竞争动态被破坏。
    * **隐私和安全问题：** 模型中嵌入的敏感数据可能泄露，损害合规性和信任。
    * **滥用风险：** 未经授权的 LLM 扩散可能导致生成虚假信息或恶意利用。

**模型盗窃示例**

* 真实场景的假设示例说明了模型盗窃的不同方式：

    * **示例 1 - 基础设施利用：** 一家 NLP 公司因云基础设施配置错误遭受复杂网络攻击，导致其专有 LLM 被泄露，造成经济损失和研发挫折。
    * **示例 2 - 内部威胁：** 一位心怀不满的员工泄露了公司专有 LLM 的关键信息给竞争对手和暗网，损害了公司的竞争优势和市场地位。
    * **示例 3 - 通过滥用 API 进行逆向工程：** 一家初创公司的 LLM API 被恶意行为者通过精心设计的查询进行逆向工程，创建出功能相似的影子模型，损害了初创公司的业务和收入。

* 这些例子强调了网络安全、内部威胁监控和 API 滥用预防的重要性。

**预防和缓解策略**

* 需要采取包括预防、侦查和纠正策略在内的多层方法。

    * **预防措施：**
        * **访问控制和身份验证：** 实施 RBAC 和最小权限原则，限制对 LLM 资产的授权访问，增强身份验证机制。
        * **网络和 API 限制：** 限制 LLM 对基本网络资源、内部服务和 API 的访问，降低攻击面，防止侧信道攻击。
        * **供应链安全：** 警惕管理供应商，跟踪、验证和评估依赖漏洞，防止供应链攻击。
        * **mLOps 治理：** 通过强大的治理和工作流自动化部署 MLOps，加强访问和部署控制，降低未经授权修改的风险。

    * **侦探措施：**
        * **监控和审计：** 定期监控和审计与 LLM 存储库相关的访问日志和活动，及时发现可疑行为。
        * **速率限制和检测：** 对 API 调用实施速率限制和过滤器，使用 DLP 系统检测异常提取活动。

    * **纠正措施：**
        * **对抗稳定性：** 训练 LLM 抵抗对抗攻击，帮助检测和转移提取查询。
        * **水印：** 在模型输出中嵌入难以察觉的标记，追踪未经授权的使用。
        * **物理安全措施：** 加强托管 LLM 基础设施的物理安全，防止直接硬件和存储设备访问。

* 需要根据新出现的威胁和技术进步不断发展这些策略。

**知识检查**

* **问题 1：在保护大型语言模型（LLM）免遭盗窃的背景下实施基于角色的访问控制（RBAC）的主要目标是什么？**
    * **您的答案：根据用户角色限制对 LLM 存储库和环境的访问权限（正确）**

* **问题 2：以下哪些场景体现了潜在的 LLM 模型盗窃方法？**
    * **您的答案：利用公司基础设施中的漏洞访问 LLM 存储库（正确）**

**后续学习：**

* 10. 过度依赖
* LLM 安全：了解 OWASP Top 10 及其他评估
