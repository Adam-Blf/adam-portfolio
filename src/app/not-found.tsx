import "@/styles/fonts.css";
import "@/styles/tokens.css";
import "@/styles/base.css";

/** 404 hors segment de langue : page minimale, bilingue par necessite. */
export default function RootNotFound() {
  return (
    <html lang="fr">
      <body style={{ display: "grid", placeItems: "center", minHeight: "100vh", padding: "2rem" }}>
        <main>
          <h1>404</h1>
          <p>Page introuvable. Page not found.</p>
          <p>
            <a href="/">Adam Beloucif</a>
          </p>
        </main>
      </body>
    </html>
  );
}
