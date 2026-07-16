import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Trash2, Download, PenLine, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import SEO from '../components/SEO';
import DonationButton from '../components/DonationButton';

export default function CoverLetter() {
  const [language, setLanguage] = useState('fr');
  const [data, setData] = useState({
    senderName: '',
    senderPhone: '',
    senderEmail: '',
    senderAddress: '',
    company: '',
    recipient: '',
    city: '',
    date: '',
    subject: '',
    salutation: '',
    intro: '',
    body: '',
    closing: '',
    signoff: ''
  });

  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const letterRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        let availableWidth = entry.contentRect.width;
        if (availableWidth <= 0) {
          availableWidth = containerRef.current.parentElement.clientWidth;
        }
        availableWidth -= 32; // padding
        if (availableWidth > 50) {
          const a4Width = 794;
          setScale(Math.max(0.1, Math.min(1, availableWidth / a4Width)));
        }
      }
    });
    observer.observe(containerRef.current);
    
    const timer = setTimeout(() => {
      if (containerRef.current && containerRef.current.clientWidth > 50) {
        const a4Width = 794;
        setScale(Math.max(0.1, Math.min(1, (containerRef.current.clientWidth - 32) / a4Width)));
      }
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const loadExample = () => {
    if (language === 'ar') {
      setData({
        senderName: 'أحمد محمود', 
        senderPhone: '+213 555 12 34 56', 
        senderEmail: 'ahmed.mahmoud@email.com', 
        senderAddress: 'الجزائر العاصمة، الجزائر',
        company: 'شركة تكنو ويب', 
        recipient: 'قسم الموارد البشرية', 
        city: 'الجزائر', 
        date: '9 يوليو 2026',
        subject: 'الترشح لمنصب مطور واجهات الويب',
        salutation: 'سيدتي، سيدي،',
        intro: "أبحث حالياً عن تحدٍ مهني جديد، ويسعدني أن أقدم ترشيحي لمنصب مطور واجهات الويب في شركتكم، والتي أتابع إنجازاتها باهتمام.",
        body: "بفضل خبرتي الممتدة لسنتين في إنشاء واجهات المستخدم باستخدام React، طورت خبرة قوية في دمج الويب وتحسين الأداء. أتاح لي منصبي السابق العمل على مشاريع طموحة، من التصميم إلى الإنتاج، مع الالتزام بأفضل ممارسات إمكانية الوصول والتصميم المتجاوب.",
        closing: "إن الانضمام إلى فريقكم سيسمح لي بوضع مهاراتي في خدمة مشاريعكم مع الاستمرار في التطور في بيئة محفزة. أنا تحت تصرفكم بالكامل لإجراء مقابلة لتفصيل دوافعي شخصياً.",
        signoff: "تفضلوا بقبول فائق الاحترام والتقدير."
      });
    } else if (language === 'en') {
      setData({
        senderName: 'John Doe', 
        senderPhone: '+1 555 12 34 56', 
        senderEmail: 'john.doe@email.com', 
        senderAddress: 'New York, USA',
        company: 'TechnoWeb LLC', 
        recipient: 'Human Resources Department', 
        city: 'New York', 
        date: 'July 9, 2026',
        subject: 'Application for Front-End Web Developer',
        salutation: 'Dear Hiring Manager,',
        intro: "Currently seeking a new professional challenge, I am submitting my application for the Front-End Web Developer position at your company, whose achievements I follow with interest.",
        body: "With 2 years of experience creating user interfaces with React, I have developed strong expertise in web integration and performance optimization. My previous role allowed me to work on ambitious projects, from design to production, while adhering to the best practices of accessibility and responsive design.",
        closing: "Joining your team would allow me to put my skills at the service of your projects while continuing to grow in a stimulating environment. I am entirely at your disposal for an interview to detail my motivations in person.",
        signoff: "Sincerely,"
      });
    } else {
      setData({
        senderName: 'Jean Dupont', 
        senderPhone: '+213 555 12 34 56', 
        senderEmail: 'jean.dupont@email.com', 
        senderAddress: 'Alger, Algérie',
        company: 'TechnoWeb SARL', 
        recipient: 'Service des ressources humaines', 
        city: 'Alger', 
        date: 'le 9 juillet 2026',
        subject: 'Candidature au poste de Développeur web front-end',
        salutation: 'Madame, Monsieur,',
        intro: "Actuellement à la recherche d'un nouveau défi professionnel, je vous soumets ma candidature au poste de développeur web front-end au sein de votre entreprise, dont je suis avec intérêt les réalisations.",
        body: "Fort de 2 ans d'expérience dans la création d'interfaces utilisateur avec React, j'ai développé une solide expertise en intégration web et optimisation des performances. Mon précédent poste m'a permis de travailler sur des projets ambitieux, de la conception à la mise en production, tout en respectant les bonnes pratiques d'accessibilité et de design responsive.",
        closing: "Intégrer votre équipe me permettrait de mettre mes compétences au service de vos projets tout en continuant d'évoluer dans un environnement stimulant. Je me tiens à votre entière disposition pour un entretien afin de vous détailler de vive voix mes motivations.",
        signoff: "Je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées."
      });
    }
  };

  const resetData = () => {
    const emptyData = {};
    Object.keys(data).forEach(k => emptyData[k] = '');
    setData(emptyData);
  };

  const handlePrint = useReactToPrint({
    contentRef: letterRef,
    documentTitle: 'lettre-motivation',
  });

  const downloadPDF = () => {
    handlePrint();
  };

  // Helper for rendering line breaks properly
  const renderText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => (
      <span key={i}>{line}<br /></span>
    ));
  };

  return (
    <>
    <SEO title="Générateur de Lettre de Motivation Gratuit avec IA" description="Rédigez une lettre de motivation convaincante facilement. Notre générateur gratuit avec assistant IA vous aide à postuler efficacement." url="https://www.moncvgo.com/lettre-motivation" />
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-[calc(100vh-4rem)] flex flex-col relative overflow-hidden">
      
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* Header Info */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#0F172A]/50 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <PenLine className="w-6 h-6 text-blue-500" />
              Générateur de Lettre de Motivation
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Rédigez ou laissez l'IA vous aider. Aperçu direct et export PDF gratuit.
            </p>
          </div>
          
          <div className="flex gap-2">
            <button className="flex lg:hidden items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-xl text-sm font-bold transition-all" onClick={() => setShowPreviewMobile(!showPreviewMobile)}>
              <Eye className="w-4 h-4" />
              {showPreviewMobile ? "Éditer" : "Aperçu"}
            </button>
            <button onClick={downloadPDF} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Télécharger PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      </section>

      <main className="flex-grow max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: Editor Form */}
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`w-full lg:w-1/2 xl:w-5/12 flex flex-col gap-6 ${showPreviewMobile ? 'hidden lg:flex' : 'flex'}`}
        >
          {/* Form Container */}
          <div className="bg-white dark:bg-[#0F172A] rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex-grow">
            
            <div className="flex flex-wrap gap-2 mb-8 justify-between items-center">
              <div className="flex gap-2">
                <button onClick={loadExample} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-bold rounded-lg transition border border-blue-200 dark:border-blue-800">
                  <Sparkles className="w-3.5 h-3.5" /> Exemple
                </button>
                <button onClick={resetData} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition border border-slate-200 dark:border-slate-700">
                  <Trash2 className="w-3.5 h-3.5" /> Effacer
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-500">Langue :</label>
                <select 
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    // Automatically load the example for the new language if the form is empty
                    if (!data.senderName && !data.intro) {
                      setTimeout(() => loadExample(), 50);
                    }
                  }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="ar">العربية (Arabe)</option>
                </select>
              </div>
            </div>

            <div className="space-y-8">
              {/* Vos coordonnées */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-blue-200 dark:bg-blue-900"></span> Vos coordonnées
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Nom complet</label>
                    <input className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.senderName} onChange={e => handleChange('senderName', e.target.value)} placeholder="Jean Dupont" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Téléphone</label>
                    <input className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.senderPhone} onChange={e => handleChange('senderPhone', e.target.value)} placeholder="+213 555 12 34 56" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">E-mail</label>
                    <input className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.senderEmail} onChange={e => handleChange('senderEmail', e.target.value)} placeholder="jean.dupont@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Adresse</label>
                    <input className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.senderAddress} onChange={e => handleChange('senderAddress', e.target.value)} placeholder="Alger, Algérie" />
                  </div>
                </div>
              </section>

              {/* Destinataire */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-blue-200 dark:bg-blue-900"></span> Destinataire
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Entreprise</label>
                    <input className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.company} onChange={e => handleChange('company', e.target.value)} placeholder="Nom de l'entreprise" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Service / Personne</label>
                    <input className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.recipient} onChange={e => handleChange('recipient', e.target.value)} placeholder="Service des ressources humaines" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Ville</label>
                    <input className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.city} onChange={e => handleChange('city', e.target.value)} placeholder="Alger" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Date</label>
                    <input className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.date} onChange={e => handleChange('date', e.target.value)} placeholder="le 9 juillet 2026" />
                  </div>
                </div>
              </section>

              {/* Contenu */}
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-blue-200 dark:bg-blue-900"></span> Contenu
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Objet de la lettre</label>
                    <input className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.subject} onChange={e => handleChange('subject', e.target.value)} placeholder="Candidature au poste de..." />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Formule d'appel</label>
                    <input className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.salutation} onChange={e => handleChange('salutation', e.target.value)} placeholder="Madame, Monsieur," />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Introduction</label>
                    <textarea rows="3" className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.intro} onChange={e => handleChange('intro', e.target.value)} placeholder="Présentez votre candidature..."></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Développement</label>
                    <textarea rows="5" className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.body} onChange={e => handleChange('body', e.target.value)} placeholder="Mettez en avant vos compétences..."></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Conclusion</label>
                    <textarea rows="3" className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.closing} onChange={e => handleChange('closing', e.target.value)} placeholder="Proposez un entretien..."></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Formule de politesse</label>
                    <input className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" value={data.signoff} onChange={e => handleChange('signoff', e.target.value)} placeholder="Je vous prie d'agréer..." />
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="mt-4">
            <DonationButton />
          </div>
        </motion.section>

        {/* RIGHT COLUMN: Live Preview */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`w-full lg:w-1/2 xl:w-7/12 flex flex-col gap-4 ${!showPreviewMobile ? 'hidden lg:flex' : 'flex'}`}
        >
          <div ref={containerRef} className="cv-preview-container flex-grow rounded-3xl border border-slate-200 dark:border-slate-800 relative z-10 shadow-inner overflow-hidden flex justify-center p-4 bg-slate-200 dark:bg-slate-800/50">
            <div 
              style={{ width: `${794 * scale}px`, height: `${1123 * scale}px` }}
              className="relative transition-all duration-200"
            >
              <div 
                ref={letterRef}
                id="cv-export-container"
                className="bg-white mx-auto cv-page shadow-2xl absolute top-0 left-0 origin-top-left transition-transform duration-200"
                style={{ width: '794px', minHeight: '1123px', transform: `scale(${scale})` }}
              >
                <div style={{ padding: '25mm', width: '100%', height: '100%', boxSizing: 'border-box' }} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {/* Header (Coordonnées) */}
                  <div className="flex justify-between items-start text-sm text-gray-800 mb-12 font-inter">
                    <div className="w-1/2">
                      {data.senderName && <div className="font-bold text-lg mb-1 text-gray-900">{data.senderName}</div>}
                      {data.senderAddress && <div>{data.senderAddress}</div>}
                      {data.senderPhone && <div className={`text-${language === 'ar' ? 'right' : 'left'}`} dir="ltr">{data.senderPhone}</div>}
                      {data.senderEmail && <div>{data.senderEmail}</div>}
                    </div>
                    
                    <div className={`w-1/2 mt-8 ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                      {data.company && <div className="font-bold text-gray-900 mb-1">{data.company}</div>}
                      {data.recipient && <div>
                        {language === 'ar' ? 'إلى عناية :' : language === 'en' ? 'To the attention of:' : "À l'attention de :"} {data.recipient}
                      </div>}
                    </div>
                  </div>

                  {/* Date & Lieu */}
                  {(data.city || data.date) && (
                    <div className={`text-sm text-gray-800 mb-8 font-inter ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                      {language === 'ar' ? 'في' : language === 'en' ? '' : 'À'} {data.city || '...'}
                      {language === 'en' ? ',' : '،'} {data.date || '...'}
                    </div>
                  )}

                  {/* Objet */}
                  {data.subject && (
                    <div className="text-sm font-bold text-gray-900 mb-8 font-inter break-words">
                      {language === 'ar' ? 'الموضوع :' : language === 'en' ? 'Subject:' : 'Objet :'} {data.subject}
                    </div>
                  )}

                  {/* Salutation */}
                  {data.salutation && (
                    <div className="text-sm text-gray-800 mb-6 font-inter">
                      {data.salutation}
                    </div>
                  )}

                  {/* Corps du texte */}
                  <div className="text-sm text-gray-800 space-y-4 font-inter leading-relaxed text-justify break-words">
                    {data.intro && <div>{renderText(data.intro)}</div>}
                    {data.body && <div>{renderText(data.body)}</div>}
                    {data.closing && <div>{renderText(data.closing)}</div>}
                  </div>

                  {/* Formule de politesse & Signature */}
                  <div className="text-sm text-gray-800 mt-8 space-y-6 font-inter">
                    {data.signoff && <div>{data.signoff}</div>}
                    {data.senderName && <div className={`font-bold mt-12 text-gray-900 ${language === 'ar' ? 'text-left ml-12' : 'text-right mr-12'}`}>{data.senderName}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
    </>
  );
}
