-- Create profiles table for extended user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  preferences JSONB DEFAULT '{"units": "metric", "alerts_enabled": true}'::jsonb
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Create watched_asteroids table
CREATE TABLE public.watched_asteroids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  neo_reference_id TEXT NOT NULL,
  neo_name TEXT,
  alert_distance NUMERIC DEFAULT 1.0,
  alert_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, neo_reference_id)
);

-- Enable RLS on watched_asteroids
ALTER TABLE public.watched_asteroids ENABLE ROW LEVEL SECURITY;

-- Watched asteroids policies
CREATE POLICY "Users can view their own watched asteroids"
  ON public.watched_asteroids FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own watched asteroids"
  ON public.watched_asteroids FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own watched asteroids"
  ON public.watched_asteroids FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own watched asteroids"
  ON public.watched_asteroids FOR DELETE
  USING (auth.uid() = user_id);

-- Create alert_history table
CREATE TABLE public.alert_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  neo_reference_id TEXT NOT NULL,
  neo_name TEXT,
  alert_type TEXT NOT NULL,
  triggered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  close_approach_date TIMESTAMP WITH TIME ZONE,
  miss_distance NUMERIC,
  is_read BOOLEAN DEFAULT false
);

-- Enable RLS on alert_history
ALTER TABLE public.alert_history ENABLE ROW LEVEL SECURITY;

-- Alert history policies
CREATE POLICY "Users can view their own alerts"
  ON public.alert_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts"
  ON public.alert_history FOR UPDATE
  USING (auth.uid() = user_id);

-- Create cached_neos table (public read, service write)
CREATE TABLE public.cached_neos (
  neo_reference_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  data JSONB NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on cached_neos
ALTER TABLE public.cached_neos ENABLE ROW LEVEL SECURITY;

-- Cached NEOs can be read by anyone (public data)
CREATE POLICY "Anyone can view cached NEOs"
  ON public.cached_neos FOR SELECT
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for profiles timestamp
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (NEW.id, NEW.email, split_part(NEW.email, '@', 1));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for auto profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();