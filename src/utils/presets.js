export const PRESETS = {
  'modele-cv-comptable-word': {
    personal: { name: 'Sophie Laurent', title: 'Comptable Confirmée', email: 'sophie.laurent@email.com', phone: '06 12 34 56 78', address: 'Lyon, France' },
    summary: 'Comptable rigoureuse et organisée avec plus de 5 ans d\'expérience en cabinet d\'expertise. Experte dans la gestion de la paie, les déclarations fiscales et la tenue des livres. Maîtrise des logiciels Cegid et Sage.',
    experiences: [
      { id: '1', role: 'Comptable', company: 'Cabinet Expertise 360', current: true, startDate: '2020', endDate: '', desc: '- Tenue complète de la comptabilité pour un portefeuille de 40 clients (TPE/PME)\n- Établissement des déclarations fiscales (TVA, IS, CVAE)\n- Préparation des bilans et des liasses fiscales\n- Accompagnement et conseil client' },
      { id: '2', role: 'Aide-Comptable', company: 'Entreprise ABC', current: false, startDate: '2018', endDate: '2020', desc: '- Saisie des factures fournisseurs et clients\n- Rapprochements bancaires quotidiens\n- Relance des factures impayées' }
    ],
    education: [
      { id: '1', degree: 'DCG (Diplôme de Comptabilité et de Gestion)', school: 'Lycée La Martinière', year: '2018', desc: '' }
    ],
    skills: ['Cegid', 'Sage', 'Excel Avancé', 'Déclarations fiscales', 'Bilan', 'Rapprochement bancaire']
  },
  'modele-cv-ingenieur': {
    personal: { name: 'Marc Dupont', title: 'Ingénieur Informatique', email: 'marc.dupont@email.com', phone: '06 98 76 54 32', address: 'Paris, France' },
    summary: 'Ingénieur logiciel passionné par le développement d\'architectures scalables et le cloud computing. Plus de 3 ans d\'expérience dans le développement d\'applications web fullstack (React / Node.js). Fort esprit d\'analyse et travail en équipe agile.',
    experiences: [
      { id: '1', role: 'Ingénieur Full-Stack', company: 'Tech Solutions Inc.', current: true, startDate: '2021', endDate: '', desc: '- Développement d\'une application SaaS utilisée par 10k+ clients (React, Node.js)\n- Migration de l\'infrastructure vers AWS (EC2, S3, RDS)\n- Mise en place de pipelines CI/CD avec GitHub Actions' },
      { id: '2', role: 'Ingénieur Stagiaire R&D', company: 'InnovLab', current: false, startDate: '2020', endDate: '2021', desc: '- Création de prototypes IoT avec Python\n- Analyse de données capteurs avec Pandas\n- Rédaction de documentation technique' }
    ],
    education: [
      { id: '1', degree: 'Diplôme d\'Ingénieur Informatique', school: 'INSA Lyon', year: '2021', desc: 'Spécialité Systèmes d\'Information' }
    ],
    skills: ['JavaScript / TypeScript', 'React.js', 'Node.js / Express', 'Python', 'AWS', 'Docker', 'Méthode Agile']
  },
  'modele-cv-debutant': {
    personal: { name: 'Lucas Martin', title: 'À la recherche d\'un premier emploi', email: 'lucas.martin@email.com', phone: '07 11 22 33 44', address: 'Toulouse, France' },
    summary: 'Jeune diplômé motivé et dynamique, je suis à la recherche d\'une première expérience professionnelle pour mettre en pratique mes connaissances et développer de nouvelles compétences. Très adaptable et doté d\'un excellent esprit d\'équipe.',
    experiences: [
      { id: '1', role: 'Bénévole', company: 'Association Solidaire', current: false, startDate: '2021', endDate: '2022', desc: '- Accueil et orientation du public\n- Organisation d\'événements de collecte de fonds\n- Gestion de la communication sur les réseaux sociaux' }
    ],
    education: [
      { id: '1', degree: 'Baccalauréat Général', school: 'Lycée Pierre de Fermat', year: '2023', desc: 'Mention Bien' }
    ],
    skills: ['Travail en équipe', 'Adaptabilité', 'Sens de l\'organisation', 'Pack Office', 'Anglais (B2)']
  },
  'modele-cv-etudiant': {
    personal: { name: 'Chloé Dubois', title: 'Étudiante en Recherche de Stage', email: 'chloe.dubois@email.com', phone: '06 55 44 33 22', address: 'Lille, France' },
    summary: 'Étudiante en 2ème année de Licence, je recherche un stage de 2 mois dans le domaine du marketing pour valider mon année. Curieuse, créative et proactive, je souhaite contribuer à vos projets tout en apprenant sur le terrain.',
    experiences: [
      { id: '1', role: 'Job Étudiant - Équipière', company: 'FastFood Co', current: false, startDate: 'Juin 2023', endDate: 'Août 2023', desc: '- Service client et prise de commande\n- Travail en équipe dans un environnement dynamique\n- Respect strict des règles d\'hygiène (HACCP)' },
      { id: '2', role: 'Projet Universitaire', company: 'Université de Lille', current: false, startDate: 'Fév 2024', endDate: 'Avr 2024', desc: '- Étude de marché sur les nouvelles tendances de consommation\n- Analyse de données et présentation des résultats devant un jury' }
    ],
    education: [
      { id: '1', degree: 'Licence Économie et Gestion', school: 'Université de Lille', year: '2023 - Présent', desc: 'Spécialisation Marketing au 2ème semestre' }
    ],
    skills: ['Canva', 'Suite Office', 'Réseaux Sociaux', 'Esprit de synthèse', 'Aisance à l\'oral']
  },
  'modele-cv-commercial': {
    personal: { name: 'Thomas Bernard', title: 'Commercial Terrain B2B', email: 'thomas.b@email.com', phone: '06 44 55 66 77', address: 'Bordeaux, France' },
    summary: 'Commercial B2B orienté résultats avec 4 ans d\'expérience dans la vente de solutions logicielles. Reconnu pour ma force de persuasion, ma capacité à développer et fidéliser un portefeuille client complexe. Objectif dépassé de 120% en 2023.',
    experiences: [
      { id: '1', role: 'Business Developer', company: 'TechSales Group', current: true, startDate: '2021', endDate: '', desc: '- Prospection active sur un marché B2B cible\n- Négociation de contrats cadres jusqu\'à 50k€\n- Suivi de portefeuille et upsell (fidélisation +20%)\n- Utilisation quotidienne de Salesforce CRM' },
      { id: '2', role: 'Commercial Junior', company: 'Agence VenteDirecte', current: false, startDate: '2019', endDate: '2021', desc: '- Phoning et prise de rendez-vous qualifiés\n- Présentation de produits aux prospects\n- Reporting hebdomadaire à la direction commerciale' }
    ],
    education: [
      { id: '1', degree: 'BTS Négociation et Digitalisation de la Relation Client (NDRC)', school: 'Lycée Condorcet', year: '2019', desc: 'En alternance' }
    ],
    skills: ['Prospection B2B', 'Négociation', 'Fidélisation client', 'Salesforce (CRM)', 'Techniques de vente (SPIN)', 'Résilience']
  }
};
