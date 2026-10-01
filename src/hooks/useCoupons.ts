"use client";

import { useCallback, useEffect, useState } from "react";
import type { Coupon } from "@/src/types/coupon";

const fetchCoupons = async (): Promise<Coupon[]> => {
  const res = await fetch("/api/coupons");
  if (!res.ok) throw new Error(`쿠폰 조회 실패: ${res.status}`);
  return res.json();
};

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(
    () =>
      fetchCoupons()
        .then(setCoupons)
        .catch(console.error)
        .finally(() => setIsLoading(false)),
    [],
  );

  const refetch = useCallback(() => {
    setIsLoading(true);
    return load();
  }, [load]);

  useEffect(() => {
    load();
  }, [load]);

  return { coupons, isLoading, refetch };
};
