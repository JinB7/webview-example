"use client";

import { useEffect, type ReactNode } from "react";
import { initBackHandling } from "@/src/lib/bridge/message";

export function BackHandling({ children }: { children: ReactNode }) {
  useEffect(() => initBackHandling(), []);

  return children;
}
