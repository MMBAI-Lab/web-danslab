import type { Metadata } from "next";
import WebProjectPage from "@/components/pages/WebProjectPage";
import { EMB } from "@/data/content/outreach";

export const metadata: Metadata = { title: "EMB 2027 website" };

export default function Page() {
  return <WebProjectPage lang="en" c={EMB.en} />;
}
