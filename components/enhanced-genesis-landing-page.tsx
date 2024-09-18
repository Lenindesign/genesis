'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { ArrowRight, Facebook, Instagram, Twitter, Youtube, Menu, Search, Sun, Moon, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

// Photo Gallery Component

const PhotoGallery: React.FC<{ photos: { src: string; alt: string; title: string; description: string }[]; isOpen: boolean; onClose: () => void; initialPhotoIndex: number }> = ({ photos, isOpen, onClose, initialPhotoIndex }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(initialPhotoIndex)

  useEffect(() => {
    setCurrentPhotoIndex(initialPhotoIndex)
  }, [initialPhotoIndex])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { // Explicitly type 'e' as KeyboardEvent
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleOutsideClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => { // Use React.MouseEvent with HTMLDivElement
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  if (!isOpen) return null

  const currentPhoto = photos[currentPhotoIndex]

  const goToPrevious = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : photos.length - 1))
  }

  const goToNext = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex < photos.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" onClick={handleOutsideClick}>
      <div className="relative w-full max-w-4xl mx-auto" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute top-4 left-4 text-white hover:text-gray-300 z-10"
          aria-label="Close gallery"
        >
          <X size={24} />
        </button>
        <div className="relative aspect-video">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={goToPrevious} 
            className="text-white hover:text-gray-300"
            aria-label="Previous photo"
          >
            <ChevronLeft size={36} />
          </Button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={goToNext} 
            className="text-white hover:text-gray-300"
            aria-label="Next photo"
          >
            <ChevronRight size={36} />
          </Button>
        </div>
        <div className="mt-4 text-white text-left">
          <h3 className="text-2xl font-light mb-2">{currentPhoto.title}</h3>
          <p className="text-lg font-light">{currentPhoto.description}</p>
        </div>
      </div>
    </div>
  )
}

// Enhanced Style Guide Component
const ColorSwatch: React.FC<{ color: string; name: string; hex: string }> = ({ color, name, hex }) => (
  <div className="flex flex-col items-center">
    <div className={`w-20 h-20 rounded-full ${color}`}></div>
    <p className="mt-2 text-sm font-medium">{name}</p>
    <p className="text-xs text-gray-500">{hex}</p>
  </div>
)

const EnhancedStyleGuide = () => {
  return (
    <div className="p-6 bg-background text-foreground">
      <h2 className="text-3xl font-light mb-6">Enhanced Style Guide</h2>
      
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Primary colors and their variations used throughout the application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch color="bg-background" name="Background" hex="#111827" />
                <ColorSwatch color="bg-foreground" name="Foreground" hex="#FFFFFF" />
                <ColorSwatch color="bg-primary" name="Primary" hex="#3B82F6" />
                <ColorSwatch color="bg-secondary" name="Secondary" hex="#1F2937" />
                <ColorSwatch color="bg-accent" name="Accent" hex="#22D3EE" />
                <ColorSwatch color="bg-muted" name="Muted" hex="#374151" />
                <ColorSwatch color="bg-card" name="Card" hex="#1F2937" />
                <ColorSwatch color="bg-card-foreground" name="Card Foreground" hex="#FFFFFF" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="typography">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Font styles and sizes used in the application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Headings</h3>
                  <h1 className="text-4xl font-light">Heading 1</h1>
                  <h2 className="text-3xl font-light">Heading 2</h2>
                  <h3 className="text-2xl font-light">Heading 3</h3>
                  <h4 className="text-xl font-light">Heading 4</h4>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Body Text</h3>
                  <p className="text-base">Regular paragraph text</p>
                  <p className="text-sm">Smaller paragraph text</p>
                  <p className="text-xs">Extra small text</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Font Weights</h3>
                  <p className="font-light">Light (300)</p>
                  <p className="font-normal">Regular (400)</p>
                  <p className="font-medium">Medium (500)</p>
                  <p className="font-semibold">Semibold (600)</p>
                  <p className="font-bold">Bold (700)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="components">
          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
              <CardDescription>Common UI components used throughout the application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Buttons</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="link">Link Button</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Input Fields</h3>
                  <div className="space-y-4 max-w-sm">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Enter your email" type="email" />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" placeholder="Enter your password" type="password" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Switch</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Slider</h3>
                  <Slider defaultValue={[33]} max={100} step={1} />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Cards</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card description goes here.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>This is the main content of the card.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Interactive Card</CardTitle>
                        <CardDescription>This card has an interactive element.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">
                          Click me <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Icons</h3>
                  <div className="flex gap-4">
                    <Sun className="h-6 w-6" />
                    <Moon className="h-6 w-6" />
                    <ArrowRight className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function EnhancedGenesisLandingPageComponent() {
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [initialPhotoIndex, setInitialPhotoIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    setMounted(true)
    setTheme('dark') // Set the initial theme to dark
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setTheme])

  const photos = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gene-stoEpGHROtvOKJrpBvhN85rwQ3wIzR.jpg",
      alt: "Genesis GV60 Magma concept in stormy desert",
      title: "Genesis GV60 Magma Concept",
      description: "A futuristic concept showcasing Genesis' vision for electric vehicles, set against a dramatic desert backdrop."
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g70-gmoYYdN1s3rwK0tmoHfHoqDKkF7SWP.jpg",
      alt: "Genesis G70 - Red luxury sedan driving on a winding road through a forested mountain landscape",
      title: "Genesis G70",
      description: "The G70 sports sedan, combining performance and luxury, shown navigating scenic mountain roads."
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g80-uHu8VPiiy47SWunWzw60P5qseM3wWW.jpg",
      alt: "Genesis G80 - Burgundy sedan showcasing its front design, parked in front of a modern concrete structure with a grassy hill and mountains in the background",
      title: "Genesis G80",
      description: "The elegant G80 sedan, featuring Genesis' signature design language, set against modern architecture and natural landscapes."
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gv80-OQknKeDGknWIZPFQUDfY36cy6xWTnM.jpg",
      alt: "Genesis GV80 - Silver SUV in motion on a city street, showcasing its front design",
      title: "Genesis GV80",
      description: "The luxurious GV80 SUV, demonstrating its urban prowess and sophisticated design on city streets."
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2-kw8Y3DrVRrpiUmF3sWsfcE6q5xM8s6.jpg",
      alt: "Genesis concept car interior",
      title: "Genesis Concept Interior",
      description: "A glimpse into the future of Genesis interiors, showcasing innovative design and cutting-edge technology."
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/genesis-design-ZvM0i6hMwm1CAI2raHHkgJHXamKpBO.webp",
      alt: "Genesis designer sitting at a desk with an open notebook, surrounded by flowing white lines suggesting car designs",
      title: "Genesis Design Process",
      description: "Behind the scenes of Genesis' design philosophy, where creativity meets precision in crafting the future of luxury vehicles."
    }
  ]

  const openGallery = (index: number) => { // Explicitly type 'index' as number
    setInitialPhotoIndex(index)
    setIsGalleryOpen(true)
  }

  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  }

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.6,
      },
    },
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white transition-colors duration-300 font-light">
      {/* Main Navigation */}
      <nav className="bg-gray-900 text-white fixed w-full z-50 top-0 left-0 right-0 border-b border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="w-48 h-12 relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-genesis-7mmQ262umruvPDO8MBuwUVCx54LwiK.png"
                alt="Genesis Logo"
                layout="fill"
                objectFit="contain"
                className="w-full"
              />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#" className="hover:text-primary transition-colors">Models</Link>
              <Link href="#" className="hover:text-primary transition-colors">Experience</Link>
              <Link href="#" className="hover:text-primary transition-colors">About</Link>
              <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="hover:text-primary transition-colors">Style Guide</button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Style Guide</DialogTitle>
                    <DialogDescription>
                      Explore the design elements of our website.
                    </DialogDescription>
                  </DialogHeader>
                  <EnhancedStyleGuide />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-800 border-gray-600 rounded-none text-white placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-none text-white"
            >
              <Sun size={20} />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-40 flex items-center justify-center transition-colors duration-300">
          <div className="flex flex-col items-center space-y-6 text-2xl text-white">
            <Link href="#" className="hover:text-primary transition-colors">Models</Link>
            <Link href="#" className="hover:text-primary transition-colors">Experience</Link>
            <Link href="#" className="hover:text-primary transition-colors">About</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:text-primary transition-colors">Style Guide</button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Style Guide</DialogTitle>
                  <DialogDescription>
                    Explore the design elements of our website.
                  </DialogDescription>
                </DialogHeader>
                <EnhancedStyleGuide />
              </DialogContent>
            </Dialog>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-800 border-gray-600 rounded-none text-white placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-none text-white"
            >
              <Sun size={20} />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <button onClick={() => setIsMenuOpen(false)} className="mt-8 text-lg">Close</button>
          </div>
        </div>
      )}

      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden pt-16">
        {/* Sky layer */}
        <div
          className="absolute inset-0 z-0 cursor-pointer"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
          onClick={() => openGallery(0)}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gene-stoEpGHROtvOKJrpBvhN85rwQ3wIzR.jpg"
            alt="Stormy sky over desert"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        {/* Background cars layer */}
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
          onClick={() => openGallery(0)}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gene-stoEpGHROtvOKJrpBvhN85rwQ3wIzR.jpg"
            alt="Genesis cars in the background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        {/* Foreground car layer */}
        <div
          className="absolute inset-0 z-20 cursor-pointer"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
          onClick={() => openGallery(0)}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gene-stoEpGHROtvOKJrpBvhN85rwQ3wIzR.jpg"
            alt="Genesis GV60 Magma concept in the foreground"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        {/* Content layer */}
        <div className="relative z-30 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <motion.h1
              className="text-6xl md:text-8xl font-light mb-6"
              initial="hidden"
              animate="visible"
              variants={headlineVariants}
            >
              Driven by Innovation
            </motion.h1>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={ctaVariants}
            >
              <Button className="bg-white text-gray-900 px-8 py-3 text-lg font-light hover:bg-gray-100 transition-colors duration-300 rounded-none relative overflow-hidden group">
                <span className="relative z-10">Explore Genesis</span>
                <span className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 flex-grow">
        {/* About Section */}
        <section className="mb-32">
          <h2 className="text-5xl font-light mb-8">The Future of Luxury</h2>
          <p className="text-xl max-w-3xl font-light">
            Genesis represents the pinnacle of automotive luxury, blending cutting-edge technology with timeless
            elegance. Our commitment to innovation drives us to redefine what is possible in the world of premium
            vehicles.
          </p>
        </section>

        {/* Gallery Section */}
        <section className="mb-32">
          <h2 className="text-5xl font-light mb-12">Our Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative h-96 overflow-hidden group cursor-pointer" onClick={() => openGallery(1)}>
              <div className="absolute inset-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g70-gmoYYdN1s3rwK0tmoHfHoqDKkF7SWP.jpg"
                  alt="Genesis G70 - Red luxury sedan driving on a winding road through a forested mountain landscape"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <h3 className="text-white text-3xl font-light">G70</h3>
              </div>
            </div>
            <div className="relative h-96 overflow-hidden group cursor-pointer" onClick={() => openGallery(2)}>
              <div className="absolute inset-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g80-uHu8VPiiy47SWunWzw60P5qseM3wWW.jpg"
                  alt="Genesis G80 - Burgundy sedan showcasing its front design, parked in front of a modern concrete structure with a grassy hill and mountains in the background"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <h3 className="text-white text-3xl font-light">G80</h3>
              </div>
            </div>
            <div className="relative h-96 overflow-hidden group cursor-pointer" onClick={() => openGallery(3)}>
              <div className="absolute inset-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gv80-OQknKeDGknWIZPFQUDfY36cy6xWTnM.jpg"
                  alt="Genesis GV80 - Silver SUV in motion on a city street, showcasing its front design"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <h3 className="text-white text-3xl font-light">GV80</h3>
              </div>
            </div>
          </div>
        </section>

        {/* New Parallax Hero Section */}
        <section className="relative h-screen overflow-hidden mb-32">
          <div
            className="absolute inset-0 cursor-pointer"
            style={{
              transform: `translateY(${(scrollY - 1500) * 0.1}px)`,
            }}
            onClick={() => openGallery(4)}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2-kw8Y3DrVRrpiUmF3sWsfcE6q5xM8s6.jpg"
              alt="Genesis concept car interior"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white bg-black bg-opacity-50 p-8">
              <h2 className="text-4xl md:text-6xl font-light mb-4">Experience the Future</h2>
              <p className="text-xl mb-6 font-light">Step into a world where luxury meets innovation</p>
              <Button className="bg-white text-gray-900 px-8 py-3 text-lg font-light hover:bg-gray-100 transition-colors duration-300 rounded-none">
                Discover More
              </Button>
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="mb-32">
          <h2 className="text-5xl font-light mb-12">Innovative Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-light mb-4">Advanced Driver Assistance</h3>
              <p className="text-lg font-light">
                Experience the future of driving with our state-of-the-art driver assistance technologies, 
                including adaptive cruise control, lane keeping assist, and autonomous emergency braking.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-light mb-4">Sustainable Luxury</h3>
              <p className="text-lg font-light">
                Our commitment to sustainability is reflected in our use of eco-friendly materials and 
                development of electric and hybrid powertrains without compromising on luxury.
              </p>
            </div>
          </div>
        </section>

        {/* Design Philosophy Section */}
        <section className="mb-32">
          <h2 className="text-5xl font-light mb-12">Design Philosophy</h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 cursor-pointer" onClick={() => openGallery(5)}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/genesis-design-ZvM0i6hMwm1CAI2raHHkgJHXamKpBO.webp"
                alt="Genesis designer sitting at a desk with an open notebook, surrounded by flowing white lines suggesting car designs"
                width={600}
                height={400}
                className="shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-light mb-4">Athletic Elegance</h3>
              <p className="text-lg font-light">
                Our design philosophy, Athletic Elegance, embodies the harmony between dynamic performance 
                and sophisticated luxury. Every curve and line is purposefully crafted to create a sense of 
                motion even when the vehicle is stationary.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mb-32">
          <h2 className="text-5xl font-light mb-12">Stay Informed</h2>
          <form className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow rounded-none bg-gray-800 border-gray-700 text-white"
                required
              />
              <Button className="bg-primary text-primary-foreground px-8 py-3 text-lg font-light hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center rounded-none">
                Subscribe <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white w-full border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 w-48 h-12 relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-genesis-7mmQ262umruvPDO8MBuwUVCx54LwiK.png"
                alt="Genesis Logo"
                layout="fill"
                objectFit="contain"
                className="w-full"
              />
            </div>
            <nav className="flex space-x-6 mb-6 md:mb-0">
              <Link href="#" className="hover:text-primary transition-colors">Models</Link>
              <Link href="#" className="hover:text-primary transition-colors">Experience</Link>
              <Link href="#" className="hover:text-primary transition-colors">About</Link>
              <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
            </nav>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Twitter size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Youtube size={24} />
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm font-light">
            © {new Date().getFullYear()} Genesis. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Photo Gallery */}
      <PhotoGallery
        photos={photos}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialPhotoIndex={initialPhotoIndex}
      />
    </div>
  )
}