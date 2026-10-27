---
name: api-patterns
description: API 호출 함수나 React Query 훅(useQuery, useMutation)을 작성·수정·리뷰할 때 사용. axios 클라이언트(apiRequest) 사용법, API 함수·쿼리 키·훅의 파일 위치와 네이밍, 캐시 무효화 규칙을 정리한 기준 문서.
---

# React Query 훅 패턴

- HTTP 호출은 `src/lib/api/client.ts`의 `apiRequest`로만 한다
- 훅은 layout의 `QueryProvider`(`src/providers/`) 안에서만 동작한다
- 도메인별 파일 위치
  - API 함수: `src/features/<도메인>/api/<도메인>.api.ts`
  - 쿼리 키: `src/features/<도메인>/api/<도메인>.keys.ts`
  - 요청 바디 타입: `src/features/<도메인>/types/<도메인>.ts` — `<동사><Resource>Request`
  - 훅: `src/features/<도메인>/hooks/` — 조회는 `use<Resource>s`, 전송은 `use<동사><Resource>`

## API 함수

`apiRequest<T>`는 응답 `{ success, data, message }`에서 `data`만 꺼내 반환한다. `baseURL`이 `/api`라서 url에는 `/api`를 빼고 쓴다. Route Handler(mock 포함)도 `Response.json({ success: true, data })` 형식으로 응답해야 한다.

```typescript
// src/features/coupon/api/coupon.api.ts
import { apiRequest } from "@/src/lib/api/client";
import type {
  Coupon,
  RegisterCouponRequest,
} from "@/src/features/coupon/types/coupon";

export const getCoupons = () => apiRequest<Coupon[]>({ url: "/coupons" });

export const registerCoupon = (body: RegisterCouponRequest) =>
  apiRequest<Coupon>({ url: "/coupons", method: "POST", data: body });
```

## 쿼리 키

쿼리 키는 문자열 배열로 직접 쓰지 않고 도메인별 키 객체로 관리한다. 하위 키는 `all`에서 이어 만들어서, `all`로 무효화하면 도메인 쿼리 전체가 함께 무효화되게 한다.

```typescript
// src/features/coupon/api/coupon.keys.ts
export const couponKeys = {
  all: ["coupons"] as const,
  list: () => [...couponKeys.all, "list"] as const,
};
```

## 쿼리 (데이터 조회)

```typescript
// src/features/coupon/hooks/useCoupons.ts
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
```

## 데이터 전송 (useMutation)

요청 바디는 `mutate`의 인자로 넘긴다. 전송 결과로 캐시된 쿼리의 데이터가 바뀔 때만 `onSuccess`에서 그 쿼리를 무효화한다. 바뀌는 쿼리가 없으면(로그 전송, 문의 제출 등) 무효화하지 않는다.

```typescript
// src/features/coupon/hooks/useRegisterCoupon.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerCoupon } from "@/src/features/coupon/api/coupon.api";
import { couponKeys } from "@/src/features/coupon/api/coupon.keys";

export const useRegisterCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerCoupon,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: couponKeys.all }),
  });
};
```

```tsx
// 컴포넌트에서 호출
const { mutate, isPending } = useRegisterCoupon();

<Button disabled={isPending} onClick={() => mutate({ code })}>
  등록
</Button>;
```
