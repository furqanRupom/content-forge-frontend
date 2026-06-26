'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 border-b bg-background/95 backdrop-blur-md transition-all ${scrolled ? 'shadow-lg' : ''}`}>
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Content Forge AI
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="font-medium hover:text-primary transition-colors">Features</Link>
                    <Link href="#pricing" className="font-medium hover:text-primary transition-colors">Pricing</Link>
                    <Link href="/dashboard" className="font-medium hover:text-primary transition-colors">Dashboard</Link>
                    <Link href="/admin" className="font-medium hover:text-primary transition-colors">Admin</Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost">Login</Button>
                    <Button>Get Started</Button>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t bg-background px-6 py-6">
                    <div className="flex flex-col gap-6 text-lg">
                        <Link href="#features" onClick={() => setMobileOpen(false)}>Features</Link>
                        <Link href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</Link>
                        <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                        <Link href="/admin" onClick={() => setMobileOpen(false)}>Admin</Link>
                        <div className="pt-4 border-t flex flex-col gap-4">
                            <Button variant="ghost">Login</Button>
                            <Button>Get Started</Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}