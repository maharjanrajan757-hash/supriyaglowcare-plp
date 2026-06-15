import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { completeOrder, orderSchema } from "@/lib/order";
import { saveOrderToSheet } from "@/lib/google-sheets";
import { sendOrderEmails, verifyEmailConnection } from "@/lib/email";
import { getMissingOrderConfiguration } from "@/lib/order-config";

export const runtime = "nodejs";

function isAllowedOrigin(request: NextRequest) {
  const allowed = process.env.FRONTEND_URL?.trim();
  const origin = request.headers.get("origin");
  if (!allowed || !origin) return true;

  try {
    return new URL(origin).origin === new URL(allowed).origin;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ success: false, error: "This request origin is not allowed." }, { status: 403 });
  }

  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ success: false, error: "Content-Type must be application/json." }, { status: 415 });
    }

    const parsed = orderSchema.parse(await request.json());
    const missingConfiguration = getMissingOrderConfiguration();

    if (missingConfiguration.length > 0) {
      console.error("Order service is not configured. Missing:", missingConfiguration.join(", "));
      return NextResponse.json(
        {
          success: false,
          code: "ORDER_SERVICE_UNAVAILABLE",
          error: "Online ordering is temporarily unavailable. Please contact Supriya Glow Care to place your order.",
        },
        { status: 503 },
      );
    }

    const order = completeOrder(parsed);

    try {
      await verifyEmailConnection();
    } catch (emailError) {
      console.error("Email service authentication failed:", emailError);
      return NextResponse.json(
        {
          success: false,
          error: "We could not connect to the order notification service. Please try again shortly.",
        },
        { status: 503 },
      );
    }

    await saveOrderToSheet(order);

    try {
      await sendOrderEmails(order);
    } catch (emailError) {
      console.error("Order saved, but email delivery failed:", emailError);
      return NextResponse.json(
        {
          success: false,
          error: "Your order was saved, but we could not send the confirmation emails. Please contact support before submitting again.",
          orderId: order.orderId,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        orderId: order.orderId,
        productName: order.productName,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        paymentMethod: order.paymentMethod,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message || "Please check your order details." },
        { status: 400 },
      );
    }

    console.error("Order submission failed:", error);
    return NextResponse.json(
      { success: false, error: "We could not submit your order right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
