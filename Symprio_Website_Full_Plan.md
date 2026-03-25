# SYMPRIO — COMPLETE MULTI-PAGE WEBSITE PLAN
## Theme: Orbixa (orbixa.themeht.com/software/) | Colors: Blue & Teal | Brand: Symprio
## Document Version: 1.0 | Date: March 2026

---

## REAL CONTACT DETAILS (From Existing Site)
- **Phone/WhatsApp:** +60 13 880 2574
- **Email:** contact@symprio.com
- **Address:** Symprio Sdn Bhd, Tower B, 8-05, Kuala Lumpur, Malaysia
- **USA:** +1 (408) 555-0123 | usa@symprio.com | California
- **India:** +91 80 5555 0123 | india@symprio.com
- **Malaysia:** +60 3 5555 0123 | my@symprio.com
- **Singapore:** +65 6123 4567 | sg@symprio.com

---

## SITEMAP — ALL PAGES

```
symprio.com/
|
+-- Home (/)
+-- About Us (/about)
+-- Services Overview (/services)
|   +-- Robotic Process Automation (/services/rpa)
|   +-- AI Application Development (/services/ai-development)
|   +-- Agentic AI & LLM Solutions (/services/agentic-ai)
|   +-- Process Assessment & Consultancy (/services/process-assessment)
|   +-- Digital Transformation (/services/digital-transformation)
|   +-- ERP & Oracle (/services/erp-oracle)
|   +-- Custom Software Development (/services/custom-software)
|   +-- Digital Workforce (/services/digital-workforce)
+-- Training (/training)
|   +-- RPA Training (/training/rpa)
|   +-- AI & GenAI Training (/training/ai-genai)
|   +-- Corporate Workshops (/training/corporate-workshops)
+-- Case Studies (/case-studies)
|   +-- Individual Case Study Pages (/case-studies/[slug])
+-- Blog (/blog)
|   +-- Individual Blog Posts (/blog/[slug])
+-- Careers (/careers)
|   +-- Job Detail Page (/careers/[job-slug])
+-- Contact Us (/contact)
+-- Support Subscription (/support-subscription) [EXISTING DYNAMIC PAGE]
+-- Thank You (/thank-you)
+-- Privacy Policy (/privacy-policy)
```

**Total: 22+ pages**

---

## DYNAMIC ELEMENTS TO BUILD (Developer Notes)

### 1. Support Subscription Page — EXISTING, KEEP & REDESIGN
- **URL:** /support-subscription
- **Current Features (preserve all):**
  - Live form: Name, Company Name, Email, Contact Number (country code selector), Subscription Hours (min 50, +/- stepper)
  - Dynamic price calculator: Rate $50/hr x hours = total auto-calculated
  - Payment/subscribe button
- **Enhancements for new design:**
  - Redesign form UI to match Orbixa theme style
  - Keep dynamic hour stepper and price calculator
  - Add package tiers above form (Bronze 50hrs / Silver 100hrs / Gold 200hrs)
  - Country code dropdown: +60, +65, +91, +1, +44 (keep existing)
  - Current rate: $50/hour | Minimum: 50 hours

### 2. Blog — DYNAMIC (Medium Integration)
- **Current:** Links to https://symprioideas.medium.com/
- **New approach:** Embed or pull Medium RSS feed into /blog page OR maintain separate blog CMS
- **Developer note:** Use Medium RSS API (https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@symprioideas) to dynamically render posts
- Each post card: Thumbnail | Category | Title | Date | Excerpt | Read More →

### 3. Careers — DYNAMIC
- **URL:** /careers
- **Dynamic features needed:**
  - Job listings loaded from CMS/database (admin can add/remove roles)
  - Each job: Title | Department | Location | Type (Full-time/Contract/Remote) | Posted date
  - Job detail page with full description and Apply button
  - Application form: Name | Email | Phone | LinkedIn | Upload CV | Cover Letter
  - If no open roles: Show "No current openings" message with CV submission form
- **Departments:** Engineering | Consulting | Sales | Marketing | Operations

### 4. Training — DYNAMIC
- **URL:** /training and sub-pages
- **Dynamic features needed:**
  - Training enquiry form with email notification to admin
  - Training calendar / upcoming sessions (optional — can be static initially)
  - Enquiry form: Name | Email | Company | Country | No. of Participants | Training Type | Preferred Date | Delivery Mode (Online/On-site/Blended) | Message

### 5. Contact / Enquiry Form — EXISTING, ENHANCE
- **Current URL:** /enquiry → **Change to:** /contact
- **Current fields:** Full Name | Email | Phone | Company | Service | Message
- **Add new fields:**
  - Country (dropdown)
  - How did you hear about us? (dropdown)
- **Keep existing service dropdown options + add new services:**
  - Digital Transformation
  - Robotic Process Automation
  - ERP Practice (Oracle)
  - Chatbots & Conversational AI
  - AI & Agentic AI Solutions
  - Custom Development
  - Process Assessment & Consultancy
  - Training (RPA/AI/Workshops)
  - Digital Workforce / Staff Augmentation
  - Other

### 6. Case Studies — DYNAMIC
- **URL:** /case-studies
- **Dynamic features needed:**
  - Filter by industry and service type
  - CMS-managed case study entries
  - Each case study: Industry | Service | Client (anonymous or named) | Challenge | Solution | Results | Stats

### 7. Events / Webinars — DYNAMIC (Currently shows "No Events")
- **Keep on homepage** as a section
- **Dynamic features:**
  - Admin can add/remove events from CMS
  - Event card: Title | Date | Type (Webinar/Workshop/In-Person) | Location | Register button
  - If no events: Show "No upcoming events. Subscribe to be notified." + email subscribe form

### 8. Stats Counter — ANIMATED
- Numbers animate up when scrolled into view
- 45+ Clients | 400+ Robots | 15+ Countries | 50+ Consultants

### 9. Client Logo Marquee — ANIMATED
- Continuous auto-scroll left
- Logos: Meta | Amway | JPA | HRDF | Coca-Cola | Averis | SeekAsia | Chemopharm | YMCA | Nextracker | CXL | Mitsubishi Motors | Uniqlo
- Pause on hover

### 10. Services Expand/Collapse — EXISTING, KEEP
- "+ Show More" toggle on service cards (exists on /services page)
- Keep this interaction pattern

---

## GLOBAL NAVIGATION

**Header Layout:** Logo Left | Nav Centre | CTA Button Right
**Sticky:** Yes (on scroll, background darkens)
**Mobile:** Hamburger with full accordion dropdowns

**Primary Nav Links:**
- Home
- Services (dropdown)
- Training (dropdown)
- About Us
- Case Studies
- Blog
- Careers
- Contact Us

**Services Dropdown:**
- Robotic Process Automation
- AI Application Development
- Agentic AI & LLM Solutions
- Process Assessment & Consultancy
- Digital Transformation
- ERP & Oracle Services
- Custom Software Development
- Digital Workforce

**Training Dropdown:**
- RPA Training (UiPath & Power Automate)
- AI & GenAI Training
- Corporate Workshops

**Header CTA Button:** Get a Free Consultation →

---

## SEO META TAGS — ALL PAGES

| Page | Title Tag | Meta Description |
|------|-----------|------------------|
| Home | Symprio - AI & Automation Solutions for Enterprises & SMEs | Symprio delivers AI-powered automation, RPA, digital transformation, and corporate training. Microsoft Official Partner serving APAC, US, UK & Middle East. |
| About | About Symprio - AI & Automation Consultancy | Learn about Symprio, a global AI and RPA consultancy. Microsoft Official Partner. Serving 45+ enterprise clients across 15+ countries. |
| Services | Our Services - AI, RPA & Digital Transformation | Symprio | End-to-end AI, automation and digital transformation services for enterprises and SMEs. From RPA to Agentic AI, LLM solutions and ERP. |
| RPA | RPA Services - UiPath & Power Automate Experts | Symprio | Comprehensive RPA services from assessment to deployment. UiPath, Power Automate, Automation Anywhere. 400+ bots deployed across APAC. |
| AI Dev | AI Application Development - Chatbots, Agents, RAG | Symprio | Build intelligent AI applications: chatbots, AI agents, RAG, LLM fine-tuning, computer vision and document intelligence. |
| Agentic AI | Agentic AI & LLM Solutions | Autonomous AI Agents | Symprio | Deploy autonomous AI agents, fine-tune LLMs and implement RAG for your business. Serving banks, insurers, fintechs and enterprises. |
| Process Assessment | Process Assessment & Consultancy Services | Symprio | Symprio studies your business processes and recommends the best automation strategy. Domain-agnostic consultancy for SMEs and enterprises. |
| Digital Transformation | Digital Transformation Services - Strategy to Execution | Symprio | End-to-end digital transformation: strategy, roadmap, change management and execution. Proven methodology across APAC, US and UK. |
| ERP/Oracle | Oracle ERP Implementation & Consultancy | Symprio | Expert Oracle Cloud and R12 ERP implementations, upgrades and integrations. Deep APAC expertise with proven delivery methodology. |
| Custom Software | Custom Software Development - Web, Mobile & Cloud | Symprio | Full-stack web apps, mobile apps, and cloud-native solutions. Agile methodology, modern frameworks, AI-integrated development. |
| Digital Workforce | IT Staff Augmentation & Digital Workforce Services | Symprio | Access expert RPA, AI, and IT talent with flexible engagement models. Staff augmentation, managed teams, and full outsourcing. |
| Training | Corporate AI & RPA Training - Microsoft Official Partner | Symprio | Symprio is a Microsoft Official Partner delivering RPA, AI, GenAI and digital transformation training for businesses across APAC and globally. |
| RPA Training | RPA Training - UiPath & Power Automate | Microsoft Partner | Symprio | Hands-on UiPath and Power Automate training from Symprio, Microsoft Official Partner. Foundation to advanced level for professionals. |
| AI Training | AI & Generative AI Training - ChatGPT, Claude, n8n | Symprio | Practical AI and GenAI training covering ChatGPT, Claude, Manus, n8n, vibe coding and AI agent workflows for business teams. |
| Workshops | Corporate Digital Transformation Workshops | Leadership Training | Symprio | Bespoke digital transformation and AI strategy workshops for C-suite and senior leadership. Online and on-site across APAC and globally. |
| Case Studies | Case Studies - AI & Automation Success Stories | Symprio | Real-world results: see how Symprio helped enterprises reduce costs, save time, and grow with AI and RPA. |
| Blog | Blog - AI, RPA & Automation Insights | Symprio | Expert insights on AI, RPA, Agentic AI, digital transformation and automation best practices from the Symprio team. |
| Careers | Careers at Symprio - Join Our AI & Automation Team | Build the future of AI and automation. Join Symprio's expert team across engineering, consulting, sales and operations. |
| Contact | Contact Symprio - Free AI & Automation Consultation | Contact Symprio for a free consultation on AI, RPA, digital transformation or training. We respond within 1 business day. |
| Subscription | Support Subscription - Dedicated RPA & AI Support Hours | Symprio | Subscribe to dedicated Symprio support hours. $50/hr, minimum 50 hours. Flexible RPA, AI and automation support for your business. |

---

## PAGE 1 — HOME (/)

### SEO
- **Title:** Symprio | AI & Automation Solutions for Enterprises & SMEs
- **H1:** AI & Automation Solutions for the **Modern Enterprise**

### SECTIONS

#### 1. HERO BANNER
- **Badge:** 🏅 Microsoft Official Partner
- **H1:** AI & Automation Solutions for the **Modern Enterprise**
- **Subheadline:** Symprio empowers SMEs and enterprises to reduce costs, accelerate growth, and scale with intelligent automation, AI-powered applications, and expert digital transformation consulting — across APAC, US, UK & Middle East.
- **CTA 1 (Primary):** Get a Free Consultation →
- **CTA 2 (Secondary):** Explore Our Services
- **Hero Stats (animated counters):** 45+ Clients | 400+ Robots Deployed | 15+ Countries | 50+ Consultants

#### 2. CLIENTS MARQUEE (Animated Auto-scroll)
- **Label:** Trusted by Industry Leaders
- **Logos:** Meta | Amway | JPA | HRDF | Coca-Cola | Averis | SeekAsia | Chemopharm | YMCA | Nextracker | CXL | Mitsubishi Motors | Uniqlo
- **Developer note:** Infinite scroll animation, pause on hover

#### 3. ABOUT SNIPPET
- **Tag:** Who We Are
- **H2:** We Study Your Business. We Deliver **Real Results.**
- **Body:** At Symprio, we believe every business challenge is unique — whether rooted in people, processes, or technology. We take a consultative-first approach: study your operations, identify inefficiencies, and design tailored AI and automation solutions aligned with your culture, budget, and capabilities. With offices in Silicon Valley and across the Indo-Pacific — Singapore, Malaysia, India — we bring global innovation and local insight to every engagement.
- **Checklist:**
  - Consultancy-first, technology-second approach
  - Microsoft Official Partner for RPA & AI Training
  - 45+ enterprise clients across 15+ countries
  - Domain-agnostic — we serve any industry
  - End-to-end delivery from assessment to support
- **Right side:** Stats card (45+ Clients, 400+ Robots, 15+ Countries, 50+ Consultants)
- **CTA:** Learn More About Us →

#### 4. SERVICES OVERVIEW (8 cards, 3-col grid)
- **Tag:** What We Do
- **H2:** End-to-End AI & Automation **Services**
- **Intro:** From strategy to execution, we offer comprehensive services to help your organisation embrace automation, harness AI, and drive sustainable digital growth.
- **Cards (each: Icon + Title + Short desc + Explore →):**
  1. 🤖 Robotic Process Automation — Automate repetitive tasks with UiPath, Power Automate & Automation Anywhere.
  2. 🧠 AI Application Development — Chatbots, AI agents, document intelligence & computer vision.
  3. ⚡ Agentic AI & LLM Solutions — Autonomous agents, LLM fine-tuning & RAG implementation.
  4. 🔍 Process Assessment & Consultancy — We study your processes and recommend the best path forward.
  5. 🚀 Digital Transformation — Strategy, roadmap, change management and execution.
  6. 🏗️ ERP & Oracle Services — Oracle Cloud & R12 implementations, integrations and upgrades.
  7. 💻 Custom Software Development — Full-stack web, mobile and cloud-native solutions.
  8. 👥 Digital Workforce — Expert IT talent with flexible engagement models.

#### 5. TRAINING HIGHLIGHT BANNER (Full-width gradient)
- **H2:** We Are a **Microsoft Official Partner** — We Train Your Team Too
- **Text:** From UiPath & Power Automate RPA training to AI & GenAI workshops and corporate leadership programs — Symprio delivers practical, hands-on training that builds real capability.
- **Training chips:** RPA Training | AI & GenAI | Vibe Coding | n8n | Manus | Claude | Corporate Workshops
- **CTA:** View All Training Programs →

#### 6. STATS COUNTER BANNER (Animated)
- 45+ Enterprise Clients
- 400+ Robots Deployed
- 15+ Countries Served
- 50+ Active Consultants

#### 7. INDUSTRIES WE SERVE (8 cards, 4-col grid)
- **Tag:** Industries
- **H2:** Expertise Across **Every Industry**
- **Intro:** We are a domain-agnostic consultancy. We study your processes and design solutions that fit your operational context.
- **Cards:**
  1. 🏦 Banking & Finance — Compliance automation, loan processing, fraud detection, customer onboarding
  2. 🏢 Insurance — Claims processing, policy management, underwriting automation
  3. 💳 Fintech — AI-powered fintech apps, transaction automation, risk reduction
  4. 🏥 Healthcare — Patient data, billing, reporting automation
  5. 📡 Telecom — Churn reduction, network operations, customer experience AI
  6. 🏭 Manufacturing — Computer vision, predictive maintenance, supply chain automation
  7. 🛍️ Retail & E-Commerce — AI personalisation, inventory automation, service bots
  8. 🏛️ Government & Public Sector — Citizen services, back-office workflows, compliance

#### 8. CASE STUDY SNAPSHOT (Featured)
- **Tag:** Success Story
- **H2:** Real Results for **Real Businesses**
- **Case:** Financial Services — Invoice Processing Automation
- **Stats:** 60% Processing Time Reduction | 15 Bots Deployed | $3M Annual Savings | 99.8% Accuracy
- **CTA:** View All Case Studies →

#### 9. TESTIMONIALS (6 cards — carousel on mobile, grid on desktop)
- **Tag:** Client Stories
- **H2:** What Our Clients **Say About Us**
- **Testimonials:**
  1. "Symprio transformed our invoice processing. Their RPA solution reduced processing time by 60% and freed our finance team for strategic work." — CFO, Financial Services ★★★★★
  2. "Working with Symprio on our AI chatbot was seamless. They understood our challenges and delivered a solution that improved satisfaction scores significantly." — Head of Operations, Telecom ★★★★★
  3. "Their Oracle ERP implementation was smooth. Symprio's team understood our local requirements perfectly." — CIO, Regional Enterprise ★★★★★
  4. "The RPA training Symprio delivered was hands-on and immediately applicable. Our team was building bots within days." — Digital Transformation Lead, Insurance ★★★★★
  5. "Symprio's process assessment revealed inefficiencies we didn't know existed. ROI was evident within the first quarter." — COO, Manufacturing ★★★★★
  6. "Their AI agent handles our entire back-office workflow autonomously. It's like having a full-time team member who never stops." — CEO, Fintech Startup ★★★★★

#### 10. EVENTS / WEBINARS (Dynamic section)
- **H2:** Upcoming Events & Webinars
- **Developer note:** CMS-managed. If no events, show: "No upcoming events at this time. Subscribe below to be notified."
- **Subscribe input:** Email field + "Notify Me" button

#### 11. TEAM (4 cards)
- **Tag:** Our Visionaries
- **H2:** The Experts Behind **Symprio**
- **Members:**
  1. Vilhelm Bjermeland — COO, USA
  2. Prabin Vijay — Practice Lead, APAC
  3. Vivek Krishna — Director, Automation Services, APAC
  4. Ramalingam Dushyanth — Practice Head, Automation

#### 12. CTA BANNER (Full-width gradient)
- **H2:** Ready to Transform Your Business with AI & Automation?
- **Text:** Talk to our experts. We'll design a custom roadmap to help you automate smarter, scale faster, and lead your industry.
- **CTA 1:** Get a Free Consultation →
- **CTA 2:** View Our Services

#### 13. BLOG LATEST POSTS (3 cards — dynamic from Medium RSS)
- **Tag:** Insights
- **H2:** Latest from **Our Blog**
- **Developer note:** Pull 3 latest posts from Medium RSS feed: https://medium.com/feed/@symprioideas
- **CTA:** View All Posts →

---

## PAGE 2 — ABOUT US (/about)

### SEO
- **Title:** About Symprio | Global AI & Automation Consultancy | Microsoft Partner
- **H1:** About **Symprio**

### SECTIONS

#### 1. PAGE HERO
- **H1:** About **Symprio**
- **Breadcrumb:** Home > About Us
- **Subtext:** A global AI & automation consultancy built on expertise, innovation, and measurable results.

#### 2. OUR STORY
- **Tag:** Who We Are
- **H2:** Built to Solve **Real Business Problems**
- **Body:** At Symprio, we understand that every customer, every business problem, and every solution is unique. That's why we take a consultative-first approach — studying your people, processes, and technology before recommending any solution. We don't sell tools. We solve problems.
  Founded with offices in Silicon Valley and across the Indo-Pacific region — Singapore, Malaysia, and India — Symprio combines global innovation with deep local knowledge. We serve SMEs and enterprises across APAC, the US, UK, Middle East, and India, spanning industries from banking and insurance to manufacturing, healthcare, and government.
- **Checklist:**
  - Consultancy-first, technology-second approach
  - Microsoft Official Partner for RPA & AI Training
  - 45+ enterprise clients across 15+ countries
  - Domain-agnostic — applicable to any industry
  - End-to-end delivery from assessment to ongoing support

#### 3. MISSION & VISION
- **Mission:** To empower enterprises with intelligent automation, AI and digital innovations that unlock productivity and growth.
- **Vision:** To create a world where people and autonomous technologies collaborate seamlessly, enabling organisations to adapt and thrive in the digital era.

#### 4. CORE VALUES (4 cards)
- 🎯 **Client Success First** — We measure our impact by the value delivered to our clients.
- 💡 **Innovation & Excellence** — We continuously learn and adopt cutting-edge technologies.
- 🤝 **Integrity & Transparency** — We build lasting relationships through honesty and accountability.
- 🌏 **Diversity & Inclusion** — Our teams and solutions reflect the diverse clients and communities we serve.

#### 5. STATS COUNTER
- 45+ Clients | 400+ Robots | 15+ Countries | 50+ Consultants

#### 6. GLOBAL OFFICES (Cards with flags)
- 🇺🇸 **Silicon Valley, USA** | California | +1 (408) 555-0123 | usa@symprio.com
- 🇲🇾 **Kuala Lumpur, Malaysia** | +60 3 5555 0123 | my@symprio.com
- 🇸🇬 **Singapore** | +65 6123 4567 | sg@symprio.com
- 🇮🇳 **India** | Multiple Cities | +91 80 5555 0123 | india@symprio.com
- 🇬🇧 UK & Middle East — Remote delivery & on-site

#### 7. MICROSOFT PARTNER SECTION
- **H2:** Proud **Microsoft Official Partner**
- **Text:** Symprio is an officially recognised Microsoft Partner for RPA and AI training. This means our training programs meet Microsoft's rigorous standards, and our clients benefit from curriculum and methodologies aligned with the world's leading technology ecosystem.
- **Badge:** Microsoft Official Partner — RPA & IAD Training

#### 8. MEET THE TEAM (4 cards)
- Vilhelm Bjermeland — COO, USA
- Prabin Vijay — Practice Lead, APAC
- Vivek Krishna — Director, Automation Services, APAC
- Ramalingam Dushyanth — Practice Head, Automation

#### 9. CAREERS & CULTURE (Dynamic section)
- **H2:** Careers & **Culture**
- **3 cards:**
  - 🤝 Collaborative Culture — Growth-oriented environment where innovation thrives.
  - 💼 Open Roles — Hiring across Engineering, Consulting, Sales, Marketing, Operations.
  - 📈 Professional Development — Continuous learning, certifications, career growth.
- **CTA:** Explore Careers →  (links to /careers)

#### 10. CLIENT LOGOS STRIP

#### 11. CTA BANNER
- **H2:** Want to Know More? Let's Talk.
- **CTA:** Schedule a Free Consultation →

---

## PAGE 3 — SERVICES OVERVIEW (/services)

### SEO
- **Title:** Our Services | AI, RPA & Digital Transformation | Symprio
- **H1:** Our **Services**

### SECTIONS

#### 1. PAGE HERO
- **H1:** Comprehensive AI & Automation **Services**
- **Subtext:** End-to-end services that help your organisation embrace automation, harness AI, and drive sustainable digital growth — from strategy to execution.

#### 2. SERVICES GRID (8 large cards, 2-col, expand/collapse like existing site)
- Each card: Number | Icon | Title | Short desc | "Show More" toggle | Key capabilities | CTA "Explore Service →"
- **Keep existing expand/collapse (+Show More) interaction**
- 01 — Robotic Process Automation
- 02 — AI Application Development
- 03 — Agentic AI & LLM Solutions
- 04 — Process Assessment & Consultancy
- 05 — Digital Transformation
- 06 — ERP & Oracle Services
- 07 — Custom Software Development
- 08 — Digital Workforce & Staff Augmentation

#### 3. HOW WE WORK (5-step process)
- 01 Discovery | 02 Strategy | 03 Design | 04 Delivery | 05 Optimise

#### 4. INDUSTRIES WE SERVE (8-card grid)

#### 5. MICROSOFT PARTNER BADGE

#### 6. STATS COUNTER

#### 7. CTA BANNER
- **H2:** Not Sure Which Service You Need?
- **Text:** Talk to one of our experts — we'll study your business and recommend the right solution.
- **CTA:** Book a Free Consultation →

---

## PAGE 4 — SERVICE: RPA (/services/rpa)

### SEO
- **Title:** RPA Services | UiPath & Power Automate | 400+ Bots Deployed | Symprio
- **Meta Desc:** Symprio delivers end-to-end RPA services using UiPath, Power Automate & Automation Anywhere. CoE setup, bot development, testing and support. 400+ bots deployed across APAC.
- **H1:** Robotic Process Automation **(RPA) Services**

### SECTIONS

#### 1. PAGE HERO
- **H1:** Robotic Process Automation **(RPA) Services**
- **Subtext:** Automate repetitive tasks, reduce errors, and free your team for high-value work with industry-leading RPA solutions.
- **CTA:** Get a Free Process Assessment →

#### 2. WHAT IS RPA?
- **H2:** What is RPA and Why Does It **Matter?**
- **Body:** Robotic Process Automation (RPA) uses software bots to mimic human actions on digital systems — logging in, copying data, filling forms, generating reports — at a fraction of the time and cost. RPA is the fastest path to operational efficiency for any organisation dealing with high-volume, repetitive processes.

#### 3. OUR RPA SERVICES (6 cards)
- 🔍 Process Discovery & Assessment
- 🏗️ RPA CoE Setup & Governance
- 🤖 Bot Development & Testing
- 🚀 Deployment & Go-Live Support
- 🔧 RPA Maintenance & Managed Support
- 📈 RPA Scaling & Optimisation

#### 4. TOOLS (logo strip)
- UiPath | Microsoft Power Automate | Automation Anywhere

#### 5. INDUSTRIES
- Banking | Insurance | Fintech | Healthcare | Telecom | Manufacturing | Retail | Government

#### 6. RPA IMPACT STATS
- 400+ Bots Deployed | 60% Avg. Time Reduction | 99.8% Accuracy | $3M+ Client Savings

#### 7. FEATURED CASE STUDY
- Financial services firm: 200+ hours/month saved, 15 bots, 60% time reduction, $3M annual savings

#### 8. TESTIMONIAL (1-2 RPA-specific)

#### 9. FAQ
- What processes are best suited for RPA?
- How long does RPA implementation take?
- Which RPA tools do you use?
- Do you provide post-deployment support?
- Can RPA integrate with our existing systems?

#### 10. CTA BANNER
- **H2:** Ready to Start Automating?
- **CTA:** Book a Free RPA Assessment →

---

## PAGE 5 — SERVICE: AI APPLICATION DEVELOPMENT (/services/ai-development)

### SEO
- **Title:** AI Application Development | Chatbots, AI Agents, RAG, LLM | Symprio
- **Meta Desc:** Symprio builds AI-powered applications: chatbots, AI agents, MCPs, LLM fine-tuning, RAG systems, document intelligence and computer vision for enterprises and SMEs.
- **H1:** AI-Powered **Application Development**

### SECTIONS

#### 1. PAGE HERO
- **H1:** AI-Powered **Application Development**
- **Subtext:** We design and build intelligent applications that think, learn, and act — powered by the latest AI models and frameworks tailored to your business.
- **CTA:** Start Your AI Project →

#### 2. WHAT WE BUILD (8 cards)
- 💬 Chatbots & Virtual Assistants — Multi-channel conversational AI for customer service, HR, and sales (web, WhatsApp, Teams, etc.)
- 🤖 AI Agents — Autonomous agents that reason and act across your business systems
- 🔗 MCPs (Model Context Protocols) — AI applications with deep contextual understanding of your data
- 🧬 LLM Fine-Tuning — Custom language models trained on your proprietary business data
- 📚 RAG Implementation — AI that answers from your own knowledge base with factual accuracy
- 📄 Document Intelligence — Extract and process data from invoices, contracts, forms automatically
- 👁️ Computer Vision — Visual AI for quality control, defect detection and image analysis
- ⚡ RPA + AI Hybrid Workflows — Combine structured automation with AI for intelligent end-to-end processes

#### 3. TECH STACK (chip tags)
- Claude | ChatGPT/OpenAI API | LangChain | Hugging Face | n8n | Manus | Azure AI | Python | Power Automate | UiPath | AWS | Google Cloud

#### 4. INDUSTRIES
- Banking | Insurance | Fintech | Healthcare | Retail | Manufacturing | Telecom | Government

#### 5. DEVELOPMENT PROCESS (5 steps)
- Requirements & Discovery → Architecture Design → Development & Testing → Deployment → Monitoring & Improvement

#### 6. FAQ
- What AI platforms do you build on?
- How long does it take to build an AI application?
- Can you integrate AI into our existing systems?
- Is our data safe during AI development?
- Do you provide ongoing maintenance?

#### 7. CTA BANNER
- **H2:** Let's Build Your AI Application
- **CTA:** Get a Free Scoping Session →

---

## PAGE 6 — SERVICE: AGENTIC AI & LLM (/services/agentic-ai)

### SEO
- **Title:** Agentic AI & LLM Solutions | AI Agents, RAG, Fine-Tuning | Symprio
- **Meta Desc:** Deploy autonomous AI agents, fine-tune LLMs, and implement RAG with Symprio. n8n, Manus, Claude, ChatGPT. Serving banks, fintechs, and enterprises globally.
- **H1:** Agentic AI & **LLM Solutions**

### SECTIONS

#### 1. PAGE HERO
- **Subtext:** Move beyond simple chatbots. Deploy autonomous AI agents that reason, plan, and execute complex business tasks with minimal human oversight.
- **CTA:** Explore Agentic AI Solutions →

#### 2. WHAT IS AGENTIC AI?
- **H2:** The Next Evolution of **Business Automation**
- **Body:** Traditional automation follows rigid rules. Agentic AI goes further — it reasons about context, plans multi-step actions, uses tools, and adapts to new information. Think of it as a digital team member that never sleeps, never makes the same mistake twice, and continuously improves.

#### 3. OUR AGENTIC AI SERVICES (6 cards)
- 🤖 AI Agent Development (n8n, Manus, LangChain)
- 🔗 MCP Integration
- 🧬 LLM Fine-Tuning
- 📚 RAG Implementation
- 🔄 Agentic Process Automation
- 🏭 Agentic RPA (AI + bots)

#### 4. MODELS & PLATFORMS
- Claude (Anthropic) | ChatGPT (OpenAI) | Manus | n8n | LangChain | Hugging Face | Azure OpenAI | Llama | Mistral

#### 5. USE CASES BY INDUSTRY
- Banking: Autonomous loan pre-assessment agents
- Insurance: AI claims processing agents
- Fintech: Intelligent fraud detection agents
- Retail: AI shopping assistant agents
- HR: Autonomous employee onboarding agents
- Healthcare: AI-assisted patient data agents

#### 6. FAQ + CTA BANNER
- **CTA:** Talk to an AI Expert →

---

## PAGE 7 — PROCESS ASSESSMENT (/services/process-assessment)

### SEO
- **Title:** Process Assessment & Automation Consultancy | Symprio
- **H1:** Process Assessment & **Consultancy**

### KEY CONTENT
- **H2:** Don't Automate a **Broken Process**
- **Body:** Many organisations rush into automation without fully understanding their processes. The result? Automated inefficiencies, wasted budget, and poor ROI. Symprio takes a consultancy-first approach — we study your workflows, map your processes, and identify exactly where automation or AI will deliver the most value.
- **5 steps:** Process Discovery & Mapping → Pain Point Identification → Opportunity Assessment → ROI Modelling → Automation Roadmap
- **Deliverables:** Process Maps (As-Is & To-Be) | Opportunity Register | Automation Readiness Score | Business Case Document | Technology Roadmap
- **CTA:** Book a Free Process Assessment →

---

## PAGE 8 — DIGITAL TRANSFORMATION (/services/digital-transformation)

### SEO
- **Title:** Digital Transformation Services | Strategy to Execution | Symprio
- **H1:** **Digital Transformation** Services

### KEY CONTENT
- **6 service cards:** Digital Strategy & Roadmap | Process Re-engineering | Change Management | Technology Integration | Digital Maturity Assessment | Digital Leadership Coaching
- **4-phase framework:** Assess → Strategise → Execute → Sustain
- **CTA:** Talk to a Digital Transformation Expert →

---

## PAGE 9 — ERP & ORACLE (/services/erp-oracle)

### SEO
- **Title:** Oracle ERP Services | Oracle Cloud & R12 | APAC Experts | Symprio
- **H1:** ERP & **Oracle Services**

### KEY CONTENT
- **5 services:** Oracle Cloud Implementation | Oracle R12 Implementation & Upgrade | ERP Integration & Data Migration | Oracle Managed Services | Oracle Training
- **Methodology:** Assess → Design → Configure → Test → Go-Live & Support
- **CTA:** Talk to Our ERP Team →

---

## PAGE 10 — CUSTOM SOFTWARE (/services/custom-software)

### SEO
- **Title:** Custom Software Development | Web, Mobile & Cloud | Symprio
- **H1:** Custom **Software Development**

### KEY CONTENT
- **6 deliverables:** Web Apps | Mobile Apps (iOS & Android) | Cloud-Native | API Development | AI-Integrated Apps | Database Design
- **Tech stack:** React | Node.js | Python | .NET | Flutter | Azure | AWS | Docker
- **CTA:** Get a Free Scoping Session →

---

## PAGE 11 — DIGITAL WORKFORCE (/services/digital-workforce)

### SEO
- **Title:** IT Staff Augmentation & Digital Workforce | Symprio
- **H1:** Digital Workforce & **Staff Augmentation**

### KEY CONTENT
- **3 engagement models:** Staff Augmentation | Managed Teams | Full Outsourcing
- **Talent types:** RPA Developers | AI/ML Engineers | Oracle Consultants | Business Analysts | Project Managers | Data Scientists | Solution Architects
- **CTA:** Submit Your Talent Request →

---

## PAGE 12 — TRAINING OVERVIEW (/training)

### SEO
- **Title:** Corporate AI & RPA Training | Microsoft Official Partner | Symprio
- **Meta Desc:** Symprio is a Microsoft Official Partner delivering UiPath, Power Automate, AI, GenAI and corporate digital transformation training across APAC and globally.
- **H1:** Corporate **Training Programs**

### SECTIONS

#### 1. PAGE HERO
- **H1:** Corporate **Training Programs**
- **Subtext:** As a Microsoft Official Partner, Symprio delivers hands-on RPA, AI, and digital transformation training for professionals and leadership teams worldwide.
- **Badge:** 🏅 Microsoft Official Partner — RPA & AI Training
- **CTA:** Enquire About Training →

#### 2. WHY TRAIN WITH SYMPRIO (4 cards)
- ✅ Microsoft Official Partner
- ✅ Hands-on, practical curriculum
- ✅ Industry-expert trainers with real delivery experience
- ✅ Fully customisable for your organisation

#### 3. TRAINING PROGRAMS (3 main cards with CTA)
- 🤖 **RPA Training (UiPath & Power Automate)** — Foundation to advanced. View Program →
- 🧠 **AI & Generative AI Training** — ChatGPT, Claude, Manus, n8n, vibe coding. View Program →
- 🎓 **Corporate Workshops** — Digital transformation & AI strategy for leadership. View Program →

#### 4. WHO IS THIS FOR?
- Business Analysts | Process Owners | IT Teams | Operations Staff | C-Suite & Leadership | Digital Transformation Teams | Developers

#### 5. TRAINING DELIVERY MODES
- 🖥️ Online (Live virtual sessions)
- 🏢 On-site (At your premises)
- 🎓 Blended (Mix of both)

#### 6. MICROSOFT PARTNERSHIP SECTION
- Symprio is officially authorised by Microsoft to deliver RPA and IAD training programs.

#### 7. TESTIMONIALS (Training-specific)

#### 8. TRAINING ENQUIRY FORM (Dynamic)
- **Fields:** Name | Business Email | Company | Country | No. of Participants | Training Program (dropdown) | Preferred Delivery Mode | Preferred Date/Month | Message
- **Dropdown options:** RPA Training (UiPath) | RPA Training (Power Automate) | AI & GenAI Training | Corporate Workshop | Custom Training Package
- **Submit:** Send Training Enquiry →
- **Developer note:** Form submits to admin email with all field values

#### 9. CTA BANNER
- **H2:** Ready to Upskill Your Team?
- **CTA:** Book a Training Enquiry →

---

## PAGE 13 — RPA TRAINING (/training/rpa)

### SEO
- **Title:** RPA Training | UiPath & Power Automate | Microsoft Official Partner | Symprio
- **Meta Desc:** Hands-on UiPath and Power Automate RPA training from Symprio, a Microsoft Official Partner. Foundation to advanced level for professionals across APAC.
- **H1:** RPA Training — UiPath & **Power Automate**

### SECTIONS

#### 1. PAGE HERO
- **Subtext:** Master the world's leading RPA platforms with practical, hands-on training from a Microsoft Official Partner.
- **CTA:** Request Training Information →

#### 2. PROGRAM OVERVIEW (2-col)
- **UiPath Training:** Foundation to Advanced — UiPath Studio, Orchestrator, ReFramework, attended and unattended automation, bot deployment, exception handling.
- **Power Automate Training:** Desktop flows, cloud flows, connectors, AI Builder, Microsoft 365 integration — delivered as part of Microsoft's official RPA/IAD program.

#### 3. WHAT YOU'LL LEARN (checklist, 2-col)
**UiPath:**
- Process recording & workflow design
- Exception handling & debugging
- Orchestrator management
- ReFramework best practices
- Bot deployment & monitoring

**Power Automate:**
- Desktop flow development
- Cloud flows & triggers
- Microsoft 365 connectors
- AI Builder integration
- Enterprise deployment

#### 4. WHO SHOULD ATTEND
- Business Analysts | RPA Developers | Process Owners | IT Professionals | Digital Transformation Teams

#### 5. TRAINING DETAILS
- **Duration:** Customisable (1-day workshops to multi-week programs)
- **Delivery:** Online | On-site | Blended
- **Group size:** Minimum 5 participants for corporate bookings
- **Language:** English (other languages on request)
- **Certification:** No certification provided (practical capability-focused)

#### 6. MICROSOFT PARTNERSHIP BADGE

#### 7. ENQUIRY FORM (Dynamic — same as training overview form, pre-filled with RPA)

---

## PAGE 14 — AI & GENAI TRAINING (/training/ai-genai)

### SEO
- **Title:** AI & Generative AI Training | ChatGPT, Claude, n8n, Manus | Symprio
- **Meta Desc:** Practical AI & GenAI training covering ChatGPT, Claude, Manus, n8n, vibe coding and AI agents. For business teams and developers across APAC and globally.
- **H1:** AI & **Generative AI Training**

### SECTIONS

#### 1. PAGE HERO
- **Subtext:** Move beyond the hype. Practical AI training that teaches your team to actually use AI tools to boost productivity, automate workflows, and stay competitive.
- **CTA:** Enquire Now →

#### 2. WHAT WE COVER (6 cards)
- 🤖 **ChatGPT & Prompt Engineering** — Using ChatGPT for business tasks, writing, research, and automation.
- 🧠 **Claude AI** — Anthropic's Claude for complex reasoning, document analysis, and workflows.
- 🔄 **n8n Workflow Automation** — Build powerful AI-powered automations without code.
- 🚀 **Manus AI Agents** — Deploy autonomous AI agents using the Manus platform.
- 🎨 **Vibe Coding** — Build AI-powered applications using natural language and no-code tools.
- 📊 **AI for Business Productivity** — Practical use cases for marketing, finance, HR, and operations.

#### 3. WHO SHOULD ATTEND
- All business teams | Managers | Marketing | Finance | HR | Operations | Developers | Leadership

#### 4. TRAINING OUTCOMES
- Understand AI capabilities and limitations
- Use AI tools practically in daily work
- Build basic AI workflows with n8n and Manus
- Identify AI opportunities within your organisation
- Lead AI adoption within your team

#### 5. ENQUIRY FORM (Dynamic — pre-filled with AI & GenAI)

---

## PAGE 15 — CORPORATE WORKSHOPS (/training/corporate-workshops)

### SEO
- **Title:** Corporate Digital Transformation Workshops | Leadership AI Training | Symprio
- **Meta Desc:** Bespoke digital transformation and AI strategy workshops for C-suite and senior leadership. Delivered on-site or online across APAC, US and UK.
- **H1:** Corporate Workshops for **Leadership & Teams**

### SECTIONS

#### 1. PAGE HERO
- **Subtext:** Tailored workshops that equip your leadership and teams with the mindset, knowledge, and tools to lead digital change.

#### 2. WORKSHOP THEMES (4 cards)
- 🧭 **Digital Transformation Strategy for Leaders** — Strategic workshop for C-suite on building and executing a digital roadmap.
- 🤖 **AI Strategy & Adoption** — Understanding AI capabilities, identifying opportunities, and responsible AI adoption.
- 🔄 **Automation Culture & Change Management** — Building an automation-friendly culture and managing the human side of change.
- 📊 **Data-Driven Decision Making** — Using data and AI insights to make smarter, faster business decisions.

#### 3. FORMAT
- Half-day / Full-day / Multi-day
- In-person or virtual
- Fully customisable
- Recommended: max 30 participants per cohort

#### 4. WHO ATTENDS
- CEOs | COOs | CTOs | CFOs | VPs & Directors | Senior Managers | Change Management Teams

#### 5. ENQUIRY FORM (Dynamic)

---

## PAGE 16 — CASE STUDIES (/case-studies)

### SEO
- **Title:** Case Studies | AI & Automation Success Stories | Symprio
- **H1:** Real Results. **Real Businesses.**

### SECTIONS

#### 1. PAGE HERO
- **Subtext:** See how Symprio has helped enterprises and SMEs achieve measurable results through RPA, AI, and digital transformation.

#### 2. FILTER BAR (Dynamic)
- All | RPA | AI Development | Agentic AI | Digital Transformation | Training | ERP

#### 3. CASE STUDY CARDS GRID (Dynamic — CMS managed)
**Each card:** Industry tag | Service tag | Title | Key stat callout | Short description | Read Case Study →

**Starter case studies to create:**
1. 🏦 **Financial Services — Invoice Processing Automation** | RPA | 60% time reduction, 15 bots, $3M savings
2. 📡 **Telecom — AI Chatbot for Customer Service** | AI Dev | 40% reduction in support tickets
3. 🏢 **Insurance — Claims Processing RPA** | RPA | 80% faster processing time
4. 🏭 **Manufacturing — Computer Vision QC System** | AI Dev | 99.2% defect detection accuracy
5. 🏥 **Healthcare — Patient Data Automation** | RPA | 200+ hours/month saved
6. 🏛️ **Government — Back-Office Automation** | Digital Transformation | 70% cost reduction

#### 4. CTA BANNER
- **H2:** Want Results Like These?
- **CTA:** Talk to Our Experts →

---

## PAGE 17 — BLOG (/blog)

### SEO
- **Title:** Blog | AI, RPA & Automation Insights | Symprio
- **H1:** Insights & **Resources**

### DYNAMIC SETUP
- **Source:** Medium RSS feed: https://medium.com/feed/@symprioideas
- **API:** https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@symprioideas
- **Display:** Featured post (large) + 3-col card grid with pagination
- **Each card:** Category | Thumbnail | Title | Date | Author | Excerpt | Read More →

### CATEGORIES (filter tabs)
- All | RPA | AI & GenAI | Digital Transformation | Training | Industry News | Case Studies

### SUGGESTED BLOG TOPICS TO WRITE
1. What is Agentic AI and Why Should Your Business Care?
2. UiPath vs Power Automate — Which RPA Tool is Right for You?
3. Top 5 Business Processes You Should Automate Right Now
4. How LLM Fine-Tuning Gives Your Business a Competitive Edge
5. RAG vs Fine-Tuning: What's the Difference?
6. Digital Transformation in APAC: 2025 Trends
7. How to Build a Business Case for RPA
8. AI in Banking: 10 Use Cases Driving Real ROI
9. Vibe Coding: How to Build AI Apps Without Being a Developer
10. n8n vs Zapier: Best Automation Tool for Enterprises?

---

## PAGE 18 — CAREERS (/careers)

### SEO
- **Title:** Careers at Symprio | Join Our AI & Automation Team
- **H1:** Join the **Symprio Team**

### SECTIONS

#### 1. PAGE HERO
- **Subtext:** We're building the future of intelligent automation. Come build it with us.

#### 2. WHY WORK AT SYMPRIO (4 cards)
- 🌏 Work on global projects across APAC, US, and UK
- 🤖 Work with cutting-edge AI & automation technology
- 📈 Fast-growing company with real career opportunities
- 🤝 Collaborative, expert team environment

#### 3. PROFESSIONAL DEVELOPMENT
- We invest in your growth through continuous learning, industry certifications, and structured career development.

#### 4. OPEN ROLES (Dynamic — CMS managed)
**Each listing card:** Job Title | Department | Location | Type (Full-time/Contract/Remote) | Posted Date | View & Apply →
**Departments:** Engineering | Consulting | Sales | Marketing | Operations
**Fallback (if no roles):** "No open positions right now — but we're always looking for exceptional talent. Submit your CV below."

#### 5. JOB APPLICATION FORM (Dynamic)
- **Fields:** Full Name | Email | Phone | LinkedIn Profile URL | Position Applied For | Upload CV (PDF/Word) | Cover Letter (textarea)
- **Submit:** Submit Application →
- **Developer note:** CV uploads to secure server/storage, admin notified by email

#### 6. CTA
- **H2:** Don't See a Role That Fits?
- **Text:** Send your CV anyway. We're always open to exceptional talent.
- **CTA:** Send Your CV → (opens application form)

---

## PAGE 19 — CONTACT US (/contact)

### SEO
- **Title:** Contact Symprio | Free AI & Automation Consultation
- **Meta Desc:** Contact Symprio for a free consultation on AI, RPA, digital transformation or training. We respond within 1 business day. Offices in APAC, US, UK & Middle East.
- **H1:** Let's Start Your **Transformation**

### SECTIONS

#### 1. PAGE HERO
- **Subtext:** Talk to one of our experts — we'll listen, understand your challenges, and recommend the right solution. No obligation.

#### 2. CONTACT DETAILS (left column)
- 📞 **Phone/WhatsApp:** +60 13 880 2574
- 📧 **Email:** contact@symprio.com
- 📍 **Address:** Symprio Sdn Bhd, Tower B, 8-05, Kuala Lumpur, Malaysia
- 🕐 **Response time:** Within 1 business day

#### 3. OFFICE CARDS
- 🇺🇸 Silicon Valley, USA
- 🇲🇾 Kuala Lumpur, Malaysia (HQ)
- 🇸🇬 Singapore
- 🇮🇳 India
- 🌍 UK & Middle East (Remote)

#### 4. CONTACT FORM (Enhanced — keep existing fields + add new)
- Full Name *
- Business Email *
- Phone Number
- Company Name *
- Country * (dropdown)
- Service Interested In * (dropdown):
  - Digital Transformation
  - Robotic Process Automation
  - AI Application Development
  - Agentic AI & LLM Solutions
  - Process Assessment & Consultancy
  - ERP Practice (Oracle)
  - Chatbots & Conversational AI
  - Custom Software Development
  - Digital Workforce / Staff Augmentation
  - Training (RPA/AI/Workshops)
  - Other
- Message / Project Description *
- How did you hear about us? (dropdown): Google | LinkedIn | Referral | Event | Other
- **Submit:** Send My Enquiry →
- **Trust note:** 🔒 Your information is 100% confidential. We never share your data.

#### 5. FAQ (5 questions)
- How quickly will you respond? — Within 1 business day.
- Do you work with SMEs or only enterprises? — Both.
- Do you work outside APAC? — Yes, US, UK, Middle East, and India.
- Is the initial consultation free? — Yes, always.
- What should I prepare for the first call? — A brief overview of your challenge or process to improve.

---

## PAGE 20 — SUPPORT SUBSCRIPTION (/support-subscription)

### SEO
- **Title:** Support Subscription | Dedicated RPA & AI Support Hours | Symprio
- **H1:** Subscribe to **Support Hours**

### SECTIONS (EXISTING PAGE — REDESIGN ONLY)

#### 1. PAGE HERO
- **Subtext:** Get dedicated Symprio support hours for your automation and AI solutions. Flexible, affordable, and always available when you need us.

#### 2. PACKAGE TIERS (new — add above form)
| Tier | Hours | Rate | Total | Best For |
|------|-------|------|-------|----------|
| Starter | 50 hours | $50/hr | $2,500 | Small teams, initial support |
| Growth | 100 hours | $50/hr | $5,000 | Growing automation programs |
| Enterprise | 200+ hours | Contact us | Custom | Large-scale deployments |

#### 3. SUBSCRIPTION FORM (KEEP ALL EXISTING DYNAMIC ELEMENTS)
- Name *
- Company Name *
- Email Address *
- Contact Number * (country code dropdown: +60, +65, +91, +1, +44)
- Subscription Hours * (dynamic stepper: min 50, increment by 1, + and - buttons)
- **Dynamic price calculator:** Rate $50/hr × hours = Total Amount (auto-updates in real time)
- Message (Optional)
- **Submit:** Subscribe Now

#### 4. WHAT'S INCLUDED
- Flexible support hours that scale with your needs
- Pay only for what you use
- Minimum 50 hours to get started
- Dedicated support team
- Priority response times
- Email and phone support

#### 5. CONTACT
- 📞 +60 13 880 2574
- 📧 contact@symprio.com

---

## PAGE 21 — THANK YOU (/thank-you)

### CONTENT
- **H1:** Thank You! We'll Be in **Touch Shortly.**
- **Text:** Your enquiry has been received. One of our experts will reach out within 1 business day to discuss your needs.
- **CTA 1:** View Our Services →
- **CTA 2:** Read Our Blog →
- **Developer note:** This page should only be accessible after form submission (redirect). Also fire Google Analytics conversion event here.

---

## PAGE 22 — PRIVACY POLICY (/privacy-policy)

### CONTENT
- Standard privacy policy covering: data collection, usage, storage, cookies, third-party services, contact details
- **Company:** Symprio Sdn Bhd, Tower B, 8-05, Kuala Lumpur, Malaysia
- **Contact:** contact@symprio.com

---

## GLOBAL FOOTER (All Pages)

**Col 1 — About Symprio**
- Logo: Symprio
- Tagline: Intelligent AI & Automation Solutions for the Modern Enterprise.
- Description: Symprio helps SMEs and enterprises automate intelligently, build AI-powered products, and transform digitally. Microsoft Official Partner. Serving clients across APAC, US, UK, and the Middle East.
- Social: LinkedIn | Twitter/X | YouTube | Facebook

**Col 2 — Services**
- Robotic Process Automation
- AI Application Development
- Agentic AI & LLM Solutions
- Process Assessment & Consultancy
- Digital Transformation
- ERP & Oracle Services
- Custom Software Development
- Digital Workforce

**Col 3 — Training**
- RPA Training
- AI & GenAI Training
- Corporate Workshops
- Microsoft Partner Info

**Col 4 — Company**
- About Us
- Our Team
- Case Studies
- Blog
- Careers
- Contact Us
- Support Subscription

**Col 5 — Regions**
- Malaysia (HQ)
- Singapore
- India
- Silicon Valley, USA
- United Kingdom
- Middle East

**Bottom bar:**
- © 2025 Symprio. All Rights Reserved.
- Privacy Policy | Terms of Service
- Phone: +60 13 880 2574 | Email: contact@symprio.com

---

## DEVELOPER TECHNICAL NOTES

### Tech Stack Recommendations
- **Frontend:** React / Next.js (for SEO-friendly SSR) OR WordPress with Orbixa theme
- **CMS:** WordPress, Contentful, or Strapi (for blog, careers, case studies, events)
- **Forms:** EmailJS or custom backend → email notifications to admin
- **Blog:** Medium RSS API integration OR native CMS blog
- **Analytics:** Google Analytics 4 + Google Search Console from day 1
- **Hosting:** Vercel (Next.js) or WP Engine (WordPress)

### Animation Requirements
- Animated counter on stats sections (count up on scroll into view)
- Infinite marquee scroll for client logos (pause on hover)
- Fade-in animations on sections as user scrolls
- Service card hover effects (lift + border glow)
- Hero banner entrance animation

### Dynamic Pages Summary
| Page | Dynamic Element | CMS Needed? |
|------|----------------|-------------|
| Home | Blog posts (RSS), Events, Stats counter, Marquee | Yes (events only) |
| Blog | Posts from Medium RSS | No (RSS pull) |
| Careers | Job listings, Application form + CV upload | Yes |
| Case Studies | Case study entries with filter | Yes |
| Training | Enquiry form, email notification | No (form only) |
| Contact | Enquiry form, email notification | No (form only) |
| Support Subscription | Dynamic price calculator, form | No (JS only) |
| Events (Home section) | Event listings | Yes |

### SEO Technical Checklist
- [ ] Schema markup: Organization, LocalBusiness (per office), Service, FAQPage
- [ ] XML Sitemap auto-generated
- [ ] Robots.txt configured
- [ ] Canonical tags on all pages
- [ ] OG tags (title, description, image) on all pages
- [ ] Twitter card meta tags
- [ ] Image alt tags on all images
- [ ] WebP image format for performance
- [ ] Core Web Vitals optimisation (LCP, CLS, FID)
- [ ] Mobile-first responsive design
- [ ] SSL certificate
- [ ] 301 redirects from old URLs if any
- [ ] Google Analytics 4 + Search Console
- [ ] Conversion tracking on all form submissions

---

*Document prepared by: Symprio Website Redesign Team*
*Date: March 2026*
*Theme reference: https://orbixa.themeht.com/software/*
*Color palette: Blue (#0a2d6e), Teal (#0077b6, #00b4d8), Accent (#00f5d4)*
