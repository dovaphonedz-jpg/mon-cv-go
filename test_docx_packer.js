import { Document, Packer, Paragraph, ImageRun } from 'docx';

const doc = new Document({
  sections: [
    {
      children: [
        new Paragraph({
          children: [
            new ImageRun({
              data: new Uint8Array(10),
              transformation: { width: 100, height: 100 }
            })
          ]
        })
      ]
    }
  ]
});

Packer.toBuffer(doc)
  .then(() => console.log("Success!"))
  .catch(err => console.error("Error:", err.message));
