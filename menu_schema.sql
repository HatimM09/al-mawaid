CREATE TABLE IF NOT EXISTS public.weekly_menu (
    day_name VARCHAR(20) PRIMARY KEY, -- 'monday', 'tuesday', etc.
    day_en VARCHAR(20) NOT NULL, -- 'Monday', etc.
    day_ar VARCHAR(50) NOT NULL, -- 'الاثنين', etc.
    lunch TEXT[] NOT NULL DEFAULT '{}',
    dinner TEXT[] NOT NULL DEFAULT '{}',
    sort_order SMALLINT NOT NULL
);

-- Insert the default menu from App.jsx so the user has fully populated data out of the box
INSERT INTO public.weekly_menu (day_name, day_en, day_ar, lunch, dinner, sort_order) VALUES
('monday', 'Monday', 'الاثنين', ARRAY['Chola', 'kulcha', 'Sreekhand', 'Dal', 'Chawal'], ARRAY['FMB MENU'], 1),
('tuesday', 'Tuesday', 'الثلاثاء', ARRAY['American Choupsey', 'Wafers', 'Butter Khichdi'], ARRAY['Roti', 'Veg Jaipuri', 'Chicken pulao', 'Soup'], 2),
('wednesday', 'Wednesday', 'الأربعاء', ARRAY['Vegetable Sandwich', 'Bhel Salad', 'Corn Pulao'], ARRAY['Roti', 'White Chicken', 'Manchurian Rice', 'Gravy'], 3),
('thursday', 'Thursday', 'الخميس', ARRAY['Chicken 65', 'Corn Munch Salad', 'Dal makhni', 'Chawal'], ARRAY['Roti', 'mango Custard', 'Matar Paneer', 'Tuwar Pulao', 'Palidu'], 4),
('friday', 'Friday', 'الجمعة', ARRAY['FMB MENU'], ARRAY['Roti', 'Gobi Matar', 'Chicken Kashmiri Pulao', 'Soup'], 5),
('saturday', 'Saturday', 'السبت', ARRAY['Chana Bateta', 'Dal Makhni', 'Chawal'], ARRAY['Roti', 'Chicken Tarkari', 'Veg Coconut Rice', 'Kung pao Gravy'], 6)
ON CONFLICT (day_name) DO UPDATE SET
  day_en = EXCLUDED.day_en,
  day_ar = EXCLUDED.day_ar,
  lunch = EXCLUDED.lunch,
  dinner = EXCLUDED.dinner,
  sort_order = EXCLUDED.sort_order;

ALTER TABLE public.weekly_menu ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for menu" ON public.weekly_menu FOR SELECT TO PUBLIC USING (true);
