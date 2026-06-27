"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/types/user.types";

import { ShieldCheck, LogOut, User } from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
    userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-sm h-8 w-8 shrink-0 border-border/60 bg-muted/20 hover:bg-accent cursor-pointer"
                >
                    <span className="text-xs font-bold text-foreground">
                        {userInfo?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 p-2 rounded-sm bg-popover border-border/60 shadow-lg mt-1">
                <DropdownMenuLabel className="font-normal px-2 py-1.5">
                    <div className="flex flex-col space-y-1">
                        <p className="text-xs font-bold text-foreground leading-none truncate">
                            {userInfo?.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground leading-none truncate">
                            {userInfo?.email}
                        </p>
                        <p className="text-[10px] font-bold text-primary capitalize tracking-wider pt-0.5 leading-none">
                            {userInfo?.role ? userInfo.role.toLowerCase().replace("_", " ") : "Access Role"}
                        </p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-1 border-border/60" />

                <DropdownMenuItem asChild>
                    <Link
                        href="/profile"
                        className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground rounded-sm cursor-pointer"
                    >
                        <User className="h-3.5 w-3.5" />
                        <span>My Profile</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        href="/settings/security"
                        className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground rounded-sm cursor-pointer"
                    >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Security Settings</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 border-border/60" />

                <DropdownMenuItem
                    onClick={() => {
                        // Include your explicit authentication/token clearing actions here
                    }}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-destructive focus:bg-destructive/10 focus:text-destructive rounded-sm cursor-pointer"
                >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Logout Workspace</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;