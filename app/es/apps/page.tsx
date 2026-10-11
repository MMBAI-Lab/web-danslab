import type { Metadata } from "next";
import AppsPage from "@/components/pages/AppsPage";

export const metadata: Metadata = { title: "Apps" };

export default function Page() {
  return <AppsPage lang="es" />;
}
