import { google } from "googleapis";
import type { CompleteOrder } from "@/lib/order";

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export async function saveOrderToSheet(order: CompleteOrder) {
  const sheetId = required("GOOGLE_SHEET_ID");
  const tabName = required("GOOGLE_SHEET_TAB_NAME");
  const clientEmail = required("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = required("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `'${tabName.replace(/'/g, "''")}'!A:M`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        order.orderId,
        order.dateTime,
        order.fullName,
        order.phone,
        order.email,
        order.location,
        order.productName,
        order.quantity,
        order.pricePerPiece,
        order.totalPrice,
        order.paymentMethod,
        order.orderStatus,
        "",
      ]],
    },
  });
}
