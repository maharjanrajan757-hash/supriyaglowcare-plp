import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b hairline bg-[#FDF6EC]/90 backdrop-blur">
      <div className="container-shell flex min-h-32 items-center justify-between gap-3 sm:min-h-34">
        <Link href="/" aria-label="Supriya Glow Care home" className="shrink-0">
          <Image
            src="/images/Logo-removebg-preview.png"
            alt="Supriya Glow Care"
            width={500}
            height={500}
            priority
            className="h-28 w-36 object-contain sm:w-40"
          />
        </Link>
        <Link href="/checkout?product=bundle&quantity=1" className="gold-button !min-h-11 !px-4 !text-sm sm:!px-5">
          <ShoppingBag size={17} /> Order Now
        </Link>
      </div>
    </header>
  );
}
