/*
# Create profiles table

1. Purpose
- This app requires login to enter. Each signed-in user needs a profile record
  to store information beyond what Supabase Auth holds (email, password).
- The `profiles` table extends `auth.users` with a display name and timestamp.

2. New Tables
- `profiles`
  - `id` (uuid, primary key) — matches the user's id in auth.users
  - `display_name` (text) — a friendly name shown in the app
  - `created_at` (timestamptz) — when the profile was created
  - `updated_at` (timestamptz) — when the profile was last updated

3. Security
- Row Level Security enabled on `profiles`.
- Four policies (SELECT, INSERT, UPDATE, DELETE), each scoped to `authenticated`
  with an ownership check: `auth.uid() = id`.
- Users can only see, create, update, and delete their own profile row.

4. Notes
- `id` defaults to `auth.uid()` so an insert that omits the id still satisfies
  the INSERT policy's WITH CHECK.
- A trigger auto-updates `updated_at` on every row change.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
