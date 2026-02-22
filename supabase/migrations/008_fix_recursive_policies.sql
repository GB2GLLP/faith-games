-- Fix infinite recursion in users RLS policies
-- The super_admin policies query public.users from within a policy ON public.users

-- Create a SECURITY DEFINER function that bypasses RLS to check role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT role FROM public.users WHERE id = user_id;
$$;

-- Drop the recursive policies
DROP POLICY IF EXISTS "Super admins can read all users" ON public.users;
DROP POLICY IF EXISTS "Super admins can update all users" ON public.users;

-- Recreate using the security definer function (no recursion)
CREATE POLICY "Super admins can read all users"
  ON public.users FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'super_admin');

CREATE POLICY "Super admins can update all users"
  ON public.users FOR UPDATE
  USING (public.get_user_role(auth.uid()) = 'super_admin');

-- Also fix content management policies that reference users table (not recursive but cleaner)
DROP POLICY IF EXISTS "Super admins can manage scenes" ON public.bible_scenes;
DROP POLICY IF EXISTS "Super admins can manage characters" ON public.bible_characters;
DROP POLICY IF EXISTS "Super admins can manage verses" ON public.bible_verses;
DROP POLICY IF EXISTS "Super admins can manage trivia" ON public.trivia_questions;

CREATE POLICY "Super admins can manage scenes"
  ON public.bible_scenes FOR ALL
  USING (public.get_user_role(auth.uid()) = 'super_admin');

CREATE POLICY "Super admins can manage characters"
  ON public.bible_characters FOR ALL
  USING (public.get_user_role(auth.uid()) = 'super_admin');

CREATE POLICY "Super admins can manage verses"
  ON public.bible_verses FOR ALL
  USING (public.get_user_role(auth.uid()) = 'super_admin');

CREATE POLICY "Super admins can manage trivia"
  ON public.trivia_questions FOR ALL
  USING (public.get_user_role(auth.uid()) = 'super_admin');
