import { jobModelsData } from './jobModelsData.js';

// Dictionary of localized overrides for each job model key
const translations = {
  en: {
    'cv-gratuit-en-ligne': {
      jobTitle: 'Free Online Resume',
      h1: 'Free Online Resume Builder Without Registration (Mobile & PC 2026)',
      intro: 'Your time and privacy are valuable. Our free online resume builder runs entirely in your web browser without requiring any account creation, email registration, or storing personal data on remote servers.',
      whyUse: 'Thanks to modern client-side rendering, your personal information stays stored exclusively in your browser storage (smartphone, tablet, or PC).',
      sampleCatchphrase: '« Responsive and connected professional available immediately to join your team locally or remotely. »'
    },
    'faire-cv-gratuit': {
      jobTitle: 'How to Make a Free Resume',
      h1: 'How to Make a Resume for Free: Step-by-Step Guide (2026)',
      intro: 'Knowing how to make an effective resume is an essential career skill. This step-by-step guide details the 5 essential steps to structure your ideas, select strong action verbs, and craft a resume that catches recruiters\' attention in 6 seconds.',
      whyUse: 'By following our step-by-step method, you avoid classic pitfalls (dense layouts, typos, missing keywords) and build a high-impact application.',
      sampleCatchphrase: '« Customer relationship specialist with 6 years of experience. Proven ability to handle complex disputes and retain subscribers. »'
    },
    'modeles-cv-gratuits': {
      jobTitle: 'Free Resume Templates',
      h1: 'Free Resume Template Gallery: Choose the Right Design by Sector (2026)',
      intro: 'The visual style of your resume communicates your professionalism before your text is even read. Our collection of free resume templates includes diverse designs tailored to the aesthetic standards of every industry (Finance, Tech, Healthcare, Arts).',
      whyUse: 'Each template in our collection maintains a rigorous balance between visual appeal and perfect ATS semantic readability.',
      sampleCatchphrase: '« Versatile creative professional combining execution rigor with a strong sense of visual innovation. »'
    },
    'cv-professionnel-gratuit': {
      jobTitle: 'Free Professional Resume',
      h1: 'Free Professional Resume Template for Executives, Managers & Experts (2026)',
      intro: 'For executive, expert, and managerial roles, an ordinary resume is not enough. Our free professional resume template is designed to translate your career into leadership, P&L management, strategic project control, and measurable ROI.',
      whyUse: 'This premium format applies the "Executive Summary" structure favored by headhunters and executive search firms.',
      sampleCatchphrase: '« Operations Director with 12 years of experience in industrial transformation. Managing a $5M budget and 40 staff. Increased operational margin by +18% in 2 years. »'
    },
    'cv-etudiant-gratuit': {
      jobTitle: 'Free Student Resume',
      h1: 'Free Student Resume Template (Internship, Apprenticeship & First Job 2026)',
      intro: 'Finding your first internship or student job requires a distinct strategy: compensating for lack of work experience with strong academic projects, school coursework, volunteer activities, and personal enthusiasm.',
      whyUse: 'Our student template reorganizes the resume layout to place your education, projects, and soft skills at the top.',
      sampleCatchphrase: '« Motivated M1 Finance student seeking a 6-month financial analysis internship starting March 2026. Class valedictorian, proficient in Excel and VBA. »'
    },
    'cv-sans-experience': {
      jobTitle: 'Resume Without Experience',
      h1: 'Free Resume Template Without Experience: Building Entry-Level Applications (2026)',
      intro: 'Lacking formal work history is not an obstacle to employment. By adopting the functional resume layout (focused on skill sets rather than chronological jobs), you can prove your suitability for an entry-level role.',
      whyUse: 'Helps beginners and career changers turn personal qualities, observation internships, and self-learning into strong hiring points.',
      sampleCatchphrase: '« Self-motivated candidate passionate about customer service. Excellent presentation, punctual, and eager to learn fast within your team. »'
    },
    'exemples-cv': {
      jobTitle: 'Resume Examples',
      h1: 'Free Written Resume Examples Library by Profession (2026)',
      intro: 'Finding inspiration to write strong catchphrases and selecting the exact skills for your job is now easy. Our library gathers real resume examples written by recruitment experts across 15+ key industries.',
      whyUse: 'By consulting a resume example specific to your job, you discover exact technical vocabulary and effective profile summaries.',
      sampleCatchphrase: '« HR expert-written profile summary: discover how to position your skills to convince recruiters in your sector. »'
    },
    'modele-cv-vendeur': {
      jobTitle: 'Sales Associate / Cashier',
      h1: 'Free Sales Associate Resume Template (Retail & Cashier 2026)',
      intro: 'In retail and customer service, a sales associate is the primary brand ambassador. Excellent listening skills, product knowledge, and cash register operation are essential to close sales and retain customers.',
      whyUse: 'This dynamic template highlights your customer service skills, sales achievements, and cash management capabilities to convince hiring managers in retail.',
      sampleCatchphrase: '« Dynamic Sales Associate with 3 years of experience in an international fashion brand. Passionate about customer relations and upselling. Increased add-on sales by +20%. »'
    },
    'modele-cv-comptable-word': {
      jobTitle: 'Accountant / Financial Specialist',
      seoTitle: 'Accountant Resume Template: Structure, Skills & PDF Example',
      seoDesc: 'Download our free accountant resume template. Expert tips to showcase ERP tools, annual closings, tax declarations, and financial balance sheets.',
      h1: 'Accountant Resume Template: Practical Examples & Standards 2026',
      intro: 'As an accountant, your resume must reflect your daily practice: rigorous, precise, perfectly structured, and completely error-free. Highlight your mastery of accounting standards and ERP software.',
      whyUse: 'Designed with financial recruitment experts to balance ATS readability and visual elegance.',
      sampleCatchphrase: '« Senior General Accountant with 6 years of experience in accounting firms and SMEs. Specialist in annual closings, tax declarations, and cost accounting. Reduced monthly closing time by 3 days. »'
    },
    'modele-cv-developpeur': {
      jobTitle: 'Web / Software Developer',
      seoTitle: 'Web Developer Resume Template: Examples & Tech Tips 2026',
      seoDesc: 'Resume template for web developers (Full-Stack, Front, Back). Examples of tech stack, GitHub projects, and tips to convince tech recruiters.',
      h1: 'Web Developer Resume Template: Tech Structure & Examples 2026',
      intro: 'In software engineering, technical recruiters scan your tech stack, GitHub projects, and problem-solving abilities within seconds. Present your code expertise cleanly.',
      whyUse: 'Highlights your programming languages, frameworks, system architecture skills, and open-source contributions.',
      sampleCatchphrase: '« Full-Stack Developer with 4 years of experience building scalable Web Apps in React, Node.js, and TypeScript. Reduced web app load time by 45%. »'
    },
    'modele-cv-etudiant': {
      jobTitle: 'Student / Internship / Apprenticeship',
      h1: 'Free Student Resume Template (Internship & Part-Time 2026)',
      intro: 'Finding an internship or part-time job requires highlighting academic projects, teamwork, languages, and enthusiasm to compensate for a short work history.',
      whyUse: 'Reorders the resume layout to place your education, coursework projects, and soft skills at the top.',
      sampleCatchphrase: '« Motivated Master student in Business Administration seeking a 6-month internship in digital marketing. Top 5% of class, fluent in English and French. »'
    },
    'modele-cv-debutant': {
      jobTitle: 'Entry-Level / First Job',
      seoTitle: 'Entry-Level Resume Template Without Experience: Practical Guide 2026',
      seoDesc: 'How to make a first resume with no work experience? Free template to fill out, highlighting soft skills, academic projects, and hiring tips.',
      h1: 'Entry-Level & No Experience Resume Template: Complete Guide 2026',
      intro: 'Creating a first resume without formal work history is easy when focusing on soft skills, personal initiatives, certifications, and willingness to learn.',
      whyUse: 'Balances the layout to emphasize your education, school projects, volunteer work, and soft skills.',
      sampleCatchphrase: '« Enthusiastic and punctual entry-level candidate ready to learn fast and contribute to your team\'s daily operations. »'
    },
    'modele-cv-ingenieur': {
      jobTitle: 'Engineer / Technical Specialist',
      h1: 'Free Engineer Resume Template (Tech & R&D 2026)',
      intro: 'Engineers need a clean, structured resume showing technical skills, project management metrics, CAD/CAE tools, and quantifiable results.',
      whyUse: 'Optimized for engineering recruiters looking for specific CAD tools, methodologies, and technical achievements.',
      sampleCatchphrase: '« Mechanical R&D Engineer with 5 years in automotive design. Specialized in polymer parts and FEA simulation (ANSYS). Reduced chassis weight by 12%. »'
    },
    'modele-cv-commercial': {
      jobTitle: 'Sales Representative / Account Executive',
      h1: 'Free Sales Representative Resume Template (B2B & B2C 2026)',
      intro: 'Sales resumes live or die by numbers. Highlight your quota achievements, customer acquisition metrics, pipeline management, and CRM expertise.',
      whyUse: 'Structures your past positions around revenue growth, deal sizes, and prospecting success.',
      sampleCatchphrase: '« B2B Account Executive with 5 years in SaaS sales. Exceeded annual quotas by 135% in 2025 and generated $1.2M in new ARR on Salesforce. »'
    },
    'modele-cv-designer': {
      jobTitle: 'UI/UX Designer / Creative Specialist',
      h1: 'Free Designer Resume Template (UI/UX & Graphics 2026)',
      intro: 'Showcase your visual flair while maintaining high readability. Highlight Figma skills, design systems, user research, and portfolio links.',
      whyUse: 'Balances clean typography and subtle aesthetics to impress creative directors and HR managers.',
      sampleCatchphrase: '« Senior Product Designer with 6 years experience in SaaS UI/UX design. Redesigned mobile onboarding flow, boosting conversion by 28%. »'
    },
    'modele-cv-infirmiere': {
      jobTitle: 'Nurse / Healthcare Specialist',
      h1: 'Free Nurse Resume Template (Healthcare & Clinical 2026)',
      intro: 'Healthcare resumes demand clarity regarding certifications, patient care protocols, emergency management, and hospital department experience.',
      whyUse: 'Highlights your clinical qualifications, patient care soft skills, and medical software knowledge.',
      sampleCatchphrase: '« Registered Nurse with 5 years in ER and ICU units. Expert in emergency triage, patient monitoring, and multidisciplinary care. »'
    },
    'modele-cv-restauration': {
      jobTitle: 'Waiter / Cook / Hospitality Staff',
      h1: 'Free Restaurant & Hospitality Resume Template (2026)',
      intro: 'Fast-paced hospitality jobs value speed, POS machine operation, table service, customer satisfaction, and hygiene compliance.',
      whyUse: 'Emphasizes team coordination, peak shift management, and customer service excellence.',
      sampleCatchphrase: '« Experienced Server with 4 years in high-volume dining. Skilled in wine pairing, POS systems, and managing 12+ tables per shift. »'
    },
    'modele-cv-chauffeur-livreur': {
      jobTitle: 'Delivery Driver / Logistics Worker',
      h1: 'Free Delivery Driver Resume Template (Logistics 2026)',
      intro: 'Highlight your clean driving record, route optimization, time management, and package handling reliability.',
      whyUse: 'Structures your profile around safety, punctuality, and logistics software tools.',
      sampleCatchphrase: '« Professional Delivery Driver with 4 years in urban logistics. 100% clean driving record and 99.4% on-time delivery rate. »'
    },
    'modele-cv-secretaire': {
      jobTitle: 'Executive Assistant / Secretary',
      h1: 'Free Secretary Resume Template (Administrative 2026)',
      intro: 'Administrative excellence depends on organization, calendar scheduling, correspondence, and office software mastery.',
      whyUse: 'Demonstrates your multi-tasking skills, confidentiality, and organizational precision.',
      sampleCatchphrase: '« Executive Assistant with 7 years supporting C-level executives. Specialist in travel planning, calendar management, and MS Office. »'
    }
  },
  de: {
    'cv-gratuit-en-ligne': {
      jobTitle: 'Kostenloser Online-Lebenslauf',
      h1: 'Kostenloser Online-Lebenslauf-Generator Ohne Registrierung (2026)',
      intro: 'Ihre Zeit und Privatsphäre sind wertvoll. Unser kostenloser Generator läuft direkt in Ihrem Browser ohne Registrierung oder Speicherung persönlicher Daten auf Servern.',
      whyUse: 'Dank moderner Client-Side-Technologie bleiben Ihre Daten sicher auf Ihrem eigenen Gerät (Smartphone, Tablet, PC).',
      sampleCatchphrase: '« Flexibler und vernetzter Bewerber, sofort einsatzbereit im Büro oder Homeoffice. »'
    },
    'faire-cv-gratuit': {
      jobTitle: 'Kostenlosen Lebenslauf Erstellen',
      h1: 'Wie man einen Lebenslauf kostenlos erstellt: Schritt-für-Schritt-Anleitung (2026)',
      intro: 'Ein effektiver Lebenslauf ist der Schlüssel zu Ihrer Karriere. Diese Anleitung zeigt Ihnen in 5 Schritten, wie Sie Ihre Inhalte perfekt strukturieren.',
      whyUse: 'Vermeiden Sie typische Fehler und erstellen Sie eine wirkungsvolle Bewerbung.',
      sampleCatchphrase: '« Spezialist für Kundenservice mit 6 Jahren Erfahrung. Erfahren in Beschwerdemanagement und Kundenbindung. »'
    },
    'modeles-cv-gratuits': {
      jobTitle: 'Kostenlose Lebenslauf-Vorlagen',
      h1: 'Kostenlose Lebenslauf-Vorlagen Galerie: Das passende Design wählen (2026)',
      intro: 'Das Design Ihres Lebenslaufs vermittelt Professionalität noch vor dem Lesen des Textes. Wählen Sie aus unseren branchenspezifischen Vorlagen.',
      whyUse: 'Kombiniert ansprechendes Design mit perfekter ATS-Lesbarkeit.',
      sampleCatchphrase: '« Vielseitiger Kreativprofi mit hoher Genauigkeit und Sinn für visuelle Innovation. »'
    },
    'cv-professionnel-gratuit': {
      jobTitle: 'Professioneller Lebenslauf Kostenlos',
      h1: 'Kostenlose Professionelle Lebenslauf-Vorlage für Führungskräfte & Experten (2026)',
      intro: 'Für Führungskräfte reicht ein einfacher Lebenslauf nicht aus. Zeigen Sie Führungskompetenz, Budgetverantwortung und messbare Erfolge.',
      whyUse: 'Nutzt die Executive-Struktur, die von Headhuntern bevorzugt wird.',
      sampleCatchphrase: '« Operations Director mit 12 Jahren Erfahrung. Steuerung eines 5-Mio.-€-Budgets und von 40 Mitarbeitern. »'
    },
    'cv-etudiant-gratuit': {
      jobTitle: 'Kostenloser Studenten-Lebenslauf',
      h1: 'Kostenlose Studenten Lebenslauf Vorlage (Praktikum & Nebenjob 2026)',
      intro: 'Für das erste Praktikum zählen akademische Projekte, Motivation und Soft Skills, um fehlende Berufserfahrung auszugleichen.',
      whyUse: 'Rückt Ausbildung, Kursprojekte und persönliche Stärken nach oben.',
      sampleCatchphrase: '« Motivierter BWL-Student auf der Suche nach einem 6-monatigen Praktikum im Marketing. »'
    },
    'cv-sans-experience': {
      jobTitle: 'Lebenslauf Ohne Erfahrung',
      h1: 'Kostenlose Lebenslauf-Vorlage Ohne Berufserfahrung (2026)',
      intro: 'Ohne formelle Erfahrung ist ein funktionaler Lebenslauf ideal, um Fähigkeiten, Zertifikate und Motivation hervorzuheben.',
      whyUse: 'Hilft Berufseinsteigern, persönliche Qualifikationen in starke Argumente zu verwandeln.',
      sampleCatchphrase: '« Engagierter Berufseinsteiger, pünktlich und lernbereit für Ihr Team. »'
    },
    'exemples-cv': {
      jobTitle: 'Lebenslauf-Beispiele',
      h1: 'Bibliothek Kostenloser Lebenslauf-Beispiele Nach Beruf (2026)',
      intro: 'Lassen Sie sich von echten, von Personalexperten verfassten Lebenslauf-Beispielen für über 15 Berufe inspirieren.',
      whyUse: 'Entdecken Sie passende Fachbegriffe und wirkungsvolle Einleitungssätze.',
      sampleCatchphrase: '« Muster-Profiltext: Entdecken Sie die besten Formulierungen für Ihren Beruf. »'
    },
    'modele-cv-vendeur': {
      jobTitle: 'Verkäufer / Kassierer',
      h1: 'Kostenlose Verkäufer Lebenslauf Vorlage (Einzelhandel & Kasse 2026)',
      intro: 'Im Einzelhandel ist der Verkäufer der wichtigste Markenbotschafter. Kundenberatung, Produktwissen und Beherrschung der Kasse sind entscheidend für den Verkaufserfolg.',
      whyUse: 'Hebt Ihre Kundenservice-Fähigkeiten, Verkaufszahlen und Kassenführung hervor.',
      sampleCatchphrase: '« Dynamischer Verkäufer mit 3 Jahren Erfahrung im internationalen Einzelhandel. Leidenschaftlich in Kundenberatung und Zusatzverkäufen (+20%). »'
    },
    'modele-cv-comptable-word': {
      jobTitle: 'Buchhalter / Finanzspezialist',
      h1: 'Kostenlose Buchhalter Lebenslauf Vorlage (Word & PDF 2026)',
      intro: 'Als Buchhalter muss Ihr Lebenslauf Ihre tägliche Präzision widerspiegeln: strukturiert, genau und fehlerfrei. Heben Sie Ihre Kenntnisse in Buchhaltungsstandards und ERP-Systemen hervor.',
      whyUse: 'Von Finanz-Personalexperten entwickelt für perfekte Lesbarkeit in ATS-Systemen.',
      sampleCatchphrase: '« Erfahrener Finanzbuchhalter mit 6 Jahren Erfahrung. Spezialist für Monats- und Jahresabschlüsse sowie Steuererklärungen. »'
    },
    'modele-cv-developpeur': {
      jobTitle: 'Web- / Softwareentwickler',
      h1: 'Kostenlose Entwickler Lebenslauf Vorlage (React, Node 2026)',
      intro: 'Tech-Recruiter scannen Tech-Stack, GitHub-Projekte und Problemlösungsfähigkeiten in Sekunden. Präsentieren Sie Ihren Code übersichtlich.',
      whyUse: 'Hebt Ihre Programmiersprachen, Frameworks und Software-Architektur-Kenntnisse hervor.',
      sampleCatchphrase: '« Full-Stack Entwickler mit 4 Jahren Erfahrung in skalierbaren Web-Apps (React, Node.js, TypeScript). »'
    },
    'modele-cv-etudiant': {
      jobTitle: 'Studenten-Lebenslauf',
      h1: 'Kostenlose Studenten Lebenslauf Vorlage (Praktikum & Nebenjob 2026)',
      intro: 'Die Suche nach einem Praktikum oder Nebenjob erfordert die Hervorhebung von akademischen Projekten, Teamfähigkeit und Motivation, um fehlende Berufserfahrung auszugleichen.',
      whyUse: 'Ordnet das Layout neu, um Ausbildung, Kursprojekte und persönliche Stärken oben zu platzieren.',
      sampleCatchphrase: '« Motivierter Master-Student der Betriebswirtschaftslehre sucht ein 6-monatiges Praktikum im digitalen Marketing. Top 5% der Klasse. »'
    },
    'modele-cv-debutant': {
      jobTitle: 'Berufseinsteiger / Ohne Erfahrung',
      h1: 'Lebenslauf-Vorlage für Berufseinsteiger: Praktischer Leitfaden 2026',
      intro: 'Ein Lebenslauf ohne formelle Berufserfahrung gelingt durch die Fokussierung auf Soft Skills, persönliche Initiativen, Zertifikate und Lernbereitschaft.',
      whyUse: 'Betont Ausbildung, Schulprojekte, ehrenamtliche Arbeit und Ihre persönlichen Stärken.',
      sampleCatchphrase: '« Engagierter und pünktlicher Berufseinsteiger, bereit, sich schnell einzuarbeiten und Ihr Team im Tagesgeschäft zu unterstützen. »'
    },
    'modele-cv-ingenieur': {
      jobTitle: 'Ingenieur / Projektingenieur',
      h1: 'Kostenlose Ingenieur Lebenslauf Vorlage (Technik & R&D 2026)',
      intro: 'Ingenieure benötigen einen klar strukturierten Lebenslauf mit technischen Fähigkeiten, Projektmetriken, CAD-Tools und quantifizierbaren Ergebnissen.',
      whyUse: 'Optimiert für technische Personalverantwortliche, die nach spezifischen CAD-Tools und Projektleistungen suchen.',
      sampleCatchphrase: '« R&D-Ingenieur Maschinenbau mit 5 Jahren Erfahrung. Spezialisiert auf Karosseriedesign und FEA-Simulation (ANSYS). Reduzierte das Chassisgewicht um 12%. »'
    },
    'modele-cv-commercial': {
      jobTitle: 'Vertriebsmitarbeiter / Account Manager',
      h1: 'Kostenlose Vertriebsmitarbeiter Lebenslauf Vorlage (B2B & B2C 2026)',
      intro: 'Erfolge im Vertrieb hängen von Zahlen ab. Heben Sie Ihre Quoten, Neukundengewinnung und CRM-Kenntnisse hervor.',
      whyUse: 'Strukturiert Ihre Positionen nach Umsatzwachstum, Deal-Größen und Akquise-Erfolgen.',
      sampleCatchphrase: '« B2B Account Executive mit 5 Jahren Erfahrung im SaaS-Vertrieb. Übertraf die Jahresquote um 135% in 2025. »'
    },
    'modele-cv-designer': {
      jobTitle: 'UX/UI Designer / Mediengestalter',
      h1: 'Kostenlose Designer Lebenslauf Vorlage (UI/UX & Grafik 2026)',
      intro: 'Präsentieren Sie Ihre visuelle Kreativität bei gleichzeitig hoher Lesbarkeit. Figma-Kenntnisse, Design-Systeme und Portfolio-Links hervorheben.',
      whyUse: 'Kombiniert saubere Typografie und Ästhetik, um Kreativdirektoren und HR-Manager zu beeindrucken.',
      sampleCatchphrase: '« Senior Product Designer mit 6 Jahren Erfahrung im SaaS-UX/UI-Design. Optimierte den Onboarding-Flow und steigerte die Conversion um 28%. »'
    },
    'modele-cv-infirmiere': {
      jobTitle: 'Pflegefachkraft / Krankenschwester',
      h1: 'Kostenlose Pflegefachkraft Lebenslauf Vorlage (Klinik & Pflege 2026)',
      intro: 'Lebensläufe im Gesundheitswesen erfordern Klarheit über Zertifizierungen, Patientenpflegeprotokolle und Stationserfahrung.',
      whyUse: 'Hebt Ihre klinische Qualifikation, Ihre Empathie und Ihr Wissen über medizinische Software hervor.',
      sampleCatchphrase: '« Examinierte Pflegefachkraft mit 5 Jahren Erfahrung auf der Intensivstation. Experte in Notfalltriage und Patientenüberwachung. »'
    },
    'modele-cv-restauration': {
      jobTitle: 'Kellner / Servicekraft',
      h1: 'Kostenlose Gastronomie Lebenslauf Vorlage (Service & Küche 2026)',
      intro: 'In der Gastronomie zählen Schnelligkeit, Kassenbedienung, Service-Exzellenz und die Einhaltung von Hygienevorschriften.',
      whyUse: 'Betont Teamkoordination, Belastbarkeit in Stoßzeiten und exzellenten Kundenservice.',
      sampleCatchphrase: '« Erfahrene Servicekraft mit 4 Jahren Praxis in der gehobenen Gastronomie. Kompetent in Weinberatung und Kassensystemen. »'
    },
    'modele-cv-chauffeur-livreur': {
      jobTitle: 'Auslieferungsfahrer / Kurier',
      h1: 'Kostenlose Auslieferungsfahrer Lebenslauf Vorlage (Logistik 2026)',
      intro: 'Heben Sie Ihre unfallfreie Fahrpraxis, Routenoptimierung und Zuverlässigkeit bei der Paketzustellung hervor.',
      whyUse: 'Konzentriert sich auf Sicherheit, Pünktlichkeit und die Nutzung von Logistik-Apps.',
      sampleCatchphrase: '« Zuverlässiger Auslieferungsfahrer mit 4 Jahren Erfahrung in der Stadtlogistik. Pünktlichkeitsquote von 99,4%. »'
    },
    'modele-cv-secretaire': {
      jobTitle: 'Sekretär / Assistent der Geschäftsführung',
      h1: 'Kostenlose Sekretär Lebenslauf Vorlage (Administration 2026)',
      intro: 'Administrative Exzellenz beruht auf Organisationstalent, Terminplanung, Korrespondenz und Beherrschung von Bürosoftware.',
      whyUse: 'Demonstriert Ihre Multitasking-Fähigkeiten, Diskretion und organisatorische Präzision.',
      sampleCatchphrase: '« Management-Assistent mit 7 Jahren Erfahrung in der Unterstützung von Führungskräften. Spezialist für Reise- und Terminmanagement. »'
    }
  },
  ar: {
    'cv-gratuit-en-ligne': {
      jobTitle: 'سيرة ذاتية مجانية عبر الإنترنت',
      h1: 'مولد سيرة ذاتية مجاني عبر الإنترنت بدون تسجيل (2026)',
      intro: 'وقتك وخصوصيتك من أثمن الأشياء. مولدنا المجاني يعمل مباشرة في متصفحك دون الحاجة لإنشاء حساب أو حفظ بياناتك على خوادم خارجية.',
      whyUse: 'بفضل تقنية العرض المحلية، تبقى بياناتك مخزنة بأمان في متصفح جهازك فقط.',
      sampleCatchphrase: '« محترف متصل ومرن، جاهز فوراً للانضمام لفريقكم في الموقع أو عن بُعد. »'
    },
    'faire-cv-gratuit': {
      jobTitle: 'كيف تصنع سيرة ذاتية مجاناً',
      h1: 'كيفية إنشاء سيرة ذاتية مجاناً: دليل خطوة بخطوة (2026)',
      intro: 'معرفة كيفية إنشاء سيرة ذاتية فعالة مهارة أساسية. يوضح هذا الدليل 5 خطوات لإبراز خبراتك وجذب مسؤول التوظيف في 6 ثوانٍ.',
      whyUse: 'تجنب الأخط الأخطاء الشائعة وابنِ طلب توظيف عالي التأثير.',
      sampleCatchphrase: '« متخصص في خدمة العملاء خبرة 6 سنوات. قادرة على حل المشكلات المعقدة والاحتفاظ بالعملاء. »'
    },
    'modeles-cv-gratuits': {
      jobTitle: 'نماذج سيرة ذاتية مجانية',
      h1: 'معرض نماذج سيرة ذاتية مجانية: اختر التصميم المناسب لمهنتك (2026)',
      intro: 'يعكس التصميم البصري لسيرتك الاحترافية قبل قراءة النص. اختر من مجموعتنا المتنوعة المصممة لمختلف القطاعات.',
      whyUse: 'يجمع بين التصميم الجذاب والقراءة السليمة في أنظمة التوظيف الآلية.',
      sampleCatchphrase: '« مبتكر ومتعدد المهارات يجمع بين الدقة والحس الإبداعي. »'
    },
    'cv-professionnel-gratuit': {
      jobTitle: 'سيرة ذاتية احترافية مجانية',
      h1: 'نموذج سيرة ذاتية احترافية مجانية للمدراء والخبراء (2026)',
      intro: 'للمناصب التنفيذية، السيرة العادية لا تكفي. أظهر مهارات القيادة، وإدارة الميزانيات، والمشاريع الاستراتيجية والنتائج الملموسة.',
      whyUse: 'يعتمد الهيكل التنفيذي المفضّل لدى خبراء توظيف الكفاءات العليا.',
      sampleCatchphrase: '« مدير عمليات خبرة 12 سنة في التحول الصناعي. إدارة ميزانية 5 ملايين يورو وفريق من 40 موظفاً. »'
    },
    'cv-etudiant-gratuit': {
      jobTitle: 'سيرة ذاتية للطلاب مجاناً',
      h1: 'نموذج سيرة ذاتية للطلاب للتدريب والعمل الجزئي (2026)',
      intro: 'للحصول على تدريب، ابرز المشاريع الأكاديمية والمهارات الشخصية لتعويض قلة الخبرة العملية.',
      whyUse: 'يعيد ترتيب السيرة ليرفع التعليم والمشاريع والمهارات لأعلى الصفحة.',
      sampleCatchphrase: '« طالب ماجستير في إدارة الأعمال يبحث عن تدريب لمدة 6 أشهر في التسويق الرقمي. »'
    },
    'cv-sans-experience': {
      jobTitle: 'سيرة ذاتية بدون خبرة',
      h1: 'نموذج سيرة ذاتية مجاني بدون خبرة عملية (2026)',
      intro: 'عدم وجود خبرة سابقة ليس مانعاً للتوظيف. النمط الوظيفي يركز على المهارات والشغف والشهادات الذاتية.',
      whyUse: 'يساعد المبتدئين على تحويل المؤهلات الشخصية إلى نقاط قوة إقناعية.',
      sampleCatchphrase: '« متقدم نشيط ومتحمس، منضبط وجاهز للتعلم السريع في فريقكم. »'
    },
    'exemples-cv': {
      jobTitle: 'أمثلة سيرة ذاتية',
      h1: 'مكتبة أمثلة سيرة ذاتية مكتوبة مجاناً حسب المهنة (2026)',
      intro: 'استلهم عبارات ملائمة لمهنتك واكتشف المهارات المحددة لكل قطاع من مكتبتنا المكتوبة بواسطة خبراء.',
      whyUse: 'اكتشف المصطلحات التقنية الدقيقة لكل مهنة.',
      sampleCatchphrase: '« ملخص سيرة ذاتية مكتوب بواسطة خبير توظيف: اكتشف كيف تعرض مهاراتك بإقناع. »'
    },
    'modele-cv-vendeur': {
      jobTitle: 'بائع / موظف صندوق',
      h1: 'نموذج سيرة ذاتية مجاني للبائع وموظف الصندوق (2026)',
      intro: 'في تجارة التجزئة، البائع هو السفير الأول للعلامة التجارية. الاستماع للعميل، معرفة المنتجات، وإتقان الصندوق عناصر أساسية لزيادة المبيعات.',
      whyUse: 'يسلط الضوء على مهاراتك في خدمة العملاء، وإدارة الصندوق، وتحقيق أهداف المبيعات.',
      sampleCatchphrase: '« بائع نشيط ببروز 3 سنوات خبرة في متجر ملابس عالمي. متخصص في خدمة العملاء والبيع الإضافي بنسبة +20%. »'
    },
    'modele-cv-comptable-word': {
      jobTitle: 'محاسب / خبير مالي',
      h1: 'نموذج سيرة ذاتية للمحاسب مجاني (Word و PDF 2026)',
      intro: 'كمحاسب، يجب أن تعكس سيرتك الدقة والتنظيم والخلو من الأخطاء. أبرز معرفتك بالمعايير المحاسبية وبرامج ERP.',
      whyUse: 'مصمم مع خبراء التوظيف المالي لضمان القراءة السليمة في أنظمة ATS.',
      sampleCatchphrase: '« محاسب عام خبرة 6 سنوات في المكاتب المحاسبية والشركات. متخصص في الإغلاق السنوي والإقرارات الضريبية. »'
    },
    'modele-cv-developpeur': {
      jobTitle: 'مطور ويب / برمجيات',
      h1: 'نموذج سيرة ذاتية لمطور الويب (React, Node 2026)',
      intro: 'يفحص مسؤولو توظيف التكنولوجيا المهارات ومشاريع GitHub والحلول البرمجية بسرعة. اعرض مهاراتك التقنية بنقاء.',
      whyUse: 'يبرز لغات البرمجة وأطر العمل والمهارات المعمارية للبرمجيات.',
      sampleCatchphrase: '« مطور ويب شامل خبرة 4 سنوات في بناء تطبيقات ويب باستخدام React و Node.js. »'
    },
    'modele-cv-etudiant': {
      jobTitle: 'طالب / تدريب عملي',
      h1: 'نموذج سيرة ذاتية للطلاب مجاناً (التدريب والعمل الجزئي 2026)',
      intro: 'يتطلب البحث عن تدريب أو عمل جزئي تسليط الضوء على المشاريع الأكاديمية والعمل الجماعي واللغات لتعويض قلة الخبرة العملية.',
      whyUse: 'يعيد تنظيم السيرة الذاتية ليرفع التعليم والمشاريع والمهارات الشخصية لأعلى الصفحة.',
      sampleCatchphrase: '« طالب ماجستير إدارة أعمال طموح يبحث عن تدريب لمدة 6 أشهر في التسويق الرقمي. متحدث طليق بالإنجليزية والفرنسية. »'
    },
    'modele-cv-debutant': {
      jobTitle: 'خريج جديد / بدون خبرة',
      h1: 'نموذج سيرة ذاتية للمبتدئين بدون خبرة عملية: دليل شامل 2026',
      intro: 'إنشاء أول سيرة ذاتية بدون خبرة عمل رسمية سهل عند التركيز على المهارات الشخصية والمبادرات الفردية والشهادات الذاتية.',
      whyUse: 'يبرز التعليم، المشاريع المدرسية، العمل التطوعي، والصفات الشخصية التي تهم أصحاب العمل.',
      sampleCatchphrase: '« مرشح مبتدئ نشيط ومنضبط وجاهز للتعلم السريع والمساهمة في العمل اليومي لفريقكم. »'
    },
    'modele-cv-ingenieur': {
      jobTitle: 'مهندس / مدير مشاريع تقنية',
      h1: 'نموذج سيرة ذاتية للمهندس مجاناً (التصميم والتطوير 2026)',
      intro: 'يحتاج المهندسون إلى سيرة ذاتية منظمة تعرض المهارات التقنية، وإدارة المشاريع، والبرمجيات المتخصصة، والنتائج القابلة للقياس.',
      whyUse: 'محسن لمسؤولي توظيف المهندسين الباحثين عن أدوات تصميم وإنجازات تقنية محددة.',
      sampleCatchphrase: '« مهندس أبحاث وتطوير ميكانيكي خبرة 5 سنوات في تصميم السيارات. متخصص في محاكاة FEA (برنامج ANSYS). خفّض وزن الهيكل بنسبة 12%. »'
    },
    'modele-cv-commercial': {
      jobTitle: 'مندوب مبيعات / مدير حسابات',
      h1: 'نموذج سيرة ذاتية لمندوب المبيعات مجاناً (B2B و B2C 2026)',
      intro: 'تعتمد سير المبيعات على الأرقام. أبرز نسب تحقيق الأهداف، وجذب العملاء الجدد، وإدارة علاقات العملاء CRM.',
      whyUse: 'ينظم المناصب السابقة حول نمو الإيرادات، وأحجام الصفقات، ونجاح الاستقطاب.',
      sampleCatchphrase: '« مسؤول مبيعات B2B خبرة 5 سنوات في قطاع البرمجيات SaaS. تجاوزت أهداف المبيعات بنسبة 135% لعام 2025. »'
    },
    'modele-cv-designer': {
      jobTitle: 'مصمم واجهات UX/UI / مصمم جرافيك',
      h1: 'نموذج سيرة ذاتية للمصمم مجاناً (واجهات المستخدم والجرافيك 2026)',
      intro: 'اعرض حسك الإبداعي مع الحفاظ على وضوح القراءة. أبرز مهارات Figma، وأنظمة التصميم، وروابط البورتفوليو.',
      whyUse: 'يوازن بين الخطوط الأنيقة والبساطة البصرية لإثارة إعجاب مدراء الإبداع والموارد البشرية.',
      sampleCatchphrase: '« مصمم منتجات أول خبرة 6 سنوات في تصميم واجهات SaaS. أعاد تصميم عملية التسجيل مما زاد التحويل بنسبة 28%. »'
    },
    'modele-cv-infirmiere': {
      jobTitle: 'ممرض / ممرضة / أخصائي رعاية صحية',
      h1: 'نموذج سيرة ذاتية للممرض والممرضة مجاناً (الرعاية الطبية 2026)',
      intro: 'تتطلب سير الرعاية الصحية وضوحاً تاماً في التراخيص، وبروتوكولات رعاية المرضى، وخبرة أقسام المستشفيات.',
      whyUse: 'يسلط الضوء على المؤهلات السريرية، ومهارات الرعاية، والمعرفة بالأنظمة الطبية.',
      sampleCatchphrase: '« ممرض قانوني خبرة 5 سنوات في قسم الطوارئ والعناية المركزة. متمرس في فرز الحالات ورعاية المرضى. »'
    },
    'modele-cv-restauration': {
      jobTitle: 'نادل / طاهٍ / موظف ضيافة',
      h1: 'نموذج سيرة ذاتية لقطاع المطاعم والضيافة مجاناً (2026)',
      intro: 'تقدر وظائف الضيافة السرعة، وإدارة أنظمة البيع POS، وخدمة الطاولات، والالتزام بمعايير النظافة والوقاية.',
      whyUse: 'يبرز مهارات العمل الجماعي، وإدارة ضغط ساعات الذروة، والتميز في خدمة العملاء.',
      sampleCatchphrase: '« نادل ذو خبرة 4 سنوات في المطاعم عالية الإقبال. ماهر في التعامل مع أنظمة الدفع وإدارة أكثر من 12 طاولة في الوردية. »'
    },
    'modele-cv-chauffeur-livreur': {
      jobTitle: 'سائق توصيل / عامل خدمات لوجستية',
      h1: 'نموذج سيرة ذاتية لسائق التوصيل مجاناً (الخدمات اللوجستية 2026)',
      intro: 'أبرز سجلك المروري النظيف، وقدرتك على تحسين المسارات، وإيصال الشحنات بأمان وفي الوقت المحدد.',
      whyUse: 'يركز على السلامة، والالتزام بالمواعيد، واستخدام تطبيقات الملاحة والخدمات اللوجستية.',
      sampleCatchphrase: '« سائق توصيل محترف خبرة 4 سنوات في الخدمات اللوجستية الحضرية. سجل مروري نظيف 100٪ ونسبة تسليم دقيق 99.4٪. »'
    },
    'modele-cv-secretaire': {
      jobTitle: 'سكرتير / مساعد إداري وتنفيذي',
      h1: 'نموذج سيرة ذاتية للسكرتارية مجاناً (الشؤون الإدارية 2026)',
      intro: 'يعتمد التميز الإداري على التنظيم، وجدولة المواعيد، وإدارة المراسلات، وإتقان برامج المكتب.',
      whyUse: 'يوضح مهاراتك في تعدد المهام، والسرية، والدقة التنظيمية.',
      sampleCatchphrase: '« مساعد تنفيذي خبرة 7 سنوات في دعم الإدارة العليا. متخصص في تنظيم السفر وإدارة المواعيد وبرامج MS Office. »'
    }
  }
};

export function getLocalizedJobModel(pathKey, lang = 'fr') {
  const baseModel = jobModelsData[pathKey] || jobModelsData['modele-cv-debutant'];
  if (!lang || lang === 'fr' || !translations[lang] || !translations[lang][pathKey]) {
    return baseModel;
  }
  
  const localized = translations[lang][pathKey];
  return {
    ...baseModel,
    ...localized
  };
}
