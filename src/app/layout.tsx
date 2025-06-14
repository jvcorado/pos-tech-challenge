import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BankProvider } from "@/context/BankContext";
import { AuthProvider } from "@/context/AuthContext";
import { GlobalLoader } from "@/components/globalLoader";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter}  antialiased`}>
        <AuthProvider>
          <BankProvider>
            <GlobalLoader />
            {children}
          </BankProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
