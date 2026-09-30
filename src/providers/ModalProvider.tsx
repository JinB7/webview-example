"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { BRIDGE_EVENTS } from "@/src/lib/bridge/constants";
import { onBridgeMessage } from "@/src/lib/bridge/message";

type ModalContextValue = {
  open: (content: ReactNode) => void;
  close: () => void;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);
  const isOpen = content !== null;

  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((next: ReactNode) => {
    triggerRef.current ??= document.activeElement as HTMLElement | null;
    setContent(next);
  }, []);
  const close = useCallback(() => setContent(null), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    const offBackPressed = onBridgeMessage(BRIDGE_EVENTS.BACK_PRESSED, close);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      offBackPressed();
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
      triggerRef.current = null;
    };
  }, [isOpen, close]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isOpen && createPortal(content, document.body)}
    </ModalContext.Provider>
  );
}
