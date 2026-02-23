
-- Contacts table (single row)
CREATE TABLE public.site_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT NOT NULL DEFAULT '',
  phones JSONB NOT NULL DEFAULT '[]',
  emails TEXT[] NOT NULL DEFAULT '{}',
  schedule TEXT[] NOT NULL DEFAULT '{}',
  form_email TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Product categories
CREATE TABLE public.product_categories (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Product items
CREATE TABLE public.product_items (
  id TEXT NOT NULL PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES public.product_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image TEXT,
  price TEXT,
  show_price BOOLEAN NOT NULL DEFAULT false,
  visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Articles
CREATE TABLE public.articles (
  id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read contacts" ON public.site_contacts FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON public.product_categories FOR SELECT USING (true);
CREATE POLICY "Public read items" ON public.product_items FOR SELECT USING (true);
CREATE POLICY "Public read articles" ON public.articles FOR SELECT USING (true);

-- Auth write access
CREATE POLICY "Auth insert contacts" ON public.site_contacts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update contacts" ON public.site_contacts FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth delete contacts" ON public.site_contacts FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Auth insert categories" ON public.product_categories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update categories" ON public.product_categories FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth delete categories" ON public.product_categories FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Auth insert items" ON public.product_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update items" ON public.product_items FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth delete items" ON public.product_items FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Auth insert articles" ON public.articles FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update articles" ON public.articles FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth delete articles" ON public.articles FOR DELETE USING (auth.uid() IS NOT NULL);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_contacts_updated_at
  BEFORE UPDATE ON public.site_contacts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
