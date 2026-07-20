export const portfolioTemplates = [
  { id: "portfolio-grid", name: "Modèle Galerie (Grille Créative)", layout: "grid", style: "solid" },
  { id: "portfolio-terminal", name: "Modèle Terminal (MacOS Hacker)", layout: "terminal", style: "bordered" },
  { id: "portfolio-dev", name: "Modèle Développeur (Tech Minimal)", layout: "masonry", style: "bordered" },
  { id: "portfolio-modern", name: "Modèle Moderne (Web Layout)", layout: "web", style: "soft-shadow" }
];

export const templates100 = [
  // 1. Ultra-Moderne & Avant-Garde
  { id: "siliconvalley", name: "Silicon Valley (Glassmorphism)", layout: "glassmorphism", style: "solid" },
  { id: "tokyoneo", name: "Tokyo Neo (Cyberpunk / Neon)", layout: "neon", style: "bordered" },
  { id: "berlinbrutal", name: "Berlin (Néo-Brutalisme)", layout: "neobrutalism", style: "solid" },
  { id: "londonelite", name: "London Elite (Dark Minimal)", layout: "dark-minimal", style: "soft-shadow" },
  { id: "parisvogue", name: "Paris Vogue (Typographique)", layout: "typographic", style: "underlined" },

  // 2. Bannières & Gradients
  { id: "singaporenext", name: "Singapore Next (Gradient Pro)", layout: "gradient", style: "solid" },
  { id: "amsterdam", name: "Amsterdam (Bannière Solide)", layout: "banner", style: "bordered" },
  { id: "beijing", name: "Beijing (Hybride Header)", layout: "hybrid", style: "soft-shadow" },

  // 3. Sidebars (Colonnes)
  { id: "barcelone", name: "Barcelone (Sidebar Gauche 1/3)", layout: "creative", style: "solid" },
  { id: "melbourne", name: "Melbourne (Sidebar Droite 1/3)", layout: "sidebarRight", style: "compact-badge" },
  { id: "helsinki2", name: "Helsinki (Split 50/50)", layout: "split", style: "bordered" },
  { id: "mumbai", name: "Mumbai (Portfolio Style)", layout: "portfolio", style: "soft-shadow" },

  // 4. Standards & Professionnels
  { id: "cairo", name: "Cairo (Chronologique Lignes)", layout: "timeline", style: "solid" },
  { id: "sanfrancisco", name: "San Francisco (Moderne Épuré)", layout: "modern", style: "underlined" },
  { id: "oxford", name: "Oxford (Académique Rigoureux)", layout: "academic", style: "bordered" },
  { id: "istanbul", name: "Istanbul (Centré Élégant)", layout: "centered", style: "compact-badge" },
  
  // 5. Minimalistes (Classiques)
  { id: "paris", name: "Paris (Minimaliste Pur)", layout: "minimalist", style: "solid" },
  { id: "newyork", name: "New York (Classique Encadré)", layout: "classic", style: "bordered" },
  { id: "geneve", name: "Genève (Minimaliste Badge)", layout: "minimalist", style: "compact-badge" }
];


export const demoData = {
  fr: {
    personal: { name: "Jean Dupont", title: "Chef de Projet Web & Digital", email: "jean.dupont@email.com", phone: "+213 555 12 34 56", address: "Alger, Algérie", website: "linkedin.com/in/jean-web", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
    summary: "Professionnel passionné avec plus de 5 ans d'expérience dans la gestion de projets Web, la conception de sites et le marketing digital. Expertise reconnue dans la coordination d'équipes pluridisciplinaires, le pilotage de budgets et l'optimisation SEO.",
    experiences: [
      { company: "Digital Impact DZ", role: "Chef de Projet Web Senior", start: "Janv 2023", end: "Présent", desc: "• Direction d'une équipe de 8 développeurs et designers pour la refonte complète d'une plateforme e-commerce majeure.\n• Augmentation du taux de conversion de 24% grâce à l'optimisation UX/UI.\n• Gestion de portefeuilles clients d'une valeur totale de 120 000€." },
      { company: "Algiers Web Agency", role: "Chef de Projet Junior", start: "Sept 2021", end: "Déc 2022", desc: "• Planification et suivi de livraison de plus de 25 applications web et mobiles.\n• Rédaction de cahiers des charges fonctionnels et techniques.\n• Amélioration du référencement naturel (SEO) des clients de l'agence (+40% de trafic)." }
    ],
    education: [
      { school: "Université d'Alger (USTHB)", degree: "Master en Ingénierie des Systèmes d'Information", start: "2019", end: "2021", desc: "Spécialisation en architecture logicielle et méthodologies agiles (Scrum)." }
    ],
    skills: [
      { name: "Gestion de Projet (Scrum/Agile)", level: "95%" },
      { name: "HTML / CSS & Tailwind CSS", level: "90%" },
      { name: "UI/UX & Figma prototyping", level: "85%" },
      { name: "Stratégies SEO & Analytics", level: "80%" }
    ],
    qualities: [
      { name: "Autonome & Rigoureux" },
      { name: "Esprit d'équipe" },
      { name: "Capacité d'adaptation" },
      { name: "Sens de l'organisation" }
    ],
    languages: [
      { name: "Arabe", level: "Langue maternelle" },
      { name: "Français", level: "Bilingue" },
      { name: "Anglais", level: "Courant (C1)" }
    ],
    projects: [
      {
        title: "E-Commerce Dashboard",
        description: "Un tableau de bord complet pour la gestion des ventes, des stocks et de la clientèle, avec des graphiques en temps réel.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        techStack: "React, Tailwind, Node.js",
        link: "https://github.com"
      },
      {
        title: "Application Mobile Santé",
        description: "Application de suivi de santé et de fitness permettant aux utilisateurs de fixer des objectifs et de suivre leurs progrès quotidiens.",
        image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
        techStack: "Flutter, Firebase",
        link: "https://github.com"
      },
      {
        title: "Plateforme SaaS B2B",
        description: "Développement complet d'un outil de gestion de projet collaboratif intégrant un système de facturation automatisé.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        techStack: "Vue.js, Django",
        link: "https://github.com"
      },
      {
        title: "Refonte Site Vitrine",
        description: "Design et intégration d'un site web ultra rapide et optimisé pour le SEO pour une agence d'architecture de renommée.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        techStack: "Next.js, Tailwind",
        link: "https://github.com"
      }
    ]
  },
  ar: {
    personal: { name: "جان دوبون", title: "مدير مشاريع الويب والرقمية", email: "jean.dupont@email.com", phone: "+213 555 12 34 56", address: "الجزائر العاصمة، الجزائر", website: "linkedin.com/in/jean-web", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
    summary: "متخصص شغوف يتمتع بخبرة تزيد عن 5 سنوات في إدارة مشاريع الويب وتصميم المواقع والتسويق الرقمي. خبرة مثبتة في تنسيق الفرق متعددة التخصصات، توجيه الميزانيات، وتحسين محركات البحث (SEO).",
    experiences: [
      { company: "ديجيتال إمباكت للحلول الرقمية", role: "مدير مشاريع ويب أول", start: "جانفي 2023", end: "الحالي", desc: "• قيادة فريق مكون من 8 مطورين ومصممين لإعادة هيكلة منصة تجارة إلكترونية كبرى بالكامل.\n• زيادة معدل التحويل بنسبة 24% بفضل تحسين تجربة المستخدم وواجهاته (UX/UI).\n• إدارة وتوجيه محافظ عملاء بقيمة إجمالية تفوق 120,000 يورو." },
      { company: "وكالة الجزائر لتطوير الويب", role: "مدير مشاريع ويب مبتدئ", start: "سبتمبر 2021", end: "ديسمبر 2022", desc: "• تخطيط ومتابعة تسليم أكثر من 25 تطبيق ويب وهاتف محمول.\n• صياغة دفاتر الشروط الفنية والوظيفية.\n• تحسين الظهور المجاني في محركات البحث (SEO) لعملاء الوكالة (+40% في الزيارات)." }
    ],
    education: [
      { school: "جامعة العلوم والتكنولوجيا هواري بومدين", degree: "ماستر في هندسة نظم المعلومات", start: "2019", end: "2021", desc: "التخصص في هندسة البرمجيات، قواعد البيانات المتقدمة ومنهجيات العمل المرنة (Scrum)." }
    ],
    skills: [
      { name: "إدارة المشاريع (Scrum / Agile)", level: "95%" },
      { name: "تصميم واجهات المستخدم وفيكما", level: "90%" },
      { name: "تطوير الويب HTML / CSS", level: "85%" },
      { name: "التسويق الرقمي وتحسين محركات البحث", level: "80%" }
    ],
    qualities: [
      { name: "الاستقلالية والاعتماد على الذات" },
      { name: "العمل الجماعي" },
      { name: "الدقة والإنضباط" },
      { name: "قدرة عالية على التكيف" }
    ],
    languages: [
      { name: "العربية", level: "اللغة الأم" },
      { name: "الفرنسية", level: "ممتاز (ثنائية اللغة)" },
      { name: "الإنجليزية", level: "مستوى متقدم (C1)" }
    ],
    projects: [
      {
        title: "لوحة تحكم التجارة الإلكترونية",
        description: "لوحة تحكم متكاملة لإدارة المبيعات، المخزون، والعملاء مع رسوم بيانية في الوقت الفعلي.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        techStack: "React, Tailwind, Node.js",
        link: "https://github.com"
      },
      {
        title: "تطبيق الصحة واللياقة",
        description: "تطبيق لتتبع الصحة واللياقة البدنية يسمح للمستخدمين بتحديد الأهداف وتتبع تقدمهم اليومي.",
        image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
        techStack: "Flutter, Firebase",
        link: "https://github.com"
      },
      {
        title: "منصة SaaS للشركات",
        description: "تطوير أداة متكاملة لإدارة المشاريع التعاونية للشركات الصغيرة، بما في ذلك نظام للفوترة.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        techStack: "Vue.js, Django",
        link: "https://github.com"
      },
      {
        title: "إعادة تصميم موقع تعريفي",
        description: "تصميم وبرمجة موقع ويب سريع جداً ومحسن لمحركات البحث (SEO) لوكالة هندسة معمارية مشهورة.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        techStack: "Next.js, Tailwind",
        link: "https://github.com"
      }
    ]
  },
  en: {
    personal: { name: "Jean Dupont", title: "Web & Digital Project Manager", email: "jean.dupont@email.com", phone: "+213 555 12 34 56", address: "Algiers, Algeria", website: "linkedin.com/in/jean-web", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
    summary: "Passionate professional with over 5 years of experience in Web project management, web design, and digital marketing. Proven expertise in coordinating cross-functional teams, managing budgets, and SEO optimization.",
    experiences: [
      { company: "Digital Impact DZ", role: "Senior Web Project Manager", start: "Jan 2023", end: "Present", desc: "• Led a team of 8 developers and designers for the complete redesign of a major e-commerce platform.\n• Increased conversion rate by 24% through UX/UI optimization.\n• Managed client portfolios with a total value of 120,000€." },
      { company: "Algiers Web Agency", role: "Junior Project Manager", start: "Sept 2021", end: "Dec 2022", desc: "• Planned and monitored the delivery of over 25 web and mobile applications.\n• Drafted functional and technical specifications.\n• Improved SEO for agency clients resulting in a +40% increase in organic traffic." }
    ],
    education: [
      { school: "University of Algiers (USTHB)", degree: "Master in Information Systems Engineering", start: "2019", end: "2021", desc: "Specialization in software architecture and agile methodologies (Scrum)." }
    ],
    skills: [
      { name: "Project Management (Scrum/Agile)", level: "95%" },
      { name: "HTML / CSS & Tailwind CSS", level: "90%" },
      { name: "UI/UX & Figma prototyping", level: "85%" },
      { name: "SEO Strategies & Analytics", level: "80%" }
    ],
    qualities: [
      { name: "Self-motivated" },
      { name: "Team Player" },
      { name: "Detail-oriented" },
      { name: "Adaptability" }
    ],
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "French", level: "Bilingual" },
      { name: "English", level: "Fluent (C1)" }
    ],
    projects: [
      {
        title: "E-Commerce Dashboard",
        description: "A comprehensive dashboard for managing sales, inventory, and customers, featuring real-time analytics charts.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        techStack: "React, Tailwind, Node.js",
        link: "https://github.com"
      },
      {
        title: "Health & Fitness App",
        description: "Mobile application for health tracking allowing users to set goals and monitor their daily progress seamlessly.",
        image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
        techStack: "Flutter, Firebase",
        link: "https://github.com"
      },
      {
        title: "B2B SaaS Platform",
        description: "Full-stack development of a collaborative project management tool for small businesses, integrating a billing system.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        techStack: "Vue.js, Django",
        link: "https://github.com"
      },
      {
        title: "Corporate Website Redesign",
        description: "Design and integration of an ultra-fast, SEO-optimized website for a renowned architecture agency.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        techStack: "Next.js, Tailwind",
        link: "https://github.com"
      }
    ]
  }
};

export const translations = {
  fr: {
    profile: "Profil Professionnel",
    experience: "Expériences",
    education: "Formations",
    contact: "Contact",
    skills: "Compétences",
    qualities: "Qualités & Atouts",
    languages: "Langues",
    projects: "Projets & Portfolio"
  },
  en: {
    profile: "Professional Profile",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
    skills: "Skills",
    qualities: "Personal Qualities",
    languages: "Languages",
    projects: "Projects & Portfolio"
  },
  ar: {
    profile: "الملف المهني",
    experience: "الخبرات المهنية",
    education: "المؤهلات العلمية",
    contact: "معلومات الاتصال",
    skills: "المهارات",
    qualities: "السمات الشخصية",
    languages: "اللغات",
    projects: "المشاريع والأعمال"
  }
};
