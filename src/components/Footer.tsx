export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <a href="#top" className="flex items-center leading-none">
            <img
              src="https://vibe.filesafe.space/1786158431853345748/attachments/ec3d173a-18d7-47d2-b1f6-9cc11eced203.png"
              alt="Laurence GHL — Funnels · CRM · Automations"
              className="h-9 w-auto object-contain"
            />
          </a>
          <nav className="flex items-center gap-6">
            <a
              href="#work"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Work
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </nav>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Laurence GHL · GoHighLevel Funnel &
            Automation Specialist
          </p>
        </div>
      </div>
    </footer>
  );
};
