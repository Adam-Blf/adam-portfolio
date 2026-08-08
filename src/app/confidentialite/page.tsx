import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EDITOR, HOST, PRIVACY } from "@/data/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Adam Beloucif",
  description:
    "Politique de confidentialité du site adam.beloucif.com - aucun cookie, aucune mesure d'audience, seuls les journaux techniques de l'hébergeur.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#0A0A0A]">
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="border-b border-[#0A0A0A]/10 pb-10 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E]">
            RGPD ET VIE PRIVÉE
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-4">
            Confidentialité
          </h1>
          <p className="text-sm text-[#0A0A0A]/70 mt-6 leading-relaxed font-medium">
            Ce site est volontairement sobre : aucun compte, aucun formulaire,
            aucun cookie, aucune mesure d&apos;audience. Le seul traitement de
            données qui subsiste est celui des journaux techniques de
            l&apos;hébergeur, et cette page existe pour vous en informer.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E] mb-5">
            RESPONSABLE DU TRAITEMENT
          </h2>
          <p className="text-sm leading-relaxed text-[#0A0A0A]/80">
            {EDITOR.name}, joignable à l&apos;adresse{" "}
            <a href={`mailto:${EDITOR.email}`} className="underline hover:no-underline">
              {EDITOR.email}
            </a>
            .
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E] mb-5">
            CE QUI EST TRAITÉ, ET POURQUOI
          </h2>
          <p className="text-sm leading-relaxed text-[#0A0A0A]/80">
            Comme tout site accessible en ligne, ce site s&apos;appuie sur un
            hébergeur qui journalise techniquement les requêtes reçues : adresse
            IP, horodatage, page demandée, agent utilisateur. L&apos;adresse IP
            étant une donnée à caractère personnel, ce journal constitue un
            traitement au sens du RGPD.
          </p>
          <dl className="text-sm leading-relaxed space-y-2 mt-5">
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">Finalité :</dt>
              <dd>fonctionnement technique et sécurité du site, rien d&apos;autre.</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">Base légale :</dt>
              <dd>intérêt légitime, article 6.1.f du RGPD.</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">Destinataire :</dt>
              <dd>
                {HOST.name}, hébergeur, agissant comme sous-traitant au sens de
                l&apos;article 28 du RGPD.
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">Conservation :</dt>
              <dd>
                durée fixée par l&apos;hébergeur dans sa propre documentation, ces
                journaux n&apos;étant ni consultés ni exploités par l&apos;éditeur.
              </dd>
            </div>
          </dl>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E] mb-5">
            CE QUI N&apos;EST PAS FAIT
          </h2>
          <ul className="text-sm leading-relaxed text-[#0A0A0A]/80 space-y-2 list-disc pl-5">
            {!PRIVACY.usesCookies && (
              <li>
                Aucun cookie n&apos;est déposé. C&apos;est la raison pour laquelle
                aucun bandeau de consentement ne vous est présenté : il n&apos;y a
                rien à consentir.
              </li>
            )}
            {!PRIVACY.usesAnalytics && (
              <li>
                Aucun outil de mesure d&apos;audience, aucun traceur publicitaire,
                aucun profilage.
              </li>
            )}
            {!PRIVACY.hasContactForm && (
              <li>
                Aucun formulaire de contact. Les boutons de contact ouvrent votre
                logiciel de messagerie avec un message pré-rempli : rien
                n&apos;est envoyé ni stocké par ce site. Votre message
                n&apos;existe que dans votre messagerie et dans celle du
                destinataire.
              </li>
            )}
            <li>Aucune donnée n&apos;est vendue, louée ou transmise à un tiers.</li>
          </ul>
          <p className="text-xs text-[#0A0A0A]/70 mt-5 leading-relaxed border-l-2 border-[#0A0A0A]/15 pl-4">
            Les préférences d&apos;affichage éventuelles (thème clair ou sombre)
            sont enregistrées dans le stockage local de votre navigateur. Elles ne
            quittent jamais votre appareil et ne sont lisibles par personne
            d&apos;autre que vous.
          </p>
        </section>

        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E] mb-5">
            VOS DROITS
          </h2>
          <p className="text-sm leading-relaxed text-[#0A0A0A]/80">
            Vous disposez des droits d&apos;accès, de rectification,
            d&apos;effacement, de limitation, d&apos;opposition et de portabilité
            prévus aux articles 15 à 21 du RGPD. Pour les exercer, écrivez à{" "}
            <a href={`mailto:${EDITOR.email}`} className="underline hover:no-underline">
              {EDITOR.email}
            </a>
            .
          </p>
          <p className="text-sm leading-relaxed text-[#0A0A0A]/80 mt-4">
            Si la réponse ne vous satisfait pas, vous pouvez introduire une
            réclamation auprès de la {PRIVACY.authority.name},{" "}
            {PRIVACY.authority.address},{" "}
            <a
              href={PRIVACY.authority.website}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              cnil.fr
            </a>
            .
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
