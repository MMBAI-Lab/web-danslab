import type { Metadata } from "next";
import WebProjectPage from "@/components/pages/WebProjectPage";
import { MONT } from "@/data/content/outreach";

export const metadata: Metadata = { title: "M-ONT 2027" };

export default function Page() {
  return <WebProjectPage lang="en" c={MONT.en} />;
}
