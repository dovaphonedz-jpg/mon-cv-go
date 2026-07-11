
// --- AUTO-ADJUST PREVIEW CONTAINER HEIGHT FOR MOBILE ---
function adjustPreviewHeight() {
  if (window.innerWidth <= 1024) {
    const page = document.querySelector('.cv-page') || document.querySelector('#letter-preview');
    const container = document.querySelector('.cv-preview-container') || document.getElementById('preview-wrapper');
    if (page && container) {
      const style = window.getComputedStyle(page);
      if (style.transform && style.transform !== 'none') {
        const matrix = new DOMMatrixReadOnly(style.transform);
        const scale = matrix.a || 1;
        const scaledHeight = page.offsetHeight * scale;
        // Add 40px padding
        container.style.setProperty('height', (scaledHeight + 40) + 'px', 'important');
      } else {
        container.style.removeProperty('height');
      }
    }
  } else {
    const container = document.querySelector('.cv-preview-container') || document.getElementById('preview-wrapper');
    if (container) container.style.removeProperty('height');
  }
}

window.addEventListener('resize', adjustPreviewHeight);

// Set up observer once DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.cv-page') || document.querySelector('#letter-preview');
  if (page) {
    const observer = new MutationObserver(() => {
      // Debounce the adjustment slightly to avoid lag during fast typing
      clearTimeout(window.adjustTimeout);
      window.adjustTimeout = setTimeout(adjustPreviewHeight, 100);
    });
    observer.observe(page, { childList: true, subtree: true, characterData: true, attributes: true });
    setTimeout(adjustPreviewHeight, 500);
  }
});
// Hook into form inputs as a fallback
document.addEventListener('input', () => {
  clearTimeout(window.adjustTimeout);
  window.adjustTimeout = setTimeout(adjustPreviewHeight, 200);
});

// --- Nettoyeur d'URL (Hides .html and empty hash) ---
window.addEventListener('DOMContentLoaded', () => {
  let url = new URL(window.location.href);
  let changed = false;
  
  if (url.pathname.endsWith('/index.html')) {
    url.pathname = url.pathname.replace('/index.html', '/');
    changed = true;
  } else if (url.pathname.endsWith('.html')) {
    url.pathname = url.pathname.replace('.html', '');
    changed = true;
  }
  
  if (changed || window.location.href.endsWith('#')) {
    let finalUrl = url.toString();
    if (finalUrl.endsWith('#')) finalUrl = finalUrl.slice(0, -1);
    window.history.replaceState({}, document.title, finalUrl);
  }
});
// Defensive wrappers to prevent crashes if CDNs are blocked or localStorage is restricted
function safeCreateIcons() {
  if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
    try {
      lucide.createIcons();
    } catch (e) {
      console.warn("Lucide icons failed to render", e);
    }
  }
}

function safeConfetti(options) {
  if (typeof confetti === "function") {
    try {
      confetti(options);
    } catch (e) {
      console.warn("Confetti failed to launch", e);
    }
  }
}

// Translations dictionary
const translations = {
  fr: {
    steps: {
      style: "1. Modèle & Style",
      personal: "2. Infos Personnelles",
      experience: "3. Expériences",
      education: "4. Éducation",
      skills: "5. Compétences",
      summary: "6. Description"
    },
    labels: {
      cvLanguage: "Langue du CV (Sens du texte)",
      template: "Sélectionnez votre modèle (100 modèles)",
      accentColor: "Couleur d'accent",
      font: "Police de caractères",
      name: "Nom complet",
      title: "Titre du profil (ex: Développeur Web)",
      email: "Adresse Email",
      phone: "Téléphone",
      address: "Adresse / Ville",
      website: "Site Web / LinkedIn",
      photo: "Photo de profil",
      photoDesc: "Formats JPG, PNG. Max 2Mo.",
      summary: "À propos de moi (Accroche)",
      summaryPlaceholder: "Décrivez vos compétences clés et vos objectifs en quelques lignes...",
      company: "Entreprise",
      role: "Poste occupé",
      start: "Date de début",
      end: "Date de fin (ou Actuel)",
      desc: "Description des tâches / Réalisations",
      descPlaceholder: "Détaillez vos missions principales, projets et technologies utilisées...",
      school: "Établissement",
      degree: "Diplôme / Formation",
      skillName: "Nom de la compétence",
      skillLevel: "Niveau",
      langName: "Langue",
      langLevel: "Niveau (ex: Bilingue, C1, Courant)",
      fontSize: "Taille du texte CV",
      textColor: "Couleur du Texte",
      spacing: "Espacement du CV",
      compact: "Compact",
      normal: "Normal",
      generous: "Spacieux"
    },
    buttons: {
      addExp: "Ajouter une expérience",
      addEdu: "Ajouter un diplôme",
      addSkill: "Ajouter une compétence",
      addLang: "Ajouter une langue",
      remove: "Retirer",
      demo: "Exemple",
      reset: "Effacer",
      prev: "Précédent",
      next: "Suivant",
      download: "Télécharger PDF",
      unlock: "Regardez la vidéo pour déverrouiller...",
      unlocked: "Télécharger mon CV PDF (Débloqué !)"
    },
    modal: {
      badge: "Déverrouillage Gratuit",
      title: "Votre CV est presque prêt !",
      desc: "Regardez cette courte vidéo de 15 secondes pour déverrouiller instantanément le téléchargement HD de votre CV. Grâce à nos partenaires, ce service reste 100% gratuit !",
      play: "Cliquez pour lancer la vidéo",
      pause: "Vidéo mise en pause !",
      pauseDesc: "Veuillez lire la vidéo jusqu'au bout pour débloquer votre CV.",
      remaining: " secondes restantes",
      finished: "Félicitations ! Votre CV est déverrouillé !"
    }
  },
  ar: {
    steps: {
      style: "1. النموذج والنمط",
      personal: "2. المعلومات الشخصية",
      experience: "3. الخبرات المهنية",
      education: "4. التعليم والدراسة",
      skills: "5. المهارات واللغات",
      summary: "6. نبذة شخصية"
    },
    labels: {
      cvLanguage: "لغة السيرة الذاتية (اتجاه النص)",
      template: "اختر قالبك (100 قالب احترافي)",
      accentColor: "اللون الأساسي",
      font: "نوع الخط",
      name: "الاسم الكامل",
      title: "المسمى الوظيفي (مثال: مطور ويب)",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      address: "العنوان / المدينة",
      website: "الموقع الإلكتروني / لينكد إن",
      photo: "الصورة الشخصية",
      photoDesc: "صيغة JPG أو PNG. أقصى حجم 2 ميغا.",
      summary: "نبذة عني (الملخص التجاري)",
      summaryPlaceholder: "صف مهاراتك الأساسية وأهدافك المهنية في بضعة أسطر...",
      company: "الشركة / المؤسسة",
      role: "المنصب الوظيفي",
      start: "تاريخ البدء",
      end: "تاريخ الانتهاء (أو الحالي)",
      desc: "الوصف والمهام المنجزة",
      descPlaceholder: "اشرح مهامك الرئيسية ومسؤولياتك والمشاريع المنجزة...",
      school: "المدرسة / الجامعة",
      degree: "الشهادة / التخصص",
      skillName: "اسم المهارة",
      skillLevel: "المستوى",
      langName: "اللغة",
      langLevel: "مستوى اللغة (مثال: ممتاز، متوسط، اللغة الأم)",
      fontSize: "حجم خط السيرة الذاتية",
      textColor: "لون النص",
      spacing: "التباعد والمسافات",
      compact: "مكثف",
      normal: "عادي",
      generous: "متباعد"
    },
    buttons: {
      addExp: "إضافة خبرة مهنية",
      addEdu: "إضافة شهادة تعليمية",
      addSkill: "إضافة مهارة جديدة",
      addLang: "إضافة لغة جديدة",
      remove: "حذف",
      demo: "نموذج تجريبي",
      reset: "مسح البيانات",
      prev: "السابق",
      next: "التالي",
      download: "تحميل PDF",
      unlock: "شاهد الفيديو لفتح التحميل...",
      unlocked: "تحميل السيرة الذاتية بصيغة PDF (مفتوح!)"
    },
    modal: {
      badge: "تحميل مجاني بالكامل",
      title: "سيرتك الذاتية جاهزة تقريباً !",
      desc: "شاهد هذا الفيديو القصير لمدة 15 ثانية لفتح التحميل المباشر وعالي الجودة لسيرتك الذاتية مجاناً. بفضل شركائنا، تبقى هذه الخدمة مجانية 100%!",
      play: "انقر لتشغيل الفيديو والبدء",
      pause: "تم إيقاف الفيديو مؤقتاً !",
      pauseDesc: "يرجى مواصلة تشغيل الفيديو حتى النهاية لفتح تحميل سيرتك الذاتية.",
      remaining: " ثوانٍ متبقية",
      finished: "تهانينا! سيرتك الذاتية جاهزة للتحميل الآن !"
    }
  },
  en: {
    steps: {
      style: "1. Template & Style",
      personal: "2. Personal Info",
      experience: "3. Work Experience",
      education: "4. Education",
      skills: "5. Skills & Languages",
      summary: "6. Summary"
    },
    labels: {
      cvLanguage: "CV Language (Text direction)",
      template: "Select CV template (100 Templates)",
      accentColor: "Accent Color",
      font: "Typography Font",
      name: "Full Name",
      title: "Professional Title (e.g. Web Developer)",
      email: "Email Address",
      phone: "Phone Number",
      address: "Address / City",
      website: "Website / LinkedIn",
      photo: "Profile Picture",
      photoDesc: "Formats JPG, PNG. Max 2MB.",
      summary: "Professional Summary",
      summaryPlaceholder: "Describe your core skills and career objectives in a few lines...",
      company: "Company Name",
      role: "Job Role",
      start: "Start Date",
      end: "End Date (or Present)",
      desc: "Key Responsibilities / Achievements",
      descPlaceholder: "Detail your primary missions, key projects, and tools used...",
      school: "Institution / School",
      degree: "Degree / Qualification",
      skillName: "Skill Name",
      skillLevel: "Proficiency Level",
      langName: "Language",
      langLevel: "Level (e.g. Bilingual, Fluent, Native)",
      fontSize: "Text Font Size",
      textColor: "Text Color",
      spacing: "Page Spacing",
      compact: "Compact",
      normal: "Normal",
      generous: "Generous"
    },
    buttons: {
      addExp: "Add Work Experience",
      addEdu: "Add Education",
      addSkill: "Add Skill",
      addLang: "Add Language",
      remove: "Remove",
      demo: "Load Demo",
      reset: "Clear All",
      prev: "Previous",
      next: "Next",
      download: "Download PDF",
      unlock: "Watch video to unlock download...",
      unlocked: "Download my CV as PDF (Unlocked!)"
    },
    modal: {
      badge: "100% Free Unlock",
      title: "Your CV is almost ready!",
      desc: "Watch this short 15-second video to instantly unlock the high-definition PDF download of your resume. Thanks to our sponsors, this service remains completely free!",
      play: "Click to start the video",
      pause: "Video paused!",
      pauseDesc: "Please watch the video to the end to unlock your PDF download.",
      remaining: " seconds remaining",
      finished: "Congratulations! Your CV is now unlocked!"
    }
  }
};

// 25 premium city templates mapping layouts and styles
const templates100 = [
  { id: "paris", name: "Modèle Paris (Minimaliste Pur)", layout: "minimalist", style: "solid" },
  { id: "londres", name: "Modèle Londres (Minimaliste Encadré)", layout: "minimalist", style: "bordered" },
  { id: "milan", name: "Modèle Milan (Minimaliste Souligné)", layout: "minimalist", style: "underlined" },
  { id: "geneve", name: "Modèle Genève (Minimaliste Moderne)", layout: "minimalist", style: "compact-badge" },
  { id: "vienne", name: "Modèle Vienne (Minimaliste Ombres)", layout: "minimalist", style: "soft-shadow" },

  { id: "newyork", name: "Modèle New York (Classique Pro)", layout: "classic", style: "solid" },
  { id: "chicago", name: "Modèle Chicago (Classique Encadré)", layout: "classic", style: "bordered" },
  { id: "boston", name: "Modèle Boston (Classique Souligné)", layout: "classic", style: "underlined" },
  { id: "toronto", name: "Modèle Toronto (Classique Badge)", layout: "classic", style: "compact-badge" },
  { id: "washington", name: "Modèle Washington (Classique Ombres)", layout: "classic", style: "soft-shadow" },

  { id: "barcelone", name: "Modèle Barcelone (Créatif Sidebar)", layout: "creative", style: "solid" },
  { id: "madrid", name: "Modèle Madrid (Créatif Encadré)", layout: "creative", style: "bordered" },
  { id: "rome", name: "Modèle Rome (Créatif Souligné)", layout: "creative", style: "underlined" },
  { id: "lisbonne", name: "Modèle Lisbonne (Créatif Badge)", layout: "creative", style: "compact-badge" },
  { id: "berlin", name: "Modèle Berlin (Créatif Ombres)", layout: "creative", style: "soft-shadow" },

  { id: "tokyo", name: "Modèle Tokyo (Design Grille)", layout: "grid", style: "solid" },
  { id: "seoul", name: "Modèle Séoul (Grille Encadrée)", layout: "grid", style: "bordered" },
  { id: "singapour", name: "Modèle Singapour (Grille Soulignée)", layout: "grid", style: "underlined" },
  { id: "sydney", name: "Modèle Sydney (Grille Badge)", layout: "grid", style: "compact-badge" },
  { id: "dubai", name: "Modèle Dubaï (Grille Ombres)", layout: "grid", style: "soft-shadow" },

  { id: "bruxelles", name: "Modèle Bruxelles (Exécutif Lignes)", layout: "executive", style: "solid" },
  { id: "stockholm", name: "Modèle Stockholm (Exécutif Encadré)", layout: "executive", style: "bordered" },
  { id: "copenhague", name: "Modèle Copenhague (Exécutif Souligné)", layout: "executive", style: "underlined" },
  { id: "oslo", name: "Modèle Oslo (Exécutif Badge)", layout: "executive", style: "compact-badge" },
  { id: "helsinki", name: "Modèle Helsinki (Exécutif Ombres)", layout: "executive", style: "soft-shadow" },

  { id: "amsterdam", name: "Modèle Amsterdam (Bannière Solide)", layout: "banner", style: "solid" },
  { id: "prague", name: "Modèle Prague (Bannière Encadrée)", layout: "banner", style: "bordered" },
  { id: "budapest", name: "Modèle Budapest (Bannière Soulignée)", layout: "banner", style: "underlined" },
  { id: "athenes", name: "Modèle Athènes (Bannière Badge)", layout: "banner", style: "compact-badge" },
  { id: "varsovie", name: "Modèle Varsovie (Bannière Ombres)", layout: "banner", style: "soft-shadow" },

  { id: "florence", name: "Modèle Florence (Élégant Serif)", layout: "elegant", style: "solid" },
  { id: "venise", name: "Modèle Venise (Élégant Encadré)", layout: "elegant", style: "bordered" },
  { id: "seville", name: "Modèle Séville (Élégant Souligné)", layout: "elegant", style: "underlined" },
  { id: "porto", name: "Modèle Porto (Élégant Badge)", layout: "elegant", style: "compact-badge" },
  { id: "nice", name: "Modèle Nice (Élégant Ombres)", layout: "elegant", style: "soft-shadow" },
  { id: "sanfrancisco", name: "Modèle Moderne (San Francisco)", layout: "modern", style: "solid" },
  { id: "seattle", name: "Modèle Moderne (Seattle)", layout: "modern", style: "bordered" },
  { id: "austin", name: "Modèle Moderne (Austin)", layout: "modern", style: "underlined" },
  { id: "denver", name: "Modèle Moderne (Denver)", layout: "modern", style: "compact-badge" },
  { id: "miami", name: "Modèle Moderne (Miami)", layout: "modern", style: "soft-shadow" },
  { id: "cairo", name: "Modèle Chronologique (Cairo)", layout: "timeline", style: "solid" },
  { id: "capetown", name: "Modèle Chronologique (Cape Town)", layout: "timeline", style: "bordered" },
  { id: "nairobi", name: "Modèle Chronologique (Nairobi)", layout: "timeline", style: "underlined" },
  { id: "lagos", name: "Modèle Chronologique (Lagos)", layout: "timeline", style: "compact-badge" },
  { id: "accra", name: "Modèle Chronologique (Accra)", layout: "timeline", style: "soft-shadow" },
  { id: "melbourne", name: "Modèle Sidebar Droite (Melbourne)", layout: "sidebarRight", style: "solid" },
  { id: "brisbane", name: "Modèle Sidebar Droite (Brisbane)", layout: "sidebarRight", style: "bordered" },
  { id: "perth", name: "Modèle Sidebar Droite (Perth)", layout: "sidebarRight", style: "underlined" },
  { id: "adelaide", name: "Modèle Sidebar Droite (Adelaide)", layout: "sidebarRight", style: "compact-badge" },
  { id: "hobart", name: "Modèle Sidebar Droite (Hobart)", layout: "sidebarRight", style: "soft-shadow" },
  { id: "helsinki", name: "Modèle 50/50 Split (Helsinki)", layout: "split", style: "solid" },
  { id: "oslo", name: "Modèle 50/50 Split (Oslo)", layout: "split", style: "bordered" },
  { id: "copenhagen", name: "Modèle 50/50 Split (Copenhagen)", layout: "split", style: "underlined" },
  { id: "stockholm", name: "Modèle 50/50 Split (Stockholm)", layout: "split", style: "compact-badge" },
  { id: "reykjavik", name: "Modèle 50/50 Split (Reykjavik)", layout: "split", style: "soft-shadow" },
  { id: "istanbul", name: "Modèle Centré (Istanbul)", layout: "centered", style: "solid" },
  { id: "athens", name: "Modèle Centré (Athens)", layout: "centered", style: "bordered" },
  { id: "rome", name: "Modèle Centré (Rome)", layout: "centered", style: "underlined" },
  { id: "naples", name: "Modèle Centré (Naples)", layout: "centered", style: "compact-badge" },
  { id: "milan", name: "Modèle Centré (Milan)", layout: "centered", style: "soft-shadow" },
  { id: "moscow", name: "Modèle Ultra-Compact (Moscow)", layout: "compact", style: "solid" },
  { id: "stpetersburg", name: "Modèle Ultra-Compact (St Petersburg)", layout: "compact", style: "bordered" },
  { id: "kyiv", name: "Modèle Ultra-Compact (Kyiv)", layout: "compact", style: "underlined" },
  { id: "warsaw", name: "Modèle Ultra-Compact (Warsaw)", layout: "compact", style: "compact-badge" },
  { id: "krakow", name: "Modèle Ultra-Compact (Krakow)", layout: "compact", style: "soft-shadow" },
  { id: "mumbai", name: "Modèle Portfolio (Mumbai)", layout: "portfolio", style: "solid" },
  { id: "delhi", name: "Modèle Portfolio (Delhi)", layout: "portfolio", style: "bordered" },
  { id: "bangalore", name: "Modèle Portfolio (Bangalore)", layout: "portfolio", style: "underlined" },
  { id: "chennai", name: "Modèle Portfolio (Chennai)", layout: "portfolio", style: "compact-badge" },
  { id: "kolkata", name: "Modèle Portfolio (Kolkata)", layout: "portfolio", style: "soft-shadow" },
  { id: "frankfurt", name: "Modèle Corporate (Frankfurt)", layout: "corporate", style: "solid" },
  { id: "munich", name: "Modèle Corporate (Munich)", layout: "corporate", style: "bordered" },
  { id: "zurich", name: "Modèle Corporate (Zurich)", layout: "corporate", style: "underlined" },
  { id: "vienna", name: "Modèle Corporate (Vienna)", layout: "corporate", style: "compact-badge" },
  { id: "stuttgart", name: "Modèle Corporate (Stuttgart)", layout: "corporate", style: "soft-shadow" },
  { id: "telaviv", name: "Modèle Startup (Tel Aviv)", layout: "startup", style: "solid" },
  { id: "bangalore", name: "Modèle Startup (Bangalore)", layout: "startup", style: "bordered" },
  { id: "taipei", name: "Modèle Startup (Taipei)", layout: "startup", style: "underlined" },
  { id: "shenzhen", name: "Modèle Startup (Shenzhen)", layout: "startup", style: "compact-badge" },
  { id: "jakarta", name: "Modèle Startup (Jakarta)", layout: "startup", style: "soft-shadow" },
  { id: "oxford", name: "Modèle Académique (Oxford)", layout: "academic", style: "solid" },
  { id: "cambridge", name: "Modèle Académique (Cambridge)", layout: "academic", style: "bordered" },
  { id: "harvard", name: "Modèle Académique (Harvard)", layout: "academic", style: "underlined" },
  { id: "yale", name: "Modèle Académique (Yale)", layout: "academic", style: "compact-badge" },
  { id: "princeton", name: "Modèle Académique (Princeton)", layout: "academic", style: "soft-shadow" },
  { id: "saopaulo", name: "Modèle Infographie (Sao Paulo)", layout: "infographic", style: "solid" },
  { id: "rio", name: "Modèle Infographie (Rio)", layout: "infographic", style: "bordered" },
  { id: "buenosaires", name: "Modèle Infographie (Buenos Aires)", layout: "infographic", style: "underlined" },
  { id: "santiago", name: "Modèle Infographie (Santiago)", layout: "infographic", style: "compact-badge" },
  { id: "lima", name: "Modèle Infographie (Lima)", layout: "infographic", style: "soft-shadow" },
  { id: "montreal", name: "Modèle Gradient (Montreal)", layout: "gradient", style: "solid" },
  { id: "vancouver", name: "Modèle Gradient (Vancouver)", layout: "gradient", style: "bordered" },
  { id: "calgary", name: "Modèle Gradient (Calgary)", layout: "gradient", style: "underlined" },
  { id: "ottawa", name: "Modèle Gradient (Ottawa)", layout: "gradient", style: "compact-badge" },
  { id: "quebec", name: "Modèle Gradient (Quebec)", layout: "gradient", style: "soft-shadow" },
  { id: "beijing", name: "Modèle Hybride (Beijing)", layout: "hybrid", style: "solid" },
  { id: "shanghai", name: "Modèle Hybride (Shanghai)", layout: "hybrid", style: "bordered" },
  { id: "guangzhou", name: "Modèle Hybride (Guangzhou)", layout: "hybrid", style: "underlined" },
  { id: "shenzhen", name: "Modèle Hybride (Shenzhen)", layout: "hybrid", style: "compact-badge" },
  { id: "chengdu", name: "Modèle Hybride (Chengdu)", layout: "hybrid", style: "soft-shadow" },
];

// Demo dataset
const demoData = {
  fr: {
    personal: { name: "Amine Belkacem", title: "Chef de Projet Web & Digital", email: "amine.belkacem@email.com", phone: "+213 555 12 34 56", address: "Alger, Algérie", website: "linkedin.com/in/amine-web", photo: "" },
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
    languages: [
      { name: "Arabe", level: "Langue maternelle" },
      { name: "Français", level: "Bilingue" },
      { name: "Anglais", level: "Courant (C1)" }
    ]
  },
  ar: {
    personal: { name: "أمين بلقاسم", title: "مدير مشاريع الويب والرقمية", email: "amine.belkacem@email.com", phone: "+213 555 12 34 56", address: "الجزائر العاصمة، الجزائر", website: "linkedin.com/in/amine-web", photo: "" },
    summary: "متخصص شغوف يتمتع بخبرة تزيد عن 5 سنوات في إدارة مشاريع الويب وتصميم المواقع والتسويق الرقمي. خبرة مثبتة في تنسيق الفرق متعددة التخصصات، توجيه المي������انيات، وتحسين محركات البحث (SEO).",
    experiences: [
      { company: "ديجيتال إمباكت للحلول الرقمية", role: "مدير مشاريع ويب أول", start: "جانفي 2023", end: "الحالي", desc: "• قيادة فريق مكون من 8 مطورين ومصممين لإعادة هيكلة منصة تجارة إلكترونية كبرى بالكامل.\n• زيادة معدل التحويل بنسبة 24% بفضل تحسين تجربة المستخدم وواجهاته (UX/UI).\n• إدارة وتوجيه محافظ عملاء بقيمة إجمالية تفوق 120,000 يورو." },
      { company: "وكالة الجزائر لتطوير الويب", role: "مدير مشاريع ويب مبتدئ", start: "سبتمبر 2021", end: "ديسمبر 2022", desc: "• تخطيط ومتابعة تسليم أكثر من 25 تطبيق ويب وهاتف محمول.\n• صياغة دفاتر الشروط الفنية والوظيفية.\n• تحسين الظهور المجاني في محركات البحث (SEO) لعملاء الوكالة (+40% ������ي الزيارات)." }
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
    languages: [
      { name: "العربية", level: "اللغة الأم" },
      { name: "الفرنسية", level: "ممتاز (ثنائية اللغة)" },
      { name: "الإنجليزية", level: "مستوى متقدم (C1)" }
    ]
  },
  en: {
    personal: { name: "Amine Belkacem", title: "Web & Digital Project Manager", email: "amine.belkacem@email.com", phone: "+213 555 12 34 56", address: "Algiers, Algeria", website: "linkedin.com/in/amine-web", photo: "" },
    summary: "Passionate professional with over 5 years of experience in Web project management, website design, and digital marketing. Proven expertise in coordinating cross-functional teams, managing budgets, and SEO optimization.",
    experiences: [
      { company: "Digital Impact Agency", role: "Senior Web Project Manager", start: "Jan 2023", end: "Present", desc: "• Led an 8-person team of developers and designers for the full redesign of a major e-commerce platform.\n• Increased conversion rate by 24% through advanced UX/UI optimizations.\n• Managed client portfolios worth a combined total of €120,000." },
      { company: "Algiers Web Solutions", role: "Junior Project Manager", start: "Sep 2021", end: "Dec 2022", desc: "• Coordinated and monitored delivery timelines for over 25 web and mobile applications.\n• Drafted functional and technical specification documents.\n• Boosted SEO rankings for agency clients, achieving an average 40% organic traffic increase." }
    ],
    education: [
      { school: "University of Science and Technology", degree: "Master's Degree in Information Systems Engineering", start: "2019", end: "2021", desc: "Specialized in software architecture, enterprise databases, and Agile methodologies (Scrum)." }
    ],
    skills: [
      { name: "Project Management (Agile/Scrum)", level: "95%" },
      { name: "HTML / CSS & Tailwind CSS", level: "90%" },
      { name: "UI/UX & Figma Prototyping", level: "85%" },
      { name: "SEO & Google Analytics", level: "80%" }
    ],
    languages: [
      { name: "Arabic", level: "Native speaker" },
      { name: "French", level: "Bilingual" },
      { name: "English", level: "Fluent (C1)" }
    ]
  }
};

let cvData = {
  personal: { name: "", title: "", email: "", phone: "", address: "", website: "", photo: "" },
  summary: "",
  experiences: [],
  education: [],
  skills: [],
  languages: []
};

let config = {
  uiLang: "fr",
  cvLang: "fr",
  template: "paris",
  color: "blue",
  font: "inter",
  fontSize: "normal",
  textColor: "#1e293b",
  spacing: "normal",
  activeTab: "style"
};

const colorsCatalog = {
  blue: { bg: "bg-blue-600", text: "text-blue-600", border: "border-blue-600", hex: "#2563eb", rgb: "rgba(37, 99, 235, 1)", lightHex: "#eff6ff" },
  indigo: { bg: "bg-indigo-600", text: "text-indigo-600", border: "border-indigo-600", hex: "#4f46e5", rgb: "rgba(79, 70, 229, 1)", lightHex: "#eef2ff" },
  emerald: { bg: "bg-emerald-600", text: "text-emerald-600", border: "border-emerald-600", hex: "#059669", rgb: "rgba(5, 150, 105, 1)", lightHex: "#ecfdf5" },
  amber: { bg: "bg-amber-500", text: "text-amber-500", border: "border-amber-500", hex: "#f59e0b", rgb: "rgba(245, 158, 11, 1)", lightHex: "#fef3c7" },
  rose: { bg: "bg-rose-600", text: "text-rose-600", border: "border-rose-600", hex: "#e11d48", rgb: "rgba(225, 29, 72, 1)", lightHex: "#fff1f2" },
  slate: { bg: "bg-slate-700", text: "text-slate-700", border: "border-slate-700", hex: "#334155", rgb: "rgba(51, 65, 85, 1)", lightHex: "#f8fafc" },
  teal: { bg: "bg-teal-600", text: "text-teal-600", border: "border-teal-600", hex: "#0d9488", rgb: "rgba(13, 148, 136, 1)", lightHex: "#f0fdfa" },
  cyan: { bg: "bg-cyan-600", text: "text-cyan-600", border: "border-cyan-600", hex: "#0891b2", rgb: "rgba(8, 145, 178, 1)", lightHex: "#ecfeff" },
  violet: { bg: "bg-violet-600", text: "text-violet-600", border: "border-violet-600", hex: "#7c3aed", rgb: "rgba(124, 58, 237, 1)", lightHex: "#f5f3ff" },
  fuchsia: { bg: "bg-fuchsia-600", text: "text-fuchsia-600", border: "border-fuchsia-600", hex: "#c026d3", rgb: "rgba(192, 38, 211, 1)", lightHex: "#fdf4ff" },
  orange: { bg: "bg-orange-600", text: "text-orange-600", border: "border-orange-600", hex: "#ea580c", rgb: "rgba(234, 88, 12, 1)", lightHex: "#fff7ed" },
  graphite: { bg: "bg-slate-900", text: "text-slate-900", border: "border-slate-900", hex: "#0f172a", rgb: "rgba(15, 23, 42, 1)", lightHex: "#f1f5f9" }
};

const stepsMap = [
  { id: "style", icon: "palette" },
  { id: "personal", icon: "user" },
  { id: "experience", icon: "briefcase" },
  { id: "education", icon: "graduation-cap" },
  { id: "skills", icon: "award" },
  { id: "summary", icon: "file-text" }
];

document.addEventListener("DOMContentLoaded", () => {
  loadLocalData();
  renderApp();
  setupEventListeners();
  // Auto-fit zoom on load for maximum visibility
  setTimeout(fitZoomToContainer, 300);
});

window.addEventListener("resize", fitZoomToContainer);

// Auto-fit calculations
function fitZoomToContainer() {
  const container = document.querySelector(".cv-preview-container");
  const wrapper = document.getElementById("cv-preview-wrapper");
  const slider = document.getElementById("zoom-slider");

  if (!container || !wrapper) return;

  const containerWidth = container.clientWidth - 40;
  const targetWidth = 794; // 210mm at standard DPI

  let scale = containerWidth / targetWidth;
  scale = Math.max(0.4, Math.min(1.1, scale));

  wrapper.style.transform = `scale(${scale})`;
  slider.value = scale;
}

function loadLocalData() {
  let savedCV = null;
  let savedConfig = null;
  try {
    // On ne restaure plus les infos/photo : on efface toute sauvegarde du CV
    localStorage.removeItem("mon_cv_go_data");
    savedCV = null;
    savedConfig = localStorage.getItem("mon_cv_go_config");
  } catch (e) {
    console.warn("localStorage not accessible, using temporary in-memory fallback:", e);
  }

  if (savedCV) {
    try { 
      const parsed = JSON.parse(savedCV);
      cvData = {
        personal: Object.assign({ name: "", title: "", email: "", phone: "", address: "", website: "", photo: "" }, parsed.personal || {}),
        summary: parsed.summary || "",
        experiences: Array.isArray(parsed.experiences) ? parsed.experiences : [],
        education: Array.isArray(parsed.education) ? parsed.education : [],
        skills: Array.isArray(parsed.skills) ? parsed.skills : [],
        languages: Array.isArray(parsed.languages) ? parsed.languages : []
      };
    } catch (e) { 
      console.error("Error parsing saved CV data:", e);
      resetToDefaultData();
    }
  } else {
    resetToDefaultData();
  }

  if (savedConfig) {
    try { 
      const parsedConfig = JSON.parse(savedConfig);
      config = Object.assign({
        uiLang: "fr",
        cvLang: "fr",
        template: "paris",
        color: "blue",
        font: "inter",
        fontSize: "normal",
        spacing: "normal",
        activeTab: "style"
      }, parsedConfig);
    } catch (e) { 
      console.error("Error parsing saved config:", e); 
    }
  }
}

function resetToDefaultData() {
  // CV vide par defaut (remise a zero a chaque actualisation de la page)
  cvData = {
    personal: { name: "", title: "", email: "", phone: "", address: "", website: "", photo: "" },
    summary: "",
    experiences: [],
    education: [],
    skills: [],
    languages: []
  };
}

function saveData() {
  try {
    // Les infos et la photo ne sont plus sauvegardees : le CV se vide a chaque actualisation.
    localStorage.setItem("mon_cv_go_config", JSON.stringify(config));
  } catch (e) {
    console.warn("localStorage write failed:", e);
  }
}

function renderApp() {
  const t = translations[config.uiLang];

  document.getElementById("txt-btn-demo").textContent = t.buttons.demo;
  document.getElementById("txt-btn-reset").textContent = t.buttons.reset;
  document.getElementById("txt-preview-title").textContent = config.uiLang === 'fr' ? 'Aperçu en direct' : config.uiLang === 'ar' ? 'معاينة مباشرة' : 'Live Preview';
  document.getElementById("txt-btn-download").textContent = t.buttons.download;

  renderStepsNav();
  renderFormStep();

  document.getElementById("txt-btn-prev").textContent = t.buttons.prev;
  document.getElementById("txt-btn-next").textContent = t.buttons.next;

  const activeIndex = stepsMap.findIndex(s => s.id === config.activeTab);
  document.getElementById("prev-step-btn").disabled = activeIndex === 0;

  if (activeIndex === stepsMap.length - 1) {
    document.getElementById("txt-btn-next").textContent = t.buttons.download;
    document.getElementById("next-step-btn").onclick = () => executePDFGeneration();
  } else {
    document.getElementById("txt-btn-next").textContent = t.buttons.next;
    document.getElementById("next-step-btn").onclick = () => {
      const nextIndex = activeIndex + 1;
      config.activeTab = stepsMap[nextIndex].id;
      renderApp();
    };
  }

  document.getElementById("prev-step-btn").onclick = () => {
    if (activeIndex > 0) {
      config.activeTab = stepsMap[activeIndex - 1].id;
      renderApp();
    }
  };

  renderCVPreview();
  safeCreateIcons();
}

function renderStepsNav() {
  const navContainer = document.getElementById("form-steps-nav");
  const t = translations[config.uiLang];
  navContainer.innerHTML = "";

  stepsMap.forEach((step) => {
    const isActive = step.id === config.activeTab;
    const tabBtn = document.createElement("div");
    tabBtn.className = `step-tab ${isActive ? 'active' : 'inactive'}`;
    tabBtn.innerHTML = `
      <i data-lucide="${step.icon}" class="w-4 h-4"></i>
      <span class="hidden md:inline">${t.steps[step.id]}</span>
    `;
    tabBtn.onclick = () => {
      config.activeTab = step.id;
      renderApp();
    };
    navContainer.appendChild(tabBtn);
  });
}

function renderFormStep() {
  const form = document.getElementById("cv-form");
  const t = translations[config.uiLang];
  form.innerHTML = "";

  switch (config.activeTab) {
    case "style":
      renderStyleStep(form, t);
      break;
    case "personal":
      renderPersonalStep(form, t);
      break;
    case "experience":
      renderExperienceStep(form, t);
      break;
    case "education":
      renderEducationStep(form, t);
      break;
    case "skills":
      renderSkillsStep(form, t);
      break;
    case "summary":
      renderSummaryStep(form, t);
      break;
  }
}

function renderStyleStep(form, t) {
  const wrapper = document.createElement("div");
  wrapper.className = "space-y-6";

  const cvLangDiv = document.createElement("div");
  cvLangDiv.className = "flex flex-col gap-2";
  cvLangDiv.innerHTML = `
    <label class="form-label uppercase tracking-widest text-xs font-bold text-[#d4af37]">Langue du CV (Textes & Direction)</label>
    <div class="flex gap-2">
      <button type="button" class="lang-opt flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${config.cvLang === 'fr' ? 'bg-[#d4af37] text-slate-900 shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}" data-lang="fr">Français</button>
      <button type="button" class="lang-opt flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${config.cvLang === 'en' ? 'bg-[#d4af37] text-slate-900 shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}" data-lang="en">English</button>
      <button type="button" class="lang-opt flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${config.cvLang === 'ar' ? 'bg-[#d4af37] text-slate-900 shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}" data-lang="ar">العربية</button>
    </div>
  `;
  wrapper.appendChild(cvLangDiv);

  // CV Language (Text direction)
  

  // Template select dropdown for 25 options
  const tplDiv = document.createElement("div");
  tplDiv.className = "flex flex-col gap-2";

  // Categorized template options builder
  const categories = {
    minimalist: "Catégorie Chic & Minimaliste",
    classic: "Catégorie Classique Professionnelle",
    creative: "Catégorie Créative Sidebar",
    grid: "Catégorie Design Grille",
    executive: "Catégorie Exécutive Lignes",
    banner: "Catégorie Bannière Moderne",
    elegant: "Catégorie Élégant Serif",
    modern: "Catégorie Moderne & Tech",
    timeline: "Catégorie Parcours Chronologique",
    sidebarRight: "Catégorie Sidebar à Droite",
    split: "Catégorie Layout 50/50",
    centered: "Catégorie Alignement Centré",
    compact: "Catégorie Ultra-Compact",
    portfolio: "Catégorie Portfolio Créatif",
    corporate: "Catégorie Strictement Corporate",
    startup: "Catégorie Startup Audacieuse",
    academic: "Catégorie Style Académique",
    infographic: "Catégorie Infographie Visuelle",
    gradient: "Catégorie En-têtes Gradient",
    hybrid: "Catégorie Hybride Grille/Sidebar"
  };

  let tplOptionsHtml = "";
  Object.keys(categories).forEach(catId => {
    tplOptionsHtml += `<optgroup label="${categories[catId]}">`;
    templates100.filter(tpl => tpl.layout === catId).forEach(tpl => {
      tplOptionsHtml += `<option value="${tpl.id}" ${config.template === tpl.id ? 'selected' : ''}>${tpl.name}</option>`;
    });
    tplOptionsHtml += `</optgroup>`;
  });

  tplDiv.innerHTML = `
    <label class="form-label">${t.labels.template}</label>
    <select id="select-template-25" class="form-input font-bold text-sm">
      ${tplOptionsHtml}
    </select>
  `;
  wrapper.appendChild(tplDiv);

  // Colors Picker
  const colorsDiv = document.createElement("div");
  colorsDiv.className = "flex flex-col gap-2";
  colorsDiv.innerHTML = `
    <label class="form-label">${t.labels.accentColor}</label>
    <div class="flex flex-wrap gap-3">
      ${Object.keys(colorsCatalog).map(col => `
        <button type="button" data-val="${col}" class="col-opt w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-sm ${colorsCatalog[col].bg} ${config.color === col ? 'ring-4 ring-offset-2 ring-blue-500 dark:ring-offset-slate-900' : ''}">
          ${config.color === col ? '<i data-lucide="check" class="w-5 h-5 text-white"></i>' : ''}
        </button>
      `).join('')}
    </div>
  `;
  wrapper.appendChild(colorsDiv);

  // Fonts Family Selector
  const fontsDiv = document.createElement("div");
  fontsDiv.className = "flex flex-col gap-2";
  fontsDiv.innerHTML = `
    <label class="form-label">${t.labels.font}</label>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      ${[
        { id: "inter", name: "Inter (Sans)", preview: "font-inter" },
        { id: "roboto", name: "Roboto (Sans)", preview: "font-roboto" },
        { id: "poppins", name: "Poppins (Mod)", preview: "font-poppins" },
        { id: "montserrat", name: "Montserrat", preview: "font-montserrat" },
        { id: "playfair", name: "Playfair (Serif)", preview: "font-playfair" },
        { id: "lora", name: "Lora (Serif)", preview: "font-lora" },
        { id: "cairo", name: "Cairo (Arabic)", preview: "font-cairo" },
        { id: "tajawal", name: "Tajawal (Elegant)", preview: "font-tajawal" }
      ].map(f => `
        <button type="button" data-val="${f.id}" class="font-opt px-3 py-2.5 rounded-xl border-2 text-xs font-semibold cursor-pointer transition-all text-left flex flex-col gap-0.5 ${config.font === f.id ? 'bg-blue-50 border-blue-600 text-blue-600 dark:bg-blue-950/20 dark:border-blue-400' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600'} ${f.preview}">
          <span class="text-xs text-slate-500">ABCabc</span>
          <span>${f.name}</span>
        </button>
      `).join('')}
    </div>
  `;
  wrapper.appendChild(fontsDiv);

  // Text Color Selector
  const textColDiv = document.createElement("div");
  textColDiv.className = "flex flex-col gap-2 mt-4";
  textColDiv.innerHTML = `
    <label class="form-label">${t.labels.textColor || 'Couleur du Texte'}</label>
    <div class="flex flex-wrap items-center gap-3">
      ${[
        { val: "#1e293b", name: "Slate (Défaut)", bg: "bg-[#1e293b]" },
        { val: "#000000", name: "Noir", bg: "bg-black" },
        { val: "#111827", name: "Gris Foncé", bg: "bg-gray-900" },
        { val: "#1e3a8a", name: "Bleu Foncé", bg: "bg-blue-900" },
        { val: "#431407", name: "Marron Foncé", bg: "bg-orange-950" }
      ].map(c => `
        <button type="button" data-tcolor="${c.val}" title="${c.name}" class="tcolor-opt w-8 h-8 rounded-full shadow-sm transition-transform hover:scale-110 ${c.bg} ${config.textColor === c.val ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-slate-900 scale-110' : 'border border-slate-300 dark:border-slate-600'}"></button>
      `).join('')}
      
      <div class="flex items-center gap-2 ml-2">
        <label for="custom-text-color" class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">HEX</label>
        <input type="color" id="custom-text-color" value="${config.textColor || '#1e293b'}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
      </div>
    </div>
  `;
  wrapper.appendChild(textColDiv);

  // Spacing sliders
  const scaleDiv = document.createElement("div");
  scaleDiv.className = "grid grid-cols-1 md:grid-cols-2 gap-4 pt-2";
  scaleDiv.innerHTML = `
    <div class="flex flex-col gap-1.5">
      <label class="form-label">${t.labels.fontSize}</label>
      <select id="select-font-size" class="form-input">
        <option value="small" ${config.fontSize === 'small' ? 'selected' : ''}>${config.uiLang === 'fr' ? 'Petit' : config.uiLang === 'ar' ? 'صغير' : 'Small'}</option>
        <option value="normal" ${config.fontSize === 'normal' ? 'selected' : ''}>${config.uiLang === 'fr' ? 'Normal' : config.uiLang === 'ar' ? 'عادي' : 'Normal'}</option>
        <option value="large" ${config.fontSize === 'large' ? 'selected' : ''}>${config.uiLang === 'fr' ? 'Grand' : config.uiLang === 'ar' ? 'كبير' : 'Large'}</option>
      </select>
    </div>
    <div class="flex flex-col gap-1.5">
      <label class="form-label">${t.labels.spacing}</label>
      <select id="select-spacing" class="form-input">
        <option value="compact" ${config.spacing === 'compact' ? 'selected' : ''}>${t.labels.compact}</option>
        <option value="normal" ${config.spacing === 'normal' ? 'selected' : ''}>${t.labels.normal}</option>
        <option value="generous" ${config.spacing === 'generous' ? 'selected' : ''}>${t.labels.generous}</option>
      </select>
    </div>
  `;
  wrapper.appendChild(scaleDiv);
  
  form.appendChild(wrapper);

  document.querySelectorAll(".lang-opt").forEach(btn => {
    btn.onclick = () => {
      config.cvLang = btn.getAttribute("data-lang");
      if (config.cvLang === "ar") {
        config.font = "cairo";
      }
      saveData();
      renderApp();
    };
  });

  // Setup click and change handlers inside Style Tab
  

  const tplSelect = document.getElementById("select-template-25");
  tplSelect.onchange = (e) => {
    config.template = e.target.value;
    saveData();
    
    renderApp();
  };

  wrapper.querySelectorAll(".col-opt").forEach(btn => {
    btn.onclick = () => {
      config.color = btn.getAttribute("data-val");
      saveData();
      renderApp();
    };
  });

  wrapper.querySelectorAll(".font-opt").forEach(btn => {
    btn.onclick = () => {
      config.font = btn.getAttribute("data-val");
      saveData();
      renderApp();
    };
  });

  wrapper.querySelectorAll(".tcolor-opt").forEach(btn => {
    btn.onclick = () => {
      config.textColor = btn.getAttribute("data-tcolor");
      saveData();
      renderApp();
    };
  });

  const customTxtCol = document.getElementById("custom-text-color");
  if(customTxtCol) {
    customTxtCol.oninput = (e) => {
      config.textColor = e.target.value;
      saveData();
      renderCVPreview();
    };
    customTxtCol.onchange = (e) => {
      config.textColor = e.target.value;
      saveData();
      renderApp();
    };
  }

  document.getElementById("select-font-size").onchange = (e) => {
    config.fontSize = e.target.value;
    saveData();
    
    renderApp();
  };

  document.getElementById("select-spacing").onchange = (e) => {
    config.spacing = e.target.value;
    saveData();
    
    renderApp();
  };
}

function renderPersonalStep(form, t) {
  const p = cvData.personal;
  const wrapper = document.createElement("div");
  wrapper.className = "grid grid-cols-1 md:grid-cols-2 gap-4";

  wrapper.innerHTML = `
    <div class="flex flex-col gap-1.5">
      <label class="form-label">${t.labels.name} *</label>
      <input type="text" id="p-name" value="${p.name || ''}" class="form-input" required>
    </div>
    <div class="flex flex-col gap-1.5">
      <label class="form-label">${t.labels.title} *</label>
      <input type="text" id="p-title" value="${p.title || ''}" class="form-input" required>
    </div>
    <div class="flex flex-col gap-1.5">
      <label class="form-label">${t.labels.email} *</label>
      <input type="email" id="p-email" value="${p.email || ''}" class="form-input" required>
    </div>
    <div class="flex flex-col gap-1.5">
      <label class="form-label">${t.labels.phone}</label>
      <input type="text" id="p-phone" value="${p.phone || ''}" class="form-input">
    </div>
    <div class="flex flex-col gap-1.5">
      <label class="form-label">${t.labels.address}</label>
      <input type="text" id="p-address" value="${p.address || ''}" class="form-input">
    </div>
    <div class="flex flex-col gap-1.5">
      <label class="form-label">${t.labels.website}</label>
      <input type="text" id="p-website" value="${p.website || ''}" class="form-input">
    </div>

    <div class="md:col-span-2 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4">
      <div class="relative w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 group shadow-md">
        ${p.photo ? `<img src="${p.photo}" class="w-full h-full object-cover">` : '<i data-lucide="camera" class="w-6 h-6 text-slate-400"></i>'}
        ${p.photo ? `<button id="delete-photo-btn" class="absolute inset-0 bg-red-600/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-150 text-white cursor-pointer"><i data-lucide="trash" class="w-4 h-4"></i></button>` : ''}
      </div>
      <div class="flex-grow flex flex-col gap-1">
        <label class="text-sm font-bold text-slate-800 dark:text-slate-100">${t.labels.photo}</label>
        <span class="text-xs text-slate-400">${t.labels.photoDesc}</span>
        <input type="file" id="p-photo-input" class="hidden" accept="image/*">
        <button type="button" id="upload-photo-btn" class="mt-1.5 self-start px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm cursor-pointer transition-colors text-slate-700 dark:text-slate-300">
          Choisir un fichier
        </button>
      </div>
    </div>
  `;

  form.appendChild(wrapper);

  ["p-name", "p-title", "p-email", "p-phone", "p-address", "p-website"].forEach(id => {
    document.getElementById(id).oninput = (e) => {
      const field = id.substring(2);
      cvData.personal[field] = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  const photoInput = document.getElementById("p-photo-input");
  const uploadBtn = document.getElementById("upload-photo-btn");

  if (uploadBtn) {
    uploadBtn.onclick = () => photoInput.click();
  }

  photoInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type || !file.type.startsWith("image/")) {
      alert("Veuillez choisir une image (JPG, PNG, HEIC...).");
      return;
    }

    // Redimensionne + ré-encode l'image pour gérer les grosses photos
    // de téléphone, corriger l'orientation EXIF et normaliser le format.
    const MAX_DIM = 600; // taille max (px) du plus grand côté
    const applyPhoto = (source, w, h) => {
      const scale = Math.min(1, MAX_DIM / Math.max(w, h));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
      const ctx = canvas.getContext("2d");
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
      cvData.personal.photo = canvas.toDataURL("image/jpeg", 0.85);
      saveData();
      renderApp();
    };

    const fallback = () => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => applyPhoto(img, img.naturalWidth, img.naturalHeight);
        img.onerror = () => alert("Format d'image non supporté sur cet appareil. Essayez une photo JPG ou PNG.");
        img.src = event.target.result;
      };
      reader.onerror = () => alert("Impossible de lire ce fichier.");
      reader.readAsDataURL(file);
    };

    if (window.createImageBitmap) {
      createImageBitmap(file, { imageOrientation: "from-image" })
        .then((bmp) => applyPhoto(bmp, bmp.width, bmp.height))
        .catch(fallback);
    } else {
      fallback();
    }
  };

  const delPhotoBtn = document.getElementById("delete-photo-btn");
  if (delPhotoBtn) {
    delPhotoBtn.onclick = () => {
      cvData.personal.photo = "";
      saveData();
      renderApp();
    };
  }
}

function renderExperienceStep(form, t) {
  const container = document.createElement("div");
  container.className = "space-y-6";

  cvData.experiences.forEach((exp, index) => {
    const card = document.createElement("div");
    card.className = "p-4 bg-slate-50/50 dark:bg-slate-800/10 rounded-2xl border border-slate-100 dark:border-slate-800/60 relative space-y-4 group";
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-xs">
          ${index + 1}
        </span>
        <button type="button" class="remove-exp-btn px-2.5 py-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg border border-transparent hover:border-rose-100 transition-colors cursor-pointer flex items-center gap-1" data-idx="${index}">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          <span>${t.buttons.remove}</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label class="form-label">${t.labels.company}</label>
          <input type="text" class="form-input exp-company" data-idx="${index}" value="${exp.company || ''}">
        </div>
        <div class="flex flex-col gap-1">
          <label class="form-label">${t.labels.role}</label>
          <input type="text" class="form-input exp-role" data-idx="${index}" value="${exp.role || ''}">
        </div>
        <div class="flex flex-col gap-1">
          <label class="form-label">${t.labels.start}</label>
          <input type="text" class="form-input exp-start" data-idx="${index}" value="${exp.start || ''}">
        </div>
        <div class="flex flex-col gap-1">
          <label class="form-label">${t.labels.end}</label>
          <input type="text" class="form-input exp-end" data-idx="${index}" value="${exp.end || ''}">
        </div>
        <div class="md:col-span-2 flex flex-col gap-1">
          <label class="form-label">${t.labels.desc}</label>
          <textarea class="form-input exp-desc min-h-[100px] py-2" data-idx="${index}" placeholder="${t.labels.descPlaceholder}">${exp.desc || ''}</textarea>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  const actionDiv = document.createElement("div");
  actionDiv.className = "flex justify-start";
  actionDiv.innerHTML = `
    <button type="button" id="add-exp-btn" class="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer">
      <i data-lucide="plus" class="w-4 h-4"></i>
      <span>${t.buttons.addExp}</span>
    </button>
  `;
  container.appendChild(actionDiv);
  form.appendChild(container);

  container.querySelectorAll(".exp-company").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.experiences[idx].company = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  container.querySelectorAll(".exp-role").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.experiences[idx].role = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  container.querySelectorAll(".exp-start").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.experiences[idx].start = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  container.querySelectorAll(".exp-end").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.experiences[idx].end = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  container.querySelectorAll(".exp-desc").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.experiences[idx].desc = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  container.querySelectorAll(".remove-exp-btn").forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute("data-idx"));
      cvData.experiences.splice(idx, 1);
      saveData();
      renderApp();
    };
  });

  document.getElementById("add-exp-btn").onclick = () => {
    cvData.experiences.push({ company: "", role: "", start: "", end: "", desc: "" });
    saveData();
    
    renderApp();
  };
}

function renderEducationStep(form, t) {
  const container = document.createElement("div");
  container.className = "space-y-6";

  cvData.education.forEach((edu, index) => {
    const card = document.createElement("div");
    card.className = "p-4 bg-slate-50/50 dark:bg-slate-800/10 rounded-2xl border border-slate-100 dark:border-slate-800/60 relative space-y-4 group";
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-xs">
          ${index + 1}
        </span>
        <button type="button" class="remove-edu-btn px-2.5 py-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg border border-transparent hover:border-rose-100 transition-colors cursor-pointer flex items-center gap-1" data-idx="${index}">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          <span>${t.buttons.remove}</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label class="form-label">${t.labels.school}</label>
          <input type="text" class="form-input edu-school" data-idx="${index}" value="${edu.school || ''}">
        </div>
        <div class="flex flex-col gap-1">
          <label class="form-label">${t.labels.degree}</label>
          <input type="text" class="form-input edu-degree" data-idx="${index}" value="${edu.degree || ''}">
        </div>
        <div class="flex flex-col gap-1">
          <label class="form-label">${t.labels.start}</label>
          <input type="text" class="form-input edu-start" data-idx="${index}" value="${edu.start || ''}">
        </div>
        <div class="flex flex-col gap-1">
          <label class="form-label">${t.labels.end}</label>
          <input type="text" class="form-input edu-end" data-idx="${index}" value="${edu.end || ''}">
        </div>
        <div class="md:col-span-2 flex flex-col gap-1">
          <label class="form-label">${t.labels.desc}</label>
          <input type="text" class="form-input edu-desc" data-idx="${index}" value="${edu.desc || ''}">
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  const actionDiv = document.createElement("div");
  actionDiv.className = "flex justify-start";
  actionDiv.innerHTML = `
    <button type="button" id="add-edu-btn" class="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer">
      <i data-lucide="plus" class="w-4 h-4"></i>
      <span>${t.buttons.addEdu}</span>
    </button>
  `;
  container.appendChild(actionDiv);
  form.appendChild(container);

  container.querySelectorAll(".edu-school").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.education[idx].school = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  container.querySelectorAll(".edu-degree").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.education[idx].degree = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  container.querySelectorAll(".edu-start").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.education[idx].start = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  container.querySelectorAll(".edu-end").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.education[idx].end = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  container.querySelectorAll(".edu-desc").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.education[idx].desc = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  container.querySelectorAll(".remove-edu-btn").forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute("data-idx"));
      cvData.education.splice(idx, 1);
      saveData();
      renderApp();
    };
  });

  document.getElementById("add-edu-btn").onclick = () => {
    cvData.education.push({ school: "", degree: "", start: "", end: "", desc: "" });
    saveData();
    
    renderApp();
  };
}

function renderSkillsStep(form, t) {
  const container = document.createElement("div");
  container.className = "space-y-6";

  const skillsBox = document.createElement("div");
  skillsBox.className = "space-y-4";
  skillsBox.innerHTML = `
    <h4 class="text-sm font-extrabold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
      <i data-lucide="award" class="w-4 h-4 text-blue-600"></i>
      ${t.steps.skills}
    </h4>
    <div id="skills-list" class="space-y-3"></div>
    <button type="button" id="add-skill-btn" class="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 rounded-lg text-xs font-bold transition-all cursor-pointer">
      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
      <span>${t.buttons.addSkill}</span>
    </button>
  `;
  container.appendChild(skillsBox);

  const langsBox = document.createElement("div");
  langsBox.className = "space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800";
  langsBox.innerHTML = `
    <h4 class="text-sm font-extrabold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
      <i data-lucide="globe" class="w-4 h-4 text-blue-600"></i>
      ${config.uiLang === 'fr' ? 'Langues' : config.uiLang === 'ar' ? 'اللغات المتقنة' : 'Languages Spoken'}
    </h4>
    <div id="langs-list" class="space-y-3"></div>
    <button type="button" id="add-lang-btn" class="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 rounded-lg text-xs font-bold transition-all cursor-pointer">
      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
      <span>${t.buttons.addLang}</span>
    </button>
  `;
  container.appendChild(langsBox);
  form.appendChild(container);

  const skillsListDiv = document.getElementById("skills-list");
  cvData.skills.forEach((skill, idx) => {
    const row = document.createElement("div");
    row.className = "flex gap-2 items-center";
    row.innerHTML = `
      <input type="text" class="form-input skill-name flex-grow" data-idx="${idx}" value="${skill.name || ''}" placeholder="${t.labels.skillName}">
      <select class="form-input skill-level w-32" data-idx="${idx}">
        ${["100%", "90%", "80%", "70%", "60%", "50%"].map(lvl => `<option value="${lvl}" ${skill.level === lvl ? 'selected' : ''}>${lvl}</option>`).join('')}
      </select>
      <button type="button" class="remove-skill-btn p-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-xl cursor-pointer" data-idx="${idx}">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    `;
    skillsListDiv.appendChild(row);
  });

  const langsListDiv = document.getElementById("langs-list");
  cvData.languages.forEach((lang, idx) => {
    const row = document.createElement("div");
    row.className = "flex gap-2 items-center";
    row.innerHTML = `
      <input type="text" class="form-input lang-name flex-grow" data-idx="${idx}" value="${lang.name || ''}" placeholder="${t.labels.langName}">
      <input type="text" class="form-input lang-level w-40" data-idx="${idx}" value="${lang.level || ''}" placeholder="${t.labels.langLevel}">
      <button type="button" class="remove-lang-btn p-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-xl cursor-pointer" data-idx="${idx}">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    `;
    langsListDiv.appendChild(row);
  });

  document.getElementById("add-skill-btn").onclick = () => {
    cvData.skills.push({ name: "", level: "90%" });
    saveData();
    
    renderApp();
  };

  document.getElementById("add-lang-btn").onclick = () => {
    cvData.languages.push({ name: "", level: "" });
    saveData();
    
    renderApp();
  };

  skillsListDiv.querySelectorAll(".skill-name").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.skills[idx].name = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  skillsListDiv.querySelectorAll(".skill-level").forEach(select => {
    select.onchange = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.skills[idx].level = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  langsListDiv.querySelectorAll(".lang-name").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.languages[idx].name = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  langsListDiv.querySelectorAll(".lang-level").forEach(input => {
    input.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute("data-idx"));
      cvData.languages[idx].level = e.target.value;
      saveData();
      renderCVPreview();
    };
  });

  skillsListDiv.querySelectorAll(".remove-skill-btn").forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute("data-idx"));
      cvData.skills.splice(idx, 1);
      saveData();
      renderApp();
    };
  });

  langsListDiv.querySelectorAll(".remove-lang-btn").forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute("data-idx"));
      cvData.languages.splice(idx, 1);
      saveData();
      renderApp();
    };
  });
}

function renderSummaryStep(form, t) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-2";
  wrapper.innerHTML = `
    <label class="form-label">${t.labels.summary}</label>
    <textarea id="p-summary" class="form-input min-h-[160px] py-2 leading-relaxed" placeholder="${t.labels.summaryPlaceholder}">${cvData.summary || ''}</textarea>
  `;
  form.appendChild(wrapper);

  document.getElementById("p-summary").oninput = (e) => {
    cvData.summary = e.target.value;
    saveData();
    renderCVPreview();
  };
}

function setupEventListeners() {
  

  document.getElementById("theme-toggle-btn").onclick = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    document.getElementById("theme-icon").setAttribute("data-lucide", isDark ? "sun" : "moon");
    safeCreateIcons();
  };

  const resetCvFn = () => {
    if (confirm("Voulez-vous vraiment vider toutes les informations saisies ?")) {
      cvData = {
        personal: { name: "", title: "", email: "", phone: "", address: "", website: "", photo: "" },
        summary: "",
        experiences: [],
        education: [],
        skills: [],
        languages: []
      };
      saveData();
      renderApp();
    }
  };
  
  if (document.getElementById("reset-cv-btn")) document.getElementById("reset-cv-btn").onclick = resetCvFn;
  if (document.getElementById("inner-reset-cv-btn")) document.getElementById("inner-reset-cv-btn").onclick = resetCvFn;

  const loadDemoFn = () => {
    cvData = JSON.parse(JSON.stringify(demoData[config.uiLang] || demoData.fr));
    config.cvLang = config.uiLang;
    if (config.cvLang === "ar") {
      config.font = "cairo";
    }
    saveData();
    
    renderApp();
  };

  if (document.getElementById("load-demo-btn")) document.getElementById("load-demo-btn").onclick = loadDemoFn;
  if (document.getElementById("inner-load-demo-btn")) document.getElementById("inner-load-demo-btn").onclick = loadDemoFn;

  const slider = document.getElementById("zoom-slider");
  const wrapper = document.getElementById("cv-preview-wrapper");
  slider.oninput = (e) => {
    const scale = e.target.value;
    wrapper.style.transform = `scale(${scale})`;
  };

  // Zoom preset buttons
  document.getElementById("btn-zoom-fit").onclick = fitZoomToContainer;
  document.getElementById("btn-zoom-real").onclick = () => {
    wrapper.style.transform = "scale(1.0)";
    slider.value = 1.0;
  };

  const mobilePreviewBtn = document.getElementById("mobile-preview-btn");
  const mobilePreviewOverlay = document.getElementById("mobile-preview-overlay");
  const closeMobilePreview = document.getElementById("close-mobile-preview");
  const mobilePreviewHost = document.getElementById("mobile-preview-host");

  if (mobilePreviewBtn) {
    mobilePreviewBtn.onclick = () => {
      mobilePreviewHost.innerHTML = "";
      const nodeClone = document.getElementById("cv-preview").cloneNode(true);
      nodeClone.id = "cv-preview-clone";
      nodeClone.style.transform = "none";
      nodeClone.style.margin = "0";
      mobilePreviewHost.appendChild(nodeClone);
      mobilePreviewOverlay.classList.remove("opacity-0", "pointer-events-none");
    };
  }

  closeMobilePreview.onclick = () => {
    mobilePreviewOverlay.classList.add("opacity-0", "pointer-events-none");
  };

  // Telechargement direct (l'attente de 15s / la fenetre pub a ete retiree)
  document.getElementById("trigger-download-modal-btn").onclick = () => executePDFGeneration();
}

// -------------------------------------------------------------
// CENTRAL RENDERING ENGINE
// -------------------------------------------------------------
function renderCVPreview() {
  const preview = document.getElementById("cv-preview");
  preview.className = `cv-page font-${config.font} spacing-${config.spacing || 'normal'}`;

  const dir = config.cvLang === "ar" ? "rtl" : "ltr";
  preview.setAttribute("dir", dir);

  preview.style.fontSize = config.fontSize === 'small' ? '11px' : config.fontSize === 'large' ? '14px' : '12.5px';

  // Dynamic text color overrides
  if (config.textColor && config.textColor !== '#1e293b') {
    let styleTag = document.getElementById('dynamic-cv-text-color');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-cv-text-color';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `
      .cv-preview-container .cv-page { color: ${config.textColor} !important; }
      .cv-preview-container .cv-page .text-slate-800 { color: ${config.textColor} !important; }
      .cv-preview-container .cv-page .text-slate-700 { color: color-mix(in srgb, ${config.textColor} 85%, transparent) !important; }
      .cv-preview-container .cv-page .text-slate-600 { color: color-mix(in srgb, ${config.textColor} 70%, transparent) !important; }
      .cv-preview-container .cv-page .text-slate-500 { color: color-mix(in srgb, ${config.textColor} 50%, transparent) !important; }
      .cv-preview-container .cv-page .text-gray-800 { color: ${config.textColor} !important; }
      .cv-preview-container .cv-page .text-gray-700 { color: color-mix(in srgb, ${config.textColor} 85%, transparent) !important; }
      .cv-preview-container .cv-page .text-gray-600 { color: color-mix(in srgb, ${config.textColor} 70%, transparent) !important; }
    `;
  } else {
    const styleTag = document.getElementById('dynamic-cv-text-color');
    if (styleTag) styleTag.remove();
  }

  // Get selected template metadata
  const activeTpl = templates100.find(t => t.id === config.template) || templates100[0];
  const col = colorsCatalog[config.color] || colorsCatalog.blue;

  let htmlContent = "";
  if (activeTpl.layout === "minimalist") {
    htmlContent = renderMinimalistTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "classic") {
    htmlContent = renderClassicTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "creative") {
    htmlContent = renderCreativeTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "grid") {
    htmlContent = renderGridTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "executive") {
    htmlContent = renderExecutiveTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "banner") {
    htmlContent = renderBannerTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "elegant") {
    htmlContent = renderElegantTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "modern") {
    htmlContent = renderModernTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "timeline") {
    htmlContent = renderTimelineTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "sidebarRight") {
    htmlContent = renderSidebarRightTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "split") {
    htmlContent = renderSplitTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "centered") {
    htmlContent = renderCenteredTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "compact") {
    htmlContent = renderCompactTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "portfolio") {
    htmlContent = renderPortfolioTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "corporate") {
    htmlContent = renderCorporateTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "startup") {
    htmlContent = renderStartupTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "academic") {
    htmlContent = renderAcademicTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "infographic") {
    htmlContent = renderInfographicTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "gradient") {
    htmlContent = renderGradientTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "hybrid") {
    htmlContent = renderHybridTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "modern") {
    htmlContent = renderModernTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "timeline") {
    htmlContent = renderTimelineTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "sidebarRight") {
    htmlContent = renderSidebarRightTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "split") {
    htmlContent = renderSplitTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "centered") {
    htmlContent = renderCenteredTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "compact") {
    htmlContent = renderCompactTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "portfolio") {
    htmlContent = renderPortfolioTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "corporate") {
    htmlContent = renderCorporateTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "startup") {
    htmlContent = renderStartupTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "academic") {
    htmlContent = renderAcademicTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "infographic") {
    htmlContent = renderInfographicTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "gradient") {
    htmlContent = renderGradientTemplate(cvData, col, dir, activeTpl.style);
  } else if (activeTpl.layout === "hybrid") {
    htmlContent = renderHybridTemplate(cvData, col, dir, activeTpl.style);
  }

  preview.innerHTML = htmlContent;
}

// Decoration styling helpers based on model choices
function getStyleClass(style) {
  if (style === "bordered") {
    return "border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/20";
  } else if (style === "soft-shadow") {
    return "shadow-sm border border-slate-100/50 bg-white dark:bg-slate-900 rounded-xl p-4";
  }
  return "";
}

function renderSectionHeader(title, style, col) {
  if (style === 'underlined') {
    return `<h2 class="text-xs font-black uppercase tracking-widest pb-1 border-b-2" style="border-color: ${col.hex}; color: ${col.hex}">${title}</h2>`;
  } else if (style === 'compact-badge') {
    return `<h2 class="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-lg text-white" style="background-color: ${col.hex}">${title}</h2>`;
  } else {
    return `<h2 class="text-xs font-black uppercase tracking-widest" style="color: ${col.hex}">${title}</h2>`;
  }
}

function renderSkillTag(skill, style, col) {
  if (style === 'compact-badge') {
    return `<span class="px-2.5 py-1 text-xs font-extrabold rounded-full shadow-sm" style="background-color: ${col.lightHex}; color: ${col.hex}">${skill.name}</span>`;
  } else {
    return `
      <div class="space-y-1">
        <div class="flex justify-between text-[11px] font-bold text-slate-700">
          <span>${skill.name}</span>
          <span>${skill.level}</span>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-1.5">
          <div class="h-1.5 rounded-full" style="width: ${skill.level}; background-color: ${col.hex}"></div>
        </div>
      </div>
    `;
  }
}

// -------------------------------------------------------------
// LAYOUT ENGINE 1: Minimalist
// -------------------------------------------------------------
function renderMinimalistTemplate(data, col, dir, style) {
  const p = data.personal;
  const isRtl = dir === "rtl";
  const textLeftClass = isRtl ? "text-left" : "text-right";

  const titles = {
    fr: { exp: "Expériences Professionnelles", edu: "Éducation & Formation", skills: "Compétences", lang: "Langues" },
    ar: { exp: "الخبرات المهنية والمشاريع", edu: "المؤهلات العلمية والدراسة", skills: "المهارات المهنية", lang: "اللغات المتقنة" },
    en: { exp: "Work Experience", edu: "Education & Qualifications", skills: "Core Competencies", lang: "Languages" }
  }[config.cvLang];

  return `
    <div class="flex flex-col gap-6">
      <div class="flex flex-col md:flex-row justify-between items-start border-b-2 pb-5" style="border-color: ${col.hex}">
        <div class="flex items-center gap-4">
          ${p.photo ? `<img src="${p.photo}" class="w-16 h-16 rounded-full object-cover border-2 shadow" style="border-color: ${col.hex}">` : ''}
          <div class="space-y-1">
            <h1 class="text-xl font-black tracking-tight uppercase" style="color: ${col.hex}">${p.name || 'Votre Nom'}</h1>
            <p class="text-xs font-bold text-slate-600 uppercase tracking-widest">${p.title || 'Votre Titre'}</p>
          </div>
        </div>
        <div class="mt-3 md:mt-0 space-y-1 text-xs text-slate-500 font-semibold ${textLeftClass}">
          ${p.email ? `<p class="flex items-center gap-1.5 md:justify-end"><i data-lucide="mail" class="w-3.5 h-3.5" style="color: ${col.hex}"></i><span>${p.email}</span></p>` : ''}
          ${p.phone ? `<p class="flex items-center gap-1.5 md:justify-end"><i data-lucide="phone" class="w-3.5 h-3.5" style="color: ${col.hex}"></i><span>${p.phone}</span></p>` : ''}
          ${p.address ? `<p class="flex items-center gap-1.5 md:justify-end"><i data-lucide="map-pin" class="w-3.5 h-3.5" style="color: ${col.hex}"></i><span>${p.address}</span></p>` : ''}
          ${p.website ? `<p class="flex items-center gap-1.5 md:justify-end"><i data-lucide="link" class="w-3.5 h-3.5" style="color: ${col.hex}"></i><span>${p.website}</span></p>` : ''}
        </div>
      </div>

      ${data.summary ? `<div class="text-slate-600 italic bg-slate-50 p-3 rounded-xl border-l-4" style="border-color: ${col.hex}">${data.summary}</div>` : ''}

      ${data.experiences.length > 0 ? `
        <div class="space-y-3">
          ${renderSectionHeader(titles.exp, style, col)}
          <div class="space-y-4">
            ${data.experiences.map(exp => `
              <div class="space-y-1 ${getStyleClass(style)}">
                <div class="flex justify-between items-center font-bold">
                  <span class="text-slate-800 text-sm font-extrabold">${exp.role} @ <strong class="underline" style="text-decoration-color: ${col.hex}">${exp.company}</strong></span>
                  <span class="text-[11px] text-slate-400 font-bold">${exp.start} - ${exp.end}</span>
                </div>
                <p class="text-xs text-slate-600 whitespace-pre-line">${exp.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${data.education.length > 0 ? `
        <div class="space-y-3">
          ${renderSectionHeader(titles.edu, style, col)}
          <div class="space-y-3">
            ${data.education.map(edu => `
              <div class="space-y-1 ${getStyleClass(style)}">
                <div class="flex justify-between items-center font-bold">
                  <span class="text-slate-800 text-sm font-extrabold">${edu.degree}</span>
                  <span class="text-[11px] text-slate-400 font-bold">${edu.start} - ${edu.end}</span>
                </div>
                <p class="text-xs text-slate-500 font-bold">${edu.school}</p>
                ${edu.desc ? `<p class="text-xs text-slate-400 italic">${edu.desc}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${data.skills.length > 0 ? `
          <div class="space-y-3">
            ${renderSectionHeader(titles.skills, style, col)}
            <div class="${style === 'compact-badge' ? 'flex flex-wrap gap-2' : 'space-y-2'}">
              ${data.skills.map(skill => renderSkillTag(skill, style, col)).join('')}
            </div>
          </div>
        ` : ''}

        ${data.languages.length > 0 ? `
          <div class="space-y-3">
            ${renderSectionHeader(titles.lang, style, col)}
            <div class="space-y-2">
              ${data.languages.map(lang => `
                <div class="flex justify-between text-xs p-2 rounded-xl bg-slate-50/50">
                  <span class="font-extrabold text-slate-800">${lang.name}</span>
                  <span class="text-slate-500 font-bold">${lang.level}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// LAYOUT ENGINE 2: Classic
// -------------------------------------------------------------
function renderClassicTemplate(data, col, dir, style) {
  const p = data.personal;
  const isRtl = dir === "rtl";
  const alignLeft = isRtl ? "text-right" : "text-left";
  const alignRight = isRtl ? "text-left" : "text-right";

  const titles = {
    fr: { exp: "Expériences Professionnelles", edu: "Éducation & Diplômes", skills: "Compétences", lang: "Langues" },
    ar: { exp: "المسار المهني والخبرات", edu: "المسار الدراسي والشهادات", skills: "المهارات والخبرات", lang: "اللغات المتقنة" },
    en: { exp: "Professional Experience", edu: "Education & Certificates", skills: "Key Expertise", lang: "Languages" }
  }[config.cvLang];

  return `
    <div class="relative -mx-[15mm] -mt-[18mm] mb-6 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white shadow" style="background-color: ${col.hex}">
      <div class="flex items-center gap-4">
        ${p.photo ? `<img src="${p.photo}" class="w-16 h-16 rounded-xl object-cover border-2 border-white/60 shadow">` : ''}
        <div class="space-y-1 ${alignLeft}">
          <h1 class="text-xl font-black uppercase tracking-tight">${p.name || 'Votre Nom'}</h1>
          <p class="text-xs font-bold text-slate-100 uppercase tracking-widest">${p.title || 'Votre Titre'}</p>
        </div>
      </div>
      <div class="text-xs text-white/90 space-y-1 font-semibold ${alignRight}">
        ${p.email ? `<p class="flex items-center justify-end gap-1.5"><i data-lucide="mail" class="w-3.5 h-3.5 text-white"></i><span>${p.email}</span></p>` : ''}
        ${p.phone ? `<p class="flex items-center justify-end gap-1.5"><i data-lucide="phone" class="w-3.5 h-3.5 text-white"></i><span>${p.phone}</span></p>` : ''}
        ${p.address ? `<p class="flex items-center justify-end gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-white"></i><span>${p.address}</span></p>` : ''}
        ${p.website ? `<p class="flex items-center justify-end gap-1.5"><i data-lucide="link" class="w-3.5 h-3.5 text-white"></i><span>${p.website}</span></p>` : ''}
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1 space-y-5">
        ${data.summary ? `
          <div class="space-y-1.5">
            ${renderSectionHeader(config.cvLang === 'fr' ? 'Profil' : config.cvLang === 'ar' ? 'نبذة شخصية' : 'Summary', style, col)}
            <p class="text-xs text-slate-600 font-semibold">${data.summary}</p>
          </div>
        ` : ''}

        ${data.skills.length > 0 ? `
          <div class="space-y-2">
            ${renderSectionHeader(titles.skills, style, col)}
            <div class="${style === 'compact-badge' ? 'flex flex-wrap gap-2' : 'space-y-2.5'}">
              ${data.skills.map(s => renderSkillTag(s, style, col)).join('')}
            </div>
          </div>
        ` : ''}

        ${data.languages.length > 0 ? `
          <div class="space-y-2">
            ${renderSectionHeader(titles.lang, style, col)}
            <div class="space-y-1.5">
              ${data.languages.map(l => `
                <div class="flex justify-between text-xs p-1.5 bg-slate-50/50 rounded-lg">
                  <span class="font-extrabold text-slate-800">${l.name}</span>
                  <span class="text-slate-500 font-bold">${l.level}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="md:col-span-2 space-y-6 ${isRtl ? 'border-r pr-4 border-slate-100' : 'border-l pl-4 border-slate-100'}">
        ${data.experiences.length > 0 ? `
          <div class="space-y-3">
            ${renderSectionHeader(titles.exp, style, col)}
            <div class="space-y-4">
              ${data.experiences.map(exp => `
                <div class="space-y-1 ${getStyleClass(style)}">
                  <div class="flex items-start justify-between">
                    <div>
                      <h4 class="font-black text-slate-800 text-sm">${exp.role}</h4>
                      <p class="text-xs font-bold text-slate-400">${exp.company}</p>
                    </div>
                    <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-extrabold whitespace-nowrap">${exp.start} - ${exp.end}</span>
                  </div>
                  <p class="text-xs text-slate-600 whitespace-pre-line leading-relaxed">${exp.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${data.education.length > 0 ? `
          <div class="space-y-3">
            ${renderSectionHeader(titles.edu, style, col)}
            <div class="space-y-3">
              ${data.education.map(edu => `
                <div class="space-y-1 ${getStyleClass(style)}">
                  <div class="flex items-start justify-between">
                    <div>
                      <h4 class="font-black text-slate-800 text-sm">${edu.degree}</h4>
                      <p class="text-xs font-bold text-slate-400">${edu.school}</p>
                    </div>
                    <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-extrabold whitespace-nowrap">${edu.start} - ${edu.end}</span>
                  </div>
                  ${edu.desc ? `<p class="text-xs text-slate-500 italic">${edu.desc}</p>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// LAYOUT ENGINE 3: Creative (Sidebar Color)
// -------------------------------------------------------------
function renderCreativeTemplate(data, col, dir, style) {
  const p = data.personal;
  const isRtl = dir === "rtl";
  const sidebarAlignClass = isRtl ? "md:flex-row-reverse" : "md:flex-row";

  const titles = {
    fr: { exp: "Parcours Professionnel", edu: "Cursus Scolaire", skills: "Compétences", lang: "Langues" },
    ar: { exp: "الخبرات والمسار المهني", edu: "التع��يم والتدريب", skills: "المهارات المميزة", lang: "اللغات" },
    en: { exp: "Career History", edu: "Education History", skills: "Key Skills", lang: "Languages" }
  }[config.cvLang];

  return `
    <div class="flex flex-col md:flex-row gap-0 -mx-[15mm] -my-[18mm] min-h-[297mm]">
      <div class="w-full md:w-1/3 p-6 flex flex-col gap-6" style="background-color: ${col.lightHex}">
        <div class="flex flex-col items-center text-center gap-3">
          ${p.photo ? `
            <img src="${p.photo}" class="w-20 h-20 rounded-full object-cover border-4 shadow" style="border-color: ${col.hex}">
          ` : `
            <div class="w-14 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 shadow-inner">
              <i data-lucide="user" class="w-7 h-7"></i>
            </div>
          `}
          <div class="space-y-0.5">
            <h1 class="text-base font-black tracking-tight" style="color: ${col.hex}">${p.name || 'Nom complet'}</h1>
            <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">${p.title || 'Titre'}</p>
          </div>
        </div>

        <div class="space-y-2 text-xs text-slate-600 font-semibold">
          ${p.email ? `<p class="flex items-center gap-2"><i data-lucide="mail" class="w-3.5 h-3.5" style="color: ${col.hex}"></i><span class="break-all">${p.email}</span></p>` : ''}
          ${p.phone ? `<p class="flex items-center gap-2"><i data-lucide="phone" class="w-3.5 h-3.5" style="color: ${col.hex}"></i><span>${p.phone}</span></p>` : ''}
          ${p.address ? `<p class="flex items-center gap-2"><i data-lucide="map-pin" class="w-3.5 h-3.5" style="color: ${col.hex}"></i><span>${p.address}</span></p>` : ''}
          ${p.website ? `<p class="flex items-center gap-2"><i data-lucide="link" class="w-3.5 h-3.5" style="color: ${col.hex}"></i><span>${p.website}</span></p>` : ''}
        </div>

        ${data.summary ? `
          <div class="space-y-1">
            ${renderSectionHeader("Profil", style, col)}
            <p class="text-xs text-slate-600 leading-relaxed font-semibold">${data.summary}</p>
          </div>
        ` : ''}

        ${data.skills.length > 0 ? `
          <div class="space-y-2">
            ${renderSectionHeader(titles.skills, style, col)}
            <div class="${style === 'compact-badge' ? 'flex flex-wrap gap-1.5' : 'space-y-2'}">
              ${data.skills.map(s => renderSkillTag(s, style, col)).join('')}
            </div>
          </div>
        ` : ''}

        ${data.languages.length > 0 ? `
          <div class="space-y-2">
            ${renderSectionHeader(titles.lang, style, col)}
            <div class="space-y-1.5">
              ${data.languages.map(l => `
                <div class="flex justify-between text-xs p-1.5 bg-white rounded-lg border border-slate-100">
                  <span class="font-extrabold text-slate-800">${l.name}</span>
                  <span class="text-slate-500 font-bold">${l.level}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="flex-grow p-6 space-y-6 bg-white">
        ${data.experiences.length > 0 ? `
          <div class="space-y-4">
            ${renderSectionHeader(titles.exp, style, col)}
            <div class="space-y-5">
              ${data.experiences.map(exp => `
                <div class="relative pl-4 border-l-2 border-slate-100 space-y-1 ${getStyleClass(style)}" style="border-color: ${col.hex}30">
                  <div class="absolute -left-[6px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-white" style="border-color: ${col.hex}"></div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-extrabold text-slate-800">${exp.role}</span>
                    <span class="text-[10px] text-slate-400 font-bold">${exp.start} - ${exp.end}</span>
                  </div>
                  <p class="text-xs font-black text-slate-400 uppercase tracking-wider">${exp.company}</p>
                  <p class="text-xs text-slate-600 whitespace-pre-line leading-relaxed">${exp.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${data.education.length > 0 ? `
          <div class="space-y-4">
            ${renderSectionHeader(titles.edu, style, col)}
            <div class="space-y-4">
              ${data.education.map(edu => `
                <div class="relative pl-4 border-l-2 border-slate-100 space-y-1 ${getStyleClass(style)}" style="border-color: ${col.hex}30">
                  <div class="absolute -left-[6px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-white" style="border-color: ${col.hex}"></div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-extrabold text-slate-800">${edu.degree}</span>
                    <span class="text-[10px] text-slate-400 font-bold">${edu.start} - ${edu.end}</span>
                  </div>
                  <p class="text-xs font-black text-slate-400 uppercase tracking-wider">${edu.school}</p>
                  ${edu.desc ? `<p class="text-xs text-slate-500 italic leading-relaxed">${edu.desc}</p>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// LAYOUT ENGINE 4: Grid
// -------------------------------------------------------------
function renderGridTemplate(data, col, dir, style) {
  const p = data.personal;
  const isRtl = dir === "rtl";
  const layoutColClass = isRtl ? "text-right" : "text-left";

  const titles = {
    fr: { exp: "Projets & Expériences", edu: "Études & Diplômes", skills: "Compétences", lang: "Langues" },
    ar: { exp: "المشاريع وال��برات", edu: "التعليم العالي", skills: "المهارات التقنية", lang: "اللغات المتقنة" },
    en: { exp: "Projects & Work", edu: "Academic History", skills: "Technical Stack", lang: "Languages" }
  }[config.cvLang];

  return `
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl border" style="background-color: ${col.lightHex}; border-color: ${col.hex}25">
        <div class="md:col-span-3 space-y-3 ${layoutColClass}">
          <span class="px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-widest rounded-full" style="background-color: ${col.hex}">
            Disponible Immédiatement
          </span>
          <div class="space-y-1">
            <h1 class="text-xl font-black tracking-tight" style="color: ${col.hex}">${p.name || 'Nom complet'}</h1>
            <p class="text-xs font-extrabold text-slate-700 uppercase tracking-wider">${p.title || 'Titre'}</p>
          </div>
          ${data.summary ? `<p class="text-xs text-slate-600 leading-relaxed font-semibold">${data.summary}</p>` : ''}
        </div>
        <div class="md:col-span-1 flex flex-col items-center justify-center">
          ${p.photo ? `
            <img src="${p.photo}" class="w-16 h-16 rounded-xl object-cover shadow border" style="border-color: ${col.hex}">
          ` : `
            <div class="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400"><i data-lucide="user" class="w-6 h-6"></i></div>
          `}
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        ${p.email ? `<div class="p-2 border rounded-xl flex items-center gap-2 text-xs font-bold text-slate-600"><i data-lucide="mail" class="w-4 h-4" style="color:${col.hex}"></i><span class="truncate">${p.email}</span></div>` : ''}
        ${p.phone ? `<div class="p-2 border rounded-xl flex items-center gap-2 text-xs font-bold text-slate-600"><i data-lucide="phone" class="w-4 h-4" style="color:${col.hex}"></i><span>${p.phone}</span></div>` : ''}
        ${p.address ? `<div class="p-2 border rounded-xl flex items-center gap-2 text-xs font-bold text-slate-600"><i data-lucide="map-pin" class="w-4 h-4" style="color:${col.hex}"></i><span>${p.address}</span></div>` : ''}
        ${p.website ? `<div class="p-2 border rounded-xl flex items-center gap-2 text-xs font-bold text-slate-600"><i data-lucide="link" class="w-4 h-4" style="color:${col.hex}"></i><span class="truncate">${p.website}</span></div>` : ''}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-6">
          ${data.experiences.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.exp, style, col)}
              <div class="space-y-4">
                ${data.experiences.map(exp => `
                  <div class="p-4 bg-slate-50/50 border rounded-2xl space-y-2 ${getStyleClass(style)}">
                    <div class="flex items-center justify-between font-bold">
                      <span class="text-xs text-slate-500 font-extrabold uppercase tracking-wider">${exp.company}</span>
                      <span class="text-[10px] text-white px-2 py-0.5 rounded-full font-bold" style="background-color: ${col.hex}">${exp.start} - ${exp.end}</span>
                    </div>
                    <h3 class="font-extrabold text-slate-800 text-xs">${exp.role}</h3>
                    <p class="text-xs text-slate-600 whitespace-pre-line">${exp.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${data.education.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.edu, style, col)}
              <div class="space-y-3">
                ${data.education.map(edu => `
                  <div class="p-3 bg-slate-50/40 border rounded-2xl ${getStyleClass(style)}">
                    <div class="flex items-center justify-between font-bold mb-1">
                      <span class="text-xs font-extrabold text-slate-800">${edu.degree}</span>
                      <span class="text-[10px] text-slate-500 font-semibold">${edu.start} - ${edu.end}</span>
                    </div>
                    <p class="text-xs text-slate-600 font-bold">${edu.school}</p>
                    ${edu.desc ? `<p class="text-xs text-slate-400 italic">${edu.desc}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="md:col-span-1 space-y-6">
          ${data.skills.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.skills, style, col)}
              <div class="${style === 'compact-badge' ? 'flex flex-wrap gap-2' : 'grid grid-cols-1 gap-2'}">
                ${data.skills.map(s => renderSkillTag(s, style, col)).join('')}
              </div>
            </div>
          ` : ''}

          ${data.languages.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.lang, style, col)}
              <div class="space-y-2">
                ${data.languages.map(l => `
                  <div class="flex items-center justify-between text-xs p-2 bg-slate-50 border rounded-xl">
                    <span class="font-extrabold text-slate-800">${l.name}</span>
                    <span class="text-slate-500 font-semibold">${l.level}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// LAYOUT ENGINE 5: Executive
// -------------------------------------------------------------
function renderExecutiveTemplate(data, col, dir, style) {
  const p = data.personal;
  const isRtl = dir === "rtl";
  const alignLeft = isRtl ? "text-right" : "text-left";
  const alignRight = isRtl ? "text-left" : "text-right";

  const titles = {
    fr: { exp: "Expérience Executive", edu: "Parcours Académique", skills: "Compétences clés", lang: "Langues" },
    ar: { exp: "الخبرات التنفيذية والقيادية", edu: "المسار الدراسي الجامعي", skills: "المهارات الإستراتيجية", lang: "اللغات المتقنة" },
    en: { exp: "Executive Experience", edu: "Education History", skills: "Core Competencies", lang: "Languages" }
  }[config.cvLang];

  return `
    <div class="space-y-5">
      <div class="flex flex-col md:flex-row justify-between items-center pb-4 border-b-4" style="border-color: ${col.hex}">
        <div class="flex items-center gap-4">
          ${p.photo ? `<img src="${p.photo}" class="w-16 h-16 rounded-full object-cover border-2 shadow" style="border-color: ${col.hex}">` : ''}
          <div class="${alignLeft}">
            <h1 class="text-xl font-black uppercase tracking-tight" style="color: ${col.hex}">${p.name || 'Votre Nom'}</h1>
            <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">${p.title || 'Titre Pro'}</p>
          </div>
        </div>
        <div class="mt-3 md:mt-0 text-xs text-slate-500 font-bold space-y-0.5 ${alignRight}">
          ${p.email ? `<p>${p.email} | <i data-lucide="mail" class="w-3 h-3 inline"></i></p>` : ''}
          ${p.phone ? `<p>${p.phone} | <i data-lucide="phone" class="w-3 h-3 inline"></i></p>` : ''}
          ${p.address ? `<p>${p.address} | <i data-lucide="map-pin" class="w-3 h-3 inline"></i></p>` : ''}
          ${p.website ? `<p>${p.website} | <i data-lucide="link" class="w-3 h-3 inline"></i></p>` : ''}
        </div>
      </div>

      ${data.summary ? `
        <div class="p-3 bg-slate-50/50 rounded-xl border border-l-4" style="border-color: ${col.hex}">
          <p class="text-xs text-slate-700 leading-relaxed font-semibold">${data.summary}</p>
        </div>
      ` : ''}

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-5">
          ${data.experiences.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.exp, style, col)}
              <div class="space-y-4">
                ${data.experiences.map(exp => `
                  <div class="space-y-1 ${getStyleClass(style)}">
                    <div class="flex justify-between items-center font-bold">
                      <span class="text-slate-800 text-sm font-black">${exp.role}</span>
                      <span class="text-[10px] text-slate-400 font-extrabold">${exp.start} - ${exp.end}</span>
                    </div>
                    <p class="text-xs text-slate-500 font-extrabold uppercase">${exp.company}</p>
                    <p class="text-xs text-slate-600 whitespace-pre-line leading-relaxed">${exp.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="md:col-span-1 space-y-5">
          ${data.education.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.edu, style, col)}
              <div class="space-y-3">
                ${data.education.map(edu => `
                  <div class="space-y-1 ${getStyleClass(style)}">
                    <div class="flex flex-col font-bold">
                      <span class="text-slate-800 text-xs font-black">${edu.degree}</span>
                      <span class="text-[9px] text-slate-400">${edu.start} - ${edu.end}</span>
                    </div>
                    <p class="text-[11px] text-slate-500 font-bold">${edu.school}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${data.skills.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.skills, style, col)}
              <div class="${style === 'compact-badge' ? 'flex flex-wrap gap-1.5' : 'space-y-2'}">
                ${data.skills.map(s => renderSkillTag(s, style, col)).join('')}
              </div>
            </div>
          ` : ''}

          ${data.languages.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.lang, style, col)}
              <div class="space-y-1.5">
                ${data.languages.map(l => `
                  <div class="flex justify-between text-xs p-1.5 bg-slate-50 rounded-lg">
                    <span class="font-extrabold text-slate-800">${l.name}</span>
                    <span class="text-slate-500 font-semibold">${l.level}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// LAYOUT ENGINE 6: Banner (En-tete pleine largeur en degrade)
// -------------------------------------------------------------
function renderBannerTemplate(data, col, dir, style) {
  const p = data.personal;
  const titles = {
    fr: { exp: "Expériences Professionnelles", edu: "Formation", skills: "Compétences", lang: "Langues" },
    ar: { exp: "الخبرات المهنية", edu: "التعليم", skills: "المهارات", lang: "اللغات" },
    en: { exp: "Work Experience", edu: "Education", skills: "Skills", lang: "Languages" }
  }[config.cvLang];

  return `
    <div class="space-y-6">
      <div class="relative -mx-[15mm] -mt-[18mm] px-8 pt-10 pb-8 text-center text-white" style="background: linear-gradient(135deg, ${col.hex}, ${col.hex}cc)">
        ${p.photo ? `<img src="${p.photo}" class="w-24 h-24 rounded-full object-cover border-4 border-white/70 shadow-lg mx-auto mb-3">` : ''}
        <h1 class="text-2xl font-black uppercase tracking-wide">${p.name || 'Votre Nom'}</h1>
        <p class="text-sm font-semibold text-white/90 uppercase tracking-[0.2em] mt-1">${p.title || 'Votre Titre'}</p>
      </div>

      <div class="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-600">
        ${p.email ? `<span class="flex items-center gap-1.5"><i data-lucide="mail" class="w-3.5 h-3.5" style="color:${col.hex}"></i>${p.email}</span>` : ''}
        ${p.phone ? `<span class="flex items-center gap-1.5"><i data-lucide="phone" class="w-3.5 h-3.5" style="color:${col.hex}"></i>${p.phone}</span>` : ''}
        ${p.address ? `<span class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5" style="color:${col.hex}"></i>${p.address}</span>` : ''}
        ${p.website ? `<span class="flex items-center gap-1.5"><i data-lucide="link" class="w-3.5 h-3.5" style="color:${col.hex}"></i>${p.website}</span>` : ''}
      </div>

      ${data.summary ? `<p class="text-center text-sm text-slate-600 italic max-w-2xl mx-auto">${data.summary}</p>` : ''}

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-6">
          ${data.experiences.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.exp, style, col)}
              <div class="space-y-4">
                ${data.experiences.map(exp => `
                  <div class="space-y-1 ${getStyleClass(style)}">
                    <div class="flex justify-between items-center">
                      <span class="text-sm font-extrabold text-slate-800">${exp.role}</span>
                      <span class="text-[10px] text-white px-2 py-0.5 rounded-full font-bold" style="background-color:${col.hex}">${exp.start} - ${exp.end}</span>
                    </div>
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">${exp.company}</p>
                    <p class="text-xs text-slate-600 whitespace-pre-line leading-relaxed">${exp.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${data.education.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.edu, style, col)}
              <div class="space-y-3">
                ${data.education.map(edu => `
                  <div class="space-y-1 ${getStyleClass(style)}">
                    <div class="flex justify-between items-center">
                      <span class="text-sm font-extrabold text-slate-800">${edu.degree}</span>
                      <span class="text-[10px] text-slate-400 font-bold">${edu.start} - ${edu.end}</span>
                    </div>
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">${edu.school}</p>
                    ${edu.desc ? `<p class="text-xs text-slate-500 italic">${edu.desc}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="md:col-span-1 space-y-6">
          ${data.skills.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.skills, style, col)}
              <div class="${style === 'compact-badge' ? 'flex flex-wrap gap-2' : 'space-y-2'}">
                ${data.skills.map(s => renderSkillTag(s, style, col)).join('')}
              </div>
            </div>
          ` : ''}

          ${data.languages.length > 0 ? `
            <div class="space-y-3">
              ${renderSectionHeader(titles.lang, style, col)}
              <div class="space-y-2">
                ${data.languages.map(l => `
                  <div class="flex justify-between text-xs p-2 rounded-xl bg-slate-50">
                    <span class="font-extrabold text-slate-800">${l.name}</span>
                    <span class="text-slate-500 font-bold">${l.level}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// LAYOUT ENGINE 7: Elegant (Serif centre, lignes fines)
// -------------------------------------------------------------
function renderElegantTemplate(data, col, dir, style) {
  const p = data.personal;
  const titles = {
    fr: { exp: "Expérience", edu: "Formation", skills: "Compétences", lang: "Langues", profile: "Profil" },
    ar: { exp: "الخبرة", edu: "التعليم", skills: "المهارات", lang: "اللغات", profile: "نبذة" },
    en: { exp: "Experience", edu: "Education", skills: "Skills", lang: "Languages", profile: "Profile" }
  }[config.cvLang];

  const header = (title) => `<div class="flex items-center gap-3 my-1"><span class="flex-grow h-px bg-slate-200"></span><span class="text-[11px] font-black uppercase tracking-[0.25em]" style="color:${col.hex}">${title}</span><span class="flex-grow h-px bg-slate-200"></span></div>`;

  return `
    <div class="space-y-5">
      <div class="text-center space-y-2 pb-2">
        ${p.photo ? `<img src="${p.photo}" class="w-24 h-24 rounded-full object-cover mx-auto shadow-md" style="border:3px solid ${col.hex}">` : ''}
        <h1 class="text-3xl font-black tracking-tight text-slate-800" style="font-family: 'Playfair Display', serif;">${p.name || 'Votre Nom'}</h1>
        <p class="text-xs font-bold uppercase tracking-[0.3em]" style="color:${col.hex}">${p.title || 'Votre Titre'}</p>
        <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-semibold pt-1">
          ${p.email ? `<span>${p.email}</span>` : ''}
          ${p.phone ? `<span>• ${p.phone}</span>` : ''}
          ${p.address ? `<span>• ${p.address}</span>` : ''}
          ${p.website ? `<span>• ${p.website}</span>` : ''}
        </div>
      </div>

      ${data.summary ? `${header(titles.profile)}<p class="text-center text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">${data.summary}</p>` : ''}

      ${data.experiences.length > 0 ? `
        ${header(titles.exp)}
        <div class="space-y-4">
          ${data.experiences.map(exp => `
            <div class="${getStyleClass(style)}">
              <div class="flex justify-between items-baseline">
                <span class="text-sm font-bold text-slate-800">${exp.role} <span class="text-slate-400 font-semibold">— ${exp.company}</span></span>
                <span class="text-[11px] text-slate-400 font-semibold whitespace-nowrap">${exp.start} - ${exp.end}</span>
              </div>
              <p class="text-xs text-slate-600 whitespace-pre-line leading-relaxed mt-1">${exp.desc}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.education.length > 0 ? `
        ${header(titles.edu)}
        <div class="space-y-3">
          ${data.education.map(edu => `
            <div class="${getStyleClass(style)}">
              <div class="flex justify-between items-baseline">
                <span class="text-sm font-bold text-slate-800">${edu.degree} <span class="text-slate-400 font-semibold">— ${edu.school}</span></span>
                <span class="text-[11px] text-slate-400 font-semibold whitespace-nowrap">${edu.start} - ${edu.end}</span>
              </div>
              ${edu.desc ? `<p class="text-xs text-slate-500 italic mt-1">${edu.desc}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${data.skills.length > 0 ? `
          <div>
            ${header(titles.skills)}
            <div class="${style === 'compact-badge' ? 'flex flex-wrap gap-2 justify-center' : 'space-y-2'}">
              ${data.skills.map(s => renderSkillTag(s, style, col)).join('')}
            </div>
          </div>
        ` : ''}
        ${data.languages.length > 0 ? `
          <div>
            ${header(titles.lang)}
            <div class="space-y-1.5">
              ${data.languages.map(l => `
                <div class="flex justify-between text-xs">
                  <span class="font-bold text-slate-800">${l.name}</span>
                  <span class="text-slate-500">${l.level}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// AD GATE & VIDEO COUNTDOWN SYSTEM
// -------------------------------------------------------------
let adCountdownInterval = null;
let currentRemainingSeconds = 15;
let isVideoFinished = false;

function triggerDownloadModal() {
  const modal = document.getElementById("video-gate-modal");
  const card = document.getElementById("video-gate-card");
  const video = document.getElementById("gate-video");
  const t = translations[config.uiLang];

  document.getElementById("txt-modal-badge").textContent = t.modal.badge;
  document.getElementById("txt-modal-title").textContent = t.modal.title;
  document.getElementById("txt-modal-desc").textContent = t.modal.desc;
  document.getElementById("txt-click-to-play").textContent = t.modal.play;
  document.getElementById("txt-pause-warn").textContent = t.modal.pause;
  document.getElementById("txt-pause-warn-desc").textContent = t.modal.pauseDesc;
  document.getElementById("video-timer").textContent = "15" + t.modal.remaining;
  document.getElementById("txt-final-btn-label").textContent = t.buttons.unlock;

  modal.classList.remove("opacity-0", "pointer-events-none");
  card.classList.remove("scale-95");
  card.classList.add("scale-100");

  isVideoFinished = false;
  currentRemainingSeconds = 15;
  updateCountdownRing(0);

  const finalBtn = document.getElementById("final-download-btn");
  finalBtn.disabled = true;
  finalBtn.className = "w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-400 font-extrabold rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed border border-slate-200 dark:border-slate-700/50";
  document.getElementById("final-btn-lock-icon").setAttribute("data-lucide", "lock");

  const closeBtn = document.getElementById("close-modal-btn");
  closeBtn.disabled = true;

  const overlay = document.getElementById("video-overlay");
  const pauseWarning = document.getElementById("video-pause-warning");

  overlay.onclick = () => {
    video.play();
    overlay.classList.add("opacity-0", "pointer-events-none");
    startAdCountdownTimer(video);
  };

  video.onpause = () => {
    if (!isVideoFinished) {
      pauseWarning.classList.remove("opacity-0", "pointer-events-none");
      pauseWarning.classList.add("opacity-100");
      clearInterval(adCountdownInterval);
    }
  };

  video.onplay = () => {
    pauseWarning.classList.add("opacity-0", "pointer-events-none");
    pauseWarning.classList.remove("opacity-100");
    startAdCountdownTimer(video);
  };

  video.onended = () => {
    completeAdWatchFlow();
  };

  closeBtn.onclick = () => {
    video.pause();
    clearInterval(adCountdownInterval);
    modal.classList.add("opacity-0", "pointer-events-none");
  };

  safeCreateIcons();
}

function startAdCountdownTimer(video) {
  clearInterval(adCountdownInterval);
  const t = translations[config.uiLang];

  adCountdownInterval = setInterval(() => {
    if (video.paused || video.seeking) return;

    currentRemainingSeconds--;
    if (currentRemainingSeconds <= 0) {
      currentRemainingSeconds = 0;
      clearInterval(adCountdownInterval);
      completeAdWatchFlow();
    }

    const percentage = Math.round(((15 - currentRemainingSeconds) / 15) * 100);
    document.getElementById("video-timer").textContent = currentRemainingSeconds + t.modal.remaining;
    document.getElementById("video-percentage").textContent = percentage + "%";
    updateCountdownRing(percentage);
  }, 1000);
}

function updateCountdownRing(percentage) {
  const circle = document.getElementById("progress-circle-ring");
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

function completeAdWatchFlow() {
  isVideoFinished = true;
  clearInterval(adCountdownInterval);
  const t = translations[config.uiLang];

  triggerConfettiExplosion();

  document.getElementById("video-timer").innerHTML = `<span class="text-emerald-500 font-extrabold flex items-center gap-1"><i data-lucide="check-circle" class="w-4 h-4"></i> ${t.modal.finished}</span>`;
  document.getElementById("video-percentage").textContent = "100%";
  updateCountdownRing(100);

  document.getElementById("close-modal-btn").disabled = false;

  const finalBtn = document.getElementById("final-download-btn");
  finalBtn.disabled = false;
  finalBtn.className = "w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/30 animate-bounce transition-all transform hover:-translate-y-0.5";

  document.getElementById("txt-final-btn-label").textContent = t.buttons.unlocked;
  document.getElementById("final-btn-lock-icon").setAttribute("data-lucide", "download-cloud");

  finalBtn.onclick = () => {
    executePDFGeneration();
    setTimeout(() => {
      const modal = document.getElementById("video-gate-modal");
      modal.classList.add("opacity-0", "pointer-events-none");
    }, 1500);
  };

  safeCreateIcons();
}

function triggerConfettiExplosion() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    safeConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    safeConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

// -------------------------------------------------------------
// EXPORT PDF FIABLE (html2canvas-pro + jsPDF, pagination A4 propre)
// -------------------------------------------------------------
function generateCleanPdf() {
  const source = document.getElementById("cv-preview");
  if (!source) return;
  // Repli sur l'impression navigateur si les librairies manquent
  if (typeof html2canvas === "undefined" || !window.jspdf) {
    window.print();
    return;
  }

  const btn = document.getElementById("trigger-download-modal-btn");
  const btnHtml = btn ? btn.innerHTML : null;
  if (btn) {
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.7";
    btn.innerHTML = '<span class="inline-flex items-center gap-2"><i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>Generation du PDF...</span>';
    if (typeof lucide !== "undefined" && lucide.createIcons) { try { lucide.createIcons({ node: btn }); } catch (e) {} }
  }

  // Clone hors-ecran, non zoome, largeur A4 exacte, hauteur naturelle
  const clone = source.cloneNode(true);
  clone.id = "cv-preview-pdf-clone";
  clone.style.transform = "none";
  clone.style.position = "fixed";
  clone.style.left = "-10000px";
  clone.style.top = "0";
  clone.style.margin = "0";
  clone.style.width = "210mm";
  clone.style.minHeight = "0";
  clone.style.height = "auto";
  clone.style.boxShadow = "none";
  clone.style.borderRadius = "0";
  document.body.appendChild(clone);
  if (typeof lucide !== "undefined" && lucide.createIcons) { try { lucide.createIcons({ node: clone }); } catch (e) {} }

  const restore = function () {
    try { document.body.removeChild(clone); } catch (e) {}
    if (btn && btnHtml !== null) {
      btn.innerHTML = btnHtml;
      btn.style.pointerEvents = "";
      btn.style.opacity = "";
      if (typeof lucide !== "undefined" && lucide.createIcons) { try { lucide.createIcons({ node: btn }); } catch (e) {} }
    }
  };

  const safeName = (typeof cvData !== "undefined" && cvData.personal && cvData.personal.name)
    ? cvData.personal.name.trim().replace(/\s+/g, "_")
    : "Mon_CV_Go";
  const fileName = "CV_" + safeName + ".pdf";

  setTimeout(function () {
    html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight
    }).then(function (canvas) {
      try {
        const JsPDF = window.jspdf.jsPDF;
        const pdf = new JsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
        const pageWmm = 210, pageHmm = 297;
        const fullHmm = canvas.height * pageWmm / canvas.width;

        if (fullHmm <= pageHmm + 1) {
          pdf.addImage(canvas.toDataURL("image/jpeg", 0.96), "JPEG", 0, 0, pageWmm, fullHmm);
        } else {
          const sliceHpx = Math.floor(canvas.width * pageHmm / pageWmm);
          let offset = 0, page = 0;
          while (offset < canvas.height) {
            const h = Math.min(sliceHpx, canvas.height - offset);
            const pageCanvas = document.createElement("canvas");
            pageCanvas.width = canvas.width;
            pageCanvas.height = h;
            const ctx = pageCanvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            ctx.drawImage(canvas, 0, offset, canvas.width, h, 0, 0, canvas.width, h);
            const hmm = h * pageWmm / canvas.width;
            if (page > 0) pdf.addPage();
            pdf.addImage(pageCanvas.toDataURL("image/jpeg", 0.96), "JPEG", 0, 0, pageWmm, hmm);
            offset += h;
            page++;
          }
        }
        pdf.save(fileName);
      } catch (e) {
        console.error("PDF generation failed:", e);
        alert("Une erreur est survenue lors de la generation du PDF. Reessayez.");
      } finally {
        restore();
      }
    }).catch(function (err) {
      console.error("html2canvas failed:", err);
      restore();
      alert("Impossible de generer le PDF. Verifiez votre connexion internet et reessayez.");
    });
  }, 250);
}

// -------------------------------------------------------------
// HIGH-RESOLUTION UN-SCALED CLONE PDF EXPORTER (FLAWLESS RE-ENGINEER)
// -------------------------------------------------------------
function executePDFGeneration() {
  // Export PDF fiable A4 (html2canvas-pro + jsPDF). Voir generateCleanPdf().
  generateCleanPdf();
  return;

  // --- Ancien code html2pdf desactive (laisse pour reference) ---
  const element = document.getElementById("cv-preview");
  if (!element) return;

  // Create an off-screen, completely unscaled A4 replica clone to prevent any html2canvas scaling and clipping bugs
  const clone = element.cloneNode(true);
  clone.id = "cv-preview-pdf-clone";
  clone.style.transform = "none";
  clone.style.position = "absolute";
  clone.style.left = "-9999px";
  clone.style.top = "0";
  clone.style.width = "210mm";
  clone.style.minHeight = "297mm";
  clone.style.boxShadow = "none";
  clone.style.margin = "0";
  clone.style.padding = "18mm 15mm";

  document.body.appendChild(clone);

  // Re-initialize vector icons in the off-screen clone target
  if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
    lucide.createIcons({
      attrs: { class: "lucide-icon" },
      node: clone
    });
  }

  const pdfName = cvData.personal.name ? cvData.personal.name.replace(/\s+/g, '_') : 'Mon_CV_Go';

  const opt = {
    margin:       0,
    filename:     `CV_Go_${pdfName}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { 
      scale: 3, 
      useCORS: true, 
      letterRendering: true,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Convert clone to PDF and save seamlessly
  html2pdf().set(opt).from(clone).save().then(() => {
    // Clean up clone elements immediately
    document.body.removeChild(clone);
  }).catch((err) => {
    console.error("Vector PDF rendering failed:", err);
    try { document.body.removeChild(clone); } catch (e) {}
    alert("Une erreur est survenue lors de l'impression PDF. Veuillez réessayer.");
  });
}

// -------------------------------------------------------------
// NEW LAYOUT ENGINES
// -------------------------------------------------------------

function renderModernTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="modern-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderTimelineTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="timeline-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderSidebarRightTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="sidebarRight-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderSplitTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="split-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderCenteredTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="centered-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderCompactTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="compact-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderPortfolioTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="portfolio-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderCorporateTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="corporate-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderStartupTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="startup-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderAcademicTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="academic-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderInfographicTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="infographic-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderGradientTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="gradient-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderHybridTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="hybrid-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

// -------------------------------------------------------------
// NEW LAYOUT ENGINES
// -------------------------------------------------------------

function renderModernTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="modern-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderTimelineTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="timeline-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderSidebarRightTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="sidebarRight-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderSplitTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="split-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderCenteredTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="centered-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderCompactTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="compact-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderPortfolioTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="portfolio-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderCorporateTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="corporate-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderStartupTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="startup-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderAcademicTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="academic-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderInfographicTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="infographic-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderGradientTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="gradient-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}

function renderHybridTemplate(data, col, dir, style) {
  // Utilizing a slightly varied structure for each layout.
  // For now, wrapping the classic template in a unique container class to differentiate them.
  return '<div class="hybrid-layout-wrapper p-4 rounded-xl" style="border-top: 4px solid ' + col.hex + ';">' + 
         renderClassicTemplate(data, col, dir, style) + 
         '</div>';
}
