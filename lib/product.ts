export const BRAND_NAME = "Supriya Glow Care";

export const productVariants = {
  shampoo: {
    id: "shampoo",
    name: "LEITO Japanese Rice Water & Thai Coconut Hair Shampoo",
    shortName: "Rice Water Shampoo",
    price: 1650,
  },
  mask: {
    id: "mask",
    name: "LEITO Japanese Rice Water & Thai Coconut Hair Mask",
    shortName: "Rice Water Hair Mask",
    price: 1650,
  },
  bundle: {
    id: "bundle",
    name: "LEITO Rice Water Shampoo + Hair Mask Bundle",
    shortName: "Complete Hair Care Duo",
    price: 2999,
  },
} as const;

export type ProductId = keyof typeof productVariants;

export const productImages = [
  { src: "/images/rice-water-hair-care-removebg-preview.png", alt: "LEITO Rice Water Shampoo and Hair Mask duo" },
  { src: "/images/Final Rice water shampoo.jpeg", alt: "LEITO Japanese Rice Water and Thai Coconut Shampoo" },
  { src: "/images/Final Rice water Hair mask11.jpeg", alt: "LEITO Japanese Rice Water and Thai Coconut Hair Mask" },
];

export const benefits = [
  {
    title: "Strengthens & Repairs",
    description: "Rice Water protein helps reduce breakage and supports stronger-looking hair from root to tip.",
  },
  {
    title: "Promotes Hair Growth",
    description: "Nourishes the scalp and supports the ideal environment for healthier, fuller-looking hair.",
  },
  {
    title: "Deep Scalp Hydration",
    description: "Thai Coconut deeply moisturizes dry hair and scalp to help prevent dryness and flaking.",
  },
  {
    title: "Silky Shine & Smoothness",
    description: "Helps tame frizz and leaves hair visibly softer, smoother, and brilliantly shiny.",
  },
  {
    title: "Gentle Daily Nourishment",
    description: "A gentle, naturally inspired formula suitable for regular use across all hair types.",
  },
];

export const testimonials = [
  {
    quote: "After just three washes, the breakage had reduced noticeably. By the end of the first month, my hair felt thicker, stronger, and so much more alive.",
    name: "Sujata Thapa",
    meta: "Kathmandu",
  },
  {
    quote: "After leaving the mask on and rinsing, the smoothness was unreal. No more frizz or rough texture, just soft, shiny, beautiful hair.",
    name: "Rojina Shrestha",
    meta: "Pokhara",
  },
  {
    quote: "Within two weeks the itchiness had reduced dramatically, and within a month my scalp felt balanced and my hair looked fuller and healthier.",
    name: "Kalpana Rai",
    meta: "Biratnagar",
  },
];

export const faqs = [
  {
    question: "What makes LEITO different from regular shampoo and hair masks?",
    answer: "LEITO combines Japanese Rice Water with Thai Coconut to cleanse, nourish, hydrate, and smooth the hair. It is designed as a complete hair-care routine rather than surface cleansing alone.",
  },
  {
    question: "Is it suitable for all hair types and color-treated hair?",
    answer: "Yes. It is suitable for straight, wavy, curly, fine, thick, dry, damaged, colored, and chemically treated hair. If you have a known ingredient allergy, perform a patch test first.",
  },
  {
    question: "How often should I use the shampoo and hair mask?",
    answer: "Use the shampoo 2–4 times weekly depending on your scalp and hair condition. Use the mask once weekly for maintenance or 2–3 times weekly for dry or damaged hair, leaving it on for 5–20 minutes.",
  },
  {
    question: "How long will a 1000ml bottle last?",
    answer: "Usage varies by hair length and frequency, but most customers can expect approximately 1.5–4 months from each generous 1000ml bottle.",
  },
  {
    question: "When will I start seeing results?",
    answer: "Hair may feel softer after the first wash. With consistent use, customers commonly notice improved smoothness and manageability over several washes, with stronger-looking hair over time.",
  },
  {
    question: "Can I order one product instead of the bundle?",
    answer: "Yes. The shampoo and mask are Rs. 1,650 each. For the complete routine, order both together at the special bundle price of Rs. 2,999.",
  },
  {
    question: "Do you offer Cash on Delivery across Nepal?",
    answer: "Yes. Cash on Delivery is available across Nepal with free delivery. Our representative will call after your order is placed to confirm the details.",
  },
];

export function formatNpr(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}
