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

        <h2>1. Collecte des informations</h2>
        <p>
          MonCVGo respecte scrupuleusement votre vie privée. Toutes les informations que vous saisissez dans notre éditeur de CV (nom, photo, expériences, contacts) sont traitées <strong>exclusivement dans votre navigateur web local</strong> (via localStorage). Nous ne transférons, ne stockons, et n'analysons <strong>aucune de vos données personnelles de CV sur nos serveurs</strong>.
        </p>

        <h2>2. Utilisation de Google AdSense et des Cookies</h2>
        <p>
          Pour maintenir ce service 100% gratuit, ce site utilise <strong>Google AdSense</strong> pour afficher des annonces publicitaires.
        </p>
        <ul>
          <li>Des tiers, y compris Google, utilisent des cookies pour diffuser des annonces en fonction de vos visites antérieures sur ce site web ou d'autres sites web.</li>
          <li>L'utilisation de cookies publicitaires par Google permet à Google et à ses partenaires de diffuser des annonces auprès de nos utilisateurs en fonction de leur navigation sur nos sites et/ou d'autres sites web.</li>
          <li>Vous pouvez désactiver la publicité personnalisée en accédant aux <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Paramètres des annonces Google</a>. Vous pouvez également désactiver les cookies d'un fournisseur tiers relatifs à la publicité personnalisée en consultant le site <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">www.aboutads.info</a>.</li>
        </ul>

        <h2>3. Données de Navigation</h2>
        <p>
          Comme la plupart des sites web, nous recueillons automatiquement certaines informations non personnelles (type de navigateur, adresse IP, pages visitées) à des fins statistiques (Google Analytics). Ces données sont anonymisées et servent uniquement à améliorer la qualité de notre service.
        </p>

        <h2>4. Sécurité</h2>
        <p>
          Étant donné que la création de votre CV se fait localement sur votre appareil, la sécurité de ces données dépend de la sécurité de votre propre appareil. Nous mettons en œuvre toutes les mesures standards de sécurité web (HTTPS) pour sécuriser la distribution de notre application.
        </p>

        <h2>5. Nous contacter</h2>
        <p>
          Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter via notre page <a href="/contact">Contact</a>.
        </p>
      </div>
    </div>
    </>
  );
}
