import coupons from "@/src/data/coupons.json";

export async function GET() {
  return Response.json(coupons);
}
