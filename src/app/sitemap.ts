import { MetadataRoute } from "next"
import { supabase } from "@/lib/supabase"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://bestdiveguide.com"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/top100`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/top100-world`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/stays`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/food`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/liveaboards`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/sites`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/sustainable`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/vote`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ]

  // Dynamic listing pages from Supabase
  let listingPages: MetadataRoute.Sitemap = []
  try {
    const { data } = await supabase
      .from("listings")
      .select("slug, updated_at")
      .eq("is_published", true)

    if (data) {
      listingPages = data.map((l) => ({
        url: `${base}/listing/${l.slug}`,
        lastModified: l.updated_at ? new Date(l.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    }
  } catch {
    // Supabase unavailable at build time — static pages only
  }

  return [...staticPages, ...listingPages]
}
