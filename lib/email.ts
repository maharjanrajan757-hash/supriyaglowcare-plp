import nodemailer from "nodemailer";
import type { CompleteOrder } from "@/lib/order";
import { formatNpr } from "@/lib/product";

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string, strong = false) {
  return `<tr>
    <td style="padding:10px 0;color:#806c5d;font-size:14px;vertical-align:top">${label}</td>
    <td style="padding:10px 0;color:#3D2B1F;font-size:14px;text-align:right;vertical-align:top;${strong ? "font-size:18px;font-weight:700" : "font-weight:600"}">${escapeHtml(value)}</td>
  </tr>`;
}

function emailShell(brand: string, eyebrow: string, headline: string, body: string) {
  return `<!doctype html>
  <html><body style="margin:0;background:#F5ECD7;font-family:Arial,sans-serif;color:#3D2B1F">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F5ECD7;padding:24px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fff;border-radius:20px;overflow:hidden">
          <tr><td style="padding:24px 28px;background:#3D2B1F;color:#fff;text-align:center">
            <div style="color:#E8D5A3;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">${escapeHtml(brand)}</div>
          </td></tr>
          <tr><td style="padding:36px 28px 10px;text-align:center">
            <div style="color:#8B5E3C;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">${eyebrow}</div>
            <h1 style="margin:10px 0 0;font-family:Georgia,serif;font-size:32px;line-height:1.2">${headline}</h1>
          </td></tr>
          <tr><td style="padding:20px 28px 36px">${body}</td></tr>
          <tr><td style="padding:22px 28px;background:#FAF3E0;text-align:center;color:#806c5d;font-size:12px">
            ${escapeHtml(brand)} · Cash On Delivery across Nepal
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

function createTransporter() {
  const port = Number(required("SMTP_PORT"));
  if (!Number.isInteger(port) || port <= 0) throw new Error("SMTP_PORT must be a valid port number.");

  return nodemailer.createTransport({
    host: required("SMTP_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: required("SMTP_USER"),
      pass: required("SMTP_PASS"),
    },
  });
}

export async function verifyEmailConnection() {
  await createTransporter().verify();
}

export async function sendOrderEmails(order: CompleteOrder) {
  const transporter = createTransporter();
  const brand = process.env.BRAND_NAME?.trim() || "Supriya Glow Care";
  const businessEmail = process.env.BUSINESS_EMAIL?.trim() || "supriyaglowcare@gmail.com";
  const fromAddress = process.env.EMAIL_FROM?.trim() || required("SMTP_USER");

  const businessHtml = emailShell(
    brand,
    "New order received",
    "A new customer order is ready to confirm.",
    `<div style="padding:14px 18px;background:#F5ECD7;border-radius:12px;text-align:center;font-weight:700">
      Order ID: ${escapeHtml(order.orderId)}
    </div>
    <h2 style="margin:28px 0 8px;font-family:Georgia,serif;font-size:20px">Customer details</h2>
    <table role="presentation" width="100%" cellspacing="0">${row("Customer Name", order.fullName)}${row("Phone Number", order.phone)}${row("Email Address", order.email)}${row("Exact Location", order.location)}</table>
    <h2 style="margin:28px 0 8px;font-family:Georgia,serif;font-size:20px">Product details</h2>
    <table role="presentation" width="100%" cellspacing="0">${row("Product", order.productName)}${row("Quantity", String(order.quantity))}${row("Price Per Piece", formatNpr(order.pricePerPiece))}${row("Total Price", formatNpr(order.totalPrice), true)}</table>
    <h2 style="margin:28px 0 8px;font-family:Georgia,serif;font-size:20px">Payment details</h2>
    <table role="presentation" width="100%" cellspacing="0">${row("Date & Time", order.dateTime)}${row("Payment Method", order.paymentMethod)}${row("Order Status", order.orderStatus)}</table>
    <div style="margin-top:24px;padding:18px;background:#FFF6D7;border-left:4px solid #C9A84C;border-radius:8px;font-weight:700">
      Please call the customer soon to confirm this order.
    </div>`,
  );

  const customerHtml = emailShell(
    brand,
    "Order received",
    `Thank you for your order, ${escapeHtml(order.fullName)}!`,
    `<p style="margin:0 0 22px;color:#685446;font-size:16px;line-height:1.7;text-align:center">
      We have received your order successfully. Our sales representative will call you soon to confirm your order.
    </p>
    <div style="padding:14px 18px;background:#F5ECD7;border-radius:12px;text-align:center;font-weight:700">
      Order ID: ${escapeHtml(order.orderId)}
    </div>
    <table role="presentation" width="100%" cellspacing="0" style="margin-top:20px">
      ${row("Product", order.productName)}
      ${row("Quantity", String(order.quantity))}
      ${row("Total Price", formatNpr(order.totalPrice), true)}
      ${row("Payment Method", order.paymentMethod)}
    </table>
    <div style="margin-top:24px;padding:18px;background:#FAF3E0;border-radius:12px;color:#685446;font-size:14px;line-height:1.6">
      Need help? Reply to this email and our team will be happy to assist you.
    </div>
    <p style="margin:24px 0 0;color:#685446;line-height:1.6">Thank you,<br><strong>${escapeHtml(brand)}</strong></p>`,
  );

  await transporter.sendMail({
    from: `"${brand}" <${fromAddress}>`,
    to: businessEmail,
    replyTo: order.email,
    subject: `New Product Order Received - ${order.orderId}`,
    html: businessHtml,
  });
  await transporter.sendMail({
    from: `"${brand}" <${fromAddress}>`,
    to: order.email,
    replyTo: fromAddress,
    subject: `Your Order Has Been Received - ${brand}`,
    html: customerHtml,
  });
}
