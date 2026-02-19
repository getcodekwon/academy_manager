-- Check if tables exist
select table_name 
from information_schema.tables 
where table_schema = 'public';

-- Check RLS policies
select * from pg_policies where schemaname = 'public';
