import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SiteConfig, defaultConfig, ProductCategory, ProductItem, Article } from "@/data/siteConfig";
import { supabase } from "@/integrations/supabase/client";

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
  isBlockVisible: (blockId: string) => boolean;
  loading: boolean;
  refetchFromDB: () => Promise<void>;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

async function fetchConfigFromDB(): Promise<Partial<SiteConfig>> {
  const partial: Partial<SiteConfig> = {};

  // Fetch contacts
  const { data: contactRows } = await supabase
    .from("site_contacts")
    .select("*")
    .limit(1);

  if (contactRows && contactRows.length > 0) {
    const c = contactRows[0];
    partial.contacts = {
      address: c.address,
      phones: (c.phones as any[]) || [],
      emails: c.emails || [],
      schedule: c.schedule || [],
    };
    partial.formEmail = c.form_email || defaultConfig.formEmail;
  }

  // Fetch product categories + items
  const { data: categories } = await supabase
    .from("product_categories")
    .select("*")
    .order("sort_order");

  const { data: items } = await supabase
    .from("product_items")
    .select("*")
    .order("sort_order");

  if (categories) {
    partial.products = categories.map((cat): ProductCategory => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      visible: cat.visible,
      items: (items || [])
        .filter((i) => i.category_id === cat.id)
        .map((i): ProductItem => ({
          id: i.id,
          name: i.name,
          description: i.description,
          image: i.image || undefined,
          price: i.price || undefined,
          showPrice: i.show_price,
          visible: i.visible,
        })),
    }));
  }

  // Fetch articles
  const { data: articleRows } = await supabase
    .from("articles")
    .select("*")
    .order("date", { ascending: false });

  if (articleRows) {
    partial.articles = articleRows.map((a): Article => ({
      id: a.id,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      date: a.date,
      visible: a.visible,
    }));
  }

  return partial;
}

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  const refetchFromDB = async () => {
    setLoading(true);
    try {
      const dbConfig = await fetchConfigFromDB();
      setConfig((prev) => ({ ...prev, ...dbConfig }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchFromDB();
  }, []);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  const isBlockVisible = (blockId: string) => {
    const block = config.homeBlocks.find((b) => b.id === blockId);
    return block ? block.visible : true;
  };

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, resetConfig, isBlockVisible, loading, refetchFromDB }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) throw new Error("useSiteConfig must be used within SiteConfigProvider");
  return ctx;
}
