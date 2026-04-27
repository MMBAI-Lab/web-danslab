import type { Metadata } from "next";
import SonifPage from "@/components/pages/SonifPage";

export const metadata: Metadata = { title: "Sonificación" };

export default function Page() {
  return <SonifPage lang="es" />;
}
