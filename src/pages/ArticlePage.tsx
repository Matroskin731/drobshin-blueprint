import { SEO } from "@/components/SEO";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const { config } = useSiteConfig();
  const article = config.articles.find((a) => a.id === id && a.visible);

  if (!article) {
    return (
      <div className="section-padding">
        <div className="section-container max-w-3xl text-center">
          <p className="text-foreground/60 mb-4">Статья не найдена</p>
          <Button variant="outline" asChild>
            <Link to="/articles"><ArrowLeft className="mr-2 h-4 w-4" />Назад к статьям</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SEO title={`${article.title} — ДробШин`} description={article.excerpt || "Статья на сайте завода ДробШин."} ogType="article" />
      <section className="hero-gradient py-12">
        <div className="section-container max-w-3xl">
          <Button variant="ghost" size="sm" asChild className="mb-4 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/articles"><ArrowLeft className="mr-2 h-4 w-4" />Назад к статьям</Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{article.title}</h1>
          <div className="flex items-center gap-2 text-sm opacity-70">
            <CalendarDays className="h-4 w-4" />
            {new Date(article.date).toLocaleDateString("ru-RU")}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container max-w-3xl">
          <p className="text-lg text-foreground/70 mb-6 font-medium leading-relaxed">{article.excerpt}</p>
          <div className="prose prose-neutral max-w-none text-foreground leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
          <div className="mt-10 pt-6 border-t">
            <Button variant="outline" asChild>
              <Link to="/articles"><ArrowLeft className="mr-2 h-4 w-4" />Назад к статьям</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
