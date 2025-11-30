import "./globals.css";
import type { Metadata } from "next";

import AppHeaderWrapper from "@/components/app-header-wrapper";
import { AppNavigation } from "@/components/app-navigation";
import { BranchProvider } from "./context/branch-context";
import { Toaster } from "sonner";

export const dynamic = "force-dynamic"; // IMPORTANT for Vercel

async function getBranches() {
  const res = await fetch("/api/branches", {
    cache: "no-store",
  });
  return res.json();
}

export const metadata: Metadata = {
  title: "ClinicCare",
  description: "Multi-Branch Management System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const branches = await getBranches();

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <BranchProvider initialBranches={branches}>
          <AppHeaderWrapper />
          <AppNavigation />
          <main className="px-6 py-6">{children}</main>
        </BranchProvider>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
