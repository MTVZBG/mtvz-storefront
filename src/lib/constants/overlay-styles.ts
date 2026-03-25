/**
 * Shared typography and background overlay styles for text-on-image placements.
 * This ensures consistency across Hero banners, Category Cards, and other image-heavy components.
 */
export const overlayStyles = {
  // A subtle dark layer + gradient that improves contrast globally but keeps the image vibrant
  overlay: "absolute inset-0 bg-black/25 bg-gradient-to-t from-black/60 via-black/10 to-transparent",
  
  // Hero text backdrop: radial dark vignette behind the text to separate it from noisy images
  heroTextBackdrop: "absolute -inset-4 small:-inset-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/60 via-black/20 to-transparent blur-md -z-10 rounded-[100%]",

  // Category title wrapper: pill-shaped soft blur backdrop to make text pop without blocking whole image
  categoryTitleWrapper: "inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-black/30 backdrop-blur-md shadow-lg border border-white/10",

  // Strong e-commerce heading typography (no blurriness)
  heroTitle: "text-white font-extrabold leading-[0.95] tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]",
  heroSubtitle: "text-white/95 font-semibold leading-snug drop-shadow-md",
  
  // Category tile specific typography
  categoryTitle: "text-white font-extrabold leading-tight tracking-[-0.02em] uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] m-0",
}
