import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { config } = useSiteConfig();
  const location = useLocation();

  const visibleNav = config.navigation.filter((n) => n.visible);
  const mainPhone = config.contacts.phones[0];

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="max-w-[1280px] mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link to="/" className="shrink-0 whitespace-nowrap font-bold text-xl tracking-tight text-primary">
          ДробШин
        </Link>

        {/* Center: Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1 min-w-0">
          {visibleNav.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`whitespace-nowrap px-2 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-foreground/8 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right: Phone + CTA */}
        <div className="hidden xl:flex items-center gap-4 shrink-0">
          {mainPhone && (
            <a
              href={`tel:${mainPhone.number.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-muted-foreground"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              {mainPhone.number}
            </a>
          )}
          <Button asChild size="sm" className="shrink-0 whitespace-nowrap">
            <a
              href="/#request-form"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Оставить заявку
            </a>
          </Button>
        </div>

        {/* Mobile: CTA + burger */}
        <div className="xl:hidden flex items-center gap-2">
          <Button asChild size="sm" className="shrink-0 whitespace-nowrap">
            <a
              href="/#request-form"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Оставить заявку
            </a>
          </Button>
          <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t bg-card">
          <nav className="max-w-[1280px] mx-auto px-4 py-4 flex flex-col gap-1">
            {visibleNav.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-foreground/8 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t flex flex-col gap-2">
              {mainPhone && (
                <a
                  href={`tel:${mainPhone.number.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-1.5 text-sm font-medium"
                >
                  <Phone className="h-4 w-4 text-foreground/60 shrink-0" />
                  {mainPhone.number}
                </a>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
