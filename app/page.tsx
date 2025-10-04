import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Rocket, Eye, Waves, User, Sparkles, Globe, Satellite } from "lucide-react"
import { SpaceGallery } from "@/components/space-gallery"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
      <div className="absolute inset-0">
        <div className="nebula" />
        <div className="starfield" />
        <div className="shooting-star" style={{ top: "10%", left: "20%", animationDelay: "0s" }} />
        <div className="shooting-star" style={{ top: "60%", left: "70%", animationDelay: "2s" }} />
        <div className="shooting-star" style={{ top: "30%", left: "50%", animationDelay: "4s" }} />

        {/* Floating planets */}
        <div className="planet planet-earth animate-float" style={{ top: "15%", right: "10%", animationDelay: "0s" }} />
        <div className="planet planet-mars animate-float" style={{ bottom: "20%", left: "8%", animationDelay: "1s" }} />
        <div
          className="planet planet-jupiter animate-float"
          style={{ top: "50%", right: "5%", animationDelay: "2s", opacity: 0.4 }}
        />
      </div>

      <nav className="relative z-10 border-b border-primary/20 backdrop-blur-xl bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <Rocket className="h-8 w-8 text-primary transition-transform group-hover:scale-110 group-hover:-rotate-12 duration-500 animate-pulse-glow" />
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div>
                <span className="text-xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  ISS Experience
                </span>
                <p className="text-xs text-muted-foreground">NASA Challenge 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/cupola" className="text-sm font-medium hover:text-primary transition-smooth relative group">
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Cupola
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/nbl" className="text-sm font-medium hover:text-secondary transition-smooth relative group">
                <span className="flex items-center gap-2">
                  <Waves className="h-4 w-4" />
                  NBL Training
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-accent group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                href="/customize"
                className="text-sm font-medium hover:text-accent transition-smooth relative group"
              >
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customize
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 border border-primary/40 rounded-full text-sm font-medium text-primary mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:scale-105 transition-bounce backdrop-blur-sm">
            <Sparkles className="h-4 w-4 animate-pulse-glow" />
            NASA Space Apps Challenge 2025
            <Satellite className="h-4 w-4 animate-pulse-glow" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <span className="block mb-2">Experience the</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">
              International Space Station
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Explore Earth from the <span className="text-primary font-semibold">Cupola</span> and train like an
            astronaut in the <span className="text-secondary font-semibold">Neutral Buoyancy Laboratory</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:scale-105 transition-bounce group relative overflow-hidden"
              asChild
            >
              <Link href="/customize">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <User className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform relative z-10" />
                <span className="relative z-10">Create Astronaut</span>
              </Link>
            </Button>

            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 hover:scale-105 transition-bounce group relative overflow-hidden"
              asChild
            >
              <Link href="/cupola">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Enter Cupola</span>
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-background/30 backdrop-blur-md hover:bg-background/50 hover:scale-105 transition-bounce group border-2 border-primary/30 hover:border-secondary/50"
              asChild
            >
              <Link href="/nbl">
                <Waves className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                NBL Training
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-card/80 via-card/60 to-primary/5 backdrop-blur-md border-primary/30 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 transition-smooth hover:-translate-y-2 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
            <div className="space-y-4 relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center group-hover:from-primary/40 group-hover:to-primary/20 transition-smooth group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-primary/20">
                <Eye className="h-8 w-8 text-primary animate-pulse-glow" />
              </div>
              <h3 className="text-2xl font-bold text-balance">Cupola Experience</h3>
              <p className="text-muted-foreground leading-relaxed">
                View Earth from the ISS Cupola. Navigate to different geographic locations and discover unique
                scientific observations captured by astronauts.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground pt-2">
                <li className="flex items-start gap-3 group/item">
                  <Globe className="h-5 w-5 text-primary mt-0.5 group-hover/item:scale-125 group-hover/item:rotate-12 transition-transform" />
                  <span>Customize your astronaut character</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <Satellite className="h-5 w-5 text-primary mt-0.5 group-hover/item:scale-125 transition-transform" />
                  <span>Explore real NASA imagery from space</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <Sparkles className="h-5 w-5 text-primary mt-0.5 group-hover/item:scale-125 transition-transform" />
                  <span>Learn about Earth observations and science</span>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card/80 via-card/60 to-secondary/5 backdrop-blur-md border-secondary/30 hover:border-secondary/60 hover:shadow-2xl hover:shadow-secondary/20 transition-smooth hover:-translate-y-2 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500" />
            <div className="space-y-4 relative z-10">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center group-hover:from-secondary/40 group-hover:to-secondary/20 transition-smooth group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-secondary/20">
                <Waves className="h-8 w-8 text-secondary animate-pulse-glow" />
              </div>
              <h3 className="text-2xl font-bold text-balance">NBL Training Simulator</h3>
              <p className="text-muted-foreground leading-relaxed">
                Train like a real astronaut in the Neutral Buoyancy Laboratory. Adjust your weight, achieve neutral
                buoyancy, and complete underwater missions.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground pt-2">
                <li className="flex items-start gap-3 group/item">
                  <span className="text-secondary mt-1 text-lg group-hover/item:scale-125 transition-transform">⚖️</span>
                  <span>Calculate and adjust buoyancy for neutral float</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <span className="text-secondary mt-1 text-lg group-hover/item:scale-125 transition-transform">
                    🔧
                  </span>
                  <span>Complete simulated spacewalk tasks</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <span className="text-secondary mt-1 text-lg group-hover/item:scale-125 transition-transform">
                    🌙
                  </span>
                  <span>Explore lunar surface simulation missions</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6 p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border border-primary/30 backdrop-blur-md shadow-2xl shadow-primary/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Understanding Space to Benefit Earth</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              The International Space Station serves as a unique laboratory for scientific research that benefits
              humanity. Through the Cupola, astronauts observe Earth's climate, weather patterns, and natural phenomena.
              The Neutral Buoyancy Laboratory prepares astronauts for the challenges of working in microgravity,
              advancing our capabilities for future space exploration.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 container mx-auto px-4 py-20">
        <SpaceGallery />
      </section>

      <footer className="relative z-10 border-t border-primary/20 mt-20 backdrop-blur-xl bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Rocket className="h-6 w-6 text-primary animate-pulse-glow" />
              <div>
                <span className="text-sm font-semibold text-foreground">NASA Challenge 2025</span>
                <p className="text-xs text-muted-foreground">Space Apps Challenge</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://www.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-smooth flex items-center gap-1"
              >
                <Globe className="h-4 w-4" />
                NASA.gov
              </a>
              <a
                href="https://www.nasa.gov/international-space-station"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-smooth flex items-center gap-1"
              >
                <Satellite className="h-4 w-4" />
                ISS Research
              </a>
              <a
                href="https://images.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-smooth flex items-center gap-1"
              >
                <Sparkles className="h-4 w-4" />
                NASA Images
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
