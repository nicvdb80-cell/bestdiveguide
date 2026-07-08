import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/vote"],
      },
    ],
    sitemap: "https://bestdiveguide.com/sitemap.xml",
    host: "https://bestdiveguide.com",
  }
}