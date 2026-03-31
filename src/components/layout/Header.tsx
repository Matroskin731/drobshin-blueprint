import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { config } = useSiteConfig();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const shortLabels: Record<string, string> = {
    "Утилизация РТИ": "Утилизация",
    "Сопутствующие товары": "Товары",
    "Применение продукции": "Применение",
  };
  const visibleNav = config.navigation.filter((n) => n.visible);

  const handleRequestClick = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-card/95 backdrop-blur-xl border-b border-border shadow-sm'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-[1280px] mx-auto px-5 flex h-16 items-center">
        {/* Left: Logo */}
        <div className="shrink-0">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="ДробШин — утилизация и переработка"
              className={`h-10 w-auto transition-all duration-300 object-contain ${
                scrolled ? 'brightness-100' : 'brightness-0 invert'
              }`}
              style={{ mixBlendMode: scrolled ? 'normal' : 'screen' }}
            />
          </Link>
        </div>

        {/* Center: Nav */}
        <nav className="hidden xl:flex flex-1 items-center justify-center gap-0.5 min-w-0 overflow-hidden">
          {visibleNav.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`relative whitespace-nowrap px-2 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ease-out after:absolute after:bottom-1 after:left-2 after:right-2 after:h-[1.5px] after:origin-left after:transition-transform after:duration-200 after:ease-out ${
                scrolled
                  ? `after:bg-foreground ${location.pathname === item.path ? 'text-foreground after:scale-x-100' : 'text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100'}`
                  : `after:bg-white ${location.pathname === item.path ? 'text-white after:scale-x-100' : 'text-white/70 hover:text-white after:scale-x-0 hover:after:scale-x-100'}`
              }`}
            >
              {shortLabels[item.title] || item.title}
            </Link>
          ))}
        </nav>

        {/* Right: CTA */}
        <div className="hidden xl:flex items-center shrink-0 ml-4">
          <Button asChild size="sm" className="shrink-0 whitespace-nowrap">
            <a href="/#request-form" onClick={handleRequestClick}>
              Оставить заявку
            </a>
          </Button>
        </div>

        {/* Mobile: CTA + burger */}
        <div className="xl:hidden flex items-center gap-2 ml-auto shrink-0">
          <Button asChild size="sm" className="shrink-0 whitespace-nowrap">
            <a href="/#request-form" onClick={handleRequestClick}>
              Оставить заявку
            </a>
          </Button>
          <button className={`p-2 transition-colors duration-300 ${scrolled ? '' : 'text-white'}`} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t bg-card">
          <nav className="max-w-[1280px] mx-auto px-5 py-4 flex flex-col gap-1">
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
                {shortLabels[item.title] || item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
