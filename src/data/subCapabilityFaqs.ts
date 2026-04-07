export type SubCapabilityFaqItem = { question: string; answer: string };

export const SUBCAPABILITY_FAQS: Record<string, SubCapabilityFaqItem[]> = {
  "executive-cyber-advisory": [
    {
      "question": "How do you help boards understand and manage cyber risk?",
      "answer": "We translate complex technical threats into clear business impacts, helping leadership understand board cyber risk. This enables informed decision-making that protects the organization's assets and reputation."
    },
    {
      "question": "How can cybersecurity support our strategic growth?",
      "answer": "By integrating security early into business planning, we ensure that new initiatives, mergers, and digital transformations are secure by design, turning security into an enabler of strategic growth rather than a roadblock."
    },
    {
      "question": "What is governance accountability in cybersecurity?",
      "answer": "Governance accountability establishes clear roles, responsibilities, and oversight mechanisms across the organization. We help define these structures so that security policies are effectively enforced from the top down."
    },
    {
      "question": "How do we define our organization's cyber risk appetite?",
      "answer": "We work with your executive team to evaluate your industry landscape, regulatory requirements, and business goals to define a risk appetite that balances necessary operational flexibility with robust security."
    },
    {
      "question": "Why is CISO alignment with the board so important?",
      "answer": "Strong CISO alignment ensures that security budgets and initiatives directly support overall business objectives. We help bridge the communication gap between technical security leaders and the board of directors."
    }
  ],
  "security-zero-trust-architecture-review": [
    {
      "question": "What are the core principles of a Zero Trust architecture?",
      "answer": "Zero Trust operates on the principle of \"never trust, always verify.\" It eliminates implicit trust, requiring continuous authentication and strict access controls for every user and device, regardless of their location."
    },
    {
      "question": "How does network segmentation improve our security posture?",
      "answer": "Network segmentation divides your broader network into smaller, isolated zones. If a breach occurs, this limits lateral movement, preventing attackers from accessing sensitive systems across the environment."
    },
    {
      "question": "What role does identity management play in Zero Trust?",
      "answer": "Identity management is the foundation of Zero Trust. It ensures that only authenticated and authorized users can access specific resources, significantly reducing the risk of compromised credentials leading to data breaches."
    },
    {
      "question": "How is micro-segmentation different from traditional segmentation?",
      "answer": "While traditional segmentation isolates network zones, micro-segmentation applies security policies down to the individual workload or application level, offering granular control and defense against sophisticated internal threats."
    },
    {
      "question": "Why should we implement JIT (Just-In-Time) controls for privileged access?",
      "answer": "JIT controls grant elevated privileges only when needed and for a limited duration. This minimizes the window of opportunity for attackers to exploit privileged access accounts."
    }
  ],
  "virtual-ciso-vciso-services": [
    {
      "question": "What exactly are vCISO services?",
      "answer": "A Virtual CISO (vCISO) provides executive-level cybersecurity leadership on a flexible, fractional basis. It gives you access to top-tier security expertise to guide strategy without the cost of a full-time executive."
    },
    {
      "question": "How can a vCISO improve our security program maturity?",
      "answer": "A vCISO assesses your current state, identifies gaps, and creates a prioritized roadmap. They drive the implementation of frameworks and controls that systematically elevate your security program maturity over time."
    },
    {
      "question": "How does a vCISO help with security budget allocation?",
      "answer": "We analyze your specific risk profile and business goals to optimize budget allocation. This ensures you are investing in the most effective controls and technologies, maximizing your return on security investment."
    },
    {
      "question": "Can a vCISO assist with managing compliance obligations?",
      "answer": "Yes, a vCISO navigates complex regulatory landscapes, ensuring your organization meets all relevant compliance obligations, from data privacy laws to industry-specific security standards."
    },
    {
      "question": "How does a vCISO ensure our IR (Incident Response) readiness?",
      "answer": "Our vCISO services include developing, testing, and refining your incident response plans. We conduct tabletop exercises to guarantee your team has the IR readiness required to handle a real-world breach."
    }
  ],
  "security-program-development": [
    {
      "question": "What is included in developing comprehensive security policies?",
      "answer": "We draft customized, actionable security policies covering acceptable use, data protection, and access control. These policies form the governing rules that dictate your organization's security posture."
    },
    {
      "question": "Why are standardized security procedures necessary?",
      "answer": "While policies set the rules, procedures define the exact steps to follow. Standardized procedures ensure consistent, repeatable actions for tasks like user onboarding, system patching, and alert triage."
    },
    {
      "question": "How do you determine the right security team structure?",
      "answer": "We evaluate your business size, risk profile, and existing capabilities to design an optimal security team structure. This includes defining roles for analysts, engineers, and leadership to ensure comprehensive coverage."
    },
    {
      "question": "How do you assess technology stack coverage?",
      "answer": "We review your existing security tools against your risk landscape to identify redundancies or blind spots. We ensure your technology stack coverage effectively protects endpoints, networks, and cloud environments."
    },
    {
      "question": "Does security program development cover compliance obligations?",
      "answer": "Absolutely. We build your security program to inherently align with your specific compliance obligations, embedding regulatory requirements directly into your daily operations and policies."
    }
  ],
  "third-party-supply-chain-risk-management": [
    {
      "question": "Why is vendor risk management so critical today?",
      "answer": "Attackers frequently target less-secure vendors to breach their primary targets. Effective vendor risk management identifies and mitigates vulnerabilities within your supply chain before they impact your business."
    },
    {
      "question": "How do you manage security questionnaires for third parties?",
      "answer": "We automate and streamline the distribution, review, and scoring of security questionnaires, ensuring that all vendors meet your baseline security requirements before establishing a partnership."
    },
    {
      "question": "What is continuous monitoring in supply chain risk?",
      "answer": "Static assessments quickly become outdated. Continuous monitoring actively tracks your vendors' security postures, alerting you to new vulnerabilities, breaches, or dark web mentions associated with your partners."
    },
    {
      "question": "How do SLA reviews improve third-party security?",
      "answer": "We conduct rigorous SLA reviews to ensure that vendor contracts mandate strict security standards, incident notification timelines, and regular audit rights, holding third parties accountable for their security posture."
    },
    {
      "question": "What is N-th party risk and how is it addressed?",
      "answer": "N-th party risk involves the subcontractors and vendors used by your direct vendors. We map these extended supply chains to identify deep-tier vulnerabilities that could indirectly compromise your data."
    }
  ],
  "regulatory-gap-assessment": [
    {
      "question": "What is a regulatory gap assessment?",
      "answer": "A gap assessment compares your current security controls against the specific requirements of a target regulation or framework, clearly identifying areas where you fall short of compliance."
    },
    {
      "question": "How do you identify control gaps?",
      "answer": "We conduct deep-dive audits of your infrastructure, policies, and procedures, mapping them line-by-line against regulatory mandates to identify any missing or ineffective security controls."
    },
    {
      "question": "What happens after you identify gaps? Do you provide remediation?",
      "answer": "Yes, identifying gaps is only the first step. We provide a prioritized remediation roadmap, offering strategic and technical guidance to fix vulnerabilities and achieve full compliance."
    },
    {
      "question": "How do you handle previous audit findings?",
      "answer": "We review past audit findings to ensure that all historical non-compliance issues have been properly addressed, verified, and closed out to prevent recurring penalties."
    },
    {
      "question": "Why is policy completeness and technical evidence important?",
      "answer": "Auditors require proof. We ensure policy completeness so your rules align with regulations, and we help you gather the technical evidence (logs, configurations, reports) required to prove those policies are active."
    }
  ],
  "risk-compliance-monitoring": [
    {
      "question": "How do you measure control effectiveness?",
      "answer": "We continuously test your security systems against simulated threats and review operational data to ensure your controls are functioning as intended and providing the expected level of risk reduction."
    },
    {
      "question": "What is configuration drift and why is it dangerous?",
      "answer": "Configuration drift occurs when systems are manually changed over time, deviating from their secure baseline. This often opens unexpected vulnerabilities. We monitor for drift and enforce standard secure configurations."
    },
    {
      "question": "How do you track policy exceptions safely?",
      "answer": "When a business need requires deviating from standard security policy, we implement a formal process to document, time-limit, and monitor these policy exceptions to prevent them from becoming permanent security holes."
    },
    {
      "question": "How do you help us keep up with regulatory changes?",
      "answer": "We continuously track updates to global and regional cybersecurity laws. When regulatory changes occur, we proactively alert you and adjust your compliance programs to meet the new standards."
    },
    {
      "question": "Why do we need to maintain a dynamic risk register?",
      "answer": "A static risk register is quickly outdated. We maintain a dynamic risk register that is continuously updated with new threats, vulnerability findings, and mitigation progress, providing a real-time view of your risk posture."
    }
  ],
  "rbi-cyber-security-framework-compliance": [
    {
      "question": "What is the RBI CSF and who needs to comply?",
      "answer": "The Reserve Bank of India (RBI) Cyber Security Framework (CSF) mandates stringent cybersecurity controls for banks, NBFCs, and financial institutions operating in India to protect the financial ecosystem."
    },
    {
      "question": "How do you structure IT governance for RBI compliance?",
      "answer": "We help establish robust IT governance structures that mandate board-level oversight, define clear organizational responsibilities, and ensure technology strategies align with RBI mandates."
    },
    {
      "question": "What are the RBI's rules for cyber incident reporting?",
      "answer": "The RBI requires immediate reporting of specific cyber incidents within tight timeframes. We help you establish automated detection and rapid reporting workflows to ensure strict adherence to these timelines."
    },
    {
      "question": "How do you ensure business continuity under the RBI framework?",
      "answer": "We design and test comprehensive business continuity and disaster recovery plans, ensuring that your financial services remain operational or can recover rapidly in the event of a severe cyber disruption."
    },
    {
      "question": "Why does the RBI mandate a strong SOC capability?",
      "answer": "Continuous monitoring is a core RBI requirement. We assist in building, optimizing, or managing your SOC capability to ensure 24x7 threat detection, proactive hunting, and rapid incident response."
    }
  ],
  "dpdp-act-compliance": [
    {
      "question": "What is the DPDP Act and who must comply?",
      "answer": "The Digital Personal Data Protection (DPDP) Act is India's comprehensive privacy law. Any organization processing the digital personal data of Indian citizens must comply to avoid significant financial penalties."
    },
    {
      "question": "What are the responsibilities of a Data Fiduciary?",
      "answer": "As a data fiduciary, you determine the purpose and means of processing personal data. We help you implement the necessary safeguards to protect this data and ensure lawful processing under the DPDP Act."
    },
    {
      "question": "How do we implement compliant consent management?",
      "answer": "We design consent management systems that ensure user consent is free, specific, informed, and unconditional, while also providing users with an easy mechanism to withdraw their consent at any time."
    },
    {
      "question": "How do we facilitate Data Principal rights?",
      "answer": "The DPDP Act grants users (Data Principals) the right to access, correct, and erase their data. We help you build the technical workflows required to process these requests quickly and securely."
    },
    {
      "question": "What are the rules for cross-border transfers under DPDP?",
      "answer": "The act governs how personal data can be transferred outside India. We review your data flows, assess the legal jurisdictions involved, and implement safeguards to ensure compliant cross-border transfers."
    }
  ],
  "soc2-readiness": [
    {
      "question": "What is SOC2 and why do our clients demand it?",
      "answer": "SOC2 is a widely recognized auditing standard that proves your organization securely manages client data. Clients demand it as proof that you have strong, verifiable security practices in place."
    },
    {
      "question": "What are the SOC2 Trust Service Criteria?",
      "answer": "The Trust Service Criteria are the pillars of SOC2: Security, Availability, Confidentiality, Privacy, and Processing Integrity. We help you select and meet the criteria most relevant to your business operations."
    },
    {
      "question": "How do you assess the Security and Availability criteria?",
      "answer": "We evaluate your access controls, firewalls, and intrusion detection for Security. For Availability, we assess your disaster recovery plans, performance monitoring, and network redundancy capabilities."
    },
    {
      "question": "What is required to meet the Confidentiality and Privacy criteria?",
      "answer": "Confidentiality focuses on protecting sensitive business data (like IP), while Privacy focuses on personal information (PII). We implement encryption, access restrictions, and privacy policies to meet these standards."
    },
    {
      "question": "How do we prove Processing Integrity for SOC2?",
      "answer": "We help you implement controls that ensure your systems process data accurately, completely, and in a timely manner, guaranteeing that outputs match the intended inputs without unauthorized manipulation."
    }
  ],
  "web-application-security-testing": [
    {
      "question": "How do you use the OWASP Top 10 in your testing?",
      "answer": "We use the OWASP Top 10 as a foundational framework to hunt for the most critical web application vulnerabilities, ensuring that standard attacks like injection and broken access control are mitigated."
    },
    {
      "question": "Why do you specifically test authentication and session management?",
      "answer": "Flaws here allow attackers to hijack user accounts. We rigorously test password policies, token generation, cookie security, and timeout mechanisms to ensure secure authentication and session management."
    },
    {
      "question": "What are business logic vulnerabilities?",
      "answer": "Business logic flaws exploit the legitimate workflow of an application to achieve a malicious outcome, like manipulating prices in a cart. Automated scanners miss these; they require our manual expert analysis."
    },
    {
      "question": "How do you test for SQL Injection and XSS?",
      "answer": "We attempt to inject malicious code into your application inputs. If successful, SQL injection allows access to your database, while Cross-Site Scripting (XSS) allows attackers to execute scripts in your users' browsers."
    },
    {
      "question": "Why is testing access control so important?",
      "answer": "Broken access control is a leading vulnerability. We verify that users cannot bypass permissions to view sensitive data, escalate their privileges, or modify data belonging to other accounts."
    }
  ],
  "mobile-application-security-testing": [
    {
      "question": "How does the OWASP Mobile Top 10 differ from the Web Top 10?",
      "answer": "The OWASP Mobile Top 10 focuses on threats unique to mobile devices, such as insecure data storage on the device, improper platform usage, and vulnerabilities within the app's compiled binary."
    },
    {
      "question": "Do you test both iOS and Android applications?",
      "answer": "Yes, we provide comprehensive security testing for both iOS and Android platforms, utilizing platform-specific tools and methodologies to uncover vulnerabilities unique to each operating system."
    },
    {
      "question": "What is the risk of insecure storage on a mobile device?",
      "answer": "If an app saves passwords, tokens, or personal data locally without proper encryption, an attacker who gains physical access to the device or uses malware can easily steal that sensitive information."
    },
    {
      "question": "Why do you perform reverse engineering on mobile apps?",
      "answer": "Attackers download apps and reverse engineer the code to find hardcoded secrets, hidden API endpoints, and logic flaws. We emulate this process to secure your code before it reaches the app store."
    },
    {
      "question": "What is certificate pinning and why test for it?",
      "answer": "Certificate pinning prevents Man-in-the-Middle (MitM) attacks by ensuring the app only communicates with a specific, known server certificate. We test to ensure this is implemented securely and cannot be bypassed."
    }
  ],
  "api-security-testing": [
    {
      "question": "Why do APIs require specialized security testing?",
      "answer": "APIs expose deep backend logic and data directly to the web. Standard web scanners often miss API logic flaws. We use the OWASP API Top 10 to target these specific vulnerabilities."
    },
    {
      "question": "What is BOLA (Broken Object Level Authorization)?",
      "answer": "Also known as IDOR, BOLA occurs when an API allows a user to access or manipulate objects (like accounts or files) belonging to another user simply by changing an ID parameter in the request."
    },
    {
      "question": "How do you detect excessive data exposure in APIs?",
      "answer": "Often, APIs send back all database fields to the client, relying on the front-end to filter what the user sees. We test to ensure APIs only return the exact data necessary, preventing sensitive data leakage."
    },
    {
      "question": "Do you test modern protocols like GraphQL and gRPC?",
      "answer": "Yes. Unlike REST APIs, GraphQL and gRPC have unique structures and attack vectors, such as complex nested queries that can cause Denial of Service. We have specialized methodologies for these protocols."
    },
    {
      "question": "Why is testing API rate limiting critical?",
      "answer": "Without proper rate limiting, an API is vulnerable to brute-force attacks, credential stuffing, and Denial of Service (DoS) attacks. We test to ensure your APIs appropriately throttle excessive requests."
    }
  ],
  "red-team": [
    {
      "question": "What is the difference between a Red Team engagement and a Pentest?",
      "answer": "A pentest finds as many vulnerabilities as possible. A Red Team engagement is a stealthy, goal-oriented adversary simulation designed to test your organization's detection and response capabilities against a real-world attack."
    },
    {
      "question": "How do you incorporate social engineering into Red Teaming?",
      "answer": "Real attackers target people. We use advanced phishing, vishing (voice phishing), and pretexting to attempt to gain initial access to your network, testing your human-layer defenses and security awareness."
    },
    {
      "question": "What does lateral movement entail during an assessment?",
      "answer": "Once we breach the perimeter, we use lateral movement techniques to pivot from the initial compromised workstation to servers, domain controllers, and databases, mapping out how an attacker escalates privileges."
    },
    {
      "question": "What do you mean by \"crown jewel access\"?",
      "answer": "Crown jewels are your most critical assets-such as customer databases, source code, or financial systems. The ultimate goal of our Red Team is to prove whether an attacker can gain crown jewel access undetected."
    },
    {
      "question": "Do Red Team assessments include physical security testing?",
      "answer": "Yes, if scoped. We can test physical security by attempting to clone badges, tailgate employees, or bypass physical locks to gain access to your server rooms and internal network jacks."
    }
  ],
  "adversary-simulation": [
    {
      "question": "What is an Adversary Simulation?",
      "answer": "Adversary simulation is a highly targeted exercise where we emulate the specific tools, techniques, and procedures of known threat groups that target your specific industry or region."
    },
    {
      "question": "How do you use the MITRE ATT&CK framework?",
      "answer": "We map all our simulation activities to the MITRE ATT&CK matrix. This provides a standardized language to show exactly which tactics were successful and where your defensive gaps exist."
    },
    {
      "question": "What is TTP emulation?",
      "answer": "TTP stands for Tactics, Techniques, and Procedures. Rather than just using malware, we emulate the exact behavioral TTPs of advanced persistent threats (APTs) to test if your defenses can spot sophisticated hacker tradecraft."
    },
    {
      "question": "How does this test our detection coverage and SIEM rules?",
      "answer": "We intentionally trigger specific attacks and then work with your SOC team to review your SIEM rules. We identify which attacks generated alerts, which were missed, and how to improve your detection coverage."
    },
    {
      "question": "Can adversary simulation improve our Threat Hunting capabilities?",
      "answer": "Yes. By injecting known, safe adversary behavior into your network, your threat hunting teams can practice finding advanced, stealthy actors in a controlled, realistic environment."
    }
  ],
  "secure-code-review": [
    {
      "question": "What is a Secure Code Review and why is it necessary?",
      "answer": "Secure code review involves a manual and automated examination of your application's source code to identify security flaws before they are compiled and deployed into production."
    },
    {
      "question": "How does SAST integrate into your code reviews?",
      "answer": "We utilize Static Application Security Testing (SAST) tools to rapidly scan large codebases for known vulnerable patterns, and then use manual expert review to eliminate false positives and find complex logic flaws."
    },
    {
      "question": "How do you review authentication logic and input validation?",
      "answer": "We trace how user data flows through your code. We ensure that input validation is strictly enforced to prevent injection attacks, and that authentication logic cannot be bypassed through code manipulation."
    },
    {
      "question": "What do you look for regarding cryptography and secrets handling?",
      "answer": "We search the codebase for weak encryption algorithms, hardcoded passwords, and exposed API keys. Proper secrets handling ensures credentials are securely stored in vaults, not in plain text code."
    },
    {
      "question": "Why is dependency review a part of secure coding?",
      "answer": "Modern apps rely heavily on third-party open-source libraries. We perform dependency reviews to identify and help you update libraries that contain known CVEs or malicious code."
    }
  ],
  "ai-agentic-system-security-testing": [
    {
      "question": "Why do AI systems require specialized security testing?",
      "answer": "Large Language Models (LLMs) and AI agents introduce entirely new attack surfaces that traditional firewalls cannot protect against. We secure the models, the data pipelines, and the application integration."
    },
    {
      "question": "What is Prompt Injection and how do you test for it?",
      "answer": "Prompt injection occurs when an attacker inputs malicious instructions to manipulate an LLM into ignoring its safety guardrails or leaking data. We rigorously test your models to prevent these jailbreaks."
    },
    {
      "question": "How do you secure a RAG (Retrieval-Augmented Generation) pipeline?",
      "answer": "RAG connects LLMs to your private data. We test access controls and document parsing within the RAG pipeline to ensure the AI cannot be tricked into revealing sensitive corporate data to unauthorized users."
    },
    {
      "question": "What is data poisoning in AI?",
      "answer": "Data poisoning is an attack where malicious data is introduced into the AI's training or fine-tuning set, causing the model to behave erratically or output specific, attacker-controlled biases."
    },
    {
      "question": "How do you evaluate AI agent trust and prevent model inversion?",
      "answer": "We assess the autonomy limits of AI agents to ensure they cannot execute unauthorized actions (like deleting databases). We also test for model inversion, preventing attackers from extracting training data from the model."
    }
  ],
  "cloud-security-assessments": [
    {
      "question": "What does a Cloud Security Assessment cover?",
      "answer": "We evaluate your entire cloud environment, focusing on overall cloud posture, identity management, network configurations, and data protection to ensure you are resilient against cloud-native threats."
    },
    {
      "question": "Why is IAM (Identity and Access Management) central to cloud security?",
      "answer": "In the cloud, identity is the new perimeter. We deeply audit your IAM policies to identify over-privileged users and roles, enforcing the principle of least privilege across your infrastructure."
    },
    {
      "question": "How do you assess cloud network architecture?",
      "answer": "We review your Virtual Private Clouds (VPCs), security groups, and routing tables to ensure that databases and internal services are properly isolated from the public internet."
    },
    {
      "question": "What do you check regarding encryption, logging, and monitoring?",
      "answer": "We verify that data is encrypted both at rest and in transit. We also audit your logging and monitoring setups to ensure that all administrative actions and security events are tracked for forensic analysis."
    },
    {
      "question": "How do you evaluate secrets management in the cloud?",
      "answer": "We ensure that API keys, database credentials, and certificates are not hardcoded but are securely stored and rotated using native cloud vaults (like AWS Secrets Manager or Azure Key Vault)."
    }
  ],
  "aws-azure-gcp-security-assessment": [
    {
      "question": "Do you provide platform-specific cloud assessments?",
      "answer": "Yes, our experts specialize in the unique configurations, services, and security tools native to AWS, Microsoft Azure, and Google Cloud Platform (GCP)."
    },
    {
      "question": "What are common vulnerabilities you look for in AWS IAM and S3?",
      "answer": "We hunt for overly permissive AWS IAM policies that allow privilege escalation, and we scan S3 buckets to ensure they are not publicly accessible and are configured with proper encryption and logging."
    },
    {
      "question": "How do you secure Azure Entra ID and Key Vaults?",
      "answer": "We audit Azure Entra ID (formerly Azure AD) for weak conditional access policies and MFA gaps. We also verify that Key Vaults are locked down with strict network rules and RBAC permissions."
    },
    {
      "question": "What unique risks do you evaluate in GCP?",
      "answer": "In GCP, we focus heavily on securing IAM service accounts, enforcing organization policies, and reviewing VPC Service Controls to prevent data exfiltration."
    },
    {
      "question": "How do you assess cross-account trust and serverless architectures?",
      "answer": "We map cross-account trust relationships to prevent an attacker from pivoting between environments. For serverless (Lambda/Functions), we review execution roles and code vulnerabilities to prevent unauthorized access."
    }
  ],
  "kubernetes-container-security": [
    {
      "question": "Why is Kubernetes security so challenging?",
      "answer": "Kubernetes is highly complex, dynamic, and distributed. Misconfigurations can easily expose the cluster to compromise. We provide specialized Kubernetes hardening to secure the orchestrator and the workloads."
    },
    {
      "question": "How do you review Kubernetes RBAC?",
      "answer": "Role-Based Access Control (RBAC) dictates who and what can interact with the cluster. We audit roles and bindings to ensure users and service accounts cannot escalate privileges or take over the cluster."
    },
    {
      "question": "What are Pod Security policies and Admission Controllers?",
      "answer": "Pod security defines what containers are allowed to do (e.g., preventing them from running as root). We configure Admission Controllers to automatically reject any container deployments that violate your security baselines."
    },
    {
      "question": "How do you handle vulnerabilities in container images?",
      "answer": "We implement scanning within your CI/CD pipeline to analyze container images for known vulnerabilities and hardcoded secrets before they are ever deployed into your Kubernetes clusters."
    },
    {
      "question": "Why is securing Etcd and the API server critical?",
      "answer": "Etcd stores the entire state and secrets of the cluster, while the API server is the brain. We ensure the API server is not exposed to the internet and that Etcd is encrypted and heavily access-restricted."
    }
  ],
  "cloud-security-posture-management-cspm": [
    {
      "question": "What is a CSPM tool and why do we need it?",
      "answer": "Cloud Security Posture Management (CSPM) tools continuously monitor your cloud environment. We use them to automatically detect misconfigurations and ensure your architecture complies with security best practices."
    },
    {
      "question": "How does CSPM identify cloud misconfigurations?",
      "answer": "CSPM continuously scans your resources against hundreds of managed rules (like CIS Benchmarks), instantly flagging dangerous setups like public databases or missing encryption."
    },
    {
      "question": "How does CSPM help manage our attack surface?",
      "answer": "The cloud is dynamic; resources are spun up and down daily. CSPM maps your entire cloud footprint, ensuring you have total visibility into your attack surface and any exposed assets."
    },
    {
      "question": "Can CSPM detect over-privileged accounts?",
      "answer": "Yes, modern CSPM solutions include CIEM (Cloud Infrastructure Entitlement Management) capabilities to analyze permissions and identify users or machine identities that are over-privileged."
    },
    {
      "question": "How does CSPM prevent compliance drift and exposure?",
      "answer": "We configure CSPM to continuously map your environment against frameworks like SOC2 or HIPAA. If an engineer makes a change that violates a rule, the CSPM alerts on the compliance drift immediately."
    }
  ],
  "on-premises-hybrid-infrastructure-hardening": [
    {
      "question": "Do you still secure traditional on-premises infrastructure?",
      "answer": "Absolutely. While cloud is growing, hybrid environments are the norm. We provide deep technical hardening for traditional data centers, physical servers, and legacy infrastructure."
    },
    {
      "question": "How do you use CIS Benchmarks for hardening?",
      "answer": "We use Center for Internet Security (CIS) benchmarks as the gold standard. We apply these rigorously tested configurations to harden operating systems, databases, and network devices against attacks."
    },
    {
      "question": "What is involved in Active Directory security?",
      "answer": "Active Directory is the most common target for ransomware gangs. We hunt for misconfigurations like weak Kerberos policies, excessive domain admin privileges, and vulnerable attack paths (e.g., BloodHound analysis)."
    },
    {
      "question": "How do you assess patch management and endpoint protection?",
      "answer": "We review your patching cadence to ensure critical vulnerabilities are addressed promptly. We also verify that your endpoint protection (EDR/AV) is properly deployed, configured, and actively blocking threats."
    },
    {
      "question": "Why is network segmentation and firewall review important on-prem?",
      "answer": "We analyze your firewall rulebases to remove overly permissive or stale rules. We ensure robust network segmentation is in place to prevent lateral movement if an internal segment is compromised."
    }
  ],
  "cloud-compliance-review": [
    {
      "question": "What is a Cloud Compliance Review?",
      "answer": "A cloud compliance review ensures that your usage of AWS, Azure, or GCP adheres strictly to industry regulations and legal requirements, translating legal text into technical cloud configurations."
    },
    {
      "question": "How do you address data residency and sovereignty in the cloud?",
      "answer": "Regulations often dictate where data must geographically reside. We audit your cloud deployments to ensure data is physically stored and processed in compliance with local data residency and sovereignty laws."
    },
    {
      "question": "Why are audit trails important for cloud compliance?",
      "answer": "Auditors require proof of who did what and when. We ensure that immutable audit trails (like AWS CloudTrail or Azure Activity Logs) are enabled, centralized, and protected from tampering."
    },
    {
      "question": "How do you navigate the Shared Responsibility Model?",
      "answer": "Cloud providers secure the infrastructure, but you are responsible for securing the data and configurations in the cloud. We clarify this shared responsibility model and ensure you are fulfilling your obligations."
    },
    {
      "question": "What are the compliance requirements for backup & recovery in the cloud?",
      "answer": "We review your cloud backup strategies to ensure data is retained for legally mandated periods, securely encrypted, geographically redundant, and that your recovery processes are regularly tested."
    }
  ],
  "managed-soc": [
    {
      "question": "What is a Managed SOC?",
      "answer": "A Managed Security Operations Center (SOC) provides you with a 24x7 team of security analysts, engineers, and advanced technology to monitor your network, detect threats, and respond to incidents around the clock."
    },
    {
      "question": "How do you use SIEM for log ingestion?",
      "answer": "We deploy and tune a Security Information and Event Management (SIEM) platform to ingest logs from all your firewalls, endpoints, cloud services, and applications, centralizing data for correlation and analysis."
    },
    {
      "question": "How does a Managed SOC improve MTTD and MTTR?",
      "answer": "With 24x7 eyes on glass and automated response playbooks, we drastically reduce your Mean Time To Detect (MTTD) a threat and your Mean Time To Respond (MTTR), stopping attacks before they spread."
    },
    {
      "question": "Who writes the detection rules for the SOC?",
      "answer": "Our specialized detection engineering team writes custom detection rules tailored specifically to your environment and industry threats, ensuring high-fidelity alerts and reducing false positives."
    },
    {
      "question": "What is the process for alert triage and escalation?",
      "answer": "Our Tier 1 and 2 analysts perform rapid alert triage to filter out noise. When a genuine threat is confirmed, we immediately trigger an escalation process, notifying your team and initiating containment actions."
    }
  ],
  "incident-response": [
    {
      "question": "What happens when we declare an incident?",
      "answer": "Our Incident Response (IR) team activates immediately, guiding you through a structured process of containment, eradication, and recovery to minimize business disruption and data loss."
    },
    {
      "question": "How do you achieve containment and eradication?",
      "answer": "We swiftly isolate compromised systems from the network (containment) to stop the spread of ransomware or attackers. We then actively remove the malware, backdoors, and threat actors (eradication)."
    },
    {
      "question": "What role does forensics play in Incident Response?",
      "answer": "We perform deep digital forensics on memory, disks, and network logs to understand exactly how the attacker got in, what they accessed, and what data may have been exfiltrated."
    },
    {
      "question": "How do you use IOCs and track lateral movement?",
      "answer": "We extract Indicators of Compromise (IOCs) like malicious IP addresses or file hashes to sweep your entire environment, ensuring we identify all instances of the attacker's lateral movement."
    },
    {
      "question": "Why is a root cause analysis important post-incident?",
      "answer": "We don't just put out the fire; we provide a detailed root cause analysis that identifies the initial vulnerability. We provide strategic recommendations so you can fix the flaw and prevent the attack from happening again."
    }
  ],
  "threat-hunting": [
    {
      "question": "How is Threat Hunting different from a SOC?",
      "answer": "A SOC reacts to alerts generated by security tools. Threat Hunting is proactive; our analysts assume a breach has occurred and actively search through your network data to find stealthy attackers that evaded your defenses."
    },
    {
      "question": "What are behavioral anomalies in threat hunting?",
      "answer": "Instead of looking for known malware signatures, we hunt for behavioral anomalies-such as an HR employee suddenly running PowerShell scripts at 3 AM-which indicates a compromised account."
    },
    {
      "question": "How do you detect C2 (Command and Control) traffic?",
      "answer": "Advanced malware communicates with external attacker servers via C2 channels. We analyze network flow data and DNS requests to spot beaconing patterns and hidden C2 detection."
    },
    {
      "question": "What is persistence, and how do you find it?",
      "answer": "Attackers want to survive reboots. They establish persistence via registry keys, scheduled tasks, or hidden services. We specifically hunt for these hidden mechanisms to ensure an attacker is fully evicted."
    },
    {
      "question": "Can you detect data staging and exfiltration?",
      "answer": "Yes. Before stealing data, attackers often compress and hide it on a server (data staging). We hunt for these large hidden archives and monitor network boundaries to stop the final data exfiltration."
    }
  ],
  "user-awareness-social-engineering-simulations": [
    {
      "question": "Why are social engineering simulations necessary?",
      "answer": "Employees are often the easiest way into a network. Social engineering simulations test human vulnerability, helping employees recognize and report attacks before they click a malicious link."
    },
    {
      "question": "How do you conduct a phishing simulation?",
      "answer": "We craft realistic, safe phishing emails tailored to your industry. We track metrics like open rates, click rates, and credential submission to identify high-risk user groups that need targeted training."
    },
    {
      "question": "What is vishing and pretexting?",
      "answer": "Vishing is voice phishing over the phone, while pretexting involves creating a fabricated scenario (like pretending to be IT support). We simulate these attacks to test employees' adherence to verification protocols."
    },
    {
      "question": "What makes your security awareness training effective?",
      "answer": "We replace boring annual slideshows with engaging, bite-sized, and continuous security awareness training modules that keep security top-of-mind and build a genuine culture of security."
    },
    {
      "question": "How do these services build human-layer resilience?",
      "answer": "By continuously testing and training, we transform your employees from a liability into a defensive asset, building human-layer resilience that catches the sophisticated attacks technical filters miss."
    }
  ],
  "cyber-threat-intelligence-cti-service": [
    {
      "question": "What is Cyber Threat Intelligence (CTI)?",
      "answer": "CTI is the continuous collection and analysis of information about current and potential cyber threats. We turn raw data into actionable intelligence so you can defend against attacks before they hit."
    },
    {
      "question": "How do you track threat actors?",
      "answer": "We profile advanced persistent threat (APT) groups and ransomware cartels, tracking their motivations, infrastructure, and targets so you know exactly which threat actors pose a risk to your business."
    },
    {
      "question": "How do we use the IOCs and exploit trends you provide?",
      "answer": "We deliver fresh Indicators of Compromise (IOCs) and data on current exploit trends directly to your security teams, allowing you to proactively block malicious IPs and patch vulnerabilities actively being used in the wild."
    },
    {
      "question": "What is industry threat intelligence?",
      "answer": "We don't just provide generic data; we curate intelligence specifically focused on the malware campaigns and attack strategies currently targeting your specific sector (e.g., healthcare, finance, retail)."
    },
    {
      "question": "Does CTI include supply chain intelligence?",
      "answer": "Yes. We monitor the threat landscape for breaches or vulnerabilities affecting major software vendors and service providers, giving you early warning supply chain intelligence to protect your network."
    }
  ],
  "dark-web-brand-intelligence": [
    {
      "question": "What does dark web monitoring entail?",
      "answer": "We deploy specialized tools and analysts to monitor underground forums, marketplaces, and illicit chat rooms to identify if your corporate data is being discussed or sold."
    },
    {
      "question": "How do you handle leaked credentials?",
      "answer": "When third-party websites are breached, your employees' passwords often end up on the dark web. We alert you to leaked credentials immediately so you can force password resets before attackers use them to access your systems."
    },
    {
      "question": "What is brand impersonation?",
      "answer": "Attackers create fake social media profiles, rogue mobile apps, or phishing sites that look exactly like your brand to steal from your customers. We actively hunt down and help takedown these brand impersonation attempts."
    },
    {
      "question": "How does typosquatting harm our brand?",
      "answer": "Typosquatting involves registering domain names very similar to yours (e.g., example.com vs. https://www.google.com/search?q=examp1e.com) to host malware or steal credentials. We monitor for these registrations and assist in neutralizing them."
    },
    {
      "question": "Why do you monitor paste sites?",
      "answer": "Hackers frequently dump stolen source code, database fragments, or configuration files onto anonymous paste sites (like Pastebin). We constantly scan these sites to detect accidental or malicious data leaks."
    }
  ],
  "attack-surface-intelligence": [
    {
      "question": "What is an external attack surface?",
      "answer": "Your external attack surface consists of every internet-facing asset connected to your organization-including websites, servers, IP addresses, and cloud buckets. We map this from the perspective of an attacker."
    },
    {
      "question": "How do you identify Shadow IT?",
      "answer": "Shadow IT refers to systems spun up by employees without IT approval. Through continuous external scanning, we discover these forgotten, unmanaged, and vulnerable assets before attackers do."
    },
    {
      "question": "Why are open ports and exposed assets dangerous?",
      "answer": "Unnecessary open ports (like RDP or database ports) are an open invitation to ransomware gangs. We identify these exposed assets and provide actionable steps to close off these direct attack vectors."
    },
    {
      "question": "What is the risk of certificate takeover?",
      "answer": "If an SSL/TLS certificate expires or is misconfigured, attackers can hijack it to perform Man-in-the-Middle attacks. We monitor your certificates to prevent certificate takeover and maintain trust."
    },
    {
      "question": "How do you monitor subdomain risks?",
      "answer": "Organizations often point subdomains to third-party services. If that service is canceled but the DNS record remains, an attacker can claim it (subdomain takeover). We track your DNS to eliminate these subdomain risks."
    }
  ],
  "vulnerability-research-security-advisories": [
    {
      "question": "What is vulnerability research and security advisories?",
      "answer": "Our dedicated research team analyzes newly discovered vulnerabilities (CVEs), determines their real-world impact, and provides tailored advisories on how they specifically affect your technology stack."
    },
    {
      "question": "How do you prioritize CVE research?",
      "answer": "We filter through the noise of thousands of bugs to focus on actively exploited CVEs. We alert you immediately if a vulnerability is being used by attackers in the wild, prioritizing it for immediate remediation."
    },
    {
      "question": "Can you help improve our patch cadence?",
      "answer": "Yes. By providing clear, risk-ranked intelligence, we help your IT teams optimize their patch cadence, ensuring critical systems are updated first without overwhelming your operations team."
    },
    {
      "question": "What if a patch is not yet available?",
      "answer": "When a zero-day drops and no patch exists, we provide immediate guidance on compensating controls-such as firewall rules, configuration changes, or service disablements-to protect you in the interim."
    },
    {
      "question": "How are your vulnerability advisories customized?",
      "answer": "We don't send generic alerts. We map our threat intelligence to your specific asset inventory, sending vulnerability advisories only when a new threat directly impacts the software and hardware you actually use."
    }
  ]
};
