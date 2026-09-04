"use server";

import { deliverEnquiry, validate, type EnquiryInput, type EnquiryResult } from "@/lib/enquiry";

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitEnquiry(
  _previous: EnquiryResult,
  formData: FormData,
): Promise<EnquiryResult> {
  // Simple honeypot. Real visitors never see or fill this field.
  if (readField(formData, "website")) {
    return { status: "recorded" };
  }

  const input: EnquiryInput = {
    name: readField(formData, "name"),
    company: readField(formData, "company"),
    phone: readField(formData, "phone"),
    email: readField(formData, "email"),
    product: readField(formData, "product"),
    width: readField(formData, "width"),
    height: readField(formData, "height"),
    application: readField(formData, "application"),
    location: readField(formData, "location"),
    usage: readField(formData, "usage"),
    message: readField(formData, "message"),
  };

  const errors = validate(input);
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values: input };
  }

  try {
    const outcome = await deliverEnquiry(input);
    return { status: outcome };
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return {
      status: "error",
      errors: {
        message:
          "We could not submit that just now. Please call or WhatsApp us and we will pick it up straight away.",
      },
      values: input,
    };
  }
}
