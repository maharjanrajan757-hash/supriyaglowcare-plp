import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { ThankYouContent } from "@/components/ThankYouContent";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      <SiteHeader />
      <section className="container-shell py-16 sm:py-24">
        <Suspense fallback={<div className="mx-auto h-96 max-w-2xl animate-pulse rounded-3xl bg-white/60" />}>
          <ThankYouContent />
        </Suspense>
      </section>
    </main>
  );
}
