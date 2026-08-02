const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');

const frPath = path.join(localesDir, 'fr.json');
const enPath = path.join(localesDir, 'en.json');
const arPath = path.join(localesDir, 'ar.json');

// --- French Updates ---
let fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));
fr.translation.home.faq_title = "Questions Fréquentes (FAQ)";
fr.translation.home.faq_1_q = "Est-ce que la création de CV est vraiment 100% gratuite ?";
fr.translation.home.faq_1_a = "Oui, absolument. Contrairement à de nombreux sites qui vous demandent de payer à la dernière étape de téléchargement, Mon CV Go est un service entièrement gratuit, soutenu par la publicité. Vous pouvez générer, modifier et télécharger autant de CV que vous le souhaitez sans jamais avoir à sortir votre carte bancaire.";
fr.translation.home.faq_2_q = "Qu'est-ce qu'un système ATS et pourquoi mon score est-il important ?";
fr.translation.home.faq_2_a = "Un ATS (Applicant Tracking System) est un logiciel utilisé par les recruteurs pour trier automatiquement les CV reçus. Si votre CV n'est pas optimisé pour ces logiciels (mauvais mots-clés, structure complexe, format non lisible), il sera rejeté avant même d'être lu par un humain. Notre jauge de Score ATS vous garantit que votre CV respecte tous les critères techniques requis.";
fr.translation.home.faq_3_q = "Mes données personnelles sont-elles en sécurité ?";
fr.translation.home.faq_3_a = "La protection de votre vie privée est notre priorité absolue. Nous avons conçu Mon CV Go pour fonctionner localement dans votre navigateur. Cela signifie que toutes les informations que vous saisissez (nom, adresse, expériences) ne quittent jamais votre ordinateur et ne sont pas stockées sur nos serveurs.";
fr.translation.home.faq_4_q = "Quel format de téléchargement privilégier pour mon CV ?";
fr.translation.home.faq_4_a = "Nous recommandons toujours le format PDF. Ce format garantit que la mise en page, les polices et le design global de votre document resteront exactement les mêmes, quel que soit l'appareil (ordinateur, tablette, smartphone) ou le système d'exploitation utilisé par le recruteur pour l'ouvrir.";

fr.translation.about.p1 = "L'idée derrière Mon CV Go est simple : proposer un outil de création de CV performant, sans abonnements complexes ni coûts cachés. Trop de candidats perdent un temps précieux sur des plateformes qui se révèlent payantes au moment du téléchargement. Nous voulons redonner le pouvoir aux chercheurs d'emploi en leur fournissant des outils de qualité professionnelle, accessibles à tous.";
fr.translation.about.story_p1 = "Mon CV Go est né de la volonté de créer une alternative indépendante aux grands générateurs de CV payants. Ce projet a pour but d'offrir une plateforme fluide et sécurisée pour vous aider à postuler plus sereinement. Chaque mois, des milliers d'utilisateurs font confiance à notre outil pour structurer leur parcours professionnel et décrocher des entretiens. Notre équipe s'efforce continuellement d'améliorer la plateforme en suivant les dernières tendances en matière de recrutement et de ressources humaines.";

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));

// --- English Updates ---
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
en.translation.home.faq_title = "Frequently Asked Questions (FAQ)";
en.translation.home.faq_1_q = "Is resume creation really 100% free?";
en.translation.home.faq_1_a = "Yes, absolutely. Unlike many sites that ask you to pay at the final download step, Mon CV Go is a completely free service, supported by advertising. You can generate, edit, and download as many resumes as you want without ever having to take out your credit card.";
en.translation.home.faq_2_q = "What is an ATS system and why is my score important?";
en.translation.home.faq_2_a = "An ATS (Applicant Tracking System) is software used by recruiters to automatically sort received resumes. If your resume is not optimized for these programs (wrong keywords, complex structure, unreadable format), it will be rejected before a human even reads it. Our ATS Score gauge ensures your resume meets all necessary technical criteria.";
en.translation.home.faq_3_q = "Is my personal data secure?";
en.translation.home.faq_3_a = "Protecting your privacy is our top priority. We designed Mon CV Go to work locally in your browser. This means that all the information you enter (name, address, experience) never leaves your computer and is not stored on our servers.";
en.translation.home.faq_4_q = "Which download format should I choose for my resume?";
en.translation.home.faq_4_a = "We always recommend the PDF format. This format ensures that the layout, fonts, and overall design of your document will remain exactly the same, regardless of the device (computer, tablet, smartphone) or operating system the recruiter uses to open it.";

en.translation.about.p1 = "The idea behind Mon CV Go is simple: offer a powerful resume creation tool without complex subscriptions or hidden costs. Too many candidates waste precious time on platforms that turn out to be paid at the time of download. We want to empower job seekers by providing them with professional-grade tools, accessible to everyone.";
en.translation.about.story_p1 = "Mon CV Go was born from the desire to create an independent alternative to large paid resume generators. The goal of this project is to offer a smooth and secure platform to help you apply with more peace of mind. Every month, thousands of users trust our tool to structure their career path and land interviews. Our team continuously strives to improve the platform by following the latest trends in recruitment and human resources.";

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

// --- Arabic Updates ---
let ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
ar.translation.home.faq_title = "الأسئلة الشائعة (FAQ)";
ar.translation.home.faq_1_q = "هل إنشاء السيرة الذاتية مجاني 100% حقًا؟";
ar.translation.home.faq_1_a = "نعم، بالتأكيد. على عكس العديد من المواقع التي تطلب منك الدفع في خطوة التنزيل النهائية، Mon CV Go هي خدمة مجانية تمامًا، مدعومة بالإعلانات. يمكنك إنشاء وتعديل وتنزيل أي عدد تريده من السير الذاتية دون الحاجة إلى إخراج بطاقتك الائتمانية أبدًا.";
ar.translation.home.faq_2_q = "ما هو نظام ATS ولماذا النتيجة الخاصة بي مهمة؟";
ar.translation.home.faq_2_a = "نظام تتبع المتقدمين (ATS) هو برنامج يستخدمه مسؤولو التوظيف لفرز السير الذاتية المستلمة تلقائيًا. إذا لم تكن سيرتك الذاتية محسنة لهذه البرامج (كلمات رئيسية خاطئة، بنية معقدة، تنسيق غير مقروء)، فسيتم رفضها قبل أن يقرأها أي إنسان. يضمن مقياس نقاط ATS الخاص بنا أن سيرتك الذاتية تلبي جميع المعايير الفنية الضرورية.";
ar.translation.home.faq_3_q = "هل بياناتي الشخصية آمنة؟";
ar.translation.home.faq_3_a = "حماية خصوصيتك هي أولويتنا القصوى. لقد صممنا Mon CV Go ليعمل محليًا في متصفحك. هذا يعني أن جميع المعلومات التي تدخلها (الاسم، العنوان، الخبرة) لا تغادر جهاز الكمبيوتر الخاص بك أبدًا ولا يتم تخزينها على خوادمنا.";
ar.translation.home.faq_4_q = "ما هو تنسيق التنزيل الذي يجب أن أختاره لسيرتي الذاتية؟";
ar.translation.home.faq_4_a = "نوصي دائمًا بتنسيق PDF. يضمن هذا التنسيق أن التخطيط والخطوط والتصميم العام لمستندك ستبقى كما هي تمامًا، بغض النظر عن الجهاز (الكمبيوتر، الجهاز اللوحي، الهاتف الذكي) أو نظام التشغيل الذي يستخدمه مسؤول التوظيف لفتحه.";

ar.translation.about.p1 = "الفكرة وراء Mon CV Go بسيطة: تقديم أداة قوية لإنشاء السيرة الذاتية دون اشتراكات معقدة أو تكاليف خفية. يهدر العديد من المرشحين وقتًا ثمينًا على منصات يتبين أنها مدفوعة وقت التنزيل. نريد تمكين الباحثين عن عمل من خلال تزويدهم بأدوات ذات مستوى احترافي، في متناول الجميع.";
ar.translation.about.story_p1 = "ولدت Mon CV Go من الرغبة في إنشاء بديل مستقل لمولدات السير الذاتية الكبيرة المدفوعة. الهدف من هذا المشروع هو توفير منصة سلسة وآمنة لمساعدتك على التقدم للوظائف براحة بال أكبر. يثق الآلاف من المستخدمين كل شهر في أداتنا لتنظيم مسارهم المهني والحصول على مقابلات. يسعى فريقنا باستمرار لتحسين المنصة من خلال متابعة أحدث الاتجاهات في التوظيف والموارد البشرية.";

fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));

console.log('Translations updated successfully.');
