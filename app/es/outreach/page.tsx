import type { Metadata } from "next";
import OutreachIndex from "@/components/pages/OutreachIndex";

export const metadata: Metadata = { title: "Divulgación" };

export default function Page() {
  return <OutreachIndex lang="es" />;
}
