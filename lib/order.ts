import { z } from "zod";
import { productVariants, type ProductId } from "@/lib/product";

export const orderSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(20),
  email: z.email("Please enter a valid email address."),
  location: z.string().trim().min(5, "Please share your exact location.").max(300),
  productId: z.enum(["shampoo", "mask", "bundle"]),
  quantity: z.coerce.number().int().min(1).max(20),
});

export type OrderInput = z.infer<typeof orderSchema>;

export type CompleteOrder = OrderInput & {
  orderId: string;
  dateTime: string;
  productName: string;
  pricePerPiece: number;
  totalPrice: number;
  paymentMethod: "Cash On Delivery";
  orderStatus: "New Order";
};

export function completeOrder(input: OrderInput): CompleteOrder {
  const product = productVariants[input.productId as ProductId];
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase();

  return {
    ...input,
    orderId: `SGC-${Date.now().toString().slice(-8)}-${suffix}`,
    dateTime: new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kathmandu",
    }).format(new Date()),
    productName: product.name,
    pricePerPiece: product.price,
    totalPrice: product.price * input.quantity,
    paymentMethod: "Cash On Delivery",
    orderStatus: "New Order",
  };
}
