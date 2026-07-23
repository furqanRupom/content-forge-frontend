"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
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

// Tune these two values to change how "sticky" the hide/show feels
const SCROLL_HIDE_THRESHOLD = 80; // px scrolled before we start hiding on scroll-down
const SCROLL_DELTA_MIN = 6; // ignore tiny scroll jitters (e.g. mobile bounce)

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerRef = useRef(null);
  const menuBtnRef = useRef(null);

  // motion's useScroll gives us a MotionValue that's already
  // batched to the browser's frame rate — no manual rAF throttling needed.
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (currentY) => {
    setScrolled(currentY > 15);

    const delta = currentY - lastScrollY.current;
    if (Math.abs(delta) < SCROLL_DELTA_MIN) return;

    if (currentY < SCROLL_HIDE_THRESHOLD) {
      setHidden(false);
    } else if (delta > 0) {
      setHidden(true);
      setMobileOpen(false); // don't leave an orphaned open menu off-screen
    } else {
      setHidden(false);
    }
    lastScrollY.current = currentY;
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

  const dashboardHref = useMemo(() => {
    if (!userInfo?.role) return "/dashboard";
    const role = userInfo.role.toUpperCase();
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "MANAGER") return "/manager/dashboard";
    return "/dashboard";
  }, [userInfo?.role]);

  const productLinks = useMemo(
    () => [
      { label: "AI Generation", href: "#generation", icon: Sparkles, desc: "Create layout content in seconds" },
      { label: "Templates", href: "/templates", icon: LayoutTemplate, desc: "500+ ready-made templates" },
      { label: "Favorites", href: `${dashboardHref}/favorites`, icon: Star, desc: "Save your best outputs" },
      { label: "Dashboard", href: dashboardHref, icon: BarChart3, desc: "Track performance & analytics" },
    ],
    [dashboardHref]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileOpen]);

  // Close mobile drawer on Escape, and on outside click
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e:any) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const onClickOutside = (e) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [mobileOpen]);

  const showAuthedUI = !isLoading && mounted && userInfo;
  const showGuestUI = !isLoading && mounted && !userInfo;

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ type: "spring", stiffness: 400, damping: 40, mass: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-[padding,background-color,box-shadow] duration-300 ease-out",
        scrolled
          ? "py-2.5 bg-background/80 border-b border-border/40 shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Branding & Navigation Section */}
        <div className="flex items-center gap-6">
          <Logo />

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
            aria-label="Toggle color theme"
          >
            {/* Reserve space so nothing shifts before mount */}
            {mounted ? (
              resolvedTheme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />
            ) : (
              <span className="w-3.5 h-3.5 block" />
            )}
          </Button>

          {showAuthedUI ? (
            <UserDropdown userInfo={userInfo} />
          ) : showGuestUI ? (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-sm cursor-pointer h-8 px-3 text-xs font-bold text-muted-foreground hover:text-foreground">
                  Sign in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 text-xs h-8 px-3.5 font-bold rounded-sm shadow-sm transition-all">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <div className="h-8 w-20 rounded-sm bg-muted/20 border border-border/40 animate-pulse" />
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-sm w-8 h-8 text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {mounted ? (
              resolvedTheme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />
            ) : (
              <span className="w-3.5 h-3.5 block" />
            )}
          </Button>
          <Button
            ref={menuBtnRef}
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-sm w-8 h-8 text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            ref={drawerRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background/95 border-b border-border/40 shadow-md"
          >
            <div className="px-4 py-3 space-y-1 mt-1">
              {productLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">{label}</span>
                </Link>
              ))}

              {staticLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-xs font-bold text-foreground pl-7">{label}</span>
                </Link>
              ))}

              <div className="border-t border-border/60 pt-3 mt-2 flex flex-col gap-2">
                {showAuthedUI ? (
                  <Link href={dashboardHref} className="w-full" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full text-xs h-9 rounded-sm font-bold border-border/60">
                      Go to Dashboard ({userInfo.role.toLowerCase()})
                    </Button>
                  </Link>
                ) : showGuestUI ? (
                  <div className="flex items-center justify-between gap-2 w-full">
                    <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full text-xs h-8 rounded-sm justify-center font-bold">Sign in</Button>
                    </Link>
                    <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full text-xs h-8 rounded-sm justify-center font-bold bg-primary text-primary-foreground">Get Started</Button>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}