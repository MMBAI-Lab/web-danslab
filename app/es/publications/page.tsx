import type { Metadata } from "next";
import PublicationsPage from "@/components/pages/PublicationsPage";

export const metadata: Metadata = { title: "Publicaciones" };

export default function Page() {
  return <PublicationsPage lang="es" />;
}
