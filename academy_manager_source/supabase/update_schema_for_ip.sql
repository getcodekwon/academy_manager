-- Add status and ownership fields to 'problems' table
alter table public.problems 
add column if not exists status text check (status in ('draft', 'pending_review', 'published', 'archived')) default 'draft',
add column if not exists created_by uuid references public.users(id),
add column if not exists reviewed_by uuid references public.users(id),
add column if not exists review_note text,
add column if not exists published_at timestamp with time zone;

-- Update RLS policies to reflect new workflow
-- Only published problems should be visible to students
create policy "Students view published problems only" on public.problems
  for select using (status = 'published');

-- Teachers can see all problems (drafts and published)
create policy "Teachers view all problems" on public.problems
  for all using (
    exists (select 1 from public.users where id = auth.uid() and role in ('teacher', 'admin'))
  );
