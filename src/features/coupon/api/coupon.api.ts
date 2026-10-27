import { apiRequest } from "@/src/lib/api/client";
import type { Coupon } from "@/src/features/coupon/types/coupon";

export const getCoupons = () => apiRequest<Coupon[]>({ url: "/coupons" });
