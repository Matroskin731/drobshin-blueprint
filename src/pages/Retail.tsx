import { SEO } from "@/components/SEO";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { Card, CardContent } from "@/components/ui/card";

const Retail = () => {
  const { config } = useSiteConfig();

  if (!config.retailVisible) {
    return (
      <div className="section-padding text-center">
        <p className="text-muted-foreground">Раздел временно недоступен</p>
      </div>
    );
  }

  return (
    <div>
      <SEO title="Розничная продажа резиновых покрытий — ДробШин" description="Купить резиновую плитку и крошку в розницу от производителя. Доставка по Нижнему Новгороду и России." />
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">Розница</h1>
          <p className="text-lg opacity-80">Материалы для самостоятельного монтажа</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {config.retailCategories.filter((c) => c.visible).map((cat) => (
              <Card key={cat.id} className="text-center">
                <CardContent className="pt-6">
                  <h3 className="font-semibold">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">Скоро в наличии</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Retail;
