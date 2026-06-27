"use client";

import Link from "next/link";
import { Zap, Mail } from "lucide-react";
import Logo from "../logo/LogoIcon";

const footerLinks = {
  Product: [
    { label: "AI Generation", href: "#generation" },
    { label: "Templates", href: "/templates" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Pricing Plan", href: "#pricing" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socials = [
  { 
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ), 
    href: "https://x.com", 
    label: "X (Twitter)" 
  },
  { 
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.068.069-.068 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ), 
    href: "https://github.com", 
    label: "GitHub" 
  },
  { 
    renderIcon: () => (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ), 
    href: "https://linkedin.com", 
    label: "LinkedIn" 
  },
  { 
    renderIcon: () => <Mail className="w-3.5 h-3.5" />, 
    href: "mailto:hello@contentforge.ai", 
    label: "Email" 
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-background/80 backdrop-blur-sm overflow-hidden">
      {/* Subtle brand ambient color node */}
      <div className="absolute w-72 h-72 -bottom-36 -left-24 rounded-full bg-primary/5 blur-[80px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Link Matrix */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3.5">
           <Logo />

            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Turn structural thoughts into polished copy in seconds. An open dashboard ecosystem built for modern writers and developers.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-1.5 pt-1">
              {socials.map(({ renderIcon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm flex items-center justify-center bg-card border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-primary hover:bg-muted/30 transition-all shadow-sm"
                >
                  {renderIcon()}
                </a>
              ))}
            </div>
          </div>

          {/* Map Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-3">
              <h4 className="font-sans font-bold text-xs text-foreground uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 inline-block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Operational Status Bar */}
        <div className="border-t border-border/40 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} ContentForge AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 bg-card border border-border/60 rounded-sm px-2.5 py-0.5 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
