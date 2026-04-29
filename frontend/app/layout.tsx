import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./settings-styles.css";
import { Provider } from "@/components/ui/provider";
import { MainLayout } from "@/features/layout/main-layout";
import { QueryClientProvider } from "@/global/query-client.provider";
import { SettingsProvider } from "@/features/settings/context/settings-provider";
import { SettingsSyncIndicator } from "@/features/settings/components/settings-sync-indicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Currency Exchange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider>
          <QueryClientProvider>
            <SettingsProvider>
              <MainLayout>
                {children}
              </MainLayout>
              <SettingsSyncIndicator />
            </SettingsProvider>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
