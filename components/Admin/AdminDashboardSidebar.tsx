// components\Admin\AdminDashboardSidebar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  BookOpen,
  Phone,
  UsersRound,
  LogOut,
  Menu,
  UserRoundCog ,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Practice Areas",
    href: "/admin/dashboard/practice-areas",
    icon: Scale,
  },
  {
    title: "Attorneys",
    href: "/admin/dashboard/attorneys",
    icon: UserRoundCog,
  },
  {
    title: "Insights",
    href: "/admin/dashboard/insights",
    icon: BookOpen,
  },
  {
    title: "Contact",
    href: "/admin/dashboard/contact",
    icon: Phone,
  },
  {
    title: "Our Team",
    href: "/admin/dashboard/our-team",
    icon: UsersRound,
  },
];

export default function AdminDashboardSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 lg:hidden bg-background shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-dark-bg text-white transition-transform duration-300 ease-in-out",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-28 items-center justify-center pl-3 pr-6">
            <Link href='/admin/dashboard' className="flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-40 h-full object-contain"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-3 px-3 pb-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary-gold text-white shadow-lg"
                      : "text-gray-300 hover:bg-primary-gold/30 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-gold">
                <span className="text-sm font-semibold">CA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Chauntelle</p>
                <p className="text-xs text-gray-400 truncate">Admin</p>
              </div>
              <LogOut className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
