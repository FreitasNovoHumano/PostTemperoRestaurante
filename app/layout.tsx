import "./globals.css";

/**
 * 🧱 Layout raiz
 */

import Providers from "./providers";

export default function RootLayout({ children }: any) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}