const fs = require('fs');

const filePath = 'src/components/cv-templates/TemplateModern.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Add projects to destructuring
content = content.replace(
  'const { personal, summary, experiences, education, skills, languages } = cvData;',
  'const { personal, summary, experiences, education, skills, languages, projects = [] } = cvData;'
);

// We will find each block starting with `{education.length > 0 && (`
// and ending with the corresponding `)}`

let updatedContent = "";
let i = 0;
while (i < content.length) {
  const startIndex = content.indexOf('{education.length > 0 && (', i);
  if (startIndex === -1) {
    updatedContent += content.slice(i);
    break;
  }
  
  updatedContent += content.slice(i, startIndex);
  
  // Find the matching closing `)}`
  let openParentheses = 0;
  let endIndex = -1;
  for (let j = startIndex; j < content.length; j++) {
    if (content[j] === '(') openParentheses++;
    if (content[j] === ')') openParentheses--;
    
    if (openParentheses === 0 && content.substr(j, 2) === ')}') {
      endIndex = j + 2;
      break;
    }
  }
  
  if (endIndex === -1) {
    updatedContent += content.slice(startIndex);
    break;
  }
  
  const eduBlock = content.slice(startIndex, endIndex);
  updatedContent += eduBlock; // keep the original education block
  
  // Create a projects block from the education block
  let projBlock = eduBlock.replace(/education\.length/g, 'projects.length');
  projBlock = projBlock.replace(/\{t\.education\}/g, '{t.projects}');
  projBlock = projBlock.replace(/education\.map\(\(edu/g, 'projects.map((proj');
  projBlock = projBlock.replace(/edu\.degree/g, 'proj.title');
  
  // Now to safely replace the school/start/end logic, we will replace the whole internal structure.
  // The eduBlock contains something like:
  // <h4 className="...">...</h4>
  // <div className="...">...</div>
  // <p className="...">...</p>
  // Let's replace the whole body of the map function safely.
  
  const mapRegex = /(projects\.map\(\(proj, idx\) => \([\s\S]*?<div key=\{idx\}[^>]*>)[\s\S]*?(<\/div>\s*\)\s*\))/;
  
  projBlock = projBlock.replace(mapRegex, (match, prefix, suffix) => {
    // prefix is `projects.map((proj, idx) => (\n <div key={idx} className="...">`
    // suffix is `</div>\n ))`
    
    return prefix + `
                      <h4 className="font-bold text-lg mb-1 flex justify-between items-center">
                        {proj.title}
                        {proj.link && <a href={proj.link.startsWith('http') ? proj.link : \`https://\${proj.link}\`} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline ml-2">Lien</a>}
                      </h4>
                      {proj.techStack && <div className="text-sm italic opacity-80 mb-2">{proj.techStack}</div>}
                      {proj.description && <p className="text-sm opacity-90 leading-relaxed">{proj.description}</p>}
                    ` + suffix;
  });
  
  updatedContent += '\n            ' + projBlock;
  i = endIndex;
}

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Templates patched safely.');
