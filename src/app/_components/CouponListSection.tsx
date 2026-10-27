"use client";

import { useEffect, useState } from "react";
import { CouponCard } from "@/src/features/coupon/components/CouponCard";
import { CouponDetailModal } from "@/src/features/coupon/components/CouponDetailModal";
import { useCoupons } from "@/src/features/coupon/hooks/useCoupons";
import { useModal } from "@/src/hooks/useModal";
import { BRIDGE_EVENTS } from "@/src/lib/bridge/constants";
import { onBridgeMessage, sendToNative } from "@/src/lib/bridge/message";
import { Spinner } from "@/src/components/Spinner";

export function CouponListSection() {
  const { open } = useModal();
  const { data: coupons = [], isLoading, refetch } = useCoupons();
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  useEffect(() => {
    return onBridgeMessage(BRIDGE_EVENTS.APP_STATE, ({ state }) => {
      if (state === "foreground") {
        refetch();
      }
    });
  }, [refetch]);

  const handleClaim = (couponId: string) => {
    setClaimedIds((ids) => [...ids, couponId]);
    sendToNative(BRIDGE_EVENTS.COUPON_CLAIMED, { couponId });
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return coupons.map((coupon) => (
    <CouponCard
      key={coupon.id}
      discount={coupon.discount}
      title={coupon.title}
      claimed={claimedIds.includes(coupon.id)}
      onClaim={() => handleClaim(coupon.id)}
      onDetail={() =>
        open(
          <CouponDetailModal
            title={coupon.title}
            conditions={coupon.conditions}
            period={coupon.period}
          />,
        )
      }
    />
  ));
}
