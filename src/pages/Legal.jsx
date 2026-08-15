import React from 'react';
import { useTranslation } from 'react-i18next';
import { Scale } from 'lucide-react';
import SEO from '../components/SEO';

export default function Legal() {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title={t('legal.title', "Conditions d'Utilisation")} 
        description={t('legal.seo_desc', "Conditions Générales d'Utilisation (CGU) et Mentions Légales du site Mon CV Go.")} 
        url="https://moncvgo.com/mentions-legales" 
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('footer.terms', "Conditions Générales d'Utilisation")}
          </h1>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600">
          <p><strong>{t('legal.last_update', "Date de dernière mise à jour :")}</strong> 11 Juillet 2026</p>

          <p>Bienvenue sur Mon CV Go. Les présentes Conditions Générales d'Utilisation (ci-après les "CGU") ont pour objet de définir les modalités et conditions dans lesquelles nous mettons à votre disposition notre site web et nos services, et les conditions dans lesquelles vous y accédez et les utilisez.</p>
          <p>L'utilisation de ce site implique l'acceptation pleine et entière des CGU décrites ci-après. Celles-ci sont consultables à tout moment et peuvent être modifiées sans préavis.</p>

          <h2>1. Présentation du Service</h2>
          <p>
            Le site <strong>Mon CV Go</strong> est un service en ligne gratuit ("Software as a Service") permettant aux utilisateurs (candidats, professionnels, étudiants) de créer, éditer, formater et télécharger des Curriculum Vitae (CV) et des lettres de motivation professionnels sous format PDF ou HTML.
          </p>
          <p>
            L'accès à ce service ne requiert aucune création de compte ni inscription payante. L'intégralité des fonctionnalités proposées (choix des modèles, jauge ATS, assistant de rédaction) est accessible gratuitement. Le financement de ce site est assuré par l'affichage d'encarts publicitaires gérés par la régie Google AdSense.
          </p>

          <h2>2. Accès au site et Disponibilité</h2>
          <p>
            Le site est accessible gratuitement en tout lieu à tout utilisateur ayant un accès à Internet. Tous les frais supportés par l'utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.
          </p>
          <p>
            Nous mettons en œuvre tous les moyens raisonnables à notre disposition pour assurer un accès de qualité au service. Cependant, il s'agit d'une obligation de moyens et non de résultat. Nous nous réservons le droit d'interrompre, de suspendre momentanément ou de modifier sans préavis l'accès à tout ou partie du site, afin d'en assurer la maintenance, ou pour toute autre raison, sans que l'interruption n'ouvre droit à aucune obligation ni indemnisation.
          </p>

          <h2>3. Propriété Intellectuelle</h2>
          <p>
            La structure générale du site Mon CV Go, ainsi que les textes, graphiques, images, sons et vidéos la composant (à l'exclusion des informations saisies par les utilisateurs), sont la propriété exclusive de l'éditeur ou de ses partenaires. 
          </p>
          <p>
            <strong>Modèles de CV et Designs :</strong> Les designs, maquettes et modèles de CV mis à disposition via l'application sont protégés par le droit d'auteur. Ils sont concédés à l'utilisateur pour un <strong>usage strictly personnel et non commercial</strong> (dans le cadre d'une recherche d'emploi ou de stage). Toute reproduction, distribution, revente, ou utilisation commerciale de ces modèles est formellement interdite sans l'accord préalable écrit de l'éditeur.
          </p>

          <h2>4. Responsabilité de l'Utilisateur</h2>
          <p>
            L'utilisateur est seul responsable du contenu qu'il intègre dans son CV (informations personnelles, expériences, qualifications). L'utilisateur s'engage à ne pas inclure de contenu illégal, diffamatoire, trompeur ou contraire aux bonnes mœurs.
          </p>
          <p>
            Étant donné que Mon CV Go fonctionne de manière locale dans le navigateur, il incombe à l'utilisateur de sauvegarder régulièrement son travail (en téléchargeant le fichier PDF ou en exportant ses données) pour éviter toute perte en cas de fermeture du navigateur ou de vidage du cache.
          </p>

          <h2>5. Limitation de Responsabilité de l'Éditeur</h2>
          <p>
            Les informations fournies sur le site (notamment dans la rubrique "Conseils CV" ou via la jauge de "Score ATS") le sont à titre indicatif et général. Elles ne sauraient garantir l'obtention d'un emploi ou d'un entretien.
          </p>
        </div>
      </div>
    </>
  );
}
