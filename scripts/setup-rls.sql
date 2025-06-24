-- Row Level Security (RLS) Setup Script
-- Run this in your Supabase SQL Editor

-- Enable RLS on all tables
ALTER TABLE users_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE designs_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own data" ON users_table
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users_table
    FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert own data" ON users_table
    FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Designs policies
CREATE POLICY "Users can view own designs" ON designs_table
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own designs" ON designs_table
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own designs" ON designs_table
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own designs" ON designs_table
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- Generated Images policies
CREATE POLICY "Users can view own generated images" ON generated_images
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own generated images" ON generated_images
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own generated images" ON generated_images
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own generated images" ON generated_images
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON users_table TO authenticated;
GRANT ALL ON designs_table TO authenticated;
GRANT ALL ON generated_images TO authenticated; 