export type NativeToWeb = {
  BACK_PRESSED: undefined;
  APP_STATE: { state: "foreground" | "background" };
};

export type WebToNative = {
  COUPON_CLAIMED: { couponId: string };
  BACK_NOT_HANDLED: undefined;
};
