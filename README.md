# Supriya Glow Care COD Sales Funnel

A production-ready Next.js App Router funnel for the LEITO Japanese Rice Water & Thai Coconut hair-care collection.

## Tech Stack

- Next.js App Router and React
- Tailwind CSS
- Zod server-side validation
- Google Sheets API with a service account
- Nodemailer with Gmail SMTP
- Vercel-compatible API route at `POST /api/order`

## Order Flow

1. The customer selects Shampoo, Hair Mask, or the discounted Duo and quantity on `/`.
2. The selection is passed to `/checkout` through query parameters.
3. Checkout sends only customer details, product ID, and quantity to `/api/order`.
4. The server validates all fields and recalculates trusted pricing from `lib/product.ts`.
5. The server appends the order to Google Sheets.
6. The server sends the business notification email, then the customer confirmation email.
7. Success is returned only after the sheet and both emails complete.
8. The browser redirects to `/thank-you` with the confirmed order summary.

If Sheets fails, no emails are sent. If Sheets succeeds but email fails, the API returns an explicit error with the saved Order ID and logs the email failure. This prevents a false success response.

## Local Setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BUSINESS_EMAIL=supriyaglowcare@gmail.com
EMAIL_FROM=supriyaglowcare@gmail.com
BRAND_NAME=Supriya Glow Care

GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=Japanese Rice Water Orders
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=supriyaglowcare@gmail.com
SMTP_PASS=

EMAIL_SERVICE_API_KEY=
FRONTEND_URL=http://localhost:3000
```

`EMAIL_SERVICE_API_KEY` is reserved for switching to an email API provider later; Gmail SMTP currently uses the SMTP variables.

## Google Spreadsheet Setup

### 1. Prepare the sheet

Use the existing spreadsheet and rename the desired tab exactly:

`Japanese Rice Water Orders`

Add these headers to row 1, columns A through M:

| Order ID | Date & Time | Customer Name | Phone Number | Email Address | Exact Location | Product Name | Quantity | Price Per Piece | Total Price | Payment Method | Order Status | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

Freeze row 1, make it bold, and apply a background color for easier scanning.

### 2. Add filters

1. Select row 1 and the columns beneath it.
2. Choose **Data > Create a filter**.
3. Use the filter controls to sort by date, status, location, or product.

### 3. Add the Order Status dropdown

1. Select column L from `L2` downward.
2. Choose **Data > Data validation > Add rule**.
3. Select **Dropdown** and add:
   - New Order
   - Order Confirmed
   - Order Ongoing
   - Delivered
   - Cancelled
4. Set the default/current first value to **New Order** where needed.

### 4. Get the Google Sheet ID

In this URL:

```text
https://docs.google.com/spreadsheets/d/SHEET_ID/edit
```

Copy the value between `/d/` and `/edit` into `GOOGLE_SHEET_ID`.

### 5. Create Google service-account credentials

1. Open Google Cloud Console and create or select a project.
2. Enable **Google Sheets API**.
3. Go to **IAM & Admin > Service Accounts** and create a service account.
4. Create a JSON key for the service account.
5. Put `client_email` into `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
6. Put `private_key` into `GOOGLE_PRIVATE_KEY`. Preserve the `\n` characters and wrap the value in quotes.

### 6. Share the spreadsheet

Open the Google Sheet, click **Share**, add the service-account email, and grant **Editor** access. The API cannot append rows until this is done.

## Gmail SMTP Setup

1. Turn on 2-Step Verification for the Gmail account.
2. Create a Google **App Password** for Mail.
3. Set `SMTP_USER` to the Gmail address.
4. Set `SMTP_PASS` to the 16-character App Password, not the normal Gmail password.
5. Use `smtp.gmail.com` and port `465`.
6. For reliable Gmail delivery, `EMAIL_FROM` should normally match `SMTP_USER`.

## Testing Order Submission

1. Confirm the spreadsheet tab, headers, service-account share, and all `.env.local` values.
2. Start the app with `npm run dev`.
3. Select a product and quantity on the landing page.
4. Submit checkout with a real email address you can inspect.
5. Verify all four success conditions:
   - A new row appears in Google Sheets.
   - `BUSINESS_EMAIL` receives the new-order email.
   - The checkout email receives the order-confirmation email.
   - The browser redirects to `/thank-you` with correct product, quantity, total, and Order ID.
6. Check spam folders during initial Gmail tests.

For validation testing, submit missing or malformed fields and confirm the API returns an error without redirecting.

## Product Content and Media

Edit product names, prices, benefits, testimonials, FAQs, and image paths in `lib/product.ts`.

Add future optimized images to `public/images`, then add entries to `productImages`. Add future videos to `public/videos` and extend the reel markup in `components/LandingPage.tsx`.

To regenerate PNG versions of the two supplied JPEGs:

```bash
npm run optimize-images
```

## Deploying to Vercel

1. Push the project to GitHub, GitLab, or Bitbucket.
2. Import the repository in Vercel.
3. Add every variable from `.env.example` in **Project Settings > Environment Variables**.
4. Set:
   - `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
   - `FRONTEND_URL=https://your-domain.com`
5. Paste `GOOGLE_PRIVATE_KEY` as the complete private key. Vercel supports multiline secret values.
6. Deploy.
7. Submit one live test order and verify the Sheet, both emails, and redirect.

Do not commit `.env.local` or any service-account JSON key.
