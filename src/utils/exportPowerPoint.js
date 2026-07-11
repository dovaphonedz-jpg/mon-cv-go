import pptxgen from "pptxgenjs";

export const exportToPowerPoint = async (cvData) => {
  const { personal, summary, experience, education, skills } = cvData;

  const pres = new pptxgen();
  const slide = pres.addSlide();

  // Background and styling
  slide.background = { color: "F8FAFC" }; // slate-50

  // Title / Name
  if (personal.name) {
    slide.addText(personal.name, {
      x: 0.5,
      y: 0.5,
      w: "90%",
      fontSize: 32,
      bold: true,
      color: "0F172A", // slate-900
    });
  }

  // Job Title
  if (personal.title) {
    slide.addText(personal.title, {
      x: 0.5,
      y: 1.0,
      w: "90%",
      fontSize: 20,
      color: "3B82F6", // blue-500
    });
  }

  // Contact Info
  const contactInfo = [personal.email, personal.phone, personal.location].filter(Boolean).join(' | ');
  if (contactInfo) {
    slide.addText(contactInfo, {
      x: 0.5,
      y: 1.4,
      w: "90%",
      fontSize: 12,
      color: "64748B", // slate-500
    });
  }

  let currentY = 1.8;

  // Experience
  if (experience && experience.length > 0) {
    slide.addText("Expériences", { x: 0.5, y: currentY, w: "90%", fontSize: 16, bold: true, color: "0F172A" });
    currentY += 0.4;
    
    experience.slice(0, 3).forEach((exp) => { // limit to 3 to fit slide
      const expText = `${exp.title} chez ${exp.company} (${exp.startDate || ''} - ${exp.endDate || ''})`;
      slide.addText(expText, { x: 0.5, y: currentY, w: "40%", fontSize: 12, color: "334155" });
      currentY += 0.3;
    });
    currentY += 0.1;
  }

  // Skills
  if (skills && skills.length > 0) {
    const skillsY = 1.8;
    slide.addText("Compétences", { x: 5.5, y: skillsY, w: "40%", fontSize: 16, bold: true, color: "0F172A" });
    
    let sy = skillsY + 0.4;
    skills.slice(0, 6).forEach((skill) => {
      slide.addText(`• ${skill.name} (${skill.level})`, { x: 5.5, y: sy, w: "40%", fontSize: 12, color: "334155" });
      sy += 0.3;
    });
  }
  
  // Education
  if (education && education.length > 0) {
    const eduY = Math.max(currentY, 1.8 + 0.4 + (skills.slice(0,6).length * 0.3) + 0.2);
    slide.addText("Formation", { x: 0.5, y: eduY, w: "90%", fontSize: 16, bold: true, color: "0F172A" });
    
    let ey = eduY + 0.4;
    education.slice(0, 2).forEach((edu) => {
      slide.addText(`${edu.degree} - ${edu.school}`, { x: 0.5, y: ey, w: "90%", fontSize: 12, color: "334155" });
      ey += 0.3;
    });
  }

  const fileName = personal.name ? `CV_${personal.name.replace(/\s+/g, '_')}.pptx` : "Mon_CV.pptx";
  await pres.writeFile({ fileName });
};
