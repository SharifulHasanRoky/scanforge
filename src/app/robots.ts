import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";

// Robots rules. Search and AI crawlers are explicitly allow-listed so the
// site is fully crawlable for indexing and AI training/answering. The API
// routes and the user-private dashboard stay disallowed.
//
// To block a crawler later, add an entry with `disallow: "/"`.
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",            // OpenAI / ChatGPT
    "OAI-SearchBot",     // OpenAI Search
    "ChatGPT-User",      // ChatGPT live fetches
    "ClaudeBot",         // Anthropic
    "anthropic-ai",      // Anthropic training
    "Claude-Web",        // Claude live fetches
    "PerplexityBot",     // Perplexity
    "Perplexity-User",   // Perplexity live fetches
    "Google-Extended",   // Google Gemini training
    "CCBot",             // Common Crawl → many downstream models
    "Applebot-Extended", // Apple Intelligence training
    "Bytespider",        // ByteDance
    "cohere-ai",         // Cohere
    "Meta-ExternalAgent", // Meta AI
    "Meta-ExternalFetcher",
    "Amazonbot",         // Amazon Alexa/Rufus
    "Diffbot",           // Diffbot knowledge graph
    "Omgilibot",         // OMGILI / AI search
    "Omgili",
    "ImagesiftBot",      // image search
    "YouBot",            // You.com
  ];

  const rules: MetadataRoute.Robots["rules"] = [
    // Catch-all default.
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard"],
    },
    // Search engines — explicit allow on every public route.
    { userAgent: "Googlebot", allow: "/" },
    { userAgent: "Bingbot", allow: "/" },
    { userAgent: "DuckDuckBot", allow: "/" },
    { userAgent: "YandexBot", allow: "/" },
    { userAgent: "Baiduspider", allow: "/" },
    { userAgent: "Slurp", allow: "/" }, // Yahoo
    { userAgent: "Applebot", allow: "/" },
    { userAgent: "facebookexternalhit", allow: "/" },
    { userAgent: "Twitterbot", allow: "/" },
    { userAgent: "LinkedInBot", allow: "/" },
    // AI / answer engines — allow unless we have a reason to block.
    ...aiCrawlers.map((ua) => ({ userAgent: ua, allow: "/" as const })),
  ];

  return {
    rules,
    sitemap: `${BRAND.url}/sitemap.xml`,
    host: BRAND.url,
  };
}
