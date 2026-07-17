import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Use Vite's ?worker syntax to bundle the worker properly and avoid production MIME type issues
import PdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?worker';
pdfjsLib.GlobalWorkerOptions.workerPort = new PdfWorker();

export const extractTextFromWord = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

export const extractTextFromPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    text += textContent.items.map(s => s.str || '').join(' ') + '\n';
  }
  return text;
};

export const parseCVText = (text) => {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  const cvData = {
    personal: { name: "", email: "", phone: "", title: "", address: "", website: "", photo: "" },
    summary: "",
    experiences: [],
    education: [],
    skills: [],
    languages: []
  };

  // 1. Find Email
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) cvData.personal.email = emailMatch[0];

  // 2. Find Phone (French/Intl)
  const phoneRegex = /(\+?\d{1,4}[\s.-]?)?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}/g;
  const phones = text.match(phoneRegex);
  if (phones) {
    const validPhone = phones.find(p => p.replace(/\D/g, '').length >= 9 && p.replace(/\D/g, '').length <= 15);
    if (validPhone) cvData.personal.phone = validPhone;
  }

  // 3. Find Name (heuristic: first line that isn't contact info)
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const l = lines[i].toLowerCase();
    if (!l.includes('@') && !/\d{9}/.test(l) && l.length < 40) {
      cvData.personal.name = lines[i];
      // Title might be the next line
      if (i + 1 < lines.length && lines[i + 1].length < 60 && !lines[i + 1].includes('@')) {
        cvData.personal.title = lines[i + 1];
      }
      break;
    }
  }

  // 4. Extract blocks
  let currentSection = "summary";
  let currentBlock = [];

  const processBlock = (section, block) => {
    if (block.length === 0) return;
    
    // Remove the header itself if it was pushed
    const filteredBlock = block.filter(l => {
      const lower = l.toLowerCase();
      return !(lower.includes("expérience") || lower.includes("experience") || 
               lower.includes("formation") || lower.includes("education") || 
               lower.includes("compétence") || lower.includes("skills"));
    });

    if (filteredBlock.length === 0) return;

    if (section === "summary") {
      cvData.summary = filteredBlock.join(' ');
      // If summary is just the name, clear it
      if (cvData.summary === cvData.personal.name || cvData.summary === cvData.personal.title) {
        cvData.summary = "";
      }
    } else if (section === "experience") {
      cvData.experiences.push({
        title: filteredBlock[0] || "Poste",
        company: filteredBlock[1] || "",
        startDate: "",
        endDate: "",
        description: filteredBlock.slice(2).join('\n')
      });
    } else if (section === "education") {
      cvData.education.push({
        degree: filteredBlock[0] || "Diplôme",
        school: filteredBlock[1] || "",
        startDate: "",
        endDate: "",
        description: filteredBlock.slice(2).join('\n')
      });
    } else if (section === "skills") {
      const skillsStr = filteredBlock.join(', ');
      skillsStr.split(/[,•|-]+/).forEach(s => {
        const clean = s.trim();
        if (clean && clean.length < 40) {
          cvData.skills.push({ name: clean, level: "Intermédiaire" });
        }
      });
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    
    // Section header detection
    if (line === "expériences" || line === "expérience" || line === "experience" || line === "emplois" || line.startsWith("expérience professionnelle")) {
      processBlock(currentSection, currentBlock);
      currentSection = "experience";
      currentBlock = [];
      continue;
    } else if (line === "formation" || line === "formations" || line === "education" || line === "études" || line.startsWith("parcours académique")) {
      processBlock(currentSection, currentBlock);
      currentSection = "education";
      currentBlock = [];
      continue;
    } else if (line === "compétences" || line === "competences" || line === "skills" || line.startsWith("compétences techniques")) {
      processBlock(currentSection, currentBlock);
      currentSection = "skills";
      currentBlock = [];
      continue;
    }

    currentBlock.push(lines[i]);
  }
  processBlock(currentSection, currentBlock);

  // Clean up exact matches
  if (cvData.personal.name === cvData.summary) cvData.summary = "";

  return { cvData };
};
