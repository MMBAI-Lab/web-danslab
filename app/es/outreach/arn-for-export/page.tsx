import type { Metadata } from "next";
import ArnPage from "@/components/pages/ArnPage";

export const metadata: Metadata = { title: "ARN for Export" };

export default function Page() {
  return <ArnPage lang="es" />;
}
