import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Use unpkg CDN to perfectly bypass any production bundling or MIME type issues
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.mjs`;

export const extractTextFromWord = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

export const extractTextFromPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    let pageText = '';
    let lastY = null;
    for (const item of textContent.items) {
      if (!item.str) continue;
      const y = item.transform ? item.transform[5] : null;
      if (lastY !== null && y !== null && Math.abs(y - lastY) > 3) {
        pageText += '\n';
      } else if (lastY !== null && y !== null) {
        pageText += ' '; // Add space between words on the same line if needed
      }
      pageText += item.str;
      if (y !== null) lastY = y;
    }
    fullText += pageText + '\n';
  }
  return fullText;
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

  // Section Headers regex
  const expRegex = /^(exp[eé]rience|emploi|parcours professionnel|historique)/i;
  const eduRegex = /^(formation|[eé]tude|dipl[oô]me|parcours acad[eé]mique|education)/i;
  const skillsRegex = /^(comp[eé]tence|skill|aptitude|technologie)/i;
  const langRegex = /^(langue|language)/i;

  // 3. Find Name & Title
  for (let i = 0; i < Math.min(6, lines.length); i++) {
    const l = lines[i].toLowerCase();
    const isHeader = expRegex.test(l) || eduRegex.test(l) || skillsRegex.test(l) || langRegex.test(l);
    if (!cvData.personal.name && !l.includes('@') && !/\d{5}/.test(l) && l.length < 40 && !isHeader) {
      cvData.personal.name = lines[i];
    } else if (cvData.personal.name && !cvData.personal.title && !l.includes('@') && !/\d{5}/.test(l) && l.length < 60 && !isHeader) {
      cvData.personal.title = lines[i];
      break;
    }
  }

  // Section Headers regex
  const expRegex = /^(exp[eé]rience|emploi|parcours professionnel|historique)/i;
  const eduRegex = /^(formation|[eé]tude|dipl[oô]me|parcours acad[eé]mique|education)/i;
  const skillsRegex = /^(comp[eé]tence|skill|aptitude|technologie)/i;
  const langRegex = /^(langue|language)/i;

  let currentSection = "summary";
  let currentBlock = [];

  const extractDates = (str) => {
    const datePattern = /((?:jan|fév|mar|avr|mai|juin|juil|aoû|sep|oct|nov|déc|janv|fev|mars|avril|juillet|aout|sept|novembre|decembre|january|february|march|april|may|june|july|august|september|october|november|december)?[a-z]*\.?\s*\d{4}|\d{1,2}\/\d{4}|\b20\d{2}\b|\b19\d{2}\b)/gi;
    const dates = str.match(datePattern);
    if (dates && dates.length >= 2) return { startDate: dates[0].trim(), endDate: dates[1].trim() };
    if (dates && dates.length === 1) return { startDate: dates[0].trim(), endDate: "Présent" };
    return { startDate: "", endDate: "" };
  };

  const processBlock = (section, block) => {
    if (block.length === 0) return;
    
    const filtered = block.filter(l => !(expRegex.test(l) || eduRegex.test(l) || skillsRegex.test(l) || langRegex.test(l)));
    if (filtered.length === 0) return;

    if (section === "summary") {
      cvData.summary = filtered.join('\n');
    } else if (section === "experience" || section === "education") {
      let currentItem = { title: "", company: "", startDate: "", endDate: "", description: [] };
      let items = [];
      
      for (let i = 0; i < filtered.length; i++) {
        const line = filtered[i];
        const dates = extractDates(line);
        
        // Detect new item if line has dates, or if it's the very first line
        if ((dates.startDate || dates.endDate) || (i === 0 && !currentItem.title)) {
          if (currentItem.title || currentItem.company || currentItem.description.length > 0) {
            items.push(currentItem);
          }
          currentItem = { title: line, company: "", startDate: dates.startDate, endDate: dates.endDate, description: [] };
          // Remove dates from the title
          let cleanTitle = line;
          if (dates.startDate) cleanTitle = cleanTitle.replace(dates.startDate, '');
          if (dates.endDate) cleanTitle = cleanTitle.replace(dates.endDate, '');
          cleanTitle = cleanTitle.replace(/[-—]|\bau\b|\bto\b|\bà\b/gi, '').trim();
          if (cleanTitle) currentItem.title = cleanTitle;
          else currentItem.title = line; 
        } else if (!currentItem.company && line.length < 60 && !line.includes('•') && !line.includes('-')) {
          currentItem.company = line;
        } else {
          currentItem.description.push(line);
        }
      }
      if (currentItem.title || currentItem.company || currentItem.description.length > 0) {
        items.push(currentItem);
      }

      items.forEach(item => {
        item.description = item.description.join('\n');
        if (section === "experience") {
          cvData.experiences.push(item);
        } else {
          cvData.education.push({
            degree: item.title || "Diplôme",
            school: item.company || "",
            startDate: item.startDate,
            endDate: item.endDate,
            description: item.description
          });
        }
      });
    } else if (section === "skills") {
      const skillsStr = filtered.join(', ');
      skillsStr.split(/[,•|;]+/).forEach(s => {
        const clean = s.trim();
        if (clean && clean.length < 40) {
          cvData.skills.push({ name: clean, level: "Intermédiaire" });
        }
      });
    } else if (section === "languages") {
      filtered.forEach(line => {
        line.split(/[,•|;]+/).forEach(s => {
           const clean = s.trim();
           if (clean && clean.length < 30) {
             cvData.languages.push({ name: clean, level: "Courant" });
           }
        });
      });
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (expRegex.test(line) && line.length < 40) {
      processBlock(currentSection, currentBlock);
      currentSection = "experience"; currentBlock = [];
      continue;
    } else if (eduRegex.test(line) && line.length < 40) {
      processBlock(currentSection, currentBlock);
      currentSection = "education"; currentBlock = [];
      continue;
    } else if (skillsRegex.test(line) && line.length < 40) {
      processBlock(currentSection, currentBlock);
      currentSection = "skills"; currentBlock = [];
      continue;
    } else if (langRegex.test(line) && line.length < 40) {
      processBlock(currentSection, currentBlock);
      currentSection = "languages"; currentBlock = [];
      continue;
    }

    currentBlock.push(line);
  }
  processBlock(currentSection, currentBlock);
  
  if (cvData.summary.includes(cvData.personal.name)) {
    cvData.summary = cvData.summary.replace(cvData.personal.name, '').replace(cvData.personal.title, '').trim();
  }

  return { cvData };
};
