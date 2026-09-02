"use server";

import { siteConfig } from "@/lib/site-config";

export interface EnquiryState {
  status: "idle" | "success" | "error";
  message?: string;
}

/**
 * Replaces the old site's two separate, undocumented PHP handlers
 * (txl_lib/txlsendemail.php, kxi_lib/kxisendemail.php - research/ux-audit.md §4)
 * with one typed, testable path. The actual email provider is intentionally
 * not wired to a specific vendor here - set ENQUIRY_WEBHOOK_URL in the
 * environment to point at whichever transactional email API is chosen
 * (Resend, Postmark, etc. - see planning/OPEN-BUSINESS-DECISIONS.md item 11).
 * No provider credentials are ever referenced from client code.
 */
export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  // Honeypot: a field real users never see or fill in. Bots that fill every
  // field in a scraped form will trip this. See
  // planning/COMPONENT-ARCHITECTURE.md §4.
  if (formData.get("company_website")) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const productInterest = String(formData.get("productInterest") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email, and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const payload = {
    to: siteConfig.email,
    subject: productInterest
      ? `Website enquiry: ${productInterest}`
      : "Website enquiry",
    name,
    email,
    phone,
    companyName,
    city,
    productInterest,
    message,
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("Enquiry webhook delivery failed", err);
      return {
        status: "error",
        message: "We couldn't send your enquiry right now. Please call or WhatsApp us instead.",
      };
    }
  } else {
    // No email provider configured yet - log so the flow is verifiable in
    // development without blocking on that decision. Do not treat this as a
    // silent failure in production; ENQUIRY_WEBHOOK_URL must be set before launch.
    console.warn(
      "ENQUIRY_WEBHOOK_URL is not set - enquiry captured but not delivered:",
      payload
    );
  }

  return { status: "success" };
}
