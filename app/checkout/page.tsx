import { Suspense } from "react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { SiteHeader } from "@/components/SiteHeader";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#FAF3E0]">
      <SiteHeader />
      <section className="container-shell py-10 lg:py-16">
        <Suspense fallback={<div className="min-h-[600px] animate-pulse rounded-3xl bg-white/60" />}>
          <CheckoutForm />
        </Suspense>
      </section>
    </main>
  );
}
