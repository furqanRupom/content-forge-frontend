"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Zap,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  LayoutTemplate,
  Star,
  BarChart3,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const staticLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const productLinks = [
  { label: "AI Generation", href: "#generation", icon: Sparkles, desc: "Create layout content in seconds" },
  { label: "Templates", href: "/templates", icon: LayoutTemplate, desc: "500+ ready-made templates" },
  { label: "Favorites", href: "/dashboard/favorites", icon: Star, desc: "Save your best outputs" },
  { label: "Dashboard", href: "/dashboard", icon: BarChart3, desc: "Track performance & analytics" },
];

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        scrolled
          ? "py-2.5 bg-background/80 border-b border-border/40 shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Branding & Navigation Section */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group tracking-tight">
            <div className="relative w-7 h-7 rounded-sm flex items-center justify-center bg-primary text-primary-foreground shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-current" strokeWidth={2} />
            </div>
            <span className="font-sans font-bold text-base text-foreground tracking-tight">
              Content<span className="text-primary">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation Links Container */}
          <div className="hidden md:flex items-center gap-1 border-l border-border pl-4 h-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground rounded-sm hover:bg-accent/50 transition-all duration-150 cursor-pointer outline-none">
                  Product <ChevronDown className="w-3 h-3 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-popover border-border/60 w-[400px] p-2 grid grid-cols-2 gap-1 mt-2 shadow-lg rounded-sm">
                {productLinks.map(({ label, href, icon: Icon, desc }) => (
                  <DropdownMenuItem key={label} asChild>
                    <Link href={href} className="flex gap-3 p-2 rounded-sm hover:bg-accent transition-all cursor-pointer group/item">
                      <div className="p-2 rounded-sm bg-primary/10 text-primary group-hover/item:bg-primary/20 transition-colors h-fit">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5 leading-normal">{desc}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {staticLinks.map(({ label, href }) => (
              <Link key={label} href={href} className="px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground rounded-sm hover:bg-accent/50 transition-all duration-150">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Action Menu Group */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-sm w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-accent/50"
            aria-label="Toggle layout theme"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="w-3.5 h-3.5" />
            ) : (
              <Moon className="w-3.5 h-3.5" />
            )}
          </Button>

          <Link href="/login">
            <Button variant="ghost" size="sm" className="rounded-sm h-8 px-3 text-xs font-bold text-muted-foreground hover:text-foreground">
              Sign in
            </Button>
          </Link>

          <Link href="/register">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-8 px-3.5 font-bold rounded-sm shadow-sm transition-all">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile View Navigation Controls */}
        <div className="flex md:hidden items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-sm w-8 h-8 text-muted-foreground hover:text-foreground" 
            aria-label="Toggle theme"
          >
            {mounted && resolvedTheme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-sm w-8 h-8 text-muted-foreground hover:text-foreground" 
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Context Drawer Menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-background/95 border-border/40",
        mobileOpen ? "max-h-[400px] opacity-100 border-b shadow-md" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 py-3 space-y-1 mt-1">
          {productLinks.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(false)}>
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-foreground">{label}</span>
            </Link>
          ))}
          
          {staticLinks.map(({ label, href }) => (
            <Link key={label} href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(false)}>
              <span className="text-xs font-bold text-foreground pl-7">{label}</span>
            </Link>
          ))}

          <div className="border-t border-border/60 pt-3 mt-2 flex items-center justify-between gap-2">
            <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full text-xs h-8 rounded-sm justify-center font-bold">Sign in</Button>
            </Link>
            <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button className="w-full text-xs h-8 rounded-sm justify-center font-bold bg-primary text-primary-foreground">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
