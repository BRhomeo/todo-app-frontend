import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import { ThemeProvider } from "./components/theme/theme-provider";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <section className={styles.container}>
              <Nav />
              <main className={styles.main}>{children}</main>
            </section>
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
