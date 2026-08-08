/**
 * Identite de l'editeur et de l'hebergeur, source unique pour la page de
 * mentions legales, la page de confidentialite et le footer.
 *
 * Base legale : article 1-1 de la LCEN (loi n°2004-575 du 21 juin 2004).
 * Attention, l'article 6 III habituellement cite a ete ABROGE et renumerote par
 * la loi SREN n°2024-449 du 21 mai 2024, qui a aligne le texte sur le Digital
 * Services Act. C'est bien l'article 1-1 qu'il faut citer, et l'article 1-2 pour
 * la sanction.
 */

export const EDITOR = {
  name: "Adam Beloucif",
  role: "Editeur et directeur de la publication",
  email: "adam.beloucif@efrei.net",
  phone: "+33 7 86 46 68 34",
  /**
   * Statut au 2026-08-08 : editeur NON professionnel, personne physique.
   * L'article 1-1 II de la LCEN ouvre dans ce cas un droit a l'anonymat vis a
   * vis du public, a deux conditions cumulatives - avoir communique son
   * identite complete a l'hebergeur, et afficher les coordonnees de celui-ci.
   * Les deux sont remplies, l'adresse postale n'est donc pas publiee ici.
   */
  isProfessional: false,
  /**
   * A RENSEIGNER AVANT LA MISE EN LIGNE DE LA VUE PRESTATION (lot 7).
   * Des que le site propose des prestations, Adam devient editeur
   * professionnel au sens de l'article 1-1 I, et trois mentions deviennent
   * obligatoires - adresse (personnelle ou de correspondance), numero SIREN,
   * et la mention de franchise de TVA. Choisir l'adresse est une decision
   * personnelle (publier son domicile n'est pas anodin), elle revient a Adam.
   */
  address: null as string | null,
  siren: null as string | null,
  vatNotice: "TVA non applicable, article 293 B du Code general des impots",
} as const;

/**
 * Verifie sur vercel.com/legal/privacy-policy, section "Contact Us", le
 * 2026-08-08. Cette adresse peut changer sans preavis, la revalider a chaque
 * revision des mentions legales plutot que de la considerer comme acquise.
 */
export const HOST = {
  name: "Vercel Inc.",
  address: "440 N Barranca Avenue #4133, Covina, CA 91723, Etats-Unis",
  website: "https://vercel.com",
  verifiedOn: "2026-08-08",
} as const;

export const PRIVACY = {
  /** Aucun traceur n'est pose. C'est ce qui dispense de bandeau de consentement. */
  usesCookies: false,
  usesAnalytics: false,
  /** Le contact passe par un lien mailto, aucun formulaire, aucun stockage. */
  hasContactForm: false,
  authority: {
    name: "Commission nationale de l'informatique et des libertes (CNIL)",
    address: "3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07",
    website: "https://www.cnil.fr",
  },
} as const;
