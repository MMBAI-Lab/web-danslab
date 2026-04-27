import type { Metadata } from "next";
import ResearchPage from "@/components/pages/ResearchPage";

export const metadata: Metadata = { title: "Investigación" };

export default function Page() {
  return <ResearchPage lang="es" />;
}
