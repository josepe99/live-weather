"use client";

import { getWeatherByLocationAction } from "@/lib/actions/weather.actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AutoLocation() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      return;
    }

    setIsLoading(true);

    // Request user's location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherResponse = await getWeatherByLocationAction(
            latitude,
            longitude
          );

          if (weatherResponse.data?.city) {
            router.push(`/?city=${encodeURIComponent(weatherResponse.data.city)}`);
          }
        } catch (error) {
          console.error("Failed to get weather for location:", error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        // Silently fail if user denies permission or location unavailable
        console.log("Location access:", error.message);
        setIsLoading(false);
      },
      {
        timeout: 10000,
        enableHighAccuracy: false,
      }
    );
  }, [router]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
      <div className="rounded-3xl border border-white/60 bg-white/90 px-8 py-6 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600"></div>
          <div>
            <p className="text-lg font-semibold text-slate-900">
              Detecting your location...
            </p>
            <p className="text-sm text-slate-600">
              Getting weather for your area
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
