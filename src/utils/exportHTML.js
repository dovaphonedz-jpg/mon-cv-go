export const exportToHTML = (cvData, config) => {
  // Find the container element containing the portfolio
  // We can target the cv-page class which wraps the templates
  const portfolioElement = document.querySelector('.cv-page');
  
  if (!portfolioElement) {
    alert("Erreur: Impossible de trouver le contenu du portfolio à exporter.");
    return;
  }

  // Get the raw HTML content
  const portfolioHTML = portfolioElement.outerHTML;

  // Déterminer la couleur de fond parfaite selon le modèle choisi
  let bgColor = '#f8fafc';
  if (config.template === 'portfolio-grid') {
    bgColor = '#0a0f1c'; // Fond exact du Bento Grid
  } else if (config.template === 'portfolio-terminal' || config.template === 'portfolio-dev') {
    bgColor = '#020617'; // Fond exact bg-slate-950
  } else if (config.template === 'siliconvalley' || config.template === 'newyork' || config.template === 'barcelone') {
    bgColor = '#e2e8f0'; // Fond gris clair pour faire ressortir la page A4 du CV
  }

  // We need to inject the Tailwind script and fonts for the standalone file
  const htmlContent = `
<!DOCTYPE html>
<html lang="${config.cvLang || 'fr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio - ${cvData.personal?.name || 'Mon Portfolio'}</title>
  
  <!-- Tailwind CSS v4 CDN -->
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: ${bgColor};
      min-height: 100vh;
    }
    
    /* Ensure the portfolio scales correctly on desktop */
    .portfolio-container {
      max-width: 1200px;
      margin: 0 auto;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    
    /* Reset the width/height forcing of the editor */
    .cv-page {
      min-height: 100vh !important;
      width: 100% !important;
      transform: none !important;
    }

    /* Additional utilities used in the project */
    .font-inter { font-family: 'Inter', sans-serif; }
    .font-serif { font-family: 'Playfair Display', serif; }
    .font-mono { font-family: 'Roboto Mono', monospace; }
  </style>
</head>
<body>
  <div class="portfolio-container">
    ${portfolioHTML}
  </div>
</body>
</html>
  `;

  // Create a Blob from the HTML string
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  
  // Set the filename
  const fileName = cvData.personal?.name 
    ? `portfolio_${cvData.personal.name.toLowerCase().replace(/\s+/g, '_')}.html`
    : 'mon_portfolio.html';
    
  link.setAttribute('download', fileName);
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
