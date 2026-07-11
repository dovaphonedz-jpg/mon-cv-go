import React from 'react';
import { Scale } from 'lucide-react';

export default function Legal() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300">
          <Scale className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Conditions d'Utilisation</h1>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600">
        <p><strong>Dernière mise à jour :</strong> 11 Juillet 2026</p>

        <h2>1. Présentation du site</h2>
        <p>
          Le site <strong>MonCVGo</strong> est un outil en ligne gratuit permettant de créer, formater et télécharger des Curriculum Vitae (CV) professionnels. L'utilisation du site implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après.
        </p>

        <h2>2. Propriété intellectuelle</h2>
        <p>
          L'ensemble des éléments constituant le site (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses, bases de données, etc.) ainsi que le site lui-même, relèvent des législations françaises et internationales sur le droit d'auteur et sur les droits voisins du droit d'auteur.
        </p>
        <p>
          Les modèles de CV mis à disposition sont destinés à un usage strictement personnel. Toute revente ou distribution commerciale des modèles est interdite.
        </p>

        <h2>3. Responsabilité</h2>
        <p>
          MonCVGo est fourni "en l'état". Nous ne saurions garantir l'exactitude, la complétude, et l'actualité des informations qui y sont diffusées. L'utilisateur est seul responsable des données qu'il saisit dans son CV. 
          MonCVGo décline toute responsabilité quant à d'éventuels dommages directs ou indirects, matériels ou immatériels, résultant de l'utilisation du site, d'une perte de données, ou d'une perte d'opportunité professionnelle.
        </p>

        <h2>4. Données Personnelles et Cookies</h2>
        <p>
          Nous nous engageons à respecter votre vie privée. Les données saisies pour la création du CV sont traitées localement sur votre machine et ne sont pas stockées sur nos serveurs. 
          Pour plus de détails sur l'utilisation de vos données et des cookies (notamment liés à <strong>Google AdSense</strong>), veuillez consulter notre <a href="/confidentialite">Politique de Confidentialité</a>.
        </p>

        <h2>5. Liens hypertextes</h2>
        <p>
          Le site peut contenir des liens hypertextes vers d'autres sites. MonCVGo n'exerce aucun contrôle sur ces sites et n'assume aucune responsabilité quant à leur contenu ou leurs politiques de confidentialité.
        </p>

        <h2>6. Modification des conditions</h2>
        <p>
          Nous nous réservons le droit de modifier à tout moment les présentes conditions d'utilisation afin de les adapter aux évolutions du site ou de la législation en vigueur.
        </p>
      </div>
    </div>
  );
}
