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
      <div className="section-container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span className="text-primary">Дроб</span>
          <span className="text-foreground mx-0">Шин</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {visibleNav.map((item) =>
          <Link
            key={item.id}
            to={item.path}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            location.pathname === item.path ?
            "bg-primary/10 text-primary" :
            "text-muted-foreground hover:text-foreground hover:bg-muted"}`
            }>

              {item.title}
            </Link>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {mainPhone &&
          <a href={`tel:${mainPhone.number.replace(/[^\d+]/g, "")}`} className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Phone className="h-4 w-4 text-primary" />
              {mainPhone.number}
            </a>
          }
          <Button asChild size="sm">
            <a href="/#request-form" onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}>Оставить заявку</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen &&
      <div className="lg:hidden border-t bg-card">
          <nav className="section-container py-4 flex flex-col gap-1">
            {visibleNav.map((item) =>
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            location.pathname === item.path ?
            "bg-primary/10 text-primary" :
            "text-muted-foreground hover:text-foreground"}`
            }>

                {item.title}
              </Link>
          )}
            <div className="pt-3 mt-3 border-t flex flex-col gap-2">
              {mainPhone &&
            <a href={`tel:${mainPhone.number.replace(/[^\d+]/g, "")}`} className="flex items-center gap-1.5 text-sm font-medium">
                  <Phone className="h-4 w-4 text-primary" />
                  {mainPhone.number}
                </a>
            }
              <Button asChild size="sm" className="w-full">
                <a href="/#request-form" onClick={(e) => {
                setMobileOpen(false);
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}>Оставить заявку</a>
              </Button>
            </div>
          </nav>
        </div>
      }
    </header>);

}