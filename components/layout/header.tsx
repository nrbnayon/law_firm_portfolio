"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Header({
  show = true,
  background = "dark",
  isFixed = true,
}: {
  show?: boolean;
  background?: "dark" | "white";
  isFixed?: boolean;
}) {
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkBg = background === "dark";

  const textClass = isDarkBg ? "text-light-bg" : "text-text-dark";
  const hoverClass = isDarkBg
    ? "hover:text-secondary-gold"
    : "hover:text-primary-gold";
  const navBgClass = isScrolled
    ? isDarkBg
      ? "bg-black/50 backdrop-blur-sm"
      : "bg-white"
    : "";
  const borderClass = isDarkBg ? "border-dark-border" : "border-light-border";
  const activeClass = isDarkBg
    ? "text-secondary-gold border-b-2 border-secondary-gold"
    : "text-primary-gold border-b-2 border-primary-gold";
  const inactiveClass = `${textClass} ${hoverClass}`;
  const logoSrc = isDarkBg ? "/logo.png" : "/dark-logo.png";
  const dropdownBgClass = isDarkBg
    ? "bg-dark-bg-secondary"
    : "bg-light-bg-secondary";
  const dropdownHoverClass = isDarkBg
    ? "hover:bg-dark-bg/50"
    : "hover:bg-light-bg/50";
  const positionClass = isFixed ? "fixed" : "static";

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`${positionClass} top-0 w-full z-50 ${navBgClass}`}>
      <div className={`max-w-7xl mx-auto px-3 py-4`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-40 h-12 relative">
              <Image src={logoSrc} alt="Logo" width={160} height={80}    quality={100} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-lg transition-colors pb-1 ${
                isActive("/") ? activeClass : inactiveClass
              }`}
            >
              Home
            </Link>

            {/* Practice Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsPracticeOpen(true)}
              onMouseLeave={() => setIsPracticeOpen(false)}
            >
              <button
                className={`text-lg transition-colors flex items-center gap-1 pb-1 ${
                  pathname.startsWith("/practice") ? activeClass : inactiveClass
                }`}
              >
                Practice
                <ChevronDown className="w-4 h-4" />
              </button>

              {isPracticeOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div
                    className={`w-56 py-2 rounded-sm shadow-lg ${dropdownBgClass} border ${borderClass}`}
                  >
                    <Link
                      href="/practice/criminal-defense"
                      className={`block px-4 py-2 text-lg ${textClass} ${hoverClass} ${dropdownHoverClass} transition-colors`}
                    >
                      Criminal Defense
                    </Link>
                    <Link
                      href="/practice/white-collar-defense"
                      className={`block px-4 py-2 text-lg ${textClass} ${hoverClass} ${dropdownHoverClass} transition-colors`}
                    >
                      White Collar Defense
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/attorney"
              className={`text-lg transition-colors pb-1 ${
                isActive("/attorney") ? activeClass : inactiveClass
              }`}
            >
              Attorney
            </Link>

            <Link
              href="/insights"
              className={`text-lg transition-colors pb-1 ${
                isActive("/insights") ? activeClass : inactiveClass
              }`}
            >
              Insights
            </Link>

            <Link
              href="/contact"
              className={`text-lg transition-colors pb-1 ${
                isActive("/contact") ? activeClass : inactiveClass
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Button
              className={`hidden md:inline-flex font-medium text-base ${
                isDarkBg
                  ? "bg-primary-gold text-white hover:bg-secondary-gold"
                  : "bg-primary-gold text-white hover:bg-secondary-gold"
              } transition-colors`}
            >
              Consultation
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden ${textClass}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden mt-4 py-4 space-y-4 border-t ${borderClass}`}
          >
            <Link
              href="/"
              className={`block text-lg transition-colors ${
                isActive("/") ? activeClass : inactiveClass
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/practice/criminal-defense"
              className={`block text-lg transition-colors ${
                pathname.startsWith("/practice/criminal-defense")
                  ? activeClass
                  : inactiveClass
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Criminal Defense
            </Link>

            <Link
              href="/practice/white-collar-defense"
              className={`block text-lg transition-colors ${
                pathname.startsWith("/practice/white-collar-defense")
                  ? activeClass
                  : inactiveClass
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              White Collar Defense
            </Link>

            <Link
              href="/attorney"
              className={`block text-lg transition-colors ${
                isActive("/attorney") ? activeClass : inactiveClass
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Attorney
            </Link>

            <Link
              href="/insights"
              className={`block text-lg transition-colors ${
                isActive("/insights") ? activeClass : inactiveClass
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Insights
            </Link>

            <Link
              href="/contact"
              className={`block text-lg transition-colors ${
                isActive("/contact") ? activeClass : inactiveClass
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <Button
              size="sm"
              className={`w-full font-medium !text-white ${
                isDarkBg
                  ? "bg-secondary-gold hover:bg-primary-gold"
                  : "bg-primary-gold hover:bg-secondary-gold"
              } transition-colors`}
            >
              Consultation
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
