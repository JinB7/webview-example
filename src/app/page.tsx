import { CouponListSection } from "@/src/app/_components/CouponListSection";
import { PageLayout } from "@/src/components/PageLayout";

export default function Home() {
  return (
    <PageLayout
      title="가을 맞이 10% 할인 쿠폰"
      description="10월 31일까지 받을 수 있어요"
    >
      <CouponListSection />
    </PageLayout>
  );
}
