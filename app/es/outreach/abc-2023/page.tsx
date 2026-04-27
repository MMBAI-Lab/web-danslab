import type { Metadata } from "next";
import AbcPage from "@/components/pages/AbcPage";

export const metadata: Metadata = { title: "ABC 2023" };

export default function Page() {
  return <AbcPage lang="es" />;
}
