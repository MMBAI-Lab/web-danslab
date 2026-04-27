import type { Metadata } from "next";
import CoursesPage from "@/components/pages/CoursesPage";

export const metadata: Metadata = { title: "Cursos" };

export default function Page() {
  return <CoursesPage lang="es" />;
}
