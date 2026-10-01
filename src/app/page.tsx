"use client";

import { useEffect, useState } from "react";
import { CouponCard } from "@/src/components/CouponCard";
import { CouponDetailModal } from "@/src/components/CouponDetailModal";
import { PageLayout } from "@/src/components/PageLayout";
import { useCoupons } from "@/src/hooks/useCoupons";
import { useModal } from "@/src/hooks/useModal";
import { BRIDGE_EVENTS } from "@/src/lib/bridge/constants";
import { onBridgeMessage, sendToNative } from "@/src/lib/bridge/message";
import { Spinner } from "@/src/components/Spinner";

export default function Home() {
  const { open } = useModal();
  const { coupons, isLoading, refetch } = useCoupons();
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  useEffect(() => {
    return onBridgeMessage(BRIDGE_EVENTS.APP_STATE, ({ state }) => {
      if (state === "foreground") refetch();
    });
  }, [refetch]);

  const handleClaim = (couponId: string) => {
    setClaimedIds((ids) => [...ids, couponId]);
    sendToNative(BRIDGE_EVENTS.COUPON_CLAIMED, { couponId });
  };

  return (
    <PageLayout
      title="가을 맞이 10% 할인 쿠폰"
      description="10월 31일까지 받을 수 있어요"
    >
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        coupons.map((coupon) => (
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
        ))
      )}
    </PageLayout>
  );
}
