"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import { PrivyProvider } from "@privy-io/react-auth";

const inter = Montserrat({ subsets: ["latin"] });

const privyAppID = "clw89wah801bp12ovcou2ri8u";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyProvider
          appId={privyAppID}
          config={{
            loginMethods: ["farcaster"],
            embeddedWallets: {
              createOnLogin: "all-users",
            },
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
