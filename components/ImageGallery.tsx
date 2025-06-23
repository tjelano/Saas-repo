'use client';
import { useGeneratedImages } from '@/hooks/useGeneratedImages';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ImageIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function ImageGallery() {
  const { images, loading, error, refetch } = useGeneratedImages();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-t-lg dark:bg-gray-700" />
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2 dark:bg-gray-700" />
              <div className="h-3 bg-gray-200 rounded w-2/3 dark:bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading images: {error}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
          <ImageIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          No designs created yet
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Transform your spaces with AI-powered interior design. Upload a photo and let our AI reimagine your room.
        </p>
        <Link href="/design">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
            <Sparkles className="w-5 h-5 mr-2" />
            Create Your First Design
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Designs</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {images.length} design{images.length !== 1 ? 's' : ''} created
          </p>
        </div>
        <Link href="/design">
          <Button>
            <Sparkles className="w-4 h-4 mr-2" />
            Create New Design
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="group hover:shadow-lg transition-shadow duration-200 bg-card">
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <Image
                src={image.generatedImageUrl}
                alt={image.prompt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium line-clamp-3 mb-2">
                {image.prompt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  {new Date(image.createdAt).toLocaleDateString()}
                </div>
                <Badge variant="secondary" className="text-xs">
                  AI Generated
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 