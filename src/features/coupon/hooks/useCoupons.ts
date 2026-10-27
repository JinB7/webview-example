"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoupons } from "@/src/features/coupon/api/coupon.api";
import { couponKeys } from "@/src/features/coupon/api/coupon.keys";

export const useCoupons = () => {
  return useQuery({
    queryKey: couponKeys.list(),
    queryFn: getCoupons,
  });
};
