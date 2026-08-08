import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EDITOR, HOST } from "@/data/legal";

export const metadata: Metadata = {
  title: "Mentions légales - Adam Beloucif",
  description:
    "Mentions légales du site adam.beloucif.com - éditeur, directeur de la publication, hébergeur et propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#0A0A0A]">
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="border-b border-[#0A0A0A]/10 pb-10 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E]">
            INFORMATIONS LÉGALES
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-4">
            Mentions légales
          </h1>
          <p className="text-sm text-[#0A0A0A]/70 mt-6 leading-relaxed font-medium">
            Informations publiées en application de l&apos;article 1-1 de la loi
            n&deg; 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
            numérique.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E] mb-5">
            ÉDITEUR DU SITE
          </h2>
          <dl className="text-sm leading-relaxed space-y-2">
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">Éditeur :</dt>
              <dd>{EDITOR.name}, personne physique</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">Directeur de la publication :</dt>
              <dd>{EDITOR.name}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">Contact :</dt>
              <dd>
                <a href={`mailto:${EDITOR.email}`} className="underline hover:no-underline">
                  {EDITOR.email}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">Téléphone :</dt>
              <dd>{EDITOR.phone}</dd>
            </div>
          </dl>
          {!EDITOR.isProfessional && (
            <p className="text-xs text-[#0A0A0A]/70 mt-5 leading-relaxed border-l-2 border-[#0A0A0A]/15 pl-4">
              Ce site est un portfolio personnel, édité à titre non professionnel.
              Conformément à l&apos;article 1-1 II de la LCEN, l&apos;éditeur a
              communiqué les éléments d&apos;identification permettant son
              identification à son hébergeur, dont les coordonnées figurent
              ci-dessous, et n&apos;est donc pas tenu de publier son adresse
              postale.
            </p>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E] mb-5">
            HÉBERGEUR
          </h2>
          <dl className="text-sm leading-relaxed space-y-2">
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">Société :</dt>
              <dd>{HOST.name}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">Adresse :</dt>
              <dd>{HOST.address}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-bold">Site :</dt>
              <dd>
                <a
                  href={HOST.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  vercel.com
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E] mb-5">
            PROPRIÉTÉ INTELLECTUELLE
          </h2>
          <p className="text-sm leading-relaxed text-[#0A0A0A]/80">
            Les textes, la structure et le code de ce site sont l&apos;œuvre de
            son éditeur. Les noms d&apos;établissements, d&apos;écoles et
            d&apos;employeurs cités le sont à titre informatif, pour décrire un
            parcours réel. Cette citation ne vaut ni partenariat, ni caution, ni
            recommandation de leur part.
          </p>
          <p className="text-sm leading-relaxed text-[#0A0A0A]/80 mt-4">
            Les projets présentés renvoient vers leurs dépôts publics et, le cas
            échéant, vers leur version en ligne. Le code source du site est publié
            sous licence MIT.
          </p>
        </section>

        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E] mb-5">
            DONNÉES PERSONNELLES
          </h2>
          <p className="text-sm leading-relaxed text-[#0A0A0A]/80">
            Le traitement des données personnelles est décrit dans la{" "}
            <a href="/confidentialite" className="underline hover:no-underline">
              politique de confidentialité
            </a>
            . Ce site ne dépose aucun cookie et n&apos;utilise aucun outil de
            mesure d&apos;audience.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
