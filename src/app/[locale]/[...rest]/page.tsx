import { notFound } from "next/navigation";

/** Toute URL inconnue d'une langue valide passe par le not-found localise. */
export default function CatchAll() {
  notFound();
}
