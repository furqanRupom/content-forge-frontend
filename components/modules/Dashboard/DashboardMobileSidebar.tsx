"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetTitle } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.types";
import { UserInfo } from "@/types/user.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardMobileSidebarProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string;
}

const DashboardMobileSidebar = ({ dashboardHome, navItems, userInfo }: DashboardMobileSidebarProps) => {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col overflow-hidden bg-card">
            {/* ContentForge Mobile Branding Header */}
            <div className="flex h-16 items-center border-b border-border/60 px-6 shrink-0">
                <Link href="/" className="flex items-center gap-2 tracking-tight">
                    <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-primary text-primary-foreground shadow-sm">
                        <span className="text-xs font-black">C</span>
                    </div>
                    <span className="font-sans font-bold text-base text-foreground tracking-tight">
                        Content<span className="text-primary">Forge</span>
                    </span>
                </Link>
            </div>

            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            {/* Navigation Options Area */}
            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-6">
                    {navItems.map((section, sectionId) => (
                        <div key={sectionId}>
                            {section.title && (
                                <h4 className="mb-2 px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    {section.title}
                                </h4>
                            )}

                            <div className="space-y-0.5">
                                {section.items.map((item, id) => {
                                    const isActive = pathname === item.href;
                                    const Icon = getIconComponent(item.icon);

                                    return (
                                        <Link
                                            href={item.href}
                                            key={id}
                                            className={cn(
                                                "flex items-center gap-3 rounded-sm px-3 py-2 text-xs font-bold transition-all",
                                                isActive
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                                            )}
                                        >
                                            <Icon className="h-3.5 w-3.5 shrink-0" />
                                            <span className="flex-1 truncate">{item.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>

                            {sectionId < navItems.length - 1 && (
                                <Separator className="my-4 border-border/60" />
                            )}
                        </div>
                    ))}
                </nav>
            </ScrollArea>

            {/* User Session Profile Footer */}
            <div className="border-t border-border/60 px-4 py-3.5 bg-muted/20 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/20">
                        <span className="text-xs font-bold text-primary">
                            {userInfo?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-bold text-foreground truncate leading-none">
                            {userInfo?.name || "Workspace User"}
                        </p>
                        <p className="text-[10px] font-medium text-muted-foreground capitalize mt-1 leading-none tracking-wide">
                            {userInfo?.role ? userInfo.role.toLowerCase().replace("_", " ") : "Access Role"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMobileSidebar;