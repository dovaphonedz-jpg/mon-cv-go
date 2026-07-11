import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

export const exportToWord = async (cvData) => {
  const { personal = {}, summary = "", experience = [], education = [], skills = [] } = cvData;

  const children = [];

  // Helper to safely add text
  const safeText = (text) => text || "";

  // Header / Personal Info
  if (personal.name) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: safeText(personal.name), size: 36, bold: true })],
        alignment: AlignmentType.CENTER,
      })
    );
  }

  if (personal.title) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: safeText(personal.title), size: 28, color: "555555" })],
        alignment: AlignmentType.CENTER,
      })
    );
  }

  const contactInfo = [personal.email, personal.phone, personal.location].filter(Boolean).join(' | ');
  if (contactInfo) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: contactInfo, size: 24, color: "888888" })],
        alignment: AlignmentType.CENTER,
      })
    );
  }

  children.push(new Paragraph({ text: "" }));

  // Summary
  if (summary) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "Résumé Professionnel", size: 28, bold: true })],
      })
    );
    children.push(
      new Paragraph({
        children: [new TextRun({ text: safeText(summary), size: 24 })],
      })
    );
    children.push(new Paragraph({ text: "" }));
  }

  // Experience
  if (experience && experience.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "Expériences Professionnelles", size: 28, bold: true })],
      })
    );

    experience.forEach((exp) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: safeText(exp.title), bold: true, size: 24 }),
            new TextRun({ text: exp.company ? ` - ${exp.company}` : "", size: 24 }),
          ],
        })
      );
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `${safeText(exp.startDate)} - ${safeText(exp.endDate)}`, italics: true, size: 20 })],
        })
      );
      if (exp.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: safeText(exp.description), size: 24 })],
          })
        );
      }
      children.push(new Paragraph({ text: "" }));
    });
  }

  // Education
  if (education && education.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "Formation", size: 28, bold: true })],
      })
    );

    education.forEach((edu) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: safeText(edu.degree), bold: true, size: 24 }),
            new TextRun({ text: edu.school ? ` - ${edu.school}` : "", size: 24 }),
          ],
        })
      );
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `${safeText(edu.startDate)} - ${safeText(edu.endDate)}`, italics: true, size: 20 })],
        })
      );
      if (edu.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: safeText(edu.description), size: 24 })],
          })
        );
      }
      children.push(new Paragraph({ text: "" }));
    });
  }

  // Skills
  if (skills && skills.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "Compétences", size: 28, bold: true })],
      })
    );

    skills.forEach((skill) => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `• ${safeText(skill.name)} - ${safeText(skill.level)}`, size: 24 })],
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, personal.name ? `CV_${personal.name.replace(/\s+/g, '_')}.docx` : "Mon_CV.docx");
};
