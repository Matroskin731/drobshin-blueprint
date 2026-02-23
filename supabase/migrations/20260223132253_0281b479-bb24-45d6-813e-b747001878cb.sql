
-- Fix RLS policies: change from RESTRICTIVE to PERMISSIVE for all tables

-- product_items
DROP POLICY IF EXISTS "Auth delete items" ON public.product_items;
DROP POLICY IF EXISTS "Auth insert items" ON public.product_items;
DROP POLICY IF EXISTS "Auth update items" ON public.product_items;
DROP POLICY IF EXISTS "Public read items" ON public.product_items;

CREATE POLICY "Public read items" ON public.product_items FOR SELECT USING (true);
CREATE POLICY "Auth insert items" ON public.product_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update items" ON public.product_items FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth delete items" ON public.product_items FOR DELETE USING (auth.uid() IS NOT NULL);

-- product_categories
DROP POLICY IF EXISTS "Auth delete categories" ON public.product_categories;
DROP POLICY IF EXISTS "Auth insert categories" ON public.product_categories;
DROP POLICY IF EXISTS "Auth update categories" ON public.product_categories;
DROP POLICY IF EXISTS "Public read categories" ON public.product_categories;

CREATE POLICY "Public read categories" ON public.product_categories FOR SELECT USING (true);
CREATE POLICY "Auth insert categories" ON public.product_categories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update categories" ON public.product_categories FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth delete categories" ON public.product_categories FOR DELETE USING (auth.uid() IS NOT NULL);

-- articles
DROP POLICY IF EXISTS "Auth delete articles" ON public.articles;
DROP POLICY IF EXISTS "Auth insert articles" ON public.articles;
DROP POLICY IF EXISTS "Auth update articles" ON public.articles;
DROP POLICY IF EXISTS "Public read articles" ON public.articles;

CREATE POLICY "Public read articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Auth insert articles" ON public.articles FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update articles" ON public.articles FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth delete articles" ON public.articles FOR DELETE USING (auth.uid() IS NOT NULL);

-- site_contacts
DROP POLICY IF EXISTS "Auth delete contacts" ON public.site_contacts;
DROP POLICY IF EXISTS "Auth insert contacts" ON public.site_contacts;
DROP POLICY IF EXISTS "Auth update contacts" ON public.site_contacts;
DROP POLICY IF EXISTS "Public read contacts" ON public.site_contacts;

CREATE POLICY "Public read contacts" ON public.site_contacts FOR SELECT USING (true);
CREATE POLICY "Auth insert contacts" ON public.site_contacts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update contacts" ON public.site_contacts FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth delete contacts" ON public.site_contacts FOR DELETE USING (auth.uid() IS NOT NULL);
