"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Filter, Home } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

// Extended gallery of interior design examples - aligned with Design Studio templates
const inspirationGallery = [
  // Modern Style
  { id: 1, title: "Modern Minimalist Living", style: "Modern", room: "Living Room", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop", description: "Clean lines and open space", isFavorited: false, templateId: "modern-living" },
  { id: 2, title: "Modern Kitchen Design", style: "Modern", room: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", description: "Sleek cabinets and marble countertops", isFavorited: true, templateId: "modern-living" },
  { id: 3, title: "Modern Bedroom Suite", style: "Modern", room: "Bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop", description: "Calm and sophisticated", isFavorited: false, templateId: "modern-living" },
  
  // Bohemian Style
  { id: 4, title: "Bohemian Living Space", style: "Bohemian", room: "Living Room", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop", description: "Eclectic and colorful", isFavorited: true, templateId: "bohemian-bedroom" },
  { id: 5, title: "Bohemian Bedroom", style: "Bohemian", room: "Bedroom", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop", description: "Layered textures and warm tones", isFavorited: false, templateId: "bohemian-bedroom" },
  { id: 6, title: "Bohemian Reading Nook", style: "Bohemian", room: "Study", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", description: "Cozy and inspiring", isFavorited: false, templateId: "bohemian-bedroom" },
  
  // Industrial Style
  { id: 7, title: "Industrial Loft", style: "Industrial", room: "Living Room", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", description: "Exposed brick and metal", isFavorited: false, templateId: "industrial-kitchen" },
  { id: 8, title: "Industrial Kitchen", style: "Industrial", room: "Kitchen", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop", description: "Warehouse-inspired design", isFavorited: true, templateId: "industrial-kitchen" },
  { id: 9, title: "Industrial Office", style: "Industrial", room: "Office", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", description: "Raw materials and open space", isFavorited: false, templateId: "industrial-kitchen" },
  
  // Scandinavian Style
  { id: 10, title: "Scandinavian Living", style: "Scandinavian", room: "Living Room", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop", description: "Light and functional", isFavorited: false, templateId: "scandinavian-dining" },
  { id: 11, title: "Scandinavian Dining", style: "Scandinavian", room: "Dining Room", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop", description: "Natural materials and clean design", isFavorited: true, templateId: "scandinavian-dining" },
  { id: 12, title: "Scandinavian Bathroom", style: "Scandinavian", room: "Bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop", description: "Simple and elegant", isFavorited: false, templateId: "scandinavian-dining" },
  
  // Art Deco Style
  { id: 13, title: "Art Deco Living Room", style: "Art Deco", room: "Living Room", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop", description: "Luxury and geometric patterns", isFavorited: false, templateId: "art-deco-bathroom" },
  { id: 14, title: "Art Deco Bathroom", style: "Art Deco", room: "Bathroom", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop", description: "Gold accents and marble", isFavorited: true, templateId: "art-deco-bathroom" },
  { id: 15, title: "Art Deco Dining", style: "Art Deco", room: "Dining Room", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop", description: "Sophisticated and glamorous", isFavorited: false, templateId: "art-deco-bathroom" },
  
  // Coastal Style
  { id: 16, title: "Coastal Living Room", style: "Coastal", room: "Living Room", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop", description: "Ocean-inspired and relaxed", isFavorited: false, templateId: "coastal-patio" },
  { id: 17, title: "Coastal Patio", style: "Coastal", room: "Outdoor", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop", description: "Natural materials and sea breeze", isFavorited: true, templateId: "coastal-patio" },
  { id: 18, title: "Coastal Bedroom", style: "Coastal", room: "Bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop", description: "Peaceful and airy", isFavorited: false, templateId: "coastal-patio" },
  
  // Mid-Century Style
  { id: 19, title: "Mid-Century Living", style: "Mid-Century", room: "Living Room", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop", description: "Retro charm and organic shapes", isFavorited: false, templateId: "mid-century-lounge" },
  { id: 20, title: "Mid-Century Dining", style: "Mid-Century", room: "Dining Room", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop", description: "Vintage furniture and warm tones", isFavorited: true, templateId: "mid-century-lounge" },
  { id: 21, title: "Mid-Century Office", style: "Mid-Century", room: "Office", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", description: "Timeless and functional", isFavorited: false, templateId: "mid-century-lounge" },
  
  // Zen Style
  { id: 22, title: "Zen Meditation Room", style: "Zen", room: "Meditation", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop", description: "Minimal and peaceful", isFavorited: false, templateId: "zen-meditation" },
  { id: 23, title: "Zen Bathroom", style: "Zen", room: "Bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop", description: "Natural elements and tranquility", isFavorited: true, templateId: "zen-meditation" },
  { id: 24, title: "Zen Living Space", style: "Zen", room: "Living Room", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop", description: "Balance and harmony", isFavorited: false, templateId: "zen-meditation" }
];

const styles = ["All", "Modern", "Bohemian", "Industrial", "Scandinavian", "Art Deco", "Coastal", "Mid-Century", "Zen"];
const rooms = ["All", "Living Room", "Bedroom", "Kitchen", "Bathroom", "Dining Room", "Office", "Study", "Outdoor", "Meditation"];

export default function InspirationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 bg-background/95 z-10">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-600 rounded flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse hidden sm:inline">
                Design Muse
              </span>
            </Link>
            <div className="flex items-center space-x-2">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Inspiration Gallery</h1>
          <p className="text-muted-foreground">Browse our curated gallery of stunning interior designs.</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filter by:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <Badge key={style} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                {style}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {rooms.map((room) => (
              <Badge key={room} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                {room}
              </Badge>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {inspirationGallery.map((item) => (
            <Link key={item.id} href={`/design?template=${item.templateId}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="aspect-video bg-muted relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                  >
                    <Heart className={`w-4 h-4 ${item.isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                  </div>
                  <div className="flex space-x-1 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.style}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.room}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline">
            Load More Inspiration
          </Button>
        </div>
      </div>
    </div>
  );
} 