-- Drop the problematic recursive policy
drop policy if exists "Teachers read all" on public.users;

-- Re-create the policy using JWT metadata to avoid self-referencing loop
-- This assumes 'role' is stored in raw_user_meta_data (which our auth hook does)
create policy "Teachers read all" on public.users
  for select using (
    auth.jwt() -> 'user_metadata' ->> 'role' = 'teacher'
    OR
    auth.jwt() -> 'user_metadata' ->> 'role' = 'admin'
  );

-- Also add a policy for Admins while we are at it
create policy "Admins read all" on public.users
  for all using (
    auth.jwt() -> 'user_metadata' ->> 'role' = 'admin'
  );
