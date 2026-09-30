import type { NativeToWeb, WebToNative } from "@/src/lib/bridge/types";

const stack: Array<() => void> = [];

export const pushBackHandler = (handler: () => void) => {
  stack.push(handler);
  return () => {
    const i = stack.lastIndexOf(handler);
    if (i !== -1) stack.splice(i, 1);
  };
};

export const initBackHandling = () =>
  onBridgeMessage("BACK_PRESSED", () => {
    const top = stack[stack.length - 1];
    if (top) top();
    else sendToNative("BACK_NOT_HANDLED");
  });

export const onBridgeMessage = <T extends keyof NativeToWeb>(
  type: T,
  handler: (payload: NativeToWeb[T]) => void,
) => {
  const listener = (e: MessageEvent) => {
    if (typeof e.data !== "string") return;
    try {
      const msg = JSON.parse(e.data);
      if (msg.type === type) handler(msg.payload);
    } catch {}
  };
  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
};

export const sendToNative = <T extends keyof WebToNative>(
  type: T,
  payload?: WebToNative[T],
) => {
  const message = JSON.stringify({ type, payload });

  // iOS (WKWebView)
  window.webkit?.messageHandlers?.bridge?.postMessage(message);
  // Android (addJavascriptInterface로 등록한 객체)
  window.AndroidBridge?.postMessage(message);
};
