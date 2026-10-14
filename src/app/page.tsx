/**
 * HOME PAGE (/)
 *
 * Redirects visitors straight to the design system docs.
 * Students rarely need to edit this file.
 */
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/design-system");
}
