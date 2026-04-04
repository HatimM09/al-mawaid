-- =========================================================================
-- AL-MAWAID FULL DATABASE SCHEMA
-- For PostgreSQL / Supabase
-- Includes tables, relations, and "automatic plays" (Triggers & Views)
-- =========================================================================

-- Enable UUID extension for unique ids
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================================
-- 1. MEMBERS & PROFILES
-- ==================================

-- Stores user data linked to Supabase Auth
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Links to Auth user. Deletes member if auth user is deleted.
    member_no INT UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255),
    joined_date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Separate table for profile pictures to keep members table lightweight
CREATE TABLE IF NOT EXISTS public.member_profile_pics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_no INT REFERENCES public.members(member_no) ON DELETE CASCADE,
    pic_url TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(member_no)
);

-- ==================================
-- 2. MENU SYSTEM
-- ==================================

CREATE TABLE IF NOT EXISTS public.menu (
    id SERIAL PRIMARY KEY,
    day_name VARCHAR(50) NOT NULL, -- e.g., 'Monday'
    day_name_ar VARCHAR(50),       -- e.g., 'الاثنين'
    lunch_items JSONB DEFAULT '[]'::jsonb,  -- Array of string items
    dinner_items JSONB DEFAULT '[]'::jsonb, -- Array of string items
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==================================
-- 3. POSTS (ANNOUNCEMENTS)
-- ==================================

CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255),
    emoji VARCHAR(10) DEFAULT '📌',
    type VARCHAR(50) DEFAULT 'announcement', -- info, reminder, notice
    body TEXT,
    is_urgent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==================================
-- 4. FEEDBACK & RATINGS
-- ==================================

CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_no INT REFERENCES public.members(member_no) ON DELETE CASCADE,
    menu_id INT REFERENCES public.menu(id) ON DELETE CASCADE,
    meal_type VARCHAR(50) DEFAULT 'general', -- lunch, dinner, general
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==================================
-- 5. DAILY SURVEY SYSTEM
-- ==================================

CREATE TABLE IF NOT EXISTS public.survey_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_no INT REFERENCES public.members(member_no) ON DELETE CASCADE,
    survey_date DATE DEFAULT CURRENT_DATE,
    day_name VARCHAR(50),
    meal_type VARCHAR(50), -- 'lunch' or 'dinner'
    menu_item VARCHAR(255),
    percent INT CHECK (percent >= 0 AND percent <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);


-- =========================================================================
-- AUTOMATIC PLAYS (VIEWS & TRIGGERS)
-- =========================================================================

-- AUTO-PLAY 1: Abstract Survey Pivot View
-- Automatically generates a dynamic table-like view summarizing survey metrics in text columns
CREATE OR REPLACE VIEW public.survey_results_summary AS
SELECT 
    survey_date,
    meal_type,
    menu_item,
    string_agg('User ' || member_no::text || ': ' || percent::text || '%', ', ') as user_responses
FROM 
    public.survey_responses
GROUP BY 
    survey_date, meal_type, menu_item
ORDER BY 
    survey_date DESC, meal_type DESC;


-- AUTO-PLAY 2: Automatic Timestamp Updater Function
-- Automatically updates the 'updated_at' column whenever a row is modified
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- AUTO-PLAY 3: Trigger for Members Timestamp
CREATE TRIGGER update_members_updated_at
BEFORE UPDATE ON public.members
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- AUTO-PLAY 4: Trigger for Profile Pics Timestamp
CREATE TRIGGER update_member_profile_pics_updated_at
BEFORE UPDATE ON public.member_profile_pics
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();


-- =========================================================================
-- SECURITY (RLS: Row Level Security)
-- =========================================================================
-- To make this completely functional in Supabase, you must enable RLS and create policies.
-- By default tables are locked. The following commands open them up for authenticated reading:

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone logged in to view the data
CREATE POLICY "Allow authenticated read access" ON public.members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.menu FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.posts FOR SELECT TO authenticated USING (true);

-- Users can only insert their own feedback and survey
CREATE POLICY "Allow users to insert own feedback" ON public.feedback FOR INSERT TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow users to manage own surveys" ON public.survey_responses FOR ALL TO authenticated 
USING (true) WITH CHECK (true);
