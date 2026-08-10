import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, AlertTriangle, Target, Search, Edit3, Zap, Briefcase, Award } from 'lucide-react';
import SEO from '../components/SEO';
import AdSenseUnit from '../components/AdSenseUnit';
import SocialShare from '../components/SocialShare';
import { useTranslation } from 'react-i18next';

export default function ConseilsCV() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'fr';

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const icons = [
    <Target className="w-6 h-6 text-blue-500" />,
    <Search className="w-6 h-6 text-emerald-500" />,
    <Edit3 className="w-6 h-6 text-indigo-500" />,
    <CheckCircle className="w-6 h-6 text-purple-500" />,
    <Award className="w-6 h-6 text-yellow-500" />,
    <Zap className="w-6 h-6 text-fuchsia-500" />,
    <Briefcase className="w-6 h-6 text-orange-500" />
  ];

  const adviceData = {
    fr: {
      seoTitle: "Conseils CV : Comment Rédiger un Curriculum Vitae Parfait",
      seoDesc: "Découvrez nos conseils d'experts pour rédiger un CV impactant.",
      badge: "Guide Pratique",
      title1: "Conseils pour rédiger un",
      title2: "CV impactant",
      desc: "Découvrez nos meilleures pratiques pour créer un CV qui attire l'œil des recruteurs et passe les filtres des logiciels ATS.",
      do: "À FAIRE",
      dont: "À ÉVITER",
      sections: [
        {
          title: "La Règle d'Or : Clarté et Concision avant tout",
          content: "Un recruteur passe en moyenne 6 à 10 secondes sur un CV lors de la première sélection. Utilisez des listes à puces pour détailler vos missions, privilégiez des phrases courtes et percutantes.",
          dos: ["Limiter le CV à une ou deux pages", "Mettre les expériences récentes en premier", "Quantifier vos résultats"],
          donts: ["Faire de longs paragraphes", "Ajouter des informations obsolètes", "Mettre une photo de vacances"]
        },
        {
          title: "L'importance cruciale d'adapter votre CV à l'offre",
          content: "C'est l'erreur numéro un : envoyer le même CV à 50 entreprises. Il vaut mieux envoyer 5 CVs ultra-ciblés. Repérez le vocabulaire utilisé et réintégrez ces mêmes mots-clés.",
          dos: ["Créer un titre de CV ciblé", "Mettre en avant les compétences demandées", "Ajuster l'accroche pour chaque candidature"],
          donts: ["Envoyer un document générique", "Mentir sur vos compétences", "Oublier de relire"]
        },
        {
          title: "Le design : Le fond avant la forme, mais la forme compte",
          content: "Un mauvais design donne une impression de négligence. À compétences égales, un CV clair, aéré et professionnel fera toujours la différence.",
          dos: ["Choisir des polices modernes", "Garder beaucoup d'espaces blancs", "Aligner parfaitement les dates"],
          donts: ["Utiliser trop de couleurs", "Mettre des jauges de compétences", "Utiliser des polices fantaisistes"]
        },
        {
          title: "Les Soft Skills : Votre atout secret",
          content: "Les compétences comportementales (soft skills) prouvent que vous êtes la personne avec qui l'équipe a envie de travailler. L'intelligence émotionnelle, l'adaptabilité et la communication sont très recherchées.",
          dos: ["Illustrer vos soft skills par des exemples", "Demander des recommandations LinkedIn", "Préparer des anecdotes"],
          donts: ["Lister des mots sans contexte", "Confondre traits de personnalité et soft skills", "Négliger ces compétences"]
        },
        {
          title: "Réalisations vs Tâches : Prouvez votre valeur",
          content: "La plupart se contentent de lister les tâches. Ce que le recruteur veut savoir, c'est si vous le faites BIEN. Transformez vos tâches en réalisations avec des chiffres.",
          dos: ["Utiliser des données chiffrées", "Mentionner les objectifs atteints", "Préciser l'envergure des projets"],
          donts: ["Faire un 'copier-coller' de votre fiche de poste", "Être flou", "S'attribuer le travail des autres"]
        },
        {
          title: "L'impact psychologique des verbes d'action",
          content: "Évitez les formules passives. Préférez commencer vos puces par un verbe d'action dynamique : Piloté, Créé, Développé, Optimisé. Cela donne une impression de leadership.",
          dos: ["Commencer par un verbe d'action", "Varier le vocabulaire", "Utiliser des mots forts"],
          donts: ["Utiliser le pronom 'Je'", "Employer des verbes faibles", "Mélanger les temps"]
        },
        {
          title: "Le Portfolio : Le 'Game Changer' absolu",
          content: "Un CV dit ce que vous savez faire. Un Portfolio le prouve. Mon CV Go vous permet de générer un Portfolio élégant en quelques clics.",
          dos: ["Insérer un lien vers votre Portfolio", "Sélectionner vos meilleurs projets", "Expliquer votre rôle"],
          donts: ["Ajouter un lien mort", "Mettre des projets scolaires basiques", "Laisser le recruteur chercher"]
        }
      ]
    },
    en: {
      seoTitle: "Resume Advice: How to Write a Perfect Resume",
      seoDesc: "Discover our expert tips for writing an impactful resume.",
      badge: "Practical Guide",
      title1: "Tips for writing an",
      title2: "Impactful Resume",
      desc: "Discover our best practices for creating a resume that catches the recruiter's eye and passes through ATS filters.",
      do: "DO",
      dont: "DON'T",
      sections: [
        {
          title: "The Golden Rule: Clarity and Conciseness",
          content: "A recruiter spends an average of 6 to 10 seconds on a resume. Use bullet points to detail your missions, favor short and punchy sentences.",
          dos: ["Limit the resume to one or two pages", "Put recent experiences first", "Quantify your results"],
          donts: ["Write long paragraphs", "Add outdated information", "Use a vacation photo"]
        },
        {
          title: "The Crucial Importance of Tailoring",
          content: "It's the number one mistake: sending the same resume to 50 companies. Identify the vocabulary used in the job offer and include those keywords.",
          dos: ["Create a targeted resume title", "Highlight requested skills", "Adjust your summary for each application"],
          donts: ["Send a generic document", "Lie about your skills", "Forget to proofread"]
        },
        {
          title: "Design: Substance over Form, but Form matters",
          content: "A bad design gives an impression of negligence. All else being equal, a clear, airy and professional resume will always make the difference.",
          dos: ["Choose modern fonts", "Keep plenty of white space", "Align dates perfectly"],
          donts: ["Use too many colors", "Use skill progress bars", "Use fancy fonts"]
        },
        {
          title: "Soft Skills: Your Secret Weapon",
          content: "Soft skills prove that you are the person the team wants to work with. Emotional intelligence, adaptability and communication are highly sought after.",
          dos: ["Illustrate soft skills with examples", "Ask for LinkedIn recommendations", "Prepare anecdotes"],
          donts: ["List buzzwords without context", "Confuse personality traits with soft skills", "Neglect these skills"]
        },
        {
          title: "Achievements vs Tasks: Prove your Value",
          content: "Most candidates just list tasks. The recruiter wants to know if you do them WELL. Turn your tasks into achievements with numbers.",
          dos: ["Use numerical data", "Mention achieved goals", "Specify project scope"],
          donts: ["Copy-paste your job description", "Be vague", "Take credit for others' work"]
        },
        {
          title: "The Psychological Impact of Action Verbs",
          content: "Avoid passive phrases. Start your bullet points with a dynamic action verb: Led, Created, Developed, Optimized. This gives an impression of leadership.",
          dos: ["Start with an action verb", "Vary your vocabulary", "Use strong words"],
          donts: ["Use the pronoun 'I'", "Use weak verbs", "Mix tenses illogically"]
        },
        {
          title: "The Portfolio: The Absolute Game Changer",
          content: "A resume says what you can do. A portfolio proves it. Mon CV Go allows you to generate an elegant Portfolio in just a few clicks.",
          dos: ["Include a link to your Portfolio", "Select your best projects", "Explain your role"],
          donts: ["Add a dead link", "Include basic school projects", "Make the recruiter search for it"]
        }
      ]
    },
    ar: {
      seoTitle: "نصائح السيرة الذاتية: كيف تكتب سيرة ذاتية مثالية",
      seoDesc: "اكتشف نصائح خبرائنا لكتابة سيرة ذاتية مؤثرة.",
      badge: "دليل عملي",
      title1: "نصائح لكتابة",
      title2: "سيرة ذاتية مؤثرة",
      desc: "اكتشف أفضل الممارسات لإنشاء سيرة ذاتية تلفت انتباه مسؤولي التوظيف وتتجاوز فلاتر برامج (ATS).",
      do: "افعل",
      dont: "تجنب",
      sections: [
        {
          title: "القاعدة الذهبية: الوضوح والإيجاز",
          content: "يقضي مسؤول التوظيف في المتوسط 6 إلى 10 ثوانٍ على السيرة الذاتية. استخدم النقاط لتفصيل مهامك، وفضل الجمل القصيرة والقوية.",
          dos: ["قصر السيرة الذاتية على صفحة أو صفحتين", "وضع التجارب الحديثة أولاً", "قياس نتائجك بالأرقام"],
          donts: ["كتابة فقرات طويلة", "إضافة معلومات قديمة", "استخدام صورة إجازة"]
        },
        {
          title: "الأهمية القصوى للتخصيص",
          content: "إنه الخطأ الأول: إرسال نفس السيرة الذاتية إلى 50 شركة. حدد المفردات المستخدمة في عرض العمل وقم بتضمين تلك الكلمات الرئيسية.",
          dos: ["إنشاء عنوان سيرة ذاتية مستهدف", "إبراز المهارات المطلوبة", "تعديل الملخص لكل طلب"],
          donts: ["إرسال مستند عام", "الكذب بشأن مهاراتك", "نسيان المراجعة"]
        },
        {
          title: "التصميم: المضمون قبل الشكل، لكن الشكل مهم",
          content: "التصميم السيئ يعطي انطباعًا بالإهمال. مع تساوي المهارات، السيرة الذاتية الواضحة والاحترافية ستحدث دائمًا فرقًا.",
          dos: ["اختيار خطوط حديثة", "ترك مساحات بيضاء كثيرة", "محاذاة التواريخ بدقة"],
          donts: ["استخدام ألوان كثيرة", "استخدام أشرطة تقدم للمهارات", "استخدام خطوط مزخرفة"]
        },
        {
          title: "المهارات الشخصية (Soft Skills): سلاحك السري",
          content: "تثبت المهارات الشخصية أنك الشخص الذي يريد الفريق العمل معه. الذكاء العاطفي والتكيف والتواصل مطلوبة للغاية.",
          dos: ["توضيح المهارات الشخصية بأمثلة", "طلب توصيات عبر LinkedIn", "تحضير قصص واقعية للمقابلة"],
          donts: ["سرد كلمات رنانة بدون سياق", "الخلط بين سمات الشخصية والمهارات", "إهمال هذه المهارات"]
        },
        {
          title: "الإنجازات مقابل المهام: أثبت قيمتك",
          content: "يكتفي معظم المرشحين بسرد المهام. ما يريد مسؤول التوظيف معرفته هو ما إذا كنت تؤديها بشكل جيد. حول مهامك إلى إنجازات مع أرقام.",
          dos: ["استخدام بيانات رقمية", "ذكر الأهداف المحققة", "تحديد حجم المشاريع"],
          donts: ["نسخ ولصق الوصف الوظيفي", "أن تكون غامضًا", "نسب عمل الآخرين لنفسك"]
        },
        {
          title: "التأثير النفسي لأفعال الحركة",
          content: "تجنب العبارات السلبية. ابدأ نقاطك بفعل حركة ديناميكي: قدت، أنشأت، طورت، حسّنت. هذا يعطي انطباعًا بالقيادة.",
          dos: ["البدء بفعل حركة", "تنويع المفردات", "استخدام كلمات قوية"],
          donts: ["استخدام الضمير 'أنا'", "استخدام أفعال ضعيفة", "الخلط بين الأزمنة"]
        },
        {
          title: "ملف الأعمال (البورتفوليو): يغير قواعد اللعبة",
          content: "السيرة الذاتية تقول ما يمكنك القيام به. ملف الأعمال يثبت ذلك. يتيح لك Mon CV Go إنشاء ملف أعمال أنيق في بضع نقرات.",
          dos: ["تضمين رابط لملف أعمالك", "اختيار أفضل مشاريعك", "شرح دورك"],
          donts: ["إضافة رابط معطل", "تضمين مشاريع مدرسية أساسية", "جعل مسؤول التوظيف يبحث عنه"]
        }
      ]
    }
  };

  const glossaryData = {
    fr: {
      title: "Le Glossaire du Chercheur d'Emploi",
      desc: "Ne vous perdez plus dans le jargon des ressources humaines. Voici les définitions essentielles pour comprendre le recrutement moderne.",
      terms: [
        { term: "ATS (Applicant Tracking System)", def: "Logiciel utilisé par les recruteurs pour filtrer, trier et classer automatiquement les milliers de CV reçus selon des mots-clés spécifiques. Un CV non optimisé ATS ne sera jamais lu par un humain." },
        { term: "Soft Skills (Compétences comportementales)", def: "Traits de personnalité, aptitudes sociales et intelligence émotionnelle (ex: leadership, empathie, gestion du stress). Elles sont devenues aussi importantes, voire plus, que les compétences techniques." },
        { term: "Hard Skills (Compétences techniques)", def: "Savoir-faire métier, connaissances techniques acquises par la formation ou l'expérience (ex: maîtrise d'un logiciel, programmation, comptabilité)." },
        { term: "Portfolio", def: "Dossier physique ou numérique (souvent un site web) qui rassemble des preuves de vos réalisations passées (maquettes, articles, code, photos). Indispensable dans les métiers créatifs et techniques." },
        { term: "Mots-clés (Keywords)", def: "Termes spécifiques présents dans une offre d'emploi. Les recruteurs et les algorithmes ATS cherchent ces mots exacts dans votre CV pour déterminer votre pertinence." },
        { term: "Onboarding", def: "Processus d'intégration d'un nouveau salarié au sein de l'entreprise (formations, présentation de l'équipe, prise en main des outils)." },
        { term: "Marque Employeur", def: "L'image et la réputation d'une entreprise en tant qu'employeur. Elle détermine sa capacité à attirer et retenir les meilleurs talents." }
      ]
    },
    en: {
      title: "The Job Seeker's Glossary",
      desc: "Don't get lost in HR jargon anymore. Here are the essential definitions to understand modern recruiting.",
      terms: [
        { term: "ATS (Applicant Tracking System)", def: "Software used by recruiters to automatically filter, sort, and rank thousands of received resumes based on specific keywords. A non-ATS-optimized resume will never be read by a human." },
        { term: "Soft Skills", def: "Personality traits, social aptitudes, and emotional intelligence (e.g., leadership, empathy, stress management). They have become as important, if not more, than technical skills." },
        { term: "Hard Skills", def: "Job-specific know-how, technical knowledge acquired through training or experience (e.g., software mastery, programming, accounting)." },
        { term: "Portfolio", def: "A physical or digital folder (often a website) that gathers proof of your past achievements (mockups, articles, code, photos). Essential in creative and technical professions." },
        { term: "Keywords", def: "Specific terms found in a job offer. Recruiters and ATS algorithms look for these exact words in your resume to determine your relevance." },
        { term: "Onboarding", def: "The process of integrating a new employee into the company (training, team introduction, getting familiar with tools)." },
        { term: "Employer Branding", def: "The image and reputation of a company as an employer. It determines its ability to attract and retain top talent." }
      ]
    },
    de: {
      title: "Das Glossar für Arbeitssuchende",
      desc: "Keine Verwirrung mehr bei HR-Fachbegriffen. Hier sind die wichtigsten Definitionen für das moderne Recruiting.",
      terms: [
        { term: "ATS (Applicant Tracking System)", def: "Software zur automatischen Vorfilterung und Sortierung von Bewerbungen anhand von Schlüsselwörtern. Nicht ATS-optimierte Bewerbungen werden oft gar nicht von Menschen gelesen." },
        { term: "Soft Skills (Soziale Kompetenzen)", def: "Persönlichkeitseigenschaften und soziale Fähigkeiten (z. B. Führungskompetenz, Empathie, Stressresistenz)." },
        { term: "Hard Skills (Fachkompetenzen)", def: "Fachwissen und technische Fähigkeiten, die durch Ausbildung oder Berufserfahrung erworben wurden (z. B. Softwarekenntnisse, Programmierung)." },
        { term: "Portfolio", def: "Digitale oder gedruckte Mappe zur Präsentation eigener Arbeitsproben (z. B. Designentwürfe, Artikel, Code-Beispiele)." },
        { term: "Schlüsselwörter (Keywords)", def: "Spezifische Begriffe aus der Stellenanzeige. Recruiter und ATS-Systeme suchen genau danach im Lebenslauf." },
        { term: "Onboarding", def: "Der Einarbeitungsprozess neuer Mitarbeiter im Unternehmen." },
        { term: "Arbeitgebermarke (Employer Branding)", def: "Das Ansehen eines Unternehmens als Arbeitgeber zur Gewinnung und Bindung von Talenten." }
      ]
    },
    ar: {
      title: "معجم الباحث عن عمل",
      desc: "لا تضيع في مصطلحات الموارد البشرية بعد الآن. إليك التعريفات الأساسية لفهم التوظيف الحديث.",
      terms: [
        { term: "ATS (نظام تتبع المتقدمين)", def: "برنامج يستخدمه مسؤولو التوظيف لتصفية وفرز وتصنيف آلاف السير الذاتية المستلمة تلقائيًا بناءً على كلمات رئيسية محددة. السيرة الذاتية غير المحسنة لـ ATS لن يقرأها أي إنسان أبدًا." },
        { term: "المهارات السلوكية (Soft Skills)", def: "السمات الشخصية والكفاءات الاجتماعية والذكاء العاطفي (مثل القيادة والتعاطف وإدارة الإجهاد). أصبحت مهمة، إن لم تكن أكثر، من المهارات الفنية." },
        { term: "المهارات الفنية (Hard Skills)", def: "المعرفة الخاصة بالوظيفة، المعرفة الفنية المكتسبة من خلال التدريب أو الخبرة (مثل إتقان البرامج، والبرمجة، والمحاسبة)." },
        { term: "ملف الأعمال (Portfolio)", def: "مجلد مادي أو رقمي (غالبًا موقع ويب) يجمع أدلة على إنجازاتك السابقة (النماذج، المقالات، الكود، الصور). ضروري في المهن الإبداعية والتقنية." },
        { term: "الكلمات الرئيسية (Keywords)", def: "مصطلحات محددة توجد في عرض العمل. يبحث مسؤولو التوظيف وخوارزميات ATS عن هذه الكلمات الدقيقة في سيرتك الذاتية لتحديد مدى ملاءمتك." },
        { term: "الدمج (Onboarding)", def: "عملية دمج موظف جديد في الشركة (التدريب، تقديم الفريق، التعرف على الأدوات)." },
        { term: "العلامة التجارية لصاحب العمل", def: "صورة وسمعة الشركة كصاحب عمل. تحدد قدرتها على جذب أفضل المواهب والاحتفاظ بها." }
      ]
    }
  };

  const t = adviceData[lang] || adviceData['fr'];

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
    <SEO title={t.seoTitle} description={t.seoDesc} url="https://moncvgo.com/conseils-cv" />
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-[calc(100vh-4rem)] relative overflow-hidden pb-20">
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 dark:bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 font-black text-xs uppercase tracking-widest brutal-border brutal-shadow mb-6 transform -rotate-2">
            <BookOpen className="w-4 h-4 text-slate-900" />
            {t.badge}
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
            {t.title1} <span className="bg-cyan-400 text-slate-900 px-3 py-1 mx-2 brutal-border transform rotate-2 inline-block">{t.title2}</span>
          </h1>
          <p className="mt-8 text-xl text-slate-700 dark:text-slate-300 font-bold max-w-2xl mx-auto">
            {t.desc}
          </p>
        </motion.div>
      </section>

      <AdSenseUnit />

      <section className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-8"
        >
          {t.sections.map((section, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className={`bg-white dark:bg-slate-900 p-6 sm:p-8 brutal-border brutal-shadow-lg transition-smooth brutal-hover ${idx % 2 === 0 ? 'transform rotate-1' : 'transform -rotate-1'}`}
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center brutal-border brutal-shadow transform -rotate-3 ${idx % 3 === 0 ? 'bg-rose-200' : idx % 3 === 1 ? 'bg-amber-200' : 'bg-sky-200'}`}>
                  {React.cloneElement(icons[idx % icons.length], { className: "w-8 h-8 sm:w-10 sm:h-10 text-slate-900", strokeWidth: 2.5 })}
                </div>
                <div className="flex-grow">
                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-4">{section.title}</h2>
                  <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-medium leading-loose mb-8">
                    {section.content}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6 mt-6">
                    <div className="bg-sky-100 dark:bg-sky-900/40 brutal-border p-6 text-slate-900 dark:text-white transform rotate-1">
                      <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-sky-700 dark:text-sky-300">
                        <CheckCircle className="w-6 h-6" strokeWidth={3} /> {t.do}
                      </h3>
                      <ul className="space-y-4">
                        {section.dos.map((item, i) => (
                          <li key={i} className="text-base sm:text-lg font-medium flex items-start gap-3 leading-relaxed">
                            <span className="w-2 h-2 brutal-border bg-sky-500 mt-2 shrink-0"></span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-rose-100 dark:bg-rose-900/40 brutal-border p-6 text-slate-900 dark:text-white transform -rotate-1">
                      <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-rose-700 dark:text-rose-300">
                        <AlertTriangle className="w-6 h-6" strokeWidth={3} /> {t.dont}
                      </h3>
                      <ul className="space-y-4">
                        {section.donts.map((item, i) => (
                          <li key={i} className="text-base sm:text-lg font-medium flex items-start gap-3 leading-relaxed">
                            <span className="w-2 h-2 brutal-border bg-rose-500 mt-2 shrink-0"></span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Model Links Section */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 p-1 brutal-border brutal-shadow-lg">
          <div className="bg-white dark:bg-slate-900 p-8 text-center">
            <h3 className="text-2xl font-black uppercase text-slate-900 dark:text-white mb-4">
              Explorez nos modèles de CV gratuits par métier
            </h3>
            <p className="text-slate-700 dark:text-slate-300 font-bold mb-6 max-w-2xl mx-auto">
              Chaque métier a ses exigences. Choisissez un modèle de CV pré-rempli et optimisé ATS adapté à votre secteur d'activité.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/modele-cv-comptable-word" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs uppercase tracking-wider brutal-border hover:bg-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-slate-900 transition-colors">Modèle CV Comptable</Link>
              <Link to="/modele-cv-developpeur" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs uppercase tracking-wider brutal-border hover:bg-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-slate-900 transition-colors">Modèle CV Développeur</Link>
              <Link to="/modele-cv-etudiant" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs uppercase tracking-wider brutal-border hover:bg-pink-400 dark:hover:bg-pink-400 dark:hover:text-slate-900 transition-colors">Modèle CV Étudiant</Link>
              <Link to="/modele-cv-commercial" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs uppercase tracking-wider brutal-border hover:bg-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-slate-900 transition-colors">Modèle CV Commercial</Link>
              <Link to="/modele-cv-infirmiere" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs uppercase tracking-wider brutal-border hover:bg-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-slate-900 transition-colors">Modèle CV Infirmière</Link>
              <Link to="/modele-cv-ingenieur" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs uppercase tracking-wider brutal-border hover:bg-purple-400 dark:hover:bg-purple-400 dark:hover:text-slate-900 transition-colors">Modèle CV Ingénieur</Link>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 bg-white dark:bg-slate-900 p-8 brutal-border brutal-shadow flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-6">Partagez ce guide avec votre réseau</h3>
          <SocialShare url="https://moncvgo.com/conseils-cv" title={t.seoTitle} />
        </div>

        {/* Glossary Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-20 bg-white dark:bg-slate-900 p-8 sm:p-12 brutal-border brutal-shadow-lg"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-4">{glossaryData[lang]?.title || glossaryData['fr'].title}</h2>
            <p className="text-slate-700 dark:text-slate-300 font-bold max-w-2xl mx-auto text-lg">{glossaryData[lang]?.desc || glossaryData['fr'].desc}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {(glossaryData[lang]?.terms || glossaryData['fr'].terms).map((item, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-6 brutal-border transform hover:-translate-y-1 transition-transform">
                <h3 className="text-xl font-black text-indigo-600 dark:text-indigo-400 mb-3">{item.term}</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{item.def}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
    </div>
  );
}
