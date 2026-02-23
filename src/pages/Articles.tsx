import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const Articles = () => {
  const { config } = useSiteConfig();
  const visibleArticles = config.articles.filter((a) => a.visible);

  return (
    <div>
      <section className="hero-gradient py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold mb-4">Статьи</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Полезная информация о резиновых покрытиях и переработке
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container max-w-4xl">
          {visibleArticles.length === 0 ? (
            <p className="text-center text-muted-foreground">Статьи пока не добавлены</p>
          ) : (
            <div className="space-y-6">
              {visibleArticles.map((article) => (
                <Card key={article.id} className="card-hover">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(article.date).toLocaleDateString("ru-RU")}
                    </div>
                    <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                    <p className="text-muted-foreground mb-3">{article.excerpt}</p>
                    <p className="text-sm text-muted-foreground">{article.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Articles;
