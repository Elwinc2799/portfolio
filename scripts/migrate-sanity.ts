/**
 * Sanity data migration — portfolio overhaul
 * Run with: bun run scripts/migrate-sanity.ts
 */

const PROJECT_ID = "zo3arsq9";
const DATASET = "production";
const API_VERSION = "2021-10-21";
const TOKEN = process.env.SANITY_API_TOKEN!;
const BASE_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data`;

async function mutate(mutations: object[]) {
  const res = await fetch(`${BASE_URL}/mutate/${DATASET}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error("Mutation failed:", JSON.stringify(json, null, 2));
    throw new Error(`HTTP ${res.status}`);
  }
  return json;
}

// ─── IDs from existing data ─────────────────────────────────────────────────
const EXISTING = {
  // pageInfo
  pageInfo: null as string | null, // will query

  // experiences to delete
  exp_barista: "536a02b6-962d-4021-a5dc-3bde37021d32",
  exp_teacher: "9784efcf-e52b-4ee9-9e67-84294ecc11dd",
  exp_dell: "6b2fbfd0-29f3-46da-9be3-0e5c18d91f52",

  // projects to delete
  proj_wellyfe: "3001bb65-b9b0-4d4c-b0eb-c7edce334b69",
  proj_freegigs: "552ee04b-0210-431c-8da6-204d57d62d38",
  proj_qsar: "582b671d-31f8-4a22-a2b0-fec1c0997f52",

  // skills to delete (outdated)
  skill_mongodb: "086231be-74e6-4e32-bed3-940e7538da09",
  skill_react: "201cd80a-918f-487a-91d7-09d94894a970",
  skill_firebase: "2b3bd9aa-8ad8-417e-b86f-d97f850a31df",
  skill_html: "2c98017d-8d61-472c-b8d6-45e64292f822",
  skill_tensorflow: "5d457a24-306d-4f87-aa4e-65d4486ca773",
  skill_tailwind: "cbf1e95f-2eb1-4b12-b68b-92a13fa0e736",
  skill_javascript: "cddb4102-6022-470b-9883-a73887af1d43",
  skill_css: "d2da956e-dd76-44c1-a0d3-ec97e50f24c8",
  skill_cpp: "b769b5a5-f866-48bf-a3e1-444e1ae2ccd8",
  skill_dart: "b881db0a-0169-4240-9e81-0a0b43806f09",
  skill_java: "eb19bcda-6631-4e98-bf9e-35762fb8d498",
  skill_r: "d1de8f9f-0f83-460c-a4c7-efa0535f88a6",

  // skills to keep & update
  skill_python: "3714e4e7-d5ed-4e10-b115-bf9b2b0e8442",
  skill_sql: "8ce2588d-2241-4246-b89a-2a1155898f8f",
  skill_postgresql: "33880c08-c735-4829-ab5d-5d37afef163c",
  skill_nextjs: "e4633ef7-6e91-4e94-a63f-92b6eb191d37",
  skill_typescript: "8dfd94b1-d11f-4ddf-ab43-5b252631d59f",
  skill_nodejs: "0adae4b0-76cc-4212-86b3-1ec446d32506",
  skill_flutter: "35df26e7-8d9e-4662-933b-1a38e2a2a2e2",
  skill_git: "db3f83d3-5944-4df1-b02b-7fe92797f53f",
};

async function getPageInfoId(): Promise<string> {
  const res = await fetch(
    `${BASE_URL}/query/${DATASET}?query=${encodeURIComponent('*[_type == "pageInfo"][0]._id')}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  const json = await res.json();
  return json.result;
}

// ─── STEP 1: Delete outdated data ───────────────────────────────────────────
async function step1_deleteOutdated() {
  console.log("\n📦 Step 1: Deleting outdated docs...");
  await mutate([
    { delete: { id: EXISTING.exp_barista } },
    { delete: { id: EXISTING.exp_teacher } },
    { delete: { id: EXISTING.proj_wellyfe } },
    { delete: { id: EXISTING.proj_freegigs } },
    { delete: { id: EXISTING.proj_qsar } },
    { delete: { id: EXISTING.skill_mongodb } },
    { delete: { id: EXISTING.skill_react } },
    { delete: { id: EXISTING.skill_firebase } },
    { delete: { id: EXISTING.skill_html } },
    { delete: { id: EXISTING.skill_tensorflow } },
    { delete: { id: EXISTING.skill_tailwind } },
    { delete: { id: EXISTING.skill_javascript } },
    { delete: { id: EXISTING.skill_css } },
    { delete: { id: EXISTING.skill_cpp } },
    { delete: { id: EXISTING.skill_dart } },
    { delete: { id: EXISTING.skill_java } },
    { delete: { id: EXISTING.skill_r } },
  ]);
  console.log("✓ Deleted outdated experiences, projects, and skills");
}

// ─── STEP 2: Update existing skills ─────────────────────────────────────────
async function step2_updateSkills() {
  console.log("\n🔧 Step 2: Updating existing skills...");
  await mutate([
    { patch: { id: EXISTING.skill_python, set: { title: "Python", progress: 90 } } },
    { patch: { id: EXISTING.skill_sql, set: { title: "SQL", progress: 85 } } },
    { patch: { id: EXISTING.skill_postgresql, set: { title: "PostgreSQL", progress: 70 } } },
    { patch: { id: EXISTING.skill_nextjs, set: { title: "Next.js", progress: 75 } } },
    { patch: { id: EXISTING.skill_typescript, set: { title: "TypeScript", progress: 70 } } },
    { patch: { id: EXISTING.skill_nodejs, set: { title: "Node.js", progress: 65 } } },
    { patch: { id: EXISTING.skill_flutter, set: { title: "Flutter", progress: 60 } } },
    { patch: { id: EXISTING.skill_git, set: { title: "Git", progress: 80 } } },
  ]);
  console.log("✓ Updated existing skills");
}

// ─── STEP 3: Create new skills ───────────────────────────────────────────────
async function step3_createSkills() {
  console.log("\n✨ Step 3: Creating new skills...");
  const newSkills = [
    { title: "LangChain", progress: 85 },
    { title: "Azure", progress: 85 },
    { title: "Dagster", progress: 80 },
    { title: "Docker", progress: 75 },
    { title: "PyTorch", progress: 70 },
    { title: "Streamlit", progress: 75 },
    { title: "Minio", progress: 65 },
    { title: "Dremio", progress: 65 },
    { title: "Apache Iceberg", progress: 65 },
    { title: "Power Automate", progress: 75 },
    { title: "Copilot Studio", progress: 70 },
    { title: "Flask", progress: 70 },
    { title: "BeautifulSoup", progress: 75 },
    { title: "Pandas", progress: 80 },
    { title: "NumPy", progress: 75 },
    { title: "Plotly", progress: 75 },
    { title: "Paramiko", progress: 70 },
    { title: "Jupyter Notebook", progress: 80 },
    { title: "NoSQL", progress: 70 },
    { title: "ServiceNow", progress: 65 },
  ];

  const mutations = newSkills.map((skill) => ({
    create: {
      _type: "skill",
      title: skill.title,
      progress: skill.progress,
    },
  }));

  const result = await mutate(mutations);
  console.log(`✓ Created ${newSkills.length} new skills`);
  return result;
}

// ─── STEP 4: Update pageInfo ─────────────────────────────────────────────────
async function step4_updatePageInfo() {
  console.log("\n👤 Step 4: Updating pageInfo...");
  const id = await getPageInfoId();
  await mutate([
    {
      patch: {
        id,
        set: {
          name: "Elwin Chiong Zhen Hui",
          role: "AI Systems Engineer",
          backgroundInformation:
            "AI Systems Engineer with 2+ years of experience building production AI solutions, cloud infrastructure, and data pipelines. Proficient in Python, LangChain, Azure, and LLM tooling. Currently at ams OSRAM, previously delivered AI-driven automation and data platforms at AMD Global Services. Passionate about applying AI at scale to solve real engineering problems.",
          phoneNumber: "+601139022271",
          email: "elwinczh@gmail.com",
          address: "Seremban, Negeri Sembilan, Malaysia · Open to remote or relocation to Penang / KL",
        },
      },
    },
  ]);
  console.log("✓ Updated pageInfo");
}

// ─── STEP 5: Update Dell experience ──────────────────────────────────────────
async function step5_updateDell() {
  console.log("\n💼 Step 5: Updating Dell experience...");
  await mutate([
    {
      patch: {
        id: EXISTING.exp_dell,
        set: {
          jobTitle: "Data Analyst Intern",
          company: "Dell Technologies, Penang, Malaysia",
          dateStarted: "2022-03-01",
          dateEnded: "2022-09-30",
          isCurrentlyWorkingHere: false,
          points: [
            "Responsible for the Data Analytic Enhancement Project, creating SQL queries to collect manufacturing data from multiple sources into a single data source, decreasing data collection time from a few hours to 1–3 minutes per report (90% faster).",
            "Analyzed collected data and built dashboards using Python and Plotly in Jupyter Notebook.",
            "Assisted in timely ad-hoc data query tasks from the New Product Introduction Team using SQL.",
            "Assisted in project planning and management (requirement elicitation and analysis) for the Data Analytic Enhancement Project.",
          ],
        },
      },
    },
  ]);
  console.log("✓ Updated Dell experience");
}

// ─── STEP 6: Create AMD experience ───────────────────────────────────────────
async function step6_createAMD() {
  console.log("\n🏢 Step 6: Creating AMD experience...");
  await mutate([
    {
      create: {
        _type: "experience",
        jobTitle: "AI Cloud and IT Infrastructure Engineer",
        company: "AMD Global Services, Penang, Malaysia",
        dateStarted: "2023-09-01",
        dateEnded: "2025-10-31",
        isCurrentlyWorkingHere: false,
        points: [
          "Contributed to an AI data platform project, building data pipelines using Dagster, Minio, Dremio, Iceberg, Python, SQL, and LLMs for AI dashboards and analytics.",
          "Led a collaboration platform migration project using Python, LangChain, LLMs, Docker, BeautifulSoup, and Confluence REST API, automating content transfer from legacy platforms.",
          "Completed a PoC for AI-based infrastructure monitoring using Python, LLMs, LangChain, and Streamlit, delivering real-time insights on resources, performance, and cost.",
          "Developed an AI-powered bot for collaboration platforms using Power Automate and Copilot Studio, enabling users to query uploaded files in OneDrive via chat.",
          "Integrated internal AI tools (GitHub Copilot, AI Chatbots, AI Doc/Code Scan) into team workflows, improving operational efficiency by 30%.",
          "Provisioned and configured Azure VMs, private endpoints, storage accounts, databases, Azure Functions, Event Grids, Azure Managed Grafana, and Databricks with Unity Catalog.",
          "Automated TWiki account creation and profile issue resolutions via Python and shell scripting, cutting SLA times by 30%.",
          "Developed a Python tool using threading and Paramiko for parallel network performance testing on multi-NIC GPU nodes, accelerating testing by 90%.",
        ],
      },
    },
  ]);
  console.log("✓ Created AMD experience");
}

// ─── STEP 7: Create ams OSRAM experience ────────────────────────────────────
async function step7_createAmsOsram() {
  console.log("\n🌟 Step 7: Creating ams OSRAM experience (current)...");
  await mutate([
    {
      create: {
        _type: "experience",
        jobTitle: "AI Systems Engineer",
        company: "ams OSRAM, Penang, Malaysia",
        dateStarted: "2025-10-01",
        isCurrentlyWorkingHere: true,
        points: [
          "Designing and building AI systems and infrastructure to accelerate engineering workflows and operational efficiency.",
        ],
      },
    },
  ]);
  console.log("✓ Created ams OSRAM experience");
}

// ─── STEP 8: Create projects ─────────────────────────────────────────────────
async function step8_createProjects() {
  console.log("\n🚀 Step 8: Creating projects...");
  await mutate([
    {
      create: {
        _type: "project",
        title: "ClickBites — ABSA Restaurant Recommendation System",
        summary:
          "Full-stack restaurant recommendation system leveraging Aspect-Based Sentiment Analysis (ABSA). Fine-tuned BERT for aspect term extraction (food, service, price, ambience) and applied VADER sentiment scoring. Used cosine similarity on 5D preference vectors to generate personalized, explainable recommendations from the Yelp Open Dataset and Malaysian restaurant data.",
        linkToBuild:
          "https://github.com/Elwinc2799/ClickBites-ABSA-Restaurant-Recommendation-System",
      },
    },
    {
      create: {
        _type: "project",
        title: "AI Data Platform Pipeline — AMD (Internal)",
        summary:
          "Production AI data platform at AMD Global Services. Built orchestrated data pipelines using Dagster, Minio, Dremio, and Apache Iceberg with Python, SQL, and LLMs. Enabled AI-powered dashboards and analytics for infrastructure teams, improving data access and operational visibility across the organisation.",
        linkToBuild: "https://www.linkedin.com/in/elwin-chiong-3602b5222/",
      },
    },
    {
      create: {
        _type: "project",
        title: "AI Infrastructure Monitoring PoC — AMD (Internal)",
        summary:
          "Proof-of-concept AI monitoring tool for cloud infrastructure at AMD. Built with Python, LangChain, LLMs, and Streamlit to deliver real-time insights on Azure resource usage, performance metrics, and cost. Reduced issue detection time and improved cost oversight for infrastructure teams.",
        linkToBuild: "https://www.linkedin.com/in/elwin-chiong-3602b5222/",
      },
    },
    {
      create: {
        _type: "project",
        title: "GPU Node Performance Testing Tool — AMD (Internal)",
        summary:
          "Multithreaded network performance testing tool for multi-NIC GPU nodes at AMD. Built with Python, threading, and Paramiko for parallel SSH-based testing across GPU nodes. Accelerated GPU node validation speed by 90%, significantly reducing infrastructure commissioning time.",
        linkToBuild: "https://www.linkedin.com/in/elwin-chiong-3602b5222/",
      },
    },
  ]);
  console.log("✓ Created 4 projects");
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  if (!TOKEN) {
    console.error("❌ SANITY_API_TOKEN not set");
    process.exit(1);
  }
  console.log("🚀 Starting Sanity migration for portfolio overhaul...");
  console.log(`   Project: ${PROJECT_ID} / Dataset: ${DATASET}\n`);

  await step1_deleteOutdated();
  await step2_updateSkills();
  await step3_createSkills();
  await step4_updatePageInfo();
  await step5_updateDell();
  await step6_createAMD();
  await step7_createAmsOsram();
  await step8_createProjects();

  console.log("\n✅ Migration complete!");
  console.log("   pageInfo, skills, experiences, and projects are all updated.");
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
