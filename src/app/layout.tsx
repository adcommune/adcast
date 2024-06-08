"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import classNames from "classnames";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";

const inter = Montserrat({ subsets: ["latin"] });

const privyAppID = process.env.NEXT_PUBLIC_PRIVY_APP_ID as string;

const queryClient = new QueryClient();

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={classNames(
          inter.className,
          "min-h-screen bg-gray-100 font-sans antialiased"
        )}
      >
        <PrivyProvider
          appId={privyAppID}
          config={{
            loginMethods: ["farcaster"],
            embeddedWallets: {
              createOnLogin: "all-users",
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <main>
                <Layout>{children}</Layout>
              </main>
            </TooltipProvider>
          </QueryClientProvider>
        </PrivyProvider>
      </body>
    </html>
  );
}
