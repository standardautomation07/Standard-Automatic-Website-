"use client";

import { useActionState, useId } from "react";
import { useSearchParams } from "next/navigation";
import { submitEnquiry } from "@/app/actions";
import type { EnquiryResult } from "@/lib/enquiry";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";

const initialState: EnquiryResult = { status: "idle" };

interface FormProduct {
  id: string;
  name: string;
  familyId: string;
}

interface FormFamily {
  id: string;
  name: string;
}

export function EnquiryForm({
  products,
  families,
  presetProductId,
}: {
  products: FormProduct[];
  families: FormFamily[];
  /** Set on a product page so the form arrives already scoped to it. */
  presetProductId?: string;
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const searchParams = useSearchParams();
  const preselected = presetProductId ?? searchParams.get("product") ?? "general";
  const formId = useId();

  if (state.status === "sent" || state.status === "recorded") {
    return (
      <div className="border border-line bg-paper-raised p-8">
        <h2 className="font-display text-2xl text-steel-900">Thank you — we have your enquiry.</h2>
        {state.status === "sent" ? (
          <p className="mt-4 text-base leading-relaxed text-steel-700">
            Our engineering team will be in touch shortly. If it is urgent, call or WhatsApp us on{" "}
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
    <form action={formAction} noValidate className="space-y-10">
      {/* Honeypot — visually and programmatically hidden from real users. */}
      <div hidden aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend className="eyebrow text-amber-deep">01 — Who you are</legend>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field id={`${formId}-name`} name="name" label="Name" required autoComplete="name" defaultValue={values.name} error={errors.name} />
          <Field id={`${formId}-company`} name="company" label="Company" autoComplete="organization" defaultValue={values.company} error={errors.company} />
          <Field id={`${formId}-phone`} name="phone" label="Phone" type="tel" required autoComplete="tel" defaultValue={values.phone} error={errors.phone} />
          <Field id={`${formId}-email`} name="email" label="Email" type="email" autoComplete="email" defaultValue={values.email} error={errors.email} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow text-amber-deep">02 — The opening</legend>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-steel-600">
          These five answers decide most of the specification. Approximate is fine — we would rather
          start from a rough number than from nothing.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field id={`${formId}-width`} name="width" label="Clear width" placeholder="e.g. 4200 mm" defaultValue={values.width} error={errors.width} />
          <Field id={`${formId}-height`} name="height" label="Clear height" placeholder="e.g. 4000 mm" defaultValue={values.height} error={errors.height} />
          <Field id={`${formId}-application`} name="application" label="Application" placeholder="e.g. warehouse dispatch bay" defaultValue={values.application} error={errors.application} />
          <Field id={`${formId}-location`} name="location" label="Site location" placeholder="e.g. Chakan industrial area" defaultValue={values.location} error={errors.location} />
          <Field id={`${formId}-city`} name="city" label="City" placeholder="e.g. Pune" defaultValue={values.city} error={errors.city} />
          <Field id={`${formId}-quantity`} name="quantity" label="Quantity" placeholder="e.g. 3 openings" defaultValue={values.quantity} error={errors.quantity} />
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-usage`} className="eyebrow block text-steel-500">
              Usage
            </label>
            <select
              id={`${formId}-usage`}
              name="usage"
              defaultValue={values.usage ?? ""}
              className="mt-3 h-12 w-full rounded-edge border border-line bg-paper-raised px-4 text-sm text-steel-900 focus-visible:border-steel-900 focus-visible:outline-none"
            >
              <option value="">Not sure yet</option>
              <option value="light">Light — a few cycles a day</option>
              <option value="medium">Medium — tens of cycles a day</option>
              <option value="heavy">Heavy — hundreds of cycles a day</option>
              <option value="continuous">Continuous — in use through the shift</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-projectStage`} className="eyebrow block text-steel-500">
              Project stage
            </label>
            <select
              id={`${formId}-projectStage`}
              name="projectStage"
              defaultValue={values.projectStage ?? ""}
              className="mt-3 h-12 w-full rounded-edge border border-line bg-paper-raised px-4 text-sm text-steel-900 focus-visible:border-steel-900 focus-visible:outline-none"
            >
              <option value="">Not sure yet</option>
              <option value="budgeting">Budgeting or early enquiry</option>
              <option value="design">Design or tender stage</option>
              <option value="ready">Ready to order</option>
              <option value="replacement">Replacing something that has failed</option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow text-amber-deep">03 — What you need</legend>
        <div className="mt-6 space-y-6">
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
              <option value="general">Not sure — please advise</option>
              {families.map((family) => (
                <optgroup key={family.id} label={family.name}>
                  {products
                    .filter((product) => product.familyId === family.id)
                    .map((product) => (
                      <option key={product.id} value={product.id}>
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
            placeholder="Anything else that matters — site constraints, headroom, what the opening has to separate, timescale."
            defaultValue={values.message}
            error={errors.message}
          />
        </div>
      </fieldset>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-13 w-full items-center justify-center rounded-edge bg-amber px-7 font-semibold text-ink transition-colors hover:bg-[#ff9426] disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Sending…" : "Send enquiry"}
        </button>
        <p className="mt-4 text-xs leading-relaxed text-steel-500">
          We use your details only to respond to this enquiry.
        </p>
      </div>
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
    <div>
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
