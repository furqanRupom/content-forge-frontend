"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.types";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { UserInfo } from "@/types/user.types";
import UserDropdown from "./UserDropdown";
import DashboardMobileSidebar from "./DashboardMobileSidebar";

interface DashboardNavbarProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string;
}

const DashboardNavbarContent = ({ dashboardHome, navItems, userInfo }: DashboardNavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkSmallerScreen = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkSmallerScreen();
        window.addEventListener("resize", checkSmallerScreen, { passive: true });

        return () => {
            window.removeEventListener("resize", checkSmallerScreen);
        };
    }, []);

    return (
        <div className="flex items-center gap-4 w-full px-4 py-3 border-b bg-background h-16 shrink-0">
            {/* Mobile Menu Toggle Button And Menu */}
            <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-sm">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-64 p-0 border-r border-border/60">
                    <DashboardMobileSidebar
                        userInfo={userInfo}
                        dashboardHome={dashboardHome}
                        navItems={navItems}
                    />
                </SheetContent>
            </Sheet>

            {/* Search Component */}
            <div className="flex-1 flex items-center">
                <div className="relative w-full max-w-sm hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search generations, tools, templates..."
                        className="pl-9 pr-4 h-8 text-xs rounded-sm bg-muted/30 focus-visible:bg-background transition-colors"
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
                {/* User Dropdown */}
                <UserDropdown userInfo={userInfo} />
            </div>
        </div>
    );
};

export default DashboardNavbarContent;