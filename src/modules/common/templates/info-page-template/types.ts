/**
 * Info Page Content Model
 *
 * Shared type definitions for all informational trust pages
 * (Secure Payment, Fast Shipping, Easy Returns, Warranty).
 *
 * Each page provides structured content matching this shape.
 * The InfoPageTemplate renders any page that conforms to it —
 * no layout code lives in individual page files.
 *
 * Future extensibility:
 *   - Add `seo.metaTitle` / `seo.metaDescription` when a CMS is connected.
 *   - Add `hero.image` for a future header image/banner.
 *   - Add `lastUpdated` for "Last updated: ..." display.
 */

export type InfoSection = {
    /** Section heading rendered as <h2> */
    heading: string
    /**
     * Body text. Use \n\n to separate paragraphs.
     * Each paragraph block is rendered as a separate <p>.
     */
    body: string
}

export type InfoPageData = {
    /** <h1> title displayed at the top of the page */
    title: string
    /** Short lead paragraph directly below the title */
    intro: string
    /** Ordered list of content sections */
    sections: InfoSection[]
    /**
     * SEO metadata — optional, future-ready.
     * If omitted, the template falls back to title/intro.
     */
    seo?: {
        metaTitle?: string
        metaDescription?: string
    }
}
