import React from 'react';
import { ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <>
    <SEO title="Politique de Confidentialité" description="Politique de confidentialité et gestion des données personnelles de Mon CV Go." url="https://www.moncvgo.com/confidentialite" />
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Politique de Confidentialité</h1>
      </div>

      <div className="prose prose-slate dark:prose-invert prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600">
        <p><strong>Dernière mise à jour :</strong> 11 Juillet 2026</p>
        
        <p>La présente Politique de Confidentialité décrit la manière dont Mon CV Go ("nous", "notre", "nos") collecte, utilise et protège vos informations lorsque vous utilisez notre site web et nos services de création de CV et de lettres de motivation. La protection de votre vie privée est d'une importance capitale pour nous.</p>

        <h2>1. Collecte des données personnelles</h2>
        <p>
          Mon CV Go a été conçu selon le principe de "Privacy by Design". <strong>Toutes les informations personnelles que vous saisissez dans notre éditeur de CV</strong> (nom complet, adresse email, numéro de téléphone, adresse postale, parcours professionnel, parcours académique, et photographie) <strong>sont traitées exclusivement localement dans la mémoire de votre navigateur web</strong> (via l'API <code>localStorage</code>).
        </p>
        <p>
          Nous ne transférons, ne stockons, et n'analysons aucune des données textuelles de votre CV sur nos serveurs. Vous êtes l'unique détenteur de ces informations. Si vous videz le cache de votre navigateur, ces données seront définitivement perdues, car nous n'en possédons aucune copie.
        </p>

        <h2>2. Utilisation de Google AdSense et cookies publicitaires</h2>
        <p>
          Afin de maintenir ce service 100% gratuit pour tous les utilisateurs, Mon CV Go est monétisé via l'affichage de publicités fournies par <strong>Google AdSense</strong>. 
        </p>
        <ul>
          <li><strong>Cookies DoubleClick DART :</strong> Des fournisseurs tiers, y compris Google, utilisent des cookies pour diffuser des annonces en fonction de vos visites antérieures sur notre site web ou sur d'autres pages Internet.</li>
          <li>L'utilisation de cookies publicitaires permet à Google et à ses partenaires d'adapter les annonces diffusées auprès de nos utilisateurs en fonction de leur navigation sur nos sites et/ou d'autres sites Internet.</li>
          <li><strong>Désactivation de la publicité personnalisée :</strong> En tant qu'utilisateur, vous avez le contrôle. Vous pouvez désactiver la publicité personnalisée en accédant aux <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Paramètres des annonces Google</a>. Vous pouvez également désactiver les cookies d'un fournisseur tiers relatifs à la publicité personnalisée en consultant le site <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">www.aboutads.info</a>.</li>
        </ul>

        <h2>3. Données de Navigation et Statistiques (Analytics)</h2>
        <p>
          Comme la grande majorité des sites web modernes, nous recueillons automatiquement certaines informations non personnelles lors de votre visite à des fins statistiques et d'amélioration du service (via Google Analytics ou des outils similaires). Ces données incluent :
        </p>
        <ul>
          <li>Votre adresse IP (anonymisée dans la mesure du possible).</li>
          <li>Le type et la version de votre navigateur web.</li>
          <li>Votre système d'exploitation.</li>
          <li>Les pages de notre site que vous consultez, l'heure et la date de votre visite, le temps passé sur ces pages.</li>
        </ul>
        <p>Ces données sont strictement agrégées et ne permettent en aucun cas de vous identifier personnellement ou de lier votre navigation aux informations saisies dans votre CV.</p>

        <h2>4. Hébergement et Sécurité</h2>
        <p>
          Notre site est hébergé sur des serveurs sécurisés. Bien que la création de votre document s'effectue localement sur votre appareil, nous mettons en œuvre toutes les mesures standards de sécurité web (chiffrement SSL/HTTPS) pour sécuriser la distribution de notre application et empêcher toute interception lors du chargement des pages. La sécurité de vos données de CV dépend de la sécurité physique et logicielle de l'appareil que vous utilisez.
        </p>

        <h2>5. Conformité RGPD (Règlement Général sur la Protection des Données)</h2>
        <p>
          Dans le cadre de l'utilisation des cookies (statistiques et publicitaires), nous nous conformons aux directives du RGPD européen :
        </p>
        <ul>
          <li><strong>Droit d'accès et d'effacement :</strong> Puisque nous ne stockons pas vos données de CV, il vous suffit de vider le cache de votre navigateur pour effacer toutes vos informations.</li>
          <li><strong>Consentement :</strong> Lors de votre première visite, une bannière de consentement vous informe de l'utilisation des cookies, vous permettant d'accepter ou de refuser les cookies non essentiels (notamment ceux liés à la publicité ciblée).</li>
        </ul>

        <h2>6. Modifications de cette Politique</h2>
        <p>
          Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment. Toute modification entrera en vigueur immédiatement après la publication de la politique mise à jour sur cette page. Nous vous encourageons à consulter cette page régulièrement.
        </p>

        <h2>7. Nous contacter</h2>
        <p>
          Pour toute question, préoccupation ou demande d'information concernant cette politique de confidentialité ou le traitement de vos données, vous pouvez nous contacter via notre page <a href="/contact">Contact</a>.
        </p>
      </div>
    </div>
    </>
  );
}
