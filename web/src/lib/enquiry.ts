import { familyById, products } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";

/**
 * Engineering enquiry. The extra technical fields are not decoration: clear
 * width, clear height, application, location and usage are the five inputs
 * that decide almost every specification in this catalogue, so asking for
 * them up front turns a quotation into a short conversation.
 */
export interface EnquiryInput {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  width: string;
  height: string;
  application: string;
  location: string;
  city: string;
  quantity: string;
  projectStage: string;
  usage: string;
  /** Which configuration of the product, where the product has variants. */
  variant: string;
  /** Manual, gear, motorised or smart — asked because it changes the price. */
  operation: string;
  message: string;
  /** Path the enquiry was sent from, so sales can see the context. */
  sourcePage: string;
}

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export interface EnquiryResult {
  status: "idle" | "error" | "sent" | "recorded";
  errors?: FieldErrors;
  /** Echoed back so the form can repopulate after a failed submit. */
  values?: Partial<EnquiryInput>;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Indian mobile/landline entry, tolerant of +91, spaces, dashes and brackets. */
const PHONE_DIGITS = /^\d{10,13}$/;

export function validate(input: EnquiryInput): FieldErrors {
  const errors: FieldErrors = {};

  if (input.name.trim().length < 2) errors.name = "Please enter your name.";
  if (input.message.trim().length < 10)
    errors.message = "Please tell us a little about the opening (at least 10 characters).";

  const digits = input.phone.replace(/\D/g, "");
  if (!digits) errors.phone = "Please enter a phone number we can reach you on.";
  else if (!PHONE_DIGITS.test(digits)) errors.phone = "That does not look like a valid phone number.";

  if (input.email.trim() && !EMAIL.test(input.email.trim()))
    errors.email = "That does not look like a valid email address.";

  if (input.product && input.product !== "general" && !products.some((p) => p.id === input.product))
    errors.product = "Please choose a product from the list.";

  return errors;
}

/* ------------------------------------------------------------------ *
 * Composition
 * ------------------------------------------------------------------ */

const USAGE_LABELS: Record<string, string> = {
  light: "Light — a few cycles a day",
  medium: "Medium — tens of cycles a day",
  heavy: "Heavy — hundreds of cycles a day",
  continuous: "Continuous — in use through the shift",
};

/** The product and family the enquiry is about, resolved from the catalogue. */
function subjectOf(input: EnquiryInput) {
  const product = products.find((p) => p.id === input.product);
  if (!product) return { product: "General enquiry", family: "" };
  return { product: product.name, family: familyById[product.familyId]?.name ?? "" };
}

function stamp() {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => ENTITIES[c]);

/**
 * The enquiry as an email. Only fields the visitor actually filled in are
 * listed, so a short enquiry reads as a short email rather than a wall of
 * empty labels. Exported so it can be exercised without sending anything.
 */
export function composeEnquiry(input: EnquiryInput) {
  const { product, family } = subjectOf(input);

  const rows = (
    [
      ["Name", input.name],
      ["Company", input.company],
      ["Phone", input.phone],
      ["Email", input.email],
      ["Product", product],
      ["Product family", family],
      ["Variant", input.variant],
      ["Operation", input.operation],
      ["Clear width", input.width],
      ["Clear height", input.height],
      ["Quantity", input.quantity],
      ["Application", input.application],
      ["Site location", input.location],
      ["City", input.city],
      ["Usage", USAGE_LABELS[input.usage] ?? input.usage],
      ["Project stage", input.projectStage],
    ] as [string, string][]
  ).filter(([, value]) => value.trim().length > 0);

  const context: [string, string][] = [
    ["Source page", input.sourcePage ? `${siteConfig.url}${input.sourcePage}` : siteConfig.url],
    ["Received", `${stamp()} IST`],
  ];

  const subject = `[Website Enquiry] Request for Quote — ${product}`;

  const text = [
    `Request for Quote — ${product}`,
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Requirements:",
    input.message,
    "",
    ...context.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const row = (label: string, value: string) =>
    `<tr><th align="left" style="padding:6px 16px 6px 0;color:#566169;font:500 12px/1.5 ui-monospace,monospace;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top">${escapeHtml(
      label,
    )}</th><td style="padding:6px 0;color:#1b2126;font:400 15px/1.5 system-ui,sans-serif">${escapeHtml(
      value,
    )}</td></tr>`;

  const html = [
    `<div style="max-width:640px;margin:0 auto;padding:24px;background:#ffffff">`,
    `<p style="margin:0 0 4px;color:#2563EB;font:500 12px/1.5 ui-monospace,monospace;text-transform:uppercase;letter-spacing:.12em">Website enquiry</p>`,
    `<h1 style="margin:0 0 20px;color:#1b2126;font:600 22px/1.3 system-ui,sans-serif">Request for Quote — ${escapeHtml(
      product,
    )}</h1>`,
    `<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${rows
      .map(([l, v]) => row(l, v))
      .join("")}</table>`,
    `<h2 style="margin:24px 0 8px;color:#566169;font:500 12px/1.5 ui-monospace,monospace;text-transform:uppercase;letter-spacing:.08em">Requirements</h2>`,
    `<p style="margin:0;padding:12px 16px;background:#f4f3f0;border-left:2px solid #2563EB;color:#1b2126;font:400 15px/1.6 system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(
      input.message,
    )}</p>`,
    `<table cellpadding="0" cellspacing="0" style="width:100%;margin-top:24px;border-top:1px solid #ddd9d2;border-collapse:collapse">${context
      .map(([l, v]) => row(l, v))
      .join("")}</table>`,
    `</div>`,
  ].join("");

  return { subject, text, html, product, family };
}

/* ------------------------------------------------------------------ *
 * Delivery
 * ------------------------------------------------------------------ */

/**
 * Delivery boundary.
 *
 * With `ENQUIRY_PROVIDER` set the enquiry is emailed to the sales mailbox and
 * the UI reports it as *sent*. With nothing configured it is written to the
 * server log and reported as *recorded*, not *sent* — the form says so
 * plainly and points the visitor at phone and WhatsApp, which do work. An
 * enquiry is never silently dropped: a provider that fails throws, and the
 * form shows those same fallback routes rather than a false confirmation.
 */
export async function deliverEnquiry(input: EnquiryInput): Promise<"sent" | "recorded"> {
  const provider = process.env.ENQUIRY_PROVIDER;

  if (!provider) {
    console.info(
      "[enquiry] No ENQUIRY_PROVIDER configured — enquiry recorded to log only:",
      JSON.stringify({ receivedAt: new Date().toISOString(), ...input }),
    );
    return "recorded";
  }

  await sendViaProvider(input, provider);
  return "sent";
}

/**
 * Sent through Zoho's own SMTP, authenticated as the company mailbox.
 *
 * That is the whole point of routing it this way rather than through a
 * third-party sender: the message leaves Zoho's servers, so it is signed
 * with the domain's DKIM key and comes from an IP that the domain's SPF
 * record already authorises. SPF, DKIM and DMARC all align, which is what
 * keeps an automated enquiry out of the junk folder.
 *
 * The visitor's address goes in Reply-To, never in From — putting a
 * stranger's domain in From is precisely what breaks authentication and
 * gets the mail filtered. Hitting reply still answers the customer.
 */
async function sendViaProvider(input: EnquiryInput, provider: string): Promise<void> {
  if (provider !== "smtp") {
    throw new Error(`ENQUIRY_PROVIDER is set to "${provider}", which has no delivery integration.`);
  }

  const host = process.env.SMTP_HOST ?? "smtp.zoho.in";
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!user || !pass) {
    throw new Error("ENQUIRY_PROVIDER is smtp but SMTP_USER or SMTP_PASSWORD is not set.");
  }

  const to = process.env.ENQUIRY_TO ?? siteConfig.email;
  const from = process.env.ENQUIRY_FROM ?? `${siteConfig.shortName} Website <${user}>`;
  const { subject, text, html } = composeEnquiry(input);

  // Imported here rather than at module scope so the dependency is only
  // pulled in when delivery is actually configured.
  const { createTransport } = await import("nodemailer");
  const transport = createTransport({
    host,
    port,
    // 465 is implicit TLS; anything else (587) starts plain and upgrades.
    secure: port === 465,
    auth: { user, pass },
  });

  await transport.sendMail({
    from,
    to,
    subject,
    text,
    html,
    ...(input.email.trim() ? { replyTo: input.email.trim() } : {}),
  });
}
