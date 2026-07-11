const fs = require('fs');
const path = require('path');

const pages = ['Home', 'CreateCV', 'CoverLetter', 'ConseilsCV', 'About', 'Contact', 'Legal', 'Privacy'];

pages.forEach(p => {
  const content = `import React from 'react';\n\nexport default function ${p}() {\n  return (\n    <div className="p-10 text-center">\n      <h1 className="text-3xl font-bold mb-4">Page ${p}</h1>\n      <p>Contenu en cours de migration depuis la version HTML...</p>\n    </div>\n  );\n}\n`;
  fs.writeFileSync(path.join(__dirname, 'src', 'pages', p + '.jsx'), content);
});

console.log('Pages generated successfully!');
