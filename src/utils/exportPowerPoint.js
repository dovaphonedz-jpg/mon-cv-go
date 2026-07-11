import pptxgen from "pptxgenjs";

export const exportToPowerPoint = async (cvData) => {
  const { personal = {}, summary = "", experiences = [], education = [], skills = [], projects = [] } = cvData;
  const safeText = (text) => text || "";

  const pres = new pptxgen();
  const slide = pres.addSlide();

  slide.background = { color: "F8FAFC" };

  if (personal.name) {
    slide.addText(safeText(personal.name), { x: 0.5, y: 0.5, w: "90%", fontSize: 32, bold: true, color: "0F172A" });
  }

  if (personal.title) {
    slide.addText(safeText(personal.title), { x: 0.5, y: 1.0, w: "90%", fontSize: 20, color: "3B82F6" });
  }

  const contactInfo = [personal.email, personal.phone, personal.location].filter(Boolean).join(' | ');
  if (contactInfo) {
    slide.addText(contactInfo, { x: 0.5, y: 1.4, w: "90%", fontSize: 12, color: "64748B" });
  }

  let currentY = 1.8;

  if (experiences && experiences.length > 0) {
    slide.addText("Expériences", { x: 0.5, y: currentY, w: "45%", fontSize: 16, bold: true, color: "0F172A" });
    currentY += 0.4;
    
    experiences.forEach((exp) => {
      const expText = `${safeText(exp.title)} chez ${safeText(exp.company)} (${safeText(exp.startDate)} - ${safeText(exp.endDate)})`;
      slide.addText(expText, { x: 0.5, y: currentY, w: "45%", fontSize: 12, color: "334155" });
      currentY += 0.3;
    });
    currentY += 0.1;
  }

  if (projects && projects.length > 0) {
    slide.addText("Projets & Portfolio", { x: 0.5, y: currentY, w: "45%", fontSize: 16, bold: true, color: "0F172A" });
    currentY += 0.4;
    
    projects.forEach((proj) => {
      const projText = `${safeText(proj.title)}${proj.techStack ? ` - ${proj.techStack}` : ''}`;
      slide.addText(projText, { x: 0.5, y: currentY, w: "45%", fontSize: 12, color: "334155", bold: true });
      if (proj.link) {
        slide.addText(safeText(proj.link), { x: 0.5, y: currentY + 0.15, w: "45%", fontSize: 10, color: "3B82F6", hyperlink: { url: proj.link } });
        currentY += 0.15;
      }
      currentY += 0.3;
    });
    currentY += 0.1;
  }

  if (skills && skills.length > 0) {
    const skillsY = 1.8;
    slide.addText("Compétences", { x: 5.5, y: skillsY, w: "45%", fontSize: 16, bold: true, color: "0F172A" });
    
    let sy = skillsY + 0.4;
    skills.forEach((skill) => {
      slide.addText(`• ${safeText(skill.name)} (${safeText(skill.level)})`, { x: 5.5, y: sy, w: "45%", fontSize: 12, color: "334155" });
      sy += 0.3;
    });
  }
  
  if (education && education.length > 0) {
    const eduY = Math.max(currentY, 1.8 + 0.4 + (skills.length * 0.3) + 0.2);
    slide.addText("Formation", { x: 0.5, y: eduY, w: "90%", fontSize: 16, bold: true, color: "0F172A" });
    
    let ey = eduY + 0.4;
    education.forEach((edu) => {
      slide.addText(`${safeText(edu.degree)} - ${safeText(edu.school)}`, { x: 0.5, y: ey, w: "90%", fontSize: 12, color: "334155" });
      ey += 0.3;
    });
  }

  const fileName = personal.name ? `CV_${personal.name.replace(/\s+/g, '_')}.pptx` : "Mon_CV.pptx";
  await pres.writeFile({ fileName });
};
