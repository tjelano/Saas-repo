import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

interface GeneratedImage {
  id: string;
  originalImageUrl: string;
  generatedImageUrl: string;
  prompt: string;
  negativePrompt?: string;
  generationSettings: any;
  createdAt: string;
}

export function useGeneratedImages() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const fetchImages = useCallback(async () => {
    if (!user) {
      // If there is no user, we are not loading, and there's no error to show, just an empty list of images.
      setLoading(false);
      return;
    };
    
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/user-images');
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      setImages(data.images);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return { images, loading, error, refetch: fetchImages };
} 