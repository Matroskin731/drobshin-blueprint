import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

export function Footer() {
  const { config } = useSiteConfig();
  const { contacts, navigation } = config;
  const visibleNav = navigation.filter((n) => n.visible);

  return (
    <footer style={{ background: "hsl(var(--footer-bg))" }} className="text-white border-t border-white/5">
      <div className="section-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-3">
              <span className="text-lime-500">Дроб</span>Шин
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              ООО «Нижегородский завод по утилизации РТИ»
              <br />
              Основан в 2007 году
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-50 text-lime-500">Навигация</h4>
            <nav className="flex flex-col gap-1.5">
              {visibleNav.map((item) =>
              <Link
                key={item.id}
                to={item.path}
                className="text-sm opacity-90 hover:opacity-100 transition-opacity">

                  {item.title}
                </Link>
              )}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-50 text-lime-500">Контакты</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-lime-600" />
                <span className="opacity-90">{contacts.address}</span>
              </div>
              {contacts.phones.map((phone, i) =>
              <div key={i} className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-lime-600" />
                  <div>
                    <a href={`tel:${phone.number.replace(/[^\d+]/g, "")}`} className="opacity-90 hover:opacity-100">
                      {phone.number}
                    </a>
                    <p className="text-xs opacity-60">{phone.name ? `${phone.name} — ${phone.role}` : phone.role}</p>
                  </div>
                </div>
              )}
              {contacts.emails.map((email, i) =>
              <div key={i} className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-lime-600" />
                  <a href={`mailto:${email}`} className="opacity-80 hover:opacity-100">{email}</a>
                </div>
              )}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-50 text-lime-500">График работы</h4>
            <div className="flex flex-col gap-1.5 text-sm">
              {contacts.schedule.map((line, i) =>
              <div key={i} className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-lime-600" />
                  <span className="opacity-80">{line}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-xs opacity-40">
          © {new Date().getFullYear()} ДробШин — ООО «Нижегородский завод по утилизации РТИ»
        </div>
      </div>
    </footer>);

}