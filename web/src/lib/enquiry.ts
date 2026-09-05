import { products } from "@/lib/catalog";

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

/**
 * Delivery boundary.
 *
 * No email provider is connected yet. Rather than pretend a message was
 * emailed, this records the enquiry in the server log and reports back that
 * it was *recorded*, not *sent* — the UI says so plainly and points the
 * visitor at the phone and WhatsApp routes, which do work.
 *
 * To switch delivery on, implement `sendViaProvider` against whichever
 * provider the business chooses and set ENQUIRY_PROVIDER in the environment.
 * Nothing else in the app needs to change.
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

async function sendViaProvider(_input: EnquiryInput, provider: string): Promise<void> {
  // Intentionally unimplemented. Wire this to the chosen provider when the
  // business has picked one; throwing here is better than silently dropping
  // an enquiry the UI has already told the visitor was sent.
  throw new Error(
    `ENQUIRY_PROVIDER is set to "${provider}" but no delivery integration is implemented yet.`,
  );
}
