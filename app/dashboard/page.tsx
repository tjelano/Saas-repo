import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Sparkles, Star, TrendingUp, Users, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import DashboardHeader from "@/components/DashboardHeader";
import SupaUserInfo from "@/components/SupaUserInfo";
import SupaLogoutButton from "@/components/SupaLogoutButton";
import Image from "next/image";

// Example interior design renders data - aligned with Design Studio templates
const designExamples = [
  {
    id: "modern-living",
    title: "Modern Living Room",
    style: "Modern",
    room: "Living Room",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=400&fit=crop",
    description: "Clean lines, neutral palette, large windows",
    templateId: "modern-living",
    difficulty: "Easy",
    timeEstimate: "2-3 hours"
  },
  {
    id: "bohemian-bedroom",
    title: "Bohemian Bedroom",
    style: "Bohemian", 
    room: "Bedroom",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop",
    description: "Eclectic mix, warm colors, layered textures",
    templateId: "bohemian-bedroom",
    difficulty: "Medium",
    timeEstimate: "3-4 hours"
  },
  {
    id: "industrial-kitchen",
    title: "Industrial Kitchen",
    style: "Industrial",
    room: "Kitchen", 
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    description: "Exposed brick, metal accents, open shelving",
    templateId: "industrial-kitchen",
    difficulty: "Hard",
    timeEstimate: "4-5 hours"
  },
  {
    id: "scandinavian-dining",
    title: "Scandinavian Dining",
    style: "Scandinavian",
    room: "Dining Room",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop",
    description: "Light wood, functional design, cozy atmosphere",
    templateId: "scandinavian-dining",
    difficulty: "Easy",
    timeEstimate: "2-3 hours"
  },
  {
    id: "art-deco-bathroom",
    title: "Art Deco Bathroom",
    style: "Art Deco",
    room: "Bathroom",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
    description: "Geometric patterns, luxury materials, vintage charm",
    templateId: "art-deco-bathroom",
    difficulty: "Medium",
    timeEstimate: "3-4 hours"
  },
  {
    id: "coastal-patio",
    title: "Coastal Patio",
    style: "Coastal",
    room: "Outdoor",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    description: "Ocean-inspired colors, natural materials, relaxed vibe",
    templateId: "coastal-patio",
    difficulty: "Easy",
    timeEstimate: "2-3 hours"
  },
  {
    id: "minimalist-office",
    title: "Minimalist Office",
    style: "Minimalist",
    room: "Office",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", 
    description: "Clean workspace, natural light, simple furniture",
    templateId: "minimalist-office",
    difficulty: "Easy",
    timeEstimate: "2-3 hours"
  },
  {
    id: "mid-century-lounge",
    title: "Mid-Century Lounge",
    style: "Mid-Century",
    room: "Living Room",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=400&fit=crop",
    description: "Retro furniture, organic shapes, warm tones",
    templateId: "mid-century-lounge",
    difficulty: "Medium",
    timeEstimate: "3-4 hours"
  },
  {
    id: "zen-meditation",
    title: "Japanese Zen Room",
    style: "Zen",
    room: "Meditation",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop",
    description: "Minimal furniture, natural elements, peaceful energy",
    templateId: "zen-meditation",
    difficulty: "Hard",
    timeEstimate: "4-5 hours"
  }
];

const stats = [
  { label: "Designs Created", value: "24", icon: Sparkles, change: "+12%", changeType: "positive" },
  { label: "Time Saved", value: "48h", icon: Zap, change: "+8%", changeType: "positive" },
  { label: "Projects Active", value: "6", icon: TrendingUp, change: "+2", changeType: "positive" },
  { label: "Collaborators", value: "3", icon: Users, change: "+1", changeType: "positive" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  Dashboard
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Welcome back! Ready to create something beautiful?
                </p>
              </div>
              <Link href="/design">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Design
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className={`text-xs font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-muted">
                      <stat.icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Design Templates Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Design Templates</h2>
                <p className="text-muted-foreground">Choose from our curated collection of design styles</p>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-muted-foreground">9 templates available</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designExamples.map((example) => (
                <Link key={example.id} href={`/design?template=${example.templateId}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="relative">
                      <div className="w-full h-48 bg-muted flex items-center justify-center overflow-hidden">
                        <div className="relative w-full h-full">
                          <Image 
                            src={example.image} 
                            alt={example.title} 
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300" 
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          example.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                          example.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                        }`}>
                          {example.difficulty}
                        </span>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <div className="space-y-2">
                        <CardTitle className="text-lg font-semibold">{example.title}</CardTitle>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{example.style} • {example.room}</span>
                          <span>{example.timeEstimate}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{example.description}</p>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
              <p className="text-muted-foreground">Your latest design projects and collaborations</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Recent Designs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">M</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Modern Living Room</p>
                        <p className="text-sm text-muted-foreground">Completed 2 hours ago</p>
                      </div>
                      <Badge variant="secondary">Modern</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">S</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Scandinavian Bedroom</p>
                        <p className="text-sm text-muted-foreground">Completed yesterday</p>
                      </div>
                      <Badge variant="secondary">Scandinavian</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Team Collaborations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">JD</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">John Doe shared a design</p>
                        <p className="text-sm text-muted-foreground">Industrial Kitchen concept</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">AS</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Alice Smith commented</p>
                        <p className="text-sm text-muted-foreground">On your Coastal Patio design</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}