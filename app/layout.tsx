import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Live Weather - Real-Time Weather Forecasts & Current Conditions",
    template: "%s | Live Weather",
  },
  description:
    "Get accurate real-time weather forecasts and current conditions for any city worldwide. Live Weather provides up-to-date temperature, humidity, wind speed, and 5-day weather predictions powered by OpenWeather API. Check weather now!",
  keywords: [
    "live weather",
    "weather forecast",
    "real-time weather",
    "current weather",
    "weather today",
    "weather conditions",
    "temperature",
    "humidity",
    "wind speed",
    "weather app",
    "local weather",
    "weather radar",
    "5 day forecast",
    "weather updates",
    "OpenWeather",
    "weather by city",
    "global weather",
    "weather information",
    "accurate weather",
    "weather data",
  ],
  authors: [{ name: "Live Weather Team" }],
  creator: "Live Weather",
  publisher: "Live Weather",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://liveweather.com",
    siteName: "Live Weather",
    title: "Live Weather - Real-Time Weather Forecasts & Current Conditions",
    description:
      "Get accurate real-time weather forecasts and current conditions for any city worldwide. Check temperature, humidity, wind speed, and 5-day predictions instantly.",
    images: [
      {
        url: "/live-weather.png",
        width: 1200,
        height: 630,
        alt: "Live Weather - Real-Time Weather Forecasts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Weather - Real-Time Weather Forecasts & Current Conditions",
    description:
      "Get accurate real-time weather forecasts and current conditions for any city worldwide. Check weather now!",
    images: ["/live-weather.png"],
    creator: "@liveweather",
  },
  alternates: {
    canonical: "https://liveweather.com",
  },
  category: "weather",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="application-name" content="Live Weather" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Live Weather" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
