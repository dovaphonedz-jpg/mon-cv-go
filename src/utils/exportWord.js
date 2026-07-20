import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

export const exportToWord = async (cvData, config, elementRef) => {
  // Ensure we have data
  if (!cvData || !cvData.personal) {
    alert("Erreur: Les données du CV sont manquantes.");
    return;
  }

  const { personal, summary, experiences, education, skills, qualities, projects, languages } = cvData;

  // Map tailwind colors to Hex for Word
  const colorMap = {
    blue: '2563eb', emerald: '059669', violet: '7c3aed', rose: 'e11d48',
    amber: 'd97706', red: 'dc2626', slate: '475569', orange: 'ea580c',
    teal: '0d9488', fuchsia: 'c026d3', zinc: '3f3f46', sky: '0284c7',
    indigo: '4f46e5', purple: '9333ea', cyan: '0891b2'
  };
  const themeHex = config?.color ? (colorMap[config.color] || '000000') : '000000';

  // Decode photo if it's a base64 string (user uploaded)
  let photoBytes = null;
  if (personal.photo && personal.photo.startsWith('data:image/')) {
    try {
      const base64Data = personal.photo.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
      const binaryString = window.atob(base64Data);
      const len = binaryString.length;
      photoBytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        photoBytes[i] = binaryString.charCodeAt(i);
      }
    } catch (e) {
      console.error("Impossible de décoder la photo pour Word", e);
    }
  }

  // Helper to create section headings
  const createHeading = (text) => {
    return new Paragraph({
      text: text.toUpperCase(),
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 120 },
      border: {
        bottom: {
          color: themeHex,
          space: 1,
          style: BorderStyle.SINGLE,
          size: 12,
        },
      },
    });
  };

  const children = [];

  // --- HEADER: NAME & TITLE ---
  const headerChildren = [];
  
  if (photoBytes) {
    headerChildren.push(
      new ImageRun({
        data: photoBytes,
        type: 'png', // docx needs a hint
        transformation: {
          width: 100,
          height: 100,
        },
      })
    );
  }
  
  headerChildren.push(
    new TextRun({ 
      text: personal.name || "Nom", 
      bold: true, 
      size: 48, // 24pt
      color: themeHex 
    })
  );

  children.push(
    new Paragraph({
      children: headerChildren,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    })
  );

  if (personal.title) {
    children.push(
      new Paragraph({
        text: personal.title.toUpperCase(),
        heading: HeadingLevel.HEADING_3,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      })
    );
  }

  // --- CONTACT INFO ---
  const contactInfo = [];
  if (personal.email) contactInfo.push(personal.email);
  if (personal.phone) contactInfo.push(personal.phone);
  if (personal.address) contactInfo.push(personal.address);
  if (personal.website) contactInfo.push(personal.website);

  if (contactInfo.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactInfo.join("  |  "),
            color: "555555",
            size: 20, // 10pt
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      })
    );
  }

  // --- SUMMARY ---
  if (summary) {
    children.push(createHeading("Profil"));
    children.push(
      new Paragraph({
        text: summary,
        spacing: { after: 200 },
        alignment: AlignmentType.JUSTIFIED,
      })
    );
  }

  // --- EXPERIENCES ---
  if (experiences && experiences.length > 0) {
    children.push(createHeading("Expériences Professionnelles"));
    
    experiences.forEach((exp) => {
      // Role & Company
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.role || "", bold: true, size: 24 }),
            new TextRun({ text: ` — ${exp.company || ""}`, italics: true, size: 22 }),
          ],
          spacing: { before: 200, after: 50 },
        })
      );
      
      // Dates
      if (exp.start || exp.end) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${exp.start || ""} - ${exp.end || ""}`, color: "666666", size: 20 }),
            ],
            spacing: { after: 100 },
          })
        );
      }
      
      // Description (bullet points if lines start with -, • or just plain text)
      if (exp.desc) {
        const lines = exp.desc.split('\n');
        lines.forEach(line => {
          if (line.trim().length > 0) {
            children.push(
              new Paragraph({
                text: line.replace(/^[•\-\*]\s*/, ""),
                bullet: { level: 0 },
                spacing: { after: 50 },
                alignment: AlignmentType.JUSTIFIED,
              })
            );
          }
        });
      }
    });
  }

  // --- EDUCATION ---
  if (education && education.length > 0) {
    children.push(createHeading("Formations"));
    
    education.forEach((edu) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree || "", bold: true, size: 24 }),
          ],
          spacing: { before: 200, after: 50 },
        })
      );
      
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.school || "", italics: true, size: 22 }),
            new TextRun({ text: `  |  ${edu.start || ""} - ${edu.end || ""}`, color: "666666", size: 20 }),
          ],
          spacing: { after: 50 },
        })
      );
      
      if (edu.desc) {
        children.push(
          new Paragraph({
            text: edu.desc,
            spacing: { after: 100 },
          })
        );
      }
    });
  }

  // --- SKILLS ---
  if (skills && skills.length > 0) {
    children.push(createHeading("Compétences"));
    
    // Skills can be a string or an array depending on how it's saved.
    // In our mock data, it's often an array of objects or strings, or a simple string.
    let skillsText = "";
    if (typeof skills === "string") {
      skillsText = skills;
    } else if (Array.isArray(skills)) {
      skillsText = skills.map(s => typeof s === 'string' ? s : s.name).join(" • ");
    }
    
    children.push(
      new Paragraph({
        text: skillsText,
        spacing: { after: 200 },
      })
    );
  }

  // --- QUALITIES ---
  if (qualities && qualities.length > 0) {
    children.push(createHeading("Qualités & Atouts"));
    
    let qualitiesText = "";
    if (typeof qualities === "string") {
      qualitiesText = qualities;
    } else if (Array.isArray(qualities)) {
      qualitiesText = qualities.map(q => typeof q === 'string' ? q : q.name).filter(Boolean).join(" • ");
    }
    
    children.push(
      new Paragraph({
        text: qualitiesText,
        spacing: { after: 200 },
      })
    );
  }

  // --- LANGUAGES ---
  if (languages && languages.length > 0) {
    children.push(createHeading("Langues"));
    
    languages.forEach((lang) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: lang.name || "", bold: true }),
            new TextRun({ text: lang.level ? ` : ${lang.level}` : "" }),
          ],
          bullet: { level: 0 },
        })
      );
    });
  }

  // Generate the Document
  const doc = new Document({
    creator: "Mon CV Go",
    title: `CV de ${personal.name || "Utilisateur"}`,
    description: "CV Généré par Mon CV Go",
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: 22, // 11pt
            color: "000000",
          },
          paragraph: {
            spacing: { line: 276 },
          }
        },
        title: {
          run: {
            font: "Arial",
            size: 48, // 24pt
            bold: true,
            color: "111111",
          },
        },
        heading2: {
          run: {
            font: "Arial",
            size: 32, // 16pt
            bold: true,
            color: "333333",
          },
        },
        heading3: {
          run: {
            font: "Arial",
            size: 28, // 14pt
            color: "555555",
          },
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 },
          },
        },
        children: children,
      },
    ],
  });

  try {
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `CV_${(personal.name || "Mon_CV").replace(/\s+/g, '_')}.docx`);
  } catch (error) {
    console.error("Erreur lors de l'exportation Word:", error);
    alert(`Erreur de génération Word : ${error.message || error}`);
  }
};
