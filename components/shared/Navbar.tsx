"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
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
import Logo from "../logo/LogoIcon";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/services/auth.service";
import UserDropdown from "../modules/Dashboard/UserDropdown";

const staticLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll using Motion's optimized hook without traditional useEffect listeners
  const { scrollY } = useScroll();
  scrollY.on("change", (latest) => {
    setScrolled(latest > 15);
  });

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      try {
        return await getUserInfo();
      } catch {
        return null;
      }
    },
  });

  const getDynamicDashboardRoute = () => {
    if (!userInfo?.role) return "/dashboard";
    const role = userInfo.role.toUpperCase();
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "MANAGER") return "/manager/dashboard";
    return "/dashboard";
  };

  const dashboardHref = getDynamicDashboardRoute();

  const productLinks = [
    { label: "AI Generation", href: "#generation", icon: Sparkles, desc: "Create layout content in seconds" },
    { label: "Templates", href: "/templates", icon: LayoutTemplate, desc: "500+ ready-made templates" },
    { label: "Favorites", href: `${dashboardHref}/favorites`, icon: Star, desc: "Save your best outputs" },
    { label: "Dashboard", href: dashboardHref, icon: BarChart3, desc: "Track performance & analytics" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-md",
        scrolled
          ? "py-2.5 bg-background/80 border-b border-border/40 shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Branding & Navigation Section */}
        <div className="flex items-center gap-6">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Logo />
          </motion.div>

          {/* Desktop Navigation Links Container */}
          <div className="hidden md:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground rounded-sm hover:bg-accent/50 transition-colors cursor-pointer outline-none"
                >
                  Product <ChevronDown className="w-3 h-3 opacity-70" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent asChild>
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-popover border-border/60 w-[400px] p-2 grid grid-cols-2 gap-1 shadow-lg rounded-sm"
                >
                  {productLinks.map(({ label, href, icon: Icon, desc }) => (
                    <DropdownMenuItem key={label} asChild>
                      <Link href={href} className="flex gap-3 p-2 rounded-sm hover:bg-accent transition-colors cursor-pointer group/item">
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
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>

            {staticLinks.map(({ label, href }) => (
              <Link key={label} href={href}>
                <motion.span 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground rounded-sm hover:bg-accent/50 transition-colors"
                >
                  {label}
                </motion.span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Action Menu Group */}
        <div className="hidden md:flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="rounded-sm w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-accent/50"
              aria-label="Toggle layout theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </Button>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isLoading && userInfo ? (
              <motion.div
                key="user-dropdown"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <UserDropdown userInfo={userInfo} />
              </motion.div>
            ) : !isLoading ? (
              <motion.div
                key="auth-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="rounded-sm cursor-pointer h-8 px-3 text-xs font-bold text-muted-foreground hover:text-foreground">
                    Sign in
                  </Button>
                </Link>

                <Link href="/register">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button size="sm" className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 text-xs h-8 px-3.5 font-bold rounded-sm shadow-sm">
                      Get Started
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-8 w-8 rounded-sm bg-muted/20 border border-border/40 animate-pulse"
              />
            )}
          </AnimatePresence>
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
            {resolvedTheme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
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

      {/* Mobile Context Drawer Menu with Motion Animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-background/95 border-b border-border/40 shadow-md backdrop-blur-md"
          >
            <div className="px-4 py-3 space-y-1 mt-1">
              {productLinks.map(({ label, href, icon: Icon }, index) => (
                <motion.div
                  key={label}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.04, duration: 0.2 }}
                >
                  <Link 
                    href={href}
                    className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-accent transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-foreground">{label}</span>
                  </Link>
                </motion.div>
              ))}
              
              {staticLinks.map(({ label, href }, index) => (
                <motion.div
                  key={label}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (productLinks.length + index) * 0.04, duration: 0.2 }}
                >
                  <Link 
                    href={href}
                    className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-accent transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-xs font-bold text-foreground pl-7">{label}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="border-t border-border/60 pt-3 mt-2 flex flex-col gap-2"
              >
                {!isLoading && userInfo ? (
                  <Link href={dashboardHref} className="w-full" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full text-xs h-9 rounded-sm font-bold border-border/60">
                      Go to Dashboard ({userInfo.role.toLowerCase()})
                    </Button>
                  </Link>
                ) : !isLoading ? (
                  <div className="flex items-center justify-between gap-2 w-full">
                    <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full text-xs h-8 rounded-sm justify-center font-bold">Sign in</Button>
                    </Link>
                    <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full text-xs h-8 rounded-sm justify-center font-bold bg-primary text-primary-foreground">Get Started</Button>
                    </Link>
                  </div>
                ) : null}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
