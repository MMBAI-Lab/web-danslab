import type { Metadata } from "next";
import WebProjectPage from "@/components/pages/WebProjectPage";
import { DCB } from "@/data/content/outreach";

export const metadata: Metadata = { title: "DCB website" };

export default function Page() {
  return <WebProjectPage lang="en" c={DCB.en} />;
}
