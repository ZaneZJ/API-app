-- First, create the table
create table api_keys (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  key text not null unique,
  type text not null check (type in ('production', 'development')),
  usage integer default 0,
  usage_limit integer default 0,
  last_used text default 'Never',
  user_id uuid not null
);

-- Enable RLS on the table
alter table api_keys enable row level security;

-- Now create the policies
create policy "Users can view their own API keys"
  on api_keys for select
  using ( auth.uid()::uuid = user_id );

create policy "Users can insert their own API keys"
  on api_keys for insert
  with check ( auth.uid()::uuid = user_id );

create policy "Users can update their own API keys"
  on api_keys for update
  using ( auth.uid()::uuid = user_id );

create policy "Users can delete their own API keys"
  on api_keys for delete
  using ( auth.uid()::uuid = user_id ); 