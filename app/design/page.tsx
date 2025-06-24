"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { UploadCloud, Sparkles, Settings, Home, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

const stylePrompts: { [key: string]: string } = {
  Modern: "A modern living room with minimalist design, open space, large windows, neutral color palette, sleek furniture, and subtle accent lighting",
  Farmhouse: "A warm farmhouse kitchen featuring rustic wooden beams, white shiplap walls, vintage-inspired fixtures, open shelving, and a large farmhouse sink",
  Scandinavian: "A Scandinavian bedroom with abundant natural light, white and pale wood tones, minimalist furniture, cozy textiles, and touches of greenery",
  Industrial: "An industrial loft with exposed brick walls, concrete floors, black metal fixtures, large factory windows, and reclaimed wood accents",
  Coastal: "A coastal living room with soft blue and white tones, natural textures like rattan and linen, large windows, and beach-inspired decor",
  Bohemian: "A bohemian reading nook filled with colorful patterned textiles, layered rugs, hanging plants, eclectic furniture, and artistic decor",
};
const stylePresets = ["Modern", "Farmhouse", "Scandinavian", "Industrial", "Coastal", "Bohemian", "Custom"];

export default function DesignStudio() {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [beforeImageFile, setBeforeImageFile] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("Modern");
  const [customPrompt, setCustomPrompt] = useState(stylePrompts["Modern"]);
  const [negativePrompt, setNegativePrompt] = useState("lowres, watermark, banner, logo, text, deformed, blurry, ugly, mirror");
  const [styleFidelity, setStyleFidelity] = useState(0.8);
  const [creativeGuidance, setCreativeGuidance] = useState(15);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userCustomPrompt, setUserCustomPrompt] = useState("");
  const [lastStyle, setLastStyle] = useState("Modern");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBeforeImageFile(file);
      setBeforeImage(URL.createObjectURL(file));
    }
  };

  const handleStyleSelect = (style: string) => {
    if (style === "Custom") {
      setSelectedStyle("Custom");
      setCustomPrompt(userCustomPrompt || "");
      return;
    }
    if (
      selectedStyle === "Custom" ||
      customPrompt === stylePrompts[selectedStyle] ||
      customPrompt === ""
    ) {
      setCustomPrompt(stylePrompts[style]);
    } else {
      setUserCustomPrompt(customPrompt);
    }
    setSelectedStyle(style);
    setLastStyle(style);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPrompt(e.target.value);
    if (selectedStyle !== "Custom") {
      setUserCustomPrompt(e.target.value);
      setSelectedStyle("Custom");
    }
  };

  const handleGenerate = async () => {
    if (!beforeImageFile) {
      alert("Please upload an image first.");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    const formData = new FormData();
    formData.append("image", beforeImageFile);
    const params = {
      prompt: `In the style of ${selectedStyle}, ${customPrompt}`,
      negative_prompt: negativePrompt,
      prompt_strength: styleFidelity,
      guidance_scale: creativeGuidance,
      num_inference_steps: 50,
    };
    formData.append("params", JSON.stringify(params));

    try {
      const response = await fetch("/api/replicate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image.");
      }

      const result = await response.json();
      if (result.output && typeof result.output === 'string') {
        setGeneratedImage(result.output);
      } else {
        throw new Error("No image was generated.");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
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

      {/* Main Content */}
      <div className="container mx-auto px-6 space-y-4 pb-8">
        <div className="space-y-2 pt-4">
            <h1 className="text-2xl font-bold">AI Design Studio</h1>
            <p className="text-muted-foreground text-sm">Transform your space with AI-powered interior design</p>
        </div>

        {/* Before & After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Original */}
          <div className="space-y-2">
            <h2 className="text-md font-semibold">Original</h2>
            <Card className="aspect-video flex items-center justify-center p-2">
              <label htmlFor="image-upload-btn" className="w-full h-full flex items-center justify-center cursor-pointer">
                {beforeImage ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={beforeImage} 
                      alt="Uploaded preview" 
                      fill
                      className="rounded-lg object-cover" 
                    />
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <UploadCloud className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-sm">Upload an image to see preview</p>
                  </div>
                )}
              </label>
            </Card>
          </div>
          {/* AI Generated */}
          <div className="space-y-2">
            <h2 className="text-md font-semibold">AI Generated</h2>
            <Card className="aspect-video flex items-center justify-center p-2">
              {isGenerating ? (
                  <div className="text-center text-muted-foreground">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-sm">Generating design...</p>
                  </div>
              ) : generatedImage ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={generatedImage} 
                    alt="Generated design" 
                    fill
                    className="rounded-lg object-cover" 
                  />
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="font-semibold text-sm">Generated design will appear here</p>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Control Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Upload & Style */}
          <Card className="lg:col-span-1">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center text-md"><UploadCloud className="w-4 h-4 mr-2" /> Upload & Style</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-0">
              <label htmlFor="image-upload-btn" className="cursor-pointer w-full">
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center hover:bg-muted/50 transition-colors">
                  <UploadCloud className="w-6 h-6 mx-auto mb-1 opacity-50" />
                  <p className="font-semibold text-sm">Click to upload</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
                <input id="image-upload-btn" type="file" className="hidden" onChange={handleImageUpload} accept="image/png, image/jpeg" />
              </label>

              <div>
                <Label className="text-xs">Style Presets</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {stylePresets.map((style) => (
                    <Button
                      key={style}
                      size="sm"
                      variant={selectedStyle === style ? "default" : "outline"}
                      onClick={() => handleStyleSelect(style)}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prompts */}
          <Card className="lg:col-span-1">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center text-md"><Sparkles className="w-4 h-4 mr-2" /> Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-0">
              <div>
                <Label htmlFor="design-prompt" className="text-xs">Design Prompt</Label>
                <Textarea
                  id="design-prompt"
                  value={customPrompt}
                  onChange={handlePromptChange}
                  rows={2}
                  className="text-xs"
                />
              </div>
              <div>
                <Label htmlFor="negative-prompt" className="text-xs">Negative Prompt (what to avoid)</Label>
                <Textarea
                  id="negative-prompt"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  rows={2}
                  className="text-xs"
                />
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card className="lg:col-span-1">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center text-md"><Settings className="w-4 h-4 mr-2" /> Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-0">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="style-fidelity" className="text-xs">Style Fidelity</Label>
                  <span className="text-xs">{styleFidelity.toFixed(1)}</span>
                </div>
                <Slider
                  id="style-fidelity"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[styleFidelity]}
                  onValueChange={(value) => setStyleFidelity(value[0])}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="creative-guidance" className="text-xs">Creative Guidance</Label>
                  <span className="text-xs">{creativeGuidance}</span>
                </div>
                <Slider
                  id="creative-guidance"
                  min={1}
                  max={20}
                  step={1}
                  value={[creativeGuidance]}
                  onValueChange={(value) => setCreativeGuidance(value[0])}
                />
              </div>
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Design
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 