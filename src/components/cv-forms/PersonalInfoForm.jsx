import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResume } from '../../context/ResumeContext';
import { compressImage } from '../../utils/imageCompressor';

export default function PersonalInfoForm() {
  const { t } = useTranslation();
  const { cvData, updatePersonal, setFocusedSection } = useResume();
  const data = cvData.personal;

  const handleChange = (e) => {
    updatePersonal(e.target.name, e.target.value);
  };

  return (
    <div 
      className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
      onFocus={() => setFocusedSection && setFocusedSection('personal')}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setFocusedSection && setFocusedSection(null);
        }
      }}
    >
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
          <label htmlFor="photo-upload" aria-label="Upload photo" className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <input id="photo-upload" name="photo-upload" type="file" className="hidden" accept="image/*" onChange={async (e) => {
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
        <div className="flex-grow space-y-2">
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">Photo de profil</label>
          <div className="flex flex-wrap gap-2 my-1">
            <Link 
              to="/studio-photo" 
              className="w-full inline-flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="text-base">🪄</span> Studio Photo CV & Détourage IA
              </span>
              <span className="bg-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                1-Clic
              </span>
            </Link>
          </div>
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
          <label htmlFor="personal-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('forms.personal.name')}</label>
          <input 
            id="personal-name"
            type="text" 
            name="name"
            autoComplete="name"
            value={data.name || ''} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder={t('forms.personal.name_ph')}
          />
        </div>
        <div>
          <label htmlFor="personal-title" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('forms.personal.profile_title')}</label>
          <input 
            id="personal-title"
            type="text" 
            name="title"
            autoComplete="organization-title"
            value={data.title || ''} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder={t('forms.personal.profile_title_ph')}
          />
        </div>
        <div>
          <label htmlFor="personal-email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('forms.personal.email')}</label>
          <input 
            id="personal-email"
            type="email" 
            name="email"
            autoComplete="email"
            value={data.email || ''} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder={t('forms.personal.email_ph')}
          />
        </div>
        <div>
          <label htmlFor="personal-phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('forms.personal.phone')}</label>
          <input 
            id="personal-phone"
            type="tel" 
            name="phone"
            autoComplete="tel"
            value={data.phone || ''} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder={t('forms.personal.phone_ph')}
          />
        </div>
        <div>
          <label htmlFor="personal-birthDate" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('forms.personal.birthdate')}</label>
          <input 
            id="personal-birthDate"
            type="text" 
            name="birthDate"
            autoComplete="bday"
            value={data.birthDate || ''} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder={t('forms.personal.birthdate_ph')}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="personal-address" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('forms.personal.address')}</label>
          <input 
            id="personal-address"
            type="text" 
            name="address"
            autoComplete="street-address"
            value={data.address || ''} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder={t('forms.personal.address_ph')}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="personal-website" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('forms.personal.website')}</label>
          <input 
            id="personal-website"
            type="text" 
            name="website"
            autoComplete="url"
            value={data.website || ''} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder={t('forms.personal.website_ph')}
          />
        </div>
      </div>
    </div>
  );
}
