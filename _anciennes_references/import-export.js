
// ==========================================
// IMPORT & EXPORT LOGIC (JSON & LinkedIn)
// ==========================================

// Ensure pdf.js worker is set
if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

document.addEventListener('DOMContentLoaded', () => {
  // --- JSON EXPORT ---
  const exportBtn = document.getElementById('export-json-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "mon-cv-sauvegarde.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  }

  // --- JSON IMPORT ---
  const importJsonBtn = document.getElementById('import-json-btn');
  const importJsonInput = document.getElementById('json-import-input');
  if (importJsonBtn && importJsonInput) {
    importJsonBtn.addEventListener('click', () => importJsonInput.click());
    
    
    importJsonInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const ext = file.name.split('.').pop().toLowerCase();
      
      if (ext === 'json') {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target.result);
            if (parsed && typeof parsed === 'object') {

            // Overwrite global cvData
            cvData = parsed;
            cvData.experiences = cvData.experiences || [];
            cvData.education = cvData.education || [];
            cvData.skills = cvData.skills || [];
            cvData.languages = cvData.languages || [];
            if (typeof updateLocalStorage === 'function') updateLocalStorage();
            if (typeof renderFormStep === 'function') renderFormStep();
            if (typeof renderCVPreview === 'function') renderCVPreview();
            alert("✅ CV importé avec succès !");
            }
          } catch (err) {
            alert("Erreur lors de la lecture du fichier JSON.");
          }
        };
        reader.readAsText(file);
      } else if (ext === 'pdf') {
        alert("Lecture du PDF en cours...");
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(" ") + "\n";
        }
        parseLinkedInTextToCV(text); // Re-use our parser
        alert("✅ PDF importé ! Veuillez corriger les données.");
        if (typeof updateLocalStorage === 'function') updateLocalStorage();
        if (typeof renderFormStep === 'function') renderFormStep();
        if (typeof renderCVPreview === 'function') renderCVPreview();
      } else if (ext === 'doc' || ext === 'docx') {
        if (!window.mammoth) {
          alert("Erreur : Impossible de lire le fichier Word.");
          return;
        }
        alert("Lecture du document Word en cours...");
        const arrayBuffer = await file.arrayBuffer();
        mammoth.extractRawText({arrayBuffer: arrayBuffer})
          .then(function(result) {
            parseLinkedInTextToCV(result.value);
            alert("✅ CV Word importé ! Veuillez corriger les données.");
            if (typeof updateLocalStorage === 'function') updateLocalStorage();
            if (typeof renderFormStep === 'function') renderFormStep();
            if (typeof renderCVPreview === 'function') renderCVPreview();
          })
          .catch(function(err) {
            alert("Erreur Word : " + err.message);
          });
      }
      
      // Reset input
      importJsonInput.value = '';
    });

  }

  // --- LINKEDIN PDF IMPORT MODAL ---
  const importLiBtn = document.getElementById('import-linkedin-btn');
  const liModal = document.getElementById('linkedin-modal');
  const closeLiModal = document.getElementById('close-li-modal');
  const liFileInput = document.getElementById('linkedin-pdf-input');
  const triggerLiUpload = document.getElementById('trigger-li-upload');

  if (importLiBtn && liModal) {
  // --- LINKEDIN URL LOGIC ---
  const liUrlBtn = document.getElementById('li-url-btn');
  const liUrlInput = document.getElementById('li-url-input');
  
  if (liUrlBtn && liUrlInput) {
    liUrlBtn.addEventListener('click', () => {
      const url = liUrlInput.value.trim();
      if (!url) return alert("Veuillez entrer un lien LinkedIn.");
      
      liUrlBtn.textContent = "Recherche...";
      
      // Use Microlink free API to extract SEO metadata
      fetch('https://api.microlink.io/?url=' + encodeURIComponent(url))
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data) {
            const author = data.data.author || "";
            const desc = data.data.description || "";
            
            if (author) cvData.personal.name = author;
            
            // Try to extract title from description (often "Title at Company")
            // Or just take the first part of description before the bullet
            let title = "";
            if (desc) {
              const parts = desc.split('·');
              title = parts[0].trim();
            }
            if (title) cvData.personal.title = title;
            
            liModal.classList.add('hidden');
            alert("✅ Profil partiellement importé ! (Nom et Titre). Utilisez le PDF pour importer l'historique complet.");
            
            if (typeof updateLocalStorage === 'function') updateLocalStorage();
            if (typeof renderFormStep === 'function') renderFormStep();
            if (typeof renderCVPreview === 'function') renderCVPreview();
          } else {
            alert("Impossible de lire ce profil. Essayez l'option PDF.");
          }
        })
        .catch(err => {
          alert("Erreur réseau. Essayez l'option PDF.");
        })
        .finally(() => {
          liUrlBtn.textContent = "Importer";
        });
    });
  }

    importLiBtn.addEventListener('click', () => liModal.classList.remove('hidden'));
    closeLiModal.addEventListener('click', () => liModal.classList.add('hidden'));
    triggerLiUpload.addEventListener('click', () => liFileInput.click());

    liFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const btn = document.getElementById('trigger-li-upload');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i>⏳</i> Analyse en cours...';
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        let text = "";
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map(item => item.str);
          text += strings.join(" ") + "\n";
        }
        
        // Very basic parsing heuristic for LinkedIn PDF text
        parseLinkedInTextToCV(text);
        
        liModal.classList.add('hidden');
        alert("✅ Profil LinkedIn importé ! Veuillez vérifier et corriger les données dans le formulaire.");
        
        if (typeof updateLocalStorage === 'function') updateLocalStorage();
        if (typeof renderFormStep === 'function') renderFormStep();
        if (typeof renderCVPreview === 'function') renderCVPreview();

      } catch (err) {
        console.error(err);
        alert("Erreur lors de la lecture du PDF LinkedIn.");
      } finally {
        btn.innerHTML = originalText;
        liFileInput.value = '';
      }
    });
  }
});

function parseLinkedInTextToCV(text) {
  // Simple heuristic parsing. LinkedIn PDF has sections like "Experience", "Education", "Contact"
  // Note: LinkedIn PDFs can vary by language. This supports basic English/French keywords.
  
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  let currentSection = 'header';
  
  // Wipe current data for a fresh import, or keep personal data? Let's keep personal data mostly but update name
  cvData.experiences = [];
  cvData.education = [];
  cvData.skills = [];
  
  // The first line is usually the Name
  if (lines.length > 0) {
    cvData.personal.name = lines[0];
  }

  let expTemp = null;
  let eduTemp = null;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();
    
    // Detect sections
    if (lowerLine === 'experience' || lowerLine === 'expérience') {
      currentSection = 'experience';
      continue;
    } else if (lowerLine === 'education' || lowerLine === 'formation') {
      currentSection = 'education';
      continue;
    } else if (lowerLine === 'skills' || lowerLine === 'compétences') {
      currentSection = 'skills';
      continue;
    } else if (lowerLine === 'contact') {
      currentSection = 'contact';
      continue;
    }

    // Process data based on section
    if (currentSection === 'header') {
      if (line.includes('@') && !cvData.personal.email) cvData.personal.email = line;
      else if (!cvData.personal.title && line.length > 5 && line.length < 50) cvData.personal.title = line;
    } 
    else if (currentSection === 'experience') {
      // In LinkedIn PDF, typically:
      // Company Name
      // Job Title
      // Dates
      if (!expTemp) expTemp = { company: "", role: "", start: "", end: "", desc: "" };
      
      if (!expTemp.company) {
        expTemp.company = line;
      } else if (!expTemp.role) {
        expTemp.role = line;
      } else if (line.match(/\b(20\d{2}|19\d{2})\b/)) {
        // Contains a year, likely dates
        const parts = line.split('-');
        expTemp.start = parts[0] ? parts[0].trim() : line;
        expTemp.end = parts[1] ? parts[1].trim() : 'Present';
      } else {
        expTemp.desc += line + " ";
        // If we hit a short line or certain keywords, we might assume a new job starts soon, 
        // but it's safer to just push on a clear heuristic.
        // Actually, without complex regex, we just push when we see a new company name? 
        // For simplicity, let's push every 4 lines as a rough estimate if no dates found, or push when we see another date.
      }
      
      // If we have basic info and the description is getting long or we see a " - " (indicating date), we could finalize.
      // But let's just push it loosely when we see the next capitalized short string?
      // Better: let's push it to the array every time we suspect it's done. 
      // Actually, we'll just push what we have when section changes.
    }
  }
  
  if (expTemp && expTemp.company) cvData.experiences.push(expTemp);
  
  // We clean up descriptions
  cvData.experiences.forEach(exp => exp.desc = exp.desc.trim());
}
