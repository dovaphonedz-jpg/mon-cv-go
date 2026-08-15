import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title={t('footer.privacy', "Politique de Confidentialité")} 
        description={t('privacy.seo_desc', "Politique de confidentialité et protection des données personnelles sur Mon CV Go.")} 
        url="https://moncvgo.com/confidentialite" 
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('footer.privacy', "Politique de Confidentialité")}
          </h1>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold">
          <p><strong>{t('legal.last_update', "Date de dernière mise à jour :")}</strong> 11 Juillet 2026</p>

          <p>Chez <strong>Mon CV Go</strong>, nous accordons une importance capitale à la protection de vos données personnelles et au respect de votre vie privée. Cette politique explique comment vos informations sont traitées en toute transparence conformément au Règlement Général sur la Protection des Données (RGPD) et aux lois françaises applicables.</p>

          <h2>1. Principe Fondamental : Traitement Local ("Client-Side")</h2>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl mb-4">
            <p className="m-0 text-emerald-900 dark:text-emerald-300 font-medium">
              🔒 <strong>Vos données ne quittent jamais votre appareil :</strong> L'ensemble du processus de création, d'édition et d'exportation de votre CV est effectué localement dans votre navigateur web. Aucune donnée saisie (nom, prénom, numéro de téléphone, expériences, diplômes, photo) n'est envoyée ni stockée sur nos serveurs.
            </p>
          </div>

          <h2>2. Données Collectées</h2>
          <p>Nous ne collectons aucune donnée nominative de manière directe. Les seules données susceptibles d'être traitées sont :</p>
          <ul>
            <li><strong>Données de navigation anonymes :</strong> À des fins de statistiques de fréquentation (pages vues, temps passé, type de navigateur).</li>
            <li><strong>Données relatives aux publicités Google AdSense :</strong> Afin de maintenir le service gratuit, nous affichons des encarts publicitaires gérés par Google. Google AdSense utilise des cookies pour diffuser des annonces pertinentes en fonction des visites précédentes des utilisateurs sur ce site ou sur d'autres sites web.</li>
          </ul>

          <h2>3. Gestion des Cookies</h2>
          <p>Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d'un site. Nous utilisons deux types de cookies :</p>
          <ul>
            <li><strong>Cookies techniques indispensables :</strong> Nécessaires à la mémorisation de vos préférences (ex: thème sombre/clair, langue sélectionnée) et au fonctionnement de l'application dans votre stockage local.</li>
            <li><strong>Cookies publicitaires (Google AdSense) :</strong> Vous pouvez accepter ou refuser ces cookies publicitaires à tout moment via notre bandeau de consentement aux cookies.</li>
          </ul>

          <h2>4. Vos Droits (RGPD)</h2>
          <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition au traitement de vos données. Étant donné que vos données de CV sont stockées exclusivement dans le cache de votre navigateur (LocalStorage), vous pouvez supprimer définitivement toutes vos données en cliquant sur le bouton "Réinitialiser" de l'éditeur ou en vidant l'historique de votre navigateur.</p>

          <h2>5. Contact</h2>
          <p>Pour toute question concernant notre politique de confidentialité, vous pouvez nous contacter via notre <a href="/contact">formulaire de contact</a>.</p>
        </div>
      </div>
    </>
  );
}
