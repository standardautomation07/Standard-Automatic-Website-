"use client";

import { useActionState, useEffect } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { trackEvent } from "@/lib/analytics";

const initialState: EnquiryState = { status: "idle" };

export function EnquiryForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  useEffect(() => {
    if (state.status === "success") {
      trackEvent("enquiry_submit", { product_interest: defaultProduct || undefined });
    }
  }, [state.status, defaultProduct]);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-sm border border-state-success/30 bg-state-success/10 p-6 text-sm">
        <p className="font-semibold text-state-success">Thank you — your enquiry has been received.</p>
        <p className="mt-1 text-ink-muted">Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {/* Honeypot - hidden from real users via CSS, not `type="hidden"`, so
          basic bots that ignore CSS still fill it in. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Company" name="companyName" autoComplete="organization" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
        <Field label="City" name="city" autoComplete="address-level2" />
        <Field label="Product / Interest" name="productInterest" defaultValue={defaultProduct} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message <span className="text-brand-signal">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-sm border border-border bg-surface-raised px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-brand-steel"
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-state-error">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-sm bg-brand-signal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-signal-dark disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label} {required && <span className="text-brand-signal">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="w-full rounded-sm border border-border bg-surface-raised px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-brand-steel"
      />
    </div>
  );
}
