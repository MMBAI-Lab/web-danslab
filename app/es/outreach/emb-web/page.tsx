import type { Metadata } from "next";
import WebProjectPage from "@/components/pages/WebProjectPage";
import { EMB } from "@/data/content/outreach";

export const metadata: Metadata = { title: "Sitio web EMB 2027" };

export default function Page() {
  return <WebProjectPage lang="es" c={EMB.es} />;
}
