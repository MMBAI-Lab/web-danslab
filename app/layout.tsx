import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.danslab.xyz"),
  title: {
    default: "DansLab — Molecular Modeling, Bioinformatics & AI",
    template: "%s · DansLab",
  },
  description:
    "DansLab studies the complex and dynamic roles of biological macromolecules through molecular modeling, simulations, structural bioinformatics, and AI. Led by Prof. Pablo D. Dans at Universidad de la República, Uruguay.",
  openGraph: {
    title: "DansLab",
    description:
      "Molecular Modeling, Bioinformatics and AI group — Universidad de la República, Uruguay.",
    url: "https://www.danslab.xyz",
    siteName: "DansLab",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
