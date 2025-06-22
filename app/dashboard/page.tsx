import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Folder, Star, Settings, Home } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

// Example interior design renders data - aligned with Design Studio templates
const designExamples = [
  {
    id: "modern-living",
    title: "Modern Living Room",
    style: "Modern",
    room: "Living Room",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=400&fit=crop",
    description: "Clean lines, neutral palette, large windows",
    templateId: "modern-living"
  },
  {
    id: "bohemian-bedroom",
    title: "Bohemian Bedroom",
    style: "Bohemian", 
    room: "Bedroom",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop",
    description: "Eclectic mix, warm colors, layered textures",
    templateId: "bohemian-bedroom"
  },
  {
    id: "industrial-kitchen",
    title: "Industrial Kitchen",
    style: "Industrial",
    room: "Kitchen", 
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    description: "Exposed brick, metal accents, open shelving",
    templateId: "industrial-kitchen"
  },
  {
    id: "scandinavian-dining",
    title: "Scandinavian Dining",
    style: "Scandinavian",
    room: "Dining Room",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop",
    description: "Light wood, functional design, cozy atmosphere",
    templateId: "scandinavian-dining"
  },
  {
    id: "art-deco-bathroom",
    title: "Art Deco Bathroom",
    style: "Art Deco",
    room: "Bathroom",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
    description: "Geometric patterns, luxury materials, vintage charm",
    templateId: "art-deco-bathroom"
  },
  {
    id: "coastal-patio",
    title: "Coastal Patio",
    style: "Coastal",
    room: "Outdoor",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    description: "Ocean-inspired colors, natural materials, relaxed vibe",
    templateId: "coastal-patio"
  },
  {
    id: "minimalist-office",
    title: "Minimalist Office",
    style: "Minimalist",
    room: "Office",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", 
    description: "Clean workspace, natural light, simple furniture",
    templateId: "minimalist-office"
  },
  {
    id: "mid-century-lounge",
    title: "Mid-Century Lounge",
    style: "Mid-Century",
    room: "Living Room",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=400&fit=crop",
    description: "Retro furniture, organic shapes, warm tones",
    templateId: "mid-century-lounge"
  },
  {
    id: "zen-meditation",
    title: "Japanese Zen Room",
    style: "Zen",
    room: "Meditation",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop",
    description: "Minimal furniture, natural elements, peaceful energy",
    templateId: "zen-meditation"
  }
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-card border-r border-border p-6 flex flex-col">
        <Link href="/" className="flex items-center space-x-3 mb-8">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-600 rounded flex items-center justify-center">
            <Home className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Design Muse
          </h1>
        </Link>
        
        <nav className="space-y-2 flex-1">
          <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg bg-primary text-primary-foreground">
            <Folder className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/design" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
            <Plus className="w-5 h-5" />
            <span>Design Studio</span>
          </Link>
          <Link href="/inspiration" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
            <Star className="w-5 h-5" />
            <span>Inspiration</span>
          </Link>
          <Link href="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* Theme Toggle at bottom of sidebar */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-wrap gap-4">
          {designExamples.map((example) => (
            <Link key={example.id} href={`/design?template=${example.templateId}`} className="w-[calc(33.333%-1rem)]">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group h-full flex flex-col">
                <div className="w-full h-48 bg-muted flex items-center justify-center">
                  <img src={example.image} alt={example.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-3 flex-1">
                  <h3 className="font-semibold text-sm mb-1">{example.title}</h3>
                  <div className="flex space-x-1">
                    <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                      {example.style}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full">
                      {example.room}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}