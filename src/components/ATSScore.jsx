import React, { useMemo } from 'react';
import { useResume } from '../context/ResumeContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ATSScore() {
  const { cvData } = useResume();
  const { t } = useTranslation();

  const scoreDetails = useMemo(() => {
    let score = 0;
    const feedback = [];

    // 1. Personal Info (max 30)
    const personal = cvData.personal || {};
    if (personal.name && personal.name.length > 2) {
      score += 10;
    } else {
      feedback.push(t("ats.feedback.name"));
    }
    
    if (personal.email && personal.email.includes('@')) {
      score += 10;
    } else {
      feedback.push(t("ats.feedback.email"));
    }
    
    if (personal.phone && personal.phone.length > 5) {
      score += 10;
    } else {
      feedback.push(t("ats.feedback.phone"));
    }

    // 2. Summary (max 20)
    if (cvData.summary && cvData.summary.length > 50) {
      score += 20;
    } else {
      feedback.push(t("ats.feedback.summary"));
    }

    // 3. Experiences (max 30)
    const experiences = cvData.experiences || [];
    const validExperiences = experiences.filter(exp => exp.role && exp.desc && exp.desc.length > 30);
    if (validExperiences.length >= 2) {
      score += 30;
    } else if (validExperiences.length === 1) {
      score += 15;
      feedback.push(t("ats.feedback.experience_more"));
    } else {
      feedback.push(t("ats.feedback.experience_missing"));
    }

    // 4. Skills (max 20)
    const skills = cvData.skills || [];
    if (skills.length >= 5) {
      score += 20;
    } else if (skills.length >= 3) {
      score += 10;
      feedback.push(t("ats.feedback.skills_more"));
    } else {
      feedback.push(t("ats.feedback.skills_missing"));
    }

    return { score, feedback };
  }, [cvData, t]);

  const { score, feedback } = scoreDetails;

  // Determine color based on score
  let colorClass = "text-red-500";
  let bgClass = "bg-red-50 dark:bg-red-900/20";
  let borderClass = "border-red-200 dark:border-red-900/50";
  let progressColor = "bg-red-500";
  
  if (score >= 80) {
    colorClass = "text-emerald-500";
    bgClass = "bg-emerald-50 dark:bg-emerald-900/20";
    borderClass = "border-emerald-200 dark:border-emerald-900/50";
    progressColor = "bg-emerald-500";
  } else if (score >= 50) {
    colorClass = "text-amber-500";
    bgClass = "bg-amber-50 dark:bg-amber-900/20";
    borderClass = "border-amber-200 dark:border-amber-900/50";
    progressColor = "bg-amber-500";
  }

  return (
    <div className={`rounded-xl p-3 sm:p-4 border ${bgClass} ${borderClass} transition-colors duration-300`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            {t('ats.title')}
            <span className="group relative inline-block cursor-help">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                {t('ats.tooltip')}
              </span>
            </span>
          </h3>
        </div>
        <div className={`text-xl sm:text-2xl font-black ${colorClass}`}>
          {score}<span className="text-sm opacity-50">/100</span>
        </div>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mb-2 overflow-hidden">
        <div 
          className={`h-1.5 rounded-full ${progressColor} transition-all duration-1000 ease-out`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <div className="space-y-1">
        {score === 100 ? (
          <p className="text-[10px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-start gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            Parfait ! Votre CV est hautement optimisé et prêt à être envoyé.
          </p>
        ) : (
          feedback.slice(0, 3).map((fb, idx) => (
            <p key={idx} className="text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 flex items-start gap-1 leading-tight">
              <AlertCircle className={`w-3 h-3 shrink-0 mt-0.5 ${colorClass}`} />
              {fb}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
