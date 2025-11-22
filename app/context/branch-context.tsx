"use client";

import { createContext, useContext, useState } from "react";

interface Branch {
  id: number;
  name: string;
}

interface BranchContextProps {
  branches: Branch[];
  selectedBranch: number;
  setSelectedBranch: (id: number) => void;
}

const BranchContext = createContext<BranchContextProps | undefined>(undefined);

export function BranchProvider({
  children,
  initialBranches,
}: {
  children: React.ReactNode;
  initialBranches: Branch[];
}) {
  const [selectedBranch, setSelectedBranch] = useState(0);

  return (
    <BranchContext.Provider
      value={{ branches: initialBranches, selectedBranch, setSelectedBranch }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranchContext() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranchContext must be used inside BranchProvider");
  return ctx;
}
