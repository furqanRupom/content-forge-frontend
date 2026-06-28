"use client";

import Logo from "@/components/logo/LogoIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getIconComponent } from "@/lib/iconMapper"; 
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarContentProps {
    userInfo: any;
    navItems: NavSection[];
    dashboardHome: string;
}

const DashboardSidebarContent = ({ dashboardHome, navItems, userInfo }: DashboardSidebarContentProps) => {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex h-full w-64 flex-col  border-r bg-card overflow-hidden shrink-0">
            {/* ContentForge Branding & Platform Logo */}
            <div className="flex h-16 items-center px-6 border-b justify-center">
               <Logo />
            </div>

            {/* Navigation Loop Area */}
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
                                            <Icon className={cn("w-3.5 h-3.5", isActive ? "text-current" : "text-muted-foreground group-hover:text-foreground")} />
                                            <span>{item.title}</span>
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

            {/* User Session Presentation Identity Footer */}
            <div className="border-t border-border/60 px-4 py-3.5 bg-muted/20">
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

export default DashboardSidebarContent;
