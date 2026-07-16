import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResume } from '../../context/ResumeContext';
import { compressImage } from '../../utils/imageCompressor';

export default function PersonalInfoForm() {
  const { t } = useTranslation();
  const { cvData, updatePersonal } = useResume();
  const data = cvData.personal;

  const handleChange = (e) => {
    updatePersonal(e.target.name, e.target.value);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">{t('forms.personal.title')}</h3>
      
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
        <div className="relative group">
          {data.photo ? (
            <img src={data.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-lg" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-slate-800 shadow-inner flex items-center justify-center text-slate-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                try {
                  const compressedBase64 = await compressImage(file, 400, 400, 0.8);
                  updatePersonal('photo', compressedBase64);
                } catch (err) {
                  console.error("Erreur lors de la compression de la photo", err);
                  alert("Impossible de charger la photo.");
                }
              }
            }} />
          </label>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t("forms.personal.photo")}</p>
          <p className="text-xs text-slate-500 mt-1">{t("forms.personal.photo_desc")}</p>
          {data.photo && (
            <button onClick={() => updatePersonal('photo', '')} className="text-xs text-red-500 hover:text-red-600 font-bold mt-2">
              {t('forms.personal.photo_delete')}
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('forms.personal.name')}</label>
          <input 
            type="text" 
            name="name"
            value={data.name || ''} 
            onChange={handleChange} 
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-[#d4af37] outline-none" 
            placeholder={t('forms.personal.name_ph')}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('forms.personal.profile_title')}</label>
          <input 
            type="text" 
            name="title"
            value={data.title || ''} 
            onChange={handleChange} 
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-[#d4af37] outline-none" 
            placeholder={t('forms.personal.profile_title_ph')}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('forms.personal.email')}</label>
          <input 
            type="email" 
            name="email"
            value={data.email || ''} 
            onChange={handleChange} 
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-[#d4af37] outline-none" 
            placeholder={t('forms.personal.email_ph')}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('forms.personal.phone')}</label>
          <input 
            type="tel" 
            name="phone"
            value={data.phone || ''} 
            onChange={handleChange} 
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-[#d4af37] outline-none" 
            placeholder={t('forms.personal.phone_ph')}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('forms.personal.address')}</label>
          <input 
            type="text" 
            name="address"
            value={data.address || ''} 
            onChange={handleChange} 
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-[#d4af37] outline-none" 
            placeholder={t('forms.personal.address_ph')}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{t('forms.personal.website')}</label>
          <input 
            type="text" 
            name="website"
            value={data.website || ''} 
            onChange={handleChange} 
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-[#d4af37] outline-none" 
            placeholder={t('forms.personal.website_ph')}
          />
        </div>
      </div>
    </div>
  );
}
