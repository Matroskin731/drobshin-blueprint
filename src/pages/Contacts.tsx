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
                      <p className="text-sm text-muted-foreground">{contacts.address}</p>
                    </div>
                  </div>

                  {contacts.phones.map((phone, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-foreground/50 mt-0.5 shrink-0" />
                      <div>
                        {phone.name && <p className="font-semibold mb-0.5">{phone.name}</p>}
                        <p className="text-xs text-muted-foreground mb-1">{phone.role}</p>
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
                        <a href={`mailto:${email}`} className="text-sm text-foreground hover:underline">{email}</a>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-foreground/50 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">График работы</p>
                      {contacts.schedule.map((line, i) => (
                        <p key={i} className="text-sm text-muted-foreground">{line}</p>
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
            <div className="rounded-xl overflow-hidden">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=44.002090%2C56.329882&z=16&pt=44.002090,56.329882,pm2rdm"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ display: "block" }}
                allowFullScreen
                title="Местоположение завода ДробШин на карте"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
