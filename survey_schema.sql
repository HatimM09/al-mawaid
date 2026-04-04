-- APPROACH 1 (Recommended): Dynamic view via Text aggregation
-- This approach uses the existing `survey_responses` table but gives you 
-- a view where each lunch/dinner item is a row, and all members are grouped together in a single text column.
-- It avoids the need to alter the database schema every time a new member joins.

SELECT 
    survey_date,
    meal_type,
    menu_item,
    string_agg('User ' || member_no::text || ': ' || percent::text || '%', ', ') as user_responses
FROM 
    survey_responses
GROUP BY 
    survey_date, meal_type, menu_item
ORDER BY 
    survey_date DESC, meal_type DESC;


-- APPROACH 2: Postgres PIVOT / CROSSTAB 
-- This queries the existing table but pivots the member numbers into actual columns.
-- NOTE: You must know the member numbers beforehand.
-- Requires enabling tablefunc: CREATE EXTENSION IF NOT EXISTS tablefunc;

SELECT * FROM crosstab(
  $$
  SELECT 
    meal_type || ' - ' || menu_item AS meal_row,
    member_no,
    percent
  FROM 
    survey_responses
  WHERE 
    survey_date = CURRENT_DATE
  ORDER BY 1, 2
  $$,
  $$
  -- List the member IDs that should be the columns here
  SELECT unnest(ARRAY[1, 2, 3, 4, 5]) 
  $$
) AS ct (
  meal_row text,
  "user_1" int,
  "user_2" int,
  "user_3" int,
  "user_4" int,
  "user_5" int
);


-- APPROACH 3: Dedicated Custom Table setup
-- If you want to change your data entry logic to specifically insert into 
-- a table with the data shape you requested:

CREATE TABLE survey_form_pivot (
    id SERIAL PRIMARY KEY,
    survey_date DATE NOT NULL DEFAULT CURRENT_DATE,
    meal_type VARCHAR(20) NOT NULL, -- e.g. 'Lunch' or 'Dinner'
    menu_item VARCHAR(255) NOT NULL,
    -- Columns for login data (who is filling it) here:
    member_101_response INT,
    member_102_response INT,
    member_103_response INT,
    -- (add more columns for each member)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example Insert into Pivot table
-- INSERT INTO survey_form_pivot (meal_type, menu_item, member_101_response, member_102_response) 
-- VALUES ('Lunch', 'Chicken Biryani', 100, 50);
