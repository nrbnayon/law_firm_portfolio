export const cacheBuster = {
  clearStyleCache: () => {
    if (typeof window !== "undefined") {
      // Force reload of stylesheets
      const links = document.querySelectorAll('link[rel="stylesheet"]')
      links.forEach((link) => {
        const href = link.getAttribute("href")
        if (href) {
          link.setAttribute("href", `${href}?v=${Date.now()}`)
        }
      })
    }
  },

  forceReload: () => {
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  },
}
