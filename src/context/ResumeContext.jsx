import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const [cvData, setCvData] = useState({
    personal: { name: "", title: "", email: "", phone: "", address: "", website: "", photo: "" },
    summary: "",
    experiences: [],
    education: [],
    skills: [],
    qualities: [],
    languages: [],
    projects: []
  });

  const [config, setConfig] = useState({
    uiLang: "fr",
    cvLang: "fr",
    template: "paris",
    color: "blue",
    font: "inter",
    fontSize: "normal",
    textColor: "#1e293b",
    spacing: "normal",
    activeTab: "style",
    autoFit: true
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('moncvgo_data');
    const savedConfig = localStorage.getItem('moncvgo_config');
    if (savedData) setCvData(JSON.parse(savedData));
    if (savedConfig) setConfig(JSON.parse(savedConfig));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('moncvgo_data', JSON.stringify(cvData));
      localStorage.setItem('moncvgo_config', JSON.stringify(config));
    } catch (e) {
      console.warn("Could not save to localStorage. Quota exceeded?", e);
    }
  }, [cvData, config]);

  const loadDemo = (lang) => {
    import('../utils/cvData').then((module) => {
      const demo = module.demoData[lang];
      if (demo) {
        setCvData(demo);
        setConfig(prev => ({ ...prev, cvLang: lang }));
      }
    });
  };

  const updatePersonal = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const updateSummary = (value) => {
    setCvData(prev => ({ ...prev, summary: value }));
  };

  const addExperience = (exp) => {
    setCvData(prev => ({ ...prev, experiences: [...prev.experiences, exp] }));
  };

  const updateExperience = (index, exp) => {
    setCvData(prev => {
      const newExp = [...prev.experiences];
      newExp[index] = exp;
      return { ...prev, experiences: newExp };
    });
  };

  const removeExperience = (index) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  const addEducation = (edu) => {
    setCvData(prev => ({ ...prev, education: [...prev.education, edu] }));
  };

  const updateEducation = (index, edu) => {
    setCvData(prev => {
      const newEdu = [...prev.education];
      newEdu[index] = edu;
      return { ...prev, education: newEdu };
    });
  };

  const removeEducation = (index) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = (skill) => {
    setCvData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  };

  const updateSkill = (index, skill) => {
    setCvData(prev => {
      const newSkills = [...prev.skills];
      newSkills[index] = skill;
      return { ...prev, skills: newSkills };
    });
  };

  const removeSkill = (index) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addQuality = (quality) => {
    setCvData(prev => ({ ...prev, qualities: [...(prev.qualities || []), quality] }));
  };

  const updateQuality = (index, quality) => {
    setCvData(prev => {
      const newQualities = [...(prev.qualities || [])];
      newQualities[index] = quality;
      return { ...prev, qualities: newQualities };
    });
  };

  const removeQuality = (index) => {
    setCvData(prev => ({
      ...prev,
      qualities: (prev.qualities || []).filter((_, i) => i !== index)
    }));
  };

  const addLanguage = (lang) => {
    setCvData(prev => ({ ...prev, languages: [...prev.languages, lang] }));
  };

  const updateLanguage = (index, lang) => {
    setCvData(prev => {
      const newLangs = [...prev.languages];
      newLangs[index] = lang;
      return { ...prev, languages: newLangs };
    });
  };

  const removeLanguage = (index) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const addProject = (project) => {
    setCvData(prev => ({ ...prev, projects: [...(prev.projects || []), project] }));
  };

  const updateProject = (index, project) => {
    setCvData(prev => {
      const newProjects = [...(prev.projects || [])];
      newProjects[index] = project;
      return { ...prev, projects: newProjects };
    });
  };

  const removeProject = (index) => {
    setCvData(prev => ({
      ...prev,
      projects: (prev.projects || []).filter((_, i) => i !== index)
    }));
  };

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const resetData = () => {
    setCvData({
      personal: { name: "", title: "", email: "", phone: "", address: "", website: "", photo: "" },
      summary: "",
      experiences: [],
      education: [],
      skills: [],
      qualities: [],
      languages: [],
      projects: []
    });
  };

  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      const cvDataToLoad = data.cvData || data;
      
      if (cvDataToLoad && cvDataToLoad.personal) {
        setCvData(cvDataToLoad); // Support both {cvData, config} format and direct cvData format
        if (data.config) {
          setConfig(data.config);
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error("Invalid JSON", e);
      return false;
    }
  };

  return (
    <ResumeContext.Provider value={{
      cvData, config, 
      updatePersonal, updateSummary,
      addExperience, updateExperience, removeExperience,
      addEducation, updateEducation, removeEducation,
      addSkill, updateSkill, removeSkill,
      addQuality, updateQuality, removeQuality,
      addLanguage, updateLanguage, removeLanguage,
      addProject, updateProject, removeProject,
      updateConfig, loadDemo, resetData, importData
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
