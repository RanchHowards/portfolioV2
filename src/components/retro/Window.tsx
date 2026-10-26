/** A DOS-style dialog: double-line border, title tab cut into the top edge, hard drop shadow. */
export function Window({
  title,
  tone = "teal",
  className = "",
  children,
}: {
  title: string;
  tone?: "teal" | "blue" | "gray";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`dos-window dos-${tone} ${className}`}>
      <div className="dos-frame">
        <h2 className="dos-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

/** A chunky flat button with a hard shadow that "presses" into it. */
export function DosButton({
  href,
  primary = false,
  children,
  external = false,
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={`dos-btn ${primary ? "bg-[var(--dos-yellow)]" : "bg-white"}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
