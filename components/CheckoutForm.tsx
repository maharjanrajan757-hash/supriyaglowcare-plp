"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { AlertCircle, BadgeCheck, LoaderCircle, LockKeyhole, Minus, Plus, Truck } from "lucide-react";
import { formatNpr, productVariants, type ProductId } from "@/lib/product";

const validProductIds = new Set(Object.keys(productVariants));

export function CheckoutForm() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "bundle";
  const productId = (validProductIds.has(initialProduct) ? initialProduct : "bundle") as ProductId;
  const initialQuantity = Math.min(20, Math.max(1, Number(searchParams.get("quantity")) || 1));
  const [quantity, setQuantity] = useState(initialQuantity);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const product = productVariants[productId];
  const total = useMemo(() => product.price * quantity, [product.price, quantity]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      location: String(form.get("location") || ""),
      productId,
      quantity,
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "We could not submit your order. Please try again.");
      }

      const params = new URLSearchParams({
        orderId: data.order.orderId,
        product: data.order.productName,
        quantity: String(data.order.quantity),
        total: String(data.order.totalPrice),
        payment: data.order.paymentMethod,
      });
      window.location.assign(`/thank-you?${params.toString()}`);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
      <form onSubmit={handleSubmit} className="soft-card order-2 p-5 sm:p-8 lg:order-1">
        <div>
          <p className="eyebrow">Delivery details</p>
          <h1 className="font-display mt-2 text-4xl font-bold">Complete your order</h1>
          <p className="mt-3 text-[#765b47]">No advance payment. Pay cash when your order arrives.</p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold">
            Full Name
            <input className="field mt-2 font-normal" name="fullName" autoComplete="name" required minLength={2} placeholder="Your full name" />
          </label>
          <label className="text-sm font-bold">
            Phone Number
            <input className="field mt-2 font-normal" name="phone" autoComplete="tel" inputMode="tel" required minLength={7} placeholder="98XXXXXXXX" />
          </label>
          <label className="text-sm font-bold sm:col-span-2">
            Email Address
            <input className="field mt-2 font-normal" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          </label>
          <label className="text-sm font-bold sm:col-span-2">
            Exact Location
            <textarea className="field mt-2 min-h-28 resize-y font-normal" name="location" autoComplete="street-address" required minLength={5} placeholder="Kindly share your exact location" />
          </label>
        </div>

        {error && (
          <div role="alert" className="mt-5 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="shrink-0" size={20} /> {error}
          </div>
        )}

        <button disabled={submitting} className="gold-button mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? <><LoaderCircle className="animate-spin" size={19} /> Submitting Order...</> : <>Order Now • {formatNpr(total)}</>}
        </button>
        <div className="mt-5 flex flex-wrap justify-center gap-5 text-xs font-semibold text-[#765b47]">
          <span className="flex items-center gap-1.5"><LockKeyhole size={15} /> Secure order form</span>
          <span className="flex items-center gap-1.5"><BadgeCheck size={15} /> Confirmation call</span>
          <span className="flex items-center gap-1.5"><Truck size={15} /> Free delivery</span>
        </div>
      </form>

      <aside className="order-1 lg:order-2">
        <div className="soft-card sticky top-5 overflow-hidden">
          <div className="bg-[#F5ECD7] p-5">
            <p className="eyebrow">Your order</p>
            <div className="mt-4 flex items-center gap-4">
              <Image src="/images/rice-water-hair-care-removebg-preview.png" alt="" width={110} height={156} className="h-28 w-24 rounded-xl bg-white object-contain" />
              <div>
                <h2 className="font-display text-xl font-bold">{product.shortName}</h2>
                <p className="mt-1 text-sm text-[#765b47]">1000ml {productId === "bundle" ? "each" : "bottle"}</p>
                <p className="mt-2 font-bold">{formatNpr(product.price)} each</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between border-b hairline pb-5">
              <span className="font-bold">Quantity</span>
              <div className="flex items-center rounded-full border hairline">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="grid size-10 place-items-center" aria-label="Decrease quantity"><Minus size={16} /></button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <button type="button" onClick={() => setQuantity((q) => Math.min(20, q + 1))} className="grid size-10 place-items-center" aria-label="Increase quantity"><Plus size={16} /></button>
              </div>
            </div>
            <dl className="space-y-3 py-5 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatNpr(total)}</dd></div>
              <div className="flex justify-between"><dt>Delivery</dt><dd className="font-bold text-green-700">FREE</dd></div>
              <div className="flex justify-between"><dt>Payment</dt><dd>Cash On Delivery</dd></div>
            </dl>
            <div className="flex items-end justify-between border-t hairline pt-5">
              <span className="font-bold">Total</span>
              <span className="font-display text-3xl font-bold">{formatNpr(total)}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
