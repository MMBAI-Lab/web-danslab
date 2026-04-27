import type { Metadata } from "next";
import CollaboratorsPage from "@/components/pages/CollaboratorsPage";

export const metadata: Metadata = { title: "Colaboradores" };

export default function Page() {
  return <CollaboratorsPage lang="es" />;
}
