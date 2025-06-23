-- SQL migration to create the generated_images table
CREATE TABLE generated_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  original_image_url TEXT,
  generated_image_url TEXT NOT NULL,
  prompt TEXT NOT NULL,
  negative_prompt TEXT,
  generation_settings JSONB, -- Store guidance_scale, steps, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

-- Users can only see their own images
CREATE POLICY "Users can view own images" ON generated_images
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own images
CREATE POLICY "Users can insert own images" ON generated_images
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own images
CREATE POLICY "Users can update own images" ON generated_images
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own images
CREATE POLICY "Users can delete own images" ON generated_images
  FOR DELETE USING (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX idx_generated_images_user_id ON generated_images(user_id);
CREATE INDEX idx_generated_images_created_at ON generated_images(created_at DESC);

-- Create storage bucket for generated images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('generated-interiors', 'generated-interiors', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'generated-interiors' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'generated-interiors');

CREATE POLICY "Users can delete own images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'generated-interiors' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  ); 