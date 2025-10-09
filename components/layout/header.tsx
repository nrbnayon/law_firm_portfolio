"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

export function Header() {
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-bg/95 backdrop-blur-sm border-b border-dark-border font-sans">
      <div className="max-w-7xl mx-auto px-3 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-40 h-12 relative">
              <Image src="/logo.png" alt="Logo" width={160} height={80} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-light-bg hover:text-secondary-gold transition-colors"
            >
              Home
            </Link>

            {/* Practice Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsPracticeOpen(true)}
              onMouseLeave={() => setIsPracticeOpen(false)}
            >
              <button className="text-sm text-light-bg hover:text-secondary-gold transition-colors flex items-center gap-1">
                Practice
                <ChevronDown className="w-4 h-4" />
              </button>

              {isPracticeOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-56 py-2 rounded-sm shadow-lg bg-dark-bg-secondary border border-dark-border">
                    <Link
                      href="/practice/criminal-defense"
                      className="block px-4 py-2 text-sm text-light-bg hover:text-secondary-gold hover:bg-dark-bg/50 transition-colors"
                    >
                      Criminal Defense
                    </Link>
                    <Link
                      href="/practice/white-collar-defense"
                      className="block px-4 py-2 text-sm text-light-bg hover:text-secondary-gold hover:bg-dark-bg/50 transition-colors"
                    >
                      White Collar Defense
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/attorney"
              className="text-sm text-light-bg hover:text-secondary-gold transition-colors"
            >
              Attorney
            </Link>

            <Link
              href="/insights"
              className="text-sm text-light-bg hover:text-secondary-gold transition-colors"
            >
              Insights
            </Link>

            <Link
              href="/contact"
              className="text-sm text-light-bg hover:text-secondary-gold transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Button className="hidden md:inline-flex font-medium bg-secondary-gold text-dark-bg hover:bg-primary-gold transition-colors">
              Consultation
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-light-bg"
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
          <div className="md:hidden mt-4 py-4 space-y-4 border-t border-dark-border">
            <Link
              href="/"
              className="block text-sm text-light-bg hover:text-secondary-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/practice/criminal-defense"
              className="block text-sm text-light-bg hover:text-secondary-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Criminal Defense
            </Link>

            <Link
              href="/practice/white-collar-defense"
              className="block text-sm text-light-bg hover:text-secondary-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              White Collar Defense
            </Link>

            <Link
              href="/attorney"
              className="block text-sm text-light-bg hover:text-secondary-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Attorney
            </Link>

            <Link
              href="/insights"
              className="block text-sm text-light-bg hover:text-secondary-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Insights
            </Link>

            <Link
              href="/contact"
              className="block text-sm text-light-bg hover:text-secondary-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <Button className="w-full font-medium bg-secondary-gold text-dark-bg hover:bg-primary-gold transition-colors">
              Consultation
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
