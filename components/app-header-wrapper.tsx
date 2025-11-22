"use client";

import { useBranchContext } from "@/app/context/branch-context";
import { AppHeader } from "@/components/app-header";

export default function AppHeaderWrapper() {
  const { branches, selectedBranch, setSelectedBranch } = useBranchContext();

  return (
    <AppHeader
      branches={branches}
      selectedBranch={selectedBranch}
      onBranchChange={setSelectedBranch}
    />
  );
}
