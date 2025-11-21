import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Live Weather - Real-Time Weather Forecasts",
    short_name: "Live Weather",
    description:
      "Get accurate real-time weather forecasts and current conditions for any city worldwide. Check temperature, humidity, wind speed, and 5-day predictions.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0ea5e9",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["weather", "utilities", "productivity"],
    orientation: "portrait-primary",
  };
}
