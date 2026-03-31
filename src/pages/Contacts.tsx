import { SEO } from "@/components/SEO";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { RequestForm } from "@/components/RequestForm";
import { Card, CardContent } from "@/components/ui/card";

const Contacts = () => {
  const { config } = useSiteConfig();
  const { contacts } = config;

  return (
    <div>
      <SEO title="Контакты — ДробШин" description="Свяжитесь с заводом ДробШин. Адрес, телефоны, email и форма обратной связи." />
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">Контакты</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Свяжитесь с нами удобным способом
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-foreground/50 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Адрес</p>
                      <p className="text-sm text-foreground/70">{contacts.address}</p>
                    </div>
                  </div>

                  {contacts.phones.map((phone, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-foreground/50 mt-0.5 shrink-0" />
                      <div>
                        {phone.name && <p className="font-semibold mb-0.5">{phone.name}</p>}
                        <p className="text-xs text-foreground/60 mb-1">{phone.role}</p>
                    <a href={`tel:${phone.number.replace(/[^\d+]/g, "")}`} className="text-sm text-primary font-medium hover:underline">
                      {phone.number}
                        </a>
                      </div>
                    </div>
                  ))}

                  {contacts.emails.map((email, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-foreground/50 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold mb-1">Email</p>
                        <a href={`mailto:${email}`} className="text-sm text-primary font-medium hover:underline">{email}</a>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-foreground/50 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">График работы</p>
                      {contacts.schedule.map((line, i) => (
                        <p key={i} className="text-sm text-foreground/70">{line}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <RequestForm source="контакты" />
          </div>

          {/* Яндекс Карта */}
          <div className="max-w-4xl mx-auto mt-12">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              Как нас найти
            </h3>
            <div className="rounded-xl overflow-hidden border border-border" style={{ height: '420px' }}>
              <iframe
                title="Расположение завода ДробШин"
                src="https://yandex.ru/map-widget/v1/?ll=43.504734%2C56.119775&z=15&pt=43.504734%2C56.119775%2Cpm2rdm&text=%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%2C%20%D0%9D%D0%B8%D0%B6%D0%B5%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                style={{ border: 0, display: 'block' }}
              />
            </div>
            {/* Запасной вариант — ссылка на карту */}
            <a
              href="https://yandex.ru/maps/?text=%D0%9D%D0%B8%D0%B6%D0%B5%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB.+%D0%B3.+%D0%91%D0%BE%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA+%D1%83%D0%BB.+%D0%9F%D1%83%D1%88%D0%BA%D0%B8%D0%BD%D0%B0+24%2F5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 mt-4 p-4 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-colors group"
            >
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-foreground/70 group-hover:text-foreground transition-colors">
                Открыть завод на Яндекс Картах →
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
