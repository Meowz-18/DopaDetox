-- Create a table for public profiles using Supabase Auth
create table profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  xp bigint default 1250,
  level int default 5,
  streak int default 1,
  dopamine_score int default 72,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for activity logs
create table activity_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  activity_id text not null, -- ID string from our frontend constants
  activity_title text, -- detailed snapshot
  xp_gained int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table activity_logs enable row level security;

create policy "Users can view their own activity logs." on activity_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert their own activity logs." on activity_logs
  for insert with check (auth.uid() = user_id);

-- Function to handle new user creation automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, xp, level, streak, dopamine_score)
  values (new.id, new.raw_user_meta_data->>'username', 1250, 5, 1, 72);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
