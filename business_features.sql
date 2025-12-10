-- Add avatar_url to profiles if not exists
alter table profiles add column if not exists avatar_url text;

-- Create storage bucket for avatars
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Storage Policies
create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );
  
create policy "Anyone can update an avatar."
  on storage.objects for update
  with check ( bucket_id = 'avatars' );

-- Create user_tasks table
create table if not exists user_tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  title text not null,
  description text,
  xp_reward int default 50,
  dopamine_level text check (dopamine_level in ('Low', 'Medium', 'High')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for user_tasks
alter table user_tasks enable row level security;

create policy "Users can view their own tasks." on user_tasks
  for select using (auth.uid() = user_id);

create policy "Users can insert their own tasks." on user_tasks
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own tasks." on user_tasks
  for delete using (auth.uid() = user_id);
