-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Users (Extends Supabase Auth)
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  role text check (role in ('admin', 'teacher', 'student', 'parent')) default 'student',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Classes
create table public.classes (
  id uuid default uuid_generate_v4() primary key,
  teacher_id uuid references public.users(id) not null,
  name text not null,
  description text,
  schedule text, -- e.g., "Mon/Wed 18:00"
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enrollments (Many-to-Many: Students <-> Classes)
create table public.enrollments (
  class_id uuid references public.classes(id) on delete cascade not null,
  student_id uuid references public.users(id) on delete cascade not null,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (class_id, student_id)
);

-- 4. Attendance
create table public.attendance (
  id uuid default uuid_generate_v4() primary key,
  class_id uuid references public.classes(id) on delete cascade not null,
  student_id uuid references public.users(id) on delete cascade not null,
  date date not null,
  status text check (status in ('present', 'absent', 'late', 'excused')) default 'present',
  note text
);

-- 5. Passages (For Reading Comprehension)
create table public.passages (
  id uuid default uuid_generate_v4() primary key,
  title text,
  content text not null,
  source text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Problems
create table public.problems (
  id uuid default uuid_generate_v4() primary key,
  passage_id uuid references public.passages(id) on delete set null,
  question_text text not null,
  options jsonb, -- Array of strings or objects for multiple choice
  correct_answer text not null, -- The correct option ID or text
  type text check (type in ('multiple_choice', 'short_answer')) default 'multiple_choice',
  tags text[], -- e.g., ['grammar', 'to-infinitive', 'hard']
  explanation text, -- AI generated feedback source
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Exams/Assignments
create table public.exams (
  id uuid default uuid_generate_v4() primary key,
  class_id uuid references public.classes(id) on delete cascade not null,
  title text not null,
  problem_ids uuid[], -- Array of problem IDs to include
  deadline timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Submissions
create table public.submissions (
  id uuid default uuid_generate_v4() primary key,
  exam_id uuid references public.exams(id) on delete cascade not null,
  student_id uuid references public.users(id) on delete cascade not null,
  score integer,
  feedback text, -- Overall teacher/AI feedback
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Submission Details (Granular Answers)
create table public.submission_details (
  id uuid default uuid_generate_v4() primary key,
  submission_id uuid references public.submissions(id) on delete cascade not null,
  problem_id uuid references public.problems(id) on delete cascade not null,
  student_answer text,
  is_correct boolean,
  ai_feedback text -- Specific feedback for this wrong answer
);

-- Row Level Security (RLS) Setup
alter table public.users enable row level security;
alter table public.classes enable row level security;
alter table public.enrollments enable row level security;
alter table public.attendance enable row level security;
alter table public.passages enable row level security;
alter table public.problems enable row level security;
alter table public.exams enable row level security;
alter table public.submissions enable row level security;
alter table public.submission_details enable row level security;

-- Basic Policies (To be refined)
-- Users can read their own profile
create policy "Users can read own data" on public.users for select using (auth.uid() = id);

-- Teachers can read all data (Simplified for MVP)
-- In production, strict role-based policies are needed.
create policy "Teachers read all" on public.users for select using (
  exists (select 1 from public.users where id = auth.uid() and role = 'teacher')
);
