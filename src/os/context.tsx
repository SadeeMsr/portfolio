"use client";

import { createContext, useContext } from "react";
import type { AppId } from "./apps";

export type OSApi = {
  mode: "desktop" | "mobile";
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  notify: (message: string, title?: string) => void;
  restart: () => void;
  lock: () => void;
  powerOff: () => void;
};

export const OSContext = createContext<OSApi | null>(null);

export function useOS() {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error("useOS must be used inside a RohanOS shell");
  return ctx;
}
