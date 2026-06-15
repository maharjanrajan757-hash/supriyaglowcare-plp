import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEITO Rice Water Hair Care | Supriya Glow Care",
  description: "Japanese Rice Water and Thai Coconut Shampoo & Hair Mask. Cash on Delivery across Nepal.",
  icons: {
    icon: [{ url: "/images/Fav_Icon-removebg-preview.png", type: "image/png" }],
    shortcut: "/images/Fav_Icon-removebg-preview.png",
    apple: "/images/Fav_Icon-removebg-preview.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
