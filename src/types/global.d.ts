declare global {
  interface Window {
    // Objects the native app injects for sendToNative (src/lib/bridge).
    // iOS WKWebView: userContentController.add(_, name: "bridge")
    webkit?: {
      messageHandlers?: {
        bridge?: { postMessage: (message: string) => void };
      };
    };
    // Android: addJavascriptInterface(_, "AndroidBridge")
    AndroidBridge?: { postMessage: (message: string) => void };
  }
}

export {};
