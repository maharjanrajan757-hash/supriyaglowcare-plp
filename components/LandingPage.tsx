"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight, BadgeCheck, ChevronDown, ChevronLeft, ChevronRight,
  Droplets, HeartHandshake, Leaf, Minus, PackageCheck, Plus, ShieldCheck,
  Sparkles, Star, Truck,
} from "lucide-react";
import {
  benefits, faqs, formatNpr, productImages, productVariants, testimonials, type ProductId,
} from "@/lib/product";
import { SiteHeader } from "@/components/SiteHeader";

const benefitIcons = [ShieldCheck, Leaf, Droplets, Sparkles, HeartHandshake];

export function LandingPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [productId, setProductId] = useState<ProductId>("bundle");
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const product = productVariants[productId];
  const checkoutHref = useMemo(
    () => `/checkout?product=${productId}&quantity=${quantity}`,
    [productId, quantity],
  );

  const changeImage = (direction: number) => {
    setActiveImage((current) => (current + direction + productImages.length) % productImages.length);
  };

  return (
    <main className="overflow-hidden">
      <SiteHeader />

      <section className="relative bg-[#FDF6EC] py-12 sm:py-18 lg:py-24">
        <div className="absolute -right-40 -top-40 size-96 rounded-full bg-[#E8D5A3]/40 blur-3xl" />
        <div className="container-shell relative grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow mb-5">Ancient beauty wisdom. Modern hair care.</p>
            <h1 className="font-display max-w-3xl text-5xl leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-7xl">
              Stronger roots. Silkier strands. <span className="text-[#8B5E3C]">Naturally.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#654b39]">
              Transform weak, dry, and lifeless hair with Japanese Rice Water and deeply nourishing
              Thai Coconut in a generous 1000ml salon-inspired duo.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/checkout?product=bundle&quantity=1" className="gold-button">
                Get the Duo for Rs. 2,999 <ArrowRight size={18} />
              </Link>
              <a href="#shop" className="outline-button">Explore the Collection</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#654b39]">
              <span className="flex items-center gap-2"><BadgeCheck size={18} className="text-[#8B5E3C]" /> Cash on Delivery</span>
              <span className="flex items-center gap-2"><Truck size={18} className="text-[#8B5E3C]" /> Free delivery across Nepal</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg pb-12 sm:pb-14">
            <div className="relative flex min-h-[540px] items-center justify-center overflow-hidden rounded-[32px] bg-white px-4 pb-18 pt-4 sm:min-h-[690px] sm:px-6 sm:pb-22 sm:pt-6">
              <div className="absolute inset-8 rounded-[40px] bg-[#C9A84C]/20 blur-3xl" />
              <Image
                src="/images/rice-water-hair-care-removebg-preview.png"
                alt="LEITO Rice Water hair care collection"
                width={420}
                height={594}
                priority
                className="relative h-auto w-full max-w-[420px] object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-4 right-4 rounded-2xl border hairline bg-white px-5 py-4 shadow-xl sm:left-6 sm:right-auto sm:min-w-60 sm:px-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">Bundle saving</p>
              <p className="mt-1 font-display text-2xl font-bold">Save Rs. 301</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-white py-6">
        <div className="container-shell grid grid-cols-2 gap-4 text-center text-sm font-bold sm:grid-cols-4">
          <span className="flex items-center justify-center gap-2"><Truck size={19} /> Fast Delivery</span>
          <span className="flex items-center justify-center gap-2"><PackageCheck size={19} /> Easy Ordering</span>
          <span className="flex items-center justify-center gap-2"><ShieldCheck size={19} /> Cash on Delivery</span>
          <span className="flex items-center justify-center gap-2"><HeartHandshake size={19} /> Customer Support</span>
        </div>
      </section>

      <section id="shop" className="bg-[#FAF3E0] py-18 lg:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative overflow-hidden rounded-[28px] bg-white">
              <Image
                src={productImages[activeImage].src}
                alt={productImages[activeImage].alt}
                width={900}
                height={1100}
                className="h-[480px] w-full object-contain object-center p-4 sm:h-[620px] sm:p-6"
              />
              <button onClick={() => changeImage(-1)} aria-label="Previous image" className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg">
                <ChevronLeft />
              </button>
              <button onClick={() => changeImage(1)} aria-label="Next image" className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg">
                <ChevronRight />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {productImages.map((image, index) => (
                <button key={image.src} onClick={() => setActiveImage(index)} className={`overflow-hidden rounded-2xl border-2 bg-white ${activeImage === index ? "border-[#C9A84C]" : "border-transparent"}`}>
                  <Image src={image.src} alt="" width={180} height={180} className="h-24 w-full object-contain object-center p-1.5" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:py-4">
            <p className="eyebrow">Choose your hair ritual</p>
            <h2 className="section-title mt-3">Nourishment that goes beyond the surface.</h2>
            <div className="mt-6 flex items-center gap-2 text-sm font-bold">
              <span className="flex text-[#C9A84C]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={17} fill="currentColor" />)}</span>
              Loved by women across Nepal
            </div>
            <div className="mt-7 space-y-3">
              {(Object.keys(productVariants) as ProductId[]).map((id) => {
                const item = productVariants[id];
                return (
                  <button key={id} onClick={() => setProductId(id)} className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left ${productId === id ? "border-[#C9A84C] bg-white shadow-md" : "hairline bg-white/50"}`}>
                    <span>
                      <span className="block font-bold">{item.shortName}</span>
                      <span className="mt-1 block text-sm text-[#765b47]">1000ml {id === "bundle" ? "each • Best value" : "bottle"}</span>
                    </span>
                    <span className="font-display text-xl font-bold">{formatNpr(item.price)}</span>
                  </button>
                );
              })}
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Less breakage", "Healthier-looking growth", "Deep hydration", "Smoother, shinier hair"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold"><BadgeCheck size={18} className="text-[#8B5E3C]" /> {item}</li>
              ))}
            </ul>
            <div className="mt-8 rounded-3xl bg-[#3D2B1F] p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#E8D5A3]">Your total</p>
                  <p className="font-display text-3xl font-bold">{formatNpr(product.price * quantity)}</p>
                  <p className="text-xs text-white/60">Free delivery • Cash on Delivery</p>
                </div>
                <div className="flex items-center rounded-full bg-white/10 p-1">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid size-10 place-items-center rounded-full hover:bg-white/10"><Minus size={17} /></button>
                  <span className="w-9 text-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity((q) => Math.min(20, q + 1))} aria-label="Increase quantity" className="grid size-10 place-items-center rounded-full hover:bg-white/10"><Plus size={17} /></button>
                </div>
              </div>
              <Link href={checkoutHref} className="gold-button mt-5 w-full">Purchase Now <ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#3D2B1F] py-18 text-white lg:py-24">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow !text-[#E8D5A3]">See the collection</p>
            <h2 className="section-title mt-3">A closer look at your new hair ritual.</h2>
            <p className="mt-5 text-white/65">Tap play to watch. The video never starts without you.</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-[700px] gap-8 md:grid-cols-2 md:items-start">
            <div className="mx-auto w-full max-w-[320px] rounded-[48px] border-[8px] border-black bg-black p-2 shadow-2xl">
              <div className="mx-auto mb-2 h-5 w-24 rounded-full bg-[#1a1a1a]" />
              <video controls preload="metadata" playsInline className="aspect-[9/16] w-full rounded-[34px] bg-black object-cover">
                <source src="/videos/leito-product-reel.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mx-auto w-full max-w-[320px] rounded-[48px] border-[8px] border-black bg-black p-2 shadow-2xl">
              <div className="mx-auto mb-2 h-5 w-24 rounded-full bg-[#1a1a1a]" />
              <iframe
                src="/videos/leito_reel_video.html"
                title="LEITO animated product reel"
                loading="lazy"
                sandbox="allow-scripts"
                className="aspect-[9/16] w-full rounded-[34px] border-0 bg-black"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FDF6EC] py-18 lg:py-24">
        <div className="container-shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Why your hair will love it</p>
            <h2 className="section-title mt-3">Two treasured ingredients. One complete transformation.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <article key={benefit.title} className="soft-card p-6">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#F5ECD7] text-[#8B5E3C]"><Icon /></span>
                  <h3 className="font-display mt-5 text-2xl font-bold">{benefit.title}</h3>
                  <p className="mt-3 leading-7 text-[#765b47]">{benefit.description}</p>
                </article>
              );
            })}
            <article className="rounded-3xl bg-[#C9A84C] p-6">
              <h3 className="font-display text-3xl font-bold">Ready for your best hair days?</h3>
              <p className="mt-3 leading-7">Get the complete duo and save Rs. 301 today.</p>
              <Link href="/checkout?product=bundle&quantity=1" className="mt-6 inline-flex items-center gap-2 font-bold underline underline-offset-4">Buy Now <ArrowRight size={18} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#F5ECD7] py-18 lg:py-24">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Real stories</p>
            <h2 className="section-title mt-3">Hair confidence, rediscovered.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="soft-card p-6">
                <div className="flex text-[#C9A84C]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                <blockquote className="mt-5 font-display text-xl leading-8">“{item.quote}”</blockquote>
                <figcaption className="mt-6 border-t hairline pt-4">
                  <span className="block font-bold">{item.name}</span>
                  <span className="text-sm text-[#765b47]">{item.meta}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF3E0] py-18 lg:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Frequently asked</p>
            <h2 className="section-title mt-3">Everything you need to know.</h2>
            <p className="mt-5 max-w-md leading-7 text-[#765b47]">Still unsure? Place your order and our representative will call to confirm every detail before dispatch.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="overflow-hidden rounded-2xl border hairline bg-white">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold">
                  {faq.question}
                  <ChevronDown className={`shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} size={20} />
                </button>
                {openFaq === index && <p className="border-t hairline px-5 py-5 leading-7 text-[#765b47]">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#8B5E3C] py-16 text-white">
        <div className="container-shell text-center">
          <p className="eyebrow !text-[#E8D5A3]">Beautiful hair starts here</p>
          <h2 className="font-display mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Bring home the complete LEITO hair care ritual for Rs. 2,999.</h2>
          <p className="mt-5 text-white/75">Free delivery and Cash on Delivery available across Nepal.</p>
          <Link href="/checkout?product=bundle&quantity=1" className="gold-button mt-8">Order the Duo Now <ArrowRight size={18} /></Link>
        </div>
      </section>

      <footer className="bg-[#2b1e16] py-8 text-center text-sm text-white/60">
        <p>© {new Date().getFullYear()} Supriya Glow Care. All rights reserved.</p>
      </footer>
    </main>
  );
}
