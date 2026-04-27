import type { Metadata } from "next";
import CollaboratorsPage from "@/components/pages/CollaboratorsPage";

export const metadata: Metadata = { title: "Collaborators" };

export default function Page() {
  return <CollaboratorsPage lang="en" />;
}
