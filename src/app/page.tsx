"use client";

import { useState } from "react";
import { CouponCard } from "@/src/components/CouponCard";
import { CouponDetailModal } from "@/src/components/CouponDetailModal";
import { PageLayout } from "@/src/components/PageLayout";
import { useModal } from "@/src/hooks/useModal";
import { BRIDGE_EVENTS } from "@/src/lib/bridge/constants";
import { sendToNative } from "@/src/lib/bridge/message";

const coupons = [
  {
    id: "autumn-drink",
    discount: "10%",
    title: "가을 음료 10% 할인",
    conditions: ["[사용 조건]"],
    period: "[유효기간]",
  },
  {
    id: "dessert-set",
    discount: "15%",
    title: "디저트 세트 15% 할인",
    conditions: [
      "10,000원 이상 결제 시 사용할 수 있어요.",
      "1인 1회만 사용할 수 있어요.",
    ],
    period: "2026.10.01 – 2026.10.31",
  },
  {
    id: "first-order",
    discount: "20%",
    title: "첫 주문 20% 할인",
    conditions: ["[사용 조건]"],
    period: "[유효기간]",
  },
];

export default function Home() {
  const { open } = useModal();
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const handleClaim = (couponId: string) => {
    setClaimedIds((ids) => [...ids, couponId]);
    sendToNative(BRIDGE_EVENTS.COUPON_CLAIMED, { couponId });
  };

  return (
    <PageLayout
      title="가을 맞이 10% 할인 쿠폰"
      description="10월 31일까지 받을 수 있어요"
    >
      {coupons.map((coupon) => (
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
      ))}
    </PageLayout>
  );
}
