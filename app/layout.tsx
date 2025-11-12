import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/store/ThemeContext";

export const metadata: Metadata = {
  title: "Note Code",
  description: "Create and share code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >  
      <ThemeProvider>
        <main className="min-h-screen w-full flex flex-col items-center pb-36 px-4">
            <Header/>
            {children}
          </main>
      </ThemeProvider>
      </body>
    </html>
  );
}
