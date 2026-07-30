const fs = require('fs');
const path = require('path');

const locales = ['fr', 'en', 'ar'];
const localesDir = path.join(__dirname, 'src', 'locales');

const testimonials = {
  fr: {
    "testimonials_title": "Ce qu'ils disent de nous",
    "test_1_name": "Julien M.",
    "test_1_role": "Développeur Front-End",
    "test_1_text": "J'avais un mal fou à passer l'étape des filtres ATS avec mon ancien CV fait sur Word. Après avoir utilisé le modèle moderne de Mon CV Go, j'ai décroché 3 entretiens en deux semaines. Le design épuré et la structure ont fait toute la différence !",
    "test_2_name": "Sarah K.",
    "test_2_role": "Responsable Marketing",
    "test_2_text": "L'outil est incroyablement simple à utiliser. J'ai particulièrement apprécié les conseils intégrés qui m'ont aidé à reformuler mes expériences en véritables accomplissements chiffrés. Mon portfolio a également impressionné les recruteurs.",
    "test_3_name": "Amine B.",
    "test_3_role": "Jeune Diplômé en Finance",
    "test_3_text": "En tant que junior, c'est difficile de se démarquer. Mon CV Go m'a permis de mettre en valeur mes projets étudiants et mes soft skills de manière ultra-professionnelle. Je recommande à 100% à tous les étudiants en recherche de stage ou de premier emploi."
  },
  en: {
    "testimonials_title": "What They Say About Us",
    "test_1_name": "Julian M.",
    "test_1_role": "Front-End Developer",
    "test_1_text": "I was having a terrible time getting past the ATS filters with my old Word resume. After using the modern template from Mon CV Go, I landed 3 interviews in two weeks. The clean design and structure made all the difference!",
    "test_2_name": "Sarah K.",
    "test_2_role": "Marketing Manager",
    "test_2_text": "The tool is incredibly simple to use. I particularly appreciated the built-in advice that helped me rephrase my experiences into true quantifiable achievements. My portfolio also impressed the recruiters.",
    "test_3_name": "Amin B.",
    "test_3_role": "Recent Finance Graduate",
    "test_3_text": "As a junior, it's hard to stand out. Mon CV Go allowed me to highlight my student projects and soft skills in an ultra-professional way. I 100% recommend it to all students looking for an internship or first job."
  },
  ar: {
    "testimonials_title": "ماذا يقولون عنا",
    "test_1_name": "جوليان م.",
    "test_1_role": "مطور واجهة أمامية",
    "test_1_text": "كنت أواجه وقتًا عصيبًا في تجاوز فلاتر ATS بسيرتي الذاتية القديمة التي صممتها على Word. بعد استخدام النموذج الحديث من Mon CV Go، حصلت على 3 مقابلات في أسبوعين. التصميم الأنيق والهيكل أحدثا كل الفرق!",
    "test_2_name": "سارة ك.",
    "test_2_role": "مديرة تسويق",
    "test_2_text": "الأداة سهلة الاستخدام بشكل لا يصدق. لقد قدرت بشكل خاص النصائح المدمجة التي ساعدتني في إعادة صياغة تجاربي إلى إنجازات حقيقية قابلة للقياس. كما أثار ملف أعمالي إعجاب مسؤولي التوظيف.",
    "test_3_name": "أمين ب.",
    "test_3_role": "خريج حديث في المالية",
    "test_3_text": "بصفتي خريجًا حديثًا، من الصعب التميز. سمح لي Mon CV Go بإبراز مشاريعي الطلابية ومهاراتي الشخصية بطريقة احترافية للغاية. أوصي به بنسبة 100٪ لجميع الطلاب الذين يبحثون عن تدريب أو وظيفة أولى."
  }
};

locales.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const content = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(content);
  
  if (!json.about) {
    json.about = {};
  }
  
  // Merge new testimonials into the "about" section
  Object.assign(json.about, testimonials[lang]);
  
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
  console.log(`Updated ${lang}.json`);
});
