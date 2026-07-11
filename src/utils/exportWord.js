import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

export const exportToWord = async (cvData) => {
  const { personal, summary, experience, education, skills } = cvData;

  const children = [];

  // Header / Personal Info
  if (personal.name) {
    children.push(
      new Paragraph({
        text: personal.name,
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      })
    );
  }

  if (personal.title) {
    children.push(
      new Paragraph({
        text: personal.title,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      })
    );
  }

  const contactInfo = [personal.email, personal.phone, personal.location].filter(Boolean).join(' | ');
  if (contactInfo) {
    children.push(
      new Paragraph({
        text: contactInfo,
        alignment: AlignmentType.CENTER,
      })
    );
  }

  children.push(new Paragraph({ text: "" })); // Spacing

  // Summary
  if (summary) {
    children.push(
      new Paragraph({
        text: "Résumé Professionnel",
        heading: HeadingLevel.HEADING_2,
      })
    );
    children.push(
      new Paragraph({
        text: summary,
      })
    );
    children.push(new Paragraph({ text: "" })); // Spacing
  }

  // Experience
  if (experience && experience.length > 0) {
    children.push(
      new Paragraph({
        text: "Expériences Professionnelles",
        heading: HeadingLevel.HEADING_2,
      })
    );

    experience.forEach((exp) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.title, bold: true }),
            new TextRun({ text: ` - ${exp.company}` }),
          ],
        })
      );
      children.push(
        new Paragraph({
          text: `${exp.startDate || ''} - ${exp.endDate || ''}`,
          italics: true,
        })
      );
      if (exp.description) {
        children.push(
          new Paragraph({
            text: exp.description,
          })
        );
      }
      children.push(new Paragraph({ text: "" })); // Spacing
    });
  }

  // Education
  if (education && education.length > 0) {
    children.push(
      new Paragraph({
        text: "Formation",
        heading: HeadingLevel.HEADING_2,
      })
    );

    education.forEach((edu) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree, bold: true }),
            new TextRun({ text: ` - ${edu.school}` }),
          ],
        })
      );
      children.push(
        new Paragraph({
          text: `${edu.startDate || ''} - ${edu.endDate || ''}`,
          italics: true,
        })
      );
      if (edu.description) {
        children.push(
          new Paragraph({
            text: edu.description,
          })
        );
      }
      children.push(new Paragraph({ text: "" })); // Spacing
    });
  }

  // Skills
  if (skills && skills.length > 0) {
    children.push(
      new Paragraph({
        text: "Compétences",
        heading: HeadingLevel.HEADING_2,
      })
    );

    skills.forEach((skill) => {
      children.push(
        new Paragraph({
          text: `• ${skill.name} - ${skill.level}`,
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
