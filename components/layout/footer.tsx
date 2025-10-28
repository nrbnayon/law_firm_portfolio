"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-dark-bg text-text-white py-16 ">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-16 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col">
            <div className="w-40 h-20">
              <Image
                src="/logo.png"
                alt="Logo"
                width={160}
                height={80}
                quality={100}
              />
            </div>
            <p className="text-text-light text-lg leading-relaxed mb-6 pr-4">
              A boutique law firm focused on criminal defense and independent
              high-stakes investigations.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full hover:bg-primary-gold-hover transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <Image
                  src="/icon/facebook.svg"
                  alt="Facebook"
                  width={35}
                  height={35}
                  quality={100}
                  className="w-full h-full object-cover"
                />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full hover:bg-primary-gold-hover transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <Image
                  src="/icon/twitter.svg"
                  alt="twitter"
                  width={35}
                  height={35}
                  quality={100}
                  className="w-full h-full object-cover"
                />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full hover:bg-primary-gold-hover transition-colors flex items-center justify-center"
                aria-label="linkedin"
              >
                <Image
                  src="/icon/linkedin.svg"
                  alt="linkedin"
                  width={35}
                  height={35}
                  quality={100}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col w-full">
            <h3 className="text-lg font-semibold mb-6 text-text-white">
              Contact
            </h3>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex gap-3">
                <MapPin className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg text-text-light leading-relaxed">
                    Lyric Tower <br /> 440 Louisiana St., STE 900
                    <br />
                    Houston, TX 77002
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <Mail className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <Link
                  href="mailto:info@cwwhitelaw.com"
                  className="text-lg text-text-light hover:text-primary-gold transition-colors"
                >
                  info@cwwhitelaw.com
                </Link>
              </div>

              {/* Phone */}
              <div className="flex gap-3">
                <Phone className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <Link
                  href="tel:+17132367700"
                  className="text-lg text-text-light hover:text-primary-gold transition-colors"
                >
                  713-236-7700
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col min-w-28">
            <h3 className="text-lg font-semibold mb-6 text-text-white">
              Quick Links
            </h3>
            <nav className="space-y-3">
              <Link
                href="/"
                className="text-lg text-text-light hover:text-primary-gold transition-colors block"
              >
                Home
              </Link>
              <Link
                href="/attorney"
                className="text-lg text-text-light hover:text-primary-gold transition-colors block"
              >
                Attorney
              </Link>
              <Link
                href="/insights"
                className="text-lg text-text-light hover:text-primary-gold transition-colors block"
              >
                Insights
              </Link>
              <Link
                href="/contact"
                className="text-lg text-text-light hover:text-primary-gold transition-colors block"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Legal Information Section */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-6 text-text-white">
              Legal Information
            </h3>
            <p className="text-lg text-text-light leading-relaxed">
              This website provides general information only and is not legal
              advice. Viewing it does not create an attorney-client relationship
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-border my-8"></div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-lg text-text-light">
            Copyright © 2025 All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
