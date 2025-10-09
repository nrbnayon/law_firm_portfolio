// Performance monitoring utilities
import * as webVitals from "web-vitals";

export function measurePerformance(name: string, fn: () => void) {
  if (typeof window !== "undefined" && "performance" in window) {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`[Performance] ${name}: ${end - start}ms`)
  } else {
    fn()
  }
}

// Web Vitals tracking

export function trackWebVitals() {
  if (typeof window !== "undefined") {
    webVitals.onCLS(console.log)
    webVitals.onINP(console.log)
    webVitals.onFCP(console.log)
    webVitals.onLCP(console.log)
    webVitals.onTTFB(console.log)
  }
}

// Resource hints for critical resources
export function preloadCriticalResources() {
  if (typeof document !== "undefined") {
    // Preload critical fonts
    const fontLink = document.createElement("link")
    fontLink.rel = "preload"
    fontLink.href = "/fonts/geist-sans.woff2"
    fontLink.as = "font"
    fontLink.type = "font/woff2"
    fontLink.crossOrigin = "anonymous"
    document.head.appendChild(fontLink)

    // Preload critical images
    const heroImage = new Image()
    heroImage.src = "/elegant-wedding-celebration-with-people-toasting-a.jpg"
  }
}

// Service Worker registration
export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  }
}
