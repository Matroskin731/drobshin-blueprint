
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'manager', 'editor');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to get user's role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS policies for user_roles
-- Any authenticated user can read roles (needed for UI)
CREATE POLICY "Authenticated can read roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can insert roles
CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update roles
CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete roles
CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Update existing table policies to be role-aware
-- product_items: manager and admin can write
DROP POLICY IF EXISTS "Auth update items" ON public.product_items;
DROP POLICY IF EXISTS "Auth insert items" ON public.product_items;
DROP POLICY IF EXISTS "Auth delete items" ON public.product_items;

CREATE POLICY "Admin or manager can insert items"
  ON public.product_items FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

CREATE POLICY "Admin or manager can update items"
  ON public.product_items FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

CREATE POLICY "Admin can delete items"
  ON public.product_items FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- product_categories: manager and admin can write
DROP POLICY IF EXISTS "Auth update categories" ON public.product_categories;
DROP POLICY IF EXISTS "Auth insert categories" ON public.product_categories;
DROP POLICY IF EXISTS "Auth delete categories" ON public.product_categories;

CREATE POLICY "Admin or manager can insert categories"
  ON public.product_categories FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

CREATE POLICY "Admin or manager can update categories"
  ON public.product_categories FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

CREATE POLICY "Admin can delete categories"
  ON public.product_categories FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- articles: editor and admin can write
DROP POLICY IF EXISTS "Auth update articles" ON public.articles;
DROP POLICY IF EXISTS "Auth insert articles" ON public.articles;
DROP POLICY IF EXISTS "Auth delete articles" ON public.articles;

CREATE POLICY "Admin or editor can insert articles"
  ON public.articles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admin or editor can update articles"
  ON public.articles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admin can delete articles"
  ON public.articles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- site_contacts: only admin
DROP POLICY IF EXISTS "Auth update contacts" ON public.site_contacts;
DROP POLICY IF EXISTS "Auth insert contacts" ON public.site_contacts;
DROP POLICY IF EXISTS "Auth delete contacts" ON public.site_contacts;

CREATE POLICY "Admin can insert contacts"
  ON public.site_contacts FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can update contacts"
  ON public.site_contacts FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can delete contacts"
  ON public.site_contacts FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
