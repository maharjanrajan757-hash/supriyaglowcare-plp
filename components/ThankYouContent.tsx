"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Home, PhoneCall } from "lucide-react";
import { formatNpr } from "@/lib/product";

export function ThankYouContent() {
  const params = useSearchParams();
  const product = params.get("product") || "LEITO Hair Care Collection";
  const quantity = Math.max(1, Number(params.get("quantity")) || 1);
  const total = Math.max(0, Number(params.get("total")) || 0);
  const orderId = params.get("orderId");
  const paymentMethod = params.get("payment") || "Cash On Delivery";

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#C9A84C] shadow-xl shadow-[#8B5E3C]/15">
        <Check size={38} strokeWidth={3} />
      </div>
      <p className="eyebrow mt-7">Order received successfully</p>
      <h1 className="font-display mt-3 text-5xl font-bold leading-tight">Thank you for your order!</h1>
      <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-[#765b47]">
        Our sales representative will call you soon to confirm your order.
      </p>

      <div className="soft-card mt-9 p-5 text-left sm:p-8">
        {orderId && <div className="mb-5 rounded-xl bg-[#F5ECD7] p-3 text-center text-sm"><span className="text-[#765b47]">Order ID: </span><strong>{orderId}</strong></div>}
        <dl className="space-y-4">
          <div className="flex justify-between gap-5 border-b hairline pb-4"><dt className="text-[#765b47]">Product ordered</dt><dd className="max-w-[60%] text-right font-bold">{product}</dd></div>
          <div className="flex justify-between gap-5 border-b hairline pb-4"><dt className="text-[#765b47]">Quantity</dt><dd className="font-bold">{quantity}</dd></div>
          <div className="flex justify-between gap-5 border-b hairline pb-4"><dt className="text-[#765b47]">Total price</dt><dd className="font-display text-xl font-bold">{formatNpr(total)}</dd></div>
          <div className="flex justify-between gap-5"><dt className="text-[#765b47]">Payment method</dt><dd className="font-bold">{paymentMethod}</dd></div>
        </dl>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-[#765b47]">
        <PhoneCall size={18} /> Please keep your phone available for our confirmation call.
      </div>
      <Link href="/" className="gold-button mt-8"><Home size={18} /> Back to Home</Link>
    </div>
  );
}
