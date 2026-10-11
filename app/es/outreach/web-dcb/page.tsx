import type { Metadata } from "next";
import WebProjectPage from "@/components/pages/WebProjectPage";
import { DCB } from "@/data/content/outreach";

export const metadata: Metadata = { title: "Sitio web del DCB" };

export default function Page() {
  return <WebProjectPage lang="es" c={DCB.es} />;
}
