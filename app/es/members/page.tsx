import type { Metadata } from "next";
import MembersPage from "@/components/pages/MembersPage";

export const metadata: Metadata = { title: "Integrantes" };

export default function Page() {
  return <MembersPage lang="es" />;
}
