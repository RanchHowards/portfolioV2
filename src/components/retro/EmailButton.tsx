"use client";

/**
 * A "Send Email" button whose address never appears in the page HTML or the source.
 * The address is stored Base64-encoded and only decoded when the button is clicked,
 * which keeps it away from simple scrapers that harvest name@domain patterns.
 */
export function EmailButton({ encoded, children }: { encoded: string; children: React.ReactNode }) {
  return (
    <a
      href="#contact"
      className="dos-btn bg-[var(--dos-yellow)]"
      onClick={(e) => {
        e.preventDefault();
        window.location.href = `mailto:${atob(encoded)}`;
      }}
    >
      {children}
    </a>
  );
}
