import { siteConfig, mailtoHref } from "@/lib/site-config";

export function EmailCTA({ className = "", subject }: { className?: string; subject?: string }) {
  return (
    <a href={mailtoHref(subject)} className={`inline-flex items-center gap-2 text-sm font-medium hover:text-brand-steel ${className}`} data-gtag-event="email_click">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
      <span>{siteConfig.email}</span>
    </a>
  );
}
