import pkg from "../../package.json";

/**
 * Source unique de la version de l'application.
 * Toujours lue depuis package.json pour eviter toute version en dur
 * dupliquee dans les pages ou le layout.
 */
export const APP_VERSION = pkg.version;
