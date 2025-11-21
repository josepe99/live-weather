import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://liveweather.com";

  // Popular cities for common weather searches
  const popularCities = [
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Sydney",
    "Los Angeles",
    "Chicago",
    "Miami",
    "San Francisco",
    "Seattle",
    "Boston",
    "Toronto",
    "Vancouver",
    "Berlin",
    "Madrid",
    "Rome",
    "Amsterdam",
    "Dubai",
    "Singapore",
    "Hong Kong",
  ];

  const cityPages = popularCities.map((city) => ({
    url: `${baseUrl}?city=${encodeURIComponent(city)}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    ...cityPages,
  ];
}
