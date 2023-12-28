ALTER TABLE public.applications
ADD COLUMN email VARCHAR;

UPDATE public.applications
SET email = auth.users.email
FROM auth.users
WHERE public.applications.user_id = auth.users.id;
