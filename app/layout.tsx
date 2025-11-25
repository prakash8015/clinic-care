import "./globals.css";
import type { Metadata } from "next";

import AppHeaderWrapper from "@/components/app-header-wrapper";
import { AppNavigation } from "@/components/app-navigation";
import { BranchProvider } from "./context/branch-context";
import { Toaster } from "sonner";

async function getBranches() {
  const res = await fetch("http://localhost:3000/api/branches", {
    cache: "no-store",
  });
  return await res.json();
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
        {/* Sonner Toast Notifications */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}