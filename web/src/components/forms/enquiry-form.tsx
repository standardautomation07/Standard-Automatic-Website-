"use client";

import { useActionState, useId } from "react";
import { useSearchParams } from "next/navigation";
import { submitEnquiry } from "@/app/actions";
import type { EnquiryResult } from "@/lib/enquiry";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";
import type { Category, Product } from "@/lib/types";

const initialState: EnquiryResult = { status: "idle" };

interface EnquiryFormProps {
  products: Pick<Product, "slug" | "name" | "category">[];
  categories: Pick<Category, "slug" | "name">[];
}

export function EnquiryForm({ products, categories }: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const searchParams = useSearchParams();
  const preselected = searchParams.get("product") ?? "general";
  const formId = useId();

  if (state.status === "sent" || state.status === "recorded") {
    return (
      <div className="border border-line bg-paper-raised p-8">
        <h2 className="font-display text-2xl text-steel-900">Thank you — we have your enquiry.</h2>
        {state.status === "sent" ? (
          <p className="mt-4 text-base leading-relaxed text-steel-700">
            Our team will be in touch shortly. If it is urgent, call or WhatsApp us on{" "}
            {siteConfig.phone}.
          </p>
        ) : (
          <div className="mt-4 space-y-4 text-base leading-relaxed text-steel-700">
            <p>
              Your enquiry has been recorded on our server. Email delivery for this form is not
              connected yet, so the fastest route to a reply right now is phone or WhatsApp:
            </p>
            <p className="flex flex-wrap gap-3">
              <a
                href={telHref()}
                className="inline-flex min-h-11 items-center rounded-edge bg-amber px-5 text-sm font-semibold text-ink"
              >
                Call {siteConfig.phone}
              </a>
              <a
                href={whatsappHref("Hello Standard Automation, I have just submitted an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-edge border border-steel-900/25 px-5 text-sm font-medium text-steel-900"
              >
                WhatsApp us
              </a>
            </p>
          </div>
        )}
      </div>
    );
  }

  const errors = state.errors ?? {};
  const values = state.values ?? {};

  return (
    <form action={formAction} noValidate className="space-y-6">
      {/* Honeypot — visually and programmatically hidden from real users. */}
      <div hidden aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          name="name"
          label="Name"
          required
          autoComplete="name"
          defaultValue={values.name}
          error={errors.name}
        />
        <Field
          id={`${formId}-company`}
          name="company"
          label="Company"
          autoComplete="organization"
          defaultValue={values.company}
          error={errors.company}
        />
        <Field
          id={`${formId}-phone`}
          name="phone"
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
          defaultValue={values.phone}
          error={errors.phone}
        />
        <Field
          id={`${formId}-email`}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          defaultValue={values.email}
          error={errors.email}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-product`} className="eyebrow block text-steel-500">
          Product or solution
        </label>
        <select
          id={`${formId}-product`}
          name="product"
          defaultValue={preselected}
          className="mt-3 h-12 w-full rounded-edge border border-line bg-paper-raised px-4 text-sm text-steel-900 focus-visible:border-steel-900 focus-visible:outline-none"
        >
          <option value="general">General enquiry</option>
          {categories.map((category) => (
            <optgroup key={category.slug} label={category.name}>
              {products
                .filter((product) => product.category === category.slug)
                .map((product) => (
                  <option key={product.slug} value={product.slug}>
                    {product.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      <Field
        id={`${formId}-message`}
        name="message"
        label="Message"
        required
        multiline
        placeholder="Opening width and height, daily traffic, site location, and anything else that matters."
        defaultValue={values.message}
        error={errors.message}
      />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-13 w-full items-center justify-center rounded-edge bg-amber px-7 font-semibold text-ink transition-colors hover:bg-[#ff9426] disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>

      <p className="text-xs leading-relaxed text-steel-500">
        We use your details only to respond to this enquiry.
      </p>
    </form>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  multiline,
  placeholder,
  autoComplete,
  defaultValue,
  error,
}: FieldProps) {
  const errorId = `${id}-error`;
  const shared =
    "mt-3 w-full rounded-edge border bg-paper-raised px-4 text-sm text-steel-900 placeholder:text-steel-400 focus-visible:outline-none " +
    (error ? "border-red-600 focus-visible:border-red-700" : "border-line focus-visible:border-steel-900");

  return (
    <div className={multiline ? "" : undefined}>
      <label htmlFor={id} className="eyebrow block text-steel-500">
        {label}
        {required && <span className="ml-1 text-amber-deep">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${shared} py-3 leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${shared} h-12`}
        />
      )}
      {error && (
        <p id={errorId} className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
